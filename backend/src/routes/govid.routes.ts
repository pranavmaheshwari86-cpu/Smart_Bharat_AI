import { Router, Request, Response } from "express";

const router = Router();

const SERVICES = [
  { id: "aadhaar", name: "Aadhaar Card", category: "Identity", processingTime: "5-7 Days" },
  { id: "pan", name: "PAN Card", category: "Taxation", processingTime: "3-5 Days" },
  { id: "voter-id", name: "Voter ID Card", category: "Electoral", processingTime: "7-10 Days" },
  { id: "passport", name: "Passport", category: "Travel", processingTime: "10-15 Days" },
  { id: "driving-license", name: "Driving License", category: "Transport", processingTime: "7-14 Days" },
  { id: "ration-card", name: "Ration Card", category: "Welfare", processingTime: "10-20 Days" },
];

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    services: SERVICES,
  });
});

router.get("/categories", (req: Request, res: Response) => {
  const categories = Array.from(new Set(SERVICES.map((s) => s.category)));
  res.status(200).json({
    success: true,
    categories,
  });
});

router.get("/documents", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    documents: SERVICES,
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const doc = SERVICES.find((s) => s.id === req.params.id);
  if (!doc) {
    res.status(404).json({ success: false, error: "Document type not found" });
    return;
  }
  res.status(200).json({
    success: true,
    document: doc,
  });
});

export default router;
