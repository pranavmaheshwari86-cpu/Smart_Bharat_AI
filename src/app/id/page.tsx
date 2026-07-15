"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function IDPage() {
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

    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(syncSize).observe(canvas);
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
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;
    vec3 color = vec3(1.0, 1.0, 0.99); // Pure White/Ivory Base
    
    float t = u_time * 0.15;
    
    // Subtle Paper Noise
    float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    color += (noise - 0.5) * 0.012;

    // Atmospheric Haze - Soft Blue Glow (Interaction/Branding)
    vec2 bluePos = vec2(0.8, 0.2) + 0.15 * vec2(sin(t), cos(t * 0.8));
    float blueGlow = smoothstep(0.9, 0.0, distance(uv, bluePos));
    color = mix(color, vec3(0.145, 0.388, 0.921), blueGlow * 0.05);
    
    // Atmospheric Haze - Soft Gold Accent (Premium Highlight)
    vec2 goldPos = vec2(0.1, 0.85) + 0.1 * vec2(cos(t * 0.7), sin(t * 0.9));
    float goldGlow = smoothstep(0.8, 0.0, distance(uv, goldPos));
    color = mix(color, vec3(0.722, 0.576, 0.353), goldGlow * 0.03);

    // Fine Technical Dotted Grid
    vec2 gridUv = fract(uv * 50.0);
    float dot = smoothstep(0.04, 0.0, length(gridUv - 0.5));
    color = mix(color, vec3(0.9, 0.89, 0.87), dot * 0.15);

    // Subtle Vignette for Depth
    float vignette = smoothstep(1.5, 0.5, distance(uv, vec2(0.5)));
    color *= 0.98 + 0.02 * vignette;

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
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    function render(t: number) {
      if (typeof ResizeObserver === "undefined") syncSize();
      gl.viewport(0, 0, canvas!.width, canvas!.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas!.width, canvas!.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }
    render(0);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ThreeJS 3D Cards removed to use uploaded photo

  return (
    <main className="pt-32 pb-24 min-h-screen relative">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 w-full h-full" style={{ display: 'block' }}>
          <canvas
            ref={shaderCanvasRef}
            style={{ display: 'block', width: '100%', height: '100%' }}
          ></canvas>
        </div>
      </div>
      
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="flex flex-col gap-lg lg:col-span-12">
          
          {/* Hero Section */}
          <section className="glass-card rounded-[24px] p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-[100%] md:max-w-[55%]">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full mb-6 border border-surface-variant">
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Government Approved API Integration</span>
              </div>
              <h1 className="font-display-lg text-display-lg text-on-surface mb-4 md:text-[56px] md:leading-[64px]">Apply for <span className="text-primary">Government IDs</span> in Minutes.</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">Experience a frictionless, AI-guided application process for Aadhaar, PAN, and Passports. Highly secure, incredibly fast.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button onClick={() => alert("Starting ID application...")} className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md flex items-center gap-2 hover:bg-primary-container transition-all shadow-level-1 w-full sm:w-auto justify-center">
                  Start Application
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-green-600">verified_user</span>
                  <span className="font-label-sm text-label-sm">256-bit Encryption Secure</span>
                </div>
              </div>
            </div>

            {/* Animated Photo Container */}
            <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 w-[60%] md:w-[55%] opacity-40 md:opacity-100 pointer-events-none z-0">
              <style dangerouslySetInnerHTML={{ __html: `
                @theme {
                  --animate-float-hero: float-hero 8s ease-in-out infinite;
                  --keyframes-float-hero: {
                    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                    "50%": { transform: "translateY(-20px) rotate(2deg)" }
                  };
                }
              `}} />
              <div className="relative w-full aspect-[16/10] animate-float-hero flex items-center justify-center">
                <img 
                  src="/hero-ids.png" 
                  alt="Government IDs" 
                  className="w-full h-full object-contain drop-shadow-2xl scale-110"
                />
              </div>
            </div>
          </section>

          {/* Horizontal Luxury Progress Timeline */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-level-1 border border-surface-container-highest">
            <div className="flex justify-between items-center relative">
              <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-surface-variant -translate-y-1/2 z-0"></div>
              
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-bold">Choose ID</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-surface-variant text-outline flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Details</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-surface-variant text-outline flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">upload_file</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Uploads</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-surface-variant text-outline flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">task_alt</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Verify</span>
              </div>
            </div>
          </div>

          <h2 className="font-headline-md text-headline-md text-on-surface mt-4">Select Document Type</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="cursor-pointer group">
              <input defaultChecked className="peer sr-only" name="id_type" type="radio" />
              <div className="bg-surface-container-lowest rounded-[16px] p-6 border border-surface-variant shadow-level-1 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary transition-all relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-4 right-4 bg-primary/10 text-primary px-2 py-1 rounded text-[10px] font-bold tracking-wider">AI RECOMMENDED</div>
                <div className="w-12 h-12 bg-surface-variant rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>fingerprint</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface text-[20px] mb-2">Aadhaar Card</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-4 flex-grow">Primary identification document containing biometric and demographic data.</p>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant border-t border-surface-variant pt-3 mt-auto">
                  <span className="material-symbols-outlined text-[16px]">timer</span>
                  <span>Est. completion: 5 mins</span>
                </div>
              </div>
            </label>

            <label className="cursor-pointer group">
              <input className="peer sr-only" name="id_type" type="radio" />
              <div className="bg-surface-container-lowest rounded-[16px] p-6 border border-surface-variant shadow-level-1 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary transition-all relative overflow-hidden h-full flex flex-col">
                <div className="w-12 h-12 bg-surface-variant rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-secondary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface text-[20px] mb-2">PAN Card</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-4 flex-grow">Essential for financial transactions and income tax filing.</p>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant border-t border-surface-variant pt-3 mt-auto">
                  <span className="material-symbols-outlined text-[16px]">timer</span>
                  <span>Est. completion: 8 mins</span>
                </div>
              </div>
            </label>

            <label className="cursor-pointer group">
              <input className="peer sr-only" name="id_type" type="radio" />
              <div className="bg-surface-container-lowest rounded-[16px] p-6 border border-surface-variant shadow-level-1 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary transition-all relative overflow-hidden h-full flex flex-col">
                <div className="w-12 h-12 bg-surface-variant rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-on-surface text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>flight_takeoff</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface text-[20px] mb-2">Passport</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-4 flex-grow">Official travel document issued by the Ministry of External Affairs.</p>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant border-t border-surface-variant pt-3 mt-auto">
                  <span className="material-symbols-outlined text-[16px]">timer</span>
                  <span>Est. completion: 15 mins</span>
                </div>
              </div>
            </label>

            <label className="cursor-pointer group">
              <input className="peer sr-only" name="id_type" type="radio" />
              <div className="bg-surface-container-lowest rounded-[16px] p-6 border border-surface-variant shadow-level-1 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary transition-all relative overflow-hidden h-full flex flex-col">
                <div className="w-12 h-12 bg-surface-variant rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-on-surface text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface text-[20px] mb-2">Driving License</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-4 flex-grow">Authorization to drive motor vehicles on public roads.</p>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant border-t border-surface-variant pt-3 mt-auto">
                  <span className="material-symbols-outlined text-[16px]">timer</span>
                  <span>Est. completion: 10 mins</span>
                </div>
              </div>
            </label>
          </div>

          <div className="bg-surface-container-lowest rounded-[20px] p-6 shadow-level-1 border border-surface-variant mt-8">
            <h4 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider mb-4 border-b border-surface-variant pb-2">Application Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex justify-between items-center md:flex-col md:items-start md:gap-1">
                    <span className="text-sm text-on-surface-variant">Selected Document</span>
                    <span className="text-sm font-semibold text-on-surface">Aadhaar Card</span>
                </div>
                <div className="flex justify-between items-center md:flex-col md:items-start md:gap-1">
                    <span className="text-sm text-on-surface-variant">Status</span>
                    <span className="text-sm font-semibold text-primary flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        In Progress
                    </span>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-on-surface-variant font-medium">Completion Score</span>
                        <span className="text-xs font-bold text-on-surface">25%</span>
                    </div>
                    <div className="w-full bg-surface-variant rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
