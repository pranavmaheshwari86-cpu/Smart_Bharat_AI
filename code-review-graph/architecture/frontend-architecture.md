# Frontend Architecture (Next.js 15 App Router)

- **Framework**: Next.js 15 with App Router (`src/app`)
- **Port**: 3000
- **State Management**: React Context (`AuthContext.tsx`)
- **API Client**: Centralized Axios/Fetch client (`src/lib/api/client.ts` and `auth.api.ts`)
- **Styling**: Tailwind CSS & Framer Motion for smooth micro-animations
- **Key Modules**:
  - `src/app/page.tsx`: Main portal homepage
  - `src/app/login/page.tsx`: Authentication portal
  - `src/app/signup/page.tsx`: User registration with live password strength indicator
  - `src/app/schemes/`: Government schemes directory
  - `src/app/id/`: Digital ID verification
  - `src/app/vault/`: Document vault
  - `src/app/assistant/`: AI assistant interface
