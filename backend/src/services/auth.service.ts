import { UserRepository } from "../repositories/user.repository";
import { OtpRepository } from "../repositories/otp.repository";
import { SessionRepository } from "../repositories/session.repository";
import { PasswordResetRepository } from "../repositories/password-reset.repository";
import { 
  hashPassword, 
  comparePassword, 
  hashOtp, 
  compareOtp, 
  generateRandomToken, 
  hashToken 
} from "../utils/hash.util";
import { generate6DigitOtp } from "../utils/otp.util";
import { validatePasswordComplexity, UserRecord } from "@smart-bharat/shared";
import { config } from "../config";

export class AuthService {
  private userRepo = new UserRepository();
  private otpRepo = new OtpRepository();
  private sessionRepo = new SessionRepository();
  private resetRepo = new PasswordResetRepository();

  public async googleSignIn(credential?: string, demoProfile?: any) {
    let profile = null;

    if (credential) {
      // Live Google token verification via Google APIs
      try {
        const tokenRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
        if (tokenRes.ok) {
          const data = await tokenRes.json();
          profile = {
            sub: data.sub,
            name: data.name || data.email.split("@")[0],
            email: data.email,
            picture: data.picture,
            email_verified: data.email_verified === true || data.email_verified === "true",
          };
        }
      } catch (err) {
        console.error("Google token verification error:", err);
      }
    } else if (demoProfile) {
      profile = {
        sub: demoProfile.sub || `google_demo_${Date.now()}`,
        name: demoProfile.name || "Demo Google User",
        email: demoProfile.email || "demo.citizen@smartbharat.gov.in",
        picture: demoProfile.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        email_verified: true,
      };
    }

    if (!profile) {
      throw new Error("Invalid Google credential.");
    }

    const { sub: googleId, name, email, picture, email_verified } = profile;
    const now = new Date().toISOString();

    let user = this.userRepo.findByGoogleId(googleId) || this.userRepo.findByEmail(email);

    if (user) {
      user = this.userRepo.update(user.id, {
        google_id: user.google_id || googleId,
        full_name: user.full_name || name,
        profile_photo: user.profile_photo || picture,
        email_verified: user.email_verified || email_verified,
        last_login: now,
        last_active: now,
      }) as UserRecord;

      if (!user.profile_completed || !user.phone_verified) {
        return { profileCompleted: false, user };
      }

      return { profileCompleted: true, user };
    }

    const newUserId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newUser: UserRecord = {
      id: newUserId,
      full_name: name,
      email,
      email_verified,
      phone_number: "",
      phone_verified: false,
      google_id: googleId,
      auth_provider: "GOOGLE",
      profile_photo: picture,
      role: "CITIZEN",
      status: "ACTIVE",
      profile_completed: false,
      created_at: now,
      updated_at: now,
      last_login: now,
      last_active: now,
      failed_login_attempts: 0,
      account_locked: false,
    };

    this.userRepo.save(newUser);
    return { profileCompleted: false, user: newUser };
  }

  public async emailLogin(email: string, password: string) {
    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      throw new Error("Email and password are required.");
    }
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.userRepo.findByEmail(normalizedEmail);

    if (!user || !user.password_hash) {
      throw new Error("Incorrect email or password.");
    }

    if (user.account_locked && user.account_lock_until) {
      const lockUntil = new Date(user.account_lock_until).getTime();
      if (Date.now() < lockUntil) {
        const remainingMinutes = Math.ceil((lockUntil - Date.now()) / (60 * 1000));
        throw new Error(`Account is locked. Try again in ${remainingMinutes} minutes.`);
      } else {
        this.userRepo.update(user.id, { account_locked: false, account_lock_until: null, failed_login_attempts: 0 });
      }
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      const attempts = (user.failed_login_attempts || 0) + 1;
      let isLocked = false;
      let lockUntil: string | null = null;
      if (attempts >= 5) {
        isLocked = true;
        lockUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      }

      this.userRepo.update(user.id, {
        failed_login_attempts: attempts,
        account_locked: isLocked,
        account_lock_until: lockUntil,
      });

      throw new Error("Incorrect email or password.");
    }

