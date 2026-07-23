import { Router, Request, Response } from "express";

const router = Router();

interface ComplaintTicket {
  id: string;
  category: string;
  department: string;
  description: string;
  location: string;
  status: string;
  estimatedHours: number;
  createdAt: string;
}

const COMPLAINTS_DB: ComplaintTicket[] = [
  {
    id: "SB-2026-8891",
    category: "Roads & Infrastructure",
    department: "PWD Department",
    description: "Deep pothole near Sector 14 main intersection causing traffic congestion.",
    location: "Sector 14, New Delhi",
    status: "DISPATCHED",
    estimatedHours: 48,
    createdAt: new Date().toISOString(),
  },
];

router.post("/", (req: Request, res: Response) => {
  const { category, description, location } = req.body;

  if (!category || !description) {
    res.status(400).json({ success: false, error: "Category and issue description are required." });
    return;
  }

  const ticketId = `SB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  let department = "Municipal Corporation";
  let estimatedHours = 24;

  const catLower = category.toLowerCase();
  if (catLower.includes("road") || catLower.includes("infrastructure")) {
    department = "PWD Department";
    estimatedHours = 48;
  } else if (catLower.includes("water")) {
    department = "Jal Board";
    estimatedHours = 24;
  } else if (catLower.includes("street") || catLower.includes("power") || catLower.includes("electric")) {
    department = "Power Corp";
    estimatedHours = 12;
  }

  const newTicket: ComplaintTicket = {
    id: ticketId,
    category,
    department,
    description,
    location: location || "GPS Location Tagged",
    status: "DISPATCHED",
    estimatedHours,
    createdAt: new Date().toISOString(),
  };

  COMPLAINTS_DB.push(newTicket);

  res.status(201).json({
    success: true,
    message: "Civic complaint registered and dispatched successfully.",
    ticket: newTicket,
  });
});

router.get("/track/:id", (req: Request, res: Response) => {
  const ticket = COMPLAINTS_DB.find((t) => t.id === req.params.id);
  if (!ticket) {
    res.status(404).json({ success: false, error: "Complaint tracking ID not found." });
    return;
  }
  res.status(200).json({
    success: true,
    ticket,
  });
});

export default router;
