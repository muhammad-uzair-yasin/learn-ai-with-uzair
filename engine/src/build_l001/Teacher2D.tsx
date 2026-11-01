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

export type HairStyle = "quiff" | "sidepart" | "curly" | "spiky" | "wavy";
const HO = { stroke: "#2A1E18", strokeWidth: 4, strokeLinejoin: "round" as const };
export const Hair: React.FC<{ style: HairStyle }> = ({ style }) => {
  if (style === "sidepart") return (
    <g>
      <path d="M118 182 Q106 120 136 86 Q170 54 214 58 Q262 60 284 98 Q296 136 282 182 Q280 146 264 128 Q240 118 214 116 Q182 112 160 104 Q150 112 146 124 Q132 140 118 182 Z" fill={TC.hair} {...HO} />
      <path d="M160 104 Q154 84 166 66" stroke={TC.hairSh} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M178 70 Q226 60 262 84 Q232 76 206 80 Q190 80 178 70 Z M150 80 Q156 72 164 70 Q160 80 154 92 Z" fill={TC.hairHi} />
    </g>
  );
  if (style === "curly") {
    const C: [number, number, number][] = [[132, 142, 20], [128, 112, 22], [146, 84, 24], [176, 64, 25], [208, 58, 26], [240, 64, 25], [266, 84, 24], [278, 114, 22], [272, 144, 20], [162, 100, 20], [196, 90, 22], [232, 94, 21], [254, 112, 18], [148, 120, 16]];
    return <g>{C.map(([x, y, r], i) => <g key={i}><circle cx={x} cy={y} r={r} fill={TC.hair} {...HO} /></g>)}{C.map(([x, y, r], i) => <circle key={`h${i}`} cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.32} fill={TC.hairHi} />)}</g>;
  }
  if (style === "spiky") return (
    <g>
      <path d="M120 180 Q114 140 124 118 L112 92 L146 98 L140 62 L176 82 L186 42 L210 76 L236 40 L244 80 L276 62 L268 98 L298 96 L280 124 Q290 150 282 180 Q278 146 262 130 Q230 118 200 118 Q164 118 140 132 Q126 146 120 180 Z" fill={TC.hair} {...HO} />
      <path d="M186 52 L198 84 M236 50 L232 84 M150 74 L170 96" stroke={TC.hairHi} strokeWidth={6} strokeLinecap="round" />
    </g>
  );
  if (style === "wavy") return (
    <g>
      <path d="M116 184 Q100 140 116 108 Q114 70 150 56 Q170 34 202 40 Q232 28 258 46 Q292 56 294 92 Q306 126 288 160 Q286 178 282 184 Q280 150 268 134 Q254 140 242 128 Q228 140 214 128 Q198 140 184 128 Q168 140 156 128 Q140 138 132 150 Q122 162 116 184 Z" fill={TC.hair} {...HO} />
      <path d="M142 74 Q160 58 180 66 M204 52 Q228 44 248 58 M262 74 Q280 86 280 106 M150 104 Q166 92 182 100 M214 96 Q232 88 248 100" stroke={TC.hairHi} strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
  return (
    <g>
      <path d="M120 176 Q112 128 126 104 Q128 70 160 56 Q176 26 214 30 Q246 22 270 44 Q300 62 290 104 Q296 140 280 176 Q280 140 266 124 Q252 112 232 116 Q236 104 226 96 Q210 112 184 112 Q160 110 140 124 Q126 140 120 176 Z" fill={TC.hair} {...HO} />
      <path d="M150 70 Q170 30 214 30 Q256 28 270 50 Q246 40 222 50 Q196 44 176 58 Q160 62 150 70 Z" fill={TC.hairHi} />
      <path d="M168 84 Q192 64 226 66 Q206 72 192 86 Z M236 70 Q258 72 272 92 Q252 82 238 84 Z" fill={TC.hairHi} opacity={0.85} />
      <path d="M132 120 Q140 104 156 98" stroke={TC.hairSh} strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>
  );
};
export type Outfit = "vest" | "blazer" | "sweater" | "cardigan" | "shirt";
export type LeftHand = "relaxed" | "openPalm" | "fingerUp" | "wave" | "thumbsUp" | "pocket";
type OT = { sleeve: string; sleeveSh: string; cuff: string; inner: string; layer: string; layerSh: string; tie: string | null };
export const OUTFITS: Record<Outfit, OT> = {
  vest: { sleeve: "#BFDDF7", sleeveSh: "#97C2EA", cuff: "#97C2EA", inner: "#BFDDF7", layer: "#7C8290", layerSh: "#646A78", tie: "#1F2E55" },
  blazer: { sleeve: "#2C3E66", sleeveSh: "#22314F", cuff: "#FFFFFF", inner: "#FFFFFF", layer: "#2C3E66", layerSh: "#22314F", tie: "#B23A48" },
  sweater: { sleeve: "#2E7D6B", sleeveSh: "#24614F", cuff: "#24614F", inner: "#FFFFFF", layer: "#2E7D6B", layerSh: "#24614F", tie: null },
  cardigan: { sleeve: "#D9A441", sleeveSh: "#B98728", cuff: "#B98728", inner: "#FFFFFF", layer: "#D9A441", layerSh: "#B98728", tie: null },
  shirt: { sleeve: "#FFFFFF", sleeveSh: "#DCE3EC", cuff: "#DCE3EC", inner: "#FFFFFF", layer: "", layerSh: "#DCE3EC", tie: "#2F7DE1" },
};
/** Left-hand gestures: hand drawn at the wrist, local -y = away from the wrist (along the forearm). */
const OpenPalm: React.FC<{ spread?: number }> = ({ spread = 1 }) => (
  <g>
    {[[-11, 22, -8], [-4, 27, -3], [4, 27, 2], [11, 21, 7]].map(([x, l, r], i) => (
      <g key={i} transform={`rotate(${r * spread} ${x} -28)`}>
        <path d={smooth([[x - 4.5, -26], [x + 4.5, -26], [x + 4.8, -26 - l + 4], [x, -26 - l - 1], [x - 4.8, -26 - l + 4]], 0.5)} fill={TC.skin} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
      </g>
    ))}
    <path d={smooth([[-16, -2], [16, -2], [17, -18], [14, -32], [-14, -32], [-17, -18]], 0.4)} fill={TC.skin} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
    <path d={smooth([[12, -8], [24, -18], [32, -30], [28, -34], [18, -26], [10, -18]], 0.45)} fill={TC.skin} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
    <path d="M-8 -12 q8 6 16 0 M-6 -22 q6 -3 12 0" stroke={TC.skinSh} strokeWidth={2.2} fill="none" strokeLinecap="round" />
  </g>
);
const FingerUp: React.FC = () => (
  <g>
    <path d={smooth([[-9 - 4.5, -26], [-9 + 4.5, -26], [-9 + 4.8, -58], [-9, -63], [-9 - 4.8, -58]], 0.5)} fill={TC.skin} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
    <path d={smooth([[-16, -2], [16, -2], [18, -18], [14, -34], [-15, -32], [-18, -16]], 0.4)} fill={TC.skin} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
    {[-1, 7, 14].map((x, i) => <path key={i} d={`M${x - 4} -31 q4 -5 8 0`} stroke={TC.out} strokeWidth={2.6} fill="none" strokeLinecap="round" />)}
    <path d={smooth([[16, -10], [8, -22], [-6, -24], [-8, -19], [4, -16], [12, -6]], 0.45)} fill={TC.skin} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
  </g>
);
const ThumbsUp: React.FC = () => (
  <g>
    <path d={smooth([[-16, -2], [16, -2], [18, -16], [16, -32], [-14, -32], [-18, -16]], 0.4)} fill={TC.skin} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
    {[-10, -2, 6].map((y, i) => <path key={i} d={`M-17 ${y - 8 - i * 0} q-6 4 0 8`} stroke={TC.out} strokeWidth={2.6} fill={TC.skin} strokeLinecap="round" />)}
    <path d={smooth([[6, -30], [2, -48], [6, -58], [14, -56], [14, -40], [16, -30]], 0.45)} fill={TC.skin} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
    <path d="M-10 -14 h18 M-10 -22 h18" stroke={TC.skinSh} strokeWidth={2.2} strokeLinecap="round" />
  </g>
);
const LEFT_ARM: Record<LeftHand, [number, number, number, number]> = {
  relaxed: [116, 420, 112, 498], openPalm: [98, 432, 104, 352], fingerUp: [98, 432, 104, 350],
  wave: [94, 420, 66, 344], thumbsUp: [100, 440, 126, 384], pocket: [96, 440, 144, 498],
};
export type TeacherPose = {
  talk?: number; blink?: number; brow?: number; headTilt?: number;
  point?: number; pointWiggle?: number; bob?: number; smile?: number; lookX?: number;
  hair?: HairStyle;
  outfit?: Outfit;
  leftHand?: LeftHand;
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
/** Catmull-Rom → cubic Bézier closed path through points (tension t, 0..1) */
const smooth = (P: [number, number][], t = 0.35) => {
  const n = P.length; let d = `M${P[0][0]} ${P[0][1]}`;
  for (let i = 0; i < n; i++) {
    const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) * t / 2, p1[1] + (p2[1] - p0[1]) * t / 2];
    const c2 = [p2[0] - (p3[0] - p1[0]) * t / 2, p2[1] - (p3[1] - p1[1]) * t / 2];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d + " Z";
};
const norm2 = (x: number, y: number) => { const l = Math.hypot(x, y) || 1; return [-y / l, x / l]; };
/** Organic sleeve: shoulder (wide, puffy) → elbow → wrist. forearmOnly draws just elbow→wrist. */
const armPath = (sx: number, sy: number, ex: number, ey: number, wx: number, wy: number, forearmOnly = false) => {
  const [n1x, n1y] = norm2(ex - sx, ey - sy), [n2x, n2y] = norm2(wx - ex, wy - ey);
  const nex = (n1x + n2x) / 2, ney = (n1y + n2y) / 2;
  const rs = 27, re = 21, rw = 17;
  if (forearmOnly) {
    return smooth([[ex + n2x * re, ey + n2y * re], [wx + n2x * rw, wy + n2y * rw], [wx - n2x * rw, wy - n2y * rw], [ex - n2x * re, ey - n2y * re], [ex - (wx - ex) * 0.12, ey - (wy - ey) * 0.12]], 0.3);
  }
  const mx = (sx + ex) / 2, my = (sy + ey) / 2;
  return smooth([
    [sx - (ex - sx) * 0.18, sy - (ey - sy) * 0.18],
    [sx + n1x * rs, sy + n1y * rs], [mx + n1x * (rs - 1), my + n1y * (rs - 1)], [ex + nex * re, ey + ney * re], [wx + n2x * rw, wy + n2y * rw],
    [wx - n2x * rw, wy - n2y * rw], [ex - nex * (re - 2), ey - ney * (re - 2)], [mx - n1x * (rs - 3), my - n1y * (rs - 3)], [sx - n1x * rs, sy - n1y * rs],
  ], 0.32);
};
const cuff = (ex: number, ey: number, wx: number, wy: number, r: number) => {
  const l = Math.hypot(wx - ex, wy - ey), ux = (wx - ex) / l, uy = (wy - ey) / l, [nx, ny] = norm2(ux, uy);
  const a = [wx - ux * 16, wy - uy * 16], b = [wx - ux * 2, wy - uy * 2];
  return smooth([[a[0] + nx * r, a[1] + ny * r], [b[0] + nx * (r + 1), b[1] + ny * (r + 1)], [b[0] - nx * (r + 1), b[1] - ny * (r + 1)], [a[0] - nx * r, a[1] - ny * r]], 0.15);
};
const BKX = 112, BKY = 498; // book-hand wrist (arm relaxed at his side)
/** Cartoon fist: local +x = forearm direction; fingers curl on +y, thumb on top (-y). */
const Fist: React.FC<{ x: number; y: number; ang: number }> = ({ x, y, ang }) => (
  <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    <path d={smooth([[-22, -10], [-6, -15], [10, -13], [16, 0], [10, 14], [-8, 16], [-22, 10]], 0.45)} fill={TC.skin} stroke={TC.out} strokeWidth={SW} strokeLinejoin="round" />
    {[-10, -1, 8, 17].map((fx, i) => (
      <path key={i} d={smooth([[fx - 5, 2], [fx + 5, 2], [fx + 5.5, 14], [fx, 19.5], [fx - 5.5, 14]], 0.5)} fill={TC.skin} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
    ))}
    {[-10, -1, 8, 17].map((fx, i) => <path key={`k${i}`} d={`M${fx - 3} 11 q3 2 6 0`} stroke={TC.skinSh} strokeWidth={2} fill="none" strokeLinecap="round" />)}
    <path d={smooth([[-12, -9], [6, -16], [22, -12], [26, -7], [20, -3], [4, -5], [-10, -2]], 0.45)} fill={TC.skin} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />
    <path d="M21 -11 q3 1 3 4" stroke={TC.skinSh} strokeWidth={2} fill="none" strokeLinecap="round" />
  </g>
);
const FACE = "M122 168 Q120 96 200 92 Q280 96 278 168 Q280 232 246 262 Q200 290 154 262 Q120 232 122 168 Z";

