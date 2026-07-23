import { Router } from "express";
import authRoutes from "./auth.routes";
import govidRoutes from "./govid.routes";
import schemesRoutes from "./schemes.routes";
import complaintsRoutes from "./complaints.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "Smart Bharat AI API", timestamp: new Date().toISOString() });
});

router.use("/auth", authRoutes);
router.use("/govid", govidRoutes);
router.use("/schemes", schemesRoutes);
router.use("/complaints", complaintsRoutes);

export default router;