    const now = new Date().toISOString();
    this.userRepo.update(user.id, {
      failed_login_attempts: 0,
      account_locked: false,
      account_lock_until: null,
      last_login: now,
      last_active: now,
    });

    if (!user.phone_verified || !user.profile_completed) {
      return { profileCompleted: false, user };
    }

    return { profileCompleted: true, user };
  }

  public async emailRegister(data: any) {
    const { fullName, email, password, confirmPassword, phone, countryCode, acceptTerms } = data;

    if (!fullName || !email || !password || !phone) {
      throw new Error("Please fill in all required fields.");
    }

    if (!acceptTerms) {
      throw new Error("You must accept the Terms of Service and Privacy Policy.");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    const pwdCheck = validatePasswordComplexity(password);
    if (!pwdCheck.isValid) {
      throw new Error(pwdCheck.errors[0] || "Password complexity failed.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const fullPhone = `${countryCode || "+91"}${phone.trim().replace(/\s+/g, "")}`;

    if (this.userRepo.findByEmail(normalizedEmail)) {
      throw new Error("An account with this email address already exists.");
    }

    if (this.userRepo.findByPhone(fullPhone)) {
      throw new Error("An account with this phone number already exists.");
    }

    const hashedPassword = await hashPassword(password);
    const now = new Date().toISOString();
    const newUserId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newUser: UserRecord = {
      id: newUserId,
      full_name: fullName.trim(),
      email: normalizedEmail,
      email_verified: true,
      phone_number: fullPhone,
      phone_verified: false,
      auth_provider: "EMAIL",
      password_hash: hashedPassword,
      role: "CITIZEN",
      status: "ACTIVE",
      profile_completed: false,
      created_at: now,
      updated_at: now,
      last_login: now,
      last_active: now,
      failed_login_attempts: 0,
      account_locked: false,
    };

    this.userRepo.save(newUser);
    return newUser;
  }

  public async sendPhoneOtp(phone: string, countryCode = "+91", purpose = "PHONE_VERIFICATION") {
    const fullPhone = `${countryCode}${phone.trim().replace(/\s+/g, "")}`;
    const existingOtp = this.otpRepo.getLatest(fullPhone, purpose as any);
    const now = Date.now();

    if (existingOtp) {
      const resendAvailableAt = new Date(existingOtp.resend_available_at).getTime();
      if (now < resendAvailableAt) {
        const remainingSec = Math.ceil((resendAvailableAt - now) / 1000);
        throw new Error(`Please wait ${remainingSec} seconds before requesting a new OTP.`);
      }
    }

    const rawOtp = generate6DigitOtp();
    const otpHash = await hashOtp(rawOtp);
    const expiresAt = new Date(now + 5 * 60 * 1000).toISOString();
    const resendAvailableAt = new Date(now + 30 * 1000).toISOString();
    const otpId = `otp_${now}_${Math.random().toString(36).substring(2, 7)}`;

    this.otpRepo.save({
      id: otpId,
      identifier: fullPhone,
      otp_hash: otpHash,
      purpose: purpose as any,
      expires_at: expiresAt,
      resend_available_at: resendAvailableAt,
      attempts: 0,
      verified: false,
      created_at: new Date(now).toISOString(),
    });

    console.log(`\n==============================================`);
    console.log(`[EXPRESS BACKEND SMS GATEWAY] OTP for ${fullPhone}: ${rawOtp}`);
    console.log(`==============================================\n`);

    return { fullPhone, rawOtp };
  }

  public async verifyPhoneOtp(phone: string, otp: string, countryCode = "+91", purpose = "PHONE_VERIFICATION") {
    const fullPhone = `${countryCode}${phone.trim().replace(/\s+/g, "")}`;
    const latestOtp = this.otpRepo.getLatest(fullPhone, purpose as any);

    if (!latestOtp) {
      throw new Error("No pending OTP code found.");
    }

    if (new Date(latestOtp.expires_at).getTime() < Date.now()) {
      throw new Error("OTP code has expired. Please request a new code.");
    }

    if (latestOtp.attempts >= 5) {
      throw new Error("Maximum verification attempts exceeded.");
    }

    const isMatch = await compareOtp(otp, latestOtp.otp_hash);
    if (!isMatch) {
      latestOtp.attempts += 1;
      this.otpRepo.update(latestOtp);
      throw new Error("Invalid OTP code. Please try again.");
    }

    latestOtp.verified = true;
    this.otpRepo.update(latestOtp);

    const now = new Date().toISOString();
    let user = this.userRepo.findByPhone(fullPhone);

    if (user) {
      user = this.userRepo.update(user.id, {
        phone_verified: true,
        profile_completed: true,
        last_login: now,
        last_active: now,
      }) as UserRecord;
    } else {
      const newUserId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      user = {
        id: newUserId,
        full_name: `Citizen ${fullPhone.slice(-4)}`,
        email: `${fullPhone.replace(/\+/g, "")}@smartbharat.user`,
        email_verified: false,
        phone_number: fullPhone,
        phone_verified: true,
        auth_provider: "PHONE",
        role: "CITIZEN",
        status: "ACTIVE",
        profile_completed: true,
        created_at: now,
        updated_at: now,
        last_login: now,
        last_active: now,
        failed_login_attempts: 0,
        account_locked: false,
      };
      this.userRepo.save(user);
    }

    return user;
  }

  public async completeProfile(userId: string, fullName: string, phone: string, countryCode = "+91", acceptTerms = false) {
    if (!acceptTerms) throw new Error("You must accept the Terms and Privacy Policy.");
    const user = this.userRepo.findById(userId);
    if (!user) throw new Error("User not found.");

    const fullPhone = `${countryCode}${phone.trim().replace(/\s+/g, "")}`;
    this.userRepo.update(userId, {
      full_name: fullName ? fullName.trim() : user.full_name,
      phone_number: fullPhone,
    });

    return fullPhone;
  }

  public async forgotPassword(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.userRepo.findByEmail(normalizedEmail);

    if (user && user.auth_provider === "EMAIL") {
      const rawToken = generateRandomToken();
      const tokenHash = hashToken(rawToken);
      const now = Date.now();
      const expiresAt = new Date(now + 15 * 60 * 1000).toISOString();

      this.resetRepo.save({
        id: `pwd_reset_${now}_${Math.random().toString(36).substring(2, 7)}`,
        user_id: user.id,
        email: user.email,
        token_hash: tokenHash,
        expires_at: expiresAt,
        used: false,
        created_at: new Date(now).toISOString(),
      });

      const resetUrl = `${config.frontendUrl}/reset-password?token=${rawToken}&email=${encodeURIComponent(user.email)}`;
      console.log(`\n==============================================`);
      console.log(`[EXPRESS EMAIL SERVICE] Reset URL: ${resetUrl}`);
      console.log(`==============================================\n`);

      return resetUrl;
    }

    return null;
  }

  public async resetPassword(token: string, newPassword: string, confirmPassword: string) {
    if (newPassword !== confirmPassword) throw new Error("Passwords do not match.");
    const pwdCheck = validatePasswordComplexity(newPassword);
    if (!pwdCheck.isValid) throw new Error(pwdCheck.errors[0] || "Complexity check failed.");

    const tokenHash = hashToken(token);
    const resetRecord = this.resetRepo.findByTokenHash(tokenHash);

    if (!resetRecord) {
      throw new Error("Invalid or expired password reset token.");
    }

    const hashedPassword = await hashPassword(newPassword);
    this.userRepo.update(resetRecord.user_id, {
      password_hash: hashedPassword,
      account_locked: false,
      account_lock_until: null,
      failed_login_attempts: 0,
    });

    this.resetRepo.markUsed(resetRecord.id);
    this.sessionRepo.deleteByUserId(resetRecord.user_id);
  }

  public async createSession(res: any, user: UserRecord, reqAgent = "Browser") {
    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const payload = { userId: user.id, email: user.email, role: user.role, sessionId };
    const accessToken = require("../utils/jwt.util").generateAccessToken(payload);
    const refreshToken = require("../utils/jwt.util").generateRefreshToken(payload);

    this.sessionRepo.save({
      id: sessionId,
      user_id: user.id,
      refresh_token: refreshToken,
      device_info: reqAgent,
      ip_address: "127.0.0.1",
      user_agent: reqAgent,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: now,
      last_active: now,
    });

    require("../utils/jwt.util").setAuthCookies(res, accessToken, refreshToken);
  }
}
