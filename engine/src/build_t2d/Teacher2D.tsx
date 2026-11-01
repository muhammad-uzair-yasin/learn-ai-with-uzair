// Teacher2D.tsx — Agent School's cartoon teacher (Uzair), flat 2D clipart style, drawn in SVG so every part animates:
// blink, mouth (talk 0..1 from the voice envelope), eyebrows, head tilt, pointer arm angle, book arm, body bob.
// Local coords: viewBox 0 0 400 880, feet at y≈870. Character faces the viewer; his LEFT arm (viewer's right) points.
import React from "react";

export const TC = {
  out: "#2B1D16", skin: "#E3A777", skinSh: "#C98A5C", hair: "#2A1C16", hairHi: "#4A3428", beard: "#3A2A21",
  shirt: "#A9CBF2", shirtSh: "#86AEDD", blazer: "#24345E", blazerSh: "#1A2647", pants: "#3A3F4B", shoe: "#1C1C22",
  white: "#FFFFFF", iris: "#5A3420", mouth: "#5B1E1E", tongue: "#D9636B", teeth: "#FFFFFF", book: "#2F7DE1", bookSh: "#1F5FB5",
  stick: "#8A5A2E", tie: "#C0392B",
};
const SW = 4; // outline width
const FACE = "M120 160 Q118 92 200 88 Q282 92 280 160 Q282 236 246 268 Q200 296 154 268 Q118 236 120 160 Z";

