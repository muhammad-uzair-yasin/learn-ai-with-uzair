// projects/testh/
import React from "react";
import { AbsoluteFill } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { Human3D } from "./human3d";
import { useThree } from "@react-three/fiber";
const Cam: React.FC = () => { const { camera } = useThree(); camera.position.set(0, 1.0, 4.6); camera.lookAt(0, 0.95, 0); return null; };
const P = [
  {},
  { LeftArm: [0, 0, 1.1], RightArm: [0, 0, -1.1] },
  { LeftArm: [1.1, 0, 0], RightArm: [1.1, 0, 0] },
  { LeftArm: [0, 1.1, 0], RightArm: [0, -1.1, 0] },
] as any;
export const T: React.FC = () => (
  <AbsoluteFill style={{ background: "#eee" }}>
    <ThreeCanvas width={1080} height={1920} gl={{ toneMapping: THREE.ACESFilmicToneMapping }}>
      <Cam />
      <ambientLight intensity={1.2} /><directionalLight position={[2, 4, 5]} intensity={2} />
      {P.map((pose: any, i: number) => <Human3D key={i} file="mpfb.glb" p={[-1.2 + i * 0.8, 0, 0]} pose={pose} morphs={i === 0 ? { viseme_aa: 1, mouthSmileLeft: 0.5 } : {}} />)}
    </ThreeCanvas>
  </AbsoluteFill>
);
