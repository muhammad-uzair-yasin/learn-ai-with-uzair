// Agent School · L10 — "AI Turns Every Sentence Into Coordinates — Embeddings"   projects/l010/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle, clamp01 } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, Pen, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 10, TITLE = "Sentences Become Coordinates";
const W = cueFinder(WORDS);
const F = {
  ai: W("ai"), turns: W("turns"), sentence: W("sentence"), coordinates: W("coordinates"), welcome: W("welcome"),
  yesterday: W("yesterday"), rag: W("rag"), files: W("files"), today: W("today"), finds2: W("finds", 2),
  embedding: W("embedding"), text: W("text"), numbers: W("numbers"), point: W("point"), giant: W("giant"), meaning: W("meaning"),
  map2: W("map", 2), puppy: W("puppy"), near: W("near"), dog: W("dog"), refund: W("refund"), near2: W("near", 2), money: W("money"), even: W("even"), words: W("words"),
  thats: W("thats"), magic: W("magic"), search: W("search"), meaning2: W("meaning", 2), not: W("not"), matching: W("matching"),
  so: W("so"), question: W("question"), point2: W("point", 2), closest: W("closest"), documents: W("documents"), hands: W("hands"), chunks: W("chunks"), ai2: W("ai", 2),
  these: W("these"), hundreds: W("hundreds"), thousands: W("thousands"), cant: W("cant"), math: W("math"), works: W("works"),
  remember: W("remember"), embeddings: W("embeddings"), close: W("close"), similar: W("similar"),
  tomorrow: W("tomorrow"), agent2: W("agent", 2), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

/** Dot the pen draws (outline circle, then fill). */
const PDot: React.FC<{ f: number; at: number; x: number; y: number; r?: number; c?: string }> = ({ f, at, x, y, r = 14, c = K.blue }) => {
  const p = clamp01((f - at) / 8); if (p <= 0) return null;
  const a = p * Math.PI * 2 - Math.PI / 2;
  return (<g>
    <circle cx={x} cy={y} r={r} fill={c} opacity={p >= 1 ? 1 : p * 0.5} />
    <circle cx={x} cy={y} r={r} fill="none" stroke={c} strokeWidth={4} pathLength={1} strokeDasharray={`${p} 1`} transform={`rotate(-90 ${x} ${y})`} />
    {p < 1 && <Pen x={x + Math.cos(a) * r} y={y + Math.sin(a) * r} f={f} />}
  </g>);
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.yesterday - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 10" c={K.blue} dur={10} />
      <DCard f={f} at={F.ai - 10} x={110} y={115} w={740} h={110} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.turns} x={480} y={188} fs={46} t={`"Where is my refund?"`} dur={14} />
      </DCard>
      <DLine f={f} at={F.sentence + 6} x1={480} y1={240} x2={480} y2={315} c={K.amber} w={8} head />
      <DCard f={f} at={F.sentence + 14} x={110} y={330} w={740} h={110} fill="#0F1726" stroke="#0F1726">
        <Wr f={f} at={F.coordinates - 8} x={480} y={403} fs={46} t="[ 0.21, -0.87, 0.44, … ]" c="#7EE787" dur={14} />
      </DCard>
      <Wr f={f} at={F.coordinates} x={480} y={540} fs={66} t="COORDINATES" c={K.blue} dur={14} />
    </g>
  );
  if (f < F.embedding - 6) return ( // RECAP: RAG FINDS THE PAGE
    <g>
      <Wr f={f} at={F.yesterday} x={480} y={80} fs={34} t="yesterday: RAG finds the right page" c={K.grey} dur={22} />
      {[180, 400, 620].map((x, i) => (
        <DCard key={i} f={f} at={F.rag + 4 + i * 6} x={x} y={130} w={160} h={210} fill={i === 1 ? K.soft : "#fff"} stroke={i === 1 ? K.blue : "#C9D6EA"}>
          {[0, 1, 2, 3].map((k) => <DBar key={k} f={f} at={F.rag + 14 + i * 6 + k * 2} x={x + 25} y={175 + k * 38} w={110 - (k % 2) * 30} h={12} c={i === 1 ? K.blue : "#C9D3E6"} dur={8} />)}
        </DCard>
      ))}
      <DTick f={f} at={F.files} x={480} y={395} ok s={0.8} />
      <Wr f={f} at={F.today} x={480} y={520} fs={60} t="TODAY: HOW IT FINDS IT" c={K.blue} dur={18} />
    </g>
  );
  if (f < F.map2 - 6) return ( // EMBEDDING = LIST OF NUMBERS = POINT
    <g>
      <Wr f={f} at={F.embedding - 4} x={480} y={75} fs={56} t="EMBEDDING" c={K.blue} dur={12} />
      <DCard f={f} at={F.text - 6} x={40} y={120} w={240} h={100} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.text} x={160} y={185} fs={42} t={`"puppy"`} dur={10} />
      </DCard>
      <DLine f={f} at={F.text + 12} x1={295} y1={170} x2={370} y2={170} c={K.amber} w={8} head />
      <DCard f={f} at={F.text + 18} x={385} y={120} w={535} h={100} fill="#0F1726" stroke="#0F1726">
        <Wr f={f} at={F.numbers - 6} x={652} y={185} fs={36} t="0.12  0.98  -0.33  0.71 …" c="#7EE787" dur={20} />
      </DCard>
      <DLine f={f} at={F.point - 6} x1={90} y1={570} x2={900} y2={570} c={K.grey} w={5} dur={10} />
      <DLine f={f} at={F.point - 6} x1={90} y1={570} x2={90} y2={260} c={K.grey} w={5} dur={10} />
      <PDot f={f} at={F.point + 2} x={330} y={420} r={18} c={K.amber} />
      <Wr f={f} at={F.point + 8} x={360} y={432} fs={34} t="puppy" a="start" dur={8} />
      <Wr f={f} at={F.giant} x={620} y={320} fs={40} t="a giant MAP" c={K.ink} dur={12} />
      <Wr f={f} at={F.meaning - 4} x={620} y={380} fs={40} t="of MEANING" c={K.blue} dur={12} />
    </g>
  );
  if (f < F.thats - 6) return ( // THE MAP: close = similar
    <g>
      <Wr f={f} at={F.map2 - 4} x={480} y={65} fs={40} t="THE MAP OF MEANING" c={K.blue} dur={14} />
      <DLine f={f} at={F.map2} x1={60} y1={575} x2={910} y2={575} c={K.grey} w={5} dur={10} />
      <DLine f={f} at={F.map2} x1={60} y1={575} x2={60} y2={100} c={K.grey} w={5} dur={10} />
      <PDot f={f} at={F.puppy} x={180} y={170} c={K.amber} />
      <Wr f={f} at={F.puppy + 2} x={205} y={182} fs={34} t="puppy" a="start" dur={8} />
      <PDot f={f} at={F.dog} x={240} y={240} c={K.amber} />
      <Wr f={f} at={F.dog + 2} x={265} y={252} fs={34} t="dog" a="start" dur={6} />
      <DLine f={f} at={F.dog + 10} x1={186} y1={182} x2={232} y2={228} c={K.green} w={5} dur={6} />
      <PDot f={f} at={F.refund} x={560} y={330} c={K.blue} />
      <Wr f={f} at={F.refund + 2} x={585} y={342} fs={32} t={`"refund policy"`} a="start" dur={12} />
      <PDot f={f} at={F.money - 6} x={600} y={400} c={K.blue} />
      <Wr f={f} at={F.money - 2} x={575} y={412} fs={28} t={`"how do I get my money back"`} a="end" dur={16} />
      <DLine f={f} at={F.money + 14} x1={565} y1={342} x2={594} y2={388} c={K.green} w={5} dur={6} />
      <DCard f={f} at={F.even} x={420} y={460} w={470} h={80} r={40} fill={K.green} stroke={K.green} dur={10}>
        <Wr f={f} at={F.even + 8} x={655} y={512} fs={32} t="almost NO shared words!" c="#fff" dur={16} />
      </DCard>
    </g>
  );
  if (f < F.so - 6) return ( // MAGIC: meaning, not matching words
    <g>
      <Wr f={f} at={F.thats} x={480} y={95} fs={56} t="THAT'S THE MAGIC" c={K.amber} dur={14} />
      <DCard f={f} at={F.search - 10} x={60} y={150} w={400} h={260} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.search} x={260} y={255} fs={40} t="SEARCH BY" dur={10} />
        <Wr f={f} at={F.meaning2} x={260} y={330} fs={56} t="MEANING" c={K.blue} dur={10} />
      </DCard>
      <DCard f={f} at={F.not - 6} x={500} y={150} w={400} h={260}>
        <Wr f={f} at={F.not + 2} x={700} y={255} fs={40} t="not by" c={K.grey} dur={8} />
        <Wr f={f} at={F.matching} x={700} y={330} fs={44} t="matching words" c={K.grey} dur={14} />
      </DCard>
      <DTick f={f} at={F.meaning2 + 10} x={260} y={490} ok />
      <DTick f={f} at={F.matching + 14} x={700} y={490} ok={false} />
    </g>
  );
  if (f < F.these - 6) return ( // RAG uses the map
    <g>
      <Wr f={f} at={F.so} x={480} y={65} fs={40} t="HOW RAG USES THE MAP" c={K.blue} dur={16} />
      <DCard f={f} at={F.so + 6} x={40} y={110} w={580} h={460} />
      {[[120, 200], [210, 470], [480, 180], [520, 500], [150, 360], [560, 300], [400, 450]].map(([x, y], i) => <PDot key={i} f={f} at={F.so + 22 + i * 3} x={x} y={y} r={11} c="#C9D3E6" />)}
      <Wr f={f} at={F.question - 4} x={330} y={290} fs={30} t="your question" c={K.amber} dur={10} />
      <PDot f={f} at={F.point2} x={330} y={330} r={17} c={K.amber} />
      <DLine f={f} at={F.closest} x1={330} y1={330} x2={395} y2={437} c={K.green} w={5} dur={8} />
      <DLine f={f} at={F.closest + 6} x1={330} y1={330} x2={152} y2={355} c={K.green} w={5} dur={8} />
      <PDot f={f} at={F.closest + 12} x={400} y={450} r={13} c={K.green} />
      <PDot f={f} at={F.closest + 16} x={150} y={360} r={13} c={K.green} />
      <Wr f={f} at={F.documents - 4} x={330} y={545} fs={28} t="closest points in your docs" c={K.green} dur={16} />
      <DLine f={f} at={F.hands} x1={630} y1={340} x2={705} y2={340} c={K.amber} w={8} head />
      <DCard f={f} at={F.chunks - 6} x={715} y={200} w={215} h={280} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.chunks} x={822} y={280} fs={34} t="chunks" dur={8} />
        <Wr f={f} at={F.ai2 - 4} x={822} y={400} fs={80} t="→ AI" c={K.blue} dur={10} />
      </DCard>
    </g>
  );
  if (f < F.remember - 6) return ( // DIMENSIONS
    <g>
      <Wr f={f} at={F.hundreds - 4} x={480} y={90} fs={60} t="HUNDREDS" c={K.blue} dur={12} />
      <Wr f={f} at={F.thousands - 4} x={480} y={160} fs={40} t="or thousands of DIMENSIONS" dur={20} />
      {[...Array(8)].map((_, i) => <DBar key={i} f={f} at={F.thousands + 6 + i * 3} x={150} y={200 + i * 30} w={200 + ((i * 263) % 460)} h={16} c={i % 2 ? K.cyan : K.blue} dur={10} />)}
      <Wr f={f} at={F.cant - 2} x={480} y={480} fs={36} t="we can't picture them…" c={K.grey} dur={14} />
      <Wr f={f} at={F.math} x={430} y={555} fs={40} t="but distance still works" c={K.green} dur={20} />
      <DTick f={f} at={F.works} x={850} y={540} ok s={0.8} />
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={85} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.embeddings - 6} x={80} y={130} w={800} h={180}>
        <Wr f={f} at={F.embeddings} x={480} y={205} fs={46} t="EMBEDDINGS PUT" dur={14} />
        <Wr f={f} at={F.embeddings + 20} x={480} y={270} fs={46} t="MEANING ON A MAP" c={K.blue} dur={14} />
      </DCard>
      <DCard f={f} at={F.close - 6} x={80} y={345} w={800} h={190} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.close} x={480} y={425} fs={50} t="CLOSE POINTS" dur={12} />
        <Wr f={f} at={F.similar} x={480} y={495} fs={44} t="= SIMILAR MEANING" c={K.green} dur={14} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="AI doesn't see your photo. It reads it." tomorrowAt={F.tomorrow} schoolAt={F.agent2 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.yesterday, 0.9], [F.thats - 4, 0.9], [F.thats, 0.3], [F.search - 4, 0.9],
      [F.cant - 6, 0.9], [F.cant, 0.3], [F.math - 4, 0.9], [F.remember - 20, 0.9], [F.remember - 6, 0.2], [F.embeddings, 0.9], [F.tomorrow, 0.9], [F.agent2, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.yesterday, "openPalm"], [F.thats, "fingerUp"], [F.search, "openPalm"], [F.cant, "fingerUp"],
      [F.math, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent2, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.coordinates, F.coordinates + 30], [F.even, F.even + 30], [F.magic, F.magic + 30], [F.hundreds, F.hundreds + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.yesterday - 6, M], [F.yesterday + 10, S],
    [F.thats - 8, S], [F.thats + 4, Wd], [F.search - 6, Wd], [F.search + 4, S], [F.these - 10, S], [F.these + 4, Wd], [F.hundreds, S],
    [F.remember - 8, S], [F.remember + 6, Fc], [F.embeddings - 8, Fc], [F.embeddings + 4, S], [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l010" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L10" line1="YOUR WORDS" fs1={130} line2="ARE A MAP" fs3={136} bubble1="WAIT, WHAT?!" bubble2="embeddings explained" />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}><text x={540} y={820} textAnchor="middle" fontFamily="InterLocal, Inter, sans-serif" fontWeight={800} fontSize={64} fill={K.amber}>"puppy" lands near "dog"</text></svg></AbsoluteFill>
);
