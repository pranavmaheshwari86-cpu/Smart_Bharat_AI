"use client";

import { useState, useEffect } from "react";
import { FormField, mockCredentials } from "@/lib/data";
import { CheckCircle2, Loader2, Save, Eye, Edit2 } from "lucide-react";
import { SmartUpload } from "./SmartUpload";
import { Plus, Trash2 } from "lucide-react";

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, unknown>) => void;
  submitLabel?: string;
  formId?: string;
}

// Mock User Profile for auto-prefill
const MOCK_USER_PROFILE: Record<string, string> = {
  fullName: "Pranav Maheshwari",
  dob: "1990-01-01",
  address: "123 Smart Bharat Avenue, Tech Park, Bangalore 560001",
  aadhaar: "XXXX-XXXX-1234",
  fatherName: "Rajesh Maheshwari",
  phone: "9876543210"
};

export function DynamicForm({ fields, onSubmit, submitLabel = "Submit Application", formId = "default" }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  // Load draft & initialize prefill
  useEffect(() => {
    const draftKey = `draft_${formId}`;
    const savedDraft = localStorage.getItem(draftKey);
    let initialData = savedDraft ? JSON.parse(savedDraft) : {};

    // Auto-prefill missing fields
    let dataChanged = false;
    fields.forEach(f => {
      if (!initialData[f.id]) {
        if (f.prefillKey && MOCK_USER_PROFILE[f.prefillKey]) {
          initialData[f.id] = MOCK_USER_PROFILE[f.prefillKey];
          dataChanged = true;
        } else if (f.type === 'file' || f.type === 'image' || f.type === 'signature') {
          // Auto-attach from Vault based on simple heuristic
          const match = mockCredentials.find(c => 
            f.label.toLowerCase().includes("aadhaar") && c.name.toLowerCase().includes("aadhaar") ||
            f.label.toLowerCase().includes("pan") && c.name.toLowerCase().includes("pan") ||
            f.label.toLowerCase().includes("photo") && c.name.toLowerCase().includes("photo") ||
            f.label.toLowerCase().includes("income") && c.name.toLowerCase().includes("income") ||
            f.label.toLowerCase().includes("address") && c.name.toLowerCase().includes("aadhaar") // use aadhaar for address proof mock
          );
          if (match) {
            initialData[f.id] = { type: 'credential', docId: match.name, fromVault: true };
            dataChanged = true;
          }
        }
      }
    });

    if (savedDraft || dataChanged) {
      setFormData(initialData);
    }
  }, [fields, formId]);

  const handleChange = (id: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    setIsDraftSaved(false);
  };

  const handleSaveDraft = () => {
    localStorage.setItem(`draft_${formId}`, JSON.stringify(formData));
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 2000);
  };

  const isFieldVisible = (field: FormField) => {
    if (!field.dependsOn) return true;
    const parentValue = formData[field.dependsOn.field] as string;
    if (Array.isArray(field.dependsOn.value)) {
      return field.dependsOn.value.includes(parentValue);
    }
    return parentValue === field.dependsOn.value;
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReviewing(true);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) return;
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      localStorage.removeItem(`draft_${formId}`);
      onSubmit(formData);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center transition-opacity duration-300">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 border border-green-200 shadow-sm" aria-hidden="true">
          <CheckCircle2 size={32} strokeWidth={2} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Request Submitted</h3>
        <p className="mt-2 text-slate-600 max-w-sm">
          Your application has been successfully routed. You will receive an SMS and Email with tracking details shortly.
        </p>
        <button 
          className="mt-8 px-6 py-2.5 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors shadow-sm"
          onClick={() => {
            setIsSuccess(false);
            setIsReviewing(false);
            setFormData({});
          }}
        >
          Submit Another
        </button>
      </div>
    );
  }

  if (isReviewing) {
    const visibleFields = fields.filter(isFieldVisible);
    
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            Review Application
          </h3>
          <button 
            onClick={() => setIsReviewing(false)}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
          {visibleFields.map(field => {
            const val = formData[field.id];
            let displayVal = "Not provided";
            if (val) {
              if (field.type === 'file' || field.type === 'image' || field.type === 'signature') {
                displayVal = (val as any).name || (val as any).docId || "Uploaded File";
              } else if (field.type === 'select' || field.type === 'radio') {
                displayVal = field.options?.find(o => o.value === val)?.label || (val as string);
              } else {
                displayVal = (val as string);
              }
            }
            if (field.type === 'group') {
              const arr = (val as any[]) || [];
              displayVal = arr.length ? `${arr.length} item(s) added` : "None";
            }
            return (
              <div key={field.id} className="grid grid-cols-1 sm:grid-cols-3 p-4">
                <div className="text-sm font-medium text-slate-500">{field.label}</div>
                <div className="sm:col-span-2 text-sm font-semibold text-slate-900">{displayVal}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              className="mt-1 w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-600"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
            />
            <span className="text-sm text-slate-700 leading-relaxed">
              <strong>Declaration:</strong> I hereby declare that the information provided above is true and correct to the best of my knowledge. I consent to the validation of my documents and data by the issuing authorities.
            </span>
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            onClick={() => setIsReviewing(false)}
            className="flex-1 h-12 rounded-md bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            Back to Edit
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!consentChecked || isSubmitting}
            className="flex-[2] h-12 flex items-center justify-center rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Confirm & Submit"}
          </button>
        </div>
      </div>
    );
  }

  const visibleFields = fields.filter(isFieldVisible);

  return (
    <form onSubmit={handleReview} className="space-y-6 animate-in fade-in duration-500">
      {visibleFields.map((field) => (
        <div key={field.id} className="space-y-2">
          {field.type !== "file" && field.type !== "image" && field.type !== "signature" && field.type !== "checkbox" && field.type !== "radio" && field.type !== "group" && (
            <label htmlFor={field.id} className="block text-sm font-semibold text-slate-800 flex items-center flex-wrap gap-2">
              <span>{field.label} {field.required && <span className="text-red-500">*</span>}</span>
              {field.prefillKey && MOCK_USER_PROFILE[field.prefillKey] && (
                <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">Auto-filled</span>
              )}
              {formData[field.id] && (formData[field.id] as any).fromVault && (
                <span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">From Vault</span>
              )}
            </label>
          )}
          
          {field.type === "textarea" || field.type === "address" ? (
            <textarea
              id={field.id}
              required={field.required}
              className="flex min-h-[100px] w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm resize-y"
              onChange={(e) => handleChange(field.id, e.target.value)}
              value={(formData[field.id] as string) || ""}
              placeholder={`Enter ${field.label.toLowerCase()}...`}
            />
          ) : field.type === "select" ? (
            <select
              id={field.id}
              required={field.required}
              className="flex h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm"
              onChange={(e) => handleChange(field.id, e.target.value)}
              value={(formData[field.id] as string) || ""}
            >
              <option value="" disabled>Select {field.label}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : field.type === "radio" ? (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-800">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                {field.options?.map((opt) => (
                  <label key={opt.value} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${formData[field.id] === opt.value ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <input 
                      type="radio" 
                      name={field.id} 
                      value={opt.value}
                      checked={formData[field.id] === opt.value}
                      required={field.required}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-600"
                    />
                    <span className="text-sm font-medium text-slate-900">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : field.type === "group" ? (
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-bold text-slate-800">{field.label}</label>
                {field.repeatable && (
                  <button 
                    type="button"
                    onClick={() => {
                      const current = (formData[field.id] as any[]) || [];
                      handleChange(field.id, [...current, {}]);
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md"
                  >
                    <Plus className="w-3 h-3" /> Add {field.label}
                  </button>
                )}
              </div>
              
              {((formData[field.id] as any[]) || (field.repeatable ? [] : [{}])).map((item, index) => (
                <div key={index} className="relative p-4 border border-slate-200 rounded-lg bg-white shadow-sm space-y-4">
                  {field.repeatable && (
                    <button 
                      type="button"
                      onClick={() => {
                        const current = [...((formData[field.id] as any[]) || [])];
                        current.splice(index, 1);
                        handleChange(field.id, current);
                      }}
                      className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  {field.subFields?.map(subField => (
                    <div key={subField.id} className="space-y-1">
                      <label className="block text-xs font-semibold text-slate-700">{subField.label}</label>
                      {subField.type === "select" ? (
                        <select
                          required={subField.required}
                          className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          value={item[subField.id] || ""}
                          onChange={(e) => {
                            const current = [...((formData[field.id] as any[]) || (field.repeatable ? [] : [{}]))];
                            if (!current[index]) current[index] = {};
                            current[index][subField.id] = e.target.value;
                            handleChange(field.id, current);
                          }}
                        >
                          <option value="" disabled>Select {subField.label}</option>
                          {subField.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                      ) : (
                        <input
                          type={subField.type}
                          required={subField.required}
                          className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          value={item[subField.id] || ""}
                          onChange={(e) => {
                            const current = [...((formData[field.id] as any[]) || (field.repeatable ? [] : [{}]))];
                            if (!current[index]) current[index] = {};
                            current[index][subField.id] = e.target.value;
                            handleChange(field.id, current);
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
              {((formData[field.id] as any[]) || []).length === 0 && field.repeatable && (
                <div className="text-sm text-slate-500 text-center py-4 border-2 border-dashed border-slate-200 rounded-lg">
                  No {field.label.toLowerCase()} added yet.
                </div>
              )}
            </div>
          ) : field.type === "checkbox" ? (
            <label className="flex items-start gap-3 cursor-pointer p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
               <input 
                  type="checkbox"
                  required={field.required}
                  checked={!!formData[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                />
                <span className="text-sm font-medium text-slate-800">{field.label} {field.required && <span className="text-red-500">*</span>}</span>
            </label>
          ) : field.type === "file" || field.type === "image" || field.type === "signature" ? (
            <SmartUpload 
              id={field.id} 
              label={`${field.label} ${field.required ? '*' : ''}`} 
              acceptedFormats={field.acceptedFormats || (field.type === "image" || field.type === "signature" ? [".jpg", ".png"] : [".pdf", ".jpg", ".png"])}
              maxSizeMB={field.maxSizeMB}
              value={formData[field.id]}
              onChange={(val) => handleChange(field.id, val)}
            />
          ) : (
            <input
              id={field.id}
              type={field.type}
              required={field.required}
              className="flex h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-sm"
              onChange={(e) => handleChange(field.id, e.target.value)}
              value={(formData[field.id] as string) || ""}
              placeholder={`Enter ${field.label.toLowerCase()}...`}
            />
          )}
        </div>
      ))}
      
      <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6 border-t border-slate-200 mt-8">
        <button 
          type="button" 
          onClick={handleSaveDraft}
          className="flex-1 h-12 flex items-center justify-center gap-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
        >
          {isDraftSaved ? <><CheckCircle2 className="w-4 h-4 text-green-600" /> Saved</> : <><Save className="w-4 h-4" /> Save Draft</>}
        </button>
        <button 
          type="submit" 
          className="flex-[2] h-12 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          Review Application
        </button>
      </div>
    </form>
  );
}
