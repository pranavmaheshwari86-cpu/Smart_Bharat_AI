"use client";

import React, { useEffect, useState } from "react";

interface GoogleSignInButtonProps {
  onGoogleSuccess: (credential?: string, demoProfile?: any) => Promise<void>;
  isLoading?: boolean;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (notification?: any) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
        };
      };
    };
  }
}

export function GoogleSignInButton({ onGoogleSuccess, isLoading = false }: GoogleSignInButtonProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    // Load Google GIS script dynamically if not present
    if (!document.getElementById("google-gis-script")) {
      const script = document.createElement("script");
      script.id = "google-gis-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setScriptLoaded(true);
        if (clientId && window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response: any) => {
              if (response.credential) {
                onGoogleSuccess(response.credential);
              }
            },
          });
        }
      };
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, [onGoogleSuccess]);

  const handleGoogleButtonClick = async () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (clientId && window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      // In development / demo environment without live Client ID:
      // Provide instant account chooser simulation matching Google Account Chooser
      await onGoogleSuccess(undefined, {
        sub: `google_cit_${Date.now()}`,
        name: "Pranav Maheshwari",
        email: "pranav.maheshwari@smartbharat.gov.in",
        picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        email_verified: true,
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleButtonClick}
      disabled={isLoading}
      className="w-full h-12 rounded-xl border border-[#E8E8E5] bg-[#FFFFFF] hover:bg-[#F5F5F2] active:bg-[#EBEBE8] text-[#111111] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-3 shadow-2xs hover:shadow-xs cursor-pointer group disabled:opacity-75"
    >
      {/* Official Google Color G Logo */}
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        />
      </svg>

      <span>Continue with Google</span>
    </button>
  );
}
