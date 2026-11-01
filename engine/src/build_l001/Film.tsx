// Agent School · M1 · Lesson 1 — "AI Doesn't Think — It Predicts"  (projects/l001/)
// Look v2 (Uzair, Nov 1): bright 2D classroom, cartoon teacher (Teacher2D: side-part hair, glasses, navy blazer),
// a BIG SCREEN on the wall that shows the lesson graphics, camera moves between wide / screen / teacher close-up.
// Voice: Uzair's ElevenLabs clone (take C, eleven_v4 with emotion tags). No sound effects.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle, ramp, eio, eout, pop, clamp01, lerp, VW, VH } from "./kit";
import { Narration, Caps, FONT, Director, Shot, countUp } from "./factkit";
import { Teacher2D, TeacherPose, LeftHand } from "./Teacher2D";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const W = (word: string, n = 1): number => {
  let k = 0;
  for (const w of WORDS) if (norm(w[2]) === word && ++k === n) return w[0];
  throw new Error(`cue word not found: ${word} #${n}`);
};
const F = {
  ai: W("ai"), think: W("think"), it: W("it"), predicts: W("predicts"), welcome: W("welcome"),
  when: W("when"), chatgpt: W("chatgpt"), one2: W("one", 2), predicting: W("predicting"),
  then1: W("then", 1), then2: W("then", 2), thousands: W("thousands"),
  heres: W("heres"), keyboard: W("keyboard"), suggests: W("suggests"), word2: W("word", 2), trained: W("trained"),
  now: W("now"), whole: W("whole"), internet: W("internet"), books: W("books"), code: W("code"),
  websites: W("websites"), trillions: W("trillions"), large: W("large"), same2: W("same", 2), unimaginable: W("unimaginable"),
  feels: W("feels"), seen: W("seen"), learned: W("learned"), patterns: W("patterns"), ask: W("ask", 2), continues: W("continues"),
  but: W("but"), catch: W("catch"), prediction: W("prediction"), tru: W("true"), only: W("only"), likely: W("likely"),
  paris1: W("paris", 1), follows: W("follows"), france: W("france"), paris2: W("paris", 2), not2: W("not", 2),
  because2: W("because", 2), probable: W("probable"), brilliant: W("brilliant"), confidently: W("confidently"),
  sentence: W("sentence"), dont: W("dont", 1), fix: W("fix"),
  remember: W("remember"), mind: W("mind"), worlds: W("worlds"), most: W("most"), autocomplete: W("autocomplete"),
  tomorrow: W("tomorrow", 1), machines: W("machines"), agent2: W("agent", 2), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

// ---------- palette (light classroom) ----------
const K = { wall: "#F6EFE3", wall2: "#EFE5D3", floor: "#D9B98F", floor2: "#C9A679", ink: "#1E2A44", blue: "#2D7FF9", cyan: "#14B8D4", green: "#1FAF6B", red: "#E8453C", amber: "#F2A33A", violet: "#7A5CFA", soft: "#EEF4FF", grey: "#8A93A6" };
// ---------- big screen geometry (world coords) ----------
const SX = 60, SY = 170, SW_ = 960, SH = 600;   // display area
const T = (s: string, x: number, y: number, fs: number, c = K.ink, a: "start" | "middle" | "end" = "middle", o = 1) =>
  <text x={x} y={y} textAnchor={a} fontFamily={FONT} fontWeight={800} fontSize={fs} fill={c} opacity={o}>{s}</text>;
const rise = (f: number, at: number, d = 10) => eout(ramp(f, at, at + d));
const Up: React.FC<{ f: number; at: number; children: React.ReactNode }> = ({ f, at, children }) => {
  const p = rise(f, at); return p > 0 ? <g opacity={p} transform={`translate(0 ${(1 - p) * 26})`}>{children}</g> : null;
};
const Tick: React.FC<{ f: number; at: number; x: number; y: number; ok: boolean; s?: number }> = ({ f, at, x, y, ok, s = 1 }) => {
  const p = pop(f, at, 10); if (p <= 0) return null;
  return (<g transform={`translate(${x} ${y}) scale(${p * s})`}><circle r={38} fill={ok ? K.green : K.red} />
    <path d={ok ? "M-18 0 L-5 13 L20 -13" : "M-15 -15 L15 15 M15 -15 L-15 15"} stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" fill="none" /></g>);
};
const Card: React.FC<{ x: number; y: number; w: number; h: number; fill?: string; stroke?: string; r?: number; children?: React.ReactNode }> = ({ x, y, w, h, fill = "#fff", stroke = "#D5DEEE", r = 22, children }) => (
  <g><rect x={x + 4} y={y + 8} width={w} height={h} rx={r} fill="#1E2A44" opacity={0.08} /><rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={3} />{children}</g>
);

// ================= PEN-WRITTEN BOARD PRIMITIVES (Uzair: "the pen should write all the things") =================
/** Marker pen sprite; tip at (0,0). */
const Pen: React.FC<{ x: number; y: number; f: number }> = ({ x, y, f }) => (
  <g transform={`translate(${x} ${y + Math.sin(f * 1.9) * 2}) rotate(28)`}>
    <path d="M-8 -26 L0 0 L8 -26 Z" fill="#F3D9B1" stroke={K.ink} strokeWidth={3} strokeLinejoin="round" />
    <path d="M-3 -10 L0 0 L3 -10 Z" fill={K.ink} />
    <rect x={-10} y={-120} width={20} height={96} rx={6} fill={K.blue} stroke={K.ink} strokeWidth={3} />
    <rect x={-10} y={-128} width={20} height={16} rx={5} fill={K.ink} />
    <rect x={-4} y={-110} width={4} height={70} rx={2} fill="#fff" opacity={0.35} />
  </g>
);
let CLIP = 0;
/** text width for Inter 800 (measured in the browser when possible, else a per-glyph estimate) */
let MCTX: CanvasRenderingContext2D | null = null;
const textW = (t: string, fs: number) => {
  try { if (!MCTX) MCTX = document.createElement("canvas").getContext("2d"); if (MCTX) { MCTX.font = `800 ${fs}px InterLocal, Inter, sans-serif`; const w = MCTX.measureText(t).width; if (w > 0) return w; } } catch (e) { /* fallback */ }
  let w = 0; for (const ch of t) w += /[A-Z]/.test(ch) ? 0.7 : /[a-z]/.test(ch) ? 0.57 : /[0-9]/.test(ch) ? 0.62 : ch === " " ? 0.28 : 0.42;
  return w * fs;
};
/** Text written left→right by the pen. */
const Wr: React.FC<{ f: number; at: number; x: number; y: number; fs: number; t: string; c?: string; a?: "start" | "middle" | "end"; dur?: number; o?: number }> = ({ f, at, x, y, fs, t, c = K.ink, a = "middle", dur, o = 1 }) => {
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
const DCard: React.FC<{ f: number; at: number; x: number; y: number; w: number; h: number; fill?: string; stroke?: string; r?: number; dur?: number; children?: React.ReactNode }> = ({ f, at, x, y, w, h, fill = "#fff", stroke = "#C9D6EA", r = 22, dur = 14, children }) => {
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
const DLine: React.FC<{ f: number; at: number; x1: number; y1: number; x2: number; y2: number; c?: string; w?: number; dur?: number; head?: boolean }> = ({ f, at, x1, y1, x2, y2, c = K.blue, w = 8, dur = 10, head }) => {
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
const DBar: React.FC<{ f: number; at: number; x: number; y: number; w: number; h: number; c: string; dur?: number }> = ({ f, at, x, y, w, h, c, dur = 16 }) => {
  const p = eout(clamp01((f - at) / dur)); if (p <= 0) return null;
  return <g><rect x={x} y={y} width={Math.max(h, w * p)} height={h} rx={h / 2} fill={c} />{p < 1 && <Pen x={x + w * p} y={y + h / 2} f={f} />}</g>;
};
/** Hand-drawn tick / cross in a circle. */
const DTick: React.FC<{ f: number; at: number; x: number; y: number; ok: boolean; s?: number }> = ({ f, at, x, y, ok, s = 1 }) => {
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
const typed = (f: number, a: number, b: number, s: string) => s.slice(0, Math.round(s.length * clamp01((f - a) / Math.max(1, b - a))));

// ================= SCREEN CONTENT (local 0..960 x 0..600) — everything written/drawn by the pen =================
const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  CLIP = 0;
  const f = f0 < 15 ? F.welcome + 60 : f0;
  if (f < F.when) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 1" c={K.blue} dur={10} />
      <Wr f={f} at={F.ai} x={480} y={210} fs={100} t="AI DOESN'T" dur={18} />
      <Wr f={f} at={F.think} x={480} y={340} fs={126} t="THINK" dur={12} />
      <DLine f={f} at={F.think + 13} x1={300} y1={300} x2={660} y2={284} c={K.red} w={18} dur={8} />
      <Wr f={f} at={F.it} x={480} y={480} fs={106} t="IT PREDICTS." c={K.blue} dur={20} />
      <Wr f={f} at={F.predicts + 12} x={480} y={552} fs={30} t="the next word → the next word → the next…" c={K.grey} dur={26} />
    </g>
  );
  if (f < F.heres) { // CHAT DEMO (the chat UI types like a real app; the pen annotates beside it)
    const q = "Why is the sky blue?";
    const REPLY = "Sunlight scatters off tiny air molecules, and blue light scatters the most, so the whole sky glows blue.".split(" ");
    let n = 0; if (f >= F.predicting) n = 1; if (f >= F.then1) n = 2; if (f >= F.then2) n = 3;
    if (f >= F.thousands) n = 3 + Math.floor((REPLY.length - 3) * eio(ramp(f, F.thousands, F.thousands + 60)));
    const sent = f >= F.chatgpt + 30;
    const cands: [string, number][][] = [[["Sunlight", 41], ["Because", 28], ["The", 19]], [["scatters", 52], ["is", 23], ["hits", 11]], [["off", 47], ["in", 30], ["when", 9]]];
    const ci = f < F.then1 ? 0 : f < F.then2 ? 1 : 2, cat = ci === 0 ? F.predicting : ci === 1 ? F.then1 : F.then2;
    const reply = REPLY.slice(0, n).join(" ");
    const lines: string[] = []; let cur = ""; for (const w of reply.split(" ")) { if ((cur + " " + w).length > 34) { lines.push(cur.trim()); cur = w; } else cur += " " + w; } if (cur.trim()) lines.push(cur.trim());
    return (
      <g>
        <DCard f={f} at={F.when - 14} x={40} y={30} w={560} h={540} dur={14}>
          <rect x={40} y={30} width={560} height={60} rx={22} fill="#EEF2F8" />
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <circle key={i} cx={74 + i * 26} cy={60} r={9} fill={c} />)}
          <text x={320} y={70} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={26} fill={K.grey}>AI Chat</text>
          {sent && <g opacity={eout(ramp(f, F.chatgpt + 30, F.chatgpt + 40))}><rect x={300} y={110} width={280} height={58} rx={29} fill={K.blue} /><text x={440} y={148} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={24} fill="#fff">{q}</text></g>}
          {sent && <g opacity={eout(ramp(f, F.chatgpt + 40, F.chatgpt + 50))}>
            <circle cx={84} cy={214} r={24} fill={K.ink} /><path d="M73 222 L84 204 L95 222 M77 216 H91" stroke={K.cyan} strokeWidth={4} fill="none" strokeLinecap="round" />
            <rect x={120} y={190} width={460} height={Math.max(60, 26 + lines.length * 40)} rx={18} fill="#F4F7FC" stroke="#D5DEEE" strokeWidth={2} />
            {n === 0 && [0, 1, 2].map((i) => <circle key={i} cx={150 + i * 24} cy={220} r={8} fill={K.grey} opacity={0.4 + 0.6 * Math.abs(Math.sin(f * 0.15 + i))} />)}
            {lines.map((l, i) => <text key={i} x={140} y={226 + i * 40} fontFamily={FONT} fontWeight={800} fontSize={26} fill={K.ink}>{l}</text>)}
          </g>}
          <rect x={64} y={490} width={512} height={56} rx={28} fill="#fff" stroke={sent ? "#D5DEEE" : K.blue} strokeWidth={3} />
          <text x={90} y={527} fontFamily={FONT} fontWeight={800} fontSize={24} fill={sent ? "#A0A7BD" : K.ink}>{sent ? "Message…" : typed(f, F.when + 4, F.chatgpt + 24, q) || "Message…"}</text>
        </DCard>
        {f < F.thousands + 2 && <>
          <DCard f={f} at={F.one2 - 6} x={630} y={50} w={300} h={120} fill={K.soft} stroke={K.blue}>
            <Wr f={f} at={F.one2 + 4} x={780} y={98} fs={26} t="ONE JOB:" c={K.blue} dur={8} />
            <Wr f={f} at={F.one2 + 12} x={780} y={142} fs={24} t="predict the next word" dur={18} />
          </DCard>
          <DCard f={f} at={F.predicting - 10} x={630} y={200} w={300} h={270}>
            <Wr f={f} at={F.predicting} x={780} y={244} fs={24} t={`next word #${ci + 1} ?`} c={K.grey} dur={10} />
            {cands[ci].map(([w, pc], i) => (
              <g key={w + ci}>
                <Wr f={f} at={cat + 2 + i * 6} x={652} y={310 + i * 58} fs={24} t={w} c={i === 0 ? K.ink : K.grey} a="start" dur={8} />
                <DBar f={f} at={cat + 8 + i * 6} x={782} y={290 + i * 58} w={100 * (pc / 52)} h={24} c={i === 0 ? K.green : "#C9D3E6"} dur={10} />
                {f >= cat + 18 + i * 6 && <text x={916} y={312 + i * 58} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={20} fill={i === 0 ? K.green : K.grey}>{pc}%</text>}
              </g>
            ))}
          </DCard>
        </>}
        {f >= F.thousands - 4 && <DCard f={f} at={F.thousands - 4} x={630} y={140} w={300} h={240} fill={K.soft} stroke={K.green}>
          <Wr f={f} at={F.thousands + 6} x={780} y={204} fs={26} t="next-word" c={K.grey} dur={8} />
          <Wr f={f} at={F.thousands + 12} x={780} y={240} fs={26} t="predictions" c={K.grey} dur={10} />
          {f >= F.thousands + 22 && <text x={780} y={326} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={64} fill={K.green}>{countUp(f, F.thousands + 22, F.thousands + 80, 1280).toLocaleString("en-US")}</text>}
        </DCard>}
        {f >= F.thousands && <Wr f={f} at={F.thousands + 40} x={780} y={430} fs={26} t="…for EVERY answer" dur={16} />}
      </g>
    );
  }
  if (f < F.feels - 20) { // PHONE -> INTERNET -> LLM
    const sugg = ["you", "the", "I'm"];
    return (
      <g>
        <DCard f={f} at={F.heres} x={60} y={40} w={220} h={400} r={36} stroke={K.ink} dur={16}>
          <rect x={140} y={56} width={60} height={8} rx={4} fill={K.ink} />
          <rect x={82} y={100} width={150} height={34} rx={14} fill={K.blue} /><rect x={100} y={146} width={130} height={34} rx={14} fill="#E6ECF5" />
          {sugg.map((t, i) => <DCard key={t} f={f} at={F.suggests + i * 5} x={74 + i * 66} y={236} w={58} h={42} r={10} fill={f >= F.word2 && i === 0 ? K.green : K.soft} stroke={f >= F.word2 && i === 0 ? K.green : "#C9D3E6"} dur={6}>
            <text x={103 + i * 66} y={264} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={20} fill={f >= F.word2 && i === 0 ? "#fff" : K.ink}>{t}</text></DCard>)}
          {[0, 1, 2].map((r) => [...Array(6 - r)].map((_, k) => <rect key={`${r}${k}`} x={84 + r * 12 + k * 28} y={300 + r * 38} width={22} height={30} rx={5} fill="#E6ECF5" opacity={eout(ramp(f, F.keyboard + (r * 6 + k) * 0.6, F.keyboard + 6 + (r * 6 + k) * 0.6))} />))}
        </DCard>
        <Wr f={f} at={F.keyboard - 4} x={170} y={480} fs={26} t="YOUR PHONE" c={K.grey} dur={10} />
        <Wr f={f} at={F.trained} x={170} y={530} fs={24} t="trained on your texts" c={K.blue} dur={16} />
        <DLine f={f} at={F.now} x1={300} y1={240} x2={400} y2={240} c={K.blue} w={8} dur={10} head />
        <DCard f={f} at={F.whole - 6} x={420} y={30} w={500} h={120} fill={K.soft} stroke={K.blue}>
          <Wr f={f} at={F.whole + 6} x={670} y={104} fs={40} t="THE WHOLE INTERNET" c={K.blue} dur={18} />
        </DCard>
        {([["📚", "books", F.books, 470], ["</>", "code", F.code, 640], ["🌐", "websites", F.websites, 810]] as [string, string, number, number][]).map(([ic, lb, at, x]) => (
          <DCard key={lb} f={f} at={at - 4} x={x - 70} y={175} w={140} h={130} dur={10}>
            <text x={x} y={248} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={ic.length > 2 ? 44 : 50} fill={K.ink}>{ic}</text>
            <Wr f={f} at={at + 6} x={x} y={290} fs={22} t={lb} c={K.grey} dur={8} />
          </DCard>
        ))}
        <Wr f={f} at={F.trillions} x={670} y={362} fs={38} t="TRILLIONS OF WORDS" c={K.amber} dur={16} />
        <DCard f={f} at={F.large - 8} x={420} y={390} w={500} h={170} fill={K.ink} stroke={K.ink}>
          <Wr f={f} at={F.large + 4} x={670} y={458} fs={36} t="LARGE LANGUAGE MODEL" c="#fff" dur={18} />
          <Wr f={f} at={F.same2} x={670} y={512} fs={24} t="same trick · unimaginable scale" c={K.cyan} dur={22} />
        </DCard>
      </g>
    );
  }
  if (f < F.but - 6) { // WHY IT FEELS SMART
    return (
      <g>
        <Wr f={f} at={F.feels - 18} x={480} y={80} fs={52} t="WHY IT FEELS SO SMART" c={K.blue} dur={20} />
        <Wr f={f} at={F.seen} x={480} y={150} fs={30} t="it has seen almost every question" dur={22} />
        {[...Array(6)].map((_, k) => { const n = Math.round(6 * eout(ramp(f, F.seen + 20 + k * 6, F.seen + 60 + k * 6))); const x = 90 + k * 140; return (
          <g key={k}>{[...Array(n)].map((_, i) => <g key={i}><rect x={x - 50} y={360 - i * 34} width={100} height={28} rx={8} fill={["#DCEBFF", "#FFE7C2", "#DDF6E8", "#EDE5FF", "#FFE0E3", "#D9F4F8"][k]} stroke={K.ink} strokeWidth={2.5} /><text x={x} y={382 - i * 34} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={22} fill={K.ink}>?</text></g>)}</g>); })}
        {[...Array(6)].map((_, k) => <DLine key={k} f={f} at={F.patterns + k * 3} x1={90 + k * 140} y1={190} x2={480} y2={430} c={K.cyan} w={4} dur={8} />)}
        <DCard f={f} at={F.patterns + 16} x={330} y={430} w={300} h={80} fill={K.ink} stroke={K.ink} dur={10}>
          <Wr f={f} at={F.patterns + 24} x={480} y={483} fs={38} t="PATTERNS" c="#fff" dur={10} />
        </DCard>
        <Wr f={f} at={F.continues} x={480} y={570} fs={28} t="ask anything → it continues the pattern" c={K.green} dur={24} />
      </g>
    );
  }
  if (f < F.paris1 - 8) { // THE CATCH
    return (
      <g>
        <DLine f={f} at={F.but - 6} x1={440} y1={98} x2={480} y2={30} c={K.amber} w={8} dur={4} />
        <DLine f={f} at={F.but - 2} x1={480} y1={30} x2={520} y2={98} c={K.amber} w={8} dur={4} />
        <DLine f={f} at={F.but + 2} x1={520} y1={98} x2={440} y2={98} c={K.amber} w={8} dur={4} />
        <Wr f={f} at={F.but + 6} x={480} y={88} fs={44} t="!" dur={3} />
        <Wr f={f} at={F.but + 8} x={480} y={170} fs={58} t="BUT HERE'S THE CATCH" dur={20} />
        <DCard f={f} at={F.prediction} x={70} y={230} w={380} h={320}>
          <Wr f={f} at={F.prediction + 10} x={260} y={290} fs={28} t="IT DOESN'T KNOW" c={K.grey} dur={14} />
          <Wr f={f} at={F.tru - 4} x={260} y={400} fs={96} t="TRUE" dur={10} />
        </DCard>
        <DTick f={f} at={F.tru + 8} x={260} y={480} ok={false} />
        <DCard f={f} at={F.only - 6} x={510} y={230} w={380} h={320} fill={K.soft} stroke={K.blue}>
          <Wr f={f} at={F.only + 4} x={700} y={290} fs={28} t="IT ONLY KNOWS" c={K.grey} dur={12} />
          <Wr f={f} at={F.likely - 2} x={700} y={400} fs={90} t="LIKELY" c={K.blue} dur={12} />
        </DCard>
        <DTick f={f} at={F.likely + 12} x={700} y={480} ok />
      </g>
    );
  }
  if (f < F.brilliant - 26) { // PARIS
    const P: [string, number][] = [["Paris", 0.92], ["Lyon", 0.03], ["the", 0.02], ["a", 0.01]];
    const pick = f >= F.paris2;
    return (
      <g>
        <DCard f={f} at={F.paris1 - 8} x={60} y={30} w={840} h={110} fill={K.soft} stroke={K.blue}>
          <Wr f={f} at={F.paris1} x={100} y={102} fs={42} t="The capital of France is ___" a="start" dur={F.france + 10 - F.paris1} />
        </DCard>
        <Wr f={f} at={F.france + 8} x={100} y={200} fs={24} t="next word · probability" c={K.grey} a="start" dur={12} />
        {P.map(([w, pr], i) => (
          <g key={w}>
            {pick && i === 0 && <rect x={80} y={212} width={800} height={60} rx={14} fill={K.green} opacity={0.14} stroke={K.green} strokeWidth={3} />}
            <Wr f={f} at={F.france + 12 + i * 5} x={100} y={256 + i * 70} fs={34} t={w} c={pick && i === 0 ? K.green : K.ink} a="start" dur={6} />
            <DBar f={f} at={F.france + 18 + i * 5} x={250} y={228 + i * 70} w={Math.max(8, 480 * pr)} h={32} c={i === 0 ? K.green : "#C9D3E6"} dur={i === 0 ? 16 : 5} />
            {f >= F.france + 34 + i * 5 && <text x={860} y={256 + i * 70} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={30} fill={i === 0 ? K.green : K.grey}>{pr.toFixed(2)}</text>}
          </g>
        ))}
        <DTick f={f} at={F.not2 + 4} x={110} y={552} ok={false} s={0.65} />
        <Wr f={f} at={F.not2 + 14} x={150} y={562} fs={28} t="knows it's true?" c={K.red} a="start" dur={14} />
        <DTick f={f} at={F.because2 + 4} x={520} y={552} ok s={0.65} />
        <Wr f={f} at={F.because2 + 14} x={560} y={562} fs={28} t="most probable?" c={K.green} a="start" dur={14} />
        <text x={900} y={24} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={18} fill={K.grey} opacity={0.8}>(illustrative numbers)</text>
      </g>
    );
  }
  if (f < F.remember - 8) { // BRILLIANT vs WRONG
    return (
      <g>
        <DCard f={f} at={F.brilliant - 12} x={60} y={40} w={840} h={220} fill="#E9F9F0" stroke={K.green}>
          <Wr f={f} at={F.brilliant - 2} x={540} y={150} fs={84} t="BRILLIANT" c={K.green} dur={12} />
          <Wr f={f} at={F.brilliant + 10} x={540} y={210} fs={28} t="explains · writes · codes" c={K.grey} dur={16} />
        </DCard>
        <DTick f={f} at={F.brilliant + 4} x={140} y={150} ok s={1.1} />
        <DCard f={f} at={F.confidently - 12} x={60} y={300} w={840} h={220} fill="#FDECEE" stroke={K.red}>
          <Wr f={f} at={F.confidently - 2} x={545} y={410} fs={58} t="CONFIDENTLY WRONG" c={K.red} dur={18} />
          <Wr f={f} at={F.confidently + 16} x={545} y={470} fs={28} t="invents facts · sounds sure" c={K.grey} dur={16} />
        </DCard>
        <DTick f={f} at={F.confidently + 4} x={130} y={410} ok={false} s={1.1} />
        {f >= F.sentence - 6 && <DCard f={f} at={F.sentence - 6} x={310} y={252} w={340} h={56} r={28} fill={K.amber} stroke={K.ink} dur={8}>
          <Wr f={f} at={F.sentence} x={480} y={291} fs={28} t="SAME SENTENCE" dur={10} /></DCard>}
        <DCard f={f} at={F.fix - 8} x={230} y={536} w={500} h={56} r={28} fill={K.ink} stroke={K.ink} dur={8}>
          <Wr f={f} at={F.fix} x={480} y={574} fs={28} t="we fix this → LESSON 5" c="#fff" dur={16} />
        </DCard>
      </g>
    );
  }
  if (f < F.tomorrow - 8) { // RECAP
    return (
      <g>
        <Wr f={f} at={F.remember} x={480} y={90} fs={40} t="REMEMBER ONE LINE" c={K.amber} dur={14} />
        <Wr f={f} at={F.mind - 22} x={480} y={220} fs={84} t="AI IS NOT A MIND" dur={20} />
        <Wr f={f} at={F.worlds - 2} x={480} y={320} fs={40} t="it's the world's most powerful" c={K.grey} dur={18} />
        <Wr f={f} at={F.autocomplete} x={480} y={460} fs={120} t="AUTOCOMPLETE" c={K.blue} dur={20} />
        <DLine f={f} at={F.autocomplete + 22} x1={110} y1={496} x2={850} y2={490} c={K.blue} w={12} dur={12} />
      </g>
    );
  }
  // TOMORROW + SUBSCRIBE
  const clicked = f >= F.subscribe + 16;
  return (
    <g>
      <Wr f={f} at={F.tomorrow} x={480} y={90} fs={46} t="TOMORROW → LESSON 2" c={K.blue} dur={16} />
      <Wr f={f} at={F.machines - 4} x={480} y={150} fs={26} t="How machines learn — no one writes the answers" c={K.grey} dur={26} />
      <Wr f={f} at={F.agent2 - 6} x={480} y={240} fs={28} t="AGENT SCHOOL · MODULE 1 · 30 LESSONS" dur={18} />
      {[...Array(30)].map((_, i) => { const p = pop(f, F.agent2 + 10 + i * 1.2, 8); if (p <= 0) return null; const cx = 120 + (i % 10) * 80, cy = 300 + Math.floor(i / 10) * 74; const done = i === 0, next = i === 1;
        return (<g key={i} transform={`translate(${cx} ${cy}) scale(${p})`}><circle r={28} fill={done ? K.green : next ? "#DCEBFF" : "#fff"} stroke={done ? K.green : next ? K.blue : "#C9D3E6"} strokeWidth={4} opacity={next ? 0.65 + 0.35 * Math.sin(f * 0.2) : 1} /><text y={9} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={24} fill={done ? "#fff" : next ? K.blue : K.grey}>{i + 1}</text></g>); })}
      <DCard f={f} at={F.lesson2 - 4} x={290} y={502} w={380} h={76} r={38} fill={clicked ? "#5B6170" : "#FF2D3D"} stroke={clicked ? "#5B6170" : "#FF2D3D"} dur={10}>
        <text x={480} y={553} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={36} fill="#fff">{clicked ? "SUBSCRIBED ✓" : "SUBSCRIBE"}</text>
      </DCard>
    </g>
  );
};

// ================= CLASSROOM =================
const Room: React.FC<{ f: number; pose: TeacherPose }> = ({ f, pose }) => (
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
    <svg x={SX} y={SY} width={SW_} height={SH} viewBox={`0 0 ${SW_} ${SH}`} overflow="hidden"><ScreenContent f={f} /></svg>
    <path d={`M${SX + 20} ${SY + 20} L${SX + 260} ${SY + 20} L${SX + 120} ${SY + 260} Z`} fill="#fff" opacity={0.08} />
    <circle cx={SX + SW_ - 10} cy={SY + SH + 12} r={6} fill="#34D399" />
    <rect x={460} y={SY + SH + 26} width={160} height={22} rx={6} fill="#2B3445" />
    {/* teacher */}
    <g transform="translate(-10 860) scale(1.42)"><Teacher2D pose={pose} /></g>
  </g>
);

// ================= TEACHER PERFORMANCE =================
const teacherPose = (f: number): TeacherPose => {
  const talk = Math.max(0, ENV[Math.max(0, f - 15)] ?? 0);
  const blinkQ = (f + 11) % 97, blink = blinkQ < 5 ? Math.sin((blinkQ / 5) * Math.PI) : 0;
  // pointing at the screen while slides animate; down while talking to camera
  const pts: [number, number][] = [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.when, 0.9], [F.feels - 30, 0.9], [F.feels, 0.25],
    [F.seen, 0.85], [F.but - 10, 0.85], [F.but, 0.1], [F.prediction, 0.8], [F.remember - 10, 0.8], [F.remember, 0.15], [F.autocomplete - 6, 0.95], [F.tomorrow, 0.9], [F.agent2, 0.2], [TOTAL, 0.2]];
  let point = pts[0][1];
  for (let i = 0; i < pts.length - 1; i++) { const [a, va] = pts[i], [b, vb] = pts[i + 1]; if (f >= a && f <= b) point = lerp(va, vb, eio(clamp01((f - a) / Math.max(1, Math.min(14, b - a))))); }
  let leftHand: LeftHand = "openPalm";
  if (f < F.when) leftHand = f >= F.welcome ? "wave" : "openPalm";
  else if (f >= F.but && f < F.prediction) leftHand = "fingerUp";
  else if (f >= F.remember && f < F.tomorrow) leftHand = "fingerUp";
  else if (f >= F.agent2) leftHand = f >= F.subscribe ? "thumbsUp" : "wave";
  else if (f >= F.heres && f < F.trained) leftHand = "relaxed";
  const brow = (f >= F.but && f < F.catch + 30) || (f >= F.confidently && f < F.confidently + 30) ? 0.9 : talk > 0.5 ? 0.3 : 0;
  return {
    talk, blink, brow, point, leftHand, pointWiggle: Math.sin(f * 0.09) * 4,
    bob: Math.sin(f * 0.12) * 2 + talk * 2, headTilt: Math.sin(f * 0.035) * 3, lookX: point > 0.5 ? 0.6 : 0, smile: 0.85,
  };
};

// ================= CAMERA =================
const WIDE = { x: 540, y: 960, z: 1 }, SCREEN = { x: 540, y: 640, z: 1.08 }, FACE = { x: 230, y: 1150, z: 1.85 }, MID = { x: 420, y: 980, z: 1.22 };
const CAM: [number, { x: number; y: number; z: number }][] = [
  [0, WIDE], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, MID], [F.when - 4, MID],
  [F.when + 16, SCREEN], [F.heres - 6, SCREEN], [F.heres + 10, WIDE], [F.trained, SCREEN], [F.feels - 22, SCREEN],
  [F.feels - 4, WIDE], [F.seen + 10, SCREEN], [F.but - 14, SCREEN], [F.but + 4, FACE], [F.catch + 30, FACE],
  [F.prediction + 6, SCREEN], [F.brilliant - 30, SCREEN], [F.brilliant - 10, WIDE], [F.confidently + 30, SCREEN], [F.dont, SCREEN],
  [F.remember - 8, SCREEN], [F.remember + 6, FACE], [F.remember + 30, FACE], [F.mind, SCREEN], [F.tomorrow - 6, SCREEN],
  [F.tomorrow + 14, WIDE], [TOTAL, { x: 540, y: 940, z: 1.03 }],
];

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = teacherPose(f);
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam: CAM, render: () => <Room f={f} pose={pose} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l001" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      {/* lesson tag */}
      <svg width={VW} height={VH} style={{ position: "absolute", inset: 0 }}>
        <rect x={0} y={0} width={VW * clamp01(f / TOTAL)} height={8} fill={K.blue} />
        <g transform="translate(28 28)">
          <rect width={640} height={92} rx={22} fill="rgba(255,255,255,0.95)" stroke="#D5DEEE" strokeWidth={3} />
          <rect x={10} y={10} width={72} height={72} rx={16} fill={K.blue} />
          <text x={46} y={42} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={14} fill="#fff">LESSON</text>
          <text x={46} y={72} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill="#fff">1</text>
          <text x={98} y={40} fontFamily={FONT} fontWeight={800} fontSize={20} fill={K.blue} letterSpacing={2}>AGENT SCHOOL · MODULE 1</text>
          <text x={98} y={74} fontFamily={FONT} fontWeight={800} fontSize={30} fill={K.ink}>AI Doesn't Think — It Predicts</text>
        </g>
      </svg>
      <div style={{ position: "absolute", left: 30, right: 30, top: 1592, height: 112, borderRadius: 40, background: "rgba(255,255,255,0.92)", boxShadow: "0 10px 28px rgba(30,42,68,0.18)" }} />
      <Caps f={f} words={WORDS} chunks={CHUNKS} accent={K.blue} theme="light" y={1610} />
    </AbsoluteFill>
  );
};

