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
/** tapered capsule outline between (x1,y1) r1 and (x2,y2) r2 */
const capsule = (x1: number, y1: number, x2: number, y2: number, r1: number, r2: number) => {
  const a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a), ny = Math.cos(a);
  return `M${x1 + nx * r1} ${y1 + ny * r1} L${x2 + nx * r2} ${y2 + ny * r2} A${r2} ${r2} 0 0 0 ${x2 - nx * r2} ${y2 - ny * r2} L${x1 - nx * r1} ${y1 - ny * r1} A${r1} ${r1} 0 0 0 ${x1 + nx * r1} ${y1 + ny * r1} Z`;
};
const FACE = "M122 168 Q120 96 200 92 Q280 96 278 168 Q280 232 246 262 Q200 290 154 262 Q120 232 122 168 Z";

export const Teacher2D: React.FC<{ pose?: TeacherPose }> = ({ pose = {} }) => {
  const { talk = 0, blink = 0, brow = 0, headTilt = 0, point = 0, pointWiggle = 0, bob = 0, smile = 0.8, lookX = 0 } = pose;
  const rad = (a: number) => (a * Math.PI) / 180;
  // pointing arm (viewer right): shoulder -> elbow -> wrist
  const sx = 266, sy = 316;
  const ua = -12 + -116 * point, fa = ua + (-28 - 14 * point) + pointWiggle;
  const L1 = 104, L2 = 92;
  const elx = sx - Math.sin(rad(ua)) * L1, ely = sy + Math.cos(rad(ua)) * L1;
  const hx = elx - Math.sin(rad(fa)) * L2, hy = ely + Math.cos(rad(fa)) * L2;
  const sa = rad(fa);
  const dirx = -Math.sin(sa), diry = Math.cos(sa);            // forearm direction (elbow -> hand)
  const st1x = hx - dirx * 20, st1y = hy - diry * 20;
  const st2x = hx + dirx * 150, st2y = hy + diry * 150;
  const handAng = (Math.atan2(diry, dirx) * 180) / Math.PI;    // fist faces along the forearm
  const blinkK = Math.max(0.06, 1 - blink);
  const by = -brow * 7;
  const open = 6 + talk * 22;
  return (
    <g transform={`translate(0 ${bob})`}>
      {/* ---------- legs ---------- */}
      <path d="M152 556 Q150 680 158 806 L196 806 Q198 690 200 600 Q202 690 204 806 L242 806 Q250 680 248 556 Z" fill={TC.pants} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M200 600 L200 640" stroke={TC.out} strokeWidth={3} strokeLinecap="round" />
      <path d="M178 600 Q176 700 178 800 M222 600 Q224 700 222 800" stroke="#454A57" strokeWidth={3} fill="none" opacity={0.8} />
      <path d="M156 790 L196 790 M204 790 L244 790" stroke="#22252D" strokeWidth={5} />
      {/* shoes: rounded toes pointing slightly outward */}
      <path d="M160 800 Q150 800 140 812 Q118 820 120 836 Q122 846 140 846 L196 846 Q202 846 200 832 L198 802 Z" fill={TC.shoe} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M240 800 Q250 800 260 812 Q282 820 280 836 Q278 846 260 846 L204 846 Q198 846 200 832 L202 802 Z" fill={TC.shoe} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M130 826 Q140 818 152 820 M270 826 Q260 818 248 820" stroke="#4A4A55" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M122 840 L198 840 M278 840 L202 840" stroke="#3A3A44" strokeWidth={4} />

      {/* ---------- back (book) arm: shoulder -> elbow ---------- */}
      <path d={capsule(134, 320, 114, 424, 23, 20)} fill={TC.shirt} stroke={TC.out} strokeWidth={SW} />
      {/* ---------- torso ---------- */}
      <path d="M128 318 Q130 296 166 286 L234 286 Q270 296 272 318 Q262 440 254 562 L146 562 Q138 440 128 318 Z" fill={TC.shirt} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      {/* vest */}
      <path d="M142 318 Q150 300 172 292 L200 372 L228 292 Q250 300 258 318 Q252 440 250 546 L150 546 Q148 440 142 318 Z" fill={TC.vest} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M150 530 L250 530 L250 556 Q200 566 150 556 Z" fill={TC.vestSh} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
      {[160, 172, 184, 196, 208, 220, 232, 244].map((x) => <path key={x} d={`M${x} 534 L${x} 556`} stroke="#555B68" strokeWidth={2} />)}
      <path d="M236 320 Q244 430 242 528" stroke={TC.vestSh} strokeWidth={8} fill="none" opacity={0.55} strokeLinecap="round" />
      <path d="M172 292 L200 372 L228 292" stroke="#5B6170" strokeWidth={6} fill="none" strokeLinejoin="round" />
      {/* collar + tie */}
      <path d="M200 304 L191 320 L196 368 L200 378 L204 368 L209 320 Z" fill={TC.tie} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
      <path d="M191 298 L200 312 L209 298 L205 291 L195 291 Z" fill={TC.tie} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
      <path d="M174 284 L198 304 L182 318 Z M226 284 L202 304 L218 318 Z" fill={TC.white} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
      {/* ---------- book held against the chest ---------- */}
      <g transform="rotate(-10 168 452)">
        <rect x={118} y={392} width={96} height={124} rx={8} fill={TC.book} stroke={TC.out} strokeWidth={SW} />
        <rect x={118} y={392} width={20} height={124} rx={6} fill={TC.bookSh} stroke={TC.out} strokeWidth={SW} />
        <rect x={210} y={398} width={8} height={112} rx={3} fill="#F4F1E8" stroke={TC.out} strokeWidth={2.5} />
        <path d="M150 424 H198 M150 442 H186" stroke="#CFE3FF" strokeWidth={6} strokeLinecap="round" />
        <circle cx={174} cy={478} r={14} fill="none" stroke="#CFE3FF" strokeWidth={5} />
      </g>
      {/* forearm across the body + cuff + hand gripping the book edge */}
      <path d={capsule(114, 424, 182, 476, 20, 17)} fill={TC.shirt} stroke={TC.out} strokeWidth={SW} />
      <path d={capsule(170, 467, 184, 477, 18, 18)} fill={TC.shirtSh} stroke={TC.out} strokeWidth={3} />
      <g transform="translate(198 474) rotate(-30)">
        <ellipse cx={0} cy={0} rx={17} ry={15} fill={TC.skin} stroke={TC.out} strokeWidth={SW} />
        {[-9, 0, 9].map((y) => <path key={y} d={`M6 ${y - 4} q12 2 12 4 q0 4 -12 4`} fill={TC.skin} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />)}
        <path d="M-6 -12 q-4 -10 6 -14 q8 -2 10 6" fill={TC.skin} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
      </g>

      {/* ---------- pointing arm ---------- */}
      <path d={capsule(sx, sy, elx, ely, 23, 20)} fill={TC.shirt} stroke={TC.out} strokeWidth={SW} />
      <path d={capsule(elx, ely, hx - dirx * 12, hy - diry * 12, 20, 16)} fill={TC.shirt} stroke={TC.out} strokeWidth={SW} />
      <circle cx={elx} cy={ely} r={19} fill={TC.shirt} />
      <path d={capsule(hx - dirx * 22, hy - diry * 22, hx - dirx * 10, hy - diry * 10, 18, 18)} fill={TC.shirtSh} stroke={TC.out} strokeWidth={3} />
      {/* pointer stick (under the fist) */}
      <g strokeLinecap="round">
        <path d={`M${st1x} ${st1y} L${st2x} ${st2y}`} stroke={TC.out} strokeWidth={12} />
        <path d={`M${st1x} ${st1y} L${st2x} ${st2y}`} stroke={TC.stick} strokeWidth={7} />
        <circle cx={st2x} cy={st2y} r={6.5} fill={TC.white} stroke={TC.out} strokeWidth={3} />
      </g>
      {/* fist around the stick */}
      <g transform={`translate(${hx} ${hy}) rotate(${handAng})`}>
        <rect x={-6} y={-17} width={30} height={34} rx={13} fill={TC.skin} stroke={TC.out} strokeWidth={SW} />
        {[-9, 0, 9].map((y) => <path key={y} d={`M14 ${y - 5} q12 1 12 5 q0 5 -12 5`} fill={TC.skin} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />)}
        <path d="M2 -16 q14 -6 20 4" fill="none" stroke={TC.out} strokeWidth={3} strokeLinecap="round" />
        <path d="M0 10 q8 4 14 -2" fill="none" stroke={TC.skinSh} strokeWidth={3} strokeLinecap="round" />
      </g>
      {/* neck */}
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
