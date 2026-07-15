"use client";

import { useState } from "react";
import { complaintCategories } from "@/lib/data";
import { DynamicForm } from "@/components/DynamicForm";
import { AlertCircle, ChevronDown } from "lucide-react";

export default function ComplaintsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const activeCategory = complaintCategories.find(c => c.id === selectedCategory);

  const handleSubmit = (data: Record<string, unknown>) => {
    console.log("Submitted complaint:", { category: selectedCategory, ...data });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-normal text-slate-900 mb-4">File a Complaint</h1>
        <p className="text-lg text-slate-700 leading-relaxed">
          Report civic issues directly to the concerned department with complete transparency and tracking.
        </p>
      </div>

      <div className="mb-8 rounded-lg border border-accent-200 bg-accent-50 p-5 shadow-sm">
        <div className="flex gap-4">
          <AlertCircle className="h-6 w-6 text-accent-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="text-base font-semibold text-accent-900">Important Note</h3>
            <p className="mt-1 text-base text-accent-800 leading-relaxed">
              For emergencies, please dial 112 (Police) or 108 (Ambulance). This portal is strictly for non-emergency administrative complaints and public grievances.
            </p>
          </div>
        </div>
      </div>

      <div className="accessible-card p-6 md:p-10 border border-slate-200 shadow-sm bg-white">
        <div className="mb-8 space-y-3">
          <label htmlFor="category" className="block text-base font-semibold text-slate-900">
            Complaint Category
          </label>
          <div className="relative">
            <select
              id="category"
              className="appearance-none flex h-12 w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 focus-ring transition-colors shadow-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>Select a category</option>
              {complaintCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" aria-hidden="true" />
          </div>
        </div>

        {activeCategory && (
          <div className="border-t border-slate-200 pt-8 mt-8">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">Details Required</h3>
            <DynamicForm 
              fields={activeCategory.fields} 
              onSubmit={handleSubmit} 
              submitLabel="File Complaint" 
            />
          </div>
        )}
      </div>
    </div>
  );
}
