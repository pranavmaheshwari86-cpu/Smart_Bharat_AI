import { twMerge } from "tailwind-merge";

export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

function clsxNative(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const inner = clsxNative(...input);
      if (inner) classes.push(inner);
    } else if (typeof input === "object") {
      for (const key in input) {
        if (input[key]) classes.push(key);
      }
    }
  }
  return classes.join(" ");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsxNative(inputs));
}

export function getUserDisplayName(user?: { fullName?: string; email?: string } | null): string {
  if (!user) return "Citizen User";
  
  if (user.fullName && user.fullName.trim() !== "" && user.fullName !== "Citizen User" && user.fullName !== "Citizen") {
    return user.fullName;
  }
  
  if (user.email && user.email.includes("@")) {
    const emailPrefix = user.email.split("@")[0];
    const nameParts = emailPrefix.split(/[._-]+/).filter(Boolean);
    if (nameParts.length > 0) {
      return nameParts
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");
    }
    return emailPrefix;
  }
  
  return user.fullName || "Citizen User";
}

