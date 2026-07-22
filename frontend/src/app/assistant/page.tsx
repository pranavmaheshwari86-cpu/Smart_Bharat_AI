"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from 'three';

export default function AssistantPage() {
  const shaderCanvasRef = useRef<HTMLCanvasElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Input focus state handling
    const input = document.querySelector('input[type="text"]');
    const container = input?.closest('.glass-input');
    
    if (input && container) {
      const handleFocus = () => container.classList.add('ring-2', 'ring-primary/30');
      const handleBlur = () => container.classList.remove('ring-2', 'ring-primary/30');
      
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
      
      return () => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      };
    }
  }, []);

  useEffect(() => {
    // WebGL Shader Background
    const canvas = shaderCanvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.clientHeight * (window.devicePixelRatio || 1);
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    const vsSource = `
      attribute vec4 aVertexPosition;
      varying vec2 v_texCoord;
      void main() {
          gl_Position = aVertexPosition;
          v_texCoord = aVertexPosition.xy * 0.5 + 0.5;
      }
    `;
    const fsSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      // Helper for noise/randomness
      float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
      }

      void main() {
          vec2 uv = v_texCoord;
          vec2 center = vec2(0.5);
          float dist = distance(uv, center);
          
          // Base radial glow (Blue #2563EB)
          vec3 blue = vec3(0.145, 0.388, 0.921);
          // Gold accent (#B8935A)
          vec3 gold = vec3(0.722, 0.576, 0.353);
          
          float glow = exp(-dist * 4.0);
          vec3 color = blue * glow * 0.15;
          
          // Add a pulsing gold core influence
          float pulse = sin(u_time * 0.8) * 0.5 + 0.5;
          float coreGlow = exp(-dist * 12.0) * pulse;
          color += gold * coreGlow * 0.1;
          
          // Subtle "reasoning" flashes
          float flash = step(0.98, hash(vec2(floor(u_time * 2.0), 0.0)));
          color += blue * flash * exp(-dist * 2.0) * 0.05;

          gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      return shader;
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) return;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0,  1.0,
       1.0,  1.0,
      -1.0, -1.0,
       1.0, -1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(vertexPosition);
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(shaderProgram, 'u_time');
    const resolutionLocation = gl.getUniformLocation(shaderProgram, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(shaderProgram, 'u_mouse');

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
    function render(time: number) {
      time *= 0.001;
      gl!.uniform1f(timeLocation, time);
      gl!.uniform2f(resolutionLocation, canvas!.width, canvas!.height);
      gl!.uniform2f(mouseLocation, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    // Three.js Scene
    const container = threeContainerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // COLORS
    const colorBlue = new THREE.Color(0x2563EB);
    const colorGold = new THREE.Color(0xB8935A);
    const colorWhite = new THREE.Color(0xFFFFFF);

    // --- AI CORE ---
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 4);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: colorBlue,
      emissive: colorBlue,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Core Wireframe
    const wireGeometry = new THREE.IcosahedronGeometry(1.21, 4);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: colorWhite,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const coreWire = new THREE.Mesh(wireGeometry, wireMaterial);
    core.add(coreWire);

    // --- NEURAL NETWORK NODES ---
    const nodeCount = 150;
    const nodes: any[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const nodeMaterialBlue = new THREE.MeshBasicMaterial({ color: colorBlue });
    const nodeMaterialGold = new THREE.MeshBasicMaterial({ color: colorGold });

    for (let i = 0; i < nodeCount; i++) {
      const node: any = new THREE.Mesh(nodeGeometry, Math.random() > 0.8 ? nodeMaterialGold : nodeMaterialBlue);
      const radius = 3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      node.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      node.originalPos = node.position.clone();
      node.phase = Math.random() * Math.PI * 2;
      scene.add(node);
      nodes.push(node);
    }

    // --- CONNECTING LINES ---
    const lineMaterial = new THREE.LineBasicMaterial({
      color: colorBlue,
      transparent: true,
      opacity: 0.1,
      vertexColors: true
    });

    const maxDistance = 2.5;
    const lines: any[] = [];

    // Create links between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].position.distanceTo(nodes[j].position);
        if (d < maxDistance && Math.random() > 0.7) {
          const geometry = new THREE.BufferGeometry().setFromPoints([nodes[i].position, nodes[j].position]);
          const line: any = new THREE.Line(geometry, lineMaterial.clone());
          line.userData = { from: i, to: j };
          scene.add(line);
          lines.push(line);
        }
      }
    }

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(colorBlue, 1.5, 15);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    let animationId: number;
    // --- ANIMATION LOOP ---
    function animate(t: number) {
      animationId = requestAnimationFrame(animate);

      const time = t * 0.001;

      // Rotate scene slightly
      scene.rotation.y = time * 0.1;
      scene.rotation.x = Math.sin(time * 0.05) * 0.1;

      // Pulse core
      const s = 1 + Math.sin(time * 2) * 0.05;
      core.scale.set(s, s, s);
      core.rotation.y += 0.005;

      // Node movement & Highlighting
      nodes.forEach((node, i) => {
        node.position.y = node.originalPos.y + Math.sin(time + node.phase) * 0.1;
        node.position.x = node.originalPos.x + Math.cos(time + node.phase) * 0.1;
      });

      // Pulse lines
      lines.forEach((line, i) => {
        // Random "reasoning" path highlight
        const pulseSpeed = 2.0;
        const pulseVal = Math.sin(time * pulseSpeed + i * 0.5);
        line.material.opacity = 0.05 + (pulseVal > 0.9 ? 0.4 : 0);
        
        // Update line positions if nodes move
        const from = nodes[line.userData.from].position;
        const to = nodes[line.userData.to].position;
        line.geometry.setFromPoints([from, to]);
      });

      renderer.render(scene, camera);
    }

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    animate(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="font-body-md text-on-surface antialiased overflow-hidden selection:bg-primary/20 selection:text-primary">
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

        .glass-panel {
            background-color: rgba(253, 248, 245, 0.7);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(195, 198, 215, 0.3);
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .glass-card {
            background-color: rgba(253, 248, 245, 0.6);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(195, 198, 215, 0.2);
            border-radius: 1rem;
            transition: all 0.3s;
        }
        .glass-card:hover {
            background-color: rgba(253, 248, 245, 0.8);
        }
        .glass-input {
            background-color: rgba(253, 248, 245, 0.8);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(195, 198, 215, 0.4);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border-radius: 9999px;
            transition: all 0.3s;
        }
        .glass-input:focus-within {
            box-shadow: 0 0 0 2px rgba(0, 74, 198, 0.3);
        }

        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background-color: rgba(195, 198, 215, 0.5);
            border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: rgba(115, 118, 134, 0.5);
        }
      `}} />
      
      {/* Global Background Shader */}
      <div className="fixed inset-0 z-[-2] bg-[#fdf8f5]"></div>
      
      {/* Ambient CSS Glows */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>
      
      <div className="flex h-screen w-full relative">
        {/* Sidebar (Smart Context) */}
        <aside className="hidden md:flex flex-col w-[390px] h-full bg-surface/50 backdrop-blur-2xl border-r border-outline-variant/30 flex-shrink-0 z-20">
          {/* Sidebar Header */}
          <div className="p-6 pb-4 flex items-center justify-between border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              </div>
              <div>
                <h2 className="font-headline-md text-[18px] text-on-surface leading-tight">Bharat AI</h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Enterprise Core</p>
              </div>
            </div>
            <button onClick={() => alert("Editing context...")} className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">edit_square</span>
            </button>
          </div>
          
          {/* Sidebar Navigation/History */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
            {/* Main Nav */}
            <nav className="space-y-1">
              <Link className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary-container text-on-secondary-container font-body-md text-body-md font-medium transition-all group" href="#">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>clinical_notes</span>
                Workspace
              </Link>
              <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high font-body-md text-body-md transition-all group" href="#">
                <span className="material-symbols-outlined">monitoring</span>
                Analytics
              </Link>
              <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high font-body-md text-body-md transition-all group" href="#">
                <span className="material-symbols-outlined">psychology</span>
                Intelligence
              </Link>
              <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high font-body-md text-body-md transition-all group" href="#">
                <span className="material-symbols-outlined">database</span>
                Archives
              </Link>
            </nav>
            
            {/* Recent Contexts */}
            <div>
              <h3 className="px-4 font-label-sm text-label-sm text-tertiary uppercase tracking-widest mb-3">Recent Contexts</h3>
              <div className="space-y-1">
                <button onClick={() => alert("Loading context: PM-Kisan Eligibility Check")} className="w-full text-left flex items-start gap-3 px-4 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors group">
                  <span className="material-symbols-outlined text-[18px] text-outline mt-0.5 group-hover:text-primary transition-colors">chat_bubble</span>
                  <div>
                    <p className="font-body-md text-[14px] text-on-surface line-clamp-1">PM-Kisan Eligibility Check</p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">2 hours ago</p>
                  </div>
                </button>
                <button onClick={() => alert("Loading context: Aadhaar Address Update Process")} className="w-full text-left flex items-start gap-3 px-4 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors group">
                  <span className="material-symbols-outlined text-[18px] text-outline mt-0.5 group-hover:text-primary transition-colors">chat_bubble</span>
                  <div>
                    <p className="font-body-md text-[14px] text-on-surface line-clamp-1">Aadhaar Address Update Process</p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">Yesterday</p>
                  </div>
                </button>
                <button onClick={() => alert("Loading context: Ayushman Bharat Healthcare Benefits Overview")} className="w-full text-left flex items-start gap-3 px-4 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors group">
                  <span className="material-symbols-outlined text-[18px] text-outline mt-0.5 group-hover:text-primary transition-colors">chat_bubble</span>
                  <div>
                    <p className="font-body-md text-[14px] text-on-surface line-clamp-1">Ayushman Bharat Healthcare Benefits Overview</p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">Last week</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          {/* User Profile Area */}
          <div className="p-4 border-t border-outline-variant/20">
            <button onClick={() => alert("Opening profile settings...")} className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container transition-colors">
              <img className="w-10 h-10 rounded-full object-cover border border-outline-variant/30" alt="Rajesh Kumar Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVzDw4lMPV5BICoU6B7r4TyeNw9m5VL0voMFVNuWc7zJ4MorqTfGla2uuXv50bAwnHc850ed_L0IdM26f7HqrCxp6od4978oU0wpEeJTNAOLlaeNHFXD_12-nAqVTP-NSD3Vx8CmsApuMuB4OMVimLXk2r8iC6fJJnX3LL8v4dFY-AEEBOBxThdDxsYYNovYqOAR9By0E6fYIFl3xbiCOkqWWEYoTtgHTextqEg7riu2isGed6TJ7-Kw" />
              <div className="text-left flex-1">
                <p className="font-body-md text-[14px] font-medium text-on-surface">Rajesh Kumar</p>
                <p className="font-label-sm text-[12px] text-on-surface-variant">Citizen Profile</p>
              </div>
              <span className="material-symbols-outlined text-outline">settings</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative h-full">
          {/* Floating TopNavBar */}
          <header className="absolute top-0 left-0 w-full z-30 px-6 py-4 flex justify-between items-center bg-surface/40 backdrop-blur-md border-b border-outline-variant/10">
            <div className="flex items-center gap-4">
              <button onClick={() => alert("Opening mobile menu...")} className="md:hidden p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h1 className="font-headline-md text-[20px] font-medium text-on-surface">Smart Bharat AI</h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => alert("Opening history...")} className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all duration-200">
                <span className="material-symbols-outlined">history</span>
              </button>
              <button onClick={() => alert("Opening settings...")} className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all duration-200">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
          </header>

          {/* Scrollable Canvas */}
          <div className="flex-1 overflow-y-auto pt-24 pb-40 px-4 md:px-8 flex flex-col items-center">
            <div className="w-full max-w-[768px] mx-auto flex flex-col gap-16">
              {/* Hero Section */}
              <section className="flex flex-col md:flex-row items-center justify-between gap-8 mt-8 md:mt-16">
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/30 w-fit mx-auto md:mx-0">
                    <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Official Government Assistant</span>
                  </div>
                  <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
                    Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-bold">Intelligence</span><br/>Core
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[500px] mx-auto md:mx-0">
                    How can I help you navigate government services, understand documents, or access benefits today?
                  </p>
                </div>

                {/* Network Visualization Container */}
                <div className="w-64 h-64 md:w-80 md:h-80 relative flex-shrink-0" style={{ perspective: '1000px' }}>
                  {/* Shader Background */}
                  <canvas ref={shaderCanvasRef} className="absolute inset-0 w-full h-full rounded-full mix-blend-multiply opacity-80"></canvas>
                  
                  {/* ThreeJS Overlay */}
                  <div ref={threeContainerRef} className="absolute inset-0 w-full h-full drop-shadow-2xl"></div>
                  
                  {/* Floating Service Cards */}
                  <div className="absolute -top-4 -left-8 animate-float-1 z-20">
                    <div className="glass-panel rounded-lg p-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-primary">fingerprint</span>
                      <span className="font-label-sm text-[12px] whitespace-nowrap">Aadhaar</span>
                    </div>
                  </div>
                  <div className="absolute top-12 -right-12 animate-float-2 z-20">
                    <div className="glass-panel rounded-lg p-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-secondary">flight</span>
                      <span className="font-label-sm text-[12px] whitespace-nowrap">Passport</span>
                    </div>
                  </div>
                  <div className="absolute bottom-16 -left-12 animate-float-3 z-0 scale-90">
                    <div className="glass-panel rounded-lg p-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-tertiary">credit_card</span>
                      <span className="font-label-sm text-[12px] whitespace-nowrap">PAN</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 right-0 animate-float-4 z-20">
                    <div className="glass-panel rounded-lg p-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-primary">cloud_done</span>
                      <span className="font-label-sm text-[12px] whitespace-nowrap">DigiLocker</span>
                    </div>
                  </div>
                  <div className="absolute -top-6 right-16 animate-float-5 z-0 scale-75 opacity-80">
                    <div className="glass-panel rounded-lg p-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-secondary">agriculture</span>
                      <span className="font-label-sm text-[12px] whitespace-nowrap">PM-Kisan</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 -right-8 animate-float-6 z-20">
                    <div className="glass-panel rounded-lg p-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-tertiary">health_and_safety</span>
                      <span className="font-label-sm text-[12px] whitespace-nowrap">Ayushman</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Suggested Actions Grid */}
              <section className="w-full">
                <h3 className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest mb-4 px-2">Suggested Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1 */}
                  <button onClick={() => alert("Finding schemes...")} className="glass-card p-5 text-left group flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center shadow-sm relative z-10">
                      <span className="material-symbols-outlined text-[24px] text-primary">account_balance</span>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-body-lg text-[16px] font-medium text-on-surface mb-1 group-hover:text-primary transition-colors">Find Schemes</h4>
                      <p className="font-body-md text-[14px] text-on-surface-variant">Discover eligibility for state &amp; central programs.</p>
                    </div>
                  </button>
                  {/* Card 2 */}
                  <button onClick={() => alert("Opening document explainer...")} className="glass-card p-5 text-left group flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center shadow-sm relative z-10">
                      <span className="material-symbols-outlined text-[24px] text-secondary">description</span>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-body-lg text-[16px] font-medium text-on-surface mb-1 group-hover:text-secondary transition-colors">Explain Document</h4>
                      <p className="font-body-md text-[14px] text-on-surface-variant">Upload official forms for simple explanations.</p>
                    </div>
                  </button>
                  {/* Card 3 */}
                  <button onClick={() => alert("Opening healthcare navigator...")} className="glass-card p-5 text-left group flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center shadow-sm relative z-10">
                      <span className="material-symbols-outlined text-[24px] text-tertiary">local_hospital</span>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-body-lg text-[16px] font-medium text-on-surface mb-1 group-hover:text-tertiary transition-colors">Healthcare Nav</h4>
                      <p className="font-body-md text-[14px] text-on-surface-variant">Locate AB-PMJAY empaneled hospitals near you.</p>
                    </div>
                  </button>
                </div>
              </section>
            </div>
          </div>

          {/* Fixed Bottom Composer */}
          <div className="absolute bottom-0 left-0 w-full px-4 md:px-8 pb-8 pt-12 bg-gradient-to-t from-surface via-surface/80 to-transparent z-40 flex justify-center pointer-events-none">
            <div className="w-full max-w-[768px] relative pointer-events-auto">
              {/* Input Container */}
              <div className="glass-input p-2 pl-6 pr-2 flex items-center gap-3 relative z-10">
                <input className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-body-md text-body-md placeholder:text-outline py-3 outline-none" placeholder="Ask about schemes, upload documents, or request guidance..." type="text"/>
                <div className="flex items-center gap-1">
                  <button onClick={() => alert("Attaching file...")} className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Attach file">
                    <span className="material-symbols-outlined text-[22px]">attach_file</span>
                  </button>
                  <button onClick={() => alert("Starting voice input...")} className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Voice input">
                    <span className="material-symbols-outlined text-[22px]">mic</span>
                  </button>
                  <button onClick={() => alert("Sending message...")} className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm ml-1" title="Send message">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                  </button>
                </div>
              </div>
              
              {/* Footer Info */}
              <div className="text-center mt-3">
                <p className="font-label-sm text-[11px] text-outline">Smart Bharat AI may display inaccurate info. Always verify official government sources.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
