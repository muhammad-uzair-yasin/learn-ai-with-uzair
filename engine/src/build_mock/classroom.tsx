// classroom.tsx — Agent School 3D classroom (Uzair, Nov 1 2026: light look, teacher + students + whiteboard, 3D).
// A real three.js scene (via @remotion/three): bright room, whiteboard on the back wall, a teacher at the board
// and students at desks. Lesson graphics are SVG drawn ON the whiteboard: they are projected onto the board quad
// every frame with a CSS matrix3d (homography), so they stay glued to the board while the camera moves.
import React, { useMemo, useEffect, useState } from "react";
import { delayRender, continueRender } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { VW, VH } from "./kit";

// ---------- palette (light) ----------
export const L = {
  wall: "#F4EFE6", wall2: "#EAE3D6", floor: "#D9B98F", board: "#FFFFFF", frame: "#B9C2CF", trim: "#8FA0B5",
  ink: "#1B2A4A", red: "#E8453C", blue: "#2D7FF9", green: "#1FAF6B", amber: "#F2A33A", violet: "#7A5CFA",
  skin: ["#C68A5E", "#F1C7A1", "#8D5A3B", "#E3A87C", "#B97A50"], desk: "#E9D2AE", chair: "#5B8DEF",
};

// ---------- camera ----------
export type Cam3 = { pos: [number, number, number]; look: [number, number, number]; fov?: number };
export const lerpCam = (a: Cam3, b: Cam3, t: number): Cam3 => ({
  pos: a.pos.map((v, i) => v + (b.pos[i] - v) * t) as [number, number, number],
  look: a.look.map((v, i) => v + (b.look[i] - v) * t) as [number, number, number],
  fov: (a.fov ?? 50) + ((b.fov ?? 50) - (a.fov ?? 50)) * t,
});
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const camPath = (f: number, keys: [number, Cam3][]): Cam3 => {
  if (f <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [f0, a] = keys[i], [f1, b] = keys[i + 1];
    if (f <= f1) return lerpCam(a, b, ease(Math.min(1, Math.max(0, (f - f0) / Math.max(1, f1 - f0)))));
  }
  return keys[keys.length - 1][1];
};

// ---------- board geometry ----------
export const BOARD = { cx: -0.2, cy: 2.0, z: -3.9, w: 3.2, h: 1.8 }; // big 16:9 smart screen // metres; SVG board content uses viewBox 1700x1000
export const BW = 1920, BH = 1080; // screen content viewBox

/** CSS matrix3d that maps the rect (0,0)-(w,h) onto quad p0..p3 (tl, tr, br, bl) — standard homography. */
const quadMatrix = (w: number, h: number, q: [number, number][]) => {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2, sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (sx * dy2 - dx2 * sy) / den, hh = (dx1 * sy - sx * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + hh * x3, c = x0, d = y1 - y0 + g * y1, e = y3 - y0 + hh * y3, ff = y0;
  // scale unit square -> w,h
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, hh / h, 0, 0, 1, 0, c, ff, 0, 1];
  return `matrix3d(${m.map((v) => v.toFixed(8)).join(",")})`;
};
const project = (cam: Cam3, p: [number, number, number]): [number, number] => {
  const c = new THREE.PerspectiveCamera(cam.fov ?? 50, VW / VH, 0.1, 100);
  c.position.set(...cam.pos); c.lookAt(new THREE.Vector3(...cam.look)); c.updateMatrixWorld(); c.updateProjectionMatrix();
  const v = new THREE.Vector3(...p).project(c);
  return [(v.x + 1) / 2 * VW, (1 - v.y) / 2 * VH];
};

