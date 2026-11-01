// projects/t2d/
import React from "react";
import { AbsoluteFill } from "remotion";
import { Teacher2D, TeacherPose, LeftHand, Outfit } from "./Teacher2D";
const HANDS: LeftHand[] = ["relaxed", "openPalm", "fingerUp", "wave", "thumbsUp", "pocket"];
const OUTS: Outfit[] = ["vest", "blazer", "sweater", "cardigan", "shirt"];
const Cell: React.FC<{ x: number; y: number; w: number; h: number; s: number; pose: TeacherPose; label: string; id: string; dx?: number }> = ({ x, y, w, h, s, pose, label, id, dx = 0 }) => (
  <g>
    <defs><clipPath id={id}><rect x={x} y={y} width={w} height={h} rx={16} /></clipPath></defs>
    <rect x={x} y={y} width={w} height={h} rx={16} fill="#fff" />
    <g clipPath={`url(#${id})`}><g transform={`translate(${x + dx} ${y + 6}) scale(${s})`}><Teacher2D pose={pose} /></g></g>
    <text x={x + w / 2} y={y + h + 30} textAnchor="middle" fontFamily="sans-serif" fontWeight={700} fontSize={24} fill="#2A1E18">{label}</text>
  </g>
);
export const T2: React.FC = () => (
  <AbsoluteFill style={{ background: "#F3EEE4" }}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <text x={540} y={50} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={36} fill="#2A1E18">LEFT HAND — gestures</text>
      {HANDS.map((h, i) => <Cell key={h} id={`h${i}`} x={14 + (i % 3) * 356} y={74 + Math.floor(i / 3) * 470} w={340} h={420} s={0.62} dx={20} pose={{ point: 0.15, smile: 0.9, leftHand: h }} label={`${i + 1}. ${h}`} />)}
      <text x={540} y={1050} textAnchor="middle" fontFamily="sans-serif" fontWeight={800} fontSize={36} fill="#2A1E18">CLOTHES</text>
      {OUTS.map((o, i) => <Cell key={o} id={`o${i}`} x={10 + i * 214} y={1076} w={200} h={760} s={0.92} dx={-84} pose={{ point: 0.1, smile: 0.9, outfit: o }} label={`${String.fromCharCode(65 + i)}. ${o}`} />)}
    </svg>
  </AbsoluteFill>
);
