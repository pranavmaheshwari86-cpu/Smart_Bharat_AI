"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { validatePasswordComplexity } from "@smart-bharat/shared";

interface PasswordStrengthMeterProps {
  password?: string;
}

export function PasswordStrengthMeter({ password = "" }: PasswordStrengthMeterProps) {
  if (!password) return null;

  const { score } = validatePasswordComplexity(password);

  const rules = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "At least 1 uppercase letter (A-Z)", valid: /[A-Z]/.test(password) },
    { label: "At least 1 lowercase letter (a-z)", valid: /[a-z]/.test(password) },
    { label: "At least 1 number (0-9)", valid: /[0-9]/.test(password) },
    { label: "At least 1 special symbol (!@#$%^&*)", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const getStrengthLabel = () => {
    switch (score) {
      case 0:
      case 1:
        return { text: "Weak", color: "bg-[#FF4D4F]", textCol: "text-[#FF4D4F]" };
      case 2:
        return { text: "Fair", color: "bg-[#FAAD14]", textCol: "text-[#FAAD14]" };
      case 3:
        return { text: "Good", color: "bg-[#1890FF]", textCol: "text-[#1890FF]" };
      case 4:
      default:
        return { text: "Strong", color: "bg-[#34C759]", textCol: "text-[#34C759]" };
    }
  };

  const strength = getStrengthLabel();

  return (
    <div className="space-y-2.5 pt-1.5">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-[#666666]">Password Strength:</span>
          <span className={`font-bold ${strength.textCol}`}>{strength.text}</span>
        </div>
        <div className="flex h-1.5 w-full gap-1 rounded-full bg-[#E8E8E5] overflow-hidden">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-full flex-1 transition-all duration-300 ${
                step <= score ? strength.color : "bg-[#E8E8E5]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Rules Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
        {rules.map((rule, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-[11px] font-medium">
            {rule.valid ? (
              <Check className="w-3.5 h-3.5 text-[#34C759] flex-shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-[#9A9A9A] flex-shrink-0" />
            )}
            <span className={rule.valid ? "text-[#111111] font-semibold" : "text-[#666666]"}>
              {rule.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
