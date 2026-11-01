// Agent School · L11 — "AI Doesn't See Your Photo, It Reads It — Multimodal"   projects/l011/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle, clamp01 } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, Pen, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 11, TITLE = "AI Doesn't See Your Photo";
const W = cueFinder(WORDS);
const F = {
  ai: W("ai"), doesnt: W("doesnt"), photo: W("photo"), reads: W("reads"), welcome: W("welcome"),
  we: W("we"), tokens: W("tokens"), heres: W("heres"), twist: W("twist"), pictures: W("pictures"),
  multimodal: W("multimodal"), chops: W("chops"), patches: W("patches"), each: W("each"), token: W("token"), chunk: W("chunk"),
  then: W("then"), same: W("same"), prediction: W("prediction"), image2: W("image", 2), text: W("text"), side: W("side"),
  thats: W("thats"), snap: W("snap"), fridge: W("fridge"), cook: W("cook"), show: W("show"), chart: W("chart"), trend: W("trend"),
  audio: W("audio"), sound: W("sound"), tokens5: W("tokens", 5), voice: W("voice"), listen: W("listen"),
  but: W("but"), misread: W("misread"), tiny: W("tiny"), crowded: W("crowded"), counting: W("counting"), doublecheck: W("doublecheck"),
  remember: W("remember"), everything: W("everything"), tokens6: W("tokens", 6), words: W("words"), sound2: W("sound", 2),
  tomorrow: W("tomorrow"), agent2: W("agent", 2), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};
const PC = ["#7FC8F8", "#5AA9E6", "#FFE45E", "#7BD389", "#56BE79", "#F9A03F", "#3FA463", "#C98F55", "#8B5E34"];

