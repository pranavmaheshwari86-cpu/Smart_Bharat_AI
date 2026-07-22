export type FieldType = "text" | "tel" | "email" | "file" | "date" | "select" | "textarea" | "radio" | "checkbox" | "signature" | "image" | "address" | "location" | "otp" | "group";

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: { value: string; label: string }[];
  dependsOn?: { field: string; value: string | string[] }; // For dynamic conditional fields
  prefillKey?: string; // For auto prefill mapping
  maxSizeMB?: number;
  acceptedFormats?: string[];
  subFields?: FormField[]; // For group/repeatable types
  repeatable?: boolean; // For repeatable groups
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  overview?: string;
  department?: string;
  objectives?: string[];
  benefits: string[];
  financialBenefits?: string;
  eligibility: string[];
  whoCanApply?: string[];
  whoCannotApply?: string[];
  requiredInfo?: string[];
  requiredDocs?: string[];
  applicationProcess?: string[];
  processingTimeline?: string;
  validity?: string;
  deadline?: string;
  officialAuthority?: string;
  officialWebsite?: string;
  officialGuidelines?: string;
  faqs?: FAQ[];
  relatedSchemes?: string[];
  applicationTypes?: ApplicationType[];
  category: string;
  state: string;
  fields: FormField[];
  eligibilityRules?: Record<string, any>;
}

