// coursekit.tsx — the locked "Agent School" course look (Uzair, Nov 1 2026). Four styles, one system:
//   1. BLUEPRINT  — navy grid, white/blue line art that draws itself (Draw, BpBox, BpArrow, BpLabel, icons)
//   2. SCREEN     — fake app UI: chat window, terminal, cursor, typing (Window, ChatBubble, TypeText, Term)
//   3. GLASS      — frosted cards over soft light + kinetic words (GlassBg, Glass, Kinetic)
//   4. ISOMETRIC  — small 3D worlds from iso boxes (iso, IsoBox, IsoRobot, IsoFloor)
// Chrome on every lesson: LessonChrome (school pill + lesson tag + progress bar). NO sound effects.
// Everything is SVG so it works inside factkit's <Director> camera.
import React from "react";
import { VW, VH, clamp01, lerp, ramp, eio, eout, pop } from "./kit";
import { FONT } from "./factkit";

export const MONO = "DejaVu Sans Mono, Menlo, monospace";
export const C = {
  navy: "#0B1B3A", navy2: "#0E2550", grid: "#2C5AA0", line: "#E8F1FF", blue: "#4DA3FF", cyan: "#5EE7FF",
  amber: "#FFB547", red: "#FF5C6C", green: "#4BE3A0", violet: "#8B7CFF", ink: "#0A1020", white: "#FFFFFF",
};

// ================= 1. BLUEPRINT =================
export const BlueprintBg: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <defs>
      <radialGradient id="bpg" cx="50%" cy="40%" r="80%"><stop offset="0" stopColor={C.navy2} /><stop offset="1" stopColor="#06112A" /></radialGradient>
      <pattern id="bpgrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0 L0 0 0 40" fill="none" stroke={C.grid} strokeWidth={1} opacity={0.28} /></pattern>
      <pattern id="bpgrid2" width="200" height="200" patternUnits="userSpaceOnUse"><path d="M200 0 L0 0 0 200" fill="none" stroke={C.grid} strokeWidth={2} opacity={0.35} /></pattern>
    </defs>
    <rect width={VW} height={VH} fill="url(#bpg)" />
    <rect width={VW} height={VH} fill="url(#bpgrid)" />
    <rect width={VW} height={VH} fill="url(#bpgrid2)" transform={`translate(0 ${(f * 0.3) % 200 - 200})`} />
  </g>
);
/** Draw-on stroke: path length normalised with pathLength=1. */
export const Draw: React.FC<{ d: string; f: number; at: number; dur?: number; stroke?: string; w?: number; dash?: boolean; fill?: string }> = ({ d, f, at, dur = 20, stroke = C.line, w = 5, dash, fill }) => {
  const p = eio(ramp(f, at, at + dur));
  if (p <= 0) return null;
  return (
    <g>
      {fill && <path d={d} fill={fill} opacity={ramp(f, at + dur * 0.6, at + dur + 8)} />}
      <path d={d} pathLength={1} fill="none" stroke={stroke} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={dash ? "0.012 0.012" : `${p} 1`} opacity={dash ? p : 1} />
    </g>
  );
};
export const BpBox: React.FC<{ f: number; at: number; x: number; y: number; w: number; h: number; label?: string; sub?: string; hue?: string; fs?: number; r?: number }> = ({ f, at, x, y, w, h, label, sub, hue = C.line, fs = 44, r = 22 }) => {
  const d = `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;
  const t = eout(ramp(f, at + 14, at + 26));
  return (
    <g>
      <Draw d={d} f={f} at={at} dur={18} stroke={hue} fill="rgba(77,163,255,0.08)" />
      {label && <text x={x + w / 2} y={y + h / 2 + (sub ? -4 : fs * 0.36)} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={fs} fill={hue} opacity={t} letterSpacing={2}>{label}</text>}
      {sub && <text x={x + w / 2} y={y + h / 2 + fs * 0.9} textAnchor="middle" fontFamily={MONO} fontSize={fs * 0.55} fill={C.blue} opacity={t}>{sub}</text>}
    </g>
  );
};
export const BpArrow: React.FC<{ f: number; at: number; x1: number; y1: number; x2: number; y2: number; bend?: number; hue?: string; dur?: number }> = ({ f, at, x1, y1, x2, y2, bend = 0, hue = C.cyan, dur = 16 }) => {
  const mx = (x1 + x2) / 2 - (y2 - y1) * bend, my = (y1 + y2) / 2 + (x2 - x1) * bend;
  const a = Math.atan2(y2 - my, x2 - mx);
  const head = ramp(f, at + dur - 3, at + dur + 3);
  return (
    <g>
      <Draw d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`} f={f} at={at} dur={dur} stroke={hue} w={6} />
      {head > 0 && <path d={`M${x2} ${y2} L${x2 - 30 * Math.cos(a - 0.45)} ${y2 - 30 * Math.sin(a - 0.45)} M${x2} ${y2} L${x2 - 30 * Math.cos(a + 0.45)} ${y2 - 30 * Math.sin(a + 0.45)}`} stroke={hue} strokeWidth={6} strokeLinecap="round" opacity={head} />}
    </g>
  );
};
/** Small mono annotation with a leader tick, blueprint style. */
export const BpLabel: React.FC<{ f: number; at: number; x: number; y: number; text: string; hue?: string; fs?: number; anchor?: "start" | "middle" | "end" }> = ({ f, at, x, y, text, hue = C.blue, fs = 30, anchor = "middle" }) => {
  const n = Math.round(text.length * clamp01((f - at) / 14));
  if (n <= 0) return null;
  return <text x={x} y={y} textAnchor={anchor} fontFamily={MONO} fontSize={fs} fill={hue} letterSpacing={1}>{text.slice(0, n)}</text>;
};
/** Dimension line |<---- label ---->| */
export const BpDim: React.FC<{ f: number; at: number; x1: number; x2: number; y: number; label: string }> = ({ f, at, x1, x2, y, label }) => (
  <g>
    <Draw d={`M${x1} ${y - 18} V${y + 18} M${x2} ${y - 18} V${y + 18} M${x1} ${y} H${x2}`} f={f} at={at} dur={16} stroke={C.blue} w={3} />
    <BpLabel f={f} at={at + 8} x={(x1 + x2) / 2} y={y - 18} text={label} />
  </g>
);

