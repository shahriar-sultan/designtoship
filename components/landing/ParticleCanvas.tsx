"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildShape, getShapeNames } from "./shapeGenerators";

const DESKTOP_COUNT = 8000;
const MOBILE_COUNT = 3000;
const INITIAL_SHAPE = "scattered-cloud";
const LERP_FACTOR = 0.04;
const OFFSET_LERP = 0.05;

type ParticleSide = "left" | "center" | "right";
type ShapeName = string;

const SIDE_OFFSET: Record<ParticleSide, number> = {
  left: -2.5,
  center: 0,
  right: 2.5,
};

const ANIMATED_SHAPES = new Set([
  "burst",
  "timeline-dots",
  "ripple-rings",
  "rising-diagonal",
  "heartbeat",
  "dispersing-pulse",
]);

function scheduleIdleWork(work: () => void): () => void {
  if (typeof requestIdleCallback !== "undefined") {
    const id = requestIdleCallback(work, { timeout: 500 });
    return () => cancelIdleCallback(id);
  }

  const id = window.setTimeout(work, 100);
  return () => window.clearTimeout(id);
}

function applyAnimatedShape(
  shape: ShapeName,
  targets: THREE.Vector3[],
  baseTargets: THREE.Vector3[],
  elapsed: number,
  burstDirections: Float32Array,
  ringMeta: { ring: number; angle: number }[],
): void {
  if (shape === "burst") {
    const progress = (elapsed % 3.0) / 3.0;
    for (let i = 0; i < targets.length; i++) {
      const scale = progress * 2.0;
      targets[i].set(
        burstDirections[i * 3] * scale,
        burstDirections[i * 3 + 1] * scale,
        burstDirections[i * 3 + 2] * scale * 0.25,
      );
    }
    return;
  }

  if (shape === "timeline-dots") {
    const pulseIndex = Math.floor((elapsed * 2) % 13);
    const perNode = Math.floor(targets.length / 13);
    for (let i = 0; i < targets.length; i++) {
      targets[i].copy(baseTargets[i]);
      const nodeIndex = Math.min(12, Math.floor(i / Math.max(1, perNode)));
      if (nodeIndex === pulseIndex) {
        const pulse = 0.5 + Math.sin(elapsed * 8) * 0.5;
        targets[i].multiplyScalar(1 + pulse * 0.35);
      }
    }
    return;
  }

  if (shape === "ripple-rings") {
    const progresses = [
      (elapsed % 2.0) / 2.0,
      ((elapsed + 0.67) % 2.0) / 2.0,
      ((elapsed + 1.33) % 2.0) / 2.0,
    ];
    for (let i = 0; i < targets.length; i++) {
      const meta = ringMeta[i] ?? { ring: i % 3, angle: (i / targets.length) * Math.PI * 2 };
      const progress = progresses[meta.ring];
      const radius = 0.2 + progress * 1.8;
      const fade = Math.max(0, 1 - progress);
      targets[i].set(
        Math.cos(meta.angle) * radius * fade,
        Math.sin(meta.angle) * radius * fade,
        0,
      );
    }
    return;
  }

  if (shape === "rising-diagonal") {
    const travel = (elapsed * 0.4) % 1;
    for (let i = 0; i < targets.length; i++) {
      const t = ((i / targets.length) + travel) % 1;
      const brightness = 1 - Math.abs(t - 0.5) * 2;
      targets[i].set(-1.6 + t * 3.2, -1.0 + t * 2.0, brightness * 0.1);
    }
    return;
  }

  if (shape === "heartbeat") {
    const scale = 1.0 + 0.4 * Math.sin(elapsed * 2.0);
    for (let i = 0; i < targets.length; i++) {
      const base = baseTargets[i];
      targets[i].set(base.x * scale, base.y * scale, base.z);
    }
    return;
  }

  if (shape === "dispersing-pulse") {
    const wave = Math.sin(elapsed * 0.8) * 0.5 + 0.5;
    for (let i = 0; i < targets.length; i++) {
      const base = baseTargets[i];
      const angle = Math.atan2(base.y, base.x);
      const r = Math.sqrt(base.x * base.x + base.y * base.y);
      const newR = Math.min(1.5, r + wave * 0.15);
      targets[i].set(Math.cos(angle) * newR, Math.sin(angle) * newR, base.z);
    }
    return;
  }

  for (let i = 0; i < targets.length; i++) {
    targets[i].copy(baseTargets[i]);
  }
}

function transformPosition(
  vec: THREE.Vector3,
  isMobile: boolean,
  mobileYOffset: number,
  mobileScale: number,
): void {
  if (!isMobile) return;
  vec.multiplyScalar(mobileScale);
  vec.y += mobileYOffset;
}

