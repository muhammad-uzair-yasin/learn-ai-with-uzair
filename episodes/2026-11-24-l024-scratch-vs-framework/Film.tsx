// Agent School · L24 — "Build From Scratch or Use a Framework? Here's How to Decide"   projects/l024/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide, CodeCard } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 24, TITLE = "Scratch or Framework? How to Decide";
const W = cueFinder(WORDS);
const F = {
  build: W("build"), scratch: W("scratch"), framework: W("framework"), welcome: W("welcome"), by: W("by"),
  loop: W("loop"), tools: W("tools"), model: W("model"), surprisingly: W("surprisingly"),
  from2: W("from", 2), few: W("few"), see: W("see"), control: W("control"), nothing: W("nothing"), perfect: W("perfect"), simple: W("simple"),
  frameworks: W("frameworks"), readymade: W("readymade"), memory: W("memory"), multiagent: W("multiagent"), tracing: W("tracing"), retries: W("retries"), faster: W("faster"),
  but: W("but"), hide: W("hide"), breaks: W("breaks"), good: W("good"),
  so: W("so"), heres: W("heres"), build2: W("build", 2), learn: W("learn"), reach: W("reach"), need: W("need"), not: W("not"),
  remember: W("remember"), learn2: W("learn", 2), then: W("then"), save: W("save"),
  tomorrow: W("tomorrow"), agent6: W("agent", 6), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.by - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 24" c={K.blue} dur={10} />
      <DCard f={f} at={F.build} x={60} y={130} w={380} h={240} fill={K.soft} stroke={K.blue} dur={12}>
        <Wr f={f} at={F.build + 8} x={250} y={230} fs={56} t="FROM" c={K.blue} dur={8} />
        <Wr f={f} at={F.scratch} x={250} y={310} fs={56} t="SCRATCH" c={K.blue} dur={10} />
      </DCard>
      <Wr f={f} at={F.scratch + 10} x={480} y={275} fs={44} t="or" c={K.grey} dur={6} />
      <DCard f={f} at={F.framework - 12} x={520} y={130} w={380} h={240} dur={12}>
        <Wr f={f} at={F.framework} x={710} y={275} fs={50} t="FRAMEWORK" dur={10} />
      </DCard>
      <Wr f={f} at={F.framework + 12} x={480} y={480} fs={64} t="HOW TO DECIDE" c={K.amber} dur={14} />
    </g>
  );
  if (f < F.from2 - 6) return ( // RECAP: AGENT = LOOP + TOOLS + MODEL
    <g>
      <Wr f={f} at={F.by} x={480} y={80} fs={36} t="you already know an agent is…" c={K.grey} dur={20} />
      {[["LOOP", F.loop], ["TOOLS", F.tools], ["MODEL", F.model]].map(([t, at], i) => (
        <DCard key={i} f={f} at={(at as number) - 6} x={60 + i * 310} y={150} w={220} h={150} fill={K.soft} stroke={K.blue} dur={10}>
          <Wr f={f} at={(at as number) + 2} x={170 + i * 310} y={243} fs={48} t={t as string} c={K.blue} dur={8} />
        </DCard>
      ))}
      <Wr f={f} at={F.tools - 6} x={325} y={243} fs={56} t="+" dur={4} />
      <Wr f={f} at={F.model - 6} x={635} y={243} fs={56} t="+" dur={4} />
      <DLine f={f} at={F.surprisingly - 8} x1={140} y1={360} x2={820} y2={360} c={K.green} w={6} />
      <Wr f={f} at={F.surprisingly} x={480} y={450} fs={48} t="= surprisingly little code" c={K.green} dur={22} />
    </g>
  );
  if (f < F.frameworks - 6) return ( // FROM SCRATCH
    <g>
      <Wr f={f} at={F.from2} x={480} y={70} fs={50} t="FROM SCRATCH" c={K.blue} dur={12} />
      <CodeCard f={f} at={F.few - 10} x={40} y={110} w={420} fs={22} per={6} lines={["while steps < 5:", "  reply = model(msgs)", "  if reply.tool:", "    run(reply.tool)", "  else: break"]} />
      <Wr f={f} at={F.few + 6} x={250} y={385} fs={28} t="a few dozen lines" c={K.grey} dur={14} />
      {[["see every step", F.see], ["control everything", F.control], ["nothing hidden", F.nothing]].map(([t, at], i) => (
        <g key={i}>
          <DTick f={f} at={(at as number) - 4} x={530} y={160 + i * 90} ok s={0.6} />
          <Wr f={f} at={(at as number) + 6} x={575} y={171 + i * 90} fs={30} t={t as string} a="start" dur={12} />
        </g>
      ))}
      <DCard f={f} at={F.perfect - 8} x={80} y={430} w={800} h={120} fill={K.soft} stroke={K.green} dur={10}>
        <Wr f={f} at={F.perfect} x={480} y={502} fs={34} t="perfect for learning + simple agents" c={K.green} dur={26} />
      </DCard>
    </g>
  );
  if (f < F.but - 6) return ( // FRAMEWORKS = READY-MADE PIECES
    <g>
      <Wr f={f} at={F.frameworks} x={480} y={70} fs={42} t="FRAMEWORKS = READY-MADE PIECES" dur={22} />
      <DCard f={f} at={F.readymade} x={80} y={110} w={800} h={330} fill={K.soft} stroke={K.blue} dur={10} />
      {[["memory", F.memory], ["multi-agent teams", F.multiagent], ["tracing", F.tracing], ["retries", F.retries]].map(([t, at], i) => (
        <DCard key={i} f={f} at={(at as number) - 8} x={110 + (i % 2) * 380} y={140 + Math.floor(i / 2) * 150} w={360} h={120} dur={8}>
          <Wr f={f} at={(at as number) - 2} x={290 + (i % 2) * 380} y={212 + Math.floor(i / 2) * 150} fs={32} t={t as string} c={K.blue} dur={10} />
        </DCard>
      ))}
      <DTick f={f} at={F.faster - 4} x={190} y={520} ok s={0.7} />
      <Wr f={f} at={F.faster} x={510} y={535} fs={44} t="faster for big systems" c={K.green} dur={18} />
    </g>
  );
  if (f < F.so - 6) return ( // BUT THEY HIDE THINGS
    <g>
      <Wr f={f} at={F.but} x={480} y={70} fs={50} t="BUT THEY HIDE THINGS" dur={18} />
      <DCard f={f} at={F.hide - 6} x={230} y={110} w={500} h={270} fill={K.ink} stroke={K.ink} dur={10}>
        <Wr f={f} at={F.hide + 4} x={480} y={185} fs={40} t="FRAMEWORK" c="#fff" dur={10} />
        <Wr f={f} at={F.hide + 14} x={480} y={320} fs={96} t="? ? ?" c={K.amber} dur={8} />
      </DCard>
      <DLine f={f} at={F.breaks} x1={420} y1={110} x2={470} y2={200} c={K.red} w={10} dur={5} />
      <DLine f={f} at={F.breaks + 5} x1={470} y1={200} x2={440} y2={280} c={K.red} w={10} dur={5} />
      <DLine f={f} at={F.breaks + 10} x1={440} y1={280} x2={500} y2={380} c={K.red} w={10} dur={5} />
      <Wr f={f} at={F.breaks + 6} x={480} y={450} fs={34} t="something breaks inside…" c={K.red} dur={18} />
      <Wr f={f} at={F.good} x={480} y={545} fs={60} t="good luck." c={K.amber} dur={12} />
    </g>
  );
  if (f < F.remember - 6) return ( // THE RULE
    <g>
      <Wr f={f} at={F.heres} x={480} y={70} fs={46} t="HERE'S THE RULE" c={K.blue} dur={14} />
      <DCard f={f} at={F.build2 - 6} x={60} y={110} w={840} h={170} fill={K.soft} stroke={K.blue} dur={10}>
        <Wr f={f} at={F.build2} x={480} y={185} fs={40} t="1 · FIRST AGENT → FROM SCRATCH" dur={22} />
        <Wr f={f} at={F.learn} x={480} y={245} fs={32} t="to learn the loop" c={K.green} dur={12} />
      </DCard>
      <DCard f={f} at={F.reach - 6} x={60} y={310} w={840} h={230} dur={10}>
        <Wr f={f} at={F.reach} x={480} y={380} fs={38} t="2 · FRAMEWORK → WHEN YOU NEED IT" dur={22} />
        <Wr f={f} at={F.need + 4} x={480} y={432} fs={30} t="…what it actually gives you" c={K.grey} dur={16} />
        <Wr f={f} at={F.not} x={480} y={505} fs={48} t="NOT BEFORE." c={K.red} dur={10} />
      </DCard>
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={90} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.learn2 - 6} x={80} y={140} w={800} h={160}>
        <Wr f={f} at={F.learn2} x={480} y={240} fs={52} t="LEARN THE LOOP BY HAND" dur={18} />
      </DCard>
      <DCard f={f} at={F.then - 6} x={80} y={340} w={800} h={190} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.then} x={480} y={420} fs={46} t="THEN LET A FRAMEWORK" c={K.blue} dur={16} />
        <Wr f={f} at={F.save} x={480} y={485} fs={40} t="save you time" c={K.green} dur={12} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="Your agent passed your test… and failed 100 users" tomorrowAt={F.tomorrow} schoolAt={F.agent6 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.by, 0.9], [F.good - 4, 0.9], [F.good, 0.2], [F.so, 0.9], [F.tomorrow, 0.9], [F.agent6, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.by, "openPalm"], [F.so, "fingerUp"], [F.reach, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent6, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.build, F.build + 30], [F.hide, F.hide + 30], [F.good, F.good + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.by - 6, M], [F.by + 10, S],
    [F.frameworks - 6, S], [F.frameworks + 10, Wd], [F.memory - 10, Wd], [F.memory, S],
    [F.good - 6, S], [F.good + 6, Fc], [F.so - 4, Fc], [F.heres, S], [F.remember - 4, S], [F.remember + 10, Wd], [F.learn2, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l024" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L24" line1="SCRATCH" line2="OR FRAMEWORK?" fs1={170} fs3={100} bubble1="WHICH ONE?!" bubble2="the 1 rule to decide" /></AbsoluteFill>
);