// ---------- primitives ----------
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
const rbCache = new Map<string, THREE.BufferGeometry>();
const rbGeo = (s: [number, number, number], r: number) => { const k = s.join(",") + r; if (!rbCache.has(k)) rbCache.set(k, new RoundedBoxGeometry(s[0], s[1], s[2], 4, Math.min(r, Math.min(...s) / 2 - 0.001))); return rbCache.get(k)!; };
export const RB: React.FC<{ p: [number, number, number]; s: [number, number, number]; c: string; r?: number; rough?: number; rot?: [number, number, number] }> = ({ p, s, c, r = 0.03, rough = 0.7, rot = [0, 0, 0] }) => (
  <mesh position={p} rotation={rot} geometry={rbGeo(s, r)} castShadow receiveShadow><meshStandardMaterial color={c} roughness={rough} /></mesh>
);
const M: React.FC<{ c: string; r?: number }> = ({ c, r = 0.75 }) => <meshStandardMaterial color={c} roughness={r} metalness={0} />;
const Box0: React.FC<{ p: [number, number, number]; s: [number, number, number]; c: string; r?: number }> = ({ p, s, c, r }) => (
  <mesh position={p} castShadow receiveShadow><boxGeometry args={s} /><M c={c} r={r} /></mesh>
);
const Box: React.FC<{ p: [number, number, number]; s: [number, number, number]; c: string; r?: number }> = ({ p, s, c, r }) => <RB p={p} s={s} c={c} rough={r ?? 0.7} r={Math.min(0.025, Math.min(...s) / 2.2)} />;
const RBox: React.FC<{ p: [number, number, number]; s: [number, number, number]; c: string }> = ({ p, s, c }) => (
  <mesh position={p} castShadow receiveShadow scale={s}><sphereGeometry args={[0.5, 24, 16]} /><M c={c} /></mesh>
);
const Cap: React.FC<{ p?: [number, number, number]; r: number; l: number; c: string; rot?: [number, number, number] }> = ({ p = [0, 0, 0], r, l, c, rot = [0, 0, 0] }) => (
  <mesh position={p} rotation={rot} castShadow><capsuleGeometry args={[r, l, 8, 16]} /><M c={c} r={0.6} /></mesh>
);
const Ball: React.FC<{ p: [number, number, number]; r: number; c: string; s?: [number, number, number] }> = ({ p, r, c, s = [1, 1, 1] }) => (
  <mesh position={p} scale={s} castShadow><sphereGeometry args={[r, 32, 24]} /><M c={c} r={0.55} /></mesh>
);

