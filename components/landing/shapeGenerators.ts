const JITTER = 0.018;

function finalize(pos: Float32Array, count: number, shapeName: string): Float32Array {
  for (let i = 0; i < count; i++) {
    pos[i * 3] += (Math.random() - 0.5) * JITTER;
    pos[i * 3 + 1] += (Math.random() - 0.5) * JITTER;
    pos[i * 3 + 2] += (Math.random() - 0.5) * JITTER;
  }
  console.assert(
    !Array.from(pos).some((v) => Number.isNaN(v)),
    `NaN in shape: ${shapeName}`,
  );
  return pos;
}

export function generateStellarNebula(count: number): Float32Array {
  function noise3D(x: number, y: number, z: number): number {
    return (
      Math.sin(x * 1.7 + y * 0.9) * Math.cos(z * 1.3) * 0.5 +
      Math.sin(x * 3.1 + z * 2.2) * Math.cos(y * 2.8) * 0.3 +
      Math.sin(y * 4.3 + z * 1.1) * Math.cos(x * 3.7) * 0.15 +
      Math.sin(x * 7.1 + y * 5.3 + z * 4.9) * 0.05
    );
  }

  const pos = new Float32Array(count * 3);
  let placed = 0;
  let attempts = 0;
  const maxAttempts = count * 20;

  while (placed < count && attempts < maxAttempts) {
    attempts++;
    const r = Math.cbrt(Math.random()) * 2.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.65;
    const z = r * Math.cos(phi);

    const n = noise3D(x * 0.8, y * 0.8, z * 0.8);
    const density = (n + 1) / 2;
    const centerBias = Math.exp(-r * r * 0.15);
    const acceptance = density * 0.7 + centerBias * 0.3;

    if (Math.random() < acceptance) {
      pos[placed * 3] = x;
      pos[placed * 3 + 1] = y;
      pos[placed * 3 + 2] = z;
      placed++;
    }
  }

  while (placed < count) {
    pos[placed * 3] = (Math.random() - 0.5) * 0.5;
    pos[placed * 3 + 1] = (Math.random() - 0.5) * 0.5;
    pos[placed * 3 + 2] = (Math.random() - 0.5) * 0.5;
    placed++;
  }

  return finalize(pos, count, "stellar-nebula");
}

export function generateSphere(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  const outerCount = Math.floor(count * 0.75);
  const innerCount = count - outerCount;

  for (let i = 0; i < outerCount; i++) {
    const R = 2.4;
    const y = outerCount > 1 ? 1 - (i / (outerCount - 1)) * 2 : 0;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = goldenAngle * i;

    pos[i * 3] = R * r * Math.cos(phi);
    pos[i * 3 + 1] = R * y;
    pos[i * 3 + 2] = R * r * Math.sin(phi);
  }

  for (let i = 0; i < innerCount; i++) {
    const R = 1.4;
    const idx = outerCount + i;
    const y = innerCount > 1 ? 1 - (i / (innerCount - 1)) * 2 : 0;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = goldenAngle * i * 1.618;

    pos[idx * 3] = R * r * Math.cos(phi);
    pos[idx * 3 + 1] = R * y;
    pos[idx * 3 + 2] = R * r * Math.sin(phi);
  }

  return finalize(pos, count, "sphere");
}

