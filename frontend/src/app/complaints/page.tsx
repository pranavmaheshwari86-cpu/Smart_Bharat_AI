"use client";

import { useEffect, useRef, useState } from "react";
import { ComplaintsShowcase } from "@/components/ComplaintsShowcase";

const SUBCATEGORIES: Record<string, string[]> = {
  "Roads & Infrastructure": [
    "Road Damage / Potholes", "Broken Roads", "Road Not Constructed", "Road Needs Repair",
    "Damaged Footpath", "Broken Divider", "Damaged Flyover", "Bridge Damage",
    "Road Shoulder Damage", "Missing Road Markings", "Speed Breaker Request",
    "Illegal Speed Breaker", "Missing Road Signs", "Damaged Road Sign",
    "Damaged Traffic Signal", "Street Obstruction", "Road Encroachment",
    "Illegal Construction on Road", "Road Cave-in", "Drain Cover Missing",
    "Open Manhole", "Dangerous Road Condition"
  ],
  "Electricity": [
    "Power Cut", "Frequent Power Outage", "Low Voltage", "High Voltage",
    "Street Light Not Working", "Street Light Flickering", "Pole Damage",
    "Electric Wire Hanging", "Transformer Fault", "Transformer Explosion",
    "Illegal Electricity Connection", "Electric Shock Hazard", "Broken Electric Pole",
    "Meter Related Complaint", "Billing Complaint", "Power Theft"
  ],
  "Water Supply": [
    "No Water Supply", "Low Water Pressure", "Dirty Water Supply",
    "Water Leakage", "Pipeline Burst", "Water Wastage",
    "Illegal Water Connection", "Water Tank Overflow", "Contaminated Drinking Water",
    "Water Logging", "Water Connection Request", "Public Tap Not Working", "Hand Pump Repair"
  ],
  "Drainage & Sewer": [
    "Drain Blockage", "Sewer Overflow", "Drain Water Leakage", "Open Drain",
    "Drain Cleaning Request", "Sewage Leakage", "Bad Smell from Sewer",
    "Flooded Drain", "Storm Water Drain Blocked", "Septic Tank Overflow"
  ],
  "Sanitation & Waste": [
    "Garbage Not Collected", "Overflowing Dustbin", "Illegal Garbage Dumping", "Construction Waste",
    "Biomedical Waste", "Dead Animal Removal", "Public Toilet Dirty", "Public Toilet Not Working",
    "Waste Burning", "Littering Complaint", "Mosquito Breeding", "Cleaning Request", "Sweeping Not Done"
  ],
  "Parks & Environment": [
    "Tree Fallen", "Tree Pruning Request", "Dangerous Tree", "Illegal Tree Cutting", "Park Maintenance",
    "Park Lights Not Working", "Park Equipment Damaged", "Grass Not Cut", "Water Logging in Park",
    "Pollution Complaint", "Air Pollution", "Noise Pollution", "Water Pollution", "Dust Pollution", "Illegal Burning"
  ],
  "Healthcare": [
    "Government Hospital Complaint", "Medicine Not Available", "Doctor Absent", "Poor Medical Service",
    "Ambulance Delay", "Primary Health Centre Complaint", "Vaccination Issue", "Illegal Medical Waste",
    "Health Camp Request", "Public Health Hazard"
  ],
  "Animal Related": [
    "Stray Dogs", "Dog Bite Complaint", "Stray Cattle", "Monkey Menace", "Pig Menace",
    "Dead Animal", "Animal Cruelty", "Illegal Animal Shelter", "Snake Rescue Request"
  ],
  "Traffic": [
    "Traffic Signal Not Working", "Traffic Congestion", "Illegal Parking", "Abandoned Vehicle",
    "Vehicle Blocking Road", "Wrong Side Driving", "Dangerous Driving", "Encroachment on Road",
    "Missing Zebra Crossing", "Traffic Police Complaint"
  ],
  "Fire & Emergency": [
    "Fire Hazard", "Blocked Fire Exit", "Illegal Firecracker Storage", "Fire Safety Violation",
    "Emergency Rescue Request"
  ],
  "Agriculture & Rural": [
    "Canal Damage", "Irrigation Problem", "Crop Damage Complaint", "Government Seed Complaint",
    "Fertilizer Complaint", "Animal Damage to Crops", "Village Road Complaint", "Panchayat Complaint"
  ],
  "Education": [
    "Government School Complaint", "Teacher Absent", "School Infrastructure Issue",
    "Mid-Day Meal Complaint", "Scholarship Issue", "School Toilet Complaint"
  ],
  "Public Transport": [
    "Bus Stop Damage", "Bus Service Complaint", "Government Bus Delay", "Auto Stand Issue",
    "Metro Complaint", "Railway Crossing Issue"
  ],
  "Telecom & Digital": [
    "Internet Connectivity Issue", "Mobile Tower Complaint", "Broadband Cable Damage",
    "Government WiFi Complaint", "CSC Service Complaint"
  ],
  "Food & Public Distribution": [
    "Ration Card Complaint", "Fair Price Shop Complaint", "Poor Quality Ration",
    "Gas Connection Complaint", "Food Safety Complaint", "Food Adulteration"
  ],
  "Government Services": [
    "Aadhaar Related Issue", "PAN Related Issue", "Voter ID Issue", "Passport Complaint",
    "Driving License Issue", "Vehicle Registration Issue", "Government Office Complaint",
    "Online Portal Issue", "Corruption Complaint", "Bribery Complaint",
    "Delay in Government Service", "Officer Misconduct"
  ],
  "Disaster & Weather": [
    "Flooding", "Water Logging", "Storm Damage", "Landslide", "Cyclone Damage",
    "Heatwave Relief", "Disaster Relief Complaint"
  ],
  "Accessibility": [
    "Ramp Not Available", "Footpath Accessibility", "Public Building Accessibility",
    "Disabled Parking Issue", "Public Toilet Accessibility"
  ],
  "Housing": [
    "PMAY Complaint", "Housing Board Complaint", "Slum Improvement Complaint",
    "Government Housing Maintenance", "Rental Housing Complaint"
  ],
  "Other": [
    "General Complaint", "Suggestion", "Feedback", "Department Not Listed", "Other Civic Issue"
  ]
};

