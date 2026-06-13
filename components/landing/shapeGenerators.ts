import * as THREE from "three";

export type Point2D = [number, number];

export interface ShapeResult {
  positions: THREE.Vector3[];
  colors: THREE.Color[];
}

const COLOR_DEEP_INDIGO = new THREE.Color("#4F46E5");
const COLOR_ELECTRIC_PURPLE = new THREE.Color("#A855F7");
const COLOR_BRIGHT_CYAN = new THREE.Color("#22D3EE");
const COLOR_WHITE_HOT = new THREE.Color("#E0F2FE");
const COLOR_SOFT_PURPLE = new THREE.Color("#C084FC");
const COLOR_DEEP_INDIGO_DARK = new THREE.Color("#3730A3");
const COLOR_ORANGE = new THREE.Color("#F97316");
const COLOR_CRACK_RED = new THREE.Color("#FF6B6B");
const COLOR_EXTRA_PURPLE = new THREE.Color("#6C3EFF");
const COLOR_EXTRA_VIOLET = new THREE.Color("#7C3AED");
const COLOR_EXTRA_CYAN = new THREE.Color("#0891B2");

function jitter(amount: number): number {
  return (Math.random() - 0.5) * amount;
}

function toVec(x: number, y: number, scatter = 0.02): THREE.Vector3 {
  return new THREE.Vector3(
    x + jitter(scatter),
    y + jitter(scatter),
    jitter(scatter * 0.5),
  );
}

export function distributeAlongPath(
  points: Point2D[],
  count: number,
  closed = true,
  scatter = 0.02,
): THREE.Vector3[] {
  const segments: number[] = [];
  let total = 0;
  const limit = closed ? points.length : points.length - 1;

  for (let i = 0; i < limit; i++) {
    const next = points[(i + 1) % points.length];
    const len = Math.hypot(next[0] - points[i][0], next[1] - points[i][1]);
    segments.push(len);
    total += len;
  }

  const result: THREE.Vector3[] = [];
  for (let c = 0; c < count; c++) {
    let d = (c / count) * total;
    for (let i = 0; i < limit; i++) {
      if (d <= segments[i] || i === limit - 1) {
        const t = segments[i] > 0 ? d / segments[i] : 0;
        const p0 = points[i];
        const p1 = points[(i + 1) % points.length];
        result.push(toVec(p0[0] + (p1[0] - p0[0]) * t, p0[1] + (p1[1] - p0[1]) * t, scatter));
        break;
      }
      d -= segments[i];
    }
  }
  return result;
}

function fillBox(
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  count: number,
): THREE.Vector3[] {
  return Array.from({ length: count }, () =>
    toVec(minX + Math.random() * (maxX - minX), minY + Math.random() * (maxY - minY), 0.03),
  );
}

function ellipsePoints(cx: number, cy: number, rx: number, ry: number, segments: number): Point2D[] {
  return Array.from({ length: segments }, (_, i) => {
    const a = (i / segments) * Math.PI * 2;
    return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry] as Point2D;
  });
}

function circlePoints(cx: number, cy: number, r: number, segments: number): Point2D[] {
  return ellipsePoints(cx, cy, r, r, segments);
}

function mergeParts(parts: { positions: THREE.Vector3[]; colors: THREE.Color[] }[], total: number): ShapeResult {
  const positions: THREE.Vector3[] = [];
  const colors: THREE.Color[] = [];
  for (const part of parts) {
    positions.push(...part.positions);
    colors.push(...part.colors);
  }
  while (positions.length < total) {
    const i = Math.floor(Math.random() * Math.max(1, positions.length));
    positions.push(positions[i]?.clone() ?? toVec(0, 0));
    colors.push(colors[i]?.clone() ?? COLOR_DEEP_INDIGO.clone());
  }
  return { positions: positions.slice(0, total), colors: colors.slice(0, total) };
}

function defaultColors(count: number, hotspots?: Set<number>): THREE.Color[] {
  return Array.from({ length: count }, (_, i) => {
    if (hotspots?.has(i)) return COLOR_WHITE_HOT.clone();
    const roll = Math.random();
    if (roll < 0.5) return COLOR_DEEP_INDIGO.clone();
    if (roll < 0.75) return COLOR_ELECTRIC_PURPLE.clone();
    return COLOR_BRIGHT_CYAN.clone();
  });
}

