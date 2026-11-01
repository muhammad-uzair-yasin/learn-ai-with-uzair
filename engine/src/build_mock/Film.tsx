// 10-second sample of the Agent School 3D classroom look (first lines of Lesson 1).
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle, ramp, eout } from "./kit";
import { Caps, Narration } from "./factkit";
import { Classroom, L, PersonLook, camPath } from "./classroom";
import { WORDS, CHUNKS, ENV } from "./words";
const T: PersonLook = { skin: L.skin[0], hair: "#1A1410", shirt: "#2D7FF9", pants: "#2A3350", hairStyle: "short", beard: true };
const S: PersonLook[] = [
  { skin: L.skin[1], hair: "#6B3E1F", shirt: "#F28C6B", hairStyle: "long" },
  { skin: L.skin[2], hair: "#111", shirt: "#7A5CFA", hairStyle: "short" },
  { skin: L.skin[3], hair: "#2A1A10", shirt: "#1FAF6B", hairStyle: "bun" },
  { skin: L.skin[4], hair: "#E04E5E", shirt: "#F2C14E", hairStyle: "cap" },
  { skin: L.skin[1], hair: "#C9A15A", shirt: "#4AA3DF", hairStyle: "short", glasses: true },
];
const Screen: React.FC<{ f: number }> = ({ f }) => {
  const k = (at: number) => eout(ramp(f, at, at + 10));
  return (
    <g fontFamily="InterLocal, sans-serif" fontWeight={800}>
      <defs><radialGradient id="sg" cx="30%" cy="20%" r="90%"><stop offset="0" stopColor="#1C3A7A" /><stop offset="1" stopColor="#081230" /></radialGradient></defs>
      <rect width={1920} height={1080} fill="url(#sg)" />
      <circle cx={1500} cy={850} r={420} fill="#3B5BFF" opacity={0.25} />
      <circle cx={300} cy={200} r={300} fill="#00C2FF" opacity={0.18} />
      <text x={110} y={120} fontSize={40} fill="#5EE7FF" letterSpacing={6}>AGENT SCHOOL · LESSON 1</text>
      <g opacity={k(15)} transform={`translate(0 ${(1 - k(15)) * 30})`}><text x={960} y={360} textAnchor="middle" fontSize={150} fill="#fff">AI DOESN'T</text></g>
      <g opacity={k(34)} transform={`translate(0 ${(1 - k(34)) * 30})`}><text x={960} y={540} textAnchor="middle" fontSize={180} fill="#fff">THINK</text></g>
      {f > 48 && <path d={`M700 495 L${700 + 520 * eout(ramp(f, 48, 56))} 475`} stroke="#FF5C6C" strokeWidth={22} strokeLinecap="round" />}
      <g opacity={k(62)} transform={`translate(0 ${(1 - k(62)) * 30})`}><text x={960} y={740} textAnchor="middle" fontSize={170} fill="#5EE7FF">IT PREDICTS.</text></g>
      {["the", "next", "word", "→", "the", "next", "word"].map((w, i) => {
        const p = eout(ramp(f, 100 + i * 5, 110 + i * 5));
        return p > 0 ? <g key={i} opacity={p}><rect x={330 + i * 185} y={830} width={170} height={84} rx={20} fill={i === 3 ? "none" : "rgba(255,255,255,0.12)"} stroke={i === 3 ? "none" : "rgba(255,255,255,0.4)"} strokeWidth={3} /><text x={415 + i * 185} y={887} textAnchor="middle" fontSize={44} fill="#fff">{w}</text></g> : null;
      })}
    </g>
  );
};
export const Mock: React.FC = () => {
  const f = useCurrentFrame();
  const talk = Math.max(0, ENV[Math.max(0, f - 15)] ?? 0);
  const cam = camPath(f, [
    [0, { pos: [0.05, 1.9, 3.1], look: [0.0, 1.75, -4], fov: 58 }],
    [40, { pos: [0.05, 1.9, 3.1], look: [0.0, 1.75, -4], fov: 58 }],
    [95, { pos: [-0.2, 2.0, -0.3], look: [-0.2, 2.0, -4], fov: 52 }],
    [125, { pos: [-0.2, 2.0, -0.3], look: [-0.2, 2.0, -4], fov: 52 }],
    [160, { pos: [0.55, 1.75, -1.15], look: [1.7, 1.7, -3.15], fov: 46 }],
    [225, { pos: [0.6, 1.72, -1.35], look: [1.7, 1.72, -3.15], fov: 44 }],
  ]);
  const toCam = f > 130 ? eout(ramp(f, 130, 150)) : 0;
  const point = f < 118 ? eout(ramp(f, 8, 20)) : 1 - eout(ramp(f, 118, 135));
  return (
    <AbsoluteFill style={{ background: "#F4EFE6" }}>
      <FontStyle />
      <Narration slug="mock" total={225} />
      <Classroom f={f} cam={cam} screen={<Screen f={f} />}
        teacher={{ look: T, p: [1.75, 0, -3.15], turn: -0.45 + toCam * 0.1, headTurn: 0.25 - toCam * 0.75 + Math.sin(f * 0.07) * 0.05, talk, blink: (f % 97) < 4 ? 0.1 : 1, armPoint: point, gesture: 0.3 + 0.4 * toCam * (0.5 + 0.5 * Math.sin(f * 0.15)) }}
        students={[
          { look: S[0], p: [-1.5, 0, -1.0], nod: f > 70 && f < 90 ? 0.15 : 0 }, { look: S[1], p: [0.05, 0, -1.0], laptop: true }, { look: S[2], p: [1.6, 0, -1.0], nod: f > 75 && f < 95 ? 0.15 : 0 },
          { look: S[3], p: [-0.8, 0, 0.75], laptop: true }, { look: S[4], p: [0.85, 0, 0.75] },
        ]} />
      <div style={{ position: "absolute", left: 40, right: 40, top: 1560, height: 120, borderRadius: 40, background: "rgba(255,255,255,0.88)", boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }} />
      <Caps f={f} words={WORDS} chunks={CHUNKS} accent={L.blue} theme="light" y={1578} />
    </AbsoluteFill>
  );
};
