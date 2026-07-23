import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  signOut,
  onAuthStateChanged,
  User,
  reload,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./firebase";

export { isFirebaseConfigured };

export interface FirebaseAuthUser {
  uid: string;
  phoneNumber: string | null;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
}

export interface OTPResponse {
  success: boolean;
  confirmationResult?: ConfirmationResult;
  verificationId?: string;
  error?: string;
  isMock?: boolean;
}

// Developer Fallback Store for Instant Testing without API Key
let mockConfirmationStore: { phone: string; code: string } | null = null;

export const formatIndianPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  return phone.startsWith("+") ? phone : `+91${phone}`;
};

export const isValidIndianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return /^[6-9]\d{9}$/.test(cleaned.substring(2));
  }
  return /^[6-9]\d{9}$/.test(cleaned);
};

export const initInvisibleRecaptcha = (containerId: string = "recaptcha-container"): RecaptchaVerifier | null => {
  if (typeof window === "undefined" || !auth) return null;

  try {
    // Clear any existing recaptcha instance on window if re-initializing
    if ((window as any).recaptchaVerifier) {
      try {
        (window as any).recaptchaVerifier.clear();
      } catch (e) {
        // ignore clear error
      }
    }

    const verifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
      callback: () => {
        // reCAPTCHA solved automatically
      },
      "expired-callback": () => {
        console.warn("reCAPTCHA expired. Please request OTP again.");
      },
    });

    (window as any).recaptchaVerifier = verifier;
    return verifier;
  } catch (error) {
    console.error("Failed to initialize reCAPTCHA verifier:", error);
    return null;
  }
};

export const sendOTP = async (
  phoneNumber: string,
  verifier?: RecaptchaVerifier | null
): Promise<OTPResponse> => {
  const formattedPhone = formatIndianPhoneNumber(phoneNumber);

  if (!isValidIndianPhone(phoneNumber)) {
    return {
      success: false,
      error: "Please enter a valid 10-digit Indian mobile number (starting with 6-9).",
    };
  }

  // Developer Simulation Fallback if Firebase environment variables are not populated
  if (!isFirebaseConfigured) {
    console.warn("🔧 Firebase credentials missing. Using Dev Mode OTP Simulation (Code: 123456)");
    mockConfirmationStore = { phone: formattedPhone, code: "123456" };
    return {
      success: true,
      verificationId: "mock-verification-id-123456",
      isMock: true,
    };
  }

  try {
    if (!auth) {
      throw new Error("Firebase Auth is not initialized. Check your environment variables.");
    }
    const appVerifier = verifier || (window as any).recaptchaVerifier || initInvisibleRecaptcha();
    if (!appVerifier) {
      throw new Error("reCAPTCHA verifier could not be initialized.");
    }

    const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
    return {
      success: true,
      confirmationResult,
      verificationId: confirmationResult.verificationId,
      isMock: false,
    };
  } catch (error: any) {
    console.error("Firebase sendOTP Error:", error);
    return {
      success: false,
      error: transformFirebaseError(error),
    };
  }
};

export const verifyOTP = async (
  confirmationResult: ConfirmationResult | null,
  otpCode: string,
  verificationId?: string
): Promise<{ success: boolean; user?: FirebaseAuthUser; error?: string }> => {
  if (!otpCode || otpCode.trim().length !== 6) {
    return { success: false, error: "Please enter a complete 6-digit OTP code." };
  }

  // Dev Simulation Mode Verification
  if (!isFirebaseConfigured || !confirmationResult) {
    if (mockConfirmationStore && otpCode === "123456") {
      const mockUser: FirebaseAuthUser = {
        uid: "dev-simulated-user-" + Date.now(),
        phoneNumber: mockConfirmationStore.phone,
        displayName: "Citizen User",
        photoURL: null,
        email: null,
      };
      return { success: true, user: mockUser };
    }
    return { success: false, error: "Invalid OTP code. For Dev Mode simulation, use 123456." };
  }

  try {
    const credential = await confirmationResult.confirm(otpCode);
    const u = credential.user;
    const authUser: FirebaseAuthUser = {
      uid: u.uid,
      phoneNumber: u.phoneNumber,
      displayName: u.displayName,
      photoURL: u.photoURL,
      email: u.email,
    };
    return { success: true, user: authUser };
  } catch (error: any) {
    console.error("Firebase verifyOTP Error:", error);
    return {
      success: false,
      error: transformFirebaseError(error),
    };
  }
};