// Populate "Other" with all possible complaints for an exhaustive search
SUBCATEGORIES["Other"] = [
  ...SUBCATEGORIES["Other"],
  ...Array.from(new Set(Object.entries(SUBCATEGORIES).flatMap(([key, issues]) => key !== "Other" ? issues : []))).sort()
];

export default function ComplaintsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const shaderCanvasRef = useRef<HTMLCanvasElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset dropdown when category changes
  useEffect(() => {
    setSelectedIssue("");
    setSearchQuery("");
    setIsDropdownOpen(false);
  }, [selectedCategory]);

  // Background Shader
  useEffect(() => {
    const canvas = shaderCanvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas?.clientWidth || 1280;
      const h = canvas?.clientHeight || 720;
      if (canvas && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let ro: ResizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(syncSize);
      ro.observe(canvas);
    }
    syncSize();

    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext);
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

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = v_texCoord;
    
    // Base palette from design system
    vec3 bgBase = vec3(0.98, 0.98, 0.97); // #FAFAF8
    vec3 accentBlue = vec3(0.145, 0.388, 0.922); // #2563EB
    vec3 accentGold = vec3(0.722, 0.576, 0.353); // #B8935A
    
    // Ambient radial glows - slow and breathing
    float d1 = length(uv - vec2(0.2 + 0.1 * cos(u_time * 0.2), 0.8 + 0.1 * sin(u_time * 0.1)));
    float glow1 = smoothstep(0.8, 0.0, d1) * 0.06;
    
    float d2 = length(uv - vec2(0.8 + 0.1 * sin(u_time * 0.3), 0.2 + 0.1 * cos(u_time * 0.2)));
    float glow2 = smoothstep(0.7, 0.0, d2) * 0.05;
    
    vec3 color = bgBase;
    color = mix(color, accentBlue, glow1);
    color = mix(color, accentGold, glow2);
    
    // Fine dotted grid overlay
    vec2 gridUv = fract(uv * 50.0);
    float dot = smoothstep(0.1, 0.05, length(gridUv - 0.5));
    color = mix(color, vec3(0.85, 0.83, 0.8), dot * 0.1);
    
    // Subtle noise for paper texture
    float n = noise(uv * 1000.0 + u_time * 0.01) * 0.02;
    color += n;
    
    gl_FragColor = vec4(color, 1.0);
}`;
    function cs(type: number, src: string) {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    const prog = gl.createProgram();
    if (!prog) return;

    const vShader = cs(gl.VERTEX_SHADER, vs);
    const fShader = cs(gl.FRAGMENT_SHADER, fs);
    if (!vShader || !fShader) return;

    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    function render(t: number) {
      if (typeof ResizeObserver === "undefined") syncSize();
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      if (uTime) gl!.uniform1f(uTime, t * 0.001);
      if (uRes) gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      if (uMouse) gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }
    render(0);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (ro) ro.disconnect();
    };
  }, []);

  // Spotlight Interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const wrappers = document.querySelectorAll(
        ".spotlight-wrapper"
      ) as NodeListOf<HTMLElement>;
      wrappers.forEach((wrapper) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        wrapper.style.setProperty("--x", `${x}px`);
        wrapper.style.setProperty("--y", `${y}px`);
      });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="font-body-md text-on-surface antialiased overflow-hidden selection:bg-primary/20 selection:text-primary min-h-screen">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Glassmorphism Utilities */
        .glass {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 8px 32px 0 rgba(28, 27, 25, 0.05);
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 4px 20px rgba(28, 27, 25, 0.04);
            transition: all 0.3s ease;
        }

        .glass-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(28, 27, 25, 0.08);
            border-color: rgba(0, 74, 198, 0.2); /* primary tint */
        }

        /* Dotted Grid Background */
        .dotted-grid {
            background-image: radial-gradient(rgba(115, 118, 134, 0.15) 1px, transparent 1px);
            background-size: 24px 24px;
        }

        /* Animations */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
        }

        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }

        /* Cursor Spotlight */
        .spotlight-wrapper {
            position: relative;
            overflow: hidden;
        }
        
        .spotlight-wrapper::before {
            content: '';
            position: absolute;
            top: var(--y, 0);
            left: var(--x, 0);
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 0;
        }

        .spotlight-wrapper:hover::before {
            opacity: 1;
        }

        .spotlight-content {
            position: relative;
            z-index: 1;
        }

        /* Form Inputs */
        .input-glass {
            background: transparent;
            border: none;
            border-bottom: 1px solid #c3c6d7; /* outline-variant */
            border-radius: 0;
            padding: 12px 0;
            transition: all 0.3s ease;
        }
        
        .input-glass:focus {
            outline: none;
            border-bottom-color: #004ac6; /* primary */
            border-bottom-width: 2px;
            box-shadow: none;
        }

        /* Material Icons setup */
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        .material-symbols-outlined.fill {
            font-variation-settings: 'FILL' 1;
        }

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
            position: fixed;
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
            position: fixed;
            bottom: -20%;
            right: -10%;
            width: 60vw;
            height: 60vw;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(120, 89, 38, 0.06) 0%, rgba(253, 248, 245, 0) 70%);
            z-index: -1;
            pointer-events: none;
        }
        `
      }} />

      {/* Dashboard Background */}
      <div className="fixed inset-0 z-[-2] bg-[#fdf8f5]"></div>
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      {/* Main Canvas */}
      <main className="pt-[100px] pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 animate-fade-in-up py-4">
            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold w-fit shadow-sm">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              Smart Bharat AI Civic Portal 2.0
            </div>

            <h1 className="font-display-lg text-display-lg text-on-surface leading-tight">
              Report a <br/> <span className="bg-gradient-to-r from-[#2b61cd] via-[#7c87a5] to-[#ae8d5b] text-transparent bg-clip-text italic pr-2 font-bold">Civic Issue</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px] font-medium leading-relaxed">
              Describe your issue naturally in English or Hindi. Our AI engine automatically extracts geolocation, routes your request to Jal Board, PWD, or Power Corp, and tracks real-time status.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <button
                onClick={() => {
                  const el = document.getElementById("category-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3"
              >
                File New Complaint
                <span className="material-symbols-outlined text-xl">arrow_downward</span>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("category-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white/80 backdrop-blur-md text-on-surface px-7 py-4 rounded-2xl font-bold text-base border border-outline-variant/40 hover:bg-white hover:border-primary/40 transition-all flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-xl text-primary">search</span>
                Track Status
              </button>
            </div>

            {/* AI Live Stats Row */}
            <div className="grid grid-cols-3 gap-3 mt-3 pt-4 border-t border-outline-variant/20">
              <div className="bg-white/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-sm flex flex-col">
                <span className="text-xl font-extrabold text-primary">99.4%</span>
                <span className="text-[11px] font-medium text-on-surface-variant">AI Route Accuracy</span>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-sm flex flex-col">
                <span className="text-xl font-extrabold text-secondary">&lt; 12h</span>
                <span className="text-[11px] font-medium text-on-surface-variant font-sans">Avg Dispatch</span>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-sm flex flex-col">
                <span className="text-xl font-extrabold text-tertiary">50,000+</span>
                <span className="text-[11px] font-medium text-on-surface-variant">Issues Solved</span>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2.5 mt-1">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/80 text-xs font-semibold text-on-surface shadow-xs">
                <span className="material-symbols-outlined text-secondary text-base fill">verified_user</span>
                Encrypted & Secure
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/80 text-xs font-semibold text-on-surface shadow-xs">
                <span className="material-symbols-outlined text-primary text-base fill">bolt</span>
                Instant Department Dispatch
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/80 text-xs font-semibold text-on-surface shadow-xs">
                <span className="material-symbols-outlined text-green-600 text-base">my_location</span>
                GPS Auto-Tagging
              </div>
            </div>
          </div>
          <div className="w-full h-full relative min-h-[520px] lg:min-h-[560px] flex items-center justify-center animate-fade-in-up delay-100">
            <ComplaintsShowcase />
          </div>
        </section>

        {/* Category Selection */}
        <section id="category-section" className="flex flex-col gap-8 animate-fade-in-up delay-200 pb-20 scroll-mt-24">
          <div className="flex items-baseline justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface">Select Category</h2>
            <button  className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* 11 Specific Cards */}
            <button onClick={() => setSelectedCategory("Roads & Infrastructure")} className="glass-card p-7 md:p-8 rounded-3xl flex flex-col items-start gap-5 text-left spotlight-wrapper group hover:scale-[1.02] transition-all duration-300">
              <div className="spotlight-content w-full">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-3xl md:text-4xl">add_road</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-on-surface">Roads & Infrastructure</h3>
                <p className="text-sm font-medium text-on-surface-variant mt-1">PWD Department</p>
                <p className="text-xs font-semibold text-secondary mt-3 bg-secondary-container/20 px-3 py-1.5 rounded-lg inline-block">Est. 48h</p>
              </div>
            </button>
            <button onClick={() => setSelectedCategory("Water Supply")} className="glass-card p-7 md:p-8 rounded-3xl flex flex-col items-start gap-5 text-left spotlight-wrapper group hover:scale-[1.02] transition-all duration-300">
              <div className="spotlight-content w-full">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-3xl md:text-4xl">water_drop</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-on-surface">Water Supply</h3>
                <p className="text-sm font-medium text-on-surface-variant mt-1">Jal Board</p>
                <p className="text-xs font-semibold text-secondary mt-3 bg-secondary-container/20 px-3 py-1.5 rounded-lg inline-block">Est. 24h</p>
              </div>
            </button>
            <button onClick={() => setSelectedCategory("Electricity")} className="glass-card p-7 md:p-8 rounded-3xl flex flex-col items-start gap-5 text-left spotlight-wrapper group hover:scale-[1.02] transition-all duration-300">
              <div className="spotlight-content w-full">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-3xl md:text-4xl">electric_bolt</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-on-surface">Electricity</h3>
                <p className="text-sm font-medium text-on-surface-variant mt-1">Power Corp</p>
                <p className="text-xs font-semibold text-secondary mt-3 bg-secondary-container/20 px-3 py-1.5 rounded-lg inline-block">Est. 12h</p>
              </div>
            </button>
            <button onClick={() => setSelectedCategory("Drainage & Sewer")} className="glass-card p-7 md:p-8 rounded-3xl flex flex-col items-start gap-5 text-left spotlight-wrapper group hover:scale-[1.02] transition-all duration-300">
              <div className="spotlight-content w-full">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-3xl md:text-4xl">plumbing</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-on-surface">Drainage & Sewer</h3>
                <p className="text-sm font-medium text-on-surface-variant mt-1">Jal Board</p>
                <p className="text-xs font-semibold text-secondary mt-3 bg-secondary-container/20 px-3 py-1.5 rounded-lg inline-block">Est. 48h</p>
              </div>
            </button>
            <button onClick={() => setSelectedCategory("Sanitation & Waste")} className="glass-card p-7 md:p-8 rounded-3xl flex flex-col items-start gap-5 text-left spotlight-wrapper group hover:scale-[1.02] transition-all duration-300">
              <div className="spotlight-content w-full">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-3xl md:text-4xl">delete</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-on-surface">Sanitation & Waste</h3>
                <p className="text-sm font-medium text-on-surface-variant mt-1">Municipal Corp</p>
                <p className="text-xs font-semibold text-secondary mt-3 bg-secondary-container/20 px-3 py-1.5 rounded-lg inline-block">Est. 24h</p>
              </div>
            </button>
            <button onClick={() => setSelectedCategory("Healthcare")} className="glass-card p-7 md:p-8 rounded-3xl flex flex-col items-start gap-5 text-left spotlight-wrapper group hover:scale-[1.02] transition-all duration-300">
              <div className="spotlight-content w-full">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-3xl md:text-4xl">local_hospital</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-on-surface">Healthcare</h3>
                <p className="text-sm font-medium text-on-surface-variant mt-1">Health Dept</p>
                <p className="text-xs font-semibold text-secondary mt-3 bg-secondary-container/20 px-3 py-1.5 rounded-lg inline-block">Est. 72h</p>
              </div>
            </button>
            <button onClick={() => setSelectedCategory("Traffic")} className="glass-card p-7 md:p-8 rounded-3xl flex flex-col items-start gap-5 text-left spotlight-wrapper group hover:scale-[1.02] transition-all duration-300">
              <div className="spotlight-content w-full">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-3xl md:text-4xl">traffic</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-on-surface">Traffic</h3>
                <p className="text-sm font-medium text-on-surface-variant mt-1">Traffic Police</p>
                <p className="text-xs font-semibold text-secondary mt-3 bg-secondary-container/20 px-3 py-1.5 rounded-lg inline-block">Est. 12h</p>
              </div>
            </button>

            {/* The 12th card: Other */}
            <button onClick={() => setSelectedCategory("Other")} className="glass-card p-7 md:p-8 rounded-3xl flex flex-col items-start gap-5 text-left spotlight-wrapper group hover:scale-[1.02] transition-all duration-300">
              <div className="spotlight-content w-full">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-3xl md:text-4xl">more_horiz</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-on-surface">Other</h3>
                <p className="text-sm font-medium text-on-surface-variant mt-1">Various Depts</p>
                <p className="text-xs font-semibold text-secondary mt-3 bg-secondary-container/20 px-3 py-1.5 rounded-lg inline-block">Est. 72h</p>
              </div>
            </button>
          </div>

          {/* Subcategory Dropdown */}
          {selectedCategory && SUBCATEGORIES[selectedCategory] && (
            <div className="mt-8 max-w-4xl mx-auto w-full animate-fade-in">
              <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 border-primary/20 shadow-[0_8px_32px_rgba(37,99,235,0.05)]">
                <label className="text-sm font-medium text-on-surface-variant">Select specific issue for {selectedCategory}</label>
                <div className="relative" ref={dropdownRef}>
                  <input
                    type="text"
                    value={isDropdownOpen ? searchQuery : selectedIssue || searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsDropdownOpen(true);
                      if (selectedIssue) setSelectedIssue("");
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="Type to search or select an issue..."
                    className="w-full bg-surface-container/50 border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                  />
                  <span 
                    className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {isDropdownOpen ? "expand_less" : "expand_more"}
                  </span>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-outline-variant/50 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto animate-fade-in">
                      {SUBCATEGORIES[selectedCategory]
                        .filter(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((sub, idx) => (
                          <div 
                            key={idx} 
                            className="px-4 py-3 hover:bg-surface-container cursor-pointer text-on-surface font-body-sm border-b last:border-b-0 border-outline-variant/20 transition-colors"
                            onClick={() => {
                              setSelectedIssue(sub);
                              setSearchQuery("");
                              setIsDropdownOpen(false);
                            }}
                          >
                            {sub}
                          </div>
                        ))}
                      {SUBCATEGORIES[selectedCategory].filter(sub => sub.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                        <div className="px-4 py-3 text-on-surface-variant text-sm italic">
                          No matching issues found.
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-2">
                   <button className="bg-primary text-on-primary px-6 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                     Proceed to Submit
                   </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Form elements removed as requested */}
      </main>
    </div>
  );
}