// ================= 2. SCREEN DEMO =================
export const Window: React.FC<{ x: number; y: number; w: number; h: number; title: string; dark?: boolean; children?: React.ReactNode; p?: number }> = ({ x, y, w, h, title, dark, children, p = 1 }) => {
  const s = 0.9 + 0.1 * eout(clamp01(p));
  return (
    <g opacity={clamp01(p * 1.4)} transform={`translate(${x + w / 2} ${y + h / 2}) scale(${s}) translate(${-w / 2} ${-h / 2})`}>
      <rect x={10} y={22} width={w} height={h} rx={28} fill="#000" opacity={0.35} />
      <rect width={w} height={h} rx={28} fill={dark ? "#0D1117" : "#F7F8FB"} stroke={dark ? "#30363D" : "#D7DBE6"} strokeWidth={3} />
      <path d={`M0 28 Q0 0 28 0 H${w - 28} Q${w} 0 ${w} 28 V72 H0Z`} fill={dark ? "#161B22" : "#E9ECF3"} />
      {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <circle key={i} cx={40 + i * 34} cy={36} r={11} fill={c} />)}
      <text x={w / 2} y={47} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={28} fill={dark ? "#8B949E" : "#59607A"}>{title}</text>
      <g transform="translate(0 72)">{children}</g>
    </g>
  );
};
/** Text that types itself between frames a..b (chars revealed linearly). */
export const typed = (f: number, a: number, b: number, s: string) => s.slice(0, Math.round(s.length * clamp01((f - a) / Math.max(1, b - a))));
export const Caret: React.FC<{ f: number; x: number; y: number; h?: number; color?: string }> = ({ f, x, y, h = 40, color = C.blue }) =>
  (Math.floor(f / 15) % 2 === 0 ? <rect x={x + 4} y={y - h * 0.8} width={4} height={h} fill={color} /> : null);
