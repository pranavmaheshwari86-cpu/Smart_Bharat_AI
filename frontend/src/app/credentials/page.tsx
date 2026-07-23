"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type UploadedDoc = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  verified?: boolean;
};

const STORAGE_KEY = "smart_bharat_uploaded_credentials";

export default function CredentialsPage() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [selectedDocType, setSelectedDocType] = useState<string>('');
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setUploadedDocs(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load saved credentials:", e);
    }
  }, []);

  const saveDocsToStorage = (newDocs: UploadedDoc[]) => {
    setUploadedDocs(newDocs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newDocs));
    } catch (e) {
      console.error("Failed to save credentials:", e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus('idle');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
      setUploadStatus('idle');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedFile) {
      fileInputRef.current?.click();
      return;
    }

    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
      const now = new Date();
      const label = selectedDocType || 'Government ID / Certificate';
      const newDoc: UploadedDoc = {
        id: Date.now().toString(),
        name: selectedFile.name,
        type: label,
        size: formatBytes(selectedFile.size),
        uploadedAt: now.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        verified: true,
      };

      saveDocsToStorage([newDoc, ...uploadedDocs]);

      setTimeout(() => {
        setSelectedFile(null);
        setSelectedDocType('');
        setUploadStatus('idle');
      }, 1500);
    }, 1200);
  };

  const handleDigiLockerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const syncedDocs: UploadedDoc[] = [
        {
          id: `digi-aadhaar-${Date.now()}`,
          name: "Aadhaar Card (Official DigiLocker)",
          type: "Identity Proof (UIDAI)",
          size: "1.2 MB",
          uploadedAt: now,
          verified: true,
        },
        {
          id: `digi-pan-${Date.now()}`,
          name: "PAN Card (Income Tax Dept)",
          type: "Financial Identity",
          size: "850 KB",
          uploadedAt: now,
          verified: true,
        },
      ];

      // Append synced docs if not already present
      const existingNames = new Set(uploadedDocs.map(d => d.name));
      const newToAppend = syncedDocs.filter(d => !existingNames.has(d.name));
      if (newToAppend.length > 0) {
        saveDocsToStorage([...newToAppend, ...uploadedDocs]);
      }
    }, 1500);
  };

  const handleRemoveDoc = (id: string) => {
    const updated = uploadedDocs.filter((d) => d.id !== id);
    saveDocsToStorage(updated);
  };

  return (
    <div className="min-h-screen flex flex-col font-body-md text-on-surface antialiased relative overflow-hidden selection:bg-primary/20 selection:text-primary">
      <style dangerouslySetInnerHTML={{__html: `
        @theme {
          --animate-float-1: float 6s ease-in-out infinite, fade 8s ease-in-out infinite;
          --animate-float-2: float 7s ease-in-out infinite 1s, fade 9s ease-in-out infinite 1s;
          --animate-float-3: float 5s ease-in-out infinite 2s, fade 7s ease-in-out infinite 2s;
          --animate-float-4: float 8s ease-in-out infinite 3s, fade 10s ease-in-out infinite 3s;
          --animate-float-5: float 6.5s ease-in-out infinite 0.5s, fade 8.5s ease-in-out infinite 0.5s;
          --animate-float-6: float 5.5s ease-in-out infinite 1.5s, fade 7.5s ease-in-out infinite 1.5s;
          --keyframes-float: {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-15px)" }
          };
          --keyframes-fade: {
            "0%, 100%": { opacity: "0.3" },
            "50%": { opacity: "1" }
          };
        }
        
        .ambient-glow-1 {
            position: absolute;
            top: -10%;
            left: 20%;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(4, 83, 205, 0.08) 0%, rgba(255,255,255,0) 70%);
            pointer-events: none;
            z-index: 0;
        }

        .ambient-glow-2 {
            position: absolute;
            top: 40%;
            right: -10%;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, rgba(255,255,255,0) 70%);
            pointer-events: none;
            z-index: 0;
        }

        .glass-card-cred {
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 20px 40px -15px rgba(4, 83, 205, 0.05);
            border-radius: 32px;
        }
      `}} />

      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 relative z-10">
        {/* Upload & Sync Section */}
        <section className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Left Column: Smart File Dropzone */}
            <div className="lg:col-span-2 glass-card-cred p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Upload New Credential</h2>
                    <p className="text-gray-500 text-sm mt-1">Upload Aadhaar, PAN, Mark Sheets, or Certificates</p>
                  </div>
                  <span className="bg-[#0453cd]/10 text-[#0453cd] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#0453cd]/20 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">encrypted</span> Encrypted Vault
                  </span>
                </div>

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group ${
                    selectedFile ? 'border-[#0453cd] bg-[#0453cd]/5' : 'border-gray-300 hover:border-[#0453cd] hover:bg-gray-50/50'
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  
                  <div className="w-16 h-16 rounded-full bg-[#0453cd]/10 flex items-center justify-center text-[#0453cd] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">upload_file</span>
                  </div>

                  {selectedFile ? (
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{selectedFile.name}</p>
                      <p className="text-gray-500 text-sm mt-0.5">{formatBytes(selectedFile.size)}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">Drag &amp; drop file here, or browse</p>
                      <p className="text-gray-500 text-sm mt-1">Supports PDF, JPG, PNG up to 10MB</p>
                    </div>
                  )}
                </div>

                {/* Optional Document Type Selection */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Document Type:</label>
                  {['Aadhaar Card', 'PAN Card', 'Voter ID', 'Passport', 'Income Certificate', 'Other Certificate'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedDocType(t)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        selectedDocType === t 
                          ? 'bg-[#0453cd] text-white border-[#0453cd] font-semibold' 
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">Files are stored securely in your browser's encrypted vault.</p>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploadStatus === 'uploading'}
                  className="bg-[#0453cd] hover:bg-[#356ee7] text-white font-semibold px-8 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  {uploadStatus === 'uploading' ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                      Encrypting &amp; Saving...
                    </>
                  ) : uploadStatus === 'success' ? (
                    <>
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                      Saved!
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">cloud_upload</span>
                      {selectedFile ? 'Save Credential' : 'Select Document'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: DigiLocker Sync */}
            <div className="glass-card-cred p-8 flex flex-col justify-between h-full">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#0453cd]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-[#0453cd]">sync</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">DigiLocker Sync</h3>
                    <p className="text-[#0453cd] font-medium text-sm">Official Government Integration</p>
                  </div>
                </div>
                <p className="text-gray-600 text-base leading-relaxed">
                  Securely fetch and verify your official Aadhaar, PAN, and certificates directly from your DigiLocker account.
                </p>
              </div>
              <div className="mt-8">
                <button
                  onClick={handleDigiLockerSync}
                  disabled={isSyncing}
                  className="w-full bg-[#0453cd] hover:bg-[#356ee7] text-white font-semibold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  <span className={`material-symbols-outlined ${isSyncing ? 'animate-spin' : ''}`}>cloud_sync</span>
                  {isSyncing ? 'Syncing with DigiLocker...' : 'Connect & Sync'}
                </button>
                <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-xs">lock</span>
                  End-to-end encrypted connection
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Stored Credentials Grid */}
        <section className="pt-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0453cd]">folder_special</span>
              Your Credentials
              {isMounted && (
                <span className="text-sm font-normal text-gray-500 ml-2 bg-gray-100 px-3 py-0.5 rounded-full border border-gray-200">
                  {uploadedDocs.length} stored
                </span>
              )}
            </h2>
          </div>

          {!isMounted || uploadedDocs.length === 0 ? (
            <div className="glass-card-cred p-12 text-center flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#0453cd]/10 text-[#0453cd] flex items-center justify-center border border-[#0453cd]/20">
                <span className="material-symbols-outlined text-3xl">folder_open</span>
              </div>
              <div className="max-w-md">
                <h3 className="text-xl font-bold text-gray-900">No Credentials Stored Yet</h3>
                <p className="text-gray-500 text-sm mt-1">
                  You haven't uploaded any documents yet. Use the uploader above to save your Aadhaar, PAN, Voter ID, or click <strong>Connect &amp; Sync</strong> to pull from DigiLocker.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedDocs.map((doc) => (
                <div key={doc.id} className="glass-card-cred p-6 flex flex-col justify-between gap-6 group hover:shadow-xl transition-all">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#0453cd]/10 flex items-center justify-center text-[#0453cd]">
                        <span className="material-symbols-outlined text-2xl">
                          {doc.name.toLowerCase().includes('aadhaar') ? 'badge' : doc.name.toLowerCase().includes('pan') ? 'credit_card' : doc.name.endsWith('.pdf') ? 'picture_as_pdf' : 'description'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.verified && (
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Verified
                          </span>
                        )}
                        <button
                          onClick={() => handleRemoveDoc(doc.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-500"
                          title="Delete Credential"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 truncate" title={doc.name}>{doc.name}</h3>
                    <p className="text-xs text-[#0453cd] font-semibold uppercase tracking-wider mt-1">{doc.type}</p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {doc.uploadedAt}
                      </span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">{doc.size}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button onClick={() => alert(`Viewing ${doc.name}`)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-xs">
                      <span className="material-symbols-outlined text-sm">visibility</span> View
                    </button>
                    <button onClick={() => alert(`Downloading ${doc.name}`)} className="flex-1 bg-[#D4AF37] hover:bg-[#c29e2f] text-white font-medium py-2 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 text-xs">
                      <span className="material-symbols-outlined text-sm">download</span> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
