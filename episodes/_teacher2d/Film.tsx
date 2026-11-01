// projects/t2d/
import React from "react";
import { AbsoluteFill } from "remotion";
import { Teacher2D } from "./Teacher2D";
const P = { point: 1, talk: 0.4, brow: 0.4, smile: 0.9 };
export const T2: React.FC = () => (
  <AbsoluteFill style={{ background: "#F3EEE4" }}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        <clipPath id="c1"><rect x={20} y={20} width={510} height={460} rx={20} /></clipPath>
        <clipPath id="c2"><rect x={550} y={20} width={510} height={460} rx={20} /></clipPath>
      </defs>
      <g transform="translate(110 480) scale(1.6)"><Teacher2D pose={P} /></g>
      <g clipPath="url(#c1)"><rect x={20} y={20} width={510} height={460} fill="#fff" /><g transform="translate(-1178 -474) scale(4)"><Teacher2D pose={P} /></g></g>
      <g clipPath="url(#c2)"><rect x={550} y={20} width={510} height={460} fill="#fff" /><g transform="translate(90 -1646) scale(4)"><Teacher2D pose={P} /></g></g>
      <rect x={20} y={20} width={510} height={460} rx={20} fill="none" stroke="#ccc" strokeWidth={3} />
      <rect x={550} y={20} width={510} height={460} rx={20} fill="none" stroke="#ccc" strokeWidth={3} />
    </svg>
  </AbsoluteFill>
);
