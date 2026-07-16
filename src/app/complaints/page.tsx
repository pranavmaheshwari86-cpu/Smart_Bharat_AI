"use client";

import { useEffect, useRef } from "react";
import { HeroShowcase } from "@/components/HeroShowcase";

export default function ComplaintsPage() {
  const shaderCanvasRef = useRef<HTMLCanvasElement>(null);

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
    <>
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
        `
      }} />

      {/* Absolute Shader Background */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none" style={{ display: "block" }}>
        <canvas ref={shaderCanvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
      </div>

      {/* Dotted Grid Overlay */}
      <div className="fixed inset-0 dotted-grid -z-10 pointer-events-none"></div>

      {/* Main Canvas */}
      <main className="pt-[140px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-section-gap">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass w-max border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">AI-Powered Resolution System</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-on-surface">
              Report a <br/> <span className="text-primary italic">Civic Issue</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px]">
              Describe your issue naturally. Our AI engine instantly routes it to the correct department, predicts resolution time, and tracks progress securely.
            </p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2 bg-surface-container-low px-4 py-3 rounded-xl border border-surface-variant">
                <span className="material-symbols-outlined text-secondary fill">verified_user</span>
                <span className="font-label-sm text-label-sm text-on-surface">Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low px-4 py-3 rounded-xl border border-surface-variant">
                <span className="material-symbols-outlined text-primary fill">bolt</span>
                <span className="font-label-sm text-label-sm text-on-surface">Fast Routing</span>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden glass animate-fade-in-up delay-100 flex items-center justify-center border border-white/40 shadow-xl">
            <HeroShowcase />
          </div>
        </section>

        {/* Category Selection */}
        <section className="flex flex-col gap-8 animate-fade-in-up delay-200">
          <div className="flex items-baseline justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface">Select Category</h2>
            <button onClick={() => alert("Viewing all categories...")} className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Cards */}
            <button onClick={() => alert("Selected category: Roads")} className="glass-card p-6 rounded-2xl flex flex-col items-start gap-4 text-left spotlight-wrapper group">
              <div className="spotlight-content w-full">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-2xl">add_road</span>
                </div>
                <h3 className="font-body-md text-body-md font-semibold text-on-surface">Roads</h3>
                <p className="text-xs text-on-surface-variant mt-1">PWD Department</p>
                <p className="text-[10px] text-secondary mt-2 bg-secondary-container/20 px-2 py-1 rounded-md inline-block">Est. 48h</p>
              </div>
            </button>
            <button onClick={() => alert("Selected category: Water")} className="glass-card p-6 rounded-2xl flex flex-col items-start gap-4 text-left spotlight-wrapper group">
              <div className="spotlight-content w-full">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-2xl">water_drop</span>
                </div>
                <h3 className="font-body-md text-body-md font-semibold text-on-surface">Water</h3>
                <p className="text-xs text-on-surface-variant mt-1">Jal Board</p>
                <p className="text-[10px] text-secondary mt-2 bg-secondary-container/20 px-2 py-1 rounded-md inline-block">Est. 24h</p>
              </div>
            </button>
            <button onClick={() => alert("Selected category: Electricity")} className="glass-card p-6 rounded-2xl flex flex-col items-start gap-4 text-left spotlight-wrapper group">
              <div className="spotlight-content w-full">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-2xl">electric_bolt</span>
                </div>
                <h3 className="font-body-md text-body-md font-semibold text-on-surface">Electricity</h3>
                <p className="text-xs text-on-surface-variant mt-1">Power Corp</p>
                <p className="text-[10px] text-secondary mt-2 bg-secondary-container/20 px-2 py-1 rounded-md inline-block">Est. 12h</p>
              </div>
            </button>
            <button onClick={() => alert("Selected category: Sanitation")} className="glass-card p-6 rounded-2xl flex flex-col items-start gap-4 text-left spotlight-wrapper group border-primary/30 shadow-[0_8px_32px_rgba(37,99,235,0.1)] transform -translate-y-1">
              <div className="spotlight-content w-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-primary text-2xl fill">delete</span>
                </div>
                <h3 className="font-body-md text-body-md font-semibold text-on-surface">Sanitation</h3>
                <p className="text-xs text-on-surface-variant mt-1">Municipal Corp</p>
                <p className="text-[10px] text-secondary mt-2 bg-secondary-container/20 px-2 py-1 rounded-md inline-block">Est. 24h</p>
              </div>
            </button>
            <button onClick={() => alert("Selected category: Healthcare")} className="glass-card p-6 rounded-2xl flex flex-col items-start gap-4 text-left spotlight-wrapper group">
              <div className="spotlight-content w-full">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-2xl">local_hospital</span>
                </div>
                <h3 className="font-body-md text-body-md font-semibold text-on-surface">Healthcare</h3>
                <p className="text-xs text-on-surface-variant mt-1">Health Dept</p>
                <p className="text-[10px] text-secondary mt-2 bg-secondary-container/20 px-2 py-1 rounded-md inline-block">Est. 72h</p>
              </div>
            </button>
          </div>
        </section>

        {/* Main Form & AI Assistant Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up delay-300">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Complaint Details Form */}
            <div className="glass-card rounded-3xl p-8 border border-white">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Issue Details</h3>
              <div className="flex flex-col gap-6">
                <div className="relative group">
                  <input className="input-glass w-full font-body-md text-body-md text-on-surface peer placeholder-transparent" id="title" placeholder="Brief Title" type="text" />
                  <label className="absolute left-0 top-3 text-on-surface-variant font-body-md transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs" htmlFor="title">Brief Title</label>
                </div>
                <div className="relative group mt-4">
                  <textarea className="input-glass w-full font-body-md text-body-md text-on-surface peer placeholder-transparent resize-none" id="desc" placeholder="Describe the issue..." rows={4}></textarea>
                  <label className="absolute left-0 top-3 text-on-surface-variant font-body-md transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs" htmlFor="desc">Detailed Description</label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="relative group">
                    <select className="input-glass w-full font-body-md text-body-md text-on-surface appearance-none bg-transparent" defaultValue="">
                      <option disabled value="">Select Priority</option>
                      <option>High - Emergency</option>
                      <option>Medium - Standard</option>
                      <option>Low - Informational</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-0 top-3 text-outline-variant pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo & Document Upload */}
            <div className="glass-card rounded-3xl p-8 border border-white border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[240px]">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
              </div>
              <h4 className="font-body-lg text-body-lg text-on-surface mb-2">Upload Evidence</h4>
              <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-[320px] mb-6">Drag &amp; drop photos or documents here, or click to browse. Max size 10MB.</p>
              <button onClick={() => alert("Opening file browser...")} className="bg-surface-container-low border border-outline-variant/30 px-6 py-2 rounded-full font-label-sm text-label-sm hover:bg-surface-container transition-colors">
                Browse Files
              </button>
            </div>
          </div>

          {/* Right Column: AI Assistant & Routing */}
          <div className="flex flex-col gap-8">
            {/* AI Assistant */}
            <div className="glass-card rounded-3xl p-6 border border-white bg-gradient-to-b from-white/80 to-primary-fixed/20 relative overflow-hidden">
              {/* Background decor */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-xl">smart_toy</span>
                </div>
                <div>
                  <h4 className="font-label-sm text-label-sm text-on-surface">AI Assistant</h4>
                  <p className="text-xs text-primary font-medium">Online</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 mb-6 relative z-10">
                <div className="bg-white/80 rounded-2xl rounded-tl-sm p-4 shadow-sm border border-white">
                  <p className="font-body-md text-body-md text-on-surface text-sm">Hello! I can help you draft this complaint faster. What seems to be the issue?</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => alert("Applying suggestion: Streetlight broken")} className="bg-surface-container/50 border border-outline-variant/30 rounded-full px-3 py-1.5 text-xs text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors">
                    &quot;Streetlight broken&quot;
                  </button>
                  <button onClick={() => alert("Applying suggestion: Garbage not collected")} className="bg-surface-container/50 border border-outline-variant/30 rounded-full px-3 py-1.5 text-xs text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors">
                    &quot;Garbage not collected&quot;
                  </button>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full p-1 border border-white shadow-inner">
                  <input className="bg-transparent border-none focus:ring-0 text-sm w-full px-4 py-2" placeholder="Type or speak..." type="text" />
                  <button onClick={() => alert("Starting voice recording...")} className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shrink-0">
                    <span className="material-symbols-outlined text-sm">mic</span>
                  </button>
                </div>
              </div>
            </div>

            {/* AI Routing Preview */}
            <div className="glass-card rounded-3xl p-6 border border-white">
              <h4 className="font-label-sm text-label-sm text-on-surface-variant mb-4 uppercase tracking-wider">AI Routing Analysis</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface">Target Department</span>
                  <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded">Municipal Corp</span>
                </div>
                <div className="h-px w-full bg-outline-variant/30"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface">Suggested Priority</span>
                  <span className="text-sm font-semibold text-secondary bg-secondary-container/30 px-2 py-1 rounded">Medium</span>
                </div>
                <div className="h-px w-full bg-outline-variant/30"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface">Confidence Score</span>
                  <span className="text-sm font-semibold text-tertiary">94%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Submit Summary */}
        <div className="animate-fade-in-up delay-300">
          <div className="glass-card rounded-2xl p-4 md:p-6 border border-white flex flex-col md:flex-row justify-between items-center gap-4 shadow-[0_20px_40px_rgba(28,27,25,0.08)] backdrop-blur-2xl bg-white/80">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0 hidden md:flex">
                <span className="material-symbols-outlined text-on-surface-variant">check_circle</span>
              </div>
              <div>
                <h4 className="font-body-md text-body-md font-semibold text-on-surface">Ready to Submit</h4>
                <p className="text-xs text-on-surface-variant">By submitting, you agree to the terms of service.</p>
              </div>
            </div>
            <button onClick={() => alert("Submitting complaint...")} className="w-full md:w-auto bg-primary text-on-primary font-label-sm text-label-sm px-8 py-4 rounded-xl hover:bg-primary-container shadow-lg shadow-primary/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
              Submit Complaint
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
