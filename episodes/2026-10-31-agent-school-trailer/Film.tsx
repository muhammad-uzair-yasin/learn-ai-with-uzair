import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Shots, ShotDef, Figure, FontStyle, CAPTION_FONT, ramp, eio, eout, eback, pop, clamp01, lerp, mix, rnd, blinkAt, VW, VH } from "./kit";
import { WORDS, CHUNKS, VOICE_END, TOTAL, ENV } from "./words";

const F = {
  hook: 17, six: 99, free1: 136, school: 182, tomorrow: 235, channel: 269, daily: 321, l180: 383,
  best: 446, zero: 481, watch: 594, can: 654, basics: 691, what3: 756, then2: 889, level: 907,
  agents: 935, research: 1040, social: 1090, customers: 1148, sleep: 1208, byEnd: 1243, command: 1314,
  every1: 1351, every2: 1387, free2: 1469, nocourse: 1492, nosignup: 1527, press1: 1556, month1: 1597,
  lesson1: 1649, think: 1678, predicts: 1717, class24: 1750, sub2: 1814, seat: 1843,
};
const PAPER = "#f6f1e7", PAPER2 = "#ece3d0", INKC = "#2b2b33", BOARD = "#2e5c4c", BOARDD = "#24493c",
  CHALK = "#f6f2e4", YEL = "#ffb000", COR = "#ff6a5e", TEAL = "#13967d", PURP = "#7c5cff", REDB = "#e62117", MUT = "#8a8375";
const FONT = "InterLocal, Inter, sans-serif";
const GROUND = 1510;

