# Business Rules

## Authentication Policy
- A visitor should be able to freely browse the entire platform without a login wall until they try to take an action that writes data.
- The login/sign-up prompt should only appear when the user:
  - Clicks "Apply" on a scheme
  - Clicks "Apply" on a government ID
  - Submits a complaint
  - Sends a message to the AI Assistant
  - Opens "My Applications & Insights" or "My Credentials"
- On login triggered mid-action, the user is returned to their exact prior context with in-progress form data preserved wherever possible.

## Functional Requirements
- **Schemes**: Search/filter without login. Apply via data-driven forms. Auto-fill from My Credentials with consent.
- **Government ID**: Browse ID types without login. Apply via data-driven forms. Auto-fill from My Credentials/DigiLocker with consent. Add new ID types without restructuring.
- **Complaints**: Browse categories without login. Submit with auth. Form changes dynamically based on category. "Issue with existing application" shows past applications. Trackable Complaint ID.
- **My Applications & Insights**: View all applications/complaints. Step tracker for lifecycle. Quick action to file a follow-up complaint.
- **My Credentials**: Connect DigiLocker or manually upload. All fields optional. Consent before autofill. Version history on replace.
- **AI Assistant**: Open chat without login. Send message with login. Answer specific to user's application status and platform knowledge.
- **Global Search**: Search schemes, IDs, complaints from anywhere.
- **Notifications**: App status, missing docs, deadlines, AI recommendations.

## Application & Complaint Lifecycle
**Application Lifecycle (Configurable per scheme/ID)**:
Draft → Submitted → Under Review → Documents Pending → Verification Complete → Appointment Required → Approved → Rejected → Completed

**Complaint Lifecycle**:
Draft → Submitted → Assigned → In Progress → Resolved → Closed

## Roles & Permissions (v1)
- **Citizen**: Browse publicly, apply, file complaints, manage credentials, use AI Assistant.
- **AI System**: Scoped read access to a user's own data strictly to power the AI Assistant. Never given write access beyond what a Citizen explicitly initiates.
