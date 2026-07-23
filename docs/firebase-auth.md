# 🔥 Firebase Phone OTP Authentication Setup & Operating Guide

Smart Bharat AI implements client-side Firebase Phone Authentication with Invisible reCAPTCHA, session persistence, and instant developer simulation mode.

---

## 📋 Table of Contents
1. [Firebase Console Configuration](#1-firebase-console-configuration)
2. [Enabling Phone Authentication](#2-enabling-phone-authentication)
3. [Authorized Domains Setup](#3-authorized-domains-setup)
4. [Environment Variables Setup](#4-environment-variables-setup)
5. [Developer Simulation Mode (No Keys Required)](#5-developer-simulation-mode)
6. [Architecture & Reusable API](#6-architecture--reusable-api)
7. [Firebase Error Reference & Troubleshooting](#7-firebase-error-reference--troubleshooting)

---

## 1. Firebase Console Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com).
2. Click **Add Project** and name your project (e.g., `smart-bharat-ai`).
3. Under **Project Settings** > **General**, scroll down to **Your apps** and click the Web icon (`</>`).
4. Register your app name (e.g., `Smart Bharat AI Web`).
5. Copy the `firebaseConfig` object values.

---

## 2. Enabling Phone Authentication

1. In the left navigation menu, click **Build** > **Authentication**.
2. Click **Get Started** (if opening for the first time).
3. Navigate to the **Sign-in method** tab.
4. Select **Phone** under Native Providers.
5. Toggle **Enable** and click **Save**.
6. *(Optional)* Add Phone Numbers for testing (e.g., `+91 9876543210` with verification code `123456`) under **Phone numbers for testing**.

---

## 3. Authorized Domains Setup

To allow Firebase to process reCAPTCHA and send SMS OTPs from your local environment and production server:

1. Go to **Authentication** > **Settings** > **Authorized domains**.
2. Verify `localhost` and `127.0.0.1` are present in the list.
3. Click **Add Domain** and add your production domain (e.g., `smartbharat.gov.in` or `smart-bharat.vercel.app`).

---

## 4. Environment Variables Setup

Add the following credentials to your local `.env` or `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=smart-bharat-ai.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=smart-bharat-ai
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=smart-bharat-ai.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123def456
```

---

## 5. Developer Simulation Mode

If `NEXT_PUBLIC_FIREBASE_API_KEY` is omitted, the application automatically enters **Dev Mode OTP Simulation**:

- **Allowed Phone Numbers**: Any 10-digit Indian number starting with 6-9 (e.g., `9876543210`).
- **Simulated OTP Code**: `123456`
- **Behavior**: Bypasses external SMS network calls and allows instant UI/UX testing.

---

## 6. Architecture & Reusable API

### Key Modules:
- `frontend/src/lib/firebase.ts`: Initializes Firebase app & auth instance with `browserLocalPersistence`.
- `frontend/src/lib/auth.ts`: Core functions (`sendOTP`, `verifyOTP`, `logoutFirebase`, `initInvisibleRecaptcha`).
- `frontend/src/context/AuthContext.tsx`: Global React Context managing user session lifecycle.
- `frontend/src/components/auth/OtpVerificationForm.tsx`: 6-digit box OTP UI with 60s countdown timer.

---

## 7. Firebase Error Reference & Troubleshooting

| Firebase Error Code | User-Facing Message | Resolution |
|---|---|---|
| `auth/invalid-phone-number` | Format invalid | Ensure phone number has 10 digits and starts with 6-9. |
| `auth/invalid-verification-code` | Invalid OTP code | Enter the correct 6-digit code or click Resend. |
| `auth/code-expired` | OTP expired | Request a new OTP code using the Resend button. |
| `auth/captcha-check-failed` | reCAPTCHA failed | Check authorized domains in Firebase Console. |
| `auth/quota-exceeded` | SMS quota exceeded | Use test numbers in Firebase Console or Dev Mode simulation. |
| `auth/too-many-requests` | Too many attempts | Wait 5 minutes before trying again. |
