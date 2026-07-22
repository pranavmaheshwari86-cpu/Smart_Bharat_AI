import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    services: [
      { id: "aadhaar", name: "Aadhaar Card", category: "Identity", processingTime: "5-7 Days" },
      { id: "pan", name: "PAN Card", category: "Taxation", processingTime: "3-5 Days" },
      { id: "passport", name: "Passport", category: "Travel", processingTime: "10-15 Days" },
    ],
  });
});

export default router;
