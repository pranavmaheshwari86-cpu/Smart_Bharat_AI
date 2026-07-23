"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { schemes } from "@/lib/data";
import { SpotlightCard } from "@/components/SpotlightCard";

const OTHER_SCHEME_CATEGORIES = [
  "Agriculture", "Animal Husbandry", "Dairy Development", "Fisheries", "Horticulture",
  "Food Processing", "Rural Development", "Urban Development", "Housing", "Water Resources",
  "Drinking Water & Sanitation", "Health & Family Welfare", "Medical Assistance", "Nutrition",
  "Women Empowerment", "Child Welfare", "Senior Citizens", "Persons with Disabilities (Divyangjan)",
  "Social Welfare", "Social Security", "Education", "School Education", "Higher Education",
  "Technical Education", "Skill Development", "Employment", "Labour & Workers", "Youth Affairs",
  "Sports", "Entrepreneurship", "Startups", "MSME", "Industry", "Manufacturing",
  "Commerce & Trade", "Financial Services", "Banking", "Insurance", "Pension", "Taxation",
  "Digital India", "Science & Technology", "Innovation", "Research & Development",
  "Artificial Intelligence", "Electronics & IT", "Telecommunications", "Cyber Security",
  "Infrastructure", "Road Transport", "Railways", "Civil Aviation", "Shipping & Ports",
  "Logistics", "Tourism", "Culture", "Heritage", "Minority Welfare", "Scheduled Castes (SC)",
  "Scheduled Tribes (ST)", "Other Backward Classes (OBC)", "Economically Weaker Sections (EWS)",
  "Tribal Affairs", "Border Area Development", "North Eastern Region Development",
  "Jammu & Kashmir Development", "Environment", "Climate Change", "Forest & Wildlife",
  "Renewable Energy", "Power & Electricity", "Petroleum & Natural Gas", "Mining", "Textiles",
  "Handloom", "Handicrafts", "Khadi & Village Industries", "Cooperatives", "Consumer Affairs",
  "Food & Public Distribution", "Legal Aid & Justice", "Police & Internal Security",
  "Disaster Management", "Civil Defence", "Electoral Services", "Governance & Public Services",
  "Citizen Services", "Aadhaar & Identity Services", "Digital Governance", "Scholarships",
  "Fellowships", "Awards & Incentives", "Export Promotion", "Import & Trade Facilitation",
  "Foreign Affairs", "NRI Services", "Defence", "Veterans & Ex-Servicemen", "Space",
  "Atomic Energy", "Public Grievances", "Municipal Services", "Smart Cities", "Village Development",
  "Sanitation", "Cleanliness", "Waste Management", "Water Conservation", "Irrigation",
  "Afforestation", "Biodiversity", "Pollution Control", "Financial Inclusion",
  "Self Help Groups (SHGs)", "Cooperative Societies", "Credit & Loans", "Subsidies",
  "Direct Benefit Transfer (DBT)", "Income Support", "Livelihood", "Price Support",
  "Public Procurement", "E-Governance", "Legal Documentation", "Certificates & Licenses",
  "Civil Registration", "Transport Services", "Land Records", "Property Registration",
  "Judiciary", "Election Services", "Consumer Protection", "Startup Funding", "Innovation Grants",
  "Export Incentives", "Digital Payments", "Women Entrepreneurship", "Farmer Welfare",
  "Citizen Welfare", "Public Health", "Community Development", "Volunteer Programs",
  "Emergency Relief", "Rehabilitation",
];

export default function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [otherOpen, setOtherOpen] = useState(false);
  const [otherSearch, setOtherSearch] = useState("");
  const otherRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const filteredOther = OTHER_SCHEME_CATEGORIES.filter(c =>
    c.toLowerCase().includes(otherSearch.toLowerCase())
  );

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

  useEffect(() => {
    const canvas = document.getElementById('shader-canvas-ANIMATION_5') as HTMLCanvasElement;
    if (!canvas) return;

    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(syncSize);
      ro.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Soft noise function
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = v_texCoord;
    
    // Base colors from the design system
    vec3 bgBase = vec3(1.0, 1.0, 1.0); // #FFFFFF
    vec3 accentBlue = vec3(0.145, 0.388, 0.922); // #2563EB
    vec3 accentGold = vec3(0.722, 0.576, 0.353); // #B8935A
    
    // Slow moving radial glows
    float d1 = length(uv - vec2(0.8 + 0.1 * cos(u_time * 0.5), 0.2 + 0.1 * sin(u_time * 0.4)));
    float glow1 = smoothstep(0.8, 0.0, d1) * 0.1;
    
    float d2 = length(uv - vec2(0.2 + 0.1 * sin(u_time * 0.6), 0.8 + 0.1 * cos(u_time * 0.5)));
    float glow2 = smoothstep(0.7, 0.0, d2) * 0.08;
    
    vec3 color = bgBase;
    color = mix(color, accentBlue, glow1);
    color = mix(color, accentGold, glow2);
    
    // Fine dotted grid
    vec2 gridUv = fract(uv * 50.0);
    float dot = smoothstep(0.05, 0.0, length(gridUv - 0.5));
    color = mix(color, vec3(0.894, 0.878, 0.839), dot * 0.3); // border color for dots
    
    // Subtle noise for texture
    float n = noise(uv * 1000.0 + u_time * 0.01) * 0.02;
    color += n;
    
    gl_FragColor = vec4(color, 1.0);
}`;

    function cs(type: number, src: string) {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl!.createProgram();
    if (!prog) return;
    
    const vsShader = cs(gl!.VERTEX_SHADER, vs);
    const fsShader = cs(gl!.FRAGMENT_SHADER, fs);
    if (!vsShader || !fsShader) return;
    
    gl!.attachShader(prog, vsShader);
    gl!.attachShader(prog, fsShader);
    gl!.linkProgram(prog);
    gl!.useProgram(prog);
    
    const buf = gl!.createBuffer();
    gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
    gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl!.STATIC_DRAW);
    
    const pos = gl!.getAttribLocation(prog, 'a_position');
    gl!.enableVertexAttribArray(pos);
    gl!.vertexAttribPointer(pos, 2, gl!.FLOAT, false, 0, 0);
    
    const uTime = gl!.getUniformLocation(prog, 'u_time');
    const uRes = gl!.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl!.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    function render(t: number) {
      if (typeof ResizeObserver === 'undefined') syncSize();
      gl!.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl!.uniform1f(uTime, t * 0.001);
      if (uRes) gl!.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      if (ro) ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.relative.overflow-hidden.group') as NodeListOf<HTMLElement>;
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <canvas id="shader-canvas-ANIMATION_5" className="fixed inset-0 pointer-events-none z-[-1]" />
      
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-24 pb-section space-y-12">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-display-lg text-display-lg text-on-surface leading-tight">
              Discover <span className="text-gradient font-bold italic">Government Schemes</span> matched for you
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[500px]">
              Our AI intelligence layer analyzes your profile to match you with the most relevant schemes, grants, and scholarships instantly.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-sm shadow-md hover:scale-105 transition-transform flex items-center gap-2">
                Find My Schemes
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button onClick={() => setOtherOpen(true)} className="bg-surface-container text-on-surface px-8 py-4 rounded-xl font-label-sm border border-outline-variant hover:bg-surface-container-high transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined">explore</span>
                Browse All
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
    </>
  );
}
