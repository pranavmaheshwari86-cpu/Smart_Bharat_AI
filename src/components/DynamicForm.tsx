"use client";

import { useState } from "react";
import { FormField } from "@/lib/data";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

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
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-8 text-center"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-semibold text-slate-900">Successfully Submitted</h3>
        <p className="mt-2 text-slate-500">Your application has been received and is now under review.</p>
        <Button 
          variant="outline" 
          className="mt-6"
          onClick={() => {
            setIsSuccess(false);
            setFormData({});
          }}
        >
          Submit Another
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </Label>
          
          {field.type === "textarea" ? (
            <textarea
              id={field.id}
              required={field.required}
              className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              onChange={(e) => handleChange(field.id, e.target.value)}
              value={(formData[field.id] as string) || ""}
            />
          ) : field.type === "select" ? (
            <select
              id={field.id}
              required={field.required}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
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
            <Input
              id={field.id}
              type={field.type}
              required={field.required}
              onChange={(e) => handleChange(field.id, field.type === "file" ? e.target.files : e.target.value)}
              value={field.type !== "file" ? (formData[field.id] as string) || "" : undefined}
            />
          )}
        </div>
      ))}
      
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Processing..." : submitLabel}
      </Button>
    </form>
  );
}
