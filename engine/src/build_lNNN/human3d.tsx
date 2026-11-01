// human3d.tsx — realistic rigged humans (GLB, Mixamo-style bones + ARKit/Oculus viseme morphs) for the 3D classroom.
// Models live in engine/public/models (not committed; see docs/pipeline.md for download URLs + licences).
import React, { useEffect, useMemo, useState } from "react";
import { delayRender, continueRender, staticFile } from "remotion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone as skClone } from "three/examples/jsm/utils/SkeletonUtils.js";

const cache = new Map<string, Promise<THREE.Group>>();
const load = (url: string) => {
  if (!cache.has(url)) cache.set(url, new Promise((res, rej) => new GLTFLoader().load(url, (g) => res(g.scene), undefined, rej)));
  return cache.get(url)!;
};
export const useModel = (file: string) => {
  const [scene, setScene] = useState<THREE.Group | null>(null);
  const [h] = useState(() => delayRender(`model ${file}`, { timeoutInMilliseconds: 120000 }));
  useEffect(() => { load(staticFile(`models/${file}`)).then((s) => { setScene(s); continueRender(h); }).catch((e) => { console.error(e); continueRender(h); }); }, [file, h]);
  return scene;
};

export type Pose = Record<string, [number, number, number]>; // bone -> extra euler (rad, XYZ, local)
export type Morphs = Record<string, number>;
export type Tint = Record<string, string>; // material name substring -> color multiply
export const Human3D: React.FC<{ file: string; p: [number, number, number]; yaw?: number; scale?: number; pose?: Pose; morphs?: Morphs; tint?: Tint; hide?: string[] }> = ({ file, p, yaw = 0, scale = 1, pose = {}, morphs = {}, tint = {}, hide = [] }) => {
  const src = useModel(file);
  const inst = useMemo(() => {
    if (!src) return null;
    const o = skClone(src) as THREE.Group;
    const bones: Record<string, { b: THREE.Bone; q0: THREE.Quaternion }> = {};
    const meshes: THREE.Mesh[] = [];
    o.traverse((n: any) => {
      if (n.isBone) bones[n.name] = { b: n, q0: n.quaternion.clone() };
      if (n.isMesh) {
        n.castShadow = true; n.receiveShadow = true; n.frustumCulled = false;
        n.material = Array.isArray(n.material) ? n.material.map((m: any) => m.clone()) : n.material.clone();
        meshes.push(n);
      }
    });
    return { o, bones, meshes };
  }, [src]);
  if (!inst) return null;
  // pose
  const e = new THREE.Euler(), dq = new THREE.Quaternion();
  for (const k in inst.bones) inst.bones[k].b.quaternion.copy(inst.bones[k].q0);
  for (const k in pose) { const r = inst.bones[k]; if (!r) continue; e.set(pose[k][0], pose[k][1], pose[k][2]); dq.setFromEuler(e); r.b.quaternion.copy(r.q0).multiply(dq); }
  // morphs + tint + hide
  for (const m of inst.meshes) {
    if (m.morphTargetDictionary && m.morphTargetInfluences) {
      m.morphTargetInfluences.fill(0);
      for (const k in morphs) { const i = m.morphTargetDictionary[k]; if (i !== undefined) m.morphTargetInfluences[i] = morphs[k]; }
    }
    const mat = m.material as THREE.MeshStandardMaterial;
    for (const k in tint) if (mat.name.includes(k)) mat.color = new THREE.Color(tint[k]);
    m.visible = !hide.some((h) => m.name.includes(h));
  }
  return <primitive object={inst.o} position={p} rotation={[0, yaw, 0]} scale={scale} />;
};

/** Lip-sync: voice envelope (0..1) -> viseme mix that reads as talking. */
export const talkMorphs = (env: number, f: number): Morphs => {
  const v = Math.min(1, env * 1.3);
  const w = (Math.sin(f * 0.9) + 1) / 2, w2 = (Math.sin(f * 0.55 + 1) + 1) / 2;
  return { jawOpen: v * 0.35, viseme_aa: v * 0.6 * w, viseme_O: v * 0.5 * (1 - w) * w2, viseme_E: v * 0.45 * (1 - w2), viseme_PP: v < 0.08 ? 0.3 : 0 };
};
export const blinkMorphs = (f: number, seed = 0): Morphs => { const q = (f + seed * 37) % 113; const b = q < 5 ? Math.sin((q / 5) * Math.PI) : 0; return { eyeBlinkLeft: b, eyeBlinkRight: b }; };