export const Teacher2D: React.FC<{ pose?: TeacherPose }> = ({ pose = {} }) => {
  const { talk = 0, blink = 0, brow = 0, headTilt = 0, point = 0, pointWiggle = 0, bob = 0, smile = 0.8, lookX = 0, hair = "sidepart", outfit = "blazer", leftHand = "relaxed" } = pose;
  const OF = OUTFITS[outfit];
  const [lex, ley, lwx, lwy] = LEFT_ARM[leftHand];
  const lAng = (Math.atan2(lwy - ley, lwx - lex) * 180) / Math.PI + 90;
  const rad = (a: number) => (a * Math.PI) / 180;
  // pointing arm (viewer right): shoulder -> elbow -> wrist
  const sx = 262, sy = 322;
  const ua = -14 + -112 * point, fa = ua + (-30 - 12 * point) + pointWiggle;
  const L1 = 96, L2 = 84;
  const elx = sx - Math.sin(rad(ua)) * L1, ely = sy + Math.cos(rad(ua)) * L1;
  const hx = elx - Math.sin(rad(fa)) * L2, hy = ely + Math.cos(rad(fa)) * L2;
  const dirx = -Math.sin(rad(fa)), diry = Math.cos(rad(fa));
  const st1x = hx - dirx * 26, st1y = hy - diry * 26;
  const st2x = hx + dirx * 150, st2y = hy + diry * 150;
  const handAng = (Math.atan2(diry, dirx) * 180) / Math.PI;
  const blinkK = Math.max(0.06, 1 - blink);
  const by = -brow * 7;
  const open = 6 + talk * 22;
  const O = { stroke: TC.out, strokeWidth: SW, strokeLinejoin: "round" as const };
  return (
    <g transform={`translate(0 ${bob})`}>
      {/* ---------- legs ---------- */}
      <path d={smooth([[142, 506], [200, 512], [198, 600], [194, 690], [192, 738], [150, 738], [148, 690], [144, 600]], 0.25)} fill={TC.pants} {...O} />
      <path d={smooth([[200, 512], [258, 506], [256, 600], [252, 690], [250, 738], [208, 738], [206, 690], [202, 600]], 0.25)} fill={TC.pants} {...O} />
      <path d="M172 560 Q170 650 171 724 M229 560 Q231 650 229 724" stroke="#464B58" strokeWidth={3} fill="none" />
      <path d="M150 724 L192 724 M208 724 L250 724" stroke="#23262E" strokeWidth={5} />
      <path d="M144 520 Q170 532 198 524" stroke="#23262E" strokeWidth={4} fill="none" opacity={0.6} />
      {/* shoes */}
      <path d={smooth([[150, 732], [194, 732], [197, 752], [192, 768], [128, 768], [116, 760], [124, 744]], 0.4)} fill={TC.shoe} {...O} />
      <path d={smooth([[206, 732], [250, 732], [276, 744], [284, 760], [272, 768], [208, 768], [203, 752]], 0.4)} fill={TC.shoe} {...O} />
      <path d="M128 752 Q140 744 152 746 M272 752 Q260 744 248 746" stroke="#55555F" strokeWidth={4} fill="none" strokeLinecap="round" />

      {/* ---------- torso (inner shirt/tee) ---------- */}
      <path d={smooth([[116, 336], [134, 302], [172, 288], [228, 288], [266, 302], [284, 336], [276, 420], [266, 516], [200, 524], [134, 516], [124, 420]], 0.35)} fill={OF.inner} {...O} />
      {outfit === "shirt" && <path d="M200 312 L200 516 M196 340 h0 M200 300" stroke="#DCE3EC" strokeWidth={3} />}
      {outfit === "shirt" && [350, 400, 450, 500].map((y) => <circle key={y} cx={203} cy={y} r={3} fill="#C9D2DE" />)}
      {outfit === "vest" && (
        <g>
          <path d={smooth([[134, 320], [156, 300], [178, 292], [200, 366], [222, 292], [244, 300], [266, 320], [260, 420], [256, 504], [200, 514], [144, 504], [140, 420]], 0.3)} fill={OF.layer} {...O} />
          <path d="M146 486 Q200 496 254 486 L256 504 Q200 516 144 504 Z" fill={OF.layerSh} {...O} strokeWidth={3} />
          {[156, 168, 180, 192, 204, 216, 228, 240].map((x) => <path key={x} d={`M${x} 491 L${x} 508`} stroke="#555B68" strokeWidth={2} />)}
          <path d="M244 318 Q252 410 248 480" stroke={OF.layerSh} strokeWidth={9} fill="none" opacity={0.55} strokeLinecap="round" />
          <path d="M178 292 L200 366 L222 292" stroke="#5B6170" strokeWidth={6} fill="none" strokeLinejoin="round" />
        </g>
      )}
      {outfit === "sweater" && (
        <g>
          <path d={smooth([[116, 336], [134, 302], [172, 290], [228, 290], [266, 302], [284, 336], [276, 420], [268, 512], [200, 520], [132, 512], [124, 420]], 0.35)} fill={OF.layer} {...O} />
          <path d="M132 494 Q200 506 268 494 L268 514 Q200 526 132 514 Z" fill={OF.layerSh} {...O} strokeWidth={3} />
          {[144, 158, 172, 186, 200, 214, 228, 242, 256].map((x) => <path key={x} d={`M${x} 500 L${x} 518`} stroke="#1D4F42" strokeWidth={2} />)}
          <path d="M170 292 Q200 312 230 292 Q228 304 200 314 Q172 304 170 292 Z" fill={OF.layerSh} {...O} strokeWidth={3} />
          <path d="M236 330 Q250 420 246 486" stroke={OF.layerSh} strokeWidth={9} fill="none" opacity={0.5} strokeLinecap="round" />
        </g>
      )}
      {outfit === "cardigan" && (
        <g>
          <path d="M176 290 Q200 306 224 290" stroke="#E6E6E6" strokeWidth={5} fill="none" />
          <path d={smooth([[116, 336], [134, 302], [172, 288], [184, 330], [190, 420], [192, 524], [134, 516], [124, 420]], 0.3)} fill={OF.layer} {...O} />
          <path d={smooth([[284, 336], [266, 302], [228, 288], [216, 330], [210, 420], [208, 524], [266, 516], [276, 420]], 0.3)} fill={OF.layer} {...O} />
          {[360, 410, 460].map((y) => <circle key={y} cx={186} cy={y} r={5} fill="#8A5A2E" stroke={TC.out} strokeWidth={2} />)}
          <path d="M140 470 h30 v26 h-30 Z M230 470 h30 v26 h-30 Z" fill={OF.layerSh} stroke={TC.out} strokeWidth={2.5} />
        </g>
      )}
      {outfit === "blazer" && (
        <g>
          <path d={smooth([[116, 336], [134, 302], [172, 288], [184, 330], [196, 420], [196, 540], [130, 534], [124, 420]], 0.3)} fill={OF.layer} {...O} />
          <path d={smooth([[284, 336], [266, 302], [228, 288], [216, 330], [204, 420], [204, 540], [270, 534], [276, 420]], 0.3)} fill={OF.layer} {...O} />
          <path d="M172 288 L160 330 L178 352 L190 420 M228 288 L240 330 L222 352 L210 420" stroke={OF.layerSh} strokeWidth={5} fill="none" strokeLinejoin="round" />
          <circle cx={200} cy={448} r={5} fill={OF.layerSh} stroke={TC.out} strokeWidth={2} />
          <path d="M226 400 h28" stroke={OF.layerSh} strokeWidth={5} strokeLinecap="round" />
        </g>
      )}
      {/* collar + tie (shirt outfits) / tee neckline */}
      {OF.tie && <path d="M200 304 L191 320 L196 358 L200 368 L204 358 L209 320 Z" fill={OF.tie} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />}
      {OF.tie && <path d="M191 298 L200 312 L209 298 L205 291 L195 291 Z" fill={OF.tie} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />}
      {outfit !== "cardigan" && <path d="M174 284 L198 304 L182 318 Z M226 284 L202 304 L218 318 Z" fill={TC.white} stroke={TC.out} strokeWidth={3} strokeLinejoin="round" />}
      {/* ---------- left arm (gesture) ---------- */}
      <path d={armPath(134, 324, lex, ley, lwx, lwy)} fill={OF.sleeve} {...O} />
      {leftHand !== "pocket" && <path d={cuff(lex, ley, lwx, lwy, 16)} fill={OF.cuff} {...O} strokeWidth={3} />}
      <path d={`M${lex + 2} ${ley - 6} q8 6 16 4`} stroke={OF.sleeveSh} strokeWidth={3} fill="none" strokeLinecap="round" />
      {leftHand === "pocket" && <path d="M138 512 q10 6 22 2" stroke={TC.out} strokeWidth={3} fill="none" strokeLinecap="round" />}
      {leftHand === "relaxed" && (
        <g transform={`translate(${lwx} ${lwy + 4}) scale(1.3)`}>
          {[-9, -3, 3, 9].map((fx, i) => (
            <path key={i} d={smooth([[fx - 4, 6], [fx + 4, 6], [fx + 4.5, 22 + [0, 3, 3, -1][i]], [fx, 27 + [0, 3, 3, -1][i]], [fx - 4.5, 22 + [0, 3, 3, -1][i]]], 0.5)} fill={TC.skin} stroke={TC.out} strokeWidth={2.8} strokeLinejoin="round" />
          ))}
          <path d={smooth([[-13, -6], [13, -6], [15, 8], [10, 16], [-10, 16], [-15, 8]], 0.45)} fill={TC.skin} {...O} />
          <path d={smooth([[10, 0], [20, 6], [22, 16], [17, 19], [12, 12]], 0.45)} fill={TC.skin} stroke={TC.out} strokeWidth={2.8} strokeLinejoin="round" />
          <path d="M-6 8 q6 4 12 0" stroke={TC.skinSh} strokeWidth={2} fill="none" strokeLinecap="round" />
        </g>
      )}
      {(leftHand === "openPalm" || leftHand === "wave") && <g transform={`translate(${lwx} ${lwy}) rotate(${lAng}) scale(1.15)`}><OpenPalm spread={leftHand === "wave" ? 1.6 : 1} /></g>}
      {leftHand === "wave" && <path d={`M${lwx - 40} ${lwy - 70} q-10 14 0 28 M${lwx - 52} ${lwy - 78} q-14 20 0 42`} stroke={TC.out} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.6} />}
      {leftHand === "fingerUp" && <g transform={`translate(${lwx} ${lwy}) rotate(${lAng}) scale(1.15)`}><FingerUp /></g>}
      {leftHand === "thumbsUp" && <g transform={`translate(${lwx} ${lwy}) rotate(${lAng}) scale(1.15)`}><ThumbsUp /></g>}

      {/* ---------- pointing arm ---------- */}
      <path d={armPath(sx, sy, elx, ely, hx, hy)} fill={OF.sleeve} {...O} />
      <path d={cuff(elx, ely, hx, hy, 18)} fill={OF.cuff} {...O} strokeWidth={3} />
      <path d={`M${elx - 8} ${ely - 4} q6 6 14 4 M${elx - 2} ${ely + 8} q6 4 12 0`} stroke={OF.sleeveSh} strokeWidth={3} fill="none" strokeLinecap="round" />
      <g strokeLinecap="round">
        <path d={`M${st1x} ${st1y} L${st2x} ${st2y}`} stroke={TC.out} strokeWidth={12} />
        <path d={`M${st1x} ${st1y} L${st2x} ${st2y}`} stroke={TC.stick} strokeWidth={7} />
        <circle cx={st2x} cy={st2y} r={6.5} fill={TC.white} stroke={TC.out} strokeWidth={3} />
      </g>
      <Fist x={hx} y={hy} ang={handAng} />
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
        <Hair style={hair} />
      </g>
    </g>
  );
};
