"use client";

import { useState, use } from "react";
import { notFound, useRouter } from "next/navigation";
import { govIds } from "@/lib/data";
import { DynamicForm } from "@/components/DynamicForm";
import { 
  ArrowLeft, CheckCircle2, Fingerprint, Clock, IndianRupee, 
  Building2, Globe, FileText, Sparkles, MessageCircleQuestion,
  ChevronDown, ChevronUp, ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function GovIdDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const idDoc = govIds.find(i => i.id === id);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<"pending" | "eligible" | "not-eligible" | "possibly">("pending");

  if (!idDoc) {
    notFound();
  }

  const handleSubmit = (data: Record<string, unknown>) => {
    console.log("Submitted ID application:", data);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleEligibilityCheck = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock check
    setEligibilityResult("eligible");
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-24">
      {/* AI Assistant FAB */}
      <button className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 flex items-center gap-2 group">
        <Sparkles className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-medium px-1">Ask AI Assistant</span>
      </button>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link 
          href="/id" 
          className="mb-8 inline-flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Directory
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between">
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                <Fingerprint strokeWidth={2} className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">{idDoc.name}</h1>
              <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">{idDoc.overview || idDoc.description}</p>
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
              <button 
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Apply Now
              </button>
              <button 
                onClick={() => setShowEligibilityModal(true)}
                className="bg-white text-blue-700 border-2 border-blue-100 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
              >
                Check Eligibility
              </button>
              <Link 
                href="/id/track"
                className="text-slate-600 font-medium text-center py-2 hover:text-slate-900"
              >
                Track Status
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Benefits & Eligibility */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8">
                {idDoc.benefits && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" /> Benefits
                    </h3>
                    <ul className="space-y-3">
                      {idDoc.benefits.map((b, i) => (
                        <li key={i} className="flex items-start text-slate-600 text-sm">
                          <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {idDoc.eligibility && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" /> Eligibility
                    </h3>
                    <ul className="space-y-3">
                      {idDoc.eligibility.map((e, i) => (
                        <li key={i} className="flex items-start text-slate-600 text-sm">
                          <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Required Documents */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Required Documents</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {idDoc.requirements.map((req, i) => (
                  <div key={i} className="flex items-center p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <FileText className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                    <span className="text-slate-700 font-medium text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {idDoc.faqs && idDoc.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <MessageCircleQuestion className="w-6 h-6 text-slate-400" /> 
                  Frequently Asked Questions
                </h3>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                  {idDoc.faqs.map((faq, i) => (
                    <div key={i} className="bg-slate-50/50">
                      <button 
                        onClick={() => toggleFaq(i)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors focus:outline-none"
                      >
                        <span className="font-medium text-slate-900 pr-4">{faq.question}</span>
                        {activeFaq === i ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                      </button>
                      {activeFaq === i && (
                        <div className="px-6 pb-4 pt-0 text-slate-600 text-sm bg-slate-50/50 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Related Services */}
            {idDoc.relatedServices && idDoc.relatedServices.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Related Services</h3>
                <div className="flex flex-wrap gap-3">
                  {idDoc.relatedServices.map(rel => {
                    const relDoc = govIds.find(g => g.id === rel);
                    if (!relDoc) return null;
                    return (
                      <Link 
                        key={rel} 
                        href={`/id/${rel}`}
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-white hover:border-slate-300 transition-colors flex items-center gap-2"
                      >
                        {relDoc.name} <ExternalLink className="w-3 h-3 text-slate-400" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Form Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Info Widget */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm grid grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <IndianRupee className="w-6 h-6 text-amber-600 mb-2" />
                <div className="text-xs text-amber-800 font-medium mb-1 uppercase tracking-wider">Fees</div>
                <div className="font-semibold text-slate-900 text-sm">{idDoc.fees || "Not Specified"}</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <Clock className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-xs text-blue-800 font-medium mb-1 uppercase tracking-wider">Processing Time</div>
                <div className="font-semibold text-slate-900 text-sm">{idDoc.processingTime || "Varies"}</div>
              </div>
              <div className="col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <Building2 className="w-6 h-6 text-slate-500 shrink-0" />
                <div>
                  <div className="text-xs text-slate-500 font-medium mb-0.5 uppercase tracking-wider">Issuing Authority</div>
                  <div className="font-semibold text-slate-900 text-sm">{idDoc.issuingAuthority || "Govt. of India"}</div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div id="application-form" className="scroll-mt-24 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Form</h2>
              <p className="text-sm text-slate-500 mb-8">Complete the form below securely. Your data is encrypted.</p>
              
              <DynamicForm fields={idDoc.fields} onSubmit={handleSubmit} submitLabel="Proceed to Review" formId={`govid_${idDoc.id}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility Modal */}
      {showEligibilityModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowEligibilityModal(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Eligibility Check</h3>
            <p className="text-slate-600 mb-6">Answer a few questions to see if you can apply for {idDoc.name}.</p>
            
            {eligibilityResult === "pending" ? (
              <form onSubmit={handleEligibilityCheck} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                  <input type="number" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">State of Residence</label>
                  <select required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                    <option value="">Select State</option>
                    <option value="dl">Delhi</option>
                    <option value="mh">Maharashtra</option>
                    <option value="up">Uttar Pradesh</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors mt-2">
                  Check Now
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">You are Eligible!</h4>
                <p className="text-slate-600 mb-6">Based on your answers, you can proceed with the application.</p>
                <button 
                  onClick={() => {
                    setShowEligibilityModal(false);
                    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Start Application
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
