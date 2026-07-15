"use client";

import { useState } from "react";
import { FormField } from "@/lib/data";
import { CheckCircle2, Loader2 } from "lucide-react";

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, unknown>) => void;
  submitLabel?: string;
}

export function DynamicForm({ fields, onSubmit, submitLabel = "Submit Application" }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (id: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSubmit(formData);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div 
        className="flex flex-col items-center justify-center py-12 text-center transition-opacity duration-300"
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-accent-600 border border-accent-100 shadow-sm" aria-hidden="true">
          <CheckCircle2 size={32} strokeWidth={2} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Request Submitted</h3>
        <p className="mt-2 text-slate-600 max-w-sm">
          Your information has been successfully routed to the respective department for processing.
        </p>
        <button 
          className="mt-8 px-6 py-2.5 text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md transition-colors focus-ring"
          onClick={() => {
            setIsSuccess(false);
            setFormData({});
          }}
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label htmlFor={field.id} className="block text-sm font-semibold text-slate-900">
            {field.label} {field.required && <span className="text-accent-600" aria-hidden="true">*</span>}
            {field.required && <span className="sr-only">Required</span>}
          </label>
          
          {field.type === "textarea" ? (
            <textarea
              id={field.id}
              required={field.required}
              className="flex min-h-[120px] w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus-ring transition-colors shadow-sm resize-y"
              onChange={(e) => handleChange(field.id, e.target.value)}
              value={(formData[field.id] as string) || ""}
              placeholder={`Enter your ${field.label.toLowerCase()}...`}
            />
          ) : field.type === "select" ? (
            <select
              id={field.id}
              required={field.required}
              className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 focus-ring transition-colors shadow-sm"
              onChange={(e) => handleChange(field.id, e.target.value)}
              value={(formData[field.id] as string) || ""}
            >
              <option value="" disabled>Select an option</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.id}
              type={field.type}
              required={field.required}
              className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-500 focus-ring transition-colors shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
              onChange={(e) => handleChange(field.id, field.type === "file" ? e.target.files : e.target.value)}
              value={field.type !== "file" ? (formData[field.id] as string) || "" : undefined}
              placeholder={field.type === "text" || field.type === "email" ? `Enter your ${field.label.toLowerCase()}...` : ""}
            />
          )}
        </div>
      ))}
      
      <div className="pt-4">
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="flex h-12 w-full items-center justify-center rounded-md bg-accent-600 text-white font-medium hover:bg-accent-700 transition-colors focus-ring disabled:opacity-70 disabled:pointer-events-none"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2" aria-live="polite">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