/** Square token tile the pen draws. */
const Tile: React.FC<{ f: number; at: number; x: number; y: number; s?: number; c: string }> = ({ f, at, x, y, s = 60, c }) => (
  <DCard f={f} at={at} x={x} y={y} w={s} h={s} r={10} fill={c} stroke={K.ink} dur={8} />
);
/** Dot the pen draws. */
const PDot: React.FC<{ f: number; at: number; x: number; y: number; r?: number; c?: string }> = ({ f, at, x, y, r = 14, c = K.blue }) => {
  const p = clamp01((f - at) / 8); if (p <= 0) return null;
  const a = p * Math.PI * 2 - Math.PI / 2;
  return (<g>
    <circle cx={x} cy={y} r={r} fill={c} opacity={p >= 1 ? 1 : p * 0.5} />
    <circle cx={x} cy={y} r={r} fill="none" stroke={c} strokeWidth={4} pathLength={1} strokeDasharray={`${p} 1`} transform={`rotate(-90 ${x} ${y})`} />
    {p < 1 && <Pen x={x + Math.cos(a) * r} y={y + Math.sin(a) * r} f={f} />}
  </g>);
};
/** A little landscape photo drawn by the pen. */
const Photo: React.FC<{ f: number; at: number; x: number; y: number; w: number; h: number }> = ({ f, at, x, y, w, h }) => (
  <g>
    <DCard f={f} at={at} x={x} y={y} w={w} h={h} fill="#DCEBFF" stroke={K.ink} dur={10} />
    <DLine f={f} at={at + 10} x1={x + 20} y1={y + h - 30} x2={x + w * 0.38} y2={y + h * 0.42} c={K.green} w={7} dur={6} />
    <DLine f={f} at={at + 16} x1={x + w * 0.38} y1={y + h * 0.42} x2={x + w * 0.62} y2={y + h - 30} c={K.green} w={7} dur={6} />
    <DLine f={f} at={at + 20} x1={x + w * 0.52} y1={y + h * 0.65} x2={x + w * 0.72} y2={y + h * 0.5} c={K.green} w={7} dur={5} />
    <DLine f={f} at={at + 24} x1={x + w * 0.72} y1={y + h * 0.5} x2={x + w - 20} y2={y + h - 30} c={K.green} w={7} dur={5} />
    <PDot f={f} at={at + 28} x={x + w * 0.78} y={y + h * 0.25} r={Math.min(w, h) * 0.08} c={K.amber} />
  </g>
);

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.we - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 11" c={K.blue} dur={10} />
      <Photo f={f} at={F.ai - 10} x={60} y={120} w={340} h={260} />
      <Wr f={f} at={F.doesnt} x={680} y={210} fs={56} t="DOESN'T SEE" c={K.red} dur={12} />
      <DLine f={f} at={F.reads - 10} x1={415} y1={300} x2={470} y2={300} c={K.amber} w={8} head dur={6} />
      <Wr f={f} at={F.reads - 2} x={690} y={320} fs={62} t="IT READS IT" c={K.blue} dur={12} />
      {[0, 1, 2, 3, 4, 5].map((i) => <Tile key={i} f={f} at={F.reads + 10 + i * 4} x={90 + i * 135} y={440} s={100} c={PC[i]} />)}
    </g>
  );
  if (f < F.multimodal - 6) return ( // RECAP + TWIST
    <g>
      <Wr f={f} at={F.we} x={480} y={80} fs={40} t="we know: AI reads TOKENS" c={K.grey} dur={18} />
      {["un", "believ", "able"].map((t, i) => (
        <DCard key={i} f={f} at={F.tokens + i * 5} x={170 + i * 215} y={120} w={190} h={90} fill={K.soft} stroke={K.blue} dur={8}>
          <Wr f={f} at={F.tokens + 6 + i * 5} x={265 + i * 215} y={180} fs={40} t={t} dur={6} />
        </DCard>
      ))}
      <Wr f={f} at={F.pictures - 6} x={480} y={320} fs={44} t="THE TWIST:" c={K.amber} dur={10} />
      <Photo f={f} at={F.pictures} x={110} y={360} w={240} h={190} />
      <DLine f={f} at={F.pictures + 14} x1={370} y1={455} x2={450} y2={455} c={K.amber} w={8} head dur={6} />
      {[0, 1, 2, 3].map((i) => <Tile key={i} f={f} at={F.pictures + 20 + i * 4} x={480 + i * 110} y={410} s={90} c={PC[i + 2]} />)}
    </g>
  );
  if (f < F.then - 6) return ( // PATCHES -> TOKENS
    <g>
      <Wr f={f} at={F.multimodal - 2} x={480} y={70} fs={48} t="MULTIMODAL MODEL" c={K.blue} dur={14} />
      {[...Array(9)].map((_, i) => { const on = f >= F.patches + i * 2; return on ? <rect key={i} x={60 + (i % 3) * 100} y={120 + Math.floor(i / 3) * 100} width={100} height={100} fill={PC[i]} opacity={0.75} /> : null; })}
      <DCard f={f} at={F.multimodal + 6} x={60} y={120} w={300} h={300} fill="none" stroke={K.ink} r={4} dur={10} />
      <DLine f={f} at={F.chops} x1={160} y1={120} x2={160} y2={420} c={K.ink} w={5} dur={6} />
      <DLine f={f} at={F.chops + 5} x1={260} y1={120} x2={260} y2={420} c={K.ink} w={5} dur={6} />
      <DLine f={f} at={F.chops + 10} x1={60} y1={220} x2={360} y2={220} c={K.ink} w={5} dur={6} />
      <DLine f={f} at={F.chops + 15} x1={60} y1={320} x2={360} y2={320} c={K.ink} w={5} dur={6} />
      <Wr f={f} at={F.patches} x={210} y={480} fs={36} t="small patches" c={K.ink} dur={10} />
      <DLine f={f} at={F.each - 4} x1={380} y1={270} x2={450} y2={270} c={K.amber} w={8} head dur={6} />
      {[...Array(9)].map((_, i) => <Tile key={i} f={f} at={F.each + 4 + i * 2} x={470 + (i % 3) * 150} y={120 + Math.floor(i / 3) * 100} s={80} c={PC[i]} />)}
      <Wr f={f} at={F.token - 8} x={680} y={455} fs={40} t="each patch = 1 TOKEN" c={K.blue} dur={14} />
      <Wr f={f} at={F.chunk - 6} x={680} y={520} fs={30} t="just like a chunk of a word" c={K.grey} dur={16} />
    </g>
  );
  if (f < F.thats - 6) return ( // SIDE BY SIDE INTO THE SAME MACHINE
    <g>
      <Wr f={f} at={F.same - 4} x={480} y={70} fs={44} t="SAME PREDICTION MACHINE" dur={18} />
      {[0, 1, 2, 3, 4].map((i) => <Tile key={i} f={f} at={F.image2 - 4 + i * 3} x={60 + i * 80} y={140} s={66} c={PC[i]} />)}
      <Wr f={f} at={F.image2 + 8} x={240} y={260} fs={30} t="image tokens" c={K.grey} dur={10} />
      {["what", "is", "this?"].map((t, i) => (
        <DCard key={i} f={f} at={F.text - 4 + i * 4} x={520 + i * 135} y={140} w={120} h={66} r={12} fill={K.soft} stroke={K.blue} dur={8}>
          <Wr f={f} at={F.text + 2 + i * 4} x={580 + i * 135} y={185} fs={30} t={t} dur={5} />
        </DCard>
      ))}
      <Wr f={f} at={F.text + 12} x={720} y={260} fs={30} t="text tokens" c={K.grey} dur={10} />
      <DLine f={f} at={F.side - 6} x1={240} y1={290} x2={400} y2={385} c={K.amber} w={8} head dur={8} />
      <DLine f={f} at={F.side} x1={720} y1={290} x2={560} y2={385} c={K.amber} w={8} head dur={8} />
      <DCard f={f} at={F.prediction - 8} x={300} y={400} w={360} h={130} fill="#0F1726" stroke="#0F1726">
        <Wr f={f} at={F.prediction} x={480} y={485} fs={52} t="MODEL" c="#fff" dur={10} />
      </DCard>
      <Wr f={f} at={F.side + 10} x={480} y={580} fs={30} t="side by side" c={K.blue} dur={10} />
    </g>
  );
  if (f < F.audio - 6) return ( // EXAMPLES
    <g>
      <DCard f={f} at={F.snap - 8} x={60} y={60} w={400} h={330}>
        <DCard f={f} at={F.fridge - 6} x={190} y={90} w={140} h={230} r={14} fill="#F4F7FB" stroke={K.ink} dur={10} />
        <DLine f={f} at={F.fridge + 4} x1={190} y1={170} x2={330} y2={170} c={K.ink} w={5} dur={5} />
        <DLine f={f} at={F.fridge + 8} x1={305} y1={120} x2={305} y2={150} c={K.ink} w={6} dur={4} />
        <Wr f={f} at={F.fridge + 6} x={260} y={365} fs={30} t="snap a fridge" c={K.grey} dur={10} />
      </DCard>
      <DCard f={f} at={F.cook - 12} x={60} y={420} w={400} h={100} r={50} fill={K.amber} stroke={K.amber} dur={8}>
        <Wr f={f} at={F.cook - 6} x={260} y={483} fs={34} t={`"what can I cook?"`} dur={12} />
      </DCard>
      <DCard f={f} at={F.show - 4} x={500} y={60} w={400} h={330}>
        <DLine f={f} at={F.chart - 4} x1={560} y1={330} x2={860} y2={330} c={K.grey} w={5} dur={6} />
        <DLine f={f} at={F.chart - 4} x1={560} y1={330} x2={560} y2={100} c={K.grey} w={5} dur={6} />
        <DLine f={f} at={F.chart + 4} x1={570} y1={300} x2={660} y2={250} c={K.blue} w={8} dur={5} />
        <DLine f={f} at={F.chart + 9} x1={660} y1={250} x2={740} y2={270} c={K.blue} w={8} dur={5} />
        <DLine f={f} at={F.chart + 14} x1={740} y1={270} x2={850} y2={140} c={K.blue} w={8} dur={6} head />
        <Wr f={f} at={F.chart + 10} x={700} y={365} fs={30} t="show a chart" c={K.grey} dur={10} />
      </DCard>
      <DCard f={f} at={F.trend - 14} x={500} y={420} w={400} h={100} r={50} fill={K.amber} stroke={K.amber} dur={8}>
        <Wr f={f} at={F.trend - 8} x={700} y={483} fs={34} t={`"what's the trend?"`} dur={12} />
      </DCard>
    </g>
  );
  if (f < F.but - 6) { // AUDIO
    const hs = [40, 90, 60, 130, 80, 150, 70, 110, 50, 120, 60, 30];
    return (
      <g>
        <Wr f={f} at={F.audio - 4} x={480} y={75} fs={44} t="AUDIO WORKS THE SAME WAY" c={K.blue} dur={18} />
        {hs.map((h, i) => <DLine key={i} f={f} at={F.sound - 8 + i * 1.5} x1={90 + i * 32} y1={260 - h / 2 * 1.2} x2={90 + i * 32} y2={260 + h / 2 * 1.2} c={K.violet} w={12} dur={4} />)}
        <Wr f={f} at={F.sound} x={265} y={400} fs={36} t="sound" c={K.violet} dur={8} />
        <DLine f={f} at={F.tokens5 - 8} x1={480} y1={260} x2={550} y2={260} c={K.amber} w={8} head dur={6} />
        {[0, 1, 2, 3].map((i) => <Tile key={i} f={f} at={F.tokens5 + i * 3} x={570 + i * 88} y={225} s={72} c={PC[(i * 2) % 9]} />)}
        <Wr f={f} at={F.tokens5 + 6} x={740} y={400} fs={36} t="tokens" c={K.blue} dur={8} />
        <DCard f={f} at={F.voice - 10} x={80} y={450} w={800} h={100} fill={K.soft} stroke={K.blue}>
          <Wr f={f} at={F.voice - 4} x={480} y={513} fs={34} t="that's how voice assistants listen" dur={22} />
        </DCard>
      </g>
    );
  }
  if (f < F.remember - 6) return ( // CAN STILL MISREAD
    <g>
      <Wr f={f} at={F.misread - 8} x={480} y={85} fs={52} t="IT CAN STILL MISREAD" c={K.red} dur={16} />
      {[["tiny", "text", F.tiny], ["crowded", "charts", F.crowded], ["counting", "objects", F.counting]].map(([a, b, at], i) => (
        <DCard key={i} f={f} at={(at as number) - 8} x={45 + i * 300} y={140} w={270} h={190}>
          <Wr f={f} at={(at as number) - 2} x={180 + i * 300} y={225} fs={40} t={a as string} dur={8} />
          <Wr f={f} at={(at as number) + 4} x={180 + i * 300} y={285} fs={40} t={b as string} c={K.red} dur={8} />
        </DCard>
      ))}
      <DCard f={f} at={F.doublecheck - 10} x={130} y={390} w={700} h={110} r={55} fill={K.green} stroke={K.green} dur={10}>
        <Wr f={f} at={F.doublecheck - 2} x={480} y={460} fs={36} t="DOUBLE-CHECK WHAT MATTERS" c="#fff" dur={18} />
      </DCard>
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={85} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.everything - 10} x={80} y={130} w={800} h={190}>
        <Wr f={f} at={F.everything - 4} x={480} y={210} fs={50} t="TO AI, EVERYTHING" dur={14} />
        <Wr f={f} at={F.tokens6 - 6} x={480} y={280} fs={50} t="BECOMES TOKENS" c={K.blue} dur={14} />
      </DCard>
      {["WORDS", "PICTURES", "SOUND"].map((t, i) => (
        <DCard key={i} f={f} at={F.words - 6 + i * 6} x={80 + i * 280} y={370} w={240} h={120} fill={K.soft} stroke={K.blue} dur={8}>
          <Wr f={f} at={F.words + i * 6} x={200 + i * 280} y={445} fs={36} t={t} c={K.blue} dur={8} />
        </DCard>
      ))}
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="Stop fine-tuning. Here's what to do instead." tomorrowAt={F.tomorrow} schoolAt={F.agent2 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.we, 0.9], [F.heres - 4, 0.9], [F.heres, 0.25], [F.pictures - 20, 0.25], [F.pictures - 8, 0.9],
      [F.but - 6, 0.9], [F.but, 0.3], [F.misread, 0.9], [F.remember - 20, 0.9], [F.remember - 6, 0.2], [F.everything, 0.9], [F.tomorrow, 0.9], [F.agent2, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.we, "openPalm"], [F.heres, "fingerUp"], [F.pictures, "openPalm"], [F.but, "fingerUp"],
      [F.misread + 10, "openPalm"], [F.doublecheck, "fingerUp"], [F.remember + 20, "openPalm"], [F.tomorrow, "openPalm"], [F.agent2, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.reads, F.reads + 30], [F.twist, F.twist + 30], [F.snap, F.snap + 24], [F.misread, F.misread + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.we - 6, M], [F.we + 10, S],
    [F.heres - 6, S], [F.heres + 4, Fc], [F.pictures - 14, Fc], [F.pictures - 4, S], [F.but - 10, S], [F.but + 2, Wd], [F.tiny - 6, Wd], [F.tiny + 4, S],
    [F.remember - 8, S], [F.remember + 6, Fc], [F.everything - 14, Fc], [F.everything - 4, S], [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l011" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L11" line1="AI DOESN'T" fs1={130} strike="SEE" line2="IT READS IT" fs3={120} bubble1="READS HOW?!" bubble2="multimodal AI" /></AbsoluteFill>
);
