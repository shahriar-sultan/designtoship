"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  getShapeNames,
  INITIAL_SHAPE,
  SHAPE_GENERATORS,
} from "./shapeGenerators";

const LERP_FACTOR = 0.028;

function scheduleIdleWork(work: () => void): () => void {
  if (typeof requestIdleCallback !== "undefined") {
    const id = requestIdleCallback(work, { timeout: 400 });
    return () => cancelIdleCallback(id);
  }

  const id = window.setTimeout(work, 50);
  return () => window.clearTimeout(id);
}

export function ParticleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile =
      /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    const isLowEnd =
      navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency <= 4;

    const PARTICLE_COUNT = isMobile ? 18000 : isLowEnd ? 28000 : 60000;
    const PARTICLE_SIZE = isMobile ? 0.012 : 0.007;

    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.PointsMaterial | null = null;
    let mesh: THREE.Points | null = null;
    let animationId = 0;
    let isReady = false;
    const cancelIdleTasks: Array<() => void> = [];

    const shapes: Record<string, Float32Array> = {
      [INITIAL_SHAPE]: SHAPE_GENERATORS[INITIAL_SHAPE](PARTICLE_COUNT),
    };

    const shapeQueue = getShapeNames().filter((name) => name !== INITIAL_SHAPE);
    let queueIndex = 0;

    const generateNext = () => {
      if (queueIndex >= shapeQueue.length) return;
      const key = shapeQueue[queueIndex++];
      try {
        shapes[key] = SHAPE_GENERATORS[key](PARTICLE_COUNT);
      } catch (error) {
        console.error(`ParticleCanvas: failed to build shape "${key}"`, error);
      }
      cancelIdleTasks.push(scheduleIdleWork(generateNext));
    };

    cancelIdleTasks.push(scheduleIdleWork(generateNext));

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        100,
      );
      camera.position.z = 4.5;

      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5),
      );
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      const canvas = renderer.domElement;
      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.pointerEvents = "none";
      container.appendChild(canvas);

      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const initialShape = shapes[INITIAL_SHAPE];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = initialShape[i * 3];
        positions[i * 3 + 1] = initialShape[i * 3 + 1];
        positions[i * 3 + 2] = initialShape[i * 3 + 2];
      }

      const colorIndigo = new THREE.Color("#4F46E5");
      const colorViolet = new THREE.Color("#7C3AED");
      const colorCyan = new THREE.Color("#22D3EE");
      const colorNearWhite = new THREE.Color("#E0F2FE");

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const roll = Math.random();
        const c =
          roll < 0.4
            ? colorIndigo
            : roll < 0.68
              ? colorViolet
              : roll < 0.86
                ? colorCyan
                : colorNearWhite;
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      material = new THREE.PointsMaterial({
        size: PARTICLE_SIZE,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
        sizeAttenuation: true,
      });

      mesh = new THREE.Points(geometry, material);
      scene.add(mesh);

      let activeShape = INITIAL_SHAPE;
      const clock = new THREE.Clock();
      const visibilityMap = new Map<Element, number>();

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibilityMap.set(entry.target, entry.intersectionRatio);
          });

          let bestEl: Element | null = null;
          let bestRatio = 0;

          for (const [el, ratio] of visibilityMap.entries()) {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestEl = el;
            }
          }

          if (bestEl !== null && bestRatio >= 0.3) {
            const shape = bestEl.getAttribute("data-particle-shape");
            if (shape) activeShape = shape;
          }
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
      );

      const observeElements = () => {
        document
          .querySelectorAll("[data-particle-shape]")
          .forEach((el) => observer.observe(el));
      };

      observeElements();
      const mutationObserver = new MutationObserver(observeElements);
      mutationObserver.observe(document.body, { childList: true, subtree: true });

      const handleResize = () => {
        if (!renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        if (!isReady || !renderer || !geometry || !material || !mesh) return;

        const time = clock.getElapsedTime();

        mesh.rotation.y += 0.0006;
        mesh.rotation.x += 0.00015;

        if (activeShape === "galaxy-spiral") {
          mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, 0.42, 0.015);
        } else if (activeShape === "milky-way") {
          mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, 0.42, 0.015);
          mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, 0.45, 0.02);
        } else if (activeShape === "dna-helix") {
          mesh.rotation.y += 0.0008;
          mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, 0, 0.008);
          mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, 0, 0.008);
        } else {
          mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, 0, 0.008);
          mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, 0, 0.008);
        }

        const target =
          shapes[activeShape] ?? shapes[INITIAL_SHAPE] ?? shapes["stellar-nebula"];
        if (target) {
          const current = geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
            current[i] += (target[i] - current[i]) * LERP_FACTOR;
          }
          geometry.attributes.position.needsUpdate = true;
        }

        material.opacity = 0.72 + Math.sin(time * 0.4) * 0.04;

        renderer.render(scene, camera);
      };

      isReady = true;
      animate();

      return () => {
        isReady = false;
        cancelAnimationFrame(animationId);
        cancelIdleTasks.forEach((cancel) => cancel());
        observer.disconnect();
        mutationObserver.disconnect();
        window.removeEventListener("resize", handleResize);
        geometry?.dispose();
        material?.dispose();
        renderer?.dispose();
        if (renderer?.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch (error) {
      console.error("ParticleCanvas WebGL init failed:", error);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
}
