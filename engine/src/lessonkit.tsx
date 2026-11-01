// lessonkit.tsx — the LOCKED Agent School lesson look (approved by Uzair on Nov 1 2026 with Lesson 1).
// Reference video: reference/L001-ai-predicts/L001_final.mp4 — every new lesson must look like it.
//   • bright 2D classroom, BIG SCREEN on the wall, cartoon teacher (Teacher2D: side-part hair, glasses, navy blazer)
//   • a blue marker PEN writes/draws everything on the screen (Wr, DCard, DLine, DBar, DTick) in sync with the voice
//   • the lesson TITLE stays visible top-left for the whole video (TitleBar)
//   • word-by-word captions on a white band (CaptionBar), NO sound effects
//   • camera = one Director shot with keys between WIDE / SCREEN / FACE / MID
//   • voice = Uzair's ElevenLabs clone, eleven_v4 with emotion tags (ElevenLabs is used ONLY for voice)
// See docs/lesson-format.md for the step-by-step recipe; copy episodes/_template-lesson to start a new lesson.
import React from "react";
import { ramp, eio, eout, pop, clamp01, lerp, VW, VH } from "./kit";
import { FONT, Caps } from "./factkit";
import { Teacher2D, TeacherPose, LeftHand } from "./Teacher2D";

// ---------- palette (light classroom) ----------
export const K = { wall: "#F6EFE3", wall2: "#EFE5D3", floor: "#D9B98F", floor2: "#C9A679", ink: "#1E2A44", blue: "#2D7FF9", cyan: "#14B8D4", green: "#1FAF6B", red: "#E8453C", amber: "#F2A33A", violet: "#7A5CFA", soft: "#EEF4FF", grey: "#8A93A6" };
// ---------- big screen geometry (world coords) ----------
export const SX = 60, SY = 170, SW_ = 960, SH = 600;   // display area

