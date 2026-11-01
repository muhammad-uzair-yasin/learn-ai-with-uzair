// Teacher2D.tsx — Agent School's cartoon teacher, flat 2D clipart style (v3, Uzair Nov 1: white man, glasses, brown
// swept hair, blue eyes, no beard, shirt + grey sweater vest + tie). Drawn in SVG so every part animates:
// blink, mouth (talk 0..1 from the voice envelope), eyebrows, head tilt, pointer arm angle, body bob.
// Local coords: viewBox 0 0 400 880, feet at y≈870. Faces the viewer; his LEFT arm (viewer's right) points.
import React from "react";

export const TC = {
  out: "#2A1E18", skin: "#F7D2B3", skinSh: "#E9AE8A", skinHi: "#FFE6D2", hair: "#6B4226", hairSh: "#4E2E19", hairHi: "#9A6A40",
  shirt: "#BFDDF7", shirtSh: "#97C2EA", vest: "#7C8290", vestSh: "#646A78", tie: "#1F2E55", pants: "#2F333D", shoe: "#1A1A20",
  white: "#FFFFFF", iris: "#3D8FE0", irisD: "#1F5FA8", mouth: "#7A2430", tongue: "#E8707A", book: "#2F7DE1", bookSh: "#1F5FB5",
  stick: "#8A5A2E", frame: "#2A1E18", cheek: "#F49A86",
};
const SW = 4;

export type TeacherPose = {
  talk?: number; blink?: number; brow?: number; headTilt?: number;
  point?: number; pointWiggle?: number; bob?: number; smile?: number; lookX?: number;
};

const Limb: React.FC<{ d: string; w: number; fill: string }> = ({ d, w, fill }) => (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} stroke={TC.out} strokeWidth={w + SW * 2} />
    <path d={d} stroke={fill} strokeWidth={w} />
  </g>
);
const Hand: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 17 }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={TC.skin} stroke={TC.out} strokeWidth={SW} />
    <path d={`M${x - r * 0.5} ${y + r * 0.2} q ${r * 0.5} ${r * 0.5} ${r} 0`} stroke={TC.skinSh} strokeWidth={3} fill="none" strokeLinecap="round" />
  </g>
);
const FACE = "M122 168 Q120 96 200 92 Q280 96 278 168 Q280 232 246 262 Q200 290 154 262 Q120 232 122 168 Z";

