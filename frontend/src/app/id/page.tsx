"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DocumentSelector } from "@/components/DocumentSelector";
import { govIds } from "@/lib/data";
import { Search, Filter, Fingerprint, IdCard, Book, FileText, ArrowRight, IndianRupee, Globe, Plane, Gauge, Archive } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SpotlightCard } from "@/components/SpotlightCard";

// Helper icon mapper
const getIconForId = (id: string) => {
  if (id.includes("aadhaar")) return <Fingerprint className="w-7 h-7 text-[#2F6FB7]" />;
  if (id.includes("pan")) return <IdCard className="w-7 h-7 text-green-600" />;
  if (id.includes("passport")) return <Book className="w-7 h-7 text-purple-600" />;
  return <FileText className="w-7 h-7 text-amber-600" />;
};

const DocumentBackground = ({ id }: { id: string }) => {

  if (id === "pan") {
    return <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f4f7fa]" />;
  }
  if (id === "passport") {
    return <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f5f3f7]" />;
  }
  if (id === "driving-license") {
    return <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f6f7f6]" />;
  }
  if (id === "voter-id") {
    return <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f8f5f4]" />;
  }
  return <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f5f7f9]" />;
};

export default function IDPage() {
  const shaderCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showOthersDropdown, setShowOthersDropdown] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState("");

  // Only show the primary IDs as cards on the main directory page
  const featuredIds = ["aadhaar", "pan", "passport", "driving-license", "voter-id"];

  const filteredIds = govIds
    .filter(doc => featuredIds.includes(doc.id))
    .filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (activeFilter === "All") return matchesSearch;
      if (activeFilter === "Central") return matchesSearch && doc.issuingAuthority?.toLowerCase().includes("india");
      if (activeFilter === "Free") return matchesSearch && doc.fees?.toLowerCase().includes("free");
      return matchesSearch;
    });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 min-h-screen relative font-body-md text-on-surface antialiased overflow-x-hidden no-scrollbar selection:bg-primary/20 selection:text-primary">
      <style dangerouslySetInnerHTML={{ __html: `
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
      `}} />
      <div className="absolute inset-0 z-[-2] bg-[#fdf8f5]"></div>
      
      {/* Ambient CSS Glows */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>
      
      <div className="w-full relative z-10 grid grid-cols-1 gap-8 sm:gap-12">
        <div className="flex flex-col gap-8 sm:gap-12">
          
          {/* Hero Section */}
          <section className="relative overflow-hidden pt-2 sm:pt-4 pb-8 sm:pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative z-10">
              <div className="relative z-10 lg:col-span-5">

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight text-slate-900 mb-4 sm:mb-6 leading-tight">
                    Apply for <br />
                    <span className="bg-gradient-to-r from-[#2b61cd] via-[#7c87a5] to-[#ae8d5b] text-transparent bg-clip-text">
                      Government IDs
                    </span>
                  </h1>
                <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                  Experience a frictionless, AI-guided application process for Aadhaar, PAN, and Passports. Highly secure, incredibly fast.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                  <a href="#id-directory" className="bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto justify-center touch-target-min">
                    <span>Browse Directory</span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <Link href="/id/track" onClick={(e) => { e.preventDefault(); alert("Tracking portal is currently under development. Coming soon!"); }} className="bg-white text-slate-700 border border-slate-300 px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center touch-target-min">
                    Track Application
                  </Link>
                </div>
              </div>
              
              {/* Right Image Column */}
              <div className="relative z-10 hidden md:flex items-center justify-end lg:col-span-7">
                <Image 
                  src="/hero-ids.png" 
                  alt="Government IDs" 
                  width={800} 
                  height={600} 
                  className="w-full h-auto max-w-[100%] object-contain rounded-2xl drop-shadow-2xl animate-float" 
                  priority 
                />
              </div>
            </div>
          </section>

          {/* Directory Section */}
          <section id="id-directory" className="pt-8 pb-40 scroll-mt-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Document Directory</h2>
                <p className="text-slate-600">Select an ID to view requirements and apply.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full sm:w-72 z-[100]">
                  <DocumentSelector mode="navigate" />
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                  {["All", "Central", "State", "Free"].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        activeFilter === filter 
                          ? "bg-slate-900 text-white" 
                          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIds.map(doc => {
                  return (
                  <Link key={doc.id} href={`/id/${doc.id}`} className="group block h-full">
                    <SpotlightCard 
                      className="relative overflow-hidden bg-[#fcfaf8] border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-slate-200 rounded-[24px] p-6 pb-20 border transition-all h-full flex flex-col"
                      spotlightColor="rgba(37, 99, 235, 0.08)"
                    >
                        <DocumentBackground id={doc.id} />
                        
                        <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 flex items-center mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                          {getIconForId(doc.id)}
                        </div>
                        <h3 className="text-[26px] font-semibold tracking-tight text-[#0f172a] mb-2">{doc.name}</h3>
                        <p className="text-[#475569] text-base mb-6 flex-grow leading-relaxed">
                          {doc.description}
                        </p>
                      </div>
                      
                      {/* Floating Footer Box */}
                      <div className="absolute bottom-5 left-5 right-5 z-20">
                        <div className="flex items-center justify-between text-sm bg-white/95 border-slate-100 shadow-sm backdrop-blur-sm rounded-xl p-4 transition-shadow">
                          <span className="text-[#64748b]">
                            {doc.processingTime || "Varies"}
                          </span>
                          <button className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                            Apply Now <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </SpotlightCard>
                </Link>
              )})}
  
                {filteredIds.length > 0 && (
                  <div className="group block h-full cursor-pointer relative" onClick={() => setShowOthersDropdown(!showOthersDropdown)}>
                      <SpotlightCard 
                        className="relative overflow-hidden bg-slate-50 rounded-[24px] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-slate-300 h-full flex flex-col"
                        spotlightColor="rgba(37, 99, 235, 0.08)"
                      >
                        <DocumentBackground id="others" />
                      
                        <div className="relative z-10 flex flex-col h-full">
                          <div className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-50/80 transition-colors border border-slate-100 shadow-sm">
                            <FileText className="w-7 h-7 text-slate-600" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">Others</h3>
                          <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
                            Explore additional government certificates like Birth, Income, and Caste Certificates.
                          </p>
                          <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100/50 pt-4 mt-auto">
                            <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-md font-medium border border-slate-100">
                              Multiple
                            </span>
                            <span className="flex items-center gap-1 text-blue-600 font-semibold">
                              View List <ArrowRight className={`w-4 h-4 inline-block transition-transform ${showOthersDropdown ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                            </span>
                          </div>
                        </div>
                      </SpotlightCard>
                  
                  {showOthersDropdown && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden no-scrollbar">
                      <div className="p-2 border-b border-slate-100 bg-slate-50/90 backdrop-blur-sm sticky top-0 z-10" onClick={(e) => e.stopPropagation()}>
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Search documents..."
                            value={dropdownSearch}
                            onChange={(e) => setDropdownSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 placeholder:text-slate-400 bg-white"
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="max-h-52 overflow-y-auto py-1 no-scrollbar">
                        {govIds
                          .filter(doc => !featuredIds.includes(doc.id))
                          .filter(doc => doc.name.toLowerCase().includes(dropdownSearch.toLowerCase()) || doc.description?.toLowerCase().includes(dropdownSearch.toLowerCase()))
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map(doc => (
                            <Link key={doc.id} href={`/id/${doc.id}`} className="block px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm transition-colors">
                              {doc.name}
                            </Link>
                          ))}
                        {govIds
                          .filter(doc => !featuredIds.includes(doc.id))
                          .filter(doc => doc.name.toLowerCase().includes(dropdownSearch.toLowerCase()) || doc.description?.toLowerCase().includes(dropdownSearch.toLowerCase())).length === 0 && (
                            <p className="px-4 py-3 text-xs text-slate-400 italic text-center">No documents match search.</p>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {filteredIds.length === 0 && (
                <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
                  <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-1">No documents found</h3>
                  <p className="text-slate-500">Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