export function generateScatteredCloud(count: number, radius = 3.0): ShapeResult {
  const positions = Array.from({ length: count }, () => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random());
    return new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi) * 0.3,
    );
  });
  return { positions, colors: defaultColors(count) };
}

export function generateGalaxy(count: number): ShapeResult {
  const positions: THREE.Vector3[] = [];

  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.15) {
      const theta = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.5) * 1.2;
      positions.push(
        new THREE.Vector3(
          r * Math.cos(theta),
          r * Math.sin(theta),
          (Math.random() - 0.5) * 0.15,
        ),
      );
      continue;
    }

    const armIndex = Math.floor(Math.random() * 4);
    const armAngle = (armIndex / 4) * Math.PI * 2;
    const t = Math.pow(Math.random(), 0.6);
    const r = 0.5 + t * 5.0;
    const spin = r * 0.9;
    const angle = armAngle + spin + (Math.random() - 0.5) * 0.35;
    const armWidth = 0.25 + t * 0.5;
    const perp = (Math.random() - 0.5) * armWidth;

    positions.push(
      new THREE.Vector3(
        Math.cos(angle) * r - Math.sin(angle) * perp,
        Math.sin(angle) * r + Math.cos(angle) * perp,
        (Math.random() - 0.5) * 0.2 * (1 - t * 0.5),
      ),
    );
  }

  return { positions, colors: defaultColors(count) };
}

export function generateBrokenCursor(count: number): ShapeResult {
  const cursorPath: Point2D[] = [
    [0, 1.2],
    [-0.15, 0.3],
    [-0.05, 0.4],
    [-0.05, -0.8],
    [0.05, -0.8],
    [0.05, 0.4],
    [0.5, -0.2],
  ];
  const outlineCount = Math.floor(count * 0.42);
  const fillCount = Math.floor(count * 0.28);
  const crackCount = count - outlineCount - fillCount;

  const outline = distributeAlongPath(cursorPath, outlineCount, true, 0.02);
  const fill = fillBox(-0.12, 0.45, -0.75, 1.15, fillCount);

  const crackJags: Point2D[] = [
    [-0.3, 0.6],
    [-0.1, 0.35],
    [0.1, 0.05],
    [0.25, -0.15],
    [0.4, -0.3],
  ];
  const crack = distributeAlongPath(crackJags, crackCount, false, 0.01);

  const cursorColors = defaultColors(outlineCount + fillCount);
  const crackColors = crack.map(() => COLOR_CRACK_RED.clone());

  return mergeParts(
    [
      { positions: [...outline, ...fill], colors: cursorColors },
      { positions: crack, colors: crackColors },
    ],
    count,
  );
}

export function generateFigmaLogo(count: number): ShapeResult {
  const outer: Point2D[] = [[-0.8, -1.4], [0.8, -1.4], [0.8, 1.4], [-0.8, 1.4]];
  const bar1: Point2D[] = [[-0.8, 0.6], [0.4, 0.6], [0.4, 1.0], [-0.8, 1.0]];
  const bar2: Point2D[] = [[-0.8, -0.1], [0.2, -0.1], [0.2, 0.3], [-0.8, 0.3]];
  const stem: Point2D[] = [[-0.8, -1.4], [-0.4, -1.4], [-0.4, 1.4], [-0.8, 1.4]];

  const n = Math.floor(count / 4);
  const parts = [
    { pos: distributeAlongPath(outer, n, true, 0.015), color: COLOR_DEEP_INDIGO },
    { pos: [...distributeAlongPath(bar1, n, true, 0.015), ...fillBox(-0.75, 0.35, 0.62, 0.98, Math.floor(n * 0.5))], color: COLOR_ELECTRIC_PURPLE },
    { pos: [...distributeAlongPath(bar2, n, true, 0.015), ...fillBox(-0.75, 0.15, -0.08, 0.28, Math.floor(n * 0.5))], color: COLOR_BRIGHT_CYAN },
    { pos: distributeAlongPath(stem, n, true, 0.015), color: COLOR_BRIGHT_CYAN },
  ];

  const positions: THREE.Vector3[] = [];
  const colors: THREE.Color[] = [];
  for (const part of parts) {
    for (const p of part.pos) {
      positions.push(p);
      const isCorner =
        Math.abs(Math.abs(p.x) - 0.8) < 0.08 && Math.abs(Math.abs(p.y) - 1.4) < 0.08;
      colors.push(isCorner ? COLOR_WHITE_HOT.clone() : part.color.clone());
    }
  }
  return mergeParts([{ positions, colors }], count);
}