// ---------- people ----------
export type PersonLook = { skin: string; hair: string; shirt: string; pants?: string; hairStyle?: "short" | "long" | "bun" | "cap"; beard?: boolean; glasses?: boolean };
/** Head with eyes, mouth (talk 0..1), hair. Faces +z. */
const Head: React.FC<{ look: PersonLook; talk: number; blink: number; smile?: number }> = ({ look, talk, blink, smile = 0.6 }) => (
  <group>
    <Ball p={[0, 0, 0]} r={0.2} c={look.skin} s={[1, 1.08, 1]} />
    <Ball p={[-0.2, 0, 0]} r={0.045} c={look.skin} />
    <Ball p={[0.2, 0, 0]} r={0.045} c={look.skin} />
    {/* hair */}
    {look.hairStyle !== "cap" && <Ball p={[0, 0.07, -0.02]} r={0.205} c={look.hair} s={[1.02, 0.85, 1.02]} />}
    {look.hairStyle === "long" && <Ball p={[0, -0.08, -0.08]} r={0.21} c={look.hair} s={[1.05, 1.2, 0.8]} />}
    {look.hairStyle === "bun" && <Ball p={[0, 0.22, -0.12]} r={0.08} c={look.hair} />}
    {look.hairStyle === "cap" && <group><Ball p={[0, 0.08, 0]} r={0.205} c={look.hair} s={[1.02, 0.8, 1.02]} /><Box p={[0, 0.07, 0.17]} s={[0.26, 0.03, 0.14]} c={look.hair} /></group>}
    {/* face (front is +z) — cover the hair at the front */}
    <Ball p={[0, -0.02, 0.06]} r={0.17} c={look.skin} s={[1, 1, 0.9]} />
    {look.beard && <Ball p={[0, -0.12, 0.07]} r={0.15} c={look.hair} s={[1.05, 0.6, 0.85]} />}
    {[-0.07, 0.07].map((x) => <Ball key={x} p={[x, 0.03, 0.195]} r={0.026} c="#1B1B24" s={[1, Math.max(0.1, blink), 0.6]} />)}
    {[-0.07, 0.07].map((x) => <Ball key={`w${x}`} p={[x + 0.008, 0.042, 0.212]} r={0.008} c="#FFFFFF" />)}
    {look.glasses && [-0.07, 0.07].map((x) => <mesh key={`g${x}`} position={[x, 0.03, 0.205]}><torusGeometry args={[0.045, 0.008, 8, 24]} /><M c="#1B1B24" /></mesh>)}
    <Ball p={[0, -0.075 - talk * 0.01, 0.19]} r={0.038} c="#7A2E2E" s={[1.1 + smile * 0.3, 0.25 + talk * 0.9, 0.5]} />
  </group>
);
/** Standing teacher. armPoint 0..1 raises right arm toward the board (to the viewer's left). turn = body yaw (rad). */
export const Teacher: React.FC<{ look: PersonLook; p: [number, number, number]; turn: number; headTurn: number; talk: number; blink: number; armPoint: number; gesture: number }> = ({ look, p, turn, headTurn, talk, blink, armPoint, gesture }) => (
  <group position={p} rotation={[0, turn, 0]}>
    <Cap p={[-0.1, 0.45, 0]} r={0.075} l={0.75} c={look.pants ?? "#2F3B57"} />
    <Cap p={[0.1, 0.45, 0]} r={0.075} l={0.75} c={look.pants ?? "#2F3B57"} />
    <Box p={[-0.1, 0.04, 0.05]} s={[0.13, 0.08, 0.26]} c="#222" />
    <Box p={[0.1, 0.04, 0.05]} s={[0.13, 0.08, 0.26]} c="#222" />
    <Cap p={[0, 1.18, 0]} r={0.2} l={0.42} c={look.shirt} />
    <Box p={[0, 1.36, 0.17]} s={[0.12, 0.2, 0.04]} c="#FFFFFF" />
    {/* left arm: relaxed gesture */}
    <group position={[0.25, 1.42, 0]} rotation={[-0.3 * gesture, 0, 0.15 + 0.35 * gesture]}>
      <Cap p={[0, -0.28, 0]} r={0.06} l={0.42} c={look.shirt} />
      <Ball p={[0, -0.58, 0]} r={0.065} c={look.skin} />
    </group>
    {/* right arm: points at the board */}
    <group position={[-0.25, 1.42, 0]} rotation={[0.35 * armPoint, 0, -0.15 - 1.95 * armPoint]}>
      <Cap p={[0, -0.28, 0]} r={0.06} l={0.42} c={look.shirt} />
      <Ball p={[0, -0.58, 0]} r={0.065} c={look.skin} />
      <Cap p={[0, -0.7, 0]} r={0.022} l={0.14} c={L.blue} />
    </group>
    <Cap p={[0, 1.55, 0]} r={0.06} l={0.06} c={look.skin} />
    <group position={[0, 1.83, 0]} rotation={[0, headTurn, 0]}><Head look={look} talk={talk} blink={blink} /></group>
  </group>
);
/** Seated student at a desk, seen from behind/three-quarter. nod: head pitch; hand: raise right hand 0..1 */
export const Student: React.FC<{ look: PersonLook; p: [number, number, number]; yaw?: number; nod?: number; hand?: number; f: number; seed: number; laptop?: boolean }> = ({ look, p, yaw = 0, nod = 0, hand = 0, f, seed, laptop }) => {
  const sway = Math.sin(f * 0.05 + seed) * 0.03;
  return (
    <group position={p} rotation={[0, yaw, 0]}>
      {/* chair */}
      <Box p={[0, 0.45, 0.32]} s={[0.5, 0.06, 0.45]} c={L.chair} />
      <Box p={[0, 0.78, 0.55]} s={[0.5, 0.6, 0.06]} c={L.chair} />
      {[[-0.2, 0.15], [0.2, 0.15], [-0.2, 0.5], [0.2, 0.5]].map(([x, z], i) => <Box key={i} p={[x, 0.22, z]} s={[0.04, 0.44, 0.04]} c="#9AA6B8" />)}
      {/* desk (in front = -z of student frame... student faces +z after yaw) */}
      <Box p={[0, 0.74, -0.25]} s={[0.9, 0.05, 0.5]} c={L.desk} />
      {[[-0.4, -0.45], [0.4, -0.45], [-0.4, -0.05], [0.4, -0.05]].map(([x, z], i) => <Box key={`d${i}`} p={[x, 0.37, z]} s={[0.04, 0.74, 0.04]} c="#9AA6B8" />)}
      {laptop ? <group><Box p={[0, 0.775, -0.25]} s={[0.36, 0.02, 0.24]} c="#C9D1DD" /><Box p={[0, 0.89, -0.37]} s={[0.36, 0.24, 0.02]} c="#C9D1DD" /></group>
        : <Box p={[0.05, 0.775, -0.22]} s={[0.3, 0.02, 0.22]} c="#FFFFFF" />}
      {/* body */}
      <Cap p={[0, 0.85, 0.3]} r={0.18} l={0.3} c={look.shirt} rot={[0.1 + sway, 0, 0]} />
      <Cap p={[-0.1, 0.52, 0.12]} r={0.07} l={0.3} c={look.pants ?? "#3A4A6B"} rot={[Math.PI / 2, 0, 0]} />
      <Cap p={[0.1, 0.52, 0.12]} r={0.07} l={0.3} c={look.pants ?? "#3A4A6B"} rot={[Math.PI / 2, 0, 0]} />
      {/* arms on desk / raised */}
      <group position={[-0.22, 1.02, 0.3]} rotation={[0.9 + hand * 2.2, 0, -hand * 0.15]}><Cap p={[0, -0.24, 0]} r={0.055} l={0.36} c={look.shirt} /><Ball p={[0, -0.48, 0]} r={0.06} c={look.skin} /></group>
      <group position={[0.22, 1.02, 0.3]} rotation={[0.9, 0, 0]}><Cap p={[0, -0.24, 0]} r={0.055} l={0.36} c={look.shirt} /><Ball p={[0, -0.48, 0]} r={0.06} c={look.skin} /></group>
      <group position={[0, 1.33, 0.32]} rotation={[-(nod + sway * 0.5), Math.PI, 0]}><Head look={look} talk={0} blink={1} smile={0.4} /></group>
    </group>
  );
};

