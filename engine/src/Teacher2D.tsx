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
      {/* ===== head ===== */}
      <g transform={`rotate(${headTilt} 200 260)`}>
        {/* ears */}
        <ellipse cx={104} cy={178} rx={20} ry={27} fill={TC.skin} stroke={TC.out} strokeWidth={SW} />
        <ellipse cx={296} cy={178} rx={20} ry={27} fill={TC.skin} stroke={TC.out} strokeWidth={SW} />
        <path d="M100 168 q8 8 2 20 M300 168 q-8 8 -2 20" stroke={TC.skinSh} strokeWidth={4} fill="none" strokeLinecap="round" />
        {/* face */}
        <path d="M110 150 Q108 70 200 66 Q292 70 290 150 Q292 230 246 262 Q200 286 154 262 Q108 230 110 150 Z" fill={TC.skin} stroke={TC.out} strokeWidth={SW} />
        {/* beard (jaw + chin) */}
        <path d="M114 186 Q118 240 158 266 Q200 290 242 266 Q282 240 286 186 Q280 222 258 230 Q240 224 228 236 Q200 246 172 236 Q160 224 142 230 Q120 222 114 186 Z" fill={TC.beard} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
        {/* mouth */}
        <g transform="translate(200 244)">
          {talk > 0.06 ? (
            <g>
              <path d={`M-24 -2 Q0 ${-4 + smile * 2} 24 -2 Q22 ${mouthH} 0 ${mouthH + 4} Q-22 ${mouthH} -24 -2 Z`} fill={TC.mouth} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
              <path d={`M-18 0 Q0 -2 18 0 L16 6 Q0 8 -16 6 Z`} fill={TC.teeth} />
              {mouthH > 12 && <ellipse cx={0} cy={mouthH - 2} rx={11} ry={Math.min(6, mouthH / 4)} fill={TC.tongue} />}
            </g>
          ) : (
            <path d={`M-22 -4 Q0 ${8 + smile * 10} 22 -4`} stroke={TC.out} strokeWidth={4} fill={smile > 0.5 ? TC.mouth : "none"} strokeLinecap="round" />
          )}
        </g>
        {/* moustache */}
        <path d="M170 232 Q185 220 200 228 Q215 220 230 232 Q215 238 200 234 Q185 238 170 232 Z" fill={TC.beard} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
        {/* nose */}
        <path d="M196 170 Q186 202 192 208 Q200 214 210 208" stroke={TC.skinSh} strokeWidth={5} fill="none" strokeLinecap="round" />
        {/* cheeks */}
        <ellipse cx={140} cy={204} rx={14} ry={8} fill="#E88B6A" opacity={0.35} />
        <ellipse cx={260} cy={204} rx={14} ry={8} fill="#E88B6A" opacity={0.35} />
        {/* eyes */}
        {[156, 244].map((x, i) => (
          <g key={i}>
            <g transform={`translate(${x} 166) scale(1 ${blinkK})`}>
              <ellipse rx={23} ry={25} fill={TC.white} stroke={TC.out} strokeWidth={SW} />
              <circle cx={lookX * 6} cy={3} r={13} fill={TC.iris} />
              <circle cx={lookX * 6} cy={3} r={7} fill="#140C08" />
              <circle cx={lookX * 6 + 5} cy={-3} r={4.5} fill={TC.white} />
            </g>
            {blink > 0.6 && <path d={`M${x - 22} 168 Q${x} 176 ${x + 22} 168`} stroke={TC.out} strokeWidth={4} fill="none" strokeLinecap="round" />}
          </g>
        ))}
        {/* eyebrows */}
        <path d={`M128 ${132 + by} Q154 ${116 + by} 180 ${128 + by}`} stroke={TC.hair} strokeWidth={11} fill="none" strokeLinecap="round" />
        <path d={`M220 ${128 + by} Q246 ${116 + by} 272 ${132 + by}`} stroke={TC.hair} strokeWidth={11} fill="none" strokeLinecap="round" />
        {/* hair: wavy volume */}
        <path d="M104 160 Q92 112 112 82 Q118 40 160 34 Q178 10 214 22 Q248 12 270 36 Q306 52 300 96 Q312 130 296 162 Q292 128 276 112 Q262 96 240 100 Q224 84 204 96 Q186 82 166 98 Q140 92 126 112 Q112 128 104 160 Z"
          fill={TC.hair} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M140 60 Q160 46 184 52 M210 40 Q236 34 256 50 M270 70 Q284 80 284 98" stroke={TC.hairHi} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M150 90 Q166 70 190 80 M208 72 Q228 62 248 76" stroke={TC.hairHi} strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};