export function generateOpenLaptop(count: number): ShapeResult {
  const screen: Point2D[] = [[-1.0, 0.1], [1.0, 0.1], [0.8, 1.4], [-0.8, 1.4]];
  const bezel: Point2D[] = [[-0.7, 0.25], [0.7, 0.25], [0.65, 1.25], [-0.65, 1.25]];
  const base: Point2D[] = [[-1.2, -0.2], [1.2, -0.2], [1.2, 0.0], [-1.2, 0.0]];
  const hinge: Point2D[] = [[-0.1, 0.0], [0.1, 0.1]];

  const n1 = Math.floor(count * 0.3);
  const n2 = Math.floor(count * 0.15);
  const n3 = Math.floor(count * 0.35);
  const n4 = Math.floor(count * 0.05);
  const n5 = count - n1 - n2 - n3 - n4;

  const screenOutline = distributeAlongPath(screen, n1, true, 0.02);
  const bezelOutline = distributeAlongPath(bezel, n2, true, 0.015);
  const screenFill = fillBox(-0.6, 0.6, 0.3, 1.2, n5);
  const baseOutline = distributeAlongPath(base, n3, true, 0.02);
  const hingeLine = distributeAlongPath(hinge, n4, false, 0.01);

  const positions = [...screenOutline, ...bezelOutline, ...screenFill, ...baseOutline, ...hingeLine];
  const colors = positions.map((p, i) => {
    if (i < n1) return COLOR_DEEP_INDIGO.clone();
    if (i < n1 + n2) return COLOR_DEEP_INDIGO.clone();
    if (i < n1 + n2 + n5) return COLOR_BRIGHT_CYAN.clone();
    if (i < n1 + n2 + n5 + n3) return COLOR_ELECTRIC_PURPLE.clone();
    return COLOR_ELECTRIC_PURPLE.clone();
  });

  return mergeParts([{ positions, colors }], count);
}

export function generateCursorHand(count: number): ShapeResult {
  const indexL: Point2D[] = [[-0.08, -0.5], [-0.08, 1.2]];
  const indexR: Point2D[] = [[0.08, 1.2], [0.08, -0.5]];
  const tip: Point2D[] = [[-0.08, 1.2], [0.08, 1.2]];
  const middle: Point2D[] = [[0.1, -0.3], [0.1, 0.9], [0.22, 0.9], [0.22, -0.3]];
  const ring: Point2D[] = [[0.24, -0.2], [0.24, 0.7], [0.36, 0.7], [0.36, -0.2]];
  const thumb: Point2D[] = [[-0.32, -0.4], [-0.32, 0.2], [-0.1, 0.2], [-0.1, -0.4]];
  const palm = circlePoints(0, -0.75, 0.35, 24);

  const per = Math.floor(count / 6);
  const parts = [
    distributeAlongPath(indexL, per, false, 0.02),
    distributeAlongPath(indexR, per, false, 0.02),
    distributeAlongPath(tip, Math.floor(per * 0.5), false, 0.015),
    distributeAlongPath(middle, per, true, 0.02),
    distributeAlongPath(ring, per, true, 0.02),
    distributeAlongPath(thumb, per, true, 0.02),
    distributeAlongPath(palm, per, true, 0.02),
    fillBox(-0.3, 0.35, -0.95, -0.35, count - per * 6 - Math.floor(per * 0.5)),
  ].flat();

  const positions = parts.slice(0, count);
  const colors = positions.map((p) => {
    const nearTip = p.y > 1.0 && Math.abs(p.x) < 0.12;
    return nearTip ? COLOR_WHITE_HOT.clone() : defaultColors(1)[0];
  });

  return mergeParts([{ positions, colors }], count);
}