// ---------- room ----------
const Room: React.FC<{ bannerTex: THREE.Texture }> = ({ bannerTex }) => (
  <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[14, 16]} /><M c={L.floor} r={0.9} /></mesh>
    {/* floor planks */}
    {[...Array(14)].map((_, i) => <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-7 + i, 0.002, 0]}><planeGeometry args={[0.012, 16]} /><M c="#C4A27A" /></mesh>)}
    <mesh position={[0, 3, -4]} receiveShadow><planeGeometry args={[14, 6]} /><M c={L.wall} r={0.95} /></mesh>
    <mesh position={[0, 0.5, -3.99]}><planeGeometry args={[14, 1]} /><M c={L.wall2} /></mesh>
    <mesh position={[-4.5, 3, 2]} rotation={[0, Math.PI / 2, 0]} receiveShadow><planeGeometry args={[14, 6]} /><M c={L.wall2} r={0.95} /></mesh>
    <mesh position={[4.5, 3, 2]} rotation={[0, -Math.PI / 2, 0]} receiveShadow><planeGeometry args={[14, 6]} /><M c={L.wall2} r={0.95} /></mesh>
    {/* big smart screen: bezel, stand bar, glow (the picture is the SVG overlay) */}
    <RB p={[BOARD.cx, BOARD.cy, BOARD.z - 0.05]} s={[BOARD.w + 0.16, BOARD.h + 0.16, 0.08]} c="#14171F" r={0.03} rough={0.3} />
    <mesh position={[BOARD.cx, BOARD.cy, BOARD.z]}><planeGeometry args={[BOARD.w, BOARD.h]} /><meshBasicMaterial color="#0B1530" toneMapped={false} /></mesh>
    <RB p={[BOARD.cx, BOARD.cy - BOARD.h / 2 - 0.16, BOARD.z + 0.06]} s={[1.6, 0.06, 0.22]} c="#D7DCE5" r={0.02} />
    <pointLight position={[BOARD.cx, BOARD.cy, BOARD.z + 1.2]} intensity={1.2} distance={4} color="#7FB2FF" />
    {/* window light patches + plants + shelf */}
    <Box p={[-4.45, 2.4, -1]} s={[0.05, 1.6, 1.6]} c="#DDEFFF" r={0.2} />
    <Box p={[-4.45, 2.4, 1.2]} s={[0.05, 1.6, 1.6]} c="#DDEFFF" r={0.2} />
    <group position={[3.4, 0, -3.4]}>
      <Box p={[0, 0.25, 0]} s={[0.4, 0.5, 0.4]} c="#E7A86B" />
      <Ball p={[0, 0.85, 0]} r={0.38} c="#4FAF6D" />
      <Ball p={[0.2, 1.15, 0.05]} r={0.25} c="#5DC07B" />
    </group>
    <group position={[-3.2, 0, -3.6]}>
      <Box p={[0, 0.9, 0]} s={[1.2, 1.8, 0.4]} c="#F8F4EC" />
      {[0.4, 0.95, 1.5].map((y) => <Box key={y} p={[0, y, 0.05]} s={[1.1, 0.03, 0.35]} c="#D9CDB8" />)}
      {[...Array(9)].map((_, i) => <Box key={`b${i}`} p={[-0.45 + (i % 9) * 0.11, 0.55 + Math.floor(i / 9) * 0.55, 0.05]} s={[0.08, 0.26, 0.24]} c={[L.blue, L.red, L.amber, L.green, L.violet][i % 5]} />)}
      {[...Array(7)].map((_, i) => <Box key={`c${i}`} p={[-0.4 + i * 0.12, 1.1, 0.05]} s={[0.09, 0.28, 0.24]} c={[L.green, L.violet, L.blue, L.amber][i % 4]} />)}
    </group>
    {/* "AGENT SCHOOL" banner above the board */}
    <mesh position={[BOARD.cx, 3.3, -3.95]}><planeGeometry args={[2.0, 0.3]} /><meshBasicMaterial map={bannerTex} toneMapped={false} /></mesh>
    {/* clock */}
    <mesh position={[2.6, 3.2, -3.97]}><circleGeometry args={[0.26, 32]} /><M c="#FFFFFF" /></mesh>
    <mesh position={[2.6, 3.2, -3.98]}><torusGeometry args={[0.26, 0.03, 8, 32]} /><M c={L.ink} /></mesh>
  </group>
);

