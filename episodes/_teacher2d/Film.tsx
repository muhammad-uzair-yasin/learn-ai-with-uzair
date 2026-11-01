// projects/t2d/
import React from "react";
import { AbsoluteFill } from "remotion";
import { Teacher2D } from "./Teacher2D";
export const T2: React.FC = () => (
  <AbsoluteFill style={{ background: "#F3EEE4" }}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <g transform="translate(520 260)">
        <rect x={0} y={0} width={520} height={360} rx={14} fill="#B98A55" stroke="#2B1D16" strokeWidth={5} />
        <rect x={18} y={18} width={484} height={324} rx={8} fill="#2E4B40" />
        <text x={260} y={160} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={48} fill="#EAF2EA">AI PREDICTS</text>
        <text x={260} y={225} textAnchor="middle" fontFamily="sans-serif" fontSize={32} fill="#CFE3D4">the next word…</text>
      </g>
      <g transform="translate(110 420) scale(1.45)"><Teacher2D pose={{ point: 1, talk: 0.4, brow: 0.4, smile: 0.9 }} /></g>
      <g transform="translate(640 1180) scale(0.82)"><Teacher2D pose={{ point: 0, smile: 0.8 }} /></g>
      <g transform="translate(860 1180) scale(0.82)"><Teacher2D pose={{ point: 0.5, smile: 0.8, talk: 0.8 }} /></g>
    </svg>
  </AbsoluteFill>
);