export function generateAppGrid(count: number): ShapeResult {
  const centers: Point2D[] = [
    [-0.7, 0.9],
    [0.7, 0.9],
    [-0.7, 0.0],
    [0.7, 0.0],
    [-0.7, -0.9],
    [0.7, -0.9],
  ];
  const palette = [
    COLOR_DEEP_INDIGO,
    COLOR_ELECTRIC_PURPLE,
    COLOR_BRIGHT_CYAN,
    COLOR_EXTRA_PURPLE,
    COLOR_EXTRA_VIOLET,
    COLOR_EXTRA_CYAN,
  ];
  const perIcon = Math.floor(count / 6);
  const w = 0.5;
  const h = 0.6;
  const positions: THREE.Vector3[] = [];
  const colors: THREE.Color[] = [];

  centers.forEach((center, idx) => {
    const rect: Point2D[] = [
      [center[0] - w / 2, center[1] - h / 2],
      [center[0] + w / 2, center[1] - h / 2],
      [center[0] + w / 2, center[1] + h / 2],
      [center[0] - w / 2, center[1] + h / 2],
    ];
    const outline = distributeAlongPath(rect, Math.floor(perIcon * 0.7), true, 0.015);
    const fill = fillBox(center[0] - w / 2, center[0] + w / 2, center[1] - h / 2, center[1] + h / 2, Math.floor(perIcon * 0.25));
    const glow = Array.from({ length: 3 }, () => toVec(center[0], center[1], 0.01));
    for (const p of [...outline, ...fill, ...glow]) {
      positions.push(p);
      const isGlow = Math.hypot(p.x - center[0], p.y - center[1]) < 0.05;
      colors.push(isGlow ? COLOR_WHITE_HOT.clone() : palette[idx].clone());
    }
  });

  return mergeParts([{ positions, colors }], count);
}

export function generateHumanSilhouette(count: number): ShapeResult {
  const sofaBack: Point2D[] = [[-1.0, 0.62], [-1.0, -0.52], [-0.7, -0.52], [-0.7, 0.52]];
  const sofaSeat: Point2D[] = [[-0.7, -0.52], [0.78, -0.52], [0.78, -0.68], [-0.7, -0.68]];
  const sofaArm: Point2D[] = [[0.78, -0.52], [0.95, -0.32], [0.82, -0.12], [0.68, -0.52]];
  const sofaBase: Point2D[] = [[-1.0, -0.68], [0.95, -0.68], [0.95, -0.82], [-1.0, -0.82]];

  const head = ellipsePoints(-0.3, 0.46, 0.2, 0.24, 28);
  const neck: Point2D[] = [[-0.38, 0.26], [-0.48, 0.1]];
  const upperBack: Point2D[] = [[-0.48, 0.1], [-0.88, 0.05], [-0.92, -0.18]];
  const torsoFront: Point2D[] = [[-0.48, 0.1], [-0.1, 0.06], [-0.06, -0.2], [-0.55, -0.24]];
  const lap: Point2D[] = [[-0.06, -0.2], [0.45, -0.3], [0.5, -0.52], [-0.12, -0.5]];
  const lowerLeg: Point2D[] = [[0.5, -0.52], [0.58, -0.58], [0.38, -0.64]];

  const nearArm: Point2D[] = [[-0.12, 0.02], [0.06, 0.16], [0.1, 0.04], [0.04, -0.04]];
  const farArm: Point2D[] = [[-0.22, 0.0], [-0.04, 0.12], [0.02, 0.02]];

  const bookLeft: Point2D[] = [[0.02, 0.2], [0.02, -0.02], [0.34, 0.06]];
  const bookRight: Point2D[] = [[0.02, 0.2], [0.02, -0.02], [-0.22, 0.04]];
  const bookSpine: Point2D[] = [[0.02, 0.2], [0.02, -0.02]];

  const sofaCount = Math.floor(count * 0.34);
  const personCount = Math.floor(count * 0.46);
  const bookCount = Math.floor(count * 0.12);
  const accentCount = count - sofaCount - personCount - bookCount;

  const perSofa = Math.floor(sofaCount / 4);
  const perPerson = Math.floor(personCount / 7);

  const positions = [
    ...distributeAlongPath(sofaBack, perSofa, true, 0.015),
    ...fillBox(-0.98, -0.72, -0.5, 0.58, Math.floor(perSofa * 1.2)),
    ...distributeAlongPath(sofaSeat, perSofa, true, 0.015),
    ...fillBox(-0.68, 0.76, -0.66, -0.54, Math.floor(perSofa * 1.4)),
    ...distributeAlongPath(sofaArm, perSofa, false, 0.015),
    ...distributeAlongPath(sofaBase, perSofa, true, 0.012),
    ...fillBox(-0.98, 0.93, -0.8, -0.7, Math.floor(perSofa * 0.6)),

    ...distributeAlongPath(head, Math.floor(perPerson * 1.2), true, 0.015),
    ...fillBox(-0.48, -0.12, 0.24, 0.68, Math.floor(perPerson * 0.9)),
    ...distributeAlongPath(neck, Math.floor(perPerson * 0.3), false, 0.012),
    ...distributeAlongPath(upperBack, perPerson, false, 0.018),
    ...fillBox(-0.9, -0.5, -0.2, 0.12, Math.floor(perPerson * 0.8)),
    ...distributeAlongPath(torsoFront, perPerson, false, 0.018),
    ...fillBox(-0.52, -0.08, -0.22, 0.08, Math.floor(perPerson * 0.7)),
    ...distributeAlongPath(lap, perPerson, false, 0.018),
    ...fillBox(-0.1, 0.48, -0.5, -0.22, Math.floor(perPerson * 0.6)),
    ...distributeAlongPath(lowerLeg, Math.floor(perPerson * 0.4), false, 0.015),
    ...distributeAlongPath(nearArm, perPerson, false, 0.015),
    ...distributeAlongPath(farArm, Math.floor(perPerson * 0.5), false, 0.015),

    ...distributeAlongPath(bookLeft, bookCount, false, 0.012),
    ...distributeAlongPath(bookRight, bookCount, false, 0.012),
    ...distributeAlongPath(bookSpine, Math.floor(bookCount * 0.4), false, 0.01),
    ...fillBox(-0.18, 0.32, -0.02, 0.18, Math.floor(bookCount * 0.8)),

    ...fillBox(-0.88, 0.6, -0.48, 0.2, accentCount),
  ];

  return mergeParts([{ positions, colors: defaultColors(positions.length) }], count);
}

