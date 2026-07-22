"use client";

import { useState } from "react";
import { Search, Package, FileCheck, CheckCircle2, AlertCircle, ArrowLeft, Loader2, Fingerprint } from "lucide-react";
import Link from "next/link";

type Status = "submitted" | "processing" | "verified" | "issued" | "rejected";

interface TrackResult {
  id: string;
  type: string;
  status: Status;
  date: string;
  applicant: string;
  steps: {
    label: string;
    completed: boolean;
    active: boolean;
    date?: string;
  }[];
}

export default function TrackApplicationPage() {
  const [appId, setAppId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(null);
  const [error, setError] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appId.trim()) return;
    
    setIsSearching(true);
    setError("");
    setResult(null);

    // Mock API Call
    setTimeout(() => {
      setIsSearching(false);
      
      if (appId.toLowerCase() === "error") {
        setError("Invalid Application ID or no records found.");
        return;
      }

      setResult({
        id: appId.toUpperCase(),
        type: "Aadhaar Card Update",
        status: "processing",
        date: new Date().toLocaleDateString(),
        applicant: "Pranav Maheshwari",
        steps: [
          { label: "Application Submitted", completed: true, active: false, date: "10 Oct, 2026" },
          { label: "Document Verification", completed: true, active: false, date: "11 Oct, 2026" },
          { label: "Processing at Authority", completed: false, active: true },
          { label: "Dispatched / Ready for Download", completed: false, active: false }
        ]
      });
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link 
          href="/id" 
          className="mb-8 inline-flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Directory
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-sm mx-auto">
              <Package strokeWidth={2} className="h-8 w-8" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">Track Application</h1>
            <p className="text-slate-600 text-center max-w-lg mx-auto mb-10">
              Enter your Application Reference Number to check the real-time status of your Government ID request.
            </p>

            <form onSubmit={handleTrack} className="max-w-xl mx-auto mb-12">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. APP-8472-991A"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  className="w-full h-14 pl-12 pr-32 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all uppercase placeholder:normal-case font-medium text-slate-900 tracking-wide"
                />
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-2 h-10 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[100px]"
                >
                  {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : "Track"}
                </button>
              </div>
              {error && (
                <div className="mt-3 text-red-500 text-sm font-medium flex items-center gap-1.5 justify-center">
                  <AlertCircle className="w-4 h-4" /> {error}
                </div>
              )}
            </form>

            {result && (
              <div className="border-t border-slate-200 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1">{result.type}</h2>
                    <p className="text-slate-500 text-sm">Applicant: <span className="font-medium text-slate-700">{result.applicant}</span></p>
                    <p className="text-slate-500 text-sm">Ref ID: <span className="font-mono font-medium text-slate-700">{result.id}</span></p>
                  </div>
                  <div className="px-4 py-2 rounded-full text-sm font-bold capitalize bg-blue-100 text-blue-800 border border-blue-200">
                    Status: {result.status}
                  </div>
                </div>

                <div className="relative max-w-lg mx-auto">
                  <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200"></div>
                  
                  <ul className="space-y-8 relative z-10">
                    {result.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-6 items-start group">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm transition-colors duration-300 ${
                          step.completed ? 'bg-green-500 text-white' : 
                          step.active ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 
                          'bg-slate-100 text-slate-400'
                        }`}>
                          {step.completed ? <CheckCircle2 className="w-5 h-5" /> : 
                           step.active ? <Loader2 className="w-5 h-5 animate-spin" /> : 
                           <FileCheck className="w-5 h-5" />}
                        </div>
                        <div className="pt-2.5">
                          <h4 className={`font-semibold ${step.active || step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                            {step.label}
                          </h4>
                          {step.date && <p className="text-sm text-slate-500 mt-1">{step.date}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {result.status === "issued" && (
                  <div className="mt-12 text-center">
                    <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2 mx-auto">
                      <Fingerprint className="w-5 h-5" /> Download e-Document
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