// ================= PEN-WRITTEN BOARD PRIMITIVES (Uzair: "the pen should write all the things") =================
/** Marker pen sprite; tip at (0,0). */
export const Pen: React.FC<{ x: number; y: number; f: number }> = ({ x, y, f }) => (
  <g transform={`translate(${x} ${y + Math.sin(f * 1.9) * 2}) rotate(28)`}>
    <path d="M-8 -26 L0 0 L8 -26 Z" fill="#F3D9B1" stroke={K.ink} strokeWidth={3} strokeLinejoin="round" />
    <path d="M-3 -10 L0 0 L3 -10 Z" fill={K.ink} />
    <rect x={-10} y={-120} width={20} height={96} rx={6} fill={K.blue} stroke={K.ink} strokeWidth={3} />
    <rect x={-10} y={-128} width={20} height={16} rx={5} fill={K.ink} />
    <rect x={-4} y={-110} width={4} height={70} rx={2} fill="#fff" opacity={0.35} />
  </g>
);
let CLIP = 0;
/** call at the top of each screen render so clip ids stay stable */
export const resetClips = () => { CLIP = 0; };
/** text width for Inter 800 (measured in the browser when possible, else a per-glyph estimate) */
let MCTX: CanvasRenderingContext2D | null = null;
export const textW = (t: string, fs: number) => {
  try { if (!MCTX) MCTX = document.createElement("canvas").getContext("2d"); if (MCTX) { MCTX.font = `800 ${fs}px InterLocal, Inter, sans-serif`; const w = MCTX.measureText(t).width; if (w > 0) return w; } } catch (e) { /* fallback */ }
  let w = 0; for (const ch of t) w += /[A-Z]/.test(ch) ? 0.7 : /[a-z]/.test(ch) ? 0.57 : /[0-9]/.test(ch) ? 0.62 : ch === " " ? 0.28 : 0.42;
  return w * fs;
};
/** Text written left→right by the pen. */
export const Wr: React.FC<{ f: number; at: number; x: number; y: number; fs: number; t: string; c?: string; a?: "start" | "middle" | "end"; dur?: number; o?: number }> = ({ f, at, x, y, fs, t, c = K.ink, a = "middle", dur, o = 1 }) => {
  const d = dur ?? Math.max(8, Math.min(42, t.length * 1.15));
  const p = clamp01((f - at) / d);
  if (p <= 0) return null;
  const w = textW(t, fs) * 1.04;
  const x0 = a === "middle" ? x - w / 2 : a === "end" ? x - w : x;
  const id = `wr${CLIP++}`;
  return (
    <g opacity={o}>
      <defs><clipPath id={id}><rect x={x0 - 8} y={y - fs * 1.05} width={(w + 16) * p} height={fs * 1.45} /></clipPath></defs>
      <g clipPath={p < 1 ? `url(#${id})` : undefined}><text x={x} y={y} textAnchor={a} fontFamily={FONT} fontWeight={800} fontSize={fs} fill={c}>{t}</text></g>
      {p < 1 && <Pen x={x0 + w * p} y={y - fs * 0.22} f={f} />}
    </g>
  );
};
/** Card whose outline the pen draws, then the fill fades in; children appear after the outline. */
export const DCard: React.FC<{ f: number; at: number; x: number; y: number; w: number; h: number; fill?: string; stroke?: string; r?: number; dur?: number; children?: React.ReactNode }> = ({ f, at, x, y, w, h, fill = "#fff", stroke = "#C9D6EA", r = 22, dur = 14, children }) => {
  const p = clamp01((f - at) / dur);
  if (p <= 0) return null;
  const per = 2 * (w + h), dpos = per * p;
  const pt = dpos < w ? [x + dpos, y] : dpos < w + h ? [x + w, y + dpos - w] : dpos < 2 * w + h ? [x + w - (dpos - w - h), y + h] : [x, y + h - (dpos - 2 * w - h)];
  const fo = clamp01((p - 0.6) / 0.4);
  return (
    <g>
      <rect x={x + 4} y={y + 8} width={w} height={h} rx={r} fill="#1E2A44" opacity={0.08 * fo} />
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} opacity={fo} />
      <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke={stroke} strokeWidth={4} pathLength={1} strokeDasharray={`${p} 1`} />
      {p >= 0.6 && children}
      {p < 1 && <Pen x={pt[0]} y={pt[1]} f={f} />}
    </g>
  );
};
/** Straight stroke drawn by the pen (strikes, arrows, underlines). */
export const DLine: React.FC<{ f: number; at: number; x1: number; y1: number; x2: number; y2: number; c?: string; w?: number; dur?: number; head?: boolean }> = ({ f, at, x1, y1, x2, y2, c = K.blue, w = 8, dur = 10, head }) => {
  const p = eio(clamp01((f - at) / dur));
  if (p <= 0) return null;
  const ex = lerp(x1, x2, p), ey = lerp(y1, y2, p), an = Math.atan2(y2 - y1, x2 - x1);
  return (
    <g>
      <path d={`M${x1} ${y1} L${ex} ${ey}`} stroke={c} strokeWidth={w} strokeLinecap="round" />
      {head && p >= 1 && <path d={`M${x2 - 26 * Math.cos(an - 0.5)} ${y2 - 26 * Math.sin(an - 0.5)} L${x2} ${y2} L${x2 - 26 * Math.cos(an + 0.5)} ${y2 - 26 * Math.sin(an + 0.5)}`} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />}
      {p < 1 && <Pen x={ex} y={ey} f={f} />}
    </g>
  );
};
/** Bar that the pen colours in. */
export const DBar: React.FC<{ f: number; at: number; x: number; y: number; w: number; h: number; c: string; dur?: number }> = ({ f, at, x, y, w, h, c, dur = 16 }) => {
  const p = eout(clamp01((f - at) / dur)); if (p <= 0) return null;
  return <g><rect x={x} y={y} width={Math.max(h, w * p)} height={h} rx={h / 2} fill={c} />{p < 1 && <Pen x={x + w * p} y={y + h / 2} f={f} />}</g>;
};
/** Hand-drawn tick / cross in a circle. */
export const DTick: React.FC<{ f: number; at: number; x: number; y: number; ok: boolean; s?: number }> = ({ f, at, x, y, ok, s = 1 }) => {
  const p = clamp01((f - at) / 14); if (p <= 0) return null;
  const c = ok ? K.green : K.red;
  const pc = clamp01(p / 0.5), pm = clamp01((p - 0.5) / 0.5);
  const tip = ok ? (pm < 0.35 ? [lerp(-18, -5, pm / 0.35), lerp(0, 13, pm / 0.35)] : [lerp(-5, 20, (pm - 0.35) / 0.65), lerp(13, -13, (pm - 0.35) / 0.65)]) : [lerp(-15, 15, pm), lerp(-15, 15, pm)];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={38} fill="none" stroke={c} strokeWidth={7} pathLength={1} strokeDasharray={`${pc} 1`} transform="rotate(-90)" />
      {pm > 0 && <path d={ok ? "M-18 0 L-5 13 L20 -13" : "M-15 -15 L15 15 M15 -15 L-15 15"} stroke={c} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" fill="none" pathLength={1} strokeDasharray={`${pm} 1`} />}
      {p < 1 && <Pen x={pm > 0 ? tip[0] : Math.cos(pc * 6.28 - 1.57) * 38} y={pm > 0 ? tip[1] : Math.sin(pc * 6.28 - 1.57) * 38} f={f} />}
    </g>
  );
};
export const typed = (f: number, a: number, b: number, s: string) => s.slice(0, Math.round(s.length * clamp01((f - a) / Math.max(1, b - a))));