export const Teacher2D: React.FC<{ pose?: TeacherPose }> = ({ pose = {} }) => {
  const { talk = 0, blink = 0, brow = 0, headTilt = 0, point = 0, pointWiggle = 0, bob = 0, smile = 0.8, lookX = 0 } = pose;
  const rad = (a: number) => (a * Math.PI) / 180;
  const sx = 282, sy = 318;
  const ua = -10 + -118 * point, fa = ua + (-25 - 15 * point) + pointWiggle;
  const L1 = 112, L2 = 100;
  const elx = sx - Math.sin(rad(ua)) * L1, ely = sy + Math.cos(rad(ua)) * L1;
  const hx = elx - Math.sin(rad(fa)) * L2, hy = ely + Math.cos(rad(fa)) * L2;
  const sa = rad(fa - 6);
  const st1x = hx + Math.sin(sa) * 14, st1y = hy - Math.cos(sa) * 14;
  const st2x = hx - Math.sin(sa) * 140, st2y = hy + Math.cos(sa) * 140;
  const blinkK = Math.max(0.06, 1 - blink);
  const by = -brow * 7;
  const open = 6 + talk * 22;
  return (
    <g transform={`translate(0 ${bob})`}>
      <path d="M148 600 L142 840 L194 840 L200 650 L206 840 L258 840 L252 600 Z" fill={TC.pants} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M200 650 L200 700" stroke={TC.out} strokeWidth={3} />
      <path d="M136 836 Q132 866 118 870 L196 870 Q200 852 196 836 Z" fill={TC.shoe} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M204 836 Q200 852 204 870 L282 870 Q268 866 264 836 Z" fill={TC.shoe} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <Limb d="M122 330 Q98 420 132 478" w={42} fill={TC.shirt} />
      <path d="M124 318 Q132 292 172 284 L228 284 Q268 292 276 318 L262 612 L138 612 Z" fill={TC.shirt} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M140 330 Q150 300 176 292 L200 380 L224 292 Q250 300 260 330 L254 604 L146 604 Z" fill={TC.vest} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M146 560 L254 560" stroke={TC.vestSh} strokeWidth={10} />
      <path d="M150 576 L250 576 M150 590 L250 590" stroke={TC.vestSh} strokeWidth={3} opacity={0.7} />
      <path d="M240 330 L250 560" stroke={TC.vestSh} strokeWidth={8} opacity={0.6} />
      <path d="M200 302 L190 320 L196 372 L200 384 L204 372 L210 320 Z" fill={TC.tie} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
      <path d="M190 298 L200 312 L210 298 L205 292 L195 292 Z" fill={TC.tie} stroke={TC.out} strokeWidth={3} />
      <path d="M176 284 L198 306 L184 316 Z M224 284 L202 306 L216 316 Z" fill={TC.white} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
      <g transform="rotate(-8 170 470)">
        <rect x={120} y={402} width={92} height={120} rx={8} fill={TC.book} stroke={TC.out} strokeWidth={SW} />
        <rect x={120} y={402} width={18} height={120} rx={6} fill={TC.bookSh} stroke={TC.out} strokeWidth={SW} />
        <path d="M150 432 H196 M150 448 H186" stroke="#CFE3FF" strokeWidth={6} strokeLinecap="round" />
      </g>
      <Limb d="M132 478 Q160 488 190 470" w={36} fill={TC.shirt} />
      <Hand x={200} y={468} r={16} />
      <Limb d={`M${sx} ${sy} L${elx} ${ely} L${hx} ${hy}`} w={40} fill={TC.shirt} />
      <g strokeLinecap="round">
        <path d={`M${st1x} ${st1y} L${st2x} ${st2y}`} stroke={TC.out} strokeWidth={11} />
        <path d={`M${st1x} ${st1y} L${st2x} ${st2y}`} stroke={TC.stick} strokeWidth={6} />
        <circle cx={st2x} cy={st2y} r={6} fill={TC.white} stroke={TC.out} strokeWidth={3} />
      </g>
      <Hand x={hx} y={hy} r={18} />
      <path d="M180 248 L180 292 Q200 302 220 292 L220 248 Z" fill={TC.skinSh} stroke={TC.out} strokeWidth={SW} />

      {/* ================= HEAD ================= */}
      <g transform={`rotate(${headTilt} 200 270)`}>
        <defs><clipPath id="faceClipT"><path d={FACE} /></clipPath></defs>
        <ellipse cx={124} cy={188} rx={15} ry={21} fill={TC.skin} stroke={TC.out} strokeWidth={SW} />
        <ellipse cx={276} cy={188} rx={15} ry={21} fill={TC.skin} stroke={TC.out} strokeWidth={SW} />
        <path d="M121 180 q7 6 1 16 M279 180 q-7 6 -1 16" stroke={TC.skinSh} strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d={FACE} fill={TC.skin} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
        <g clipPath="url(#faceClipT)">
          <path d="M246 100 Q296 180 252 266 Q300 262 318 170 Z" fill={TC.skinSh} opacity={0.5} />
        </g>
        <ellipse cx={150} cy={214} rx={16} ry={9} fill={TC.cheek} opacity={0.45} />
        <ellipse cx={250} cy={214} rx={16} ry={9} fill={TC.cheek} opacity={0.45} />
        <g transform="translate(200 236)">
          <path d={`M-30 0 Q0 ${8 * smile} 30 0 Q26 ${open + 12} 0 ${open + 16} Q-26 ${open + 12} -30 0 Z`} fill={TC.mouth} stroke={TC.out} strokeWidth={3.5} strokeLinejoin="round" />
          <path d={`M-25 2 Q0 ${9 * smile + 2} 25 2 L23 9 Q0 ${14 * smile + 4} -23 9 Z`} fill={TC.white} />
          <ellipse cx={0} cy={open + 9} rx={14} ry={Math.max(2, Math.min(7, open / 3.5))} fill={TC.tongue} />
          <path d="M-33 -2 Q-36 3 -31 6 M33 -2 Q36 3 31 6" stroke={TC.out} strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
        <path d="M202 192 Q192 210 198 216 Q205 220 213 214" stroke={TC.skinSh} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx={205} cy={205} rx={3} ry={2} fill={TC.skinHi} />
        {[164, 236].map((x, i) => (
          <g key={i}>
            <g transform={`translate(${x} 176) scale(1 ${blinkK})`}>
              <ellipse rx={19} ry={22} fill={TC.white} />
              <circle cx={lookX * 5} cy={3} r={14} fill={TC.iris} />
              <path d={`M${lookX * 5 - 14} 3 A14 14 0 0 1 ${lookX * 5 + 14} 3 Z`} fill={TC.irisD} opacity={0.45} />
              <circle cx={lookX * 5} cy={4} r={7} fill="#0E1626" />
              <circle cx={lookX * 5 + 5} cy={-3} r={5} fill={TC.white} />
              <circle cx={lookX * 5 - 5} cy={9} r={2.2} fill={TC.white} opacity={0.85} />
              <ellipse rx={19} ry={22} fill="none" stroke={TC.out} strokeWidth={3} />
            </g>
            {blink > 0.6 && <path d={`M${x - 18} 178 Q${x} 186 ${x + 18} 178`} stroke={TC.out} strokeWidth={4} fill="none" strokeLinecap="round" />}
          </g>
        ))}
        <g fill="none" stroke={TC.frame} strokeWidth={6}>
          <circle cx={164} cy={178} r={31} />
          <circle cx={236} cy={178} r={31} />
          <path d="M195 172 Q200 166 205 172" />
          <path d="M133 172 L124 168 M267 172 L276 168" />
        </g>
        <path d="M146 160 Q156 152 168 154 M218 160 Q228 152 240 154" stroke="#FFFFFF" strokeWidth={4} opacity={0.7} strokeLinecap="round" fill="none" />
        <path d={`M140 ${136 + by} Q162 ${124 + by} 186 ${134 + by}`} stroke={TC.hairSh} strokeWidth={9} fill="none" strokeLinecap="round" />
        <path d={`M214 ${134 + by} Q238 ${124 + by} 260 ${136 + by}`} stroke={TC.hairSh} strokeWidth={9} fill="none" strokeLinecap="round" />
        <path d="M120 176 Q112 128 126 104 Q128 70 160 56 Q176 26 214 30 Q246 22 270 44 Q300 62 290 104 Q296 140 280 176 Q280 140 266 124 Q252 112 232 116 Q236 104 226 96 Q210 112 184 112 Q160 110 140 124 Q126 140 120 176 Z"
          fill={TC.hair} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M150 70 Q170 30 214 30 Q256 28 270 50 Q246 40 222 50 Q196 44 176 58 Q160 62 150 70 Z" fill={TC.hairHi} />
        <path d="M168 84 Q192 64 226 66 Q206 72 192 86 Z M236 70 Q258 72 272 92 Q252 82 238 84 Z" fill={TC.hairHi} opacity={0.85} />
        <path d="M132 120 Q140 104 156 98" stroke={TC.hairSh} strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};