export type TeacherPose = {
  talk?: number;      // 0..1 mouth open
  blink?: number;     // 0 open .. 1 closed
  brow?: number;      // -1 frown .. 1 raised
  headTilt?: number;  // degrees
  point?: number;     // 0 = arm down, 1 = pointing up-right at the board
  pointWiggle?: number; // extra degrees on the forearm
  bob?: number;       // px vertical body bob
  smile?: number;     // 0..1
  lookX?: number;     // -1..1 pupils
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

export const Teacher2D: React.FC<{ pose?: TeacherPose }> = ({ pose = {} }) => {
  const { talk = 0, blink = 0, brow = 0, headTilt = 0, point = 0, pointWiggle = 0, bob = 0, smile = 0.7, lookX = 0 } = pose;
  // ---- pointing arm (his left = viewer right), shoulder (282, 318)
  const sx = 282, sy = 318;
  const upA = (20 + (-125 - 20) * point) * Math.PI / 180;       // upper arm angle from straight down... in screen radians
  const ex = sx + Math.sin(-upA) * -1 * 0 + Math.cos(upA + Math.PI / 2) * 0; // (kept simple below)
  const ua = -10 + (-118) * point;                                  // degrees, 0 = down, negative = toward viewer-right/up
  const fa = ua + (-25 - 15 * point) + pointWiggle;                 // forearm angle
  const rad = (a: number) => (a * Math.PI) / 180;
  const L1 = 112, L2 = 100;
  const elx = sx - Math.sin(rad(ua)) * L1, ely = sy + Math.cos(rad(ua)) * L1;
  const hx = elx - Math.sin(rad(fa)) * L2, hy = ely + Math.cos(rad(fa)) * L2;
  const stickA = rad(fa - 6);
  const st1x = hx - Math.sin(stickA) * -14, st1y = hy + Math.cos(stickA) * -14;
  const st2x = hx - Math.sin(stickA) * 140, st2y = hy + Math.cos(stickA) * 140;
  void upA; void ex;

  // ---- face
  const mouthH = 4 + talk * 26;
  const blinkK = Math.max(0.06, 1 - blink);
  const by = -brow * 7;
  return (
    <g transform={`translate(0 ${bob})`}>
      {/* legs */}
      <path d="M148 600 L140 840 L192 840 L200 640 L208 840 L260 840 L252 600 Z" fill={TC.pants} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M200 640 L200 700" stroke={TC.out} strokeWidth={3} />
      {/* shoes */}
      <path d="M134 838 Q132 868 120 870 L196 870 Q200 852 194 838 Z" fill={TC.shoe} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M206 838 Q200 852 204 870 L280 870 Q268 868 266 838 Z" fill={TC.shoe} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      {/* right arm (viewer left) holding the book — drawn behind torso */}
      <Limb d="M120 330 Q96 420 132 478" w={44} fill={TC.blazer} />
      {/* torso: shirt + blazer */}
      <path d="M122 318 Q130 292 172 284 L228 284 Q270 292 278 318 L262 612 L138 612 Z" fill={TC.shirt} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M200 300 L186 330 L200 520 L214 330 Z" fill={TC.tie} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
      <path d="M186 300 L200 318 L214 300 L208 296 L192 296 Z" fill={TC.tie} stroke={TC.out} strokeWidth={3} />
      <path d="M122 318 Q130 292 172 284 L182 288 L168 360 L186 400 L178 612 L138 612 Z" fill={TC.blazer} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M278 318 Q270 292 228 284 L218 288 L232 360 L214 400 L222 612 L262 612 Z" fill={TC.blazer} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M140 600 L176 600 M224 600 L260 600" stroke={TC.blazerSh} strokeWidth={6} />
      <path d="M172 284 L168 360 L186 400 M228 284 L232 360 L214 400" stroke={TC.blazerSh} strokeWidth={5} fill="none" strokeLinejoin="round" />
      <path d="M180 286 L196 312 L186 318 Z M220 286 L204 312 L214 318 Z" fill={TC.white} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={190} cy={470} r={5} fill={TC.blazerSh} /><circle cx={190} cy={520} r={5} fill={TC.blazerSh} />
      <rect x={230} y={420} width={26} height={6} rx={3} fill={TC.blazerSh} />
      {/* book + forearm in front of the torso */}
      <g transform="rotate(-8 170 470)">
        <rect x={120} y={402} width={92} height={120} rx={8} fill={TC.book} stroke={TC.out} strokeWidth={SW} />
        <rect x={120} y={402} width={18} height={120} rx={6} fill={TC.bookSh} stroke={TC.out} strokeWidth={SW} />
        <path d="M150 432 H196 M150 448 H186" stroke="#CFE3FF" strokeWidth={6} strokeLinecap="round" />
      </g>
      <Limb d="M132 478 Q160 488 190 470" w={38} fill={TC.blazer} />
      <path d="M182 462 L196 482" stroke={TC.shirt} strokeWidth={10} strokeLinecap="round" />
      <Hand x={200} y={468} r={16} />
      {/* pointing arm (viewer right) */}
      <Limb d={`M${sx} ${sy} L${elx} ${ely} L${hx} ${hy}`} w={42} fill={TC.blazer} />
      <path d={`M${elx + (hx - elx) * 0.86} ${ely + (hy - ely) * 0.86} L${elx + (hx - elx) * 0.95} ${ely + (hy - ely) * 0.95}`} stroke={TC.shirt} strokeWidth={30} strokeLinecap="butt" />
      <g strokeLinecap="round">
        <path d={`M${st1x} ${st1y} L${st2x} ${st2y}`} stroke={TC.out} strokeWidth={11} />
        <path d={`M${st1x} ${st1y} L${st2x} ${st2y}`} stroke={TC.stick} strokeWidth={6} />
        <circle cx={st2x} cy={st2y} r={6} fill={TC.white} stroke={TC.out} strokeWidth={3} />
      </g>
      <Hand x={hx} y={hy} r={18} />
      {/* neck */}
      <path d="M178 250 L178 292 Q200 304 222 292 L222 250 Z" fill={TC.skinSh} stroke={TC.out} strokeWidth={SW} />
      {/* ===== head (v2: rounder face, big expressive eyes, neat short beard, swept wavy hair) ===== */}
      <g transform={`rotate(${headTilt} 200 270)`}>
        <defs>
          <clipPath id="faceClip"><path d={FACE} /></clipPath>
          <radialGradient id="cheekG" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#F08C6E" stopOpacity={0.55} /><stop offset="1" stopColor="#F08C6E" stopOpacity={0} /></radialGradient>
        </defs>
        {/* back hair mass behind the head */}
        <path d="M112 150 Q100 70 160 44 Q200 30 240 44 Q300 70 288 150 Z" fill={TC.hair} stroke={TC.out} strokeWidth={SW} />
        {/* ears */}
        <g>
          <ellipse cx={113} cy={186} rx={15} ry={21} fill={TC.skin} stroke={TC.out} strokeWidth={SW} />
          <ellipse cx={287} cy={186} rx={15} ry={21} fill={TC.skin} stroke={TC.out} strokeWidth={SW} />
          <path d="M110 178 q7 6 1 16 M290 178 q-7 6 -1 16" stroke={TC.skinSh} strokeWidth={4} fill="none" strokeLinecap="round" />
        </g>
        {/* face */}
        <path d={FACE} fill={TC.skin} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
        <g clipPath="url(#faceClip)">
          <path d="M250 90 Q300 170 262 262 Q300 260 320 160 Z" fill={TC.skinSh} opacity={0.45} />
          <ellipse cx={200} cy={110} rx={70} ry={20} fill="#FFFFFF" opacity={0.08} />
        </g>
        {/* neat short beard: jaw band + chin, sideburns into the hair */}
        <path d="M120 172 Q120 228 148 258 Q172 284 200 286 Q228 284 252 258 Q280 228 280 172 L268 172 Q268 214 250 236 Q238 226 224 232 Q212 240 200 240 Q188 240 176 232 Q162 226 150 236 Q132 214 132 172 Z"
          fill={TC.beard} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
        <path d="M150 262 Q200 292 250 262" stroke="#5A4232" strokeWidth={3} fill="none" opacity={0.6} />
        {/* cheeks */}
        <ellipse cx={146} cy={208} rx={18} ry={11} fill="url(#cheekG)" />
        <ellipse cx={254} cy={208} rx={18} ry={11} fill="url(#cheekG)" />
        {/* mouth */}
        <g transform="translate(200 250)">
          {talk > 0.06 ? (
            <g>
              <path d={`M-21 -4 Q0 -1 21 -4 Q19 ${mouthH} 0 ${mouthH + 3} Q-19 ${mouthH} -21 -4 Z`} fill={TC.mouth} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
              <path d="M-16 -2 Q0 0 16 -2 L14 4 Q0 6 -14 4 Z" fill={TC.teeth} />
              {mouthH > 12 && <ellipse cx={0} cy={mouthH - 2} rx={10} ry={Math.min(5, mouthH / 4)} fill={TC.tongue} />}
            </g>
          ) : (
            <g>
              <path d={`M-20 -4 Q0 ${10 + smile * 6} 20 -4 Z`} fill={TC.mouth} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
              <path d="M-15 -3 Q0 1 15 -3 L13 1 Q0 4 -13 1 Z" fill={TC.teeth} />
            </g>
          )}
        </g>
        {/* moustache */}
        <path d="M172 240 Q186 228 200 236 Q214 228 228 240 Q214 244 200 241 Q186 244 172 240 Z" fill={TC.beard} stroke={TC.out} strokeWidth={2.5} strokeLinejoin="round" />
        {/* nose */}
        <path d="M200 192 Q192 210 196 216 Q202 222 212 214" stroke={TC.skinSh} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={204} cy={206} r={3} fill="#FFFFFF" opacity={0.35} />
        {/* eyes */}
        {[162, 238].map((x, i) => (
          <g key={i}>
            <g transform={`translate(${x} 176) scale(1 ${blinkK})`}>
              <ellipse rx={20} ry={24} fill={TC.white} stroke={TC.out} strokeWidth={3} />
              <circle cx={lookX * 5} cy={4} r={14} fill={TC.iris} />
              <circle cx={lookX * 5} cy={4} r={14} fill="none" stroke="#3A2010" strokeWidth={2} />
              <circle cx={lookX * 5} cy={5} r={7.5} fill="#120A06" />
              <circle cx={lookX * 5 + 5} cy={-2} r={4.5} fill={TC.white} />
              <circle cx={lookX * 5 - 4} cy={10} r={2} fill={TC.white} opacity={0.8} />
            </g>
            {/* upper lash line */}
            <path d={`M${x - 21} ${170 - 18 * blinkK + 4} Q${x} ${170 - 30 * blinkK + 4} ${x + 21} ${170 - 18 * blinkK + 4}`} stroke={TC.out} strokeWidth={5} fill="none" strokeLinecap="round" />
            {blink > 0.6 && <path d={`M${x - 20} 178 Q${x} 186 ${x + 20} 178`} stroke={TC.out} strokeWidth={4} fill="none" strokeLinecap="round" />}
          </g>
        ))}
        {/* eyebrows: thick tapered */}
        <path d={`M136 ${140 + by} Q160 ${122 + by} 186 ${134 + by} Q160 ${130 + by} 138 ${146 + by} Z`} fill={TC.hair} stroke={TC.hair} strokeWidth={5} strokeLinejoin="round" />
        <path d={`M264 ${140 + by} Q240 ${122 + by} 214 ${134 + by} Q240 ${130 + by} 262 ${146 + by} Z`} fill={TC.hair} stroke={TC.hair} strokeWidth={5} strokeLinejoin="round" />
        {/* hair: voluminous wavy top swept up and back (like Uzair) */}
        <path d="M118 160 Q110 120 124 98 Q122 62 156 50 Q170 22 206 28 Q238 16 262 38 Q296 46 292 86 Q304 112 284 160 Q282 128 268 116 Q262 100 244 104 Q236 90 218 98 Q206 86 190 98 Q172 90 160 104 Q140 104 132 120 Q120 132 118 160 Z"
          fill={TC.hair} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M146 72 Q164 56 186 62 M204 46 Q228 38 248 52 M262 66 Q278 76 280 94 M160 92 Q176 78 196 86 M212 80 Q232 72 250 86" stroke={TC.hairHi} strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};
