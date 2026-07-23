"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function AssistantThreeScene() {
  const threeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    const colorBlue = new THREE.Color(0x2563eb);
    const colorGold = new THREE.Color(0xb8935a);
    const colorWhite = new THREE.Color(0xffffff);

    // --- AI CORE ---
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 4);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: colorBlue,
      emissive: colorBlue,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.8,
      shininess: 100,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Core Wireframe
    const wireGeometry = new THREE.IcosahedronGeometry(1.21, 4);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: colorWhite,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
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
      const node: any = new THREE.Mesh(
        nodeGeometry,
        Math.random() > 0.8 ? nodeMaterialGold : nodeMaterialBlue
      );
      const radius = 3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

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

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(colorGold, 2, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate Core
      core.rotation.x = elapsedTime * 0.2;
      core.rotation.y = elapsedTime * 0.3;

      // Pulse nodes
      nodes.forEach((node) => {
        node.position.x =
          node.originalPos.x + Math.sin(elapsedTime * 2 + node.phase) * 0.1;
        node.position.y =
          node.originalPos.y + Math.cos(elapsedTime * 2 + node.phase) * 0.1;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={threeContainerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