export interface ApplicationType {
  id: string;
  name: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface GovId {
  id: string;
  name: string;
  description: string;
  overview?: string;
  benefits?: string[];
  eligibility?: string[];
  whoCanApply?: string[];
  fees?: string;
  processingTime?: string;
  issuingAuthority?: string;
  officialWebsite?: string;
  applicationTypes?: ApplicationType[];
  faqs?: FAQ[];
  relatedServices?: string[];
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
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    description: "Income support scheme for all landholding farmer families.",
    overview: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from Government of India. Under the scheme an income support of 6,000/- per year in three equal installments will be provided.",
    department: "Department of Agriculture and Farmers Welfare",
    objectives: [
      "Supplement financial needs of farmers",
      "Ensure proper crop health and appropriate yields",
      "Protect farmers from falling into the clutches of moneylenders"
    ],
    benefits: [
      "₹6,000 per year transferred directly to bank account",
      "Paid in 3 equal installments of ₹2,000 each",
      "Direct Benefit Transfer (DBT) directly into Aadhaar seeded bank accounts"
    ],
    eligibility: [
      "Must be a landholding farmer family",
      "Must own cultivable land in their names",
      "Both urban and rural farmers are eligible"
    ],
    whoCannotApply: [
      "Institutional land holders",
      "Farmer families where one or more members hold constitutional posts",
      "Former and present Ministers/State Ministers",
      "All superannuated/retired pensioners whose monthly pension is ₹10,000 or more",
      "Persons who paid Income Tax in last assessment year",
      "Professionals like Doctors, Engineers, Lawyers, CAs"
    ],
    requiredDocs: ["Aadhaar Card", "Land Ownership Proof (Khasra/Khatauni)", "Bank Account Details (Aadhaar Seeded)"],
    applicationProcess: [
      "Fill the online registration form",
      "Upload required land documents",
      "Verify via Aadhaar OTP",
      "Submit for state nodal officer verification"
    ],
    processingTimeline: "30-45 Days for initial verification",
    financialBenefits: "₹6,000/year",
    officialAuthority: "Ministry of Agriculture & Farmers Welfare",
    officialWebsite: "https://pmkisan.gov.in",
    category: "Agriculture",
    state: "Central",
    eligibilityRules: {
      isFarmer: true,
      hasLand: true,
      paysIncomeTax: false,
      isProfessional: false
    },
    fields: [
      { id: "fullName", label: "Full Name (as per Aadhaar)", type: "text", required: true, prefillKey: "fullName" },
      { id: "aadhaar", label: "Aadhaar Number", type: "text", required: true, prefillKey: "aadhaar" },
      { id: "state", label: "State", type: "select", required: true, options: states.map(s => ({ value: s, label: s })) },
      { id: "district", label: "District", type: "text", required: true },
      { id: "village", label: "Village", type: "text", required: true },
      { id: "farmerType", label: "Farmer Type", type: "radio", required: true, options: [{value: "small", label: "Small (1-2 Hectare)"}, {value: "marginal", label: "Marginal (<1 Hectare)"}, {value: "other", label: "Other"}] },
      { id: "landDetails", label: "Land Details", type: "group", required: true, repeatable: true, subFields: [
        { id: "surveyNo", label: "Survey / Khata No.", type: "text", required: true },
        { id: "area", label: "Area (in Hectares)", type: "text", required: true }
      ]},
      { id: "landDoc", label: "Land Ownership Document", type: "file", required: true, acceptedFormats: [".pdf"] }
    ]
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat PM-JAY",
    description: "Health insurance scheme offering ₹5 lakh cover per family per year.",
    overview: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY) is a Centrally Sponsored Scheme having central sector component under Ayushman Bharat Mission anchored in the Ministry of Health and Family Welfare (MoHFW).",
    department: "National Health Authority",
    benefits: [
      "Health cover of ₹5,00,000 per family per year",
      "Cashless and paperless access to healthcare services",
      "Covers up to 3 days of pre-hospitalization and 15 days post-hospitalization expenses",
      "No restriction on family size, age or gender"
    ],
    eligibility: [
      "Families listed in SECC 2011 database",
      "Households with no adult male member between 16-59 years",
      "Disabled members and no able-bodied adult member",
      "SC/ST households",
      "Landless households deriving major income from manual casual labor"
    ],
    category: "Health",
    state: "Central",
    eligibilityRules: {
      incomeCategory: ["BPL", "Low Income"],
      requiresSECC: true
    },
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "rationCard", label: "Ration Card Number", type: "text", required: true },
      { id: "mobile", label: "Mobile Number", type: "tel", required: true, prefillKey: "phone" },
      { id: "familyMembers", label: "Family Members", type: "group", required: false, repeatable: true, subFields: [
        { id: "memberName", label: "Name", type: "text", required: true },
        { id: "relation", label: "Relation", type: "select", required: true, options: [{value: "spouse", label: "Spouse"}, {value: "child", label: "Child"}, {value: "parent", label: "Parent"}] },
        { id: "memberAadhaar", label: "Aadhaar Number", type: "text", required: false }
      ]},
      { id: "consent", label: "I consent to Aadhaar authentication", type: "checkbox", required: true }
    ]
  },
  {
    id: "pm-mudra",
    name: "PM Mudra Yojana (PMMY)",
    description: "Loans up to ₹10 Lakhs for non-corporate, non-farm small/micro enterprises.",
    overview: "Pradhan Mantri MUDRA Yojana (PMMY) is a scheme launched by the Hon'ble Prime Minister for providing loans up to 10 lakh to the non-corporate, non-farm small/micro enterprises.",
    department: "Department of Financial Services",
    benefits: [
      "Shishu: Loans up to ₹50,000",
      "Kishore: Loans from ₹50,001 to ₹5,00,000",
      "Tarun: Loans from ₹5,00,001 to ₹10,00,000",
      "Collateral-free loans"
    ],
    eligibility: [
      "Any Indian Citizen who has a business plan for a non-farm sector income generating activity",
      "Manufacturing, processing, trading or service sector",
      "Credit need less than ₹10 lakh"
    ],
    category: "Business",
    state: "Central",
    fields: [
      { id: "fullName", label: "Applicant Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "loanType", label: "Loan Category", type: "radio", required: true, options: [
        {value: "shishu", label: "Shishu (Up to ₹50,000)"},
        {value: "kishore", label: "Kishore (₹50K - ₹5L)"},
        {value: "tarun", label: "Tarun (₹5L - ₹10L)"}
      ]},
      { id: "businessName", label: "Business Name", type: "text", required: true },
      { id: "businessAddress", label: "Business Address", type: "address", required: true },
      { id: "loanAmount", label: "Requested Loan Amount (₹)", type: "text", required: true },
      { id: "projectReport", label: "Project Report / Business Plan", type: "file", required: true, dependsOn: { field: "loanType", value: ["kishore", "tarun"] } }
    ]
  },
  {
    id: "pm-surya-ghar",
    name: "PM Surya Ghar Muft Bijli Yojana",
    description: "Free electricity scheme providing up to 300 units via rooftop solar.",
    overview: "PM Surya Ghar: Muft Bijli Yojana is a central government scheme aiming to provide free electricity to households by subsidizing the installation of rooftop solar panels.",
    department: "Ministry of New and Renewable Energy",
    benefits: [
      "Up to 300 units of free electricity every month",
      "Subsidy up to ₹78,000 for rooftop solar installation",
      "Extra income by selling surplus power to DISCOMs"
    ],
    eligibility: [
      "Must be an Indian citizen",
      "Must own a house with a roof suitable for installing solar panels",
      "Must have a valid electricity connection"
    ],
    category: "Housing",
    state: "Central",
    fields: [
      { id: "fullName", label: "Applicant Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "electricityProvider", label: "Electricity Provider (DISCOM)", type: "text", required: true },
      { id: "consumerNumber", label: "Consumer Number", type: "text", required: true },
      { id: "roofArea", label: "Available Roof Area (sq ft)", type: "text", required: true },
      { id: "latestBill", label: "Latest Electricity Bill", type: "file", required: true, acceptedFormats: [".pdf", ".jpg", ".png"] }
    ]
  }
];