// ---------- shared ----------
const Paper: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <rect width={VW} height={VH} fill={PAPER} />
    <rect width={VW} height={VH} fill="url(#sun)" />
    {[...Array(60)].map((_, i) => (
      <circle key={i} cx={(i % 10) * 120 + 60} cy={Math.floor(i / 10) * 320 + 120} r={3} fill={INKC} opacity={0.05} />
    ))}
    {[...Array(10)].map((_, i) => (
      <circle key={"m" + i} cx={rnd("px" + i) * VW} cy={rnd("py" + i) * VH} r={5 + rnd("pr" + i) * 7}
        fill={[YEL, COR, TEAL, PURP][i % 4]} opacity={0.10 + 0.06 * Math.sin(f * 0.04 + i)} />
    ))}
    <rect x={0} y={GROUND + 62} width={VW} height={VH - GROUND - 62} fill={PAPER2} />
    <line x1={0} y1={GROUND + 62} x2={VW} y2={GROUND + 62} stroke={INKC} strokeWidth={4} opacity={0.5} />
  </g>
);
const Defs: React.FC = () => (
  <defs>
    <radialGradient id="sun" cx="50%" cy="20%" r="85%">
      <stop offset="0%" stopColor="#fffdf4" /><stop offset="100%" stopColor={PAPER} />
    </radialGradient>
  </defs>
);
const Header: React.FC<{ f: number }> = ({ f }) => {
  const p = eout(ramp(f, 4, 18));
  return (
    <g opacity={p}>
      <rect x={0} y={0} width={VW * clamp01(f / TOTAL)} height={10} fill={TEAL} />
      <g transform={`translate(${lerp(-320, 208, p)} 86)`}>
        <rect x={-178} y={-34} width={356} height={68} rx={34} fill={TEAL} />
        <text x={0} y={12} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={34} fill="#fff" letterSpacing={2}>AGENT SCHOOL</text>
      </g>
      <g transform={`translate(${lerp(VW + 200, VW - 140, p)} 86)`}>
        <rect x={-104} y={-30} width={208} height={60} rx={30} fill="#fff" stroke={INKC} strokeWidth={3} />
        <text x={0} y={11} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={28} fill={INKC} letterSpacing={1}>TRAILER</text>
      </g>
    </g>
  );
};
// chalkboard
const Board: React.FC<{ x?: number; y?: number; w?: number; h?: number; children?: React.ReactNode }> = ({ x = 110, y = 300, w = 860, h = 640, children }) => (
  <g>
    <rect x={x - 22} y={y - 22} width={w + 44} height={h + 44} rx={26} fill="#9a6b3f" stroke={INKC} strokeWidth={6} />
    <rect x={x} y={y} width={w} height={h} rx={12} fill={BOARD} stroke={BOARDD} strokeWidth={4} />
    <rect x={x + 20} y={y + h + 24} width={220} height={16} rx={8} fill="#9a6b3f" stroke={INKC} strokeWidth={4} />
    <rect x={x + 50} y={y + h + 12} width={70} height={14} rx={7} fill={CHALK} stroke={INKC} strokeWidth={3} />
    {children}
  </g>
);
const Pen: React.FC<{ x: number; y: number; writing?: boolean; f?: number }> = ({ x, y, writing, f = 0 }) => (
  <g transform={`translate(${x} ${y + (writing ? Math.sin(f * 0.9) * 3 : 0)}) rotate(38)`}>
    <rect x={-9} y={-104} width={18} height={86} rx={8} fill={YEL} stroke={INKC} strokeWidth={4} />
    <path d={`M -9,-18 L 0,2 L 9,-18 Z`} fill="#f0cf9b" stroke={INKC} strokeWidth={4} strokeLinejoin="round" />
    <path d={`M -3,-5 L 0,2 L 3,-5 Z`} fill={INKC} />
    <rect x={-9} y={-112} width={18} height={10} rx={4} fill={COR} stroke={INKC} strokeWidth={3} />
  </g>
);
// chalk text written by the pen
const ChalkText: React.FC<{ f: number; at: number; dur?: number; text: string; x: number; y: number; fs?: number; color?: string; pen?: boolean }> = ({ f, at, dur = 34, text, x, y, fs = 90, color = CHALK, pen = true }) => {
  const p = clamp01((f - at) / dur);
  if (p <= 0) return null;
  const w = text.length * fs * 0.62;
  const x0 = x - w / 2;
  return (
    <g>
      {p < 1 && <clipPath id={`ct${at}`}><rect x={x0 - 10} y={y - fs * 1.1} width={w * p + 14} height={fs * 1.7} /></clipPath>}
      <text x={x} y={y} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={fs} fill={color}
        textLength={w} lengthAdjust="spacingAndGlyphs" clipPath={p < 1 ? `url(#ct${at})` : undefined}>{text}</text>
      {pen && p < 1 && <Pen x={x0 + w * p + 4} y={y - fs * 0.22} writing f={f} />}
    </g>
  );
};
const Cursor: React.FC<{ x: number; y: number; click?: boolean; f?: number; at?: number }> = ({ x, y, click, f = 0, at = 0 }) => (
  <g>
    {click && [...Array(2)].map((_, i) => {
      const q = clamp01((f - at - i * 5) / 20); if (q <= 0 || q >= 1) return null;
      return <circle key={i} cx={x} cy={y} r={14 + q * 58} fill="none" stroke={COR} strokeWidth={(1 - q) * 9} opacity={1 - q} />;
    })}
    <path d={`M ${x} ${y} l 0 56 l 16 -13 l 11 25 l 13 -6 l -11 -25 l 20 -2 z`} fill="#fff" stroke={INKC} strokeWidth={5} strokeLinejoin="round" />
  </g>
);
const Chip: React.FC<{ x: number; y: number; w: number; label: string; hue?: string; p?: number; fs?: number; light?: boolean }> = ({ x, y, w, label, hue = TEAL, p = 1, fs = 34, light }) => (
  <g opacity={clamp01(p)} transform={`translate(${x} ${y}) scale(${0.82 + 0.18 * clamp01(p)})`}>
    <rect x={-w / 2} y={-34} width={w} height={68} rx={34} fill={light ? "#fff" : hue} stroke={light ? hue : INKC} strokeWidth={4} />
    <text x={0} y={12} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={fs} fill={light ? hue : "#fff"} letterSpacing={2}>{label}</text>
  </g>
);
const Teacher: React.FC<{ f: number; x?: number; y?: number; s?: number; armR?: number; elbowR?: number; mood?: any; look?: [number, number]; facing?: 1 | -1; pointer?: boolean; walk?: number; headTilt?: number }> = (p) => {
  const talking = Math.max(0, ENV[Math.max(0, p.f - 15)] ?? 0);
  const gesture = p.walk === undefined ? Math.sin(p.f * 0.12) * 5 + talking * 4 : 0;
  return (
    <Figure x={p.x ?? 790} y={p.y ?? GROUND + 60} s={p.s ?? 0.9} facing={p.facing ?? -1} coat={TEAL} mood={p.mood ?? "happy"}
      look={p.look ?? [1, 0]} blink={blinkAt(p.f, 7)} hair="tuft" glasses
      armR={(p.armR ?? 72) + gesture} armL={-34 - gesture * 0.6} elbowL={-18} elbowR={p.elbowR ?? 24} walk={p.walk}
      bob={p.walk === undefined ? Math.sin(p.f * 0.09) * 3 : 0} headTilt={(p.headTilt ?? 0) + Math.sin(p.f * 0.07) * 2}
      talk={talking}
      holdR={p.pointer === false ? undefined : <line x1={0} y1={0} x2={96} y2={-120} stroke={INKC} strokeWidth={8} strokeLinecap="round" />} />
  );
};
const Confetti: React.FC<{ f: number; at: number }> = ({ f, at }) => (
  <g>
    {[...Array(26)].map((_, i) => {
      const q = clamp01((f - at) / 55); if (q <= 0 || q >= 1) return null;
      const a = rnd("ca" + i) * 6.28, v = 300 + rnd("cv" + i) * 500;
      const x = VW / 2 + Math.cos(a) * v * q, y = 760 + Math.sin(a) * v * q * 0.7 + 540 * q * q;
      return <rect key={i} x={x} y={y} width={16} height={10} rx={3} fill={[YEL, COR, TEAL, PURP][i % 4]}
        opacity={1 - q} transform={`rotate(${q * 360 + i * 40} ${x} ${y})`} />;
    })}
  </g>
);
const Stamp: React.FC<{ f: number; at: number; x: number; y: number; text: string; hue?: string; fs?: number }> = ({ f, at, x, y, text, hue = TEAL, fs = 92 }) => {
  const p = ramp(f, at, at + 9);
  if (p <= 0) return null;
  const sc = lerp(2.1, 1, eio(p));
  const w = text.length * fs * 0.66 + 70;
  return (
    <g opacity={clamp01(p * 2)} transform={`translate(${x} ${y}) rotate(-12) scale(${sc})`}>
      <rect x={-w / 2} y={-fs * 0.78} width={w} height={fs * 1.5} rx={18} fill="none" stroke={hue} strokeWidth={11} />
      <text x={0} y={fs * 0.32} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={fs} fill={hue} letterSpacing={6}>{text}</text>
    </g>
  );
};
// ---------- shot 1: hook on the board ----------
const S_Hook: React.FC<{ f: number }> = ({ f }) => {
  const flipP = ramp(f, F.six, F.six + 30);
  const months = ["NOV", "DEC", "JAN", "FEB", "MAR", "APR"];
  const mi = Math.min(5, Math.floor(flipP * 6));
  return (
    <g>
      <Board>
        <ChalkText f={f} at={F.hook + 6} dur={36} text="YOU" x={540} y={470} fs={96} />
        <ChalkText f={f} at={F.hook + 46} dur={8} text="↓" x={540} y={590} fs={80} pen={false} color={YEL} />
        <ChalkText f={f} at={F.hook + 56} dur={44} text="AI ENGINEER" x={540} y={720} fs={104} color={YEL} />
      </Board>
      {/* calendar flip on "six months" */}
      {f >= F.six && (
        <g transform="translate(540 1230)" opacity={eout(ramp(f, F.six, F.six + 8))}>
          <rect x={-170} y={-120} width={340} height={250} rx={22} fill="#fff" stroke={INKC} strokeWidth={5} />
          <rect x={-170} y={-120} width={340} height={70} rx={22} fill={COR} />
          <text x={0} y={-72} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={40} fill="#fff" letterSpacing={4}>{months[mi]}</text>
          <text x={0} y={70} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={110} fill={INKC}>{mi + 1}</text>
          <text x={0} y={108} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={26} fill={MUT}>OF 6 MONTHS</text>
          <rect x={-170} y={-120} width={340} height={250 * (1 - Math.abs(1 - 2 * (flipP * 6 % 1)))} rx={22} fill="#fff" opacity={0.25} />
        </g>
      )}
      <Stamp f={f} at={F.free1 + 6} x={540} y={1240} text="FREE" hue={TEAL} fs={120} />
      <Teacher f={f} armR={f < F.six ? 86 : 60} elbowR={30} />
    </g>
  );
};
// ---------- shot 2: agent school reveal ----------
const S_School: React.FC<{ f: number }> = ({ f }) => {
  const days = 7, dp = ramp(f, F.daily, F.daily + 42);
  const cnt = Math.round(eout(ramp(f, F.l180 + 4, F.l180 + 40)) * 180);
  return (
    <g>
      <Board>
        <ChalkText f={f} at={F.school} dur={40} text="AGENT" x={540} y={500} fs={130} />
        <ChalkText f={f} at={F.school + 24} dur={36} text="SCHOOL" x={540} y={650} fs={130} color={YEL} />
        {/* bell */}
        {f >= F.school + 46 && (
          <g transform={`translate(880 400) rotate(${Math.sin((f - F.school) * 0.4) * 14 * Math.max(0, 1 - (f - F.school - 46) / 60)})`} opacity={pop(f, F.school + 46, 10)}>
            <path d="M0 -30 Q26 -30 26 4 L34 18 H-34 L-26 4 Q-26 -30 0 -30" fill={YEL} stroke={INKC} strokeWidth={5} strokeLinejoin="round" />
            <circle cy={26} r={7} fill={INKC} />
          </g>
        )}
        {/* NOV 1 pop */}
        {f >= F.tomorrow && (
          <g transform={`translate(230 790) scale(${pop(f, F.tomorrow, 10)})`}>
            <rect x={-100} y={-66} width={200} height={140} rx={16} fill="#fff" stroke={INKC} strokeWidth={5} />
            <rect x={-100} y={-66} width={200} height={44} rx={16} fill={COR} />
            <text x={0} y={-34} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={28} fill="#fff">NOV</text>
            <text x={0} y={48} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={76} fill={INKC}>1</text>
          </g>
        )}
        {/* channel card + cursor click */}
        {f >= F.channel && (
          <g transform={`translate(620 800)`} opacity={eout(ramp(f, F.channel, F.channel + 10))}>
            <rect x={-230} y={-62} width={460} height={124} rx={20} fill="#fff" stroke={INKC} strokeWidth={5} />
            <circle cx={-168} cy={0} r={38} fill={TEAL} />
            <text x={-168} y={12} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={34} fill="#fff">U</text>
            <text x={-110} y={-8} fontFamily={FONT} fontWeight={800} fontSize={30} fill={INKC}>Learn AI With Uzair</text>
            <rect x={-110} y={12} width={150 * clamp01((f - F.channel - 20) / 8 + (f >= F.channel + 28 ? 1 : 0))} height={0} />
            <g transform="translate(60 26)">
              <rect x={-60} y={-2} width={160} height={40} rx={20} fill={f >= F.channel + 26 ? MUT : REDB} />
              <text x={20} y={26} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={24} fill="#fff">{f >= F.channel + 26 ? "SUBSCRIBED" : "SUBSCRIBE"}</text>
            </g>
          </g>
        )}
        {f >= F.channel + 8 && f < F.daily && (
          <Cursor x={lerp(900, 690, eio(ramp(f, F.channel + 8, F.channel + 24)))} y={lerp(950, 830, eio(ramp(f, F.channel + 8, F.channel + 24)))}
            click={f >= F.channel + 26} f={f} at={F.channel + 26} />
        )}
      </Board>
      {/* 7 day tiles with checks */}
      {f >= F.daily && (
        <g transform="translate(0 1180)">
          {[...Array(days)].map((_, i) => {
            const q = clamp01(dp * days - i); if (q <= 0) return null;
            return (
              <g key={i} opacity={q} transform={`translate(${118 + i * 124} ${(1 - q) * 30})`}>
                <rect x={-50} y={-50} width={100} height={100} rx={18} fill="#fff" stroke={INKC} strokeWidth={4} />
                <path d="M-22 2 L-6 18 L26 -16" stroke={TEAL} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            );
          })}
          <text x={540} y={110} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill={INKC} opacity={dp}>EVERY. SINGLE. DAY.</text>
        </g>
      )}
      {/* 180 counter */}
      {f >= F.l180 && (
        <g transform="translate(540 1462)">
          <text x={0} y={0} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={140} fill={COR} stroke="#fff" strokeWidth={2} paintOrder="stroke">{cnt}</text>
          <text x={0} y={50} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={34} fill={MUT} letterSpacing={4}>LESSONS</text>
        </g>
      )}
      <Confetti f={f} at={F.school + 30} />
      <Teacher f={f} x={850} s={0.72} armR={78} />
    </g>
  );
};
// ---------- shot 3: no code needed ----------
const S_NoCode: React.FC<{ f: number }> = ({ f }) => {
  const c1 = pop(f, F.zero + 10, 10), c2 = pop(f, F.zero + 46, 10);
  const x1 = ramp(f, F.zero + 26, F.zero + 36), x2 = ramp(f, F.zero + 62, F.zero + 72);
  const php = pop(f, F.watch + 6, 12);
  return (
    <g>
      <text x={540} y={400} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={84} fill={INKC}
        opacity={eout(ramp(f, F.best, F.best + 12))}>THE BEST PART</text>
      {/* crossed cards */}
      <g opacity={clamp01(c1)} transform={`translate(300 680) rotate(-4) scale(${0.9 + 0.1 * c1})`}>
        <rect x={-190} y={-130} width={380} height={260} rx={24} fill="#fff" stroke={INKC} strokeWidth={6} />
        <text x={0} y={-20} textAnchor="middle" fontFamily="monospace" fontWeight={700} fontSize={84} fill={PURP}>{"</>"}</text>
        <text x={0} y={70} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={36} fill={INKC}>CODING</text>
        <line x1={-170} y1={110} x2={170} y2={-110} stroke={COR} strokeWidth={16 * x1} strokeLinecap="round" />
      </g>
      <g opacity={clamp01(c2)} transform={`translate(780 680) rotate(4) scale(${0.9 + 0.1 * c2})`}>
        <rect x={-190} y={-130} width={380} height={260} rx={24} fill="#fff" stroke={INKC} strokeWidth={6} />
        <path d="M0 -70 L60 -40 L0 -10 L-60 -40 Z M44 -32 V 16" stroke={YEL} strokeWidth={9} fill="none" strokeLinejoin="round" />
        <text x={0} y={70} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={36} fill={INKC}>TECH DEGREE</text>
        <line x1={-170} y1={110} x2={170} y2={-110} stroke={COR} strokeWidth={16 * x2} strokeLinecap="round" />
      </g>
      <Chip x={540} y={900} w={520} label="ZERO EXPERIENCE NEEDED" hue={TEAL} p={pop(f, F.zero + 80, 10)} fs={32} />
      {/* phone with play on "watch a video" */}
      {f >= F.watch && (
        <g opacity={clamp01(php)} transform={`translate(540 1260) scale(${0.9 + 0.1 * php})`}>
          <rect x={-160} y={-210} width={320} height={420} rx={36} fill="#fff" stroke={INKC} strokeWidth={6} />
          <rect x={-130} y={-180} width={260} height={300} rx={16} fill={PAPER2} />
          <circle r={62} fill={f >= F.watch + 40 ? TEAL : COR} />
          <path d="M-16 -28 L34 0 L-16 28 Z" fill="#fff" />
          <text x={0} y={178} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={MUT}>1:00</text>
          {f >= F.watch + 16 && <Cursor x={lerp(300, 30, eio(ramp(f, F.watch + 16, F.watch + 38)))} y={lerp(240, 30, eio(ramp(f, F.watch + 16, F.watch + 38)))} click={f >= F.watch + 40} f={f} at={F.watch + 40} />}
        </g>
      )}
      {f >= F.can && <Stamp f={f} at={F.can} x={540} y={1260} text="YOU CAN" hue={TEAL} fs={100} />}
      <Teacher f={f} x={160} s={0.6} facing={1} armR={70} pointer={false} />
    </g>
  );
};
// ---------- shot 4: basics on the board ----------
const S_Basics: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <Board y={340}>
      <ChalkText f={f} at={F.basics + 6} dur={30} text="THE BASICS" x={540} y={480} fs={86} />
      {/* three chalk icons */}
      {f >= F.what3 && (
        <g>
          <g opacity={pop(f, F.what3, 10)} transform="translate(280 680)">
            <circle r={74} fill="none" stroke={CHALK} strokeWidth={6} strokeDasharray="10 8" />
            <path d="M-26 6 Q-26 -30 0 -30 Q26 -30 26 0 Q26 22 6 24 L6 36 M6 54 L6 56" stroke={YEL} strokeWidth={9} fill="none" strokeLinecap="round" />
            <text y={130} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill={CHALK}>WHAT IT IS</text>
          </g>
          <g opacity={pop(f, F.what3 + 36, 10)} transform="translate(540 680)">
            <circle r={74} fill="none" stroke={CHALK} strokeWidth={6} strokeDasharray="10 8" />
            <path d="M0 -50 L44 34 H-44 Z" fill="none" stroke={COR} strokeWidth={8} strokeLinejoin="round" />
            <line x1={0} y1={-10} x2={0} y2={12} stroke={COR} strokeWidth={8} strokeLinecap="round" />
            <circle cy={26} r={5} fill={COR} />
            <text y={130} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill={CHALK}>WHY IT LIES</text>
          </g>
          <g opacity={pop(f, F.what3 + 72, 10)} transform="translate(800 680)">
            <circle r={74} fill="none" stroke={CHALK} strokeWidth={6} strokeDasharray="10 8" />
            <path d="M-40 -26 H40 Q48 -26 48 -16 V14 Q48 24 40 24 H0 L-22 44 V24 H-40 Q-48 24 -48 14 V-16 Q-48 -26 -40 -26" fill="none" stroke={TEAL} strokeWidth={8} strokeLinejoin="round" />
            <text y={130} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={30} fill={CHALK}>HOW TO TALK</text>
          </g>
        </g>
      )}
    </Board>
    <Chip x={430} y={1260} w={620} label="START FROM ABSOLUTE ZERO" hue={YEL} p={pop(f, F.basics + 40, 10)} fs={32} />
    <Teacher f={f} armR={f >= F.what3 ? 84 : 62} elbowR={34} />
  </g>
);
// ---------- shot 5: level up ----------
const S_Level: React.FC<{ f: number }> = ({ f }) => {
  const steps = 5, sp = ramp(f, F.level, F.level + 26);
  const climb = eio(ramp(f, F.level + 8, F.agents + 60));
  const bot = pop(f, F.agents + 40, 14);
  return (
    <g>
      {[...Array(steps)].map((_, i) => {
        const q = clamp01(sp * steps - i); if (q <= 0) return null;
        const h = 120 + i * 110;
        return <rect key={i} x={120 + i * 170} y={GROUND + 60 - h * q} width={150} height={h * q} rx={14}
          fill={[TEAL, YEL, COR, PURP, TEAL][i]} stroke={INKC} strokeWidth={5} />;
      })}
      {/* robot assembles at the top */}
      {f >= F.agents + 20 && (
        <g transform={`translate(880 ${GROUND - 560})`} opacity={clamp01(bot)}>
          <rect x={-70} y={lerp(-300, -46, eio(ramp(f, F.agents + 20, F.agents + 34)))} width={140} height={120} rx={22} fill="#fff" stroke={INKC} strokeWidth={6} />
          <g opacity={ramp(f, F.agents + 34, F.agents + 44)}>
            <circle cx={-26} cy={10} r={12} fill={TEAL} /><circle cx={26} cy={10} r={12} fill={TEAL} />
            <rect x={-22} y={40} width={44} height={9} rx={4} fill={INKC} />
          </g>
          <line x1={0} y1={-46} x2={0} y2={-74} stroke={INKC} strokeWidth={5} /><circle cy={-82} r={8} fill={COR} />
          <g opacity={ramp(f, F.agents + 44, F.agents + 56)}>
            <rect x={-100} y={6} width={26} height={56} rx={12} fill="#fff" stroke={INKC} strokeWidth={5} />
            <rect x={74} y={6} width={26} height={56} rx={12} fill="#fff" stroke={INKC} strokeWidth={5} />
          </g>
          <text y={140} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={32} fill={INKC} opacity={pop(f, F.agents + 56, 10)}>REAL AGENTS</text>
        </g>
      )}
      <text x={540} y={380} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={96} fill={INKC}
        opacity={eout(ramp(f, F.level, F.level + 12))}>LEVEL UP</text>
      <path d={`M300 340 q 160 -120 380 -60`} stroke={COR} strokeWidth={9} fill="none" strokeDasharray="16 12"
        opacity={ramp(f, F.level + 10, F.level + 24)} markerEnd="url(#arr)" />
      <Teacher f={f} x={lerp(200, 620, climb)} y={GROUND + 60 - clamp01(climb * 1.4) * 340} s={0.8} facing={1}
        walk={climb > 0.02 && climb < 0.95 ? f * 0.32 : undefined} pointer={false} armR={climb > 0.95 ? 80 : 30} mood="happy" look={[1, -1]} />
    </g>
  );
};
// ---------- shot 6: the three agents + sleep ----------
const S_Agents: React.FC<{ f: number }> = ({ f }) => {
  const night = eio(ramp(f, F.sleep, F.sleep + 14));
  const card = (at: number, x: number, y: number, hue: string, label: string, icon: React.ReactNode) => {
    const p = pop(f, at, 12);
    if (p <= 0) return null;
    return (
      <g opacity={clamp01(p)} transform={`translate(${lerp(x + 420, x, eio(clamp01(p)))} ${y}) rotate(${(1 - clamp01(p)) * 6})`}>
        <rect x={-300} y={-104} width={600} height={208} rx={26} fill="#fff" stroke={INKC} strokeWidth={6} />
        <circle cx={-210} cy={0} r={58} fill={hue} />
        {icon}
        <text x={-120} y={-12} fontFamily={FONT} fontWeight={900} fontSize={40} fill={INKC}>{label}</text>
        <text x={-120} y={44} fontFamily={FONT} fontWeight={700} fontSize={30} fill={MUT}>AGENT · we build it live</text>
      </g>
    );
  };
  return (
    <g>
      <text x={540} y={390} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={76} fill={INKC}
        opacity={eout(ramp(f, F.agents, F.agents + 12))}>BUILT STEP BY STEP</text>
      {card(F.research, 540, 600, YEL, "RESEARCH", (
        <g transform="translate(-210 0)"><circle r={24} fill="none" stroke="#fff" strokeWidth={8} /><line x1={18} y1={18} x2={38} y2={38} stroke="#fff" strokeWidth={9} strokeLinecap="round" /></g>
      ))}
      {card(F.social, 540, 860, COR, "SOCIAL MEDIA", (
        <g transform="translate(-210 0)"><path d="M0 22 C -34 -2 -26 -34 0 -22 C 26 -34 34 -2 0 22" fill="#fff" /></g>
      ))}
      {card(F.customers, 540, 1120, PURP, "SUPPORT", (
        <g transform="translate(-210 0)"><path d="M-26 6 Q-26 -28 0 -28 Q26 -28 26 6" stroke="#fff" strokeWidth={8} fill="none" /><rect x={-34} y={0} width={16} height={26} rx={8} fill="#fff" /><rect x={18} y={0} width={16} height={26} rx={8} fill="#fff" /></g>
      ))}
      {/* night falls on "while you sleep" */}
      <rect width={VW} height={VH} fill="#1d2440" opacity={night * 0.55} />
      {f >= F.sleep && (
        <g opacity={night}>
          <circle cx={850} cy={330} r={80} fill="#f5e9b8" />
          <circle cx={820} cy={310} r={74} fill={mix("#1d2440", "#1d2440", 0)} opacity={0.9} fill-rule="evenodd" />
          <circle cx={816} cy={316} r={70} fill="#2a3152" />
          {[0, 1, 2].map(i => (
            <text key={i} x={330 + i * 54} y={1330 - i * 60 - ((f - F.sleep + i * 8) % 40)} fontFamily={FONT} fontWeight={900}
              fontSize={38 + i * 14} fill="#fff" opacity={0.8 - i * 0.2}>z</text>
          ))}
        </g>
      )}
      <Teacher f={f} x={190} s={0.62} facing={1} pointer={false}
        armR={f >= F.sleep ? 8 : 70} mood={f >= F.sleep ? "neutral" : "happy"} look={f >= F.sleep ? [0, 2] : [1, 0]}
        headTilt={night * 24 as any} />
    </g>
  );
};
// ---------- shot 7: command + free stack ----------
const S_Command: React.FC<{ f: number }> = ({ f }) => {
  const cm = pop(f, F.command, 12);
  const tagP = (at: number) => pop(f, at, 10);
  return (
    <g>
      {/* three bots salute on "command" */}
      <g opacity={eout(ramp(f, F.byEnd, F.byEnd + 12))}>
        {[0, 1, 2].map(i => {
          const bx = 330 + i * 210, rise = f >= F.command ? Math.sin((f - F.command) * 0.25 + i) * 6 : 0;
          return (
            <g key={i} transform={`translate(${bx} ${640 + rise})`}>
              <rect x={-60} y={-54} width={120} height={100} rx={20} fill="#fff" stroke={INKC} strokeWidth={5} />
              <circle cx={-20} cy={-12} r={10} fill={[YEL, COR, PURP][i]} /><circle cx={20} cy={-12} r={10} fill={[YEL, COR, PURP][i]} />
              <rect x={-18} y={14} width={36} height={8} rx={4} fill={INKC} />
              <line x1={0} y1={-54} x2={0} y2={-76} stroke={INKC} strokeWidth={4} /><circle cy={-84} r={7} fill={[YEL, COR, PURP][i]} />
              {f >= F.command && <line x1={60} y1={-30} x2={92} y2={-62} stroke={INKC} strokeWidth={8} strokeLinecap="round" opacity={cm} />}
            </g>
          );
        })}
      </g>
      <text x={540} y={420} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={80} fill={INKC}
        opacity={eout(ramp(f, F.byEnd + 6, F.byEnd + 18))}>USE AI → COMMAND AI</text>
      {/* free stack */}
      <g opacity={eout(ramp(f, F.every1, F.every1 + 10))}>
        <g opacity={tagP(F.nocourse)} transform="translate(320 1020) rotate(-5)">
          <rect x={-200} y={-70} width={400} height={140} rx={20} fill="#fff" stroke={INKC} strokeWidth={5} />
          <text x={0} y={-8} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={INKC}>COURSE $199</text>
          <text x={0} y={46} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={28} fill={MUT}>what others charge</text>
          <line x1={-180} y1={60} x2={180} y2={-60} stroke={COR} strokeWidth={14} strokeLinecap="round" />
        </g>
        <g opacity={tagP(F.nosignup)} transform="translate(760 1020) rotate(4)">
          <rect x={-180} y={-70} width={360} height={140} rx={20} fill="#fff" stroke={INKC} strokeWidth={5} />
          {[0, 1].map(i => <rect key={i} x={-140} y={-40 + i * 44} width={280} height={26} rx={13} fill={PAPER2} stroke={INKC} strokeWidth={2} />)}
          <text x={0} y={60} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={28} fill={INKC}>SIGN-UP FORM</text>
          <line x1={-160} y1={60} x2={160} y2={-60} stroke={COR} strokeWidth={14} strokeLinecap="round" />
        </g>
      </g>
      <Stamp f={f} at={F.free2} x={540} y={1330} text="100% FREE" hue={TEAL} fs={110} />
      <Teacher f={f} x={850} s={0.66} armR={f >= F.command ? 96 : 60} elbowR={10} />
    </g>
  );
};
// ---------- shot 8: subscribe + Nov 1 ----------
const S_Press: React.FC<{ f: number }> = ({ f }) => {
  const bp = pop(f, F.press1, 12);
  const click = f >= F.press1 + 26;
  const circ = ramp(f, F.month1 + 16, F.month1 + 40);
  return (
    <g>
      <g transform={`translate(540 640) scale(${bp * (click ? 1 + 0.05 * Math.sin((f - F.press1) * 0.3) : 1)})`}>
        <rect x={-280} y={-80} width={560} height={160} rx={80} fill={REDB} />
        <text x={0} y={22} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={62} fill="#fff" letterSpacing={3}>SUBSCRIBE</text>
      </g>
      {f >= F.press1 + 8 && <Cursor x={lerp(860, 660, eio(ramp(f, F.press1 + 8, F.press1 + 24)))} y={lerp(1000, 680, eio(ramp(f, F.press1 + 8, F.press1 + 24)))} click={click} f={f} at={F.press1 + 26} />}
      {/* big NOV calendar, pen circles the 1 */}
      {f >= F.month1 && (
        <g transform="translate(540 1180)" opacity={eout(ramp(f, F.month1, F.month1 + 10))}>
          <rect x={-290} y={-200} width={580} height={420} rx={26} fill="#fff" stroke={INKC} strokeWidth={6} />
          <rect x={-290} y={-200} width={580} height={88} rx={26} fill={COR} />
          <text x={0} y={-140} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={48} fill="#fff" letterSpacing={6}>NOVEMBER</text>
          {[...Array(14)].map((_, i) => (
            <text key={i} x={-240 + (i % 7) * 80} y={-40 + Math.floor(i / 7) * 90} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={42}
              fill={i === 0 ? COR : MUT}>{i + 1}</text>
          ))}
          <circle cx={-240} cy={-54} r={48} fill="none" stroke={YEL} strokeWidth={9}
            strokeDasharray={`${302 * circ} 302`} transform="rotate(-90 -240 -54)" />
          {circ > 0 && circ < 1 && <Pen x={-240 + Math.cos(circ * 6.28 - 1.57) * 48} y={-54 + Math.sin(circ * 6.28 - 1.57) * 48} writing f={f} />}
          <text x={60} y={160} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={36} fill={INKC}>LESSON 1 · TOMORROW</text>
        </g>
      )}
      <Teacher f={f} x={170} s={0.6} facing={1} pointer={false} armR={74} />
    </g>
  );
};
// ---------- shot 9: lesson 1 board ----------
const S_L1: React.FC<{ f: number }> = ({ f }) => {
  const tiles = ["AI", "DOESN'T", "THINK..."];
  return (
    <g>
      <Board y={360}>
        <ChalkText f={f} at={F.lesson1} dur={26} text="LESSON 1" x={540} y={500} fs={96} />
        {f >= F.think && (
          <g>
            {tiles.map((t, i) => (
              <g key={i} opacity={pop(f, F.think + i * 9, 8)} transform={`translate(${236 + i * 304} 650)`}>
                <rect x={-122} y={-44} width={244} height={88} rx={14} fill={CHALK} stroke={INKC} strokeWidth={4} />
                <text y={13} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={i === 0 ? 38 : 33} fill={INKC}>{t}</text>
              </g>
            ))}
          </g>
        )}
        {f >= F.predicts && (
          <g opacity={pop(f, F.predicts, 12)} transform="translate(540 820)">
            <rect x={-250} y={-56} width={500} height={112} rx={16} fill={YEL} stroke={INKC} strokeWidth={5} />
            <text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill={INKC}>IT PREDICTS</text>
          </g>
        )}
      </Board>
      <Teacher f={f} armR={88} elbowR={26} />
    </g>
  );
};
// ---------- shot 10: countdown + take a seat ----------
const S_End: React.FC<{ f: number }> = ({ f }) => {
  const secs = Math.max(0, 24 * 3600 - Math.floor((f - F.class24) / 6));
  const hh = String(Math.floor(secs / 3600)).padStart(2, "0"), mm = String(Math.floor((secs % 3600) / 60)).padStart(2, "0"), ss = String(secs % 60).padStart(2, "0");
  const chairP = eio(ramp(f, F.seat, F.seat + 16));
  const sp = pop(f, F.sub2, 12);
  const click = f >= F.sub2 + 18;
  return (
    <g>
      <g opacity={eout(ramp(f, F.class24, F.class24 + 10))} transform="translate(540 480)">
        <rect x={-330} y={-110} width={660} height={220} rx={30} fill={INKC} />
        <text y={30} textAnchor="middle" fontFamily="monospace" fontWeight={700} fontSize={110} fill={YEL} letterSpacing={6}>{hh}:{mm}:{ss}</text>
        <text y={150} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill={INKC}>UNTIL CLASS BEGINS</text>
      </g>
      {/* subscribe */}
      {f >= F.sub2 && (
        <g transform={`translate(540 820) scale(${sp})`}>
          <rect x={-250} y={-66} width={500} height={132} rx={66} fill={REDB} />
          <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={54} fill="#fff" letterSpacing={3}>SUBSCRIBE</text>
          {click && [...Array(2)].map((_, i) => {
            const q = clamp01((f - F.sub2 - 18 - i * 6) / 24); if (q <= 0 || q >= 1) return null;
            return <rect key={i} x={-250 - q * 50} y={-66 - q * 50} width={500 + q * 100} height={132 + q * 100} rx={100} fill="none" stroke={REDB} strokeWidth={(1 - q) * 7} opacity={1 - q} />;
          })}
        </g>
      )}
      {f >= F.sub2 + 4 && <Cursor x={lerp(880, 640, eio(ramp(f, F.sub2 + 4, F.sub2 + 16)))} y={lerp(1160, 860, eio(ramp(f, F.sub2 + 4, F.sub2 + 16)))} click={click} f={f} at={F.sub2 + 18} />}
      {/* desk slides in, figure sits */}
      <g transform={`translate(${lerp(VW + 500, 540, chairP)} ${GROUND - 10})`}>
        <rect x={-240} y={-130} width={480} height={36} rx={10} fill="#9a6b3f" stroke={INKC} strokeWidth={5} />
        <rect x={-200} y={-94} width={28} height={150} fill="#7c5531" stroke={INKC} strokeWidth={4} />
        <rect x={172} y={-94} width={28} height={150} fill="#7c5531" stroke={INKC} strokeWidth={4} />
        <rect x={-150} y={-170} width={120} height={40} rx={8} fill={CHALK} stroke={INKC} strokeWidth={4} />
      </g>
      {f >= F.seat && (
        <g opacity={pop(f, F.seat + 20, 12)}>
          <text x={540} y={1070} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={66} fill={INKC}>CLASS BEGINS</text>
          <text x={540} y={1165} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={84} fill={COR}>TOMORROW</text>
        </g>
      )}
      <Teacher f={f} x={lerp(200, 420, chairP)} y={GROUND + 56} s={0.8} facing={1} pointer={false}
        armR={f >= F.seat ? 60 : 110 + Math.sin(f * 0.3) * 12} elbowR={40} walk={chairP > 0.02 && chairP < 0.9 ? f * 0.3 : undefined} />
    </g>
  );
};
// ---------- light captions ----------
const LightCaptions: React.FC<{ f: number }> = ({ f }) => {
  const c = CHUNKS.find(([a, b], k) => f >= WORDS[a][0] - 2 && f < (CHUNKS[k + 1] ? Math.min(WORDS[CHUNKS[k + 1][0]][0] - 2, WORDS[b][1] + 24) : WORDS[b][1] + 24));
  if (!c) return null;
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: 1660, textAlign: "center", fontFamily: CAPTION_FONT, fontWeight: 800, fontSize: 64, lineHeight: 1.3 }}>
      {WORDS.slice(c[0], c[1] + 1).map(([w0, w1, t], i) => {
        const active = f >= w0 && f <= w1 + 2;
        const said = f > w1 + 2;
        const popK = active ? 1 + 0.08 * Math.sin(clamp01((f - w0) / 5) * Math.PI) : 1;
        return (
          <span key={i} style={{ display: "inline-block", margin: "0 9px", transform: `scale(${popK})`,
            color: active ? "#ffffff" : said ? INKC : "rgba(43,43,51,0.38)",
            background: active ? TEAL : "transparent", borderRadius: 14, padding: active ? "2px 14px" : "2px 0",
            boxShadow: active ? "0 6px 18px rgba(43,43,51,0.3)" : "none" }}>{t}</span>
        );
      })}
    </div>
  );
};
// ---------- film ----------
const SHOTS: ShotDef[] = [
  { from: 0, to: F.school, z0: 1.0, z1: 1.08, fx: 540, fy: 640, render: (f) => <S_Hook f={f as unknown as number} /> },
  { from: F.school, to: F.best, z0: 1.0, z1: 1.06, fx: 540, fy: 700, render: (f) => <S_School f={f as unknown as number} /> },
  { from: F.best, to: F.basics, z0: 1.0, z1: 1.07, fx: 540, fy: 800, render: (f) => <S_NoCode f={f as unknown as number} /> },
  { from: F.basics, to: F.then2, z0: 1.0, z1: 1.08, fx: 540, fy: 640, render: (f) => <S_Basics f={f as unknown as number} /> },
  { from: F.then2, to: F.research - 16, z0: 1.0, z1: 1.06, fx: 600, fy: 900, render: (f) => <S_Level f={f as unknown as number} /> },
  { from: F.research - 16, to: F.byEnd, z0: 1.0, z1: 1.06, fx: 540, fy: 860, render: (f) => <S_Agents f={f as unknown as number} /> },
  { from: F.byEnd, to: F.press1, z0: 1.0, z1: 1.06, fx: 540, fy: 820, render: (f) => <S_Command f={f as unknown as number} /> },
  { from: F.press1, to: F.lesson1, z0: 1.0, z1: 1.05, fx: 540, fy: 900, render: (f) => <S_Press f={f as unknown as number} /> },
  { from: F.lesson1, to: F.class24, z0: 1.0, z1: 1.08, fx: 540, fy: 640, render: (f) => <S_L1 f={f as unknown as number} /> },
  { from: F.class24, to: TOTAL + 1, z0: 1.03, z1: 1.0, fx: 540, fy: 900, render: (f) => <S_End f={f as unknown as number} /> },
];
const KICKS: [number, number][] = [
  [F.free1 + 6, 16], [F.school, 14], [F.l180, 12], [F.zero + 26, 10], [F.zero + 62, 10], [F.can, 14],
  [F.basics, 10], [F.level, 12], [F.research, 10], [F.social, 10], [F.customers, 10], [F.command, 12],
  [F.free2, 16], [F.press1 + 26, 12], [F.lesson1, 10], [F.predicts, 12], [F.class24, 12], [F.sub2 + 18, 12], [F.seat, 12],
];
export const IntroFilm: React.FC = () => {
  const f = useCurrentFrame();
  const fadeIn = eout(ramp(f, 0, 10));
  const fadeOut = 1 - ramp(f, TOTAL - 16, TOTAL - 2);
  return (
    <AbsoluteFill style={{ background: PAPER }}>
      <FontStyle />
      <Sequence from={15} durationInFrames={TOTAL - 15}><Audio src={staticFile("projects/intro1/narration.wav")} volume={1} /></Sequence>
      <svg width={VW} height={VH} viewBox={`0 0 ${VW} ${VH}`}>
        <Defs />
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill={COR} />
        </marker>
        <Shots f={f} kicks={KICKS} shots={SHOTS.map(s => ({
          ...s,
          render: (_ff: number, p: number) => (
            <g>
              <Paper f={f} />
              {s.render(f, p)}
            </g>
          ),
        }))} />
        <Header f={f} />
        <rect width={VW} height={VH} fill={PAPER} opacity={1 - fadeIn} />
        <rect width={VW} height={VH} fill="#fff" opacity={1 - fadeOut} />
      </svg>
      <LightCaptions f={f} />
    </AbsoluteFill>
  );
};
