// Agent School · L28 — "An Entire AI Agent in One Picture — Full Architecture"   projects/l028/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
// One diagram is drawn progressively: model → system prompt → loop → tools/MCP → memory → RAG → guardrails wrapper → logs/evals.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 28, TITLE = "An Entire AI Agent in One Picture";
const W = cueFinder(WORDS);
const F = {
  an: W("an"), entire: W("entire"), one: W("one"), picture: W("picture"), welcome: W("welcome"),
  everything: W("everything"), month: W("month"), fits: W("fits"), together: W("together"), lets: W("lets"), draw: W("draw"),
  in2: W("in", 2), middle: W("middle"), model: W("model"), brain: W("brain"), predicts: W("predicts"),
  around: W("around"), system: W("system"), job: W("job"),
  loop: W("loop"), think: W("think"), act: W("act"), observe: W("observe"), repeat: W("repeat"),
  plugged: W("plugged"), tools: W("tools"), mcp: W("mcp"),
  next: W("next"), memory: W("memory"), shortterm: W("shortterm"), longterm: W("longterm"), rag: W("rag"), knowledge: W("knowledge"),
  wrapped: W("wrapped"), guardrails: W("guardrails"), step: W("step"), budgets: W("budgets"),
  underneath: W("underneath"), logs: W("logs"), evals: W("evals"), watching: W("watching"),
  thats: W("thats"), thats2: W("thats", 2), every2: W("every", 2), version: W("version"),
  remember: W("remember"), model2: W("model", 2), prompt2: W("prompt", 2), loop2: W("loop", 2), tools2: W("tools", 2), memory2: W("memory", 2), knowledge2: W("knowledge", 2),
  all: W("all"), guardrails2: W("guardrails", 2),
  tomorrow: W("tomorrow"), agent5: W("agent", 5), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

/** The one picture. Every part appears when the voice names it; during "remember" each part gets a tick. */
const Architecture: React.FC<{ f: number }> = ({ f }) => {
  const rem = f >= F.remember - 6;
  const glow = f >= F.guardrails2 ? 0.5 + 0.5 * Math.sin(f * 0.3) : 0;
  return (
    <g>
      {/* guardrails wrapper (pen draws 4 sides) */}
      <DLine f={f} at={F.wrapped} x1={30} y1={66} x2={930} y2={66} c={K.red} w={6} dur={8} />
      <DLine f={f} at={F.wrapped + 8} x1={930} y1={66} x2={930} y2={488} c={K.red} w={6} dur={6} />
      <DLine f={f} at={F.wrapped + 14} x1={930} y1={488} x2={30} y2={488} c={K.red} w={6} dur={8} />
      <DLine f={f} at={F.wrapped + 22} x1={30} y1={488} x2={30} y2={66} c={K.red} w={6} dur={6} />
      {glow > 0 && <rect x={30} y={66} width={900} height={422} rx={4} fill="none" stroke={K.red} strokeWidth={6 + glow * 8} opacity={0.35} />}
      <Wr f={f} at={F.guardrails} x={40} y={54} fs={26} t="GUARDRAILS · step limits · budgets" c={K.red} a="start" dur={26} />

      {/* system prompt */}
      <DCard f={f} at={F.system - 8} x={330} y={84} w={300} h={96} fill="#FFF8EC" stroke={K.amber} dur={8}>
        <Wr f={f} at={F.system} x={480} y={122} fs={28} t="SYSTEM PROMPT" c={K.amber} dur={10} />
        <Wr f={f} at={F.job} x={480} y={162} fs={26} t="job description" c={K.grey} dur={10} />
      </DCard>
      <DLine f={f} at={F.job + 10} x1={480} y1={182} x2={480} y2={204} c={K.amber} w={6} dur={4} />

      {/* model (centre) */}
      <DCard f={f} at={F.middle} x={380} y={206} w={200} h={136} r={68} fill={K.soft} stroke={K.blue} dur={10}>
        <Wr f={f} at={F.model} x={480} y={270} fs={40} t="MODEL" c={K.blue} dur={8} />
        <Wr f={f} at={F.brain + 2} x={480} y={314} fs={26} t="predicts" c={K.grey} dur={8} />
      </DCard>

      {/* loop */}
      <DCard f={f} at={F.loop - 6} x={300} y={352} w={360} h={124} fill="#F4F0FF" stroke={K.violet} dur={8}>
        <Wr f={f} at={F.loop} x={480} y={384} fs={26} t="THE LOOP ↻" c={K.violet} dur={8} />
        <Wr f={f} at={F.think} x={480} y={422} fs={28} t="think → act →" dur={12} />
        <Wr f={f} at={F.observe} x={480} y={460} fs={28} t="observe → repeat" dur={14} />
      </DCard>

      {/* tools via MCP (left) */}
      <DCard f={f} at={F.plugged} x={55} y={96} w={240} h={200} fill="#ECFAF3" stroke={K.green} dur={8}>
        <Wr f={f} at={F.tools - 2} x={175} y={160} fs={38} t="TOOLS" c={K.green} dur={8} />
        {[0, 1, 2].map(i => <rect key={i} x={95 + i * 56} y={180} width={42} height={42} rx={10} fill={K.green} opacity={f >= F.tools + 6 + i * 3 ? 0.85 : 0} />)}
        <Wr f={f} at={F.mcp - 4} x={175} y={270} fs={28} t="via MCP" c={K.ink} dur={8} />
      </DCard>
      <DLine f={f} at={F.plugged + 4} x1={295} y1={200} x2={378} y2={262} c={K.green} w={6} dur={6} />

      {/* memory (right top) */}
      <DCard f={f} at={F.next} x={660} y={96} w={250} h={186} fill="#FFF8EC" stroke={K.amber} dur={8}>
        <Wr f={f} at={F.memory - 2} x={785} y={150} fs={36} t="MEMORY" c={K.amber} dur={8} />
        <Wr f={f} at={F.shortterm} x={785} y={204} fs={26} t="short: context" dur={10} />
        <Wr f={f} at={F.longterm} x={785} y={250} fs={26} t="long: database" dur={10} />
      </DCard>
      <DLine f={f} at={F.next + 6} x1={660} y1={200} x2={582} y2={258} c={K.amber} w={6} dur={6} />

      {/* RAG (right bottom) */}
      <DCard f={f} at={F.rag - 6} x={680} y={300} w={230} h={140} fill="#E9F8FB" stroke={K.cyan} dur={8}>
        <Wr f={f} at={F.rag} x={795} y={352} fs={36} t="RAG" c={K.cyan} dur={6} />
        <Wr f={f} at={F.knowledge - 4} x={795} y={404} fs={26} t="your knowledge" dur={10} />
      </DCard>
      <DLine f={f} at={F.rag + 4} x1={680} y1={360} x2={582} y2={316} c={K.cyan} w={6} dur={6} />

      {/* logs + evals underneath */}
      <DCard f={f} at={F.underneath} x={30} y={502} w={900} h={86} fill={K.ink} stroke={K.ink} dur={10}>
        <Wr f={f} at={F.logs} x={480} y={556} fs={30} t="LOGS + EVALS · watching every move" c="#fff" dur={22} />
      </DCard>

      {/* remember ticks */}
      {rem && <>
        <DTick f={f} at={F.model2} x={566} y={222} ok s={0.42} />
        <DTick f={f} at={F.prompt2} x={648} y={104} ok s={0.42} />
        <DTick f={f} at={F.loop2} x={646} y={368} ok s={0.42} />
        <DTick f={f} at={F.tools2} x={280} y={112} ok s={0.42} />
        <DTick f={f} at={F.memory2} x={895} y={112} ok s={0.42} />
        <DTick f={f} at={F.knowledge2} x={895} y={316} ok s={0.42} />
      </>}
    </g>
  );
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.everything - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 28" c={K.blue} dur={10} />
      <Wr f={f} at={F.an} x={480} y={170} fs={64} t="AN ENTIRE AI AGENT" dur={16} />
      <DCard f={f} at={F.one - 10} x={180} y={220} w={600} h={320} r={10} fill="#FFF8EC" stroke={K.amber} dur={12}>
        <rect x={200} y={240} width={560} height={280} rx={6} fill="none" stroke={K.amber} strokeWidth={3} strokeDasharray="10 8" />
        <Wr f={f} at={F.one} x={480} y={400} fs={64} t="in ONE picture" c={K.blue} dur={14} />
      </DCard>
    </g>
  );
  if (f < F.in2 - 6) return ( // EVERYTHING FITS TOGETHER
    <g>
      <Wr f={f} at={F.everything} x={480} y={90} fs={36} t="everything you learned this month…" c={K.grey} dur={20} />
      {["predict", "prompts", "RAG", "loop", "tools", "MCP", "memory", "guardrails", "evals"].map((t, i) => {
        const x = 160 + (i % 3) * 320, y = 160 + Math.floor(i / 3) * 90;
        return <DCard key={i} f={f} at={F.month + i * 3} x={x - 130} y={y} w={260} h={70} r={35} fill={K.soft} stroke={K.blue} dur={6}>
          <Wr f={f} at={F.month + 4 + i * 3} x={x} y={y + 47} fs={30} t={t} c={K.blue} dur={6} />
        </DCard>;
      })}
      <Wr f={f} at={F.fits} x={480} y={490} fs={50} t="…FITS TOGETHER" c={K.green} dur={14} />
      <Wr f={f} at={F.lets} x={480} y={565} fs={36} t="let's draw it ✎" c={K.amber} dur={12} />
    </g>
  );
  if (f < F.tomorrow - 6) return <Architecture f={f} />; // THE ONE PICTURE (incl. "that's an agent" + remember ticks)
  return <EndSlide f={f} lesson={LESSON} next="We stop drawing — we build a real agent" tomorrowAt={F.tomorrow} schoolAt={F.agent5 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.everything, 0.9], [F.thats - 4, 0.9], [F.thats, 0.2], [F.version, 0.2], [F.version + 10, 0.9],
      [F.remember - 6, 0.9], [F.remember, 0.3], [F.model2 - 4, 0.9], [F.tomorrow, 0.9], [F.agent5, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.everything, "openPalm"], [F.middle, "fingerUp"], [F.model + 20, "openPalm"], [F.wrapped, "fingerUp"], [F.underneath, "openPalm"],
      [F.thats, "fingerUp"], [F.every2, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent5, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.entire, F.entire + 40], [F.thats2, F.thats2 + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.everything - 6, M], [F.everything + 10, S],
    [F.watching + 20, S], [F.thats, Wd], [F.thats2, Fc], [F.every2 - 4, Fc], [F.every2 + 10, Wd], [F.remember - 4, Wd], [F.model2 - 6, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l028" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L28" line1="AN AGENT" line2="IN 1 PICTURE" fs1={160} fs3={112} bubble1="THAT'S IT?!" bubble2="the whole agent" /></AbsoluteFill>
);
