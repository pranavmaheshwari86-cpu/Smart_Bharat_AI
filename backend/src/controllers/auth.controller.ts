import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { SessionRepository } from "../repositories/session.repository";
import { clearAuthCookies, verifyJwtToken } from "../utils/jwt.util";

export class AuthController {
  private authService = new AuthService();
  private userRepo = new UserRepository();
  private sessionRepo = new SessionRepository();

  public googleSignIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const { credential, demoProfile } = req.body;
      const result = await this.authService.googleSignIn(credential, demoProfile);

      if (result.profileCompleted) {
        await this.authService.createSession(res, result.user, req.headers["user-agent"] || "Browser");
      }

      res.status(200).json({
        success: true,
        profileCompleted: result.profileCompleted,
        user: {
          id: result.user.id,
          fullName: result.user.full_name,
          email: result.user.email,
          phone: result.user.phone_number,
          profilePhoto: result.user.profile_photo,
          role: result.user.role,
          emailVerified: result.user.email_verified,
          phoneVerified: result.user.phone_verified,
          profileCompleted: result.user.profile_completed,
        },
      });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message || "Google authentication failed." });
    }
  };

  public emailLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.emailLogin(email, password);

      if (result.profileCompleted) {
        await this.authService.createSession(res, result.user, req.headers["user-agent"] || "Browser");
      }

      res.status(200).json({
        success: true,
        profileCompleted: result.profileCompleted,
        user: {
          id: result.user.id,
          fullName: result.user.full_name,
          email: result.user.email,
          phone: result.user.phone_number,
          profilePhoto: result.user.profile_photo,
          role: result.user.role,
          emailVerified: result.user.email_verified,
          phoneVerified: result.user.phone_verified,
          profileCompleted: result.user.profile_completed,
        },
      });
    } catch (error: any) {
      res.status(401).json({ success: false, error: error.message || "Authentication failed." });
    }
  };

  public emailRegister = async (req: Request, res: Response): Promise<void> => {
    try {
      const newUser = await this.authService.emailRegister(req.body);
      res.status(201).json({
        success: true,
        user: {
          id: newUser.id,
          fullName: newUser.full_name,
          email: newUser.email,
          phone: newUser.phone_number,
          emailVerified: true,
          phoneVerified: false,
          profileCompleted: false,
        },
      });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message || "Registration failed." });
    }
  };

  public sendPhoneOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { phone, countryCode, purpose } = req.body;
      const result = await this.authService.sendPhoneOtp(phone, countryCode, purpose);
      
      const responsePayload: any = {
        success: true,
        message: `OTP sent to ${result.fullPhone}.`,
        resendInSeconds: 30,
        expiresInSeconds: 300,
      };

      // Only expose debugOtp in development mode for simulation testing
      if (process.env.NODE_ENV !== "production") {
        responsePayload.debugOtp = result.rawOtp;
      }

      res.status(200).json(responsePayload);
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message || "Failed to send OTP." });
    }
  };

  public verifyPhoneOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { phone, otp, countryCode, purpose } = req.body;
      const user = await this.authService.verifyPhoneOtp(phone, otp, countryCode, purpose);
      await this.authService.createSession(res, user, req.headers["user-agent"] || "Browser");

      res.status(200).json({
        success: true,
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          phone: user.phone_number,
          role: user.role,
          emailVerified: user.email_verified,
          phoneVerified: true,
          profileCompleted: true,
        },
      });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message || "OTP verification failed." });
    }
  };

  public completeProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, fullName, phone, countryCode, acceptTerms } = req.body;
      const fullPhone = await this.authService.completeProfile(userId, fullName, phone, countryCode, acceptTerms);
      res.status(200).json({ success: true, message: "Profile updated.", phone: fullPhone });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message || "Profile completion failed." });
    }
  };

  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      const resetUrl = await this.authService.forgotPassword(email);
      res.status(200).json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent.",
        debugResetUrl: resetUrl || undefined,
      });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message || "Failed to request password reset." });
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, newPassword, confirmPassword } = req.body;
      await this.authService.resetPassword(token, newPassword, confirmPassword);
      res.status(200).json({ success: true, message: "Password reset successfully." });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message || "Password reset failed." });
    }
  };

  public getMe = async (req: Request, res: Response): Promise<void> => {
    try {
      const accessToken = req.cookies.access_token;
      let payload = accessToken ? verifyJwtToken(accessToken) : null;

      if (!payload) {
        const refreshToken = req.cookies.refresh_token;
        if (refreshToken) {
          const session = this.sessionRepo.findByRefreshToken(refreshToken);
          if (session) {
            payload = verifyJwtToken(refreshToken);
          }
        }
      }

      if (!payload) {
        res.status(401).json({ success: false, authenticated: false, user: null });
        return;
      }

      const user = this.userRepo.findById(payload.userId);
      if (!user || user.status !== "ACTIVE") {
        res.status(401).json({ success: false, authenticated: false, user: null });
        return;
      }

      res.status(200).json({
        success: true,
        authenticated: true,
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          phone: user.phone_number,
          profilePhoto: user.profile_photo,
          role: user.role,
          authProvider: user.auth_provider,
          emailVerified: user.email_verified,
          phoneVerified: user.phone_verified,
          profileCompleted: user.profile_completed,
          createdAt: user.created_at,
          lastLogin: user.last_login,
        },
      });
    } catch {
      res.status(401).json({ success: false, authenticated: false, user: null });
    }
  };

  public logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refresh_token;
      if (refreshToken) {
        const payload = verifyJwtToken(refreshToken);
        if (payload?.sessionId) {
          this.sessionRepo.delete(payload.sessionId);
        }
      }
    } finally {
      clearAuthCookies(res);
      res.status(200).json({ success: true, message: "Logged out successfully." });
    }
  };
}