export function generateTorus(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const R = 1.9;
  const r = 0.72;

  for (let i = 0; i < count; i++) {
    let u = 0;
    let v = 0;
    while (true) {
      u = Math.random() * Math.PI * 2;
      v = Math.random() * Math.PI * 2;
      if (Math.random() < (R + r * Math.cos(v)) / (R + r)) break;
    }

    pos[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
    pos[i * 3 + 1] = r * Math.sin(v);
    pos[i * 3 + 2] = (R + r * Math.cos(v)) * Math.sin(u);
  }

  return finalize(pos, count, "torus");
}

export function generateGalaxySpiral(count: number): Float32Array {
  const pos = new Float32Array(count * 3);

  const NUM_ARMS = 2;
  const ARM_SPREAD = 0.28;
  const SPIRAL_TIGHTNESS = 0.28;
  const MAX_RADIUS = 2.6;
  const DISC_HEIGHT = 0.045;

  const coreCount = Math.floor(count * 0.18);
  const armCount = Math.floor(count * 0.68);
  const haloCount = count - coreCount - armCount;

  for (let i = 0; i < coreCount; i++) {
    const r = Math.pow(Math.random(), 0.5) * 0.45;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
    pos[i * 3 + 2] = r * Math.cos(phi);
  }

  for (let i = 0; i < armCount; i++) {
    const idx = coreCount + i;
    const arm = i % NUM_ARMS;
    const armOffset = (arm / NUM_ARMS) * Math.PI * 2;

    const t = Math.pow(Math.random(), 0.6);
    const theta = t * Math.PI * 4;
    const r = 0.45 * Math.exp(SPIRAL_TIGHTNESS * theta);
    const rClamped = Math.min(r, MAX_RADIUS);
    const spread = (Math.random() - 0.5) * ARM_SPREAD * (1 + rClamped * 0.4);
    const angle = theta + armOffset + spread;

    pos[idx * 3] = rClamped * Math.cos(angle);
    pos[idx * 3 + 1] = (Math.random() - 0.5) * DISC_HEIGHT * (1 + rClamped * 0.3);
    pos[idx * 3 + 2] = rClamped * Math.sin(angle);
  }

  for (let i = 0; i < haloCount; i++) {
    const idx = coreCount + armCount + i;
    const r = 1.8 + Math.random() * 0.9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[idx * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[idx * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.15;
    pos[idx * 3 + 2] = r * Math.cos(phi);
  }

  return finalize(pos, count, "galaxy-spiral");
}

export function generateDNAHelix(count: number): Float32Array {
  const pos = new Float32Array(count * 3);

  const HELIX_RADIUS = 0.72;
  const HELIX_HEIGHT = 5.0;
  const TURNS = 4.5;
  const RUNG_COUNT = 28;

  const strandCount = Math.floor(count * 0.38);
  const rungCount = count - strandCount * 2;

  for (let i = 0; i < strandCount; i++) {
    const t = i / strandCount;
    const angle = t * TURNS * Math.PI * 2;
    const y = (t - 0.5) * HELIX_HEIGHT;

    pos[i * 3] = HELIX_RADIUS * Math.cos(angle);
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = HELIX_RADIUS * Math.sin(angle);
  }

  for (let i = 0; i < strandCount; i++) {
    const idx = strandCount + i;
    const t = i / strandCount;
    const angle = t * TURNS * Math.PI * 2 + Math.PI;
    const y = (t - 0.5) * HELIX_HEIGHT;

    pos[idx * 3] = HELIX_RADIUS * Math.cos(angle);
    pos[idx * 3 + 1] = y;
    pos[idx * 3 + 2] = HELIX_RADIUS * Math.sin(angle);
  }

  const particlesPerRung = Math.floor(rungCount / RUNG_COUNT);
  for (let r = 0; r < RUNG_COUNT; r++) {
    const t = r / RUNG_COUNT;
    const angle = t * TURNS * Math.PI * 2;
    const y = (t - 0.5) * HELIX_HEIGHT;

    const x1 = HELIX_RADIUS * Math.cos(angle);
    const z1 = HELIX_RADIUS * Math.sin(angle);
    const x2 = -x1;
    const z2 = -z1;

    for (let p = 0; p < particlesPerRung; p++) {
      const idx = strandCount * 2 + r * particlesPerRung + p;
      if (idx >= count) break;
      const lerp = p / particlesPerRung;
      pos[idx * 3] = x1 + (x2 - x1) * lerp;
      pos[idx * 3 + 1] = y;
      pos[idx * 3 + 2] = z1 + (z2 - z1) * lerp;
    }
  }

  return finalize(pos, count, "dna-helix");
}

export function generateMilkyWay(count: number): Float32Array {
  const pos = new Float32Array(count * 3);

  const discCount = Math.floor(count * 0.62);
  const bulgeCount = Math.floor(count * 0.24);
  const haloCount = count - discCount - bulgeCount;

  for (let i = 0; i < discCount; i++) {
    const h_r = 1.2;
    const h_z = 0.038;
    const r = -h_r * Math.log(Math.max(1e-10, Math.random()));
    const clampedR = Math.min(r, 2.8);
    const theta = Math.random() * Math.PI * 2;
    const z =
      -h_z * Math.log(Math.max(1e-10, Math.random())) * (Math.random() < 0.5 ? 1 : -1);

    const armPhase = (Math.log(clampedR + 0.1) / 0.28 + theta) % (Math.PI * 2);
    const armStrength = Math.exp(-Math.pow(Math.sin(armPhase), 2) * 3) * 0.6 + 0.4;

    if (Math.random() < armStrength) {
      pos[i * 3] = clampedR * Math.cos(theta);
      pos[i * 3 + 1] = z;
      pos[i * 3 + 2] = clampedR * Math.sin(theta);
    } else {
      pos[i * 3] = clampedR * Math.cos(theta) + (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 1] = z * 2;
      pos[i * 3 + 2] = clampedR * Math.sin(theta) + (Math.random() - 0.5) * 0.3;
    }
  }

  for (let i = 0; i < bulgeCount; i++) {
    const idx = discCount + i;
    const r_e = 0.28;
    const u = Math.random();
    const r = r_e * Math.pow(-Math.log(u + 1e-10) / 7.67 + 1, 4);
    const clampedR = Math.min(r, 0.65);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    pos[idx * 3] = clampedR * Math.sin(phi) * Math.cos(theta);
    pos[idx * 3 + 1] = clampedR * Math.sin(phi) * Math.sin(theta) * 0.7;
    pos[idx * 3 + 2] = clampedR * Math.cos(phi);
  }

  for (let i = 0; i < haloCount; i++) {
    const idx = discCount + bulgeCount + i;
    const r = Math.pow(Math.random(), 0.4) * 3.2 + 0.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[idx * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[idx * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.08;
    pos[idx * 3 + 2] = r * Math.cos(phi);
  }

  return finalize(pos, count, "milky-way");
}

export function generateMobiusStrip(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const WIDTH = 1.1;
  const R = 1.8;

  for (let i = 0; i < count; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = (Math.random() - 0.5) * WIDTH;

    pos[i * 3] = (R + v * Math.cos(u / 2)) * Math.cos(u);
    pos[i * 3 + 1] = (R + v * Math.cos(u / 2)) * Math.sin(u);
    pos[i * 3 + 2] = v * Math.sin(u / 2);
  }

  return finalize(pos, count, "mobius-strip");
}

export function generateHyperboloid(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const a = 1.0;
  const b = 1.6;
  const H = 2.4;

  for (let i = 0; i < count; i++) {
    const y = (Math.random() - 0.5) * H * 2;
    const r = a * Math.sqrt(1 + (y * y) / (b * b));
    const theta = Math.random() * Math.PI * 2;

    pos[i * 3] = r * Math.cos(theta);
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = r * Math.sin(theta);
  }

  return finalize(pos, count, "hyperboloid");
}

export function generateTorusKnot(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const p = 2;
  const q = 3;
  const R = 1.6;
  const r = 0.55;
  const TUBE_RADIUS = 0.18;

  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;

    const cx = (R + r * Math.cos(q * t)) * Math.cos(p * t);
    const cy = (R + r * Math.cos(q * t)) * Math.sin(p * t);
    const cz = r * Math.sin(q * t);

    const tubeAngle = Math.random() * Math.PI * 2;
    const tubeR = Math.sqrt(Math.random()) * TUBE_RADIUS;

    const dt = 0.001;
    const t2 = t + dt;
    const cx2 = (R + r * Math.cos(q * t2)) * Math.cos(p * t2);
    const cy2 = (R + r * Math.cos(q * t2)) * Math.sin(p * t2);
    const cz2 = r * Math.sin(q * t2);

    const tx = cx2 - cx;
    const ty = cy2 - cy;
    const tz = cz2 - cz;
    const tLen = Math.sqrt(tx * tx + ty * ty + tz * tz) + 1e-10;

    const upX = Math.abs(ty / tLen) > 0.9 ? 0 : 0;
    const upY = Math.abs(ty / tLen) > 0.9 ? 0 : 1;
    const upZ = Math.abs(ty / tLen) > 0.9 ? 1 : 0;

    const nx = (ty / tLen) * upZ - (tz / tLen) * upY;
    const ny = (tz / tLen) * upX - (tx / tLen) * upZ;
    const nz = (tx / tLen) * upY - (ty / tLen) * upX;
    const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) + 1e-10;

    const bx = (ty / tLen) * (nz / nLen) - (tz / tLen) * (ny / nLen);
    const by = (tz / tLen) * (nx / nLen) - (tx / tLen) * (nz / nLen);
    const bz = (tx / tLen) * (ny / nLen) - (ty / tLen) * (nx / nLen);

    const offX = tubeR * (Math.cos(tubeAngle) * (nx / nLen) + Math.sin(tubeAngle) * bx);
    const offY = tubeR * (Math.cos(tubeAngle) * (ny / nLen) + Math.sin(tubeAngle) * by);
    const offZ = tubeR * (Math.cos(tubeAngle) * (nz / nLen) + Math.sin(tubeAngle) * bz);

    pos[i * 3] = cx + offX;
    pos[i * 3 + 1] = cy + offY;
    pos[i * 3 + 2] = cz + offZ;
  }

  return finalize(pos, count, "torus-knot");
}

export function generateSupernovaShell(count: number): Float32Array {
  const pos = new Float32Array(count * 3);

  const shellCount = Math.floor(count * 0.52);
  const jetCount = Math.floor(count * 0.22);
  const ringCount = count - shellCount - jetCount;

  for (let i = 0; i < shellCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const baseR = 2.0;
    const perturbation =
      0.22 *
      (Math.sin(phi * 3 + theta * 2) * 0.5 +
        Math.sin(phi * 5 - theta * 4) * 0.3 +
        Math.sin(phi * 7 + theta * 6) * 0.2);
    const R = baseR + perturbation;
    const thickness = 0.08 + Math.abs(perturbation) * 0.3;
    const r = R + (Math.random() - 0.5) * thickness * 2;

    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }

  for (let i = 0; i < jetCount; i++) {
    const idx = shellCount + i;
    const isNorth = i < jetCount / 2;
    const sign = isNorth ? 1 : -1;

    const y = sign * (1.8 + Math.random() * 1.2);
    const jetWidth = 0.12 + Math.abs(y - sign * 1.8) * 0.15;
    const angle = Math.random() * Math.PI * 2;
    const rJet = Math.random() * jetWidth;

    pos[idx * 3] = rJet * Math.cos(angle);
    pos[idx * 3 + 1] = y + (Math.random() - 0.5) * 0.06;
    pos[idx * 3 + 2] = rJet * Math.sin(angle);
  }

  for (let i = 0; i < ringCount; i++) {
    const idx = shellCount + jetCount + i;
    const angle = Math.random() * Math.PI * 2;
    const ringR = 1.5 + (Math.random() - 0.5) * 0.14;
    const y = (Math.random() - 0.5) * 0.1;

    pos[idx * 3] = ringR * Math.cos(angle);
    pos[idx * 3 + 1] = y;
    pos[idx * 3 + 2] = ringR * Math.sin(angle);
  }

  return finalize(pos, count, "supernova-shell");
}

export const SHAPE_GENERATORS: Record<string, (count: number) => Float32Array> = {
  "stellar-nebula": generateStellarNebula,
  sphere: generateSphere,
  torus: generateTorus,
  "galaxy-spiral": generateGalaxySpiral,
  "dna-helix": generateDNAHelix,
  "milky-way": generateMilkyWay,
  "mobius-strip": generateMobiusStrip,
  hyperboloid: generateHyperboloid,
  "torus-knot": generateTorusKnot,
  "supernova-shell": generateSupernovaShell,
};

export const INITIAL_SHAPE = "stellar-nebula";

export function getShapeNames(): string[] {
  return Object.keys(SHAPE_GENERATORS);
}
