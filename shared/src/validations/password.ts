export interface PasswordValidationResult {
  isValid: boolean;
  score: number; // 0 - 4
  errors: string[];
}

export function validatePasswordComplexity(password: string): PasswordValidationResult {
  const errors: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    errors.push("Password must be at least 8 characters long.");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    errors.push("Password must contain at least one uppercase letter (A-Z).");
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    errors.push("Password must contain at least one lowercase letter (a-z).");
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    errors.push("Password must contain at least one number (0-9).");
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    errors.push("Password must contain at least one special character (!@#$%^&*).");
  }

  return {
    isValid: errors.length === 0,
    score: Math.min(score, 4),
    errors,
  };
}
