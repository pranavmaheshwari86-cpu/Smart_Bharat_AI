import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

