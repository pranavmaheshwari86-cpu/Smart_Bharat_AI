"use client";

import { useState } from "react";
import { complaintCategories } from "@/lib/data";
import { DynamicForm } from "@/components/DynamicForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function ComplaintsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const activeCategory = complaintCategories.find(c => c.id === selectedCategory);

  const handleSubmit = (data: Record<string, unknown>) => {
    console.log("Submitted complaint:", { category: selectedCategory, ...data });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">File a Complaint</h1>
        <p className="mt-2 text-lg text-slate-600">Report civic issues directly to the concerned department.</p>
      </div>

      <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-yellow-600" aria-hidden="true" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>For emergencies, please dial 112 (Police) or 108 (Ambulance). This portal is for non-emergency administrative complaints only.</p>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Complaint Details</CardTitle>
          <CardDescription>Select a category to reveal the necessary fields.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-slate-700">
              Complaint Category
            </label>
            <select
              id="category"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
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
          </div>

          {activeCategory && (
            <div className="mt-8 border-t border-slate-100 pt-8">
              <h3 className="mb-4 text-lg font-medium text-slate-900">Fill Information</h3>
              <DynamicForm 
                fields={activeCategory.fields} 
                onSubmit={handleSubmit} 
                submitLabel="File Complaint" 
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