export const govIds: GovId[] = [
  {
    id: "aadhaar",
    name: "Aadhaar Card",
    description: "Primary identification document containing biometric and demographic data.",
    overview: "Aadhaar is a 12-digit individual identification number issued by the Unique Identification Authority of India (UIDAI) on behalf of the Government of India. The number serves as a proof of identity and address, anywhere in India.",
    benefits: [
      "Direct Benefit Transfer (DBT)",
      "Opening Bank Accounts",
      "Filing Income Tax Returns",
      "Applying for Passports"
    ],
    eligibility: [
      "Resident of India",
      "NRIs (after 182 days of residency)"
    ],
    whoCanApply: ["Any Indian citizen", "Newborns (Baal Aadhaar)"],
    fees: "Free for new enrollment. ₹50 for demographic update.",
    processingTime: "Up to 90 days",
    issuingAuthority: "Unique Identification Authority of India (UIDAI)",
    officialWebsite: "https://uidai.gov.in",
    applicationTypes: [
      { id: "new", name: "New Application" },
      { id: "update", name: "Demographic Update" }
    ],
    faqs: [
      { question: "Is Aadhaar mandatory?", answer: "While not universally mandatory, it is required for accessing many government benefits and subsidies." },
      { question: "Can I apply for Aadhaar online?", answer: "You can book an appointment online, but biometric capture requires visiting an Aadhaar enrollment center." }
    ],
    relatedServices: ["pan-card", "passport"],
    requirements: ["Identity Proof", "Address Proof", "Date of Birth Proof"],
    fields: [
      { id: "applicationType", label: "Application Type", type: "radio", required: true, options: [{ value: "new", label: "New Application" }, { value: "update", label: "Demographic Update" }] },
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Current Address", type: "address", required: true, prefillKey: "address" },
      { id: "identityProof", label: "Identity Proof (PDF/JPG)", type: "file", required: true, maxSizeMB: 5, acceptedFormats: [".pdf", ".jpg", ".jpeg"] },
      { id: "addressProof", label: "Address Proof (PDF/JPG)", type: "file", required: true, maxSizeMB: 5, acceptedFormats: [".pdf", ".jpg", ".jpeg"] }
    ]
  },
  {
    id: "pan-card",
    name: "PAN Card",
    description: "Essential for financial transactions and income tax filing.",
    overview: "Permanent Account Number (PAN) is a ten-digit alphanumeric number, issued in the form of a laminated card, by the Income Tax Department.",
    benefits: [
      "Filing Income Tax Returns",
      "Opening a Bank or Demat Account",
      "Buying or Selling Property",
      "Vehicle Purchase"
    ],
    eligibility: [
      "Indian Citizens (including minors)",
      "NRIs and Foreign Citizens",
      "Companies, Firms, HUFs"
    ],
    whoCanApply: ["Individuals", "Companies"],
    fees: "₹107 for Indian delivery, ₹1,017 for foreign delivery",
    processingTime: "1-2 Days (e-PAN), 15-20 working days (Physical)",
    issuingAuthority: "Income Tax Department of India",
    officialWebsite: "https://incometaxindia.gov.in",
    applicationTypes: [
      { id: "new", name: "New PAN (Form 49A)" },
      { id: "correction", name: "Correction / Update" },
      { id: "reprint", name: "Reprint PAN Card" }
    ],
    faqs: [
      { question: "Can a minor apply for PAN?", answer: "Yes, a minor can apply, but the application must be signed by a representative assessee." },
      { question: "Is Aadhaar linking mandatory?", answer: "Yes, linking Aadhaar with PAN is mandatory for Indian citizens." }
    ],
    relatedServices: ["aadhaar"],
    requirements: ["Aadhaar Card", "Signature", "Passport Size Photograph"],
    fields: [
      { id: "applicationType", label: "Application Type", type: "select", required: true, options: [{ value: "new", label: "New PAN" }, { value: "correction", label: "Correction" }, { value: "reprint", label: "Reprint" }] },
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "fatherName", label: "Father's Name", type: "text", required: true, prefillKey: "fatherName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "aadhaarNumber", label: "Aadhaar Number", type: "text", required: true, prefillKey: "aadhaar" },
      { id: "photo", label: "Passport-size Photo", type: "image", required: true, maxSizeMB: 2, acceptedFormats: [".jpg", ".png"] },
      { id: "signature", label: "Signature", type: "signature", required: true },
      { id: "aadhaarProof", label: "Aadhaar Card (PDF)", type: "file", required: true, maxSizeMB: 5, acceptedFormats: [".pdf"] }
    ]
  },
  {
    id: "passport",
    name: "Passport",
    description: "Official travel document for international travel.",
    overview: "An Indian passport is issued by order of the President of India to Indian citizens for the purpose of international travel. It acts as proof of Indian citizenship.",
    benefits: [
      "International Travel",
      "Strong Proof of Identity",
      "Strong Proof of Address"
    ],
    eligibility: [
      "Citizen of India"
    ],
    whoCanApply: ["Any Indian citizen"],
    fees: "₹1,500 for normal, ₹3,500 for Tatkaal (36 pages)",
    processingTime: "30-45 days (Normal), 1-3 days (Tatkaal)",
    issuingAuthority: "Ministry of External Affairs",
    officialWebsite: "https://passportindia.gov.in",
    applicationTypes: [
      { id: "fresh", name: "Fresh Passport" },
      { id: "reissue", name: "Re-issue of Passport" }
    ],
    faqs: [
      { question: "What is Police Clearance Certificate (PCC)?", answer: "PCC is issued to Indian passport holders in case they have applied for Residential Status, Employment or Long term visa or for immigration." }
    ],
    relatedServices: ["aadhaar", "voter_id"],
    requirements: ["Photo", "Address Proof", "Date of Birth Proof", "Non-ECR Proof (if applicable)"],
    fields: [
      { id: "applicationType", label: "Application Type", type: "radio", required: true, options: [{ value: "fresh", label: "Fresh Passport" }, { value: "reissue", label: "Re-issue" }] },
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Current Address", type: "address", required: true, prefillKey: "address" },
      { id: "education", label: "Educational Qualification", type: "select", required: true, options: [{value: "10th_pass", label: "10th Pass and above"}, {value: "below_10th", label: "Below 10th"}] },
      { id: "photo", label: "Passport-size Photo", type: "image", required: true, maxSizeMB: 2, acceptedFormats: [".jpg", ".png"] },
      { id: "addressProof", label: "Address Proof", type: "file", required: true, maxSizeMB: 5, acceptedFormats: [".pdf"] },
      { id: "dobProof", label: "Date of Birth Proof", type: "file", required: true, maxSizeMB: 5, acceptedFormats: [".pdf"] },
      { id: "educationProof", label: "Education Certificate", type: "file", required: true, dependsOn: { field: "education", value: "10th_pass" }, maxSizeMB: 5, acceptedFormats: [".pdf"] }
    ]
  },
  {
    id: "driving-license",
    name: "Driving License",
    description: "Permit required to drive a motor vehicle on public roads.",
    overview: "A driving license is an official document permitting a specific individual to operate one or more types of motorized vehicles, such as motorcycles, cars, or trucks, on public roads.",
    benefits: [
      "Legal permit to drive",
      "Widely accepted ID proof"
    ],
    eligibility: [
      "16+ years for gearless 2-wheelers",
      "18+ years for light motor vehicles",
      "20+ years for commercial vehicles"
    ],
    whoCanApply: ["Indian citizens", "Foreigners with valid residence permit"],
    fees: "₹200 per vehicle class + ₹200 smart card fee",
    processingTime: "7-15 days after passing test",
    issuingAuthority: "Regional Transport Office (RTO)",
    officialWebsite: "https://parivahan.gov.in",
    applicationTypes: [
      { id: "learner", name: "Learner License" },
      { id: "permanent", name: "Permanent License" },
      { id: "renewal", name: "Renewal of License" }
    ],
    faqs: [
      { question: "Is a medical certificate required?", answer: "Yes, Form 1A is required for transport vehicles or applicants over 40 years of age." }
    ],
    relatedServices: ["aadhaar"],
    requirements: ["Photo", "Signature", "Age Proof", "Address Proof", "Learner License (for Permanent DL)"],
    fields: [
      { id: "applicationType", label: "Application Type", type: "select", required: true, options: [{ value: "learner", label: "Learner License" }, { value: "permanent", label: "Permanent License" }, { value: "renewal", label: "Renewal" }] },
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "vehicle", label: "Vehicle Category", type: "select", required: true, options: [
        { value: "mcwg", label: "Motorcycle with gear" },
        { value: "lmv", label: "Light Motor Vehicle (Car)" }
      ]},
      { id: "photo", label: "Photo", type: "image", required: true, maxSizeMB: 2 },
      { id: "signature", label: "Signature", type: "signature", required: true },
      { id: "learnerId", label: "Learner License Number", type: "text", required: true, dependsOn: { field: "applicationType", value: ["permanent"] } }
    ]
  },
  {
    id: "voter-id",
    name: "Voter ID",
    description: "Identity document issued by the Election Commission of India.",
    overview: "The Indian Voter ID Card (officially the Elector's Photo Identity Card or EPIC) is an identity document issued by the Election Commission of India to adult domiciles of India who have reached the age of 18.",
    benefits: [
      "Right to vote in democratic elections",
      "Valid proof of identity and address",
      "Required for buying SIM cards, opening bank accounts, etc."
    ],
    eligibility: [
      "Citizen of India",
      "18 years of age or older"
    ],
    whoCanApply: ["Indian citizens aged 18+"],
    fees: "Free",
    processingTime: "30-45 days",
    issuingAuthority: "Election Commission of India",
    officialWebsite: "https://voters.eci.gov.in/",
    applicationTypes: [
      { id: "new", name: "New Voter Registration (Form 6)" },
      { id: "correction", name: "Correction of Entries (Form 8)" }
    ],
    requirements: ["Age Proof", "Address Proof", "Passport Size Photograph"],
    fields: [
      { id: "applicationType", label: "Application Type", type: "radio", required: true, options: [{ value: "new", label: "New Voter" }, { value: "correction", label: "Correction" }] },
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "relativeName", label: "Father/Mother/Husband's Name", type: "text", required: true },
      { id: "address", label: "Current Address", type: "address", required: true, prefillKey: "address" },
      { id: "photo", label: "Passport-size Photo", type: "image", required: true, maxSizeMB: 2 },
      { id: "ageProof", label: "Age Proof (Aadhaar/PAN/Birth Certificate)", type: "file", required: true, maxSizeMB: 5 },
      { id: "addressProof", label: "Address Proof", type: "file", required: true, maxSizeMB: 5 }
    ]
  }