export function generatePortraitSilhouette(count: number): ShapeResult {
  const head = ellipsePoints(0.08, 0.6, 0.3, 0.38, 48);
  const jaw: Point2D[] = [[-0.18, 0.3], [0.08, 0.18], [0.34, 0.3]];
  const neckL: Point2D[] = [[-0.1, 0.22], [-0.12, 0.0]];
  const neckR: Point2D[] = [[0.26, 0.22], [0.28, 0.0]];
  const lShoulder: Point2D[] = [[-0.12, 0.0], [-0.5, -0.3], [-0.9, -0.5], [-1.2, -1.0]];
  const rShoulder: Point2D[] = [[0.28, 0.0], [0.7, -0.25], [1.0, -0.35], [1.2, -1.0]];
  const chest: Point2D[] = [[-1.2, -1.0], [1.2, -1.0]];
  const hair: Point2D[] = [[-0.22, 0.72], [0.08, 1.02], [0.36, 0.82]];

  const n = Math.floor(count / 8);
  const positions = [
    ...distributeAlongPath(head, Math.floor(n * 1.5), true, 0.015),
    ...fillBox(-0.2, 0.35, 0.25, 0.95, Math.floor(n * 0.8)),
    ...distributeAlongPath(jaw, n, false, 0.015),
    ...distributeAlongPath(neckL, Math.floor(n * 0.4), false, 0.01),
    ...distributeAlongPath(neckR, Math.floor(n * 0.4), false, 0.01),
    ...distributeAlongPath(lShoulder, n, false, 0.02),
    ...distributeAlongPath(rShoulder, n, false, 0.02),
    ...distributeAlongPath(chest, n, false, 0.02),
    ...distributeAlongPath(hair, n, false, 0.02),
    ...Array.from({ length: 8 }, () => toVec(0.08 + jitter(0.15), 0.95 + Math.random() * 0.15, 0.01)),
  ].slice(0, count);

  const colors = positions.map((p) => {
    if (p.y > 0.5) return COLOR_WHITE_HOT.clone();
    if (p.y > 0.15) return COLOR_SOFT_PURPLE.clone();
    return COLOR_DEEP_INDIGO_DARK.clone();
  });

  while (positions.length < count) {
    positions.push(toVec(0.08, 0.6, 0.02));
    colors.push(COLOR_SOFT_PURPLE.clone());
  }

  return { positions: positions.slice(0, count), colors: colors.slice(0, count) };
}

