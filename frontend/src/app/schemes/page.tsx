"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { schemes } from "@/lib/data";
import { SpotlightCard } from "@/components/SpotlightCard";

const OTHER_SCHEME_CATEGORIES = [
  "Aadhaar & Identity Services", "Afforestation", "Agriculture", "Animal Husbandry", "Artificial Intelligence",
  "Atomic Energy", "Awards & Incentives", "Banking", "Biodiversity", "Border Area Development",
  "Certificates & Licenses", "Child Welfare", "Citizen Protection", "Citizen Services", "Citizen Welfare",
  "Civil Aviation", "Civil Defence", "Civil Registration", "Cleanliness", "Climate Change",
  "Commerce & Trade", "Community Development", "Consumer Affairs", "Consumer Protection", "Cooperative Societies",
  "Cooperatives", "Credit & Loans", "Culture", "Cyber Security", "Dairy Development",
  "Defence", "Digital Governance", "Digital India", "Digital Payments", "Direct Benefit Transfer (DBT)",
  "Disaster Management", "Drinking Water & Sanitation", "E-Governance", "Economically Weaker Sections (EWS)", "Education",
  "Election Services", "Electoral Services", "Electronics & IT", "Emergency Relief", "Employment",
  "Entrepreneurship", "Environment", "Export Incentives", "Export Promotion", "Fellowships",
  "Financial Inclusion", "Financial Services", "Farmer Welfare", "Fisheries", "Food & Public Distribution",
  "Food Processing", "Foreign Affairs", "Forest & Wildlife", "Governance & Public Services", "Handicrafts",
  "Handloom", "Health & Family Welfare", "Heritage", "Higher Education", "Horticulture",
  "Housing", "Import & Trade Facilitation", "Income Support", "Industry", "Infrastructure",
  "Innovation", "Innovation Grants", "Insurance", "Irrigation", "Jammu & Kashmir Development",
  "Judiciary", "Khadi & Village Industries", "Labour & Workers", "Land Records", "Legal Aid & Justice",
  "Legal Documentation", "Livelihood", "Logistics", "Manufacturing", "Medical Assistance",
  "Municipal Services", "Mining", "Minority Welfare", "MSME", "National Population Register (NPR) ID",
  "North Eastern Region Development", "NRI Services", "Nutrition", "Other Backward Classes (OBC)", "Pension",
  "Persons with Disabilities (Divyangjan)", "Petroleum & Natural Gas", "Police & Internal Security", "Pollution Control", "Power & Electricity",
  "Price Support", "Property Registration", "Public Defence", "Public Grievances", "Public Health",
  "Public Procurement", "Railways", "Rehabilitation", "Renewable Energy", "Research & Development",
  "Road Transport", "Rural Development", "Sanitation", "Scholarships", "School Education",
  "Science & Technology", "Self Help Groups (SHGs)", "Senior Citizens", "Shipping & Ports", "Skill Development",
  "Smart Cities", "Social Security", "Social Welfare", "Space", "Sports",
  "Startups", "Startup Funding", "Subsidies", "Taxation", "Technical Education",
  "Telecommunications", "Textiles", "Tourism", "Transport Services", "Tribal Affairs",
  "Urban Development", "Veterans & Ex-Servicemen", "Village Development", "Volunteer Programs", "Waste Management",
  "Water Conservation", "Water Resources", "Women Empowerment", "Women Entrepreneurship", "Youth Affairs",
];