,
  {
    id: "ration-card",
    name: "Ration Card",
    description: "Official document for Ration Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "npr",
    name: "National Population Register (NPR) ID",
    description: "Official document for National Population Register (NPR) ID",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "oci",
    name: "Overseas Citizen of India (OCI) Card",
    description: "Official document for Overseas Citizen of India (OCI) Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "pio",
    name: "Person of Indian Origin (PIO) Card",
    description: "Official document for Person of Indian Origin (PIO) Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "senior-citizen",
    name: "Senior Citizen Card (State-issued)",
    description: "Official document for Senior Citizen Card (State-issued)",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "udid",
    name: "Disability ID Card (UDID)",
    description: "Official document for Disability ID Card (UDID)",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "ex-servicemen",
    name: "Ex-Servicemen Identity Card",
    description: "Official document for Ex-Servicemen Identity Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "govt-emp",
    name: "Government Employee Identity Card",
    description: "Official document for Government Employee Identity Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "defence",
    name: "Defence Personnel Identity Card",
    description: "Official document for Defence Personnel Identity Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "police",
    name: "Police Identity Card",
    description: "Official document for Police Identity Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "freedom-fighter",
    name: "Freedom Fighter Identity Card",
    description: "Official document for Freedom Fighter Identity Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "tan",
    name: "TAN (Tax Deduction Account Number)",
    description: "Official document for TAN (Tax Deduction Account Number)",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "gstin",
    name: "GST Registration Certificate (GSTIN)",
    description: "Official document for GST Registration Certificate (GSTIN)",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "prof-tax",
    name: "Professional Tax Registration",
    description: "Official document for Professional Tax Registration",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "iec",
    name: "Import Export Code (IEC)",
    description: "Official document for Import Export Code (IEC)",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "apaar",
    name: "APAAR ID (Academic Bank of Credits)",
    description: "Official document for APAAR ID (Academic Bank of Credits)",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "student-id",
    name: "Student Identity Card",
    description: "Official document for Student Identity Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "national-scholarship",
    name: "National Scholarship ID",
    description: "Official document for National Scholarship ID",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "abha",
    name: "ABHA Health ID",
    description: "Official document for ABHA Health ID",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "ayushman",
    name: "Ayushman Bharat Card (PM-JAY)",
    description: "Official document for Ayushman Bharat Card (PM-JAY)",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "cghs",
    name: "CGHS Card",
    description: "Official document for CGHS Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "esic",
    name: "ESIC Card",
    description: "Official document for ESIC Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "health-smartcard",
    name: "Health Insurance Smart Card",
    description: "Official document for Health Insurance Smart Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "mgnrega",
    name: "MGNREGA Job Card",
    description: "Official document for MGNREGA Job Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "labour-card",
    name: "Labour Card",
    description: "Official document for Labour Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "construction-worker",
    name: "Building & Construction Worker Card",
    description: "Official document for Building & Construction Worker Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "street-vendor",
    name: "Street Vendor ID Card",
    description: "Official document for Street Vendor ID Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "farmer-id",
    name: "Farmer ID Card",
    description: "Official document for Farmer ID Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "kcc",
    name: "Kisan Credit Card (KCC)",
    description: "Official document for Kisan Credit Card (KCC)",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "pm-kisan-id",
    name: "PM-Kisan ID",
    description: "Official document for PM-Kisan ID",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "shram-suvidha",
    name: "Shram Suvidha ID",
    description: "Official document for Shram Suvidha ID",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "eshram",
    name: "e-Shram Card",
    description: "Official document for e-Shram Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "ppo",
    name: "Pension Payment Order (PPO)",
    description: "Official document for Pension Payment Order (PPO)",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
    ]
  },
  {
    id: "pensioner-id",
    name: "Pensioner Identity Card",
    description: "Official document for Pensioner Identity Card",
    requirements: ["Aadhaar Card", "Photograph", "Address Proof"],
    faqs: [
        { question: "How to apply?", answer: "Apply online or via nearest Seva Kendra." }
    ],
    fields: [
      { id: "fullName", label: "Full Name", type: "text", required: true, prefillKey: "fullName" },
      { id: "dob", label: "Date of Birth", type: "date", required: true, prefillKey: "dob" },
      { id: "address", label: "Address", type: "address", required: true, prefillKey: "address" },
      { id: "proof", label: "Proof of Identity", type: "file", required: true, acceptedFormats: [".pdf", ".jpg"] }
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
  category: string;
  fileUrl?: string; // Mock file URL
}

export const vaultCategories = [
  "Identity Documents",
  "Educational Certificates",
  "Financial Documents",
  "Health Records",
  "State Certificates"
];

export const mockCredentials: Credential[] = [
  {
    id: "cred-1",
    name: "Aadhaar Card",
    issuer: "UIDAI",
    dateIssued: "2015-08-20",
    isVerified: true,
    linkedToDigilocker: true,
    category: "Identity Documents",
    fileUrl: "/mock-docs/aadhaar.pdf"
  },
  {
    id: "cred-2",
    name: "PAN Card",
    issuer: "Income Tax Department",
    dateIssued: "2018-02-14",
    isVerified: true,
    linkedToDigilocker: true,
    category: "Identity Documents",
    fileUrl: "/mock-docs/pan.pdf"
  },
  {
    id: "cred-3",
    name: "Income Certificate",
    issuer: "Revenue Department, Govt of UP",
    dateIssued: "2025-01-10",
    isVerified: false,
    linkedToDigilocker: false,
    category: "State Certificates",
    fileUrl: "/mock-docs/income.pdf"
  },
  {
    id: "cred-4",
    name: "Class 10 Marksheet",
    issuer: "CBSE",
    dateIssued: "2006-05-24",
    isVerified: true,
    linkedToDigilocker: true,
    category: "Educational Certificates",
    fileUrl: "/mock-docs/10th-marksheet.pdf"
  },
  {
    id: "cred-5",
    name: "COVID-19 Vaccination Certificate",
    issuer: "Ministry of Health",
    dateIssued: "2021-08-15",
    isVerified: true,
    linkedToDigilocker: true,
    category: "Health Records",
    fileUrl: "/mock-docs/vaccine.pdf"
  }
];
