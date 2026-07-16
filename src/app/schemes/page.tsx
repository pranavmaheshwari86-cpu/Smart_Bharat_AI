"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { schemes } from "@/lib/data";

export default function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
        <div className="absolute inset-0 w-full h-full" style={{ display: 'block' }}>
          <canvas id="shader-canvas-ANIMATION_5" style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
        </div>
      </div>
      
      <main className="pt-[104px] pb-16 px-4 md:px-8 max-w-[1400px] mx-auto space-y-12 md:space-y-16 relative z-10">
        <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16 mt-8">
          <div className="space-y-6 pr-4 lg:pr-8">
            <h1 className="font-display-lg text-display-lg text-on-surface leading-tight">
              Discover <br />
              <span className="text-gradient font-bold italic px-2 -ml-2">Government Schemes</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px]">
              Our AI intelligence layer analyzes your profile to match you with the most relevant schemes, grants, and scholarships instantly.
            </p>
            <div className="pt-4 flex gap-4">
              <Link href="/ai" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-sm shadow-apple-sm hover:-translate-y-1 transition-transform duration-300 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,74,198,0.3)]">
                Find My Schemes
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <button onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })} className="bg-surface-container text-on-surface px-8 py-4 rounded-xl font-label-sm border border-outline-variant hover:bg-surface-container-high transition-colors flex items-center gap-2">
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

        <section className="glass-panel rounded-3xl p-8 shadow-apple-lg border-t border-white/80 relative overflow-hidden hover:shadow-[0_20px_50px_rgba(0,74,198,0.15)] group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 bg-white/40 rounded-2xl p-2 border border-outline-variant/20 shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition-all">
            <span className="material-symbols-outlined text-on-surface pl-4">search</span>
            <input 
              className="flex-1 bg-transparent border-none focus:ring-0 text-body-lg text-on-surface placeholder:text-on-surface-variant/70 py-4 outline-none w-full" 
              placeholder="Describe what you are looking for... e.g. 'Scholarships for girls in Karnataka'" 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => alert("Starting voice search...")} className="p-4 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">mic</span>
            </button>
            <button onClick={() => alert("Searching schemes...")} className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-sm shadow-md hover:scale-105 transition-transform flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,74,198,0.3)]">
              <span className="material-symbols-outlined">auto_awesome</span>
              Search
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Suggested:</span>
            <button onClick={() => setSelectedCategory(selectedCategory === "Agriculture" ? null : "Agriculture")} className={`px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border ${selectedCategory === 'Agriculture' ? 'border-primary text-primary' : 'border-outline-variant/20 text-on-surface'} hover:border-primary hover:text-primary transition-colors text-label-sm flex items-center gap-2 hover:shadow-[inset_0_0_12px_rgba(0,74,198,0.1)] duration-300`}>
              <span className="material-symbols-outlined text-[14px]">agriculture</span> Farmer Schemes
            </button>
            <button onClick={() => setSelectedCategory(selectedCategory === "Education" ? null : "Education")} className={`px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border ${selectedCategory === 'Education' ? 'border-primary text-primary' : 'border-outline-variant/20 text-on-surface'} hover:border-primary hover:text-primary transition-colors text-label-sm flex items-center gap-2 hover:shadow-[inset_0_0_12px_rgba(0,74,198,0.1)] duration-300`}>
              <span className="material-symbols-outlined text-[14px]">school</span> Student Scholarships
            </button>
            <button onClick={() => setSelectedCategory(selectedCategory === "Business" ? null : "Business")} className={`px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border ${selectedCategory === 'Business' ? 'border-primary text-primary' : 'border-outline-variant/20 text-on-surface'} hover:border-primary hover:text-primary transition-colors text-label-sm flex items-center gap-2 hover:shadow-[inset_0_0_12px_rgba(0,74,198,0.1)] duration-300`}>
              <span className="material-symbols-outlined text-[14px]">rocket_launch</span> Business & Startup
            </button>
          </div>
          <div className="spotlight-overlay pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 99, 235, 0.08), transparent 40%)' }}></div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface">Available Schemes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {filteredSchemes.map(scheme => (
              <div key={scheme.id} className="glass-panel bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/80 shadow-sm hover:shadow-apple-lg transition-all duration-300 flex flex-col gap-4 group">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-primary/5 text-primary font-label-sm text-[12px] uppercase tracking-wider">{scheme.category}</span>
                  <span className="material-symbols-outlined text-outline opacity-40">bookmark</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline-sm text-[20px] font-bold text-on-surface group-hover:text-primary transition-colors">{scheme.name}</h3>
                  <p className="text-body-md text-on-surface-variant text-[14px] line-clamp-2">{scheme.description}</p>
                </div>
                <div className="flex items-center gap-2 text-secondary font-bold text-[14px]">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                  {scheme.financialBenefits || "Variable Benefits"}
                </div>
                <Link href={`/schemes/${scheme.id}`} className="mt-auto w-full py-3 rounded-xl bg-primary text-on-primary font-label-sm hover:scale-[1.02] transition-transform shadow-md text-center block">View Details</Link>
              </div>
            ))}
            {filteredSchemes.length === 0 && (
              <div className="col-span-full text-center py-12 text-on-surface-variant">
                No schemes found matching your criteria.
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