// ================= THUMBNAIL (1080x1920 still) =================
export const LessonThumb: React.FC = () => (
  <AbsoluteFill style={{ background: K.wall }}>
    <FontStyle />
    <svg width={VW} height={VH} viewBox={`0 0 ${VW} ${VH}`}>
      <rect width={VW} height={VH} fill={K.wall} />
      <rect y={1300} width={VW} height={620} fill={K.floor} />
      {[...Array(10)].map((_, i) => <path key={i} d={`M${i * 120} 1300 L${i * 120 - 80} 1920`} stroke={K.floor2} strokeWidth={3} />)}
      {/* sunburst */}
      {[...Array(16)].map((_, i) => { const a1 = (i / 16) * Math.PI * 2, a2 = a1 + Math.PI / 22; return <path key={i} d={`M540 700 L${540 + Math.cos(a1) * 1600} ${700 + Math.sin(a1) * 1600} L${540 + Math.cos(a2) * 1600} ${700 + Math.sin(a2) * 1600} Z`} fill="#FFFFFF" opacity={0.35} />; })}
      {/* tag */}
      <g transform="translate(540 110)">
        <rect x={-300} y={-50} width={600} height={92} rx={46} fill={K.blue} stroke={K.ink} strokeWidth={6} />
        <text y={20} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={44} fill="#fff" letterSpacing={3}>FREE AI COURSE · L1</text>
      </g>
      {/* screen */}
      <rect x={34} y={210} width={1012} height={720} rx={30} fill="#1C2230" stroke={K.ink} strokeWidth={8} />
      <rect x={60} y={236} width={960} height={668} rx={14} fill="#fff" />
      <text x={540} y={420} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={150} fill={K.ink}>AI DOESN'T</text>
      <text x={540} y={600} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={190} fill={K.ink}>THINK</text>
      <path d="M250 540 L830 512" stroke={K.red} strokeWidth={30} strokeLinecap="round" />
      <text x={540} y={810} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={136} fill={K.blue}>IT PREDICTS</text>
      <g transform="translate(985 880) rotate(28) scale(0.8)">
        <path d="M-14 -46 L0 0 L14 -46 Z" fill="#F3D9B1" stroke={K.ink} strokeWidth={5} strokeLinejoin="round" />
        <rect x={-18} y={-210} width={36} height={170} rx={10} fill={K.blue} stroke={K.ink} strokeWidth={5} />
      </g>
      {/* teacher */}
      <g transform="translate(-40 1010) scale(1.72)"><Teacher2D pose={{ point: 0.95, talk: 0.9, brow: 1.1, smile: 0.6, leftHand: "openPalm", lookX: 0.3 }} /></g>
      {/* hook bubble */}
      <g transform="translate(790 1230) rotate(-6)">
        <rect x={-250} y={-80} width={500} height={160} rx={36} fill={K.amber} stroke={K.ink} strokeWidth={7} />
        <text y={-6} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={62} fill={K.ink}>WAIT… WHAT?!</text>
        <text y={58} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={K.ink}>how AI really works</text>
      </g>
    </svg>
  </AbsoluteFill>
);
