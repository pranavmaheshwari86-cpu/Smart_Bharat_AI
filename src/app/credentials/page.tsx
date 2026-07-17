"use client";

import React from "react";

type UploadedDoc = {
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
};

export default function CredentialsPage() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = React.useState<'idle' | 'uploading' | 'success'>('idle');
  const [selectedDocType, setSelectedDocType] = React.useState<string>('');
  const [uploadedDocs, setUploadedDocs] = React.useState<UploadedDoc[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
      const label = selectedDocType || 'Document';
      setUploadedDocs(prev => [
        {
          name: selectedFile.name,
          type: label,
          size: formatBytes(selectedFile.size),
          uploadedAt: now.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        },
        ...prev,
      ]);
      setTimeout(() => {
        setSelectedFile(null);
        setSelectedDocType('');
        setUploadStatus('idle');
      }, 2000);
    }, 1500);
  };

  const handleRemoveDoc = (idx: number) => {
    setUploadedDocs(prev => prev.filter((_, i) => i !== idx));
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
            left: -10%;
            width: 50vw;
            height: 50vw;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 74, 198, 0.08) 0%, rgba(253, 248, 245, 0) 70%);
            z-index: -1;
            pointer-events: none;
        }
        .ambient-glow-2 {
            position: absolute;
            bottom: -20%;
            right: -10%;
            width: 60vw;
            height: 60vw;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(120, 89, 38, 0.06) 0%, rgba(253, 248, 245, 0) 70%);
            z-index: -1;
            pointer-events: none;
        }

        .glass-card-cred {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 28px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .glass-card-cred:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .glass-card-cred::before {
            content: '';
            position: absolute;
            top: -50px;
            right: -50px;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0) 70%);
            border-radius: 50%;
            pointer-events: none;
        }
      `}} />

      {/* Dashboard Background */}
      <div className="fixed inset-0 z-[-2] bg-[#fdf8f5]"></div>
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      <main className="flex-grow pt-32 pb-20 px-8 max-w-7xl mx-auto w-full text-gray-900">
        {/* Hero Section */}
        <section className="text-center mb-16 flex flex-col items-center">

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#2b61cd] via-[#7c87a5] to-[#ae8d5b] text-transparent bg-clip-text">Your Verified Identity</h1>
          <p className="text-gray-600 max-w-2xl text-lg">Manage and share your digital government credentials with complete security and ease.</p>
        </section>

        {/* Content Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Upload */}
            <div className="glass-card-cred p-8 flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Upload Document</h3>
                <p className="text-gray-600 text-sm">Manually upload your digital credentials for verification.</p>
              </div>
              <div className="flex flex-col gap-4">
                <select
                  value={selectedDocType}
                  onChange={e => setSelectedDocType(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#0453cd] outline-none transition-all"
                >
                  <option value="" disabled>Select Document Type</option>
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Voter ID">Voter ID</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Passport">Passport</option>
                  <option value="Birth Certificate">Birth Certificate</option>
                  <option value="Income Certificate">Income Certificate</option>
                  <option value="Caste Certificate">Caste Certificate</option>
                  <option value="Domicile Certificate">Domicile Certificate</option>
                  <option value="Educational Certificate">Educational Certificate</option>
                  <option value="Land Record">Land Record</option>
                  <option value="Property Document">Property Document</option>
                  <option value="Signature">Signature</option>
                  <option value="Other">Other</option>
                </select>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-[28px] p-8 flex flex-col items-center justify-center gap-4 hover:border-[#0453cd]/50 transition-colors cursor-pointer bg-gray-50 relative"
                  onClick={() => !selectedFile && fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  
                  {uploadStatus === 'success' ? (
                    <>
                      <span className="material-symbols-outlined text-4xl text-emerald-500">check_circle</span>
                      <p className="text-sm text-emerald-600 font-medium text-center">Document uploaded successfully!</p>
                    </>
                  ) : selectedFile ? (
                    <>
                      <span className="material-symbols-outlined text-4xl text-[#0453cd]">description</span>
                      <p className="text-sm text-gray-700 font-medium text-center truncate max-w-[200px]">{selectedFile.name}</p>
                      <button 
                        onClick={handleUpload}
                        disabled={uploadStatus === 'uploading'} 
                        className="bg-[#0453cd] hover:bg-[#356ee7] disabled:opacity-50 text-white font-medium px-6 py-2 rounded-lg transition-all shadow-sm flex items-center gap-2 mt-2"
                      >
                        {uploadStatus === 'uploading' ? (
                          <>
                            <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-sm">upload</span>
                            Confirm Upload
                          </>
                        )}
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }} 
                        className="text-xs text-gray-500 hover:text-red-500 underline"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-4xl text-gray-400">cloud_upload</span>
                      <p className="text-sm text-gray-500 text-center">Drag and drop files here or click to browse</p>
                      <button onClick={handleUpload} className="bg-[#D4AF37] hover:bg-[#c29e2f] text-white font-medium px-6 py-2 rounded-lg transition-all shadow-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">add</span>
                        Select Document
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Column: DigiLocker Sync */}
            <div className="glass-card-cred p-8 flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-[28px] bg-[#0453cd]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-[#0453cd]">sync</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">DigiLocker Sync</h3>
                    <p className="text-[#0453cd] font-medium text-sm">Official Government Integration</p>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Securely fetch and verify your official documents directly from your government DigiLocker account.
                </p>
              </div>
              <div className="mt-8">
                <button onClick={() => alert("Connecting to DigiLocker...")} className="w-full bg-[#0453cd] hover:bg-[#356ee7] text-white font-semibold py-4 rounded-[28px] transition-all shadow-lg flex items-center justify-center gap-3 group">
                  <span className="material-symbols-outlined group-hover:rotate-180 transition-transform duration-500">cloud_sync</span>
                  Connect &amp; Sync
                </button>
                <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-xs">lock</span>
                  End-to-end encrypted connection
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Aadhaar Card */}
          <div className="glass-card-cred p-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-900">
                  <span className="material-symbols-outlined text-2xl">badge</span>
                </div>
                <div className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Verified
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Aadhaar Card</h2>
              <p className="text-gray-600 text-sm mb-6 uppercase tracking-wider font-semibold">Unique Identification</p>
              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Aadhaar Number</p>
                <p className="font-mono text-sm font-medium text-gray-900 tracking-widest">XXXX XXXX 1234</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4 pt-6 border-t border-gray-200">
              <button onClick={() => alert("Viewing Aadhaar Card...")} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                <span className="material-symbols-outlined text-sm">visibility</span> View
              </button>
              <button onClick={() => alert("Downloading Aadhaar Card...")} className="flex-1 bg-[#D4AF37] hover:bg-[#c29e2f] text-white font-medium py-2 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 text-sm">
                <span className="material-symbols-outlined text-sm">download</span> Download
              </button>
            </div>
          </div>

          {/* PAN Card */}
          <div className="glass-card-cred p-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-900">
                  <span className="material-symbols-outlined text-2xl">credit_card</span>
                </div>
                <div className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Verified
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">PAN Card</h2>
              <p className="text-gray-600 text-sm mb-6 uppercase tracking-wider font-semibold">Income Tax Dept</p>
              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">PAN Number</p>
                <p className="font-mono text-sm font-medium text-gray-900 tracking-widest">ABCDE1234F</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4 pt-6 border-t border-gray-200">
              <button onClick={() => alert("Viewing PAN Card...")} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                <span className="material-symbols-outlined text-sm">visibility</span> View
              </button>
              <button onClick={() => alert("Downloading PAN Card...")} className="flex-1 bg-[#D4AF37] hover:bg-[#c29e2f] text-white font-medium py-2 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 text-sm">
                <span className="material-symbols-outlined text-sm">download</span> Download
              </button>
            </div>
          </div>

          {/* Voter ID */}
          <div className="glass-card-cred p-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-900">
                  <span className="material-symbols-outlined text-2xl">how_to_vote</span>
                </div>
                <div className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-200">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  Update Required
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Voter ID</h2>
              <p className="text-gray-600 text-sm mb-6 uppercase tracking-wider font-semibold">Election Commission</p>
              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">EPIC Number</p>
                <p className="font-mono text-sm font-medium text-gray-900 tracking-widest">XYZ9876543</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2 mb-4">
                <span className="material-symbols-outlined text-amber-600 text-sm mt-0.5">info</span>
                <p className="text-xs text-amber-800">Address verification pending. Please update your current residential address.</p>
              </div>
            </div>
            <div className="flex mt-4 pt-6 border-t border-gray-200">
              <button onClick={() => alert("Starting update process for Voter ID...")} className="w-full bg-[#0453cd] hover:bg-[#356ee7] text-white font-medium py-2 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 text-sm">
                Update Now
              </button>
            </div>
          </div>
        </div>

        {/* Your Documents Section */}
        {uploadedDocs.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0453cd]">folder_open</span>
                Your Documents
                <span className="text-sm font-normal text-gray-500 ml-1 bg-gray-100 px-2 py-0.5 rounded-full">{uploadedDocs.length}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedDocs.map((doc, idx) => (
                <div key={idx} className="glass-card-cred p-6 flex flex-col gap-4 group">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#0453cd]/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-2xl text-[#0453cd]">
                        {doc.name.endsWith('.pdf') ? 'picture_as_pdf' : 'image'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Uploaded
                      </span>
                      <button
                        onClick={() => handleRemoveDoc(idx)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                        title="Remove"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 truncate" title={doc.name}>{doc.name}</p>
                    <p className="text-xs text-[#0453cd] font-medium mt-0.5">{doc.type}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {doc.uploadedAt}
                    </span>
                    <span>{doc.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
