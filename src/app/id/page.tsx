"use client";

import Link from "next/link";
import { govIds } from "@/lib/data";
import { ArrowRight, Fingerprint } from "lucide-react";

export default function GovtIdsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
      <div className="mb-16 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-normal text-slate-900 mb-4">Identity & Records</h1>
        <p className="text-lg text-slate-700 leading-relaxed">
          Apply, renew, or manage your essential government identification documents in one unified portal.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {govIds.map((idDoc) => (
          <div key={idDoc.id}>
            <Link href={`/id/${idDoc.id}`} className="block h-full group focus-ring rounded-lg">
              <div className="flex h-full flex-col accessible-card p-8 border border-slate-200 hover:border-accent-600 transition-colors relative overflow-hidden group-hover:-translate-y-1">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-md bg-slate-900 text-white shadow-sm group-hover:scale-105 group-hover:bg-accent-700 transition-transform">
                  <Fingerprint strokeWidth={1.5} className="h-6 w-6" aria-hidden="true" />
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-accent-700 transition-colors">{idDoc.name}</h2>
                <p className="text-base text-slate-700 leading-relaxed flex-1 mb-8">
                  {idDoc.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-200">
                  <span className="text-sm font-bold text-slate-900">View Requirements</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-100 text-slate-600 group-hover:bg-accent-50 group-hover:text-accent-700 transition-colors">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