export function generateRocketDetailed(count: number): ShapeResult {
  const nose: Point2D[] = [[0, 1.6], [-0.22, 0.9], [0.22, 0.9]];
  const body: Point2D[] = [[-0.22, 0.9], [0.22, 0.9], [0.22, -0.3], [-0.22, -0.3]];
  const window = circlePoints(0, 0.45, 0.1, 16);
  const lFin: Point2D[] = [[-0.22, -0.0], [-0.55, -0.4], [-0.22, -0.3]];
  const rFin: Point2D[] = [[0.22, -0.0], [0.55, -0.4], [0.22, -0.3]];
  const nozzle: Point2D[] = [[-0.14, -0.3], [0.14, -0.3], [0.1, -0.5], [-0.1, -0.5]];

  const exhaustCount = Math.floor(count * 0.25);
  const n = Math.floor(count * 0.12);

  const positions: THREE.Vector3[] = [];
  const colors: THREE.Color[] = [];

  const add = (vecs: THREE.Vector3[], color: THREE.Color) => {
    for (const v of vecs) {
      positions.push(v);
      colors.push(color.clone());
    }
  };

  add(distributeAlongPath(nose, n, true, 0.015), COLOR_WHITE_HOT);
  add([...distributeAlongPath(body, n * 2, true, 0.015), ...fillBox(-0.18, 0.18, -0.25, 0.85, n)], COLOR_BRIGHT_CYAN);
  add(distributeAlongPath(window, n, true, 0.01), COLOR_WHITE_HOT);
  add(distributeAlongPath(lFin, n, true, 0.015), COLOR_ELECTRIC_PURPLE);
  add(distributeAlongPath(rFin, n, true, 0.015), COLOR_ELECTRIC_PURPLE);
  add(distributeAlongPath(nozzle, n, true, 0.015), COLOR_BRIGHT_CYAN);

  for (let i = 0; i < exhaustCount; i++) {
    const t = i / exhaustCount;
    const y = -0.5 - t * 1.1;
    const w = 0.1 + t * 0.5;
    positions.push(toVec(jitter(w), y, 0.03));
    const orangeMix = 1 - t;
    colors.push(
      new THREE.Color().lerpColors(COLOR_ORANGE, COLOR_ELECTRIC_PURPLE, 1 - orangeMix),
    );
  }

  return mergeParts([{ positions, colors }], count);
}

export function generateSpeechBubble(count: number): ShapeResult {
  const bubble: Point2D[] = [[-1.0, 0.1], [1.0, 0.1], [1.0, 1.3], [-1.0, 1.3]];
  const tail: Point2D[] = [[-0.6, 0.1], [-0.8, -0.3], [-0.3, 0.1]];
  const qArc: Point2D[] = Array.from({ length: 12 }, (_, i) => {
    const a = Math.PI * 0.85 - (i / 11) * Math.PI * 0.9;
    return [0.1 + Math.cos(a) * 0.22, 0.8 + Math.sin(a) * 0.22] as Point2D;
  });
  const qStem: Point2D[] = [[0.1, 0.65], [0.1, 0.5]];
  const qDot = [toVec(0.1, 0.35, 0.01)];

  const outlineN = Math.floor(count * 0.45);
  const fillN = Math.floor(count * 0.25);
  const qN = count - outlineN - fillN;

  const positions = [
    ...distributeAlongPath(bubble, Math.floor(outlineN * 0.7), true, 0.02),
    ...distributeAlongPath(tail, Math.floor(outlineN * 0.3), false, 0.02),
    ...fillBox(-0.9, 0.9, 0.15, 1.25, fillN),
    ...distributeAlongPath(qArc, Math.floor(qN * 0.6), false, 0.01),
    ...distributeAlongPath(qStem, Math.floor(qN * 0.25), false, 0.01),
    ...qDot,
  ];

  const colors = positions.map((p) => {
    const isQ = Math.hypot(p.x - 0.1, p.y - 0.6) < 0.35;
    return isQ ? COLOR_WHITE_HOT.clone() : COLOR_DEEP_INDIGO.clone();
  });

  return mergeParts([{ positions, colors }], count);
}