// ================= CLASSROOM =================
export const Classroom: React.FC<{ f: number; pose: TeacherPose; screen: React.ReactNode }> = ({ f, pose, screen }) => (
  <g>
    <rect width={VW} height={VH} fill={K.wall} />
    <rect y={0} width={VW} height={120} fill={K.wall2} />
    {/* wainscot + floor */}
    <rect y={1240} width={VW} height={200} fill="#E8DCC6" />
    <path d="M0 1240 H1080" stroke="#CDBB9C" strokeWidth={6} />
    <rect y={1440} width={VW} height={480} fill={K.floor} />
    {[...Array(10)].map((_, i) => <path key={i} d={`M${i * 120} 1440 L${i * 120 - 80} 1920`} stroke={K.floor2} strokeWidth={3} />)}
    {/* window + plant (right) */}
    <g transform="translate(800 880)">
      <rect width={230} height={300} rx={12} fill="#CFE8FF" stroke="#B9A07A" strokeWidth={10} />
      <path d="M115 0 V300 M0 150 H230" stroke="#B9A07A" strokeWidth={8} />
      <circle cx={170} cy={70} r={30} fill="#FFE08A" opacity={0.8} />
    </g>
    <g transform="translate(900 1300)">
      <path d="M-46 0 H46 L36 120 H-36 Z" fill="#E07B4F" stroke={K.ink} strokeWidth={4} strokeLinejoin="round" />
      {[[-30, -60, -20], [0, -90, 0], [30, -64, 18], [-12, -40, -35], [18, -36, 35]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={22} ry={52} fill={i % 2 ? "#3FA463" : "#56BE79"} stroke={K.ink} strokeWidth={3} transform={`rotate(${r} ${x} ${y + 40})`} />)}
    </g>
    {/* desk (right, front) */}
    <g transform="translate(600 1420)">
      <rect x={0} y={0} width={420} height={36} rx={8} fill="#C98F55" stroke={K.ink} strokeWidth={4} />
      <rect x={20} y={36} width={24} height={200} fill="#A8743F" stroke={K.ink} strokeWidth={4} />
      <rect x={376} y={36} width={24} height={200} fill="#A8743F" stroke={K.ink} strokeWidth={4} />
      <rect x={250} y={-90} width={130} height={90} rx={8} fill="#2B3445" stroke={K.ink} strokeWidth={4} />
      <rect x={262} y={-80} width={106} height={66} rx={4} fill="#DCEBFF" />
      <rect x={230} y={-4} width={170} height={10} rx={4} fill="#9AA6B8" stroke={K.ink} strokeWidth={3} />
      <rect x={40} y={-60} width={70} height={60} rx={6} fill={K.blue} stroke={K.ink} strokeWidth={4} />
      <rect x={60} y={-80} width={64} height={22} rx={4} fill={K.amber} stroke={K.ink} strokeWidth={3} />
    </g>
    {/* big screen */}
    <rect x={SX - 26} y={SY - 26} width={SW_ + 52} height={SH + 52} rx={28} fill="#1C2230" stroke={K.ink} strokeWidth={6} />
    <rect x={SX} y={SY} width={SW_} height={SH} rx={12} fill="#FFFFFF" />
    <svg x={SX} y={SY} width={SW_} height={SH} viewBox={`0 0 ${SW_} ${SH}`} overflow="hidden">{screen}</svg>
    <path d={`M${SX + 20} ${SY + 20} L${SX + 260} ${SY + 20} L${SX + 120} ${SY + 260} Z`} fill="#fff" opacity={0.08} />
    <circle cx={SX + SW_ - 10} cy={SY + SH + 12} r={6} fill="#34D399" />
    <rect x={460} y={SY + SH + 26} width={160} height={22} rx={6} fill="#2B3445" />
    {/* teacher */}
    <g transform="translate(-10 860) scale(1.42)"><Teacher2D pose={pose} /></g>
  </g>
);


