import { Router } from "express";
import rateLimit from "express-rate-limit";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

// Rate limiter for general authentication endpoints (login, register, reset)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 authentication requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false },
  message: {
    success: false,
    error: "Too many authentication requests from this IP. Please try again after 15 minutes.",
  },
});

// Stricter rate limiter for OTP dispatch endpoints to mitigate SMS/OTP flooding attacks
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 OTP send requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false },
  message: {
    success: false,
    error: "Too many OTP requests. Please wait before requesting another OTP.",
  },
});

router.post("/google", authLimiter, authController.googleSignIn);
router.post("/email/login", authLimiter, authController.emailLogin);
router.post("/email/register", authLimiter, authController.emailRegister);
router.post("/phone/send-otp", otpLimiter, authController.sendPhoneOtp);
router.post("/phone/verify-otp", authLimiter, authController.verifyPhoneOtp);
router.post("/complete-profile", authLimiter, authController.completeProfile);
router.post("/forgot-password", authLimiter, authController.forgotPassword);
router.post("/reset-password", authLimiter, authController.resetPassword);
router.get("/me", authController.getMe);
router.post("/logout", authController.logout);

export default router;
