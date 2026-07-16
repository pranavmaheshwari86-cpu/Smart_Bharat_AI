# PROMPT 2A — GOVERNMENT IDs MODULE
## Architecture + Aadhaar + PAN + Passport

**IMPORTANT**
This extends Prompt 1 (Master Implementation Specification).
- Do NOT redesign anything from Prompt 1.
- Follow the same design system, architecture, and reusable component library.
- Follow the same coding standards.
- Everything must remain schema-driven.
- Never hardcode forms, upload fields, or validations.
- Everything must come from configuration.

=========================================================
## MODULE OVERVIEW
The Government IDs module is a digital service center where citizens can:
- Explore Government IDs
- Learn about each ID (eligibility, required docs, processing time, fees)
- Apply
- Upload documents
- Track application
- Save draft
- Reuse credentials

=========================================================
## NAVIGATION & DASHBOARD
- **Main Menu**: Government IDs → Government ID Dashboard
- **Dashboard Sections**: Recent Applications, Continue Draft, Popular IDs, Recently Updated IDs, AI Recommendations, Search Bar, Quick Filters, Categories.

=========================================================
## SEARCH & CATEGORY CARDS
- **Search**: Aadhaar, PAN, Passport, Driving Licence, Voter ID, Birth/Death/Marriage Certificates, ABHA, Ration Card, etc.
- **Categories**: Identity, Travel, Certificates, Health, Education, Financial, Agriculture, Social Welfare.

=========================================================
## SERVICE CARD
Every Government ID card displays:
- Official Logo/Icon, Service Name, Short Description, Estimated Time, Fees, Status, Apply Button, Learn More Button.

=========================================================
## DEDICATED SERVICE PAGE
Every service page must have:
- Hero, Overview, Benefits, Eligibility, Who Can Apply, Required Information, Required Documents, Application Process, Processing Time, Fees, FAQs, Apply Button.

=========================================================
## AADHAAR CARD
- **Sections**: Overview, Eligibility, Benefits, Required Info, Required Docs, Application Steps, FAQs.
- **Information Fields (Schema-driven)**: Full Name, DOB, Age, Gender, Mobile, Email, Residential Address, State, District, PIN, Parent/Guardian details.
- **Documents**: Identity Proof, Address Proof, DOB Proof, Photograph. Show Required/Optional, Accepted Formats, Max Size.

=========================================================
## PAN CARD
- **Information**: Applicant Name, Father's Name, DOB, Gender, Mobile, Email, Address, Existing PAN (for correction).
- **Documents**: Identity, Address, DOB, Photograph, Signature.
- **Features**: Auto Save, Draft, Auto Validation, Credential Reuse, Document Preview.

=========================================================
## PASSPORT
- **Information**: Full Name, DOB, Gender, Birth Place, Current/Permanent Address, Phone, Email, Emergency Contact, Parent/Spouse details.
- **Documents**: Address, Identity, DOB, Photograph.

=========================================================
## APPLICATION WIZARD
All IDs follow:
Step 1: Overview
Step 2: Eligibility
Step 3: Fill Information
Step 4: Upload Documents
Step 5: Review
Step 6: Submit
Step 7: Tracking

=========================================================
## DOCUMENT UPLOAD & REUSE
- **Smart Document Picker**: "Upload" OR "Use From Your Credentials" for every field (Signature, Photograph, ID Proof, etc.).
- **Document Preview**: Thumbnail, Filename, Size, Upload Date, Verification Status, Replace, Remove.
- **Auto Prefill**: Name, DOB, Gender, Address, Phone, Email from Credentials.

=========================================================
## VALIDATION & ERROR STATES
- **Validation**: Required Fields, File Size, Accepted Formats, Duplicate Detection, Image/Document Type/Age Validation.
- **Error States**: Missing Docs, Upload Failure, Validation Failure, Session Timeout, Offline Mode.

=========================================================
## STATE MANAGEMENT
- **Save Draft**: Save Draft, Exit, Continue Later.
- **Track Application**: Application Number, Timeline, Current Status, Submitted Documents, Expected Next Step.

=========================================================
## AI & ACCESSIBILITY
- **AI Assistant**: "Need Help? Ask AI" on every page (e.g., "How long will this take?").
- **Accessibility**: Keyboard Navigation, Screen Reader Labels, High Contrast, Large Click Targets.
- **Responsive**: Desktop, Laptop, Tablet, Mobile.

=========================================================
## SECURITY
- Never expose internal document URLs.
- Encrypt sensitive data.
- Require authentication before application submission.
- Require user confirmation before reusing stored credentials.
- Maintain audit logs for uploads, edits, and submissions.

=========================================================
## FINAL REQUIREMENT
Implement this module using reusable components. Keep every Government ID configurable. Adding a new Government ID must require only a new configuration entry, not new page-specific code. The architecture must be scalable, maintainable, modular, and production-ready.
