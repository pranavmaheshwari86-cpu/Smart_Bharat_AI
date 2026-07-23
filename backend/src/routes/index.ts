import { Router } from "express";
import authRoutes from "./auth.routes";
import govidRoutes from "./govid.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "Smart Bharat AI API", timestamp: new Date().toISOString() });
});

router.use("/auth", authRoutes);
router.use("/govid", govidRoutes);

export default router;
