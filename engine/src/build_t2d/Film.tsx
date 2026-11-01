// projects/t2d/
import React from "react";
import { AbsoluteFill } from "remotion";
import { Teacher2D, TeacherPose, HairStyle } from "./Teacher2D";
const HAIRS: HairStyle[] = ["quiff", "sidepart", "wavy", "curly", "spiky"];
export const T2: React.FC = () => (
  <AbsoluteFill style={{ background: "#F3EEE4" }}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <rect x={10} y={10} width={1060} height={1000} rx={24} fill="#fff" />
      <g transform="translate(20 70) scale(1.1)"><Teacher2D pose={{ point: 1, talk: 0.4, smile: 0.9 }} /></g>
      <g transform="translate(530 70) scale(1.1)"><Teacher2D pose={{ point: 0.2, smile: 1 }} /></g>
      <text x={540} y={1050} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={34} fill="#2A1E18">Hair options — pick one</text>
      {HAIRS.map((h, i) => {
        const x = 18 + i * 210, y = 1090;
        return (
          <g key={h}>
            <defs><clipPath id={`hc${i}`}><rect x={x} y={y} width={196} height={260} rx={18} /></clipPath></defs>
            <rect x={x} y={y} width={196} height={260} rx={18} fill="#fff" />
            <g clipPath={`url(#hc${i})`}><g transform={`translate(${x - 52} ${y + 6}) scale(0.75)`}><Teacher2D pose={{ point: 0, smile: 0.9, hair: h }} /></g></g>
            <text x={x + 98} y={y + 300} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={30} fill="#2A1E18">{i + 1}</text>
            <text x={x + 98} y={y + 336} textAnchor="middle" fontFamily="sans-serif" fontSize={22} fill="#555">{h}</text>
          </g>
        );
      })}
    </svg>
  </AbsoluteFill>
);
