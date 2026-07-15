"use client";

import React from "react";

export default function CredentialsPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans" style={{
      backgroundColor: '#f8f9fa',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`
    }}>
      <style dangerouslySetInnerHTML={{__html: `
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

      <main className="flex-grow pt-32 pb-20 px-8 max-w-7xl mx-auto w-full text-gray-900">
        {/* Hero Section */}
        <section className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center justify-center bg-blue-100/50 border border-blue-600/20 rounded-full px-4 py-1.5 mb-6 text-blue-800 font-medium text-sm shadow-sm">
            <span className="material-symbols-outlined text-base mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            Government Verified
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">Your Verified Identity</h1>
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
                <select defaultValue="" className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#0453cd] outline-none transition-all">
                  <option disabled value="">Select Document Type</option>
                  <option value="Signature">Signature</option>
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Educational Certificate">Educational Certificate</option>
                </select>
                <div className="border-2 border-dashed border-gray-300 rounded-[28px] p-8 flex flex-col items-center justify-center gap-4 hover:border-[#0453cd]/50 transition-colors cursor-pointer bg-gray-50">
                  <span className="material-symbols-outlined text-4xl text-gray-400">cloud_upload</span>
                  <p className="text-sm text-gray-500 text-center">Drag and drop files here or click to browse</p>
                  <button onClick={() => alert("Opening document upload dialog...")} className="bg-[#D4AF37] hover:bg-[#c29e2f] text-white font-medium px-6 py-2 rounded-lg transition-all shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Upload Document
                  </button>
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
      </main>
    </div>
  );
}
