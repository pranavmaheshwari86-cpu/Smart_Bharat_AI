# Database Models

High-level entities the platform must model:

- **User**: account, profile basics, auth state
- **Scheme**: name, description, category tags, region, eligibility rules, dynamic field definitions
- **Government ID**: ID type, required-document definitions, dynamic field definitions
- **Application**: links a User to a Scheme or Government ID, holds submitted field values, current lifecycle state, history of state changes
- **Complaint**: category, dynamic field values, optional link to an Application, current lifecycle state
- **Credential**: a stored document or profile field belonging to a User, with source tag (Manual/DigiLocker), version history, expiry metadata
- **Notification**: type, target User, related entity reference (Application/Complaint/Scheme), read/unread state
- **Conversation**: AI Assistant chat session, linked to a User (once authenticated), message history, optional page-context reference
- **Document**: the underlying stored file/blob referenced by a Credential, Application, or Complaint (shared storage pattern)
