import { apiFetch } from "./client";

export const authApi = {
  googleSignIn: (credential?: string, demoProfile?: any) =>
    apiFetch("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential, demoProfile }),
    }),

  emailLogin: (email: string, password: string) =>
    apiFetch("/auth/email/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  emailRegister: (formData: any) =>
    apiFetch("/auth/email/register", {
      method: "POST",
      body: JSON.stringify(formData),
    }),

  sendPhoneOtp: (phone: string, countryCode = "+91", purpose = "PHONE_VERIFICATION") =>
    apiFetch("/auth/phone/send-otp", {
      method: "POST",
      body: JSON.stringify({ phone, countryCode, purpose }),
    }),

  verifyPhoneOtp: (phone: string, otp: string, countryCode = "+91", purpose = "PHONE_VERIFICATION") =>
    apiFetch("/auth/phone/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phone, otp, countryCode, purpose }),
    }),

  completeProfile: (profileData: any) =>
    apiFetch("/auth/complete-profile", {
      method: "POST",
      body: JSON.stringify(profileData),
    }),

  forgotPassword: (email: string) =>
    apiFetch("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPassword: (resetData: any) =>
    apiFetch("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(resetData),
    }),

  getMe: () => apiFetch("/auth/me", { method: "GET" }),

  logout: () => apiFetch("/auth/logout", { method: "POST" }),
};