export type ClassProps = {
  f: number; cam: Cam3;
  teacher: { look: PersonLook; p: [number, number, number]; turn: number; headTurn: number; talk: number; blink: number; armPoint: number; gesture: number };
  students: { look: PersonLook; p: [number, number, number]; yaw?: number; nod?: number; hand?: number; laptop?: boolean }[];
  screen: React.ReactNode; // SVG children, viewBox 0 0 1920 1080, projected onto the big screen (keep people out of its rect)
  banner?: string;
};
const useFontReady = () => {
  const [h] = useState(() => delayRender("font"));
  useEffect(() => { (document as any).fonts.load('800 60px InterLocal').then(() => continueRender(h)).catch(() => continueRender(h)); }, [h]);
};
export const Classroom: React.FC<ClassProps> = ({ f, cam, teacher, students, screen, banner = "AGENT SCHOOL" }) => {
  useFontReady();
  const nt = useMemo(() => { const c = document.createElement("canvas"); c.width = 960; c.height = 144; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return { c, t }; }, []);
  {
    const n = nt.c.getContext("2d")!;
    n.fillStyle = L.ink; n.fillRect(0, 0, 960, 144); n.fillStyle = "#FFFFFF"; n.font = "800 84px InterLocal, sans-serif"; n.textAlign = "center"; n.textBaseline = "middle";
    (n as any).letterSpacing = "8px"; n.fillText(banner, 480, 76); nt.t.needsUpdate = true;
  }
  const q = (x: number, y: number): [number, number] => project(cam, [x, y, BOARD.z + 0.003]);
  const corners: [number, number][] = [q(BOARD.cx - BOARD.w / 2, BOARD.cy + BOARD.h / 2), q(BOARD.cx + BOARD.w / 2, BOARD.cy + BOARD.h / 2), q(BOARD.cx + BOARD.w / 2, BOARD.cy - BOARD.h / 2), q(BOARD.cx - BOARD.w / 2, BOARD.cy - BOARD.h / 2)];
  return (<>
    <ThreeCanvas width={VW} height={VH} style={{ position: "absolute", inset: 0 }} shadows={{ type: THREE.PCFSoftShadowMap }} gl={{ antialias: true, preserveDrawingBuffer: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
      camera={{ fov: cam.fov ?? 50, near: 0.1, far: 100, position: cam.pos }}>
      <CamRig cam={cam} />
      <color attach="background" args={["#F4EFE6"]} />
      <ambientLight intensity={0.95} />
      <hemisphereLight args={["#FFFFFF", "#D9B98F", 0.6]} />
      <directionalLight position={[-3, 6, 4]} intensity={1.6} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024}
        shadow-camera-left={-6} shadow-camera-right={6} shadow-camera-top={6} shadow-camera-bottom={-6} shadow-bias={-0.0005} />
      <pointLight position={[0, 3.2, -2]} intensity={0.6} />
      <Room bannerTex={nt.t} />
      <Teacher {...teacher} />
      {students.map((s, i) => <Student key={i} {...s} f={f} seed={i * 1.7} />)}
    </ThreeCanvas>
    <div style={{ position: "absolute", left: 0, top: 0, width: BW, height: BH, transformOrigin: "0 0", transform: quadMatrix(BW, BH, corners), overflow: "hidden" }}>
      <svg width={BW} height={BH} viewBox={`0 0 ${BW} ${BH}`}>{screen}</svg>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(125deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 35%)" }} />
    </div>
  </>);
};
import { useThree } from "@react-three/fiber";
const CamRig: React.FC<{ cam: Cam3 }> = ({ cam }) => {
  const { camera } = useThree();
  const c = camera as THREE.PerspectiveCamera;
  c.position.set(...cam.pos); c.fov = cam.fov ?? 50; c.aspect = VW / VH; c.updateProjectionMatrix(); c.lookAt(new THREE.Vector3(...cam.look)); c.updateMatrixWorld();
  return null;
};