export default function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [otherOpen, setOtherOpen] = useState(false);
  const [otherSearch, setOtherSearch] = useState("");
  const [isListening, setIsListening] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const filteredOther = OTHER_SCHEME_CATEGORIES
    .filter(c => c.toLowerCase().includes(otherSearch.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const handleSearch = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleVoiceSearch = () => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.continuous = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          setSearchQuery(transcript);
          if (resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }
      };
      recognition.start();
    } else {
      alert("Voice search activated. Speak your search query or type directly in the search bar.");
    }
  };

  const calculateDropdownPos = (rect: DOMRect) => {
    const DROPDOWN_HEIGHT = 320;
    const VIEWPORT_H = window.innerHeight;
    const spaceBelow = VIEWPORT_H - rect.bottom;
    const spaceAbove = rect.top;

    let top = rect.bottom + 8;

    // If space below is constrained and space above is available, open ABOVE card
    if (spaceBelow < DROPDOWN_HEIGHT && spaceAbove > DROPDOWN_HEIGHT) {
      top = Math.max(16, rect.top - DROPDOWN_HEIGHT - 8);
    }

    return {
      top,
      left: Math.max(16, rect.left),
      width: Math.max(280, rect.width),
    };
  };

  const openDropdown = () => {
    if (otherOpen) {
      setOtherOpen(false);
      setOtherSearch("");
      return;
    }

    const cardRect = otherRef.current?.getBoundingClientRect();
    if (!cardRect) {
      setOtherOpen(true);
      setOtherSearch("");
      return;
    }

    const DROPDOWN_HEIGHT = 320;
    const VIEWPORT_H = window.innerHeight;
    const spaceBelow = VIEWPORT_H - cardRect.bottom;
    const spaceAbove = cardRect.top;

    // If neither below nor above has enough room, scroll down to bring card into view
    if (spaceBelow < DROPDOWN_HEIGHT && spaceAbove <= DROPDOWN_HEIGHT) {
      const scrollNeeded = DROPDOWN_HEIGHT - spaceBelow + 40;
      window.scrollBy({ top: scrollNeeded, behavior: "smooth" });

      setTimeout(() => {
        if (otherRef.current) {
          const rect = otherRef.current.getBoundingClientRect();
          setDropdownPos(calculateDropdownPos(rect));
        }
        setOtherOpen(true);
        setOtherSearch("");
      }, 300);
      return;
    }

    setDropdownPos(calculateDropdownPos(cardRect));
    setOtherOpen(true);
    setOtherSearch("");
  };

  // Close dropdown on click outside both card AND dropdown container
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        otherRef.current && !otherRef.current.contains(e.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
      ) {
        setOtherOpen(false);
        setOtherSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Dynamically reposition on scroll / window resize
  useEffect(() => {
    if (!otherOpen) return;
    const reposition = () => {
      if (otherRef.current) {
        const rect = otherRef.current.getBoundingClientRect();
        setDropdownPos(calculateDropdownPos(rect));
      }
    };
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [otherOpen]);

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? scheme.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });
  return (
    <main suppressHydrationWarning className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pb-24 space-y-8 sm:space-y-12">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-on-surface font-extrabold tracking-tight">
              Discover <span className="text-gradient font-bold italic">Government Schemes</span> matched for you
            </h1>
            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-[520px] font-medium leading-relaxed">
              Our AI intelligence layer analyzes your profile to match you with the most relevant schemes, grants, and scholarships instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-primary text-on-primary px-8 py-3.5 rounded-xl font-label-sm shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2 touch-target-min">
                <span>Find My Schemes</span>
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_forward</span>
              </button>
              <button onClick={() => setOtherOpen(true)} className="w-full sm:w-auto bg-surface-container text-on-surface px-8 py-3.5 rounded-xl font-label-sm border border-outline-variant hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 touch-target-min">
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">explore</span>
                <span>Browse All</span>
              </button>
            </div>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden glass-panel shadow-apple-lg group hover:shadow-[0_20px_50px_rgba(0,74,198,0.15)]">
            <img 
              alt="Discover Government Schemes - Premium AI Illustration" 
              className="absolute inset-0 w-full h-full object-cover rounded-3xl mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKJG5Iu1AOW970d5WsUI2Wf5b4e1Cf52QnOPqPLPk-tRZqs8Wb_PehU1bPeVuki-y9lgwdWqGzJcGwBg3yxROkhlwONmrmdvJIN4BfcUwcQXbvSjCH4Bw5xQIgZxj3kf69vyjPlBx0I0YLKzai7Iru90IYFqXS-UTYnHrrbC6_y0515NJskd7fj3Act6faWaIH2CqOgoeflw-ESGVHlqXhyCUjrbKhdXwCPG0mCYy1hsJycJydkcs0xA" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
            <div className="spotlight-overlay pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 99, 235, 0.08), transparent 40%)' }}></div>
          </div>
        </section>

        {/* Global AI Search Box */}
        <section className="glass-panel rounded-3xl p-8 shadow-apple-lg border-t border-white/80 relative overflow-hidden hover:shadow-[0_20px_50px_rgba(0,74,198,0.15)] group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 bg-white/60 rounded-2xl p-2 border border-outline-variant/30 shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition-all">
            <span className="material-symbols-outlined text-on-surface pl-4">search</span>
            <input 
              className="flex-1 bg-transparent border-none focus:ring-0 text-body-lg text-on-surface placeholder:text-on-surface-variant/70 py-4 outline-none w-full" 
              placeholder="Search all government schemes... (e.g., 'Central Sector Scholarship', 'PM Vidya Lakshmi', 'Farmer Loans')" 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleVoiceSearch}
              className={`p-4 transition-colors rounded-xl flex items-center justify-center ${isListening ? "text-red-500 bg-red-50 animate-pulse" : "text-on-surface-variant hover:text-primary"}`}
              title="Voice Search"
            >
              <span className="material-symbols-outlined">mic</span>
            </button>
            <button 
              onClick={handleSearch} 
              className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-sm shadow-md hover:scale-105 transition-transform flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,74,198,0.3)]"
            >
              <span className="material-symbols-outlined">auto_awesome</span>
              Search
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Suggested:</span>
            <button onClick={() => { setSelectedCategory(selectedCategory === "Agriculture" ? null : "Agriculture"); handleSearch(); }} className={`px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border ${selectedCategory === 'Agriculture' ? 'border-primary text-primary font-bold' : 'border-outline-variant/20 text-on-surface'} hover:border-primary hover:text-primary transition-colors text-label-sm flex items-center gap-2 hover:shadow-[inset_0_0_12px_rgba(0,74,198,0.1)] duration-300`}>
              <span className="material-symbols-outlined text-[14px]">agriculture</span> Farmer Schemes
            </button>
            <button onClick={() => { setSelectedCategory(selectedCategory === "Students" ? null : "Students"); handleSearch(); }} className={`px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border ${selectedCategory === 'Students' ? 'border-primary text-primary font-bold' : 'border-outline-variant/20 text-on-surface'} hover:border-primary hover:text-primary transition-colors text-label-sm flex items-center gap-2 hover:shadow-[inset_0_0_12px_rgba(0,74,198,0.1)] duration-300`}>
              <span className="material-symbols-outlined text-[14px]">school</span> Student Scholarships
            </button>
            <button onClick={() => { setSelectedCategory(selectedCategory === "Business" ? null : "Business"); handleSearch(); }} className={`px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border ${selectedCategory === 'Business' ? 'border-primary text-primary font-bold' : 'border-outline-variant/20 text-on-surface'} hover:border-primary hover:text-primary transition-colors text-label-sm flex items-center gap-2 hover:shadow-[inset_0_0_12px_rgba(0,74,198,0.1)] duration-300`}>
              <span className="material-symbols-outlined text-[14px]">rocket_launch</span> Business & Startup
            </button>
            {selectedCategory && (
              <button onClick={() => setSelectedCategory(null)} className="px-3 py-1.5 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-full font-medium transition-colors">
                Clear Filter
              </button>
            )}
          </div>
          <div className="spotlight-overlay pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 99, 235, 0.08), transparent 40%)' }}></div>
        </section>

        {/* Schemes Results Grid */}
        <section ref={resultsRef} className="space-y-8 scroll-mt-24">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory ? `${selectedCategory} Schemes` : "Available Schemes"}
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Showing {filteredSchemes.length} schemes matched across National & State Databases
              </p>
            </div>
            {selectedCategory && (
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/20">
                Filtered by: {selectedCategory}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredSchemes.map(scheme => (
              <SpotlightCard key={scheme.id} className="glass-panel bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-apple-lg transition-all duration-300 flex flex-col gap-4 group" spotlightColor="rgba(37, 99, 235, 0.08)">
                <div className="flex justify-between items-start relative z-10">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-[12px] uppercase tracking-wider font-semibold">{scheme.category}</span>
                  <span className="material-symbols-outlined text-outline opacity-40 group-hover:text-primary group-hover:opacity-100 transition-colors">bookmark</span>
                </div>
                <div className="space-y-2 relative z-10">
                  <h3 className="font-headline-sm text-[20px] font-bold text-on-surface group-hover:text-primary transition-colors">{scheme.name}</h3>
                  <p className="text-body-md text-on-surface-variant text-[14px] line-clamp-2">{scheme.description}</p>
                </div>
                <div className="flex items-center gap-2 text-secondary font-bold text-[14px] relative z-10">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                  {scheme.financialBenefits || "Variable Benefits"}
                </div>
                <Link href={`/schemes/${scheme.id}`} className="mt-auto w-full py-3 rounded-xl bg-primary text-on-primary font-label-sm hover:scale-[1.02] transition-transform shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] text-center block relative z-10 font-bold">
                  View Details
                </Link>
              </SpotlightCard>
            ))}
            
            <SpotlightCard
              className="glass-panel bg-gradient-to-br from-white/60 to-primary/5 backdrop-blur-md rounded-3xl p-6 border border-primary/20 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-apple-lg transition-all duration-300 flex flex-col gap-4 group justify-center items-center text-center cursor-pointer h-full"
              spotlightColor="rgba(37, 99, 235, 0.12)"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500 relative z-10 border border-primary/10">
                <span className="material-symbols-outlined text-primary text-3xl">apps</span>
              </div>
              <div className="space-y-1 relative z-10">
                <h3 className="font-headline-sm text-[20px] font-bold text-on-surface group-hover:text-primary transition-colors">Other Schemes</h3>
                <p className="text-body-md text-primary/70 text-[14px] max-w-[200px]">Explore {OTHER_SCHEME_CATEGORIES.length}+ government scheme categories</p>
              </div>
              <button
                onClick={() => setOtherOpen(true)}
                className="mt-4 px-8 py-3 rounded-xl bg-white border border-primary/20 text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-sm relative z-10 flex items-center gap-2 group-hover:shadow-[0_4px_14px_0_rgba(0,118,255,0.39)]"
              >
                Explore All
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </SpotlightCard>

            {filteredSchemes.length === 0 && (
              <div className="col-span-full text-center py-16 glass-panel rounded-3xl p-8 border border-gray-100">
                <span className="material-symbols-outlined text-5xl text-gray-400 mb-3">search_off</span>
                <h3 className="text-lg font-bold text-gray-800">No schemes found matching "{searchQuery}"</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                  Try searching with broader terms like "Scholarship", "Loan", "Farmer", or browse our 144+ scheme categories.
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                  className="mt-4 px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Clear Search & View All
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Scheme Categories Modal Overlay — Centered, No Viewport Clipping */}
        {otherOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">All Scheme Categories</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Explore {OTHER_SCHEME_CATEGORIES.length}+ government scheme domains</p>
                </div>
                <button
                  onClick={() => { setOtherOpen(false); setOtherSearch(""); }}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>

              {/* Search Bar inside Modal */}
              <div className="p-4 border-b border-gray-100 bg-white">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search categories (e.g., Scholarship, Higher Education, Agriculture...)"
                    value={otherSearch}
                    onChange={(e) => setOtherSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50 rounded-2xl border border-gray-200 outline-none focus:border-primary focus:bg-white transition-all text-gray-800 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Category Grid */}
              <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh]">
                {filteredOther.length > 0 ? (
                  filteredOther.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setOtherOpen(false);
                        setOtherSearch("");
                        if (resultsRef.current) {
                          resultsRef.current.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="text-left px-4 py-3 rounded-2xl bg-gray-50 hover:bg-primary/10 hover:text-primary border border-gray-100 hover:border-primary/30 transition-all font-medium text-xs sm:text-sm text-gray-700 flex items-center justify-between group"
                    >
                      <span>{cat}</span>
                      <span className="material-symbols-outlined text-base text-gray-400 group-hover:text-primary transition-colors">chevron_right</span>
                    </button>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-sm text-gray-400">
                    No matching categories found for "{otherSearch}"
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-500">
                <span>Showing {filteredOther.length} of {OTHER_SCHEME_CATEGORIES.length} categories</span>
                <button
                  onClick={() => { setOtherOpen(false); setOtherSearch(""); }}
                  className="px-5 py-2 bg-primary text-white font-semibold rounded-xl text-xs hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
  );
}
