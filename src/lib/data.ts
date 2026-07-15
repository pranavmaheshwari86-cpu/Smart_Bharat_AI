export type FieldType = "text" | "tel" | "email" | "file" | "date" | "select" | "textarea";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: { value: string; label: string }[];
  dependsOn?: { field: string; value: string }; // For dynamic conditional fields
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  benefits: string;
  eligibility: string;
  category: string;
  state: string;
  fields: FormField[];
}

export interface GovId {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  fields: FormField[];
}

export interface ComplaintCategory {
  id: string;
  name: string;
  fields: FormField[];
}

// ---------------------------------------------------------
// Mock Data
// ---------------------------------------------------------

export const categories = ["Students", "Farmers", "Women", "Senior Citizens", "General"];
export const states = ["All India", "Uttar Pradesh", "Maharashtra", "Karnataka", "Delhi"];

export const schemes: Scheme[] = [
  {
    id: "sch-1",
    name: "PM Vidyalakshmi Karyakram",
    description: "Financial assistance for students pursuing higher education.",
    benefits: "Up to ₹1,00,000 per year for tuition and hostel fees.",
    eligibility: "Must be enrolled in a recognized university. Family income < ₹8L/year.",
    category: "Students",
    state: "All India",
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "college", label: "University / College Name", type: "text", required: true },
      { id: "incomeCert", label: "Income Certificate (PDF)", type: "file", required: true },
    ]
  },
  {
    id: "sch-2",
    name: "UP Kisan Samman Nidhi",
    description: "Direct income support for marginal farmers in UP.",
    benefits: "₹6,000 per year transferred directly to bank account.",
    eligibility: "Must own cultivable land < 2 hectares in UP.",
    category: "Farmers",
    state: "Uttar Pradesh",
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "khasra", label: "Khasra / Khatauni Number", type: "text", required: true },
      { id: "bankAcct", label: "Bank Account Number", type: "text", required: true },
      { id: "ifsc", label: "IFSC Code", type: "text", required: true },
    ]
  }
];

export const govIds: GovId[] = [
  {
    id: "passport",
    name: "Passport",
    description: "Official travel document for international travel.",
    requirements: ["Photo", "Address Proof", "Birth Certificate", "Prior ID Proof"],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "dob", label: "Date of Birth", type: "date", required: true },
      { id: "address", label: "Current Address", type: "textarea", required: true },
      { id: "photo", label: "Passport-size Photo", type: "file", required: true },
      { id: "addressProof", label: "Address Proof", type: "file", required: true },
    ]
  },
  {
    id: "driving-license",
    name: "Driving License",
    description: "Permit required to drive a motor vehicle on public roads.",
    requirements: ["Photo", "Signature", "Age Proof", "Address Proof", "Vehicle Category"],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "vehicle", label: "Vehicle Category", type: "select", required: true, options: [
        { value: "mcwg", label: "Motorcycle with gear" },
        { value: "lmv", label: "Light Motor Vehicle (Car)" }
      ]},
      { id: "photo", label: "Photo", type: "file", required: true },
      { id: "signature", label: "Signature", type: "file", required: true },
    ]
  }
];

export const complaintCategories: ComplaintCategory[] = [
  {
    id: "roads",
    name: "Roads / Potholes / Infrastructure",
    fields: [
      { id: "state", label: "State", type: "select", required: true, options: states.map(s => ({ value: s, label: s })) },
      { id: "district", label: "District", type: "text", required: true },
      { id: "landmark", label: "Road Name / Landmark", type: "text", required: true },
      { id: "description", label: "Description", type: "textarea", required: false },
      { id: "photo", label: "Photo of Issue", type: "file", required: false },
    ]
  },
  {
    id: "misconduct",
    name: "Government official misconduct",
    fields: [
      { id: "state", label: "State", type: "select", required: true, options: states.map(s => ({ value: s, label: s })) },
      { id: "district", label: "District", type: "text", required: true },
      { id: "department", label: "Police Station / Department Name", type: "text", required: true },
      { id: "officer", label: "Officer's Name (if known)", type: "text", required: false },
      { id: "description", label: "Description", type: "textarea", required: true },
      { id: "photo", label: "Evidence Upload", type: "file", required: false },
    ]
  },
  {
    id: "existing",
    name: "Issue with an application already submitted",
    fields: [
      { id: "applicationId", label: "Select Application", type: "select", required: true, options: [
        { value: "app-123", label: "Passport Application (APP-123)" },
        { value: "app-124", label: "PM Vidyalakshmi (APP-124)" }
      ]},
      { id: "description", label: "Description of issue", type: "textarea", required: true },
    ]
  }
];

export interface ApplicationStatus {
  id: string;
  type: "scheme" | "govId" | "complaint";
  title: string;
  dateApplied: string;
  status: "Pending" | "Under Review" | "Approved" | "Rejected";
  referenceNumber: string;
}

export const mockUserApplications: ApplicationStatus[] = [
  {
    id: "app-101",
    type: "scheme",
    title: "PM Vidyalakshmi Karyakram",
    dateApplied: "2026-06-15",
    status: "Under Review",
    referenceNumber: "SCH-101-9283"
  },
  {
    id: "app-102",
    type: "govId",
    title: "Passport",
    dateApplied: "2026-05-10",
    status: "Approved",
    referenceNumber: "GOV-102-4451"
  },
  {
    id: "app-103",
    type: "complaint",
    title: "Pothole on Main Street",
    dateApplied: "2026-07-01",
    status: "Pending",
    referenceNumber: "COM-103-0092"
  }
];

export interface Credential {
  id: string;
  name: string;
  issuer: string;
  dateIssued: string;
  isVerified: boolean;
  linkedToDigilocker: boolean;
}

export const mockCredentials: Credential[] = [
  {
    id: "cred-1",
    name: "Aadhaar Card",
    issuer: "UIDAI",
    dateIssued: "2015-08-20",
    isVerified: true,
    linkedToDigilocker: true
  },
  {
    id: "cred-2",
    name: "PAN Card",
    issuer: "Income Tax Department",
    dateIssued: "2018-02-14",
    isVerified: true,
    linkedToDigilocker: true
  },
  {
    id: "cred-3",
    name: "Income Certificate",
    issuer: "Revenue Department, Govt of UP",
    dateIssued: "2025-01-10",
    isVerified: false,
    linkedToDigilocker: false
  }
];