export const Pointer: React.FC<{ f: number; x: number; y: number; clickAt?: number }> = ({ f, x, y, clickAt }) => {
  const c = clickAt !== undefined ? clamp01(1 - Math.abs(f - clickAt - 3) / 6) : 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${1 - c * 0.15})`}>
      {c > 0 && <circle r={30 + c * 30} fill="none" stroke={C.blue} strokeWidth={5} opacity={c} />}
      <path d="M0 0 L0 58 L15 44 L26 70 L37 65 L26 40 L46 40 Z" fill="#fff" stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
    </g>
  );
};
/** wraps text into lines of ~n chars */
export const wrap = (s: string, n: number) => {
  const out: string[] = []; let cur = "";
  for (const w of s.split(" ")) { if ((cur + " " + w).trim().length > n) { out.push(cur.trim()); cur = w; } else cur += " " + w; }
  if (cur.trim()) out.push(cur.trim());
  return out;
};

// ================= 3. GLASS + KINETIC =================
const BLOBS = (f: number, hue: string[]) => (
  <g>
    <circle cx={260 + Math.sin(f * 0.012) * 90} cy={520 + Math.cos(f * 0.01) * 80} r={330} fill={hue[0]} />
    <circle cx={840 + Math.cos(f * 0.011) * 90} cy={1100 + Math.sin(f * 0.013) * 100} r={360} fill={hue[1]} />
    <circle cx={420 + Math.sin(f * 0.009 + 2) * 120} cy={1500} r={260} fill={hue[2]} />
  </g>
);
export const GlassBg: React.FC<{ f: number; hue?: string[]; id: string }> = ({ f, hue = ["#3B5BFF", "#9B4DFF", "#00C2FF"], id }) => (
  <g>
    <defs>
      <filter id={`gb${id}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={120} /></filter>
      <filter id={`gf${id}`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={36} /></filter>
    </defs>
    <rect width={VW} height={VH} fill="#070B1E" />
    <g filter={`url(#gb${id})`} opacity={0.85}>{BLOBS(f, hue)}</g>
  </g>
);
/** Frosted card: re-blurs the background blobs inside its own shape (fake backdrop-filter). */
export const Glass: React.FC<{ f: number; id: string; x: number; y: number; w: number; h: number; r?: number; hue?: string[]; tint?: string; p?: number; children?: React.ReactNode }> = ({ f, id, x, y, w, h, r = 44, hue = ["#3B5BFF", "#9B4DFF", "#00C2FF"], tint = "rgba(255,255,255,0.10)", p = 1, children }) => {
  if (p <= 0) return null;
  const s = 0.86 + 0.14 * eout(clamp01(p));
  return (
    <g opacity={clamp01(p * 1.5)} transform={`translate(${x + w / 2} ${y + h / 2}) scale(${s}) translate(${-x - w / 2} ${-y - h / 2})`}>
      <defs>
        <clipPath id={`gc${id}`}><rect x={x} y={y} width={w} height={h} rx={r} /></clipPath>
        <linearGradient id={`gl${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity={0.55} /><stop offset="0.5" stopColor="#fff" stopOpacity={0.08} /><stop offset="1" stopColor="#fff" stopOpacity={0.3} /></linearGradient>
        <filter id={`gfc${id}`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={40} /></filter>
      </defs>
      <rect x={x + 8} y={y + 26} width={w} height={h} rx={r} fill="#000" opacity={0.28} filter={`url(#gfc${id})`} />
      <g clipPath={`url(#gc${id})`}>
        <g filter={`url(#gfc${id})`}>{BLOBS(f, hue.map((c) => c))}</g>
        <rect x={x} y={y} width={w} height={h} fill={tint} />
        <rect x={x} y={y} width={w} height={h * 0.45} fill="#fff" opacity={0.06} />
      </g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke={`url(#gl${id})`} strokeWidth={3} />
      {children}
    </g>
  );
};
/** Kinetic word: rises + unblurs on its cue frame. */
export const Kinetic: React.FC<{ f: number; at: number; x: number; y: number; text: string; fs?: number; fill?: string; anchor?: "start" | "middle" | "end"; ls?: number; weight?: number }> = ({ f, at, x, y, text, fs = 120, fill = "#fff", anchor = "middle", ls = 0 }) => {
  const p = eout(ramp(f, at, at + 10));
  if (p <= 0) return null;
  return (
    <text x={x} y={y + (1 - p) * 40} textAnchor={anchor} fontFamily={FONT} fontWeight={800} fontSize={fs * (0.9 + 0.1 * eout(ramp(f, at, at + 14)))} fill={fill} opacity={p} letterSpacing={ls}
      style={{ filter: `blur(${((1 - p) * 8).toFixed(1)}px)` }}>{text}</text>
  );
};
/** Red strike-through line drawn across a word. */
export const Strike: React.FC<{ f: number; at: number; x1: number; x2: number; y: number; color?: string }> = ({ f, at, x1, x2, y, color = C.red }) => {
  const p = eio(ramp(f, at, at + 8));
  return p > 0 ? <path d={`M${x1} ${y + 8} L${lerp(x1, x2, p)} ${y - 8 * p}`} stroke={color} strokeWidth={16} strokeLinecap="round" /> : null;
};
export const Tick: React.FC<{ f: number; at: number; x: number; y: number; ok: boolean; s?: number }> = ({ f, at, x, y, ok, s = 1 }) => {
  const p = pop(f, at, 10);
  if (p <= 0) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${p * s})`}>
      <circle r={46} fill={ok ? C.green : C.red} />
      <path d={ok ? "M-22 0 L-6 16 L24 -16" : "M-18 -18 L18 18 M18 -18 L-18 18"} stroke="#fff" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  );
};

// ================= 4. ISOMETRIC =================
const COS = Math.cos(Math.PI / 6), SIN = Math.sin(Math.PI / 6);
/** world (x right-down, y left-down, z up) -> screen, around origin (ox, oy), scale u px per unit */
export const iso = (x: number, y: number, z: number, ox: number, oy: number, u: number): [number, number] => [ox + (x - y) * COS * u, oy + (x + y) * SIN * u - z * u];
const P = (pts: [number, number][]) => "M" + pts.map((p) => p.join(" ")).join(" L") + " Z";
export const shade = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (s: number) => Math.max(0, Math.min(255, Math.round(((n >> s) & 255) * k)));
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
};
export const IsoBox: React.FC<{ x: number; y: number; z: number; w: number; d: number; h: number; o: [number, number, number]; color: string; edge?: string; topContent?: React.ReactNode }> = ({ x, y, z, w, d, h, o, color, edge = "rgba(10,16,32,0.55)" }) => {
  const q = (a: number, b: number, c: number) => iso(a, b, c, o[0], o[1], o[2]);
  const top = P([q(x, y, z + h), q(x + w, y, z + h), q(x + w, y + d, z + h), q(x, y + d, z + h)]);
  const right = P([q(x + w, y, z), q(x + w, y + d, z), q(x + w, y + d, z + h), q(x + w, y, z + h)]);
  const left = P([q(x, y + d, z), q(x + w, y + d, z), q(x + w, y + d, z + h), q(x, y + d, z + h)]);
  return (
    <g strokeLinejoin="round">
      <path d={left} fill={shade(color, 0.72)} stroke={edge} strokeWidth={2} />
      <path d={right} fill={shade(color, 0.88)} stroke={edge} strokeWidth={2} />
      <path d={top} fill={color} stroke={edge} strokeWidth={2} />
    </g>
  );
};
export const IsoFloor: React.FC<{ o: [number, number, number]; n: number; color?: string }> = ({ o, n, color = "#18305E" }) => {
  const q = (a: number, b: number) => iso(a, b, 0, o[0], o[1], o[2]);
  return (
    <g>
      <path d={P([q(0, 0), q(n, 0), q(n, n), q(0, n)])} fill={color} />
      {[...Array(n + 1)].map((_, i) => <g key={i}><path d={`M${q(i, 0).join(" ")} L${q(i, n).join(" ")}`} stroke="#2E5AA8" strokeWidth={1.5} opacity={0.6} /><path d={`M${q(0, i).join(" ")} L${q(n, i).join(" ")}`} stroke="#2E5AA8" strokeWidth={1.5} opacity={0.6} /></g>)}
    </g>
  );
};
/** Friendly blocky robot built from iso boxes; faces the viewer-left (+y face). look 0..1 = eye glow; nod = head bob */
export const IsoRobot: React.FC<{ x: number; y: number; o: [number, number, number]; f: number; glow?: number; nod?: number }> = ({ x, y, o, f, glow = 1, nod = 0 }) => {
  const bob = Math.sin(f * 0.12) * 0.04 + nod;
  const q = (a: number, b: number, c: number) => iso(a, b, c, o[0], o[1], o[2]);
  const hz = 1.55 + bob;
  const e1 = q(x + 0.25, y + 0.9, hz + 0.32), e2 = q(x + 0.62, y + 0.9, hz + 0.32);
  return (
    <g>
      <IsoBox x={x + 0.15} y={y + 0.15} z={0} w={0.6} d={0.6} h={0.9} o={o} color="#C9D6F2" />
      <IsoBox x={x + 0.38} y={y + 0.38} z={0.9} w={0.14} d={0.14} h={0.3} o={o} color="#8FA3CC" />
      <IsoBox x={x} y={y} z={hz - 0.35} w={0.9} d={0.9} h={0.72} o={o} color="#E6EEFF" />
      <IsoBox x={x + 0.42} y={y + 0.42} z={hz + 0.37} w={0.06} d={0.06} h={0.25} o={o} color="#8FA3CC" />
      <circle cx={q(x + 0.45, y + 0.45, hz + 0.68)[0]} cy={q(x + 0.45, y + 0.45, hz + 0.68)[1]} r={9} fill={C.cyan} opacity={0.6 + 0.4 * Math.sin(f * 0.2)} />
      {[e1, e2].map(([ex, ey], i) => <ellipse key={i} cx={ex} cy={ey} rx={9} ry={12} fill={C.cyan} opacity={0.4 + 0.6 * glow} />)}
    </g>
  );
};

// ================= CHROME =================
/** Top-left "AGENT SCHOOL" pill + lesson tag, thin progress bar. Appears after the hook. */
export const LessonChrome: React.FC<{ f: number; total: number; lesson: string; from?: number }> = ({ f, total, lesson, from = 40 }) => {
  const p = eout(ramp(f, from, from + 14));
  return (
    <svg width={VW} height={VH} style={{ position: "absolute", inset: 0 }}>
      <rect x={0} y={0} width={VW * clamp01(f / total)} height={8} fill={C.cyan} />
      <g opacity={p} transform={`translate(${lerp(-300, 40, p)} 60)`}>
        <rect width={290} height={60} rx={30} fill="rgba(7,11,30,0.72)" stroke="rgba(255,255,255,0.35)" strokeWidth={2} />
        <rect x={10} y={10} width={40} height={40} rx={12} fill={C.blue} />
        <path d="M18 34 L30 18 L42 34 M22 29 H38" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x={62} y={40} fontFamily={FONT} fontWeight={800} fontSize={25} fill="#fff" letterSpacing={2}>AGENT SCHOOL</text>
        <rect x={300} width={lesson.length * 17 + 36} height={60} rx={30} fill={C.cyan} />
        <text x={300 + (lesson.length * 17 + 36) / 2} y={40} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={25} fill={C.ink} letterSpacing={2}>{lesson}</text>
      </g>
    </svg>
  );
};
