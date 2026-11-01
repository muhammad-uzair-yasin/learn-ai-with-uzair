// Agent School · L27 — "The 4 Things Every Production Agent Needs — Shipping Safely"   projects/l027/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 27, TITLE = "4 Things Every Production Agent Needs";
const W = cueFinder(WORDS);
const F = {
  the: W("the"), four: W("four"), production: W("production"), needs: W("needs"), welcome: W("welcome"),
  a: W("a"), demo: W("demo"), messy: W("messy"), real: W("real"), cant: W("cant"), heres: W("heres"), checklist: W("checklist"),
  one: W("one"), guardrails: W("guardrails"), least: W("least"), human: W("human"),
  two: W("two"), evals: W("evals"), test: W("test"), before: W("before"),
  three: W("three"), limits: W("limits"), budgets: W("budgets"), timeouts: W("timeouts"), nothing: W("nothing"),
  four2: W("four", 2), observability: W("observability"), logs: W("logs"), thought: W("thought"), tool: W("tool"), result: W("result"),
  something: W("something"), wrong: W("wrong"), see: W("see"), why: W("why"),
  miss: W("miss"), hard: W("hard"), have: W("have"), fix: W("fix"), fast: W("fast"),
  remember: W("remember"), guardrails2: W("guardrails", 2), evals2: W("evals", 2), limits3: W("limits", 3), logs2: W("logs", 2),
  tomorrow: W("tomorrow"), agent4: W("agent", 4), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const Scribble: React.FC<{ f: number; at: number; x: number; y: number }> = ({ f, at, x, y }) => {
  const pts = [[0, 0], [60, -40], [20, 30], [110, -20], [70, 40], [160, 0], [120, 50], [200, 10]];
  return <g>{pts.slice(1).map((p, i) => <DLine key={i} f={f} at={at + i * 3} x1={x + pts[i][0]} y1={y + pts[i][1]} x2={x + p[0]} y2={y + p[1]} c={K.grey} w={6} dur={3} />)}</g>;
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.a - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 27" c={K.blue} dur={10} />
      <Wr f={f} at={F.the} x={250} y={330} fs={260} t="4" c={K.blue} dur={10} />
      <Wr f={f} at={F.four + 6} x={420} y={200} fs={44} t="THINGS EVERY" a="start" dur={12} />
      <Wr f={f} at={F.production} x={420} y={270} fs={44} t="PRODUCTION" a="start" c={K.amber} dur={12} />
      <Wr f={f} at={F.needs - 8} x={420} y={340} fs={44} t="AGENT NEEDS" a="start" dur={12} />
      {[0, 1, 2, 3].map(i => <DCard key={i} f={f} at={F.needs + 4 + i * 4} x={170 + i * 165} y={420} w={130} h={110} r={18} stroke={K.blue} dur={6}>
        <Wr f={f} at={F.needs + 10 + i * 4} x={235 + i * 165} y={495} fs={56} t="?" c={K.blue} dur={4} />
      </DCard>)}
    </g>
  );
  if (f < F.one - 6) return ( // DEMO vs PRODUCT
    <g>
      <DCard f={f} at={F.a} x={60} y={60} w={400} h={360} dur={10}>
        <Wr f={f} at={F.demo} x={260} y={140} fs={52} t="DEMO" dur={8} />
        <Scribble f={f} at={F.messy - 6} x={160} y={250} />
        <Wr f={f} at={F.messy} x={260} y={380} fs={34} t="can be messy" c={K.grey} dur={10} />
      </DCard>
      <DCard f={f} at={F.real - 6} x={500} y={60} w={400} h={360} fill={K.soft} stroke={K.blue} dur={10}>
        <Wr f={f} at={F.real} x={700} y={140} fs={44} t="REAL PRODUCT" c={K.blue} dur={10} />
        <Wr f={f} at={F.cant} x={700} y={290} fs={60} t="can't" c={K.red} dur={8} />
      </DCard>
      <Wr f={f} at={F.heres} x={480} y={520} fs={50} t="HERE'S THE CHECKLIST ↓" c={K.amber} dur={18} />
    </g>
  );
  if (f < F.four2 - 6) { // CHECKLIST 1-3
    const R: [string, string, number, number][] = [["GUARDRAILS", "least access · human approval for risky actions", F.one, F.least], ["EVALS", "a test set you run before every change", F.two, F.test], ["LIMITS", "step limits · budgets · timeouts", F.three, F.budgets]];
    return (
      <g>
        <Wr f={f} at={F.one - 4} x={480} y={62} fs={34} t="PRODUCTION CHECKLIST" c={K.grey} dur={12} />
        {R.map(([t, d, at, at2], i) => { const y = 95 + i * 125; return (
          <DCard key={i} f={f} at={at - 6} x={40} y={y} w={880} h={110} fill={K.soft} stroke={K.blue} dur={8}>
            <DTick f={f} at={at + 4} x={100} y={y + 55} ok s={0.7} />
            <Wr f={f} at={at + 2} x={160} y={y + 50} fs={40} t={`${i + 1} · ${t}`} a="start" dur={10} />
            <Wr f={f} at={at2} x={160} y={y + 92} fs={26} t={d} c={K.grey} a="start" dur={22} />
          </DCard>); })}
        <DCard f={f} at={F.nothing - 6} x={40} y={470} w={880} h={110} r={22} stroke="#C9D6EA" dur={8}>
          <Wr f={f} at={F.nothing} x={480} y={538} fs={36} t="…so nothing runs away" c={K.green} dur={14} />
        </DCard>
      </g>
    );
  }
  if (f < F.miss - 6) return ( // OBSERVABILITY
    <g>
      <DTick f={f} at={F.four2 + 4} x={90} y={70} ok s={0.6} />
      <Wr f={f} at={F.four2} x={140} y={86} fs={44} t="4 · OBSERVABILITY" a="start" dur={14} />
      <DCard f={f} at={F.logs - 8} x={60} y={130} w={840} h={300} fill="#0F1726" stroke="#0F1726" dur={10}>
        <Wr f={f} at={F.logs} x={90} y={170} fs={26} t="LOGS" c="#8B949E" a="start" dur={6} />
      </DCard>
      {[["[thought]", "what do I do next?", F.thought, "#E6EDF3"], ["[tool call]", "tool(args)", F.tool, "#E6EDF3"], ["[result]", "the output", F.result, "#E6EDF3"], ["[error]", "something went wrong", F.wrong - 6, "#FF7B72"]].map(([a, b, at, c], i) => (
        <g key={i}>
          <Wr f={f} at={at as number} x={90} y={225 + i * 52} fs={28} t={a as string} c={i === 3 ? "#FF7B72" : "#7EE787"} a="start" dur={6} />
          <Wr f={f} at={(at as number) + 6} x={300} y={225 + i * 52} fs={28} t={b as string} c={c as string} a="start" dur={10} />
        </g>
      ))}
      <Wr f={f} at={F.see - 4} x={480} y={500} fs={44} t="→ see EXACTLY why" c={K.blue} dur={16} />
    </g>
  );
  if (f < F.remember - 6) return ( // MISS ONE vs ALL FOUR
    <g>
      <DCard f={f} at={F.miss - 4} x={60} y={70} w={400} h={420} fill="#FFF1F0" stroke={K.red} dur={10}>
        <Wr f={f} at={F.miss + 4} x={260} y={150} fs={44} t="MISS ONE" c={K.red} dur={10} />
        {[0, 1, 2].map(i => <DTick key={i} f={f} at={F.miss + 10 + i * 4} x={150 + i * 75} y={250} ok s={0.5} />)}
        <DTick f={f} at={F.miss + 22} x={375} y={250} ok={false} s={0.5} />
        <Wr f={f} at={F.hard - 6} x={260} y={390} fs={32} t="the hard way" c={K.red} dur={10} />
      </DCard>
      <DCard f={f} at={F.have - 6} x={500} y={70} w={400} h={420} fill={K.soft} stroke={K.green} dur={10}>
        <Wr f={f} at={F.have + 2} x={700} y={150} fs={44} t="ALL FOUR" c={K.green} dur={10} />
        {[0, 1, 2, 3].map(i => <DTick key={i} f={f} at={F.have + 10 + i * 4} x={590 + i * 75} y={250} ok s={0.5} />)}
        <Wr f={f} at={F.fix} x={700} y={390} fs={32} t="fix anything fast" c={K.green} dur={12} />
      </DCard>
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={90} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      {[["GUARDRAILS", F.guardrails2, K.blue], ["EVALS", F.evals2, K.green], ["LIMITS", F.limits3, K.amber], ["LOGS", F.logs2, K.violet]].map(([t, at, c], i) => (
        <DCard key={i} f={f} at={(at as number) - 6} x={60 + (i % 2) * 430} y={140 + Math.floor(i / 2) * 210} w={410} h={180} stroke={c as string} dur={6}>
          <Wr f={f} at={(at as number)} x={265 + (i % 2) * 430} y={250 + Math.floor(i / 2) * 210} fs={50} t={t as string} c={c as string} dur={8} />
        </DCard>
      ))}
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="An entire AI agent in one picture" tomorrowAt={F.tomorrow} schoolAt={F.agent4 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.a, 0.9], [F.miss - 6, 0.9], [F.miss, 0.3], [F.miss + 20, 0.9],
      [F.remember - 6, 0.9], [F.remember, 0.2], [F.guardrails2 - 4, 0.9], [F.tomorrow, 0.9], [F.agent4, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.a, "openPalm"], [F.one, "fingerUp"], [F.least, "openPalm"], [F.two, "fingerUp"], [F.test, "openPalm"],
      [F.three, "fingerUp"], [F.budgets, "openPalm"], [F.four2, "fingerUp"], [F.logs, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent4, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.cant, F.cant + 30], [F.wrong, F.wrong + 30], [F.hard, F.hard + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.a - 6, M], [F.a + 10, S],
    [F.one - 8, S], [F.one + 4, Wd], [F.three - 6, Wd], [F.three + 6, S],
    [F.miss - 6, S], [F.miss + 6, Wd], [F.remember - 4, Wd], [F.guardrails2 - 4, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l027" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L27" line1="DEMO" strike="READY" line2="NEEDS 4" fs1={170} fs2={170} fs3={150} bubble1="MISS ONE?" bubble2="find out the hard way" /></AbsoluteFill>
);