// ================= TITLE (visible the whole video) + PROGRESS + CAPTIONS =================
export const TitleBar: React.FC<{ f: number; total: number; lesson: number; module: string; title: string }> = ({ f, total, lesson, module, title }) => (
  <svg width={VW} height={VH} style={{ position: "absolute", inset: 0 }}>
    <rect x={0} y={0} width={VW * clamp01(f / total)} height={8} fill={K.blue} />
    <g transform="translate(28 28)">
      <rect width={Math.max(520, 120 + title.length * 17)} height={92} rx={22} fill="rgba(255,255,255,0.95)" stroke="#D5DEEE" strokeWidth={3} />
      <rect x={10} y={10} width={72} height={72} rx={16} fill={K.blue} />
      <text x={46} y={40} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={14} fill="#fff">LESSON</text>
      <text x={46} y={72} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill="#fff">{lesson}</text>
      <text x={98} y={40} fontFamily={FONT} fontWeight={800} fontSize={20} fill={K.blue} letterSpacing={2}>{`AGENT SCHOOL · ${module}`}</text>
      <text x={98} y={74} fontFamily={FONT} fontWeight={800} fontSize={30} fill={K.ink}>{title}</text>
    </g>
  </svg>
);
export const CaptionBar: React.FC<{ f: number; words: [number, number, string][]; chunks: [number, number][] }> = ({ f, words, chunks }) => (
  <>
    <div style={{ position: "absolute", left: 30, right: 30, top: 1592, height: 112, borderRadius: 40, background: "rgba(255,255,255,0.92)", boxShadow: "0 10px 28px rgba(30,42,68,0.18)" }} />
    <Caps f={f} words={words} chunks={chunks} accent={K.blue} theme="light" y={1610} />
  </>
);

// ================= TEACHER PERFORMANCE =================
/** point: keyframes [frame, 0..1] (1 = pointer up at the screen); hands: [fromFrame, gesture]; brows: [from, to] eyebrow-raise windows. */
export const perform = (f: number, ENV: number[], opt: { point: [number, number][]; hands: [number, LeftHand][]; brows?: [number, number][] }): TeacherPose => {
  const talk = Math.max(0, ENV[Math.max(0, f - 15)] ?? 0);
  const bq = (f + 11) % 97, blink = bq < 5 ? Math.sin((bq / 5) * Math.PI) : 0;
  const P = opt.point; let point = P[0][1];
  for (let i = 0; i < P.length - 1; i++) { const [a, va] = P[i], [b, vb] = P[i + 1]; if (f >= a && f <= b) point = lerp(va, vb, eio(clamp01((f - a) / Math.max(1, Math.min(14, b - a))))); }
  if (f > P[P.length - 1][0]) point = P[P.length - 1][1];
  let leftHand: LeftHand = "openPalm"; for (const [at, h] of opt.hands) if (f >= at) leftHand = h;
  const up = (opt.brows ?? []).some(([a, b]) => f >= a && f < b);
  return { talk, blink, brow: up ? 0.9 : talk > 0.5 ? 0.3 : 0, point, leftHand, pointWiggle: Math.sin(f * 0.09) * 4,
    bob: Math.sin(f * 0.12) * 2 + talk * 2, headTilt: Math.sin(f * 0.035) * 3, lookX: point > 0.5 ? 0.6 : 0, smile: 0.85 };
};
// ================= CAMERA PRESETS (for factkit Director) =================
export const CAMS = { WIDE: { x: 540, y: 960, z: 1 }, SCREEN: { x: 540, y: 640, z: 1.08 }, FACE: { x: 230, y: 1150, z: 1.85 }, MID: { x: 420, y: 980, z: 1.22 } };
// Rule learned on L001: never use MID/FACE while the pen is still writing — they crop the screen. Use SCREEN or WIDE then.

