"use client";

import { useState } from "react";
import { mockCredentials } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldAlert, CloudDrizzle, FileBadge, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CredentialsPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    // Simulate DigiLocker API sync
    setTimeout(() => {
      setIsSyncing(false);
      setHasSynced(true);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Credentials</h1>
          <p className="mt-2 text-lg text-slate-600">Secure digital vault for your verified documents.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <Button variant="outline" className="gap-2 bg-white">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
          <Button 
            onClick={handleSync} 
            disabled={isSyncing || hasSynced}
            className="gap-2 bg-[#2E3192] hover:bg-[#1E2060] text-white"
          >
            <CloudDrizzle className={`h-4 w-4 ${isSyncing ? 'animate-bounce' : ''}`} />
            {isSyncing ? "Syncing..." : hasSynced ? "Synced" : "Sync DigiLocker"}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {hasSynced && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="rounded-lg bg-green-50 p-4 border border-green-200 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
              <p className="text-sm font-medium text-green-800">
                Successfully synced with DigiLocker. 3 documents were verified and linked.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockCredentials.map((cred) => (
          <Card key={cred.id} className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              {cred.isVerified ? (
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-semibold">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </div>
              ) : (
                <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-semibold">
                  <ShieldAlert className="h-3 w-3" />
                  Unverified
                </div>
              )}
            </div>
            
            <CardHeader className="pt-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileBadge className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">{cred.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">Issuer</p>
                  <p className="font-medium text-slate-900 truncate">{cred.issuer}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">Date Issued</p>
                  <p className="font-medium text-slate-900">{cred.dateIssued}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Consent & Auto-fill Logs</h3>
        <p className="text-sm text-slate-600 mb-6">Track where your credentials have been used to autofill applications.</p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-100">
            <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-900">Aadhaar Card attached to PM Vidyalakshmi Karyakram</p>
              <p className="text-xs text-slate-500 mt-1">2026-06-15 • Consent ID: C-90283</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-100">
            <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-900">PAN Card attached to Passport Application</p>
              <p className="text-xs text-slate-500 mt-1">2026-05-10 • Consent ID: C-88421</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
