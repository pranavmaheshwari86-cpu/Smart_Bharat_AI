import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/google", authController.googleSignIn);
router.post("/email/login", authController.emailLogin);
router.post("/email/register", authController.emailRegister);
router.post("/phone/send-otp", authController.sendPhoneOtp);
router.post("/phone/verify-otp", authController.verifyPhoneOtp);
router.post("/complete-profile", authController.completeProfile);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get("/me", authController.getMe);
router.post("/logout", authController.logout);

export default router;