// ================= THUMBNAIL LAYOUT =================
export const LessonThumbLayout: React.FC<{ tag: string; line1: string; strike?: string; line2: string; bubble1: string; bubble2: string; pose?: TeacherPose; fs1?: number; fs2?: number; fs3?: number }> = ({ tag, line1, strike, line2, bubble1, bubble2, pose, fs1 = 150, fs2 = 190, fs3 = 136 }) => (
  <svg width={VW} height={VH} viewBox={`0 0 ${VW} ${VH}`}>
    <rect width={VW} height={VH} fill={K.wall} />
    <rect y={1300} width={VW} height={620} fill={K.floor} />
    {[...Array(10)].map((_, i) => <path key={i} d={`M${i * 120} 1300 L${i * 120 - 80} 1920`} stroke={K.floor2} strokeWidth={3} />)}
    {[...Array(16)].map((_, i) => { const a1 = (i / 16) * Math.PI * 2, a2 = a1 + Math.PI / 22; return <path key={i} d={`M540 700 L${540 + Math.cos(a1) * 1600} ${700 + Math.sin(a1) * 1600} L${540 + Math.cos(a2) * 1600} ${700 + Math.sin(a2) * 1600} Z`} fill="#FFFFFF" opacity={0.35} />; })}
    <g transform="translate(540 110)"><rect x={-300} y={-50} width={600} height={92} rx={46} fill={K.blue} stroke={K.ink} strokeWidth={6} /><text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill="#fff" letterSpacing={3}>{tag}</text></g>
    <rect x={34} y={210} width={1012} height={720} rx={30} fill="#1C2230" stroke={K.ink} strokeWidth={8} />
    <rect x={60} y={236} width={960} height={668} rx={14} fill="#fff" />
    <text x={540} y={420} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={fs1} fill={K.ink}>{line1}</text>
    {strike && <><text x={540} y={600} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={fs2} fill={K.ink}>{strike}</text><path d="M250 540 L830 512" stroke={K.red} strokeWidth={30} strokeLinecap="round" /></>}
    <text x={540} y={strike ? 810 : 640} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={fs3} fill={K.blue}>{line2}</text>
    <g transform="translate(985 880) rotate(28) scale(0.8)"><path d="M-14 -46 L0 0 L14 -46 Z" fill="#F3D9B1" stroke={K.ink} strokeWidth={5} strokeLinejoin="round" /><rect x={-18} y={-210} width={36} height={170} rx={10} fill={K.blue} stroke={K.ink} strokeWidth={5} /></g>
    <g transform="translate(-40 1010) scale(1.72)"><Teacher2D pose={pose ?? { point: 0.95, talk: 0.9, brow: 1.1, smile: 0.6, leftHand: "openPalm", lookX: 0.3 }} /></g>
    <g transform="translate(790 1230) rotate(-6)"><rect x={-250} y={-80} width={500} height={160} rx={36} fill={K.amber} stroke={K.ink} strokeWidth={7} /><text y={-6} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={62} fill={K.ink}>{bubble1}</text><text y={58} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={K.ink}>{bubble2}</text></g>
  </svg>
);
