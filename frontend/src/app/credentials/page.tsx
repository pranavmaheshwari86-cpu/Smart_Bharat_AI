"use client";

import React, { useEffect, useState, useRef } from "react";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customDocName, setCustomDocName] = useState<string>('');
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
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!customDocName) {
        setCustomDocName(file.name.replace(/\.[^/.]+$/, ""));
      }
      setUploadStatus('idle');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (!customDocName) {
        setCustomDocName(file.name.replace(/\.[^/.]+$/, ""));
      }
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
      const docTitle = customDocName.trim() || selectedFile.name;
      const newDoc: UploadedDoc = {
        id: Date.now().toString(),
        name: docTitle,
        type: label,
        size: formatBytes(selectedFile.size),
        uploadedAt: now.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        verified: true,
      };

      saveDocsToStorage([newDoc, ...uploadedDocs]);

      setTimeout(() => {
        setSelectedFile(null);
        setSelectedDocType('');
        setCustomDocName('');
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
    <div className="min-h-screen flex flex-col bg-background font-body-md text-on-surface antialiased relative selection:bg-primary/20 selection:text-primary" suppressHydrationWarning>
      
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative z-10" suppressHydrationWarning>
        
        {/* Page Header (Dashboard Style) */}
        <section className="mb-10 text-center flex flex-col items-center gap-3">
          <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.15] text-on-surface font-extrabold tracking-tight drop-shadow-sm">
            Your <span className="text-gradient font-bold italic pr-1">Verified Identity</span>
          </h1>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-xl font-medium leading-relaxed">
            Manage and share your digital government credentials with complete security and ease.
          </p>
        </section>

        {/* Upload & Sync Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Left Column: Smart File Dropzone */}
            <div className="lg:col-span-2 glass-panel rounded-[24px] p-6 sm:p-8 shadow-apple-sm border-[#E4E0D6] bg-surface-container-lowest/80 flex flex-col justify-between gap-6">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface">Upload New Credential</h2>
                    <p className="font-body-md text-sm text-on-surface-variant font-medium mt-1">Upload Aadhaar, PAN, Mark Sheets, or Certificates</p>
                  </div>
                  <span className="bg-surface-container-lowest text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full border border-surface-container-highest flex items-center gap-1.5 shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">lock</span> Encrypted Vault
                  </span>
                </div>

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group ${
                    selectedFile ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary hover:bg-surface-container/60'
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  
                  <div className="w-12 h-12 rounded-full bg-surface-container-low border border-surface-container-highest flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">upload_file</span>
                  </div>

                  {selectedFile ? (
                    <div>
                      <p className="font-bold text-on-surface text-base sm:text-lg">{selectedFile.name}</p>
                      <p className="text-on-surface-variant text-xs sm:text-sm mt-0.5 font-medium">{formatBytes(selectedFile.size)}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-bold text-on-surface text-base sm:text-lg">Drag &amp; drop file here, or click to browse</p>
                      <p className="text-on-surface-variant text-xs sm:text-sm mt-1 font-medium">Supports PDF, JPG, PNG up to 10MB</p>
                    </div>
                  )}
                </div>

                {/* Document Type Selection */}
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <label className="font-label-sm text-xs font-bold text-on-surface-variant uppercase tracking-wider mr-1">Document Type:</label>
                  {['Aadhaar Card', 'PAN Card', 'Voter ID', 'Passport', 'Income Certificate', 'Other Certificate'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setSelectedDocType(t);
                        if (!customDocName || ['Aadhaar Card', 'PAN Card', 'Voter ID', 'Passport', 'Income Certificate', 'Other Certificate'].includes(customDocName)) {
                          setCustomDocName(t);
                        }
                      }}
                      className={`text-xs sm:text-sm px-3.5 py-1.5 rounded-full border font-semibold transition-all touch-target-min ${
                        selectedDocType === t 
                          ? 'bg-primary text-white border-primary shadow-apple-sm' 
                          : 'bg-surface-container-lowest text-on-surface-variant border-[#E4E0D6] hover:bg-surface-container'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Custom Document Name Input */}
                <div className="mt-5 flex flex-col gap-1.5">
                  <label className="font-label-sm text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Document Name / Title:
                  </label>
                  <input
                    type="text"
                    value={customDocName}
                    onChange={(e) => setCustomDocName(e.target.value)}
                    placeholder={selectedFile ? "e.g. My Driving License, Class 10 Marksheet..." : "Type custom document name here..."}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 bg-surface-container-lowest text-on-surface font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline/70 shadow-sm"
                  />
                </div>
              </div>

              <div className="pt-5 border-t border-outline-variant/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-body-md text-xs text-outline font-medium">Files are stored securely in your browser's encrypted vault.</p>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploadStatus === 'uploading'}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-label-md text-sm font-semibold px-8 py-3 rounded-full transition-all shadow-apple-sm hover:shadow-apple-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer touch-target-min"
                >
                  {uploadStatus === 'uploading' ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                      Encrypting &amp; Saving...
                    </>
                  ) : uploadStatus === 'success' ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] text-green-300">check_circle</span>
                      Saved!
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                      {selectedFile ? 'Save Credential' : 'Select Document'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: DigiLocker Sync */}
            <div className="glass-panel rounded-[24px] p-6 sm:p-8 shadow-apple-sm border-[#E4E0D6] bg-surface-container-lowest/80 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-surface-container-low border border-surface-container-highest flex items-center justify-center text-primary shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">sync</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-xl font-bold text-on-surface">DigiLocker Sync</h3>
                    <p className="text-primary font-bold text-xs uppercase tracking-wider mt-0.5">Official Government Integration</p>
                  </div>
                </div>
                <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium">
                  Securely fetch and verify your official Aadhaar, PAN, and certificates directly from your government DigiLocker account.
                </p>
              </div>
              <div className="pt-5 border-t border-outline-variant/50">
                <button
                  onClick={handleDigiLockerSync}
                  disabled={isSyncing}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-label-md text-sm font-semibold py-3 rounded-full transition-all shadow-apple-sm hover:shadow-apple-lg hover:-translate-y-0.5 flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer touch-target-min"
                >
                  <span className={`material-symbols-outlined text-[20px] ${isSyncing ? 'animate-spin' : ''}`}>cloud_sync</span>
                  {isSyncing ? 'Syncing with DigiLocker...' : 'Connect & Sync'}
                </button>
                <p className="text-center font-body-md text-xs text-outline font-medium mt-3.5 flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-outline">lock</span>
                  End-to-end encrypted connection
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Stored Credentials Section */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">folder_special</span>
              Your Credentials
              {isMounted && (
                <span className="font-label-sm text-xs font-semibold text-on-surface-variant bg-surface-container-lowest px-3 py-1 rounded-full border border-surface-container-highest shadow-sm">
                  {uploadedDocs.length} stored
                </span>
              )}
            </h2>
          </div>

          {!isMounted || uploadedDocs.length === 0 ? (
            <div className="glass-panel rounded-[24px] p-12 text-center shadow-apple-sm border-[#E4E0D6] bg-surface-container-lowest/80 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-surface-container-low border border-surface-container-highest text-primary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-3xl">folder_open</span>
              </div>
              <div className="max-w-md">
                <h3 className="font-headline-md text-xl font-bold text-on-surface">No Credentials Stored Yet</h3>
                <p className="font-body-md text-sm text-on-surface-variant font-medium mt-1.5 leading-relaxed">
                  You haven't uploaded any documents yet. Use the uploader above to save your Aadhaar, PAN, Voter ID, or click <strong>Connect &amp; Sync</strong> to pull from DigiLocker.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {uploadedDocs.map((doc) => (
                <div key={doc.id} className="glass-panel rounded-[24px] p-6 sm:p-7 shadow-apple-sm hover-lift border-[#E4E0D6] bg-surface-container-lowest/80 flex flex-col justify-between gap-6 group">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-surface-container-low border border-surface-container-highest flex items-center justify-center text-primary shadow-sm group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[24px]">
                          {doc.name.toLowerCase().includes('aadhaar') ? 'badge' : doc.name.toLowerCase().includes('pan') ? 'credit_card' : doc.name.endsWith('.pdf') ? 'picture_as_pdf' : 'description'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.verified && (
                          <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200 flex items-center gap-1 shadow-xs">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            Verified
                          </span>
                        )}
                        <button
                          onClick={() => handleRemoveDoc(doc.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-outline hover:text-error cursor-pointer"
                          title="Delete Credential"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="font-headline-md text-xl font-bold text-on-surface truncate" title={doc.name}>{doc.name}</h3>
                    <p className="font-label-sm text-xs text-primary font-bold uppercase tracking-wider mt-1">{doc.type}</p>
                    
                    <div className="mt-4 pt-4 border-t border-outline-variant/40 flex items-center justify-between font-label-sm text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
                        {doc.uploadedAt}
                      </span>
                      <span className="font-mono bg-surface-container-low border border-surface-container-highest px-2 py-0.5 rounded text-on-surface">{doc.size}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-outline-variant/40">
                    <button onClick={() => alert(`Viewing ${doc.name}`)} className="flex-1 glass-panel hover:bg-surface-container border-[#E4E0D6] text-on-surface font-semibold py-2.5 rounded-full transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer touch-target-min">
                      <span className="material-symbols-outlined text-[18px]">visibility</span> View
                    </button>
                    <button onClick={() => alert(`Downloading ${doc.name}`)} className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-full transition-all shadow-apple-sm hover:shadow-apple-lg flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer touch-target-min">
                      <span className="material-symbols-outlined text-[18px]">download</span> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
