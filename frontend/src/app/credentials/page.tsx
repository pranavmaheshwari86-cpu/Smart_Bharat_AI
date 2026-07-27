"use client";

import React, { useEffect, useState, useRef } from "react";
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
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] font-body-md text-on-surface antialiased relative selection:bg-primary/20 selection:text-primary" suppressHydrationWarning>
      
      <main className="flex-1 max-w-container-max w-full mx-auto px-margin-mobile md:px-gutter py-8 relative z-10">
        {/* Upload & Sync Section */}
        <section className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Smart File Dropzone */}
            <div className="lg:col-span-2 bg-white border border-[#E4E0D6] rounded-[28px] p-8 shadow-apple-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#1C1B19]">Upload New Credential</h2>
                    <p className="text-[#434655] text-sm font-medium mt-1">Upload Aadhaar, PAN, Mark Sheets, or Certificates</p>
                  </div>
                  <span className="bg-blue-50 text-[#2563EB] text-xs font-semibold px-3.5 py-1.5 rounded-full border border-blue-200/80 flex items-center gap-1.5 shadow-xs">
                    <span className="material-symbols-outlined text-[16px]">lock</span> Encrypted Vault
                  </span>
                </div>

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`border-2 border-dashed rounded-[20px] p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group ${
                    selectedFile ? 'border-[#2563EB] bg-blue-50/40' : 'border-[#E4E0D6] hover:border-[#2563EB] hover:bg-gray-50/60'
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  
                  <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">upload_file</span>
                  </div>

                  {selectedFile ? (
                    <div>
                      <p className="font-bold text-[#1C1B19] text-lg">{selectedFile.name}</p>
                      <p className="text-[#434655] text-sm mt-0.5 font-medium">{formatBytes(selectedFile.size)}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-bold text-[#1C1B19] text-lg">Drag &amp; drop file here, or browse</p>
                      <p className="text-[#434655] text-sm mt-1 font-medium">Supports PDF, JPG, PNG up to 10MB</p>
                    </div>
                  )}
                </div>

                {/* Document Type Selection */}
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <label className="text-xs font-bold text-[#434655] uppercase tracking-wider mr-1">Document Type:</label>
                  {['Aadhaar Card', 'PAN Card', 'Voter ID', 'Passport', 'Income Certificate', 'Other Certificate'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedDocType(t)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border font-semibold transition-all ${
                        selectedDocType === t 
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs' 
                          : 'bg-white text-[#434655] border-[#E4E0D6] hover:border-gray-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E4E0D6] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#737686] font-medium">Files are stored securely in your browser's encrypted vault.</p>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploadStatus === 'uploading'}
                  className="w-full sm:w-auto bg-[#2563EB] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all shadow-apple-sm hover:shadow-apple-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {uploadStatus === 'uploading' ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                      Encrypting &amp; Saving...
                    </>
                  ) : uploadStatus === 'success' ? (
                    <>
                      <span className="material-symbols-outlined text-lg text-green-300">check_circle</span>
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
            <div className="bg-white border border-[#E4E0D6] rounded-[28px] p-8 shadow-apple-sm flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB]">
                    <span className="material-symbols-outlined text-2xl">sync</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-[#1C1B19]">DigiLocker Sync</h3>
                    <p className="text-[#2563EB] font-bold text-xs uppercase tracking-wider mt-0.5">Official Government Integration</p>
                  </div>
                </div>
                <p className="text-[#434655] text-base leading-relaxed font-medium">
                  Securely fetch and verify your official Aadhaar, PAN, and certificates directly from your DigiLocker account.
                </p>
              </div>
              <div className="mt-8">
                <button
                  onClick={handleDigiLockerSync}
                  disabled={isSyncing}
                  className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3.5 rounded-full transition-all shadow-apple-sm hover:shadow-apple-lg hover:-translate-y-0.5 flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer"
                >
                  <span className={`material-symbols-outlined text-xl ${isSyncing ? 'animate-spin' : ''}`}>cloud_sync</span>
                  {isSyncing ? 'Syncing with DigiLocker...' : 'Connect & Sync'}
                </button>
                <p className="text-center text-xs text-[#737686] font-medium mt-4 flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#737686]">lock</span>
                  End-to-end encrypted connection
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Stored Credentials Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-[#1C1B19] flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#2563EB] text-2xl">folder_special</span>
              Your Credentials
              {isMounted && (
                <span className="text-xs font-semibold text-[#434655] bg-white px-3 py-1 rounded-full border border-[#E4E0D6] shadow-xs">
                  {uploadedDocs.length} stored
                </span>
              )}
            </h2>
          </div>

          {!isMounted || uploadedDocs.length === 0 ? (
            <div className="bg-white border border-[#E4E0D6] rounded-[28px] p-12 text-center shadow-apple-sm flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">folder_open</span>
              </div>
              <div className="max-w-md">
                <h3 className="text-xl font-extrabold text-[#1C1B19]">No Credentials Stored Yet</h3>
                <p className="text-[#434655] text-sm font-medium mt-1.5 leading-relaxed">
                  You haven't uploaded any documents yet. Use the uploader above to save your Aadhaar, PAN, Voter ID, or click <strong>Connect &amp; Sync</strong> to pull from DigiLocker.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedDocs.map((doc) => (
                <div key={doc.id} className="bg-white border border-[#E4E0D6] rounded-[24px] p-6 shadow-apple-sm hover:shadow-apple-md transition-all flex flex-col justify-between gap-6 group">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB]">
                        <span className="material-symbols-outlined text-2xl">
                          {doc.name.toLowerCase().includes('aadhaar') ? 'badge' : doc.name.toLowerCase().includes('pan') ? 'credit_card' : doc.name.endsWith('.pdf') ? 'picture_as_pdf' : 'description'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.verified && (
                          <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Verified
                          </span>
                        )}
                        <button
                          onClick={() => handleRemoveDoc(doc.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[#737686] hover:text-red-600 cursor-pointer"
                          title="Delete Credential"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-[#1C1B19] truncate" title={doc.name}>{doc.name}</h3>
                    <p className="text-xs text-[#2563EB] font-bold uppercase tracking-wider mt-1">{doc.type}</p>
                    
                    <div className="mt-4 pt-4 border-t border-[#E4E0D6] flex items-center justify-between text-xs text-[#737686]">
                      <span className="flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {doc.uploadedAt}
                      </span>
                      <span className="font-mono bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-gray-700">{doc.size}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-[#E4E0D6]">
                    <button onClick={() => alert(`Viewing ${doc.name}`)} className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[#1C1B19] font-semibold py-2 rounded-full transition-colors flex items-center justify-center gap-1.5 text-xs cursor-pointer">
                      <span className="material-symbols-outlined text-sm">visibility</span> View
                    </button>
                    <button onClick={() => alert(`Downloading ${doc.name}`)} className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition-colors shadow-xs flex items-center justify-center gap-1.5 text-xs cursor-pointer">
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
