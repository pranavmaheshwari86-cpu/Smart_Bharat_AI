import { Router } from "express";
import authRoutes from "./auth.routes";
import govidRoutes from "./govid.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/govid", govidRoutes);

export default router;