export const logoutFirebase = async (): Promise<void> => {
  if (auth) {
    await signOut(auth);
  }
  mockConfirmationStore = null;
};

// ─── GOOGLE SIGN-IN WITH POPUP (Account Chooser) ─────────────────────────────
// Forces the full Google account chooser to open so the user can pick any account.
export const signInWithGooglePopup = async (): Promise<{
  success: boolean;
  user?: FirebaseAuthUser;
  error?: string;
  cancelled?: boolean;
}> => {
  if (!isFirebaseConfigured || !auth) {
    // Dev/demo fallback — return a simulated Google account
    const mockUser: FirebaseAuthUser = {
      uid: `google_demo_${Date.now()}`,
      phoneNumber: null,
      displayName: "Pranav Maheshwari",
      photoURL: null,
      email: "pranav.maheshwari@gmail.com",
    };
    return { success: true, user: mockUser };
  }

  try {
    const provider = new GoogleAuthProvider();
    // Force account chooser to always appear (even if already signed in to one account)
    provider.setCustomParameters({ prompt: "select_account" });
    provider.addScope("email");
    provider.addScope("profile");

    const result = await signInWithPopup(auth, provider);
    const u = result.user;

    return {
      success: true,
      user: {
        uid: u.uid,
        phoneNumber: u.phoneNumber,
        displayName: u.displayName,
        photoURL: u.photoURL,
        email: u.email,
      },
    };
  } catch (error: any) {
    // User closed the popup — not a hard error
    if (
      error?.code === "auth/popup-closed-by-user" ||
      error?.code === "auth/cancelled-popup-request"
    ) {
      return { success: false, cancelled: true };
    }
    console.error("Google Sign-In Popup Error:", error);
    return {
      success: false,
      error: transformFirebaseError(error),
    };
  }
};

export const getCurrentFirebaseUser = (): FirebaseAuthUser | null => {
  if (!auth || !auth.currentUser) return null;
  const u = auth.currentUser;
  return {
    uid: u.uid,
    phoneNumber: u.phoneNumber,
    displayName: u.displayName,
    photoURL: u.photoURL,
    email: u.email,
  };
};

export const listenForAuthChanges = (
  callback: (user: FirebaseAuthUser | null) => void
): (() => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, (u: User | null) => {
    if (u) {
      callback({
        uid: u.uid,
        phoneNumber: u.phoneNumber,
        displayName: u.displayName,
        photoURL: u.photoURL,
        email: u.email,
      });
    } else {
      callback(null);
    }
  });
};

export const refreshFirebaseUser = async (): Promise<void> => {
  if (auth && auth.currentUser) {
    await reload(auth.currentUser);
  }
};

export const transformFirebaseError = (error: any): string => {
  const code = error?.code || "";
  switch (code) {
    case "auth/invalid-phone-number":
      return "The phone number format is invalid. Please check and try again.";
    case "auth/missing-phone-number":
      return "Mobile phone number is required.";
    case "auth/invalid-verification-code":
    case "auth/code-expired":
      return "The OTP code is invalid or has expired. Please request a new OTP.";
    case "auth/quota-exceeded":
      return "SMS quota exceeded for today. Please try again later or use test credentials.";
    case "auth/too-many-requests":
      return "Too many attempts from this device. Please wait a few minutes before trying again.";
    case "auth/captcha-check-failed":
      return "reCAPTCHA verification failed. Please refresh the page and try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    case "auth/popup-blocked":
      return "Popup was blocked by your browser. Please allow popups for this site and try again.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized for Google sign-in. Please contact the administrator.";
    default:
      return error?.message || "An error occurred during authentication. Please try again.";
  }
};
