// projects/t2d/
import React from "react";
import { AbsoluteFill } from "remotion";
import { Teacher2D, TeacherPose } from "./Teacher2D";
const POSES: [string, TeacherPose][] = [
  ["Pointing up", { point: 1, talk: 0.5, brow: 0.4, smile: 0.9 }],
  ["Pointing at board", { point: 0.6, talk: 0.2, lookX: 0.8, headTilt: 4 }],
  ["Standing, smiling", { point: 0, smile: 1 }],
  ["Surprised", { point: 0.85, talk: 1, brow: 1.2, smile: 0.4 }],
  ["Thinking (blink, head tilt)", { point: 0.25, blink: 1, headTilt: -7, brow: -0.4, smile: 0.4 }],
  ["Explaining (talking)", { point: 0.45, talk: 0.7, lookX: -0.4, headTilt: -3, brow: 0.3 }],
];
export const T2: React.FC = () => (
  <AbsoluteFill style={{ background: "#F3EEE4" }}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      {POSES.map(([label, p], i) => {
        const x = (i % 3) * 360, y = Math.floor(i / 3) * 960;
        return (
          <g key={i}>
            <rect x={x + 10} y={y + 10} width={340} height={940} rx={24} fill="#FFFFFF" stroke="#E2DBCF" strokeWidth={3} />
            <defs><clipPath id={`pc${i}`}><rect x={x + 10} y={y + 10} width={340} height={940} rx={24} /></clipPath></defs><g clipPath={`url(#pc${i})`}><g transform={`translate(${x - 22} ${y + 150}) scale(0.8)`}><Teacher2D pose={p} /></g></g>
            <text x={x + 180} y={y + 920} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={28} fill="#2A1E18">{label}</text>
          </g>
        );
      })}
    </svg>
  </AbsoluteFill>
);
