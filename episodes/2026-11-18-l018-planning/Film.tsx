// Agent School · L18 — "Give an Agent a Huge Task, Watch It Slice It — Planning"   projects/l018/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 18, TITLE = "Huge Task? Watch It Slice It Up";
const W = cueFinder(WORDS);
const F = {
  give: W("give"), huge: W("huge"), slice: W("slice"), welcome: W("welcome"), our: W("our"), think: W("think"), act: W("act"), remember: W("remember"),
  big: W("big"), goals: W("goals"), loops: W("loops"), plan: W("plan"), launch: W("launch"), thats: W("thats"), step: W("step"), fifty: W("fifty"),
  so: W("so"), good: W("good"), plan2: W("plan", 2), small: W("small"), research: W("research"), draft: W("draft"), design: W("design"), schedule: W("schedule"),
  then: W("then"), list: W("list"), one2: W("one", 2), one3: W("one", 3), tick: W("tick"), off: W("off"),
  best: W("best"), replan: W("replan"), step2: W("step", 2), fails: W("fails"), adjusts: W("adjusts"), giving: W("giving"),
  planning: W("planning"), trust: W("trust"), read: W("read"), before: W("before"), approve: W("approve"),
  remember2: W("remember", 2), small2: W("small", 2), plan5: W("plan", 5), check: W("check"), replan2: W("replan", 2),
  tomorrow: W("tomorrow"), agent5: W("agent", 5), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.our - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 18" c={K.blue} dur={10} />
      <Wr f={f} at={F.give} x={480} y={160} fs={52} t="GIVE AN AGENT A…" dur={12} />
      <DCard f={f} at={F.huge - 6} x={110} y={200} w={740} h={260} fill={K.soft} stroke={K.blue} dur={10}>
        <Wr f={f} at={F.huge + 2} x={480} y={365} fs={100} t="HUGE TASK" c={K.blue} dur={12} />
      </DCard>
      {[295, 480, 665].map((x, i) => <DLine key={i} f={f} at={F.slice + i * 5} x1={x} y1={185} x2={x} y2={475} c={K.red} w={10} dur={6} />)}
      <Wr f={f} at={F.slice + 16} x={480} y={550} fs={44} t="…and watch it slice it up" c={K.green} dur={16} />
    </g>
  );
  if (f < F.plan - 6) return ( // THINK ACT REMEMBER — BUT BIG GOALS
    <g>
      <Wr f={f} at={F.our} x={480} y={70} fs={40} t="OUR AGENT CAN…" c={K.grey} dur={12} />
      {[["THINK", F.think], ["ACT", F.act], ["REMEMBER", F.remember]].map(([t, at], i) => (
        <g key={i}>
          <DCard f={f} at={(at as number) - 6} x={40 + i * 300} y={110} w={280} h={130}>
            <Wr f={f} at={at as number} x={180 + i * 300} y={192} fs={40} t={t as string} dur={8} />
          </DCard>
          <DTick f={f} at={(at as number) + 8} x={180 + i * 300} y={300} ok s={0.7} />
        </g>
      ))}
      <Wr f={f} at={F.big} x={480} y={430} fs={50} t="BUT BIG GOALS BREAK" c={K.red} dur={16} />
      <Wr f={f} at={F.loops - 8} x={480} y={510} fs={50} t="SIMPLE LOOPS" c={K.red} dur={12} />
    </g>
  );
  if (f < F.so - 6) return ( // PLAN MY PRODUCT LAUNCH = 50 STEPS
    <g>
      <DCard f={f} at={F.plan - 8} x={100} y={70} w={760} h={140} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.plan} x={480} y={160} fs={50} t={`"Plan my product launch"`} c={K.blue} dur={22} />
      </DCard>
      <Wr f={f} at={F.thats} x={480} y={300} fs={46} t="NOT ONE STEP." dur={14} />
      <DLine f={f} at={F.step + 6} x1={300} y1={285} x2={660} y2={285} c={K.red} w={10} dur={8} />
      <DCard f={f} at={F.fifty - 10} x={280} y={350} w={400} h={200} r={30} fill={K.amber} stroke={K.amber} dur={10}>
        <Wr f={f} at={F.fifty - 2} x={480} y={475} fs={96} t="IT'S 50" dur={12} />
      </DCard>
    </g>
  );
  if (f < F.best - 6) { // PLAN FIRST → SMALL STEPS → TICK OFF
    const steps: [string, number][] = [["research competitors", F.research], ["draft the announcement", F.draft], ["design the visuals", F.design], ["schedule the posts", F.schedule]];
    const ticks = [F.list, F.one2, F.one3, F.tick + 10];
    return (
      <g>
        <Wr f={f} at={F.good} x={480} y={70} fs={46} t="GOOD AGENTS PLAN FIRST" c={K.blue} dur={18} />
        <DCard f={f} at={F.small - 10} x={80} y={110} w={800} h={70} r={35} fill={K.ink} stroke={K.ink} dur={8}>
          <Wr f={f} at={F.small - 2} x={480} y={157} fs={32} t="GOAL → SMALL STEPS" c="#fff" dur={12} />
        </DCard>
        {steps.map(([t, at], i) => (
          <g key={i}>
            <DCard f={f} at={at - 6} x={80} y={198 + i * 88} w={680} h={74}>
              <Wr f={f} at={at} x={110} y={247 + i * 88} fs={36} t={`${i + 1}.  ${t}`} a="start" dur={14} />
            </DCard>
            <DTick f={f} at={ticks[i]} x={830} y={235 + i * 88} ok s={0.7} />
          </g>
        ))}
        <Wr f={f} at={F.then} x={480} y={575} fs={28} t="then work through the list — one by one" c={K.green} dur={20} />
      </g>
    );
  }
  if (f < F.planning - 6) { // RE-PLAN
    const re = f >= F.adjusts;
    return (
      <g>
        <Wr f={f} at={F.best} x={480} y={70} fs={46} t="THE BEST PART: RE-PLAN" c={K.blue} dur={18} />
        <DCard f={f} at={F.step2 - 8} x={60} y={120} w={400} h={110}>
          <Wr f={f} at={F.step2} x={260} y={190} fs={38} t="2. draft" dur={8} />
        </DCard>
        <Wr f={f} at={F.fails} x={260} y={290} fs={44} t="STEP FAILS" c={K.red} dur={10} />
        <DTick f={f} at={F.fails + 6} x={400} y={175} ok={false} s={0.7} />
        <DLine f={f} at={F.adjusts - 6} x1={470} y1={175} x2={540} y2={175} c={K.blue} w={8} head />
        <DCard f={f} at={F.adjusts} x={560} y={120} w={360} h={110} fill={K.soft} stroke={K.green}>
          <Wr f={f} at={F.adjusts + 8} x={740} y={190} fs={36} t="2b. new draft" c={K.green} dur={10} />
        </DCard>
        {re && <Wr f={f} at={F.adjusts + 4} x={740} y={290} fs={40} t="ADJUST PLAN" c={K.green} dur={12} />}
        <DCard f={f} at={F.giving - 10} x={230} y={390} w={500} h={120}>
          <Wr f={f} at={F.giving - 4} x={480} y={468} fs={52} t="GIVE UP" c={K.grey} dur={10} />
        </DCard>
        <DLine f={f} at={F.giving + 8} x1={250} y1={500} x2={710} y2={400} c={K.red} w={12} dur={8} />
      </g>
    );
  }
  if (f < F.remember2 - 6) return ( // PLAN = TRUST
    <g>
      <Wr f={f} at={F.planning} x={480} y={70} fs={44} t="PLANS MAKE AGENTS EASIER" dur={20} />
      <Wr f={f} at={F.trust - 4} x={480} y={130} fs={52} t="TO TRUST" c={K.blue} dur={10} />
      <DCard f={f} at={F.read - 8} x={120} y={170} w={440} h={340}>
        <Wr f={f} at={F.read} x={340} y={225} fs={32} t="THE PLAN" c={K.blue} dur={8} />
        {["1. research", "2. draft", "3. design", "4. schedule"].map((t, i) => <Wr key={i} f={f} at={F.read + 8 + i * 5} x={170} y={290 + i * 55} fs={30} t={t} a="start" dur={6} />)}
      </DCard>
      <Wr f={f} at={F.before} x={760} y={260} fs={30} t="read it before" dur={12} />
      <Wr f={f} at={F.before + 12} x={760} y={305} fs={30} t="anything happens" dur={14} />
      <DCard f={f} at={F.approve - 8} x={610} y={370} w={300} h={90} r={45} fill={K.green} stroke={K.green} dur={8}>
        <Wr f={f} at={F.approve} x={760} y={430} fs={40} t="APPROVE ✓" c="#fff" dur={10} />
      </DCard>
    </g>
  );
  if (f < F.tomorrow - 6) { // REMEMBER: PLAN DO CHECK RE-PLAN
    const loop: [string, number, string][] = [["PLAN", F.plan5, K.blue], ["DO", F.plan5 + 4, K.ink], ["CHECK", F.check, K.green], ["RE-PLAN", F.replan2, K.amber]];
    return (
      <g>
        <Wr f={f} at={F.remember2} x={480} y={70} fs={36} t="REMEMBER" c={K.amber} dur={8} />
        <Wr f={f} at={F.remember2 + 8} x={480} y={160} fs={60} t="BIG TASK → SMALL STEPS" dur={20} />
        {loop.map(([t, at, c], i) => (
          <g key={i}>
            <DCard f={f} at={at - 6} x={30 + i * 235} y={260} w={195} h={120} fill={K.soft} stroke={c}>
              <Wr f={f} at={at} x={127 + i * 235} y={337} fs={i === 3 ? 34 : 40} t={t} c={c} dur={8} />
            </DCard>
            {i < 3 && <DLine f={f} at={at + 4} x1={230 + i * 235} y1={320} x2={260 + i * 235} y2={320} c={K.grey} w={6} dur={4} />}
          </g>
        ))}
        <DLine f={f} at={F.replan2 + 10} x1={830} y1={400} x2={830} y2={470} c={K.amber} w={8} dur={6} />
        <DLine f={f} at={F.replan2 + 16} x1={830} y1={470} x2={127} y2={470} c={K.amber} w={8} dur={10} />
        <DLine f={f} at={F.replan2 + 26} x1={127} y1={470} x2={127} y2={400} c={K.amber} w={8} dur={6} head />
        <Wr f={f} at={F.replan2 + 30} x={480} y={540} fs={30} t="repeat until done" c={K.amber} dur={12} />
      </g>
    );
  }
  return <EndSlide f={f} lesson={LESSON} next="Why the best AI systems are committees" tomorrowAt={F.tomorrow} schoolAt={F.agent5 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.our, 0.9], [F.plan - 8, 0.9], [F.plan, 0.85], [F.so - 6, 0.9],
      [F.planning - 6, 0.9], [F.planning + 4, 0.3], [F.read - 6, 0.9], [F.remember2 - 6, 0.2], [F.remember2 + 10, 0.9], [F.tomorrow, 0.9], [F.agent5, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.our, "openPalm"], [F.fifty - 6, "fingerUp"], [F.so, "openPalm"], [F.best, "fingerUp"], [F.step2, "openPalm"],
      [F.remember2 - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent5, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.huge, F.huge + 30], [F.fifty, F.fifty + 30], [F.fails, F.fails + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.our - 6, M], [F.our + 10, S],
    [F.fifty - 4, S], [F.fifty + 14, M], [F.so - 8, M], [F.so + 4, S], [F.planning - 10, S], [F.planning + 4, Wd], [F.read - 10, Wd], [F.read + 2, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l018" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L18" line1="1 HUGE TASK" strike="ONE GO" line2="50 STEPS" fs1={120} bubble1="SLICED!" bubble2="how agents plan" /></AbsoluteFill>
);
