export interface UserRecord {
  id: string;
  full_name: string;
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_verified: boolean;
  google_id?: string | null;
  auth_provider: "GOOGLE" | "EMAIL" | "PHONE";
  password_hash?: string | null;
  profile_photo?: string | null;
  role: "CITIZEN" | "ADMIN";
  status: "ACTIVE" | "LOCKED" | "SUSPENDED";
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
  last_login: string;
  last_active: string;
  failed_login_attempts: number;
  account_locked: boolean;
  account_lock_until?: string | null;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  profilePhoto?: string;
  role: "CITIZEN" | "ADMIN";
  authProvider?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  profileCompleted: boolean;
  createdAt?: string;
  lastLogin?: string;
}

export interface SessionRecord {
  id: string;
  user_id: string;
  refresh_token: string;
  device_info: string;
  ip_address: string;
  user_agent: string;
  expires_at: string;
  created_at: string;
  last_active: string;
}

export interface OtpRecord {
  id: string;
  identifier: string;
  otp_hash: string;
  purpose: "PHONE_VERIFICATION" | "EMAIL_VERIFICATION" | "LOGIN";
  expires_at: string;
  resend_available_at: string;
  attempts: number;
  verified: boolean;
  created_at: string;
}

export interface PasswordResetRecord {
  id: string;
  user_id: string;
  email: string;
  token_hash: string;
  expires_at: string;
  used: boolean;
  created_at: string;
}

export interface AuditLogRecord {
  id: string;
  user_id?: string | null;
  action: string;
  ip_address: string;
  user_agent: string;
  metadata?: string | null;
  created_at: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: string[];
}