export function generateFragmentedScatter(count: number): ShapeResult {
  const clusters = [
    { x: -0.5, y: 0.4, spread: 0.35 },
    { x: 0.4, y: -0.3, spread: 0.3 },
    { x: 0.0, y: 0.0, spread: 0.5 },
  ];
  const positions: THREE.Vector3[] = [];
  const per = Math.floor(count / clusters.length);
  for (const c of clusters) {
    for (let i = 0; i < per; i++) {
      positions.push(toVec(c.x + jitter(c.spread), c.y + jitter(c.spread), 0.04));
    }
  }
  return { positions, colors: defaultColors(positions.length) };
}

export function generateTimelineDotsBase(count: number): ShapeResult {
  const nodes = 13;
  const perNode = Math.floor(count / nodes);
  const lineN = count - perNode * nodes;
  const positions: THREE.Vector3[] = [];
  for (let n = 0; n < nodes; n++) {
    const x = -1.8 + n * 0.3;
    for (let i = 0; i < perNode; i++) {
      const a = (i / perNode) * Math.PI * 2;
      positions.push(toVec(x + Math.cos(a) * 0.08, Math.sin(a) * 0.08, 0.01));
    }
  }
  for (let i = 0; i < lineN; i++) {
    const t = i / lineN;
    positions.push(toVec(-1.8 + t * 3.6, 0, 0.005));
  }
  return { positions, colors: defaultColors(positions.length) };
}

export function generateRippleRingsBase(count: number): ShapeResult {
  const perRing = Math.floor(count / 3);
  const positions: THREE.Vector3[] = [];
  for (let ring = 0; ring < 3; ring++) {
    for (let i = 0; i < perRing; i++) {
      const a = (i / perRing) * Math.PI * 2;
      positions.push(new THREE.Vector3(Math.cos(a) * 0.2, Math.sin(a) * 0.2, 0));
    }
  }
  while (positions.length < count) {
    const a = Math.random() * Math.PI * 2;
    positions.push(new THREE.Vector3(Math.cos(a) * 0.2, Math.sin(a) * 0.2, 0));
  }
  return { positions: positions.slice(0, count), colors: defaultColors(count) };
}

export function generateRisingDiagonalBase(count: number): ShapeResult {
  const positions = Array.from({ length: count }, (_, i) => {
    const t = i / count;
    return toVec(-1.6 + t * 3.2, -1.0 + t * 2.0, 0.02);
  });
  return { positions, colors: defaultColors(count) };
}

export function generateHeartbeatBase(count: number): ShapeResult {
  const positions = Array.from({ length: count }, () => toVec(0, 0, 0.01));
  return { positions, colors: defaultColors(count) };
}

export function generateBurstBase(count: number): ShapeResult {
  const positions = Array.from({ length: count }, () => new THREE.Vector3(0, 0, 0));
  return { positions, colors: defaultColors(count) };
}

export function generateDispersingPulse(count: number): ShapeResult {
  return generateScatteredCloud(count, 1.5);
}

export function buildAllShapes(count: number): Record<string, ShapeResult> {
  return {
    "scattered-cloud": generateScatteredCloud(count, 3.0),
    galaxy: generateGalaxy(count),
    "broken-cursor": generateBrokenCursor(count),
    "figma-logo": generateFigmaLogo(count),
    "open-laptop": generateOpenLaptop(count),
    "cursor-hand": generateCursorHand(count),
    "app-grid": generateAppGrid(count),
    "human-silhouette": generateHumanSilhouette(count),
    "portrait-silhouette": generatePortraitSilhouette(count),
    "rocket-detailed": generateRocketDetailed(count),
    "speech-bubble": generateSpeechBubble(count),
    "fragmented-scatter": generateFragmentedScatter(count),
    burst: generateBurstBase(count),
    "timeline-dots": generateTimelineDotsBase(count),
    "ripple-rings": generateRippleRingsBase(count),
    "rising-diagonal": generateRisingDiagonalBase(count),
    heartbeat: generateHeartbeatBase(count),
    "dispersing-pulse": generateDispersingPulse(count),
  };
}
