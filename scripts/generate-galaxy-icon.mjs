import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SIZE = 512;
const CENTER = SIZE / 2;
const PARTICLE_COUNT = 120;

const COLORS = [
  { hex: "#4F46E5", weight: 0.4 },
  { hex: "#7C3AED", weight: 0.28 },
  { hex: "#22D3EE", weight: 0.18 },
  { hex: "#E0F2FE", weight: 0.14 },
];

function pickColor() {
  const roll = Math.random();
  let cumulative = 0;
  for (const color of COLORS) {
    cumulative += color.weight;
    if (roll < cumulative) return color.hex;
  }
  return COLORS[0].hex;
}

function generateGalaxySpiral2D(count) {
  const points = [];
  const NUM_ARMS = 2;
  const ARM_SPREAD = 0.28;
  const SPIRAL_TIGHTNESS = 0.28;
  const MAX_RADIUS = 2.6;

  const coreCount = Math.floor(count * 0.18);
  const armCount = Math.floor(count * 0.68);
  const haloCount = count - coreCount - armCount;

  for (let i = 0; i < coreCount; i++) {
    const r = Math.pow(Math.random(), 0.5) * 0.45;
    const theta = Math.random() * Math.PI * 2;
    points.push({ x: r * Math.cos(theta), y: r * Math.sin(theta), r: 0.035 + Math.random() * 0.02 });
  }

  for (let i = 0; i < armCount; i++) {
    const arm = i % NUM_ARMS;
    const armOffset = (arm / NUM_ARMS) * Math.PI * 2;
    const t = Math.pow(Math.random(), 0.6);
    const theta = t * Math.PI * 4;
    const radius = Math.min(0.45 * Math.exp(SPIRAL_TIGHTNESS * theta), MAX_RADIUS);
    const spread = (Math.random() - 0.5) * ARM_SPREAD * (1 + radius * 0.4);
    const angle = theta + armOffset + spread;
    points.push({
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      r: 0.018 + Math.random() * 0.022 * (1 + radius * 0.15),
    });
  }

  for (let i = 0; i < haloCount; i++) {
    const radius = 1.8 + Math.random() * 0.9;
    const theta = Math.random() * Math.PI * 2;
    points.push({
      x: radius * Math.cos(theta) * 0.35,
      y: radius * Math.sin(theta) * 0.35,
      r: 0.012 + Math.random() * 0.012,
    });
  }

  return points;
}

const scale = 92;
const particles = generateGalaxySpiral2D(PARTICLE_COUNT);

const circles = particles
  .map((particle) => {
    const cx = CENTER + particle.x * scale;
    const cy = CENTER + particle.y * scale;
    const radius = particle.r * scale;
    const color = pickColor();
    const opacity = 0.55 + Math.random() * 0.45;
    return `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${radius.toFixed(2)}" fill="${color}" opacity="${opacity.toFixed(2)}"/>`;
  })
  .join("\n  ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" fill="none">
  <rect width="${SIZE}" height="${SIZE}" rx="96" fill="#080C14"/>
  <g filter="url(#glow)">
  ${circles}
  </g>
  <defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
</svg>
`;

writeFileSync(join(__dirname, "..", "app", "icon.svg"), svg);
console.log("Generated app/icon.svg");
