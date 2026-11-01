// Agent School · L12 — "Stop Fine-Tuning — Prompt vs RAG vs Fine-Tune"   projects/l012/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 12, TITLE = "Prompt vs RAG vs Fine-Tune";
const W = cueFinder(WORDS);
const F = {
  stop: W("stop"), finetuning: W("finetuning"), least: W("least"), welcome: W("welcome"),
  you: W("you"), three: W("three"), ways: W("ways"), job: W("job"), today: W("today"),
  one2: W("one", 2), change: W("change"), instructions: W("instructions"), free: W("free"), instant: W("instant"), always: W("always"),
  two: W("two"), give: W("give"), documents: W("documents"), policies: W("policies"), products: W("products"), perfect: W("perfect"),
  three2: W("three", 2), retrain: W("retrain"), changes: W("changes"), behaves: W("behaves"), style: W("style"), format: W("format"), not2: W("not", 2), knows: W("knows"),
  most: W("most"), jump: W("jump"), finetuning3: W("finetuning", 3), teach: W("teach"), thats: W("thats"), expensive: W("expensive"), rag2: W("rag", 2),
  so2: W("so", 2), order: W("order"), prompt: W("prompt"), add: W("add"), knowledge2: W("knowledge", 2), finetune: W("finetune"), behavior: W("behavior"),
  remember: W("remember"), prompt3: W("prompt", 3), rag4: W("rag", 4), finetune2: W("finetune", 2), order2: W("order", 2),
  tomorrow: W("tomorrow"), agent3: W("agent", 3), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.you - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 12" c={K.blue} dur={10} />
      <DCard f={f} at={F.stop - 8} x={280} y={110} w={400} h={140} r={70} fill={K.red} stroke={K.red} dur={8}>
        <Wr f={f} at={F.stop} x={480} y={215} fs={96} t="STOP" c="#fff" dur={8} />
      </DCard>
      <Wr f={f} at={F.finetuning} x={480} y={370} fs={84} t="FINE-TUNING" dur={16} />
      <Wr f={f} at={F.least} x={480} y={500} fs={56} t="…at least, not yet." c={K.amber} dur={16} />
    </g>
  );
  if (f < F.one2 - 6) return ( // THREE WAYS
    <g>
      <Wr f={f} at={F.you} x={480} y={80} fs={40} t="3 WAYS TO MAKE AI FIT YOUR JOB" dur={22} />
      {["PROMPT", "RAG", "FINE-TUNE"].map((t, i) => (
        <DCard key={i} f={f} at={F.ways + i * 8} x={60 + i * 300} y={140} w={240} h={200} fill={K.soft} stroke={K.blue} dur={10}>
          <Wr f={f} at={F.ways + 8 + i * 8} x={180 + i * 300} y={215} fs={44} t={`${i + 1}`} c={K.grey} dur={4} />
          <Wr f={f} at={F.ways + 10 + i * 8} x={180 + i * 300} y={290} fs={34} t={t} c={K.blue} dur={8} />
        </DCard>
      ))}
      <Wr f={f} at={F.today} x={480} y={460} fs={48} t="TODAY: WHICH ONE TO PICK?" c={K.amber} dur={18} />
    </g>
  );
  if (f < F.two - 6) return ( // 1 PROMPTING
    <g>
      <Wr f={f} at={F.one2} x={480} y={85} fs={56} t="1 · PROMPTING" c={K.blue} dur={12} />
      <DCard f={f} at={F.change - 10} x={60} y={130} w={540} h={220}>
        <Wr f={f} at={F.change - 4} x={90} y={185} fs={28} t="instructions:" c={K.grey} a="start" dur={8} />
        <Wr f={f} at={F.change} x={90} y={250} fs={32} t="Be helpful." a="start" dur={8} />
        <DLine f={f} at={F.change + 8} x1={85} y1={240} x2={290} y2={240} c={K.red} w={6} dur={6} />
        <Wr f={f} at={F.instructions} x={90} y={315} fs={30} t="Answer in 3 short bullets." c={K.blue} a="start" dur={16} />
      </DCard>
      <DCard f={f} at={F.free - 6} x={640} y={140} w={260} h={80} r={40} fill={K.green} stroke={K.green} dur={8}>
        <Wr f={f} at={F.free} x={770} y={193} fs={40} t="FREE" c="#fff" dur={6} />
      </DCard>
      <DCard f={f} at={F.instant + 4} x={640} y={250} w={260} h={80} r={40} fill={K.green} stroke={K.green} dur={8}>
        <Wr f={f} at={F.instant + 10} x={770} y={303} fs={40} t="INSTANT" c="#fff" dur={8} />
      </DCard>
      <DCard f={f} at={F.always - 6} x={130} y={400} w={700} h={110} r={55} fill={K.amber} stroke={K.amber} dur={10}>
        <Wr f={f} at={F.always} x={480} y={470} fs={40} t="ALWAYS TRY THIS FIRST" dur={16} />
      </DCard>
    </g>
  );
  if (f < F.three2 - 6) return ( // 2 RAG
    <g>
      <Wr f={f} at={F.two} x={480} y={85} fs={56} t="2 · RAG" c={K.blue} dur={10} />
      <Wr f={f} at={F.give} x={480} y={150} fs={40} t="GIVE IT YOUR KNOWLEDGE" dur={16} />
      {[["documents", F.documents], ["policies", F.policies], ["products", F.products]].map(([t, at], i) => (
        <DCard key={i} f={f} at={(at as number) - 8} x={60 + i * 300} y={195} w={240} h={170} fill={K.soft} stroke={K.blue} dur={10}>
          {[0, 1, 2].map((k) => <DLine key={k} f={f} at={(at as number) + k * 2} x1={100 + i * 300} y1={235 + k * 26} x2={(k === 2 ? 200 : 260) + i * 300} y2={235 + k * 26} c="#C9D3E6" w={8} dur={4} />)}
          <Wr f={f} at={(at as number) + 2} x={180 + i * 300} y={340} fs={34} t={t as string} dur={8} />
        </DCard>
      ))}
      <DCard f={f} at={F.perfect - 6} x={110} y={420} w={740} h={110} r={55} fill={K.green} stroke={K.green} dur={10}>
        <Wr f={f} at={F.perfect} x={480} y={490} fs={38} t="PERFECT WHEN FACTS CHANGE" c="#fff" dur={16} />
      </DCard>
    </g>
  );
  if (f < F.most - 6) return ( // 3 FINE-TUNING
    <g>
      <Wr f={f} at={F.three2} x={480} y={85} fs={56} t="3 · FINE-TUNING" c={K.blue} dur={14} />
      <Wr f={f} at={F.retrain} x={480} y={145} fs={32} t="retrain the model on your examples" c={K.grey} dur={20} />
      <DCard f={f} at={F.changes - 8} x={60} y={190} w={400} h={330} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.changes} x={260} y={250} fs={34} t="CHANGES" c={K.green} dur={8} />
        <Wr f={f} at={F.behaves - 6} x={260} y={315} fs={36} t="how it behaves" dur={12} />
        <Wr f={f} at={F.style} x={200} y={395} fs={38} t="style" dur={6} />
        <DTick f={f} at={F.style + 6} x={340} y={383} ok s={0.55} />
        <Wr f={f} at={F.format} x={200} y={470} fs={38} t="format" dur={6} />
        <DTick f={f} at={F.format + 6} x={340} y={458} ok s={0.55} />
      </DCard>
      <DCard f={f} at={F.not2 - 8} x={500} y={190} w={400} h={330}>
        <Wr f={f} at={F.not2} x={700} y={250} fs={34} t="NOT SO MUCH" c={K.grey} dur={10} />
        <Wr f={f} at={F.knows - 8} x={700} y={330} fs={40} t="what it knows" dur={12} />
        <DTick f={f} at={F.knows + 8} x={700} y={430} ok={false} s={0.9} />
      </DCard>
    </g>
  );
  if (f < F.so2 - 6) return ( // THE COMMON MISTAKE
    <g>
      <Wr f={f} at={F.most} x={480} y={85} fs={44} t="MOST PEOPLE…" dur={10} />
      <Wr f={f} at={F.jump} x={250} y={195} fs={34} t="jump straight to" c={K.grey} dur={12} />
      <DLine f={f} at={F.jump + 12} x1={420} y1={185} x2={500} y2={185} c={K.amber} w={8} head dur={6} />
      <DCard f={f} at={F.finetuning3 - 6} x={515} y={130} w={385} h={100} r={50} fill={K.red} stroke={K.red} dur={8}>
        <Wr f={f} at={F.finetuning3} x={707} y={196} fs={44} t="FINE-TUNING" c="#fff" dur={12} />
      </DCard>
      <Wr f={f} at={F.teach} x={480} y={310} fs={40} t="…to teach the AI facts" dur={16} />
      <DCard f={f} at={F.thats - 6} x={80} y={360} w={800} h={170} fill="#FFF4E2" stroke={K.amber}>
        <Wr f={f} at={F.expensive - 6} x={480} y={440} fs={50} t="= THE EXPENSIVE WAY" c={K.red} dur={14} />
        <Wr f={f} at={F.rag2 - 6} x={480} y={500} fs={38} t="to do RAG" dur={8} />
      </DCard>
    </g>
  );
  if (f < F.remember - 6) return ( // THE ORDER
    <g>
      <Wr f={f} at={F.order - 4} x={480} y={80} fs={52} t="THE ORDER" c={K.blue} dur={10} />
      <DCard f={f} at={F.prompt - 8} x={40} y={120} w={280} h={130} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.prompt} x={180} y={185} fs={40} t="1 PROMPT" dur={8} />
        <Wr f={f} at={F.prompt + 8} x={180} y={230} fs={28} t="first" c={K.green} dur={6} />
      </DCard>
      <DLine f={f} at={F.add - 8} x1={180} y1={265} x2={330} y2={320} c={K.amber} w={7} head dur={6} />
      <DCard f={f} at={F.add - 2} x={340} y={260} w={280} h={130} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.add + 4} x={480} y={325} fs={40} t="2 + RAG" dur={8} />
        <Wr f={f} at={F.knowledge2 - 6} x={480} y={370} fs={26} t="needs knowledge" c={K.green} dur={10} />
      </DCard>
      <DLine f={f} at={F.finetune - 8} x1={480} y1={405} x2={630} y2={460} c={K.amber} w={7} head dur={6} />
      <DCard f={f} at={F.finetune - 2} x={640} y={400} w={280} h={130} fill="#FFF4E2" stroke={K.amber}>
        <Wr f={f} at={F.finetune + 4} x={780} y={465} fs={34} t="3 FINE-TUNE" dur={10} />
        <Wr f={f} at={F.behavior - 6} x={780} y={510} fs={26} t="only: new behavior" c={K.red} dur={12} />
      </DCard>
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={90} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      {[["PROMPT", F.prompt3], ["RAG", F.rag4], ["FINE-TUNE", F.finetune2]].map(([t, at], i) => (
        <DCard key={i} f={f} at={(at as number) - 8} x={40 + i * 310} y={190} w={260} h={140} fill={i === 2 ? "#FFF4E2" : K.soft} stroke={i === 2 ? K.amber : K.blue} dur={10}>
          <Wr f={f} at={at as number} x={170 + i * 310} y={275} fs={i === 2 ? 36 : 44} t={t as string} dur={8} />
        </DCard>
      ))}
      <DLine f={f} at={F.rag4 - 10} x1={305} y1={260} x2={345} y2={260} c={K.ink} w={6} head dur={4} />
      <DLine f={f} at={F.finetune2 - 10} x1={615} y1={260} x2={655} y2={260} c={K.ink} w={6} head dur={4} />
      <Wr f={f} at={F.order2 - 8} x={480} y={460} fs={60} t="IN THAT ORDER" c={K.green} dur={14} />
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="A chatbot answers. An agent acts." tomorrowAt={F.tomorrow} schoolAt={F.agent3 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.you - 10, 0.2], [F.you, 0.9], [F.most - 6, 0.9], [F.most, 0.3], [F.most + 10, 0.3], [F.jump + 6, 0.9],
      [F.remember - 20, 0.9], [F.remember - 6, 0.2], [F.prompt3, 0.9], [F.tomorrow, 0.9], [F.agent3, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.stop, "fingerUp"], [F.welcome, "wave"], [F.you, "openPalm"], [F.always, "fingerUp"], [F.two, "openPalm"], [F.most, "fingerUp"],
      [F.so2, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent3, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.stop, F.stop + 30], [F.knows, F.knows + 24], [F.expensive, F.expensive + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.you - 6, M], [F.you + 10, S],
    [F.most - 8, S], [F.most + 4, Wd], [F.teach - 6, Wd], [F.teach + 4, S],
    [F.remember - 8, S], [F.remember + 6, Fc], [F.prompt3 - 10, Fc], [F.prompt3, S], [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l012" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L12" line1="STOP" fs1={160} strike="FINE-TUNING" fs2={110} line2="TRY THIS" fs3={136} bubble1="NOT YET!" bubble2="prompt vs RAG vs FT" /></AbsoluteFill>
);
