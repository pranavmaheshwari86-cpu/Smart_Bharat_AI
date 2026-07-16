"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, Clock, FileText, AlertCircle, Building2, MapPin } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Mock state machine transitions for demonstration
const mockTrackingData: Record<string, any> = {
  "APP-8829": {
    id: "APP-8829",
    serviceName: "PM Kisan Samman Nidhi",
    applicantName: "Rahul Sharma",
    dateSubmitted: "Oct 12, 2023",
    currentStatus: "Under Verification",
    timeline: [
      {
        status: "Application Submitted",
        date: "Oct 12, 2023, 10:30 AM",
        description: "Application successfully received by the portal.",
        completed: true,
        icon: FileText
      },
      {
        status: "Document Verification",
        date: "Oct 14, 2023, 02:15 PM",
        description: "Documents are being verified by local nodal officer.",
        completed: true,
        icon: CheckCircle2
      },
      {
        status: "Sent to Department",
        date: "Pending",
        description: "Pending transfer to the State Agriculture Department.",
        completed: false,
        icon: Building2
      },
      {
        status: "Final Approval",
        date: "Pending",
        description: "Final approval and fund sanctioning.",
        completed: false,
        icon: CheckCircle2
      }
    ]
  },
  "APP-8830": {
    id: "APP-8830",
    serviceName: "Aadhaar Card Update",
    applicantName: "Priya Patel",
    dateSubmitted: "Nov 05, 2023",
    currentStatus: "Approved",
    timeline: [
      {
        status: "Application Submitted",
        date: "Nov 05, 2023, 09:00 AM",
        description: "Update request submitted successfully.",
        completed: true,
        icon: FileText
      },
      {
        status: "UIDAI Verification",
        date: "Nov 06, 2023, 11:45 AM",
        description: "Biometric and demographic data verified.",
        completed: true,
        icon: CheckCircle2
      },
      {
        status: "Card Generation",
        date: "Nov 08, 2023, 04:20 PM",
        description: "New Aadhaar card generated successfully.",
        completed: true,
        icon: Building2
      },
      {
        status: "Dispatched",
        date: "Nov 10, 2023, 10:00 AM",
        description: "Dispatched via India Post. Tracking No: IP123456789IN",
        completed: true,
        icon: MapPin
      }
    ]
  }
};

export default function TrackApplication() {
  const [appId, setAppId] = useState("");
  const [trackingResult, setTrackingResult] = useState<any | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appId.trim()) return;

    setIsSearching(true);
    setError("");
    setTrackingResult(null);

    // Simulate network delay
    setTimeout(() => {
      const result = mockTrackingData[appId.trim().toUpperCase()];
      if (result) {
        setTrackingResult(result);
      } else {
        setError("Application not found. Please try APP-8829 or APP-8830 for testing.");
      }
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
        <Link 
          href="/" 
          className="mb-12 inline-flex items-center text-sm font-bold text-muted-foreground hover:text-foreground focus-ring rounded-sm transition-colors group font-body"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          Back to Home
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-normal text-foreground sm:text-5xl mb-4 font-heading">Track Application</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-body">
          Enter your Application ID to track the real-time status of your government service request.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="premium-card p-8 border border-border/50 mb-12 max-w-2xl mx-auto"
      >
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              placeholder="Enter Application ID (e.g. APP-8829)"
              className="w-full h-14 pl-12 pr-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-body transition-all"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSearching}
            className="h-14 px-8 rounded-xl bg-foreground text-background font-bold hover:bg-foreground/90 transition-colors disabled:opacity-50 font-body whitespace-nowrap"
          >
            {isSearching ? "Searching..." : "Track Status"}
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-semibold flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        {trackingResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-8 md:grid-cols-12"
          >
            <div className="md:col-span-5 space-y-6">
              <div className="premium-card p-6 border border-border/50">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6 font-heading">Application Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground font-body">Service Name</p>
                    <p className="text-lg font-bold font-heading">{trackingResult.serviceName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-body">Applicant Name</p>
                    <p className="font-semibold font-body">{trackingResult.applicantName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-body">Date Submitted</p>
                    <p className="font-semibold font-body">{trackingResult.dateSubmitted}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground font-body mb-1">Current Status</p>
                    <span className="inline-flex items-center rounded-sm bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600 dark:bg-brand-500/10">
                      {trackingResult.currentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="premium-card p-8 border border-border/50 relative overflow-hidden">
                <h3 className="text-xl font-bold font-heading mb-8">Timeline Tracker</h3>
                
                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                  {trackingResult.timeline.map((step: any, index: number) => {
                    const StepIcon = step.icon;
                    return (
                      <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 ${step.completed ? 'bg-brand-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-sm transition-all group-hover:shadow-md group-hover:border-border">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                            <h4 className={`font-bold font-heading ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {step.status}
                            </h4>
                            <span className="text-xs text-muted-foreground font-mono">{step.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground font-body">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