export function ParticleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      console.error("ParticleCanvas: container ref not available");
      return;
    }

    console.log("ParticleCanvas mounted");
    console.log(
      "WebGL supported:",
      !!document.createElement("canvas").getContext("webgl2"),
    );

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;
    console.log("Particle count:", particleCount);

    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.PointsMaterial | null = null;
    let animationId = 0;
    let isReady = false;
    const cancelIdleTasks: Array<() => void> = [];

    const shapeTargets: Record<string, THREE.Vector3[]> = {};
    const animatedTargets: Record<string, THREE.Vector3[]> = {};

    const registerShape = (name: string) => {
      const data = buildShape(name, particleCount);
      shapeTargets[name] = data.positions.map((v) => v.clone());
      animatedTargets[name] = shapeTargets[name].map((v) => v.clone());
    };

    try {
      registerShape(INITIAL_SHAPE);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const pendingShapes = getShapeNames().filter((name) => name !== INITIAL_SHAPE);
      let pendingIndex = 0;

      const loadNextShape = () => {
        if (pendingIndex >= pendingShapes.length) return;

        const name = pendingShapes[pendingIndex++];
        try {
          registerShape(name);
        } catch (error) {
          console.error(`ParticleCanvas: failed to build shape "${name}"`, error);
        }

        cancelIdleTasks.push(scheduleIdleWork(loadNextShape));
      };

      cancelIdleTasks.push(scheduleIdleWork(loadNextShape));

      const burstDirections = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        burstDirections[i * 3] = Math.sin(phi) * Math.cos(theta);
        burstDirections[i * 3 + 1] = Math.sin(phi) * Math.sin(theta);
        burstDirections[i * 3 + 2] = Math.cos(phi);
      }

      const perRing = Math.floor(particleCount / 3);
      const ringMeta = Array.from({ length: particleCount }, (_, i) => ({
        ring: Math.floor(i / Math.max(1, perRing)) % 3,
        angle: ((i % Math.max(1, perRing)) / Math.max(1, perRing)) * Math.PI * 2,
      }));

      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const currentPositions = shapeTargets[INITIAL_SHAPE].map((v) => v.clone());

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = currentPositions[i].x;
        positions[i * 3 + 1] = currentPositions[i].y;
        positions[i * 3 + 2] = currentPositions[i].z;
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const colorIndigo = new THREE.Color("#4F46E5");
      const colorPurple = new THREE.Color("#A855F7");
      const colorCyan = new THREE.Color("#22D3EE");

      for (let i = 0; i < particleCount; i++) {
        const roll = Math.random();
        const c = roll < 0.6 ? colorIndigo : roll < 0.9 ? colorPurple : colorCyan;
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      geometry.attributes.color.needsUpdate = true;

      material = new THREE.PointsMaterial({
        size: 0.012,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        sizeAttenuation: true,
      });

      scene.add(new THREE.Points(geometry, material));

      let activeShape: ShapeName = INITIAL_SHAPE;
      let activeSide: ParticleSide = "center";
      let isActiveHero = true;
      let isActiveInterstitial = false;
      let currentOffset = 0;
      let targetOffset = 0;
      let animTime = 0;
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
            const side = bestEl.getAttribute("data-particle-side") as ParticleSide | null;
            if (shape) activeShape = shape;
            if (side && side in SIDE_OFFSET) activeSide = side;
            isActiveHero = shape === INITIAL_SHAPE;
            isActiveInterstitial = bestEl.getAttribute("data-interstitial") === "true";
          }
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
      );

      const observeElements = () => {
        document.querySelectorAll("[data-particle-shape]").forEach((el) => observer.observe(el));
      };

      observeElements();
      const mutationObserver = new MutationObserver(observeElements);
      mutationObserver.observe(document.body, { childList: true, subtree: true });

      const handleResize = () => {
        if (!renderer) return;
        isMobile = window.innerWidth < 768;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      const targetVec = new THREE.Vector3();

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        if (!isReady || !renderer || !geometry || !material) return;

        animTime += reducedMotion ? 0 : 16;
        const elapsed = clock.getElapsedTime();

        const effectiveShape =
          isMobile && isActiveInterstitial ? INITIAL_SHAPE : activeShape;

        if (isMobile || isActiveHero) {
          targetOffset = 0;
        } else {
          targetOffset = SIDE_OFFSET[activeSide];
        }
        currentOffset += (targetOffset - currentOffset) * OFFSET_LERP;

        const fallbackTargets = shapeTargets[INITIAL_SHAPE];
        const baseTargets = shapeTargets[effectiveShape] ?? fallbackTargets;
        const animTargetList = animatedTargets[effectiveShape] ?? animatedTargets[INITIAL_SHAPE];

        if (!baseTargets || !animTargetList) return;

        if (!reducedMotion && ANIMATED_SHAPES.has(effectiveShape)) {
          applyAnimatedShape(
            effectiveShape,
            animTargetList,
            baseTargets,
            elapsed,
            burstDirections,
            ringMeta,
          );
        } else {
          for (let i = 0; i < particleCount; i++) {
            animTargetList[i].copy(baseTargets[i]);
          }
        }

        if (effectiveShape === "dispersing-pulse") {
          material.opacity = 0.15;
        } else if (activeShape === "galaxy" && isActiveInterstitial) {
          material.opacity = 0.85;
        } else if (activeShape === "galaxy") {
          material.opacity = 0.45;
        } else if (isActiveInterstitial) {
          material.opacity = 0.5;
        } else if (isActiveHero) {
          material.opacity = 0.75;
        } else {
          material.opacity = 0.35;
        }

        const positionAttr = geometry.attributes.position as THREE.BufferAttribute;

        for (let i = 0; i < particleCount; i++) {
          targetVec.copy(animTargetList[i]);
          transformPosition(targetVec, isMobile, 1.5, 0.4);
          targetVec.x += currentOffset;

          if (
            (effectiveShape === INITIAL_SHAPE || effectiveShape === "galaxy") &&
            !reducedMotion
          ) {
            const drift = Math.sin(animTime * 0.001 + i * 0.01) * 0.02;
            targetVec.x += drift;
            targetVec.y += drift * 0.5;
          }

          currentPositions[i].lerp(targetVec, reducedMotion ? 0.02 : LERP_FACTOR);
          positionAttr.setXYZ(
            i,
            currentPositions[i].x,
            currentPositions[i].y,
            currentPositions[i].z,
          );
        }

        positionAttr.needsUpdate = true;
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
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
