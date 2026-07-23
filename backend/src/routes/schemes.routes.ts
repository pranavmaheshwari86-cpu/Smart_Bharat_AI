import { Router, Request, Response } from "express";

const router = Router();

const SCHEMES = [
  {
    id: "pm-vidya-lakshmi",
    title: "PM Vidya Lakshmi Higher Education Loan",
    category: "Education & Learning",
    department: "Ministry of Education",
    fundingType: "Interest Subvention",
    financialBenefit: "Up to ₹10 Lakhs Collateral-Free Loan with 100% Interest Subsidy",
    summary: "Financial assistance for meritorious students pursuing higher studies in premier institutions across India.",
    eligibility: [
      "Must be an Indian Citizen",
      "Secured admission in approved Higher Education Institution (HEI)",
      "Gross annual family income under ₹8 Lakh per annum for full interest subsidy",
    ],
    documentsRequired: ["Aadhaar Card", "Admission Letter", "Income Certificate", "Class 10 & 12 Marksheets"],
    officialUrl: "https://www.vidyalakshmi.co.in",
  },
  {
    id: "central-sector-scholarship",
    title: "Central Sector Scheme of Scholarship for College and University Students",
    category: "Education & Learning",
    department: "Department of Higher Education",
    fundingType: "Direct Benefit Transfer (DBT)",
    financialBenefit: "₹12,000 per annum at Graduation level for first 3 years",
    summary: "Financial support to meritorious students from low-income families to meet day-to-day college expenses.",
    eligibility: [
      "Top 20th percentile in Class 12 Board Exam",
      "Family income less than ₹4.5 Lakh per annum",
      "Not receiving any other Central/State scholarship",
    ],
    documentsRequired: ["Aadhaar Card", "Class 12 Marksheet", "Income Certificate", "Bank Passbook"],
    officialUrl: "https://scholarships.gov.in",
  },
];

router.get("/", (req: Request, res: Response) => {
  const { category, search } = req.query;
  let results = SCHEMES;

  if (category) {
    results = results.filter((s) => s.category.toLowerCase() === String(category).toLowerCase());
  }

  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }

  res.status(200).json({
    success: true,
    count: results.length,
    schemes: results,
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const scheme = SCHEMES.find((s) => s.id === req.params.id);
  if (!scheme) {
    res.status(404).json({ success: false, error: "Government scheme not found" });
    return;
  }
  res.status(200).json({
    success: true,
    scheme,
  });
});

export default router;
