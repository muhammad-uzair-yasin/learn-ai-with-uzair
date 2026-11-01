// Agent School · L19 — "The Best AI Systems Are Committees — Multi-Agent Teams"   projects/l019/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 19, TITLE = "The Best AI Systems Are Committees";
const W = cueFinder(WORDS);
const F = {
  best: W("best"), committees: W("committees"), welcome: W("welcome"), yesterday: W("yesterday"), planned: W("planned"), today: W("today"), specialist: W("specialist"),
  multiagent: W("multiagent"), manager: W("manager"), splits: W("splits"), hands: W("hands"), researcher: W("researcher"), writer: W("writer"), reviewer: W("reviewer"),
  each3: W("each", 3), focused: W("focused"), only: W("only"), tools: W("tools"), smaller: W("smaller"), fewer: W("fewer"),
  researcher2: W("researcher", 2), finds: W("finds"), writer2: W("writer", 2), drafts: W("drafts"), reviewer2: W("reviewer", 2), checks: W("checks"), sends: W("sends"), back: W("back"), wrong: W("wrong"),
  just: W("just"), team: W("team"), minus: W("minus"), coffee: W("coffee"), but: W("but"), cost: W("cost"), coordinate: W("coordinate"), use: W("use"), truly: W("truly"),
  remember: W("remember"), manager2: W("manager", 2), specialists: W("specialists"), someone: W("someone"),
  tomorrow: W("tomorrow"), agent6: W("agent", 6), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

/** small round "agent" face drawn by the pen */
const Bot: React.FC<{ f: number; at: number; x: number; y: number; c: string; s?: number }> = ({ f, at, x, y, c, s = 1 }) => (
  <g>
    <DCard f={f} at={at} x={x - 40 * s} y={y - 40 * s} w={80 * s} h={80 * s} r={40 * s} fill={c} stroke={c} dur={8} />
    {f >= at + 8 && <g><circle cx={x - 14 * s} cy={y - 4 * s} r={7 * s} fill="#fff" /><circle cx={x + 14 * s} cy={y - 4 * s} r={7 * s} fill="#fff" /><path d={`M${x - 14 * s} ${y + 16 * s} Q${x} ${y + 26 * s} ${x + 14 * s} ${y + 16 * s}`} stroke="#fff" strokeWidth={4 * s} fill="none" strokeLinecap="round" /></g>}
  </g>
);

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.yesterday - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 19" c={K.blue} dur={10} />
      <Wr f={f} at={F.best - 4} x={480} y={190} fs={72} t="THE BEST AI SYSTEMS" dur={16} />
      <Wr f={f} at={F.best + 14} x={480} y={280} fs={60} t="are…" c={K.grey} dur={6} />
      <DCard f={f} at={F.committees - 6} x={170} y={320} w={620} h={120} r={60} fill={K.blue} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.committees} x={480} y={402} fs={70} t="COMMITTEES" c="#fff" dur={12} />
      </DCard>
      {[K.green, K.amber, K.violet].map((c, i) => <Bot key={i} f={f} at={F.committees + 10 + i * 4} x={340 + i * 140} y={520} c={c} s={0.8} />)}
    </g>
  );
  if (f < F.multiagent - 6) return ( // YESTERDAY / TODAY
    <g>
      <DCard f={f} at={F.yesterday - 4} x={40} y={60} w={420} h={480}>
        <Wr f={f} at={F.yesterday} x={250} y={120} fs={30} t="YESTERDAY" c={K.grey} dur={10} />
        <Bot f={f} at={F.yesterday + 10} x={250} y={200} c={K.blue} />
        <Wr f={f} at={F.planned - 4} x={250} y={290} fs={28} t="1 agent plans" dur={10} />
        {["1. research", "2. write", "3. check"].map((t, i) => <Wr key={i} f={f} at={F.planned + 8 + i * 5} x={130} y={360 + i * 55} fs={30} t={t} a="start" dur={6} />)}
      </DCard>
      <DCard f={f} at={F.today - 6} x={500} y={60} w={420} h={480} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.today} x={710} y={120} fs={30} t="TODAY" c={K.blue} dur={8} />
        <Wr f={f} at={F.today + 10} x={710} y={180} fs={28} t="each step gets its own…" dur={16} />
        {[K.green, K.amber, K.violet].map((c, i) => <Bot key={i} f={f} at={F.specialist - 4 + i * 4} x={600 + i * 110} y={290} c={c} s={0.8} />)}
        <Wr f={f} at={F.specialist} x={710} y={420} fs={44} t="SPECIALIST" c={K.blue} dur={12} />
      </DCard>
    </g>
  );
  if (f < F.each3 - 6) { // MANAGER SPLITS → SPECIALISTS
    const sp: [string, number, string][] = [["RESEARCHER", F.researcher, K.green], ["WRITER", F.writer, K.amber], ["REVIEWER", F.reviewer, K.violet]];
    return (
      <g>
        <Wr f={f} at={F.multiagent - 4} x={480} y={60} fs={40} t="MULTI-AGENT SYSTEM" c={K.blue} dur={14} />
        <DCard f={f} at={F.manager - 6} x={300} y={90} w={360} h={110} fill={K.ink} stroke={K.ink}>
          <Wr f={f} at={F.manager} x={480} y={160} fs={40} t="MANAGER" c="#fff" dur={10} />
        </DCard>
        <Wr f={f} at={F.splits} x={480} y={250} fs={28} t="splits the work, hands out pieces" c={K.grey} dur={20} />
        {sp.map(([t, at, c], i) => (
          <g key={i}>
            <DLine f={f} at={F.hands + i * 4} x1={480} y1={270} x2={170 + i * 310} y2={330} c={K.grey} w={6} head />
            <DCard f={f} at={at - 6} x={30 + i * 310} y={345} w={280} h={200} fill={K.soft} stroke={c}>
              <Bot f={f} at={at - 2} x={170 + i * 310} y={410} c={c} s={0.7} />
              <Wr f={f} at={at + 2} x={170 + i * 310} y={505} fs={34} t={t} c={c} dur={10} />
            </DCard>
          </g>
        ))}
      </g>
    );
  }
  if (f < F.researcher2 - 6) return ( // FOCUSED SPECIALISTS
    <g>
      <Wr f={f} at={F.each3} x={480} y={70} fs={44} t="EACH SPECIALIST GETS" dur={16} />
      <DCard f={f} at={F.focused - 6} x={60} y={110} w={400} h={180}>
        <Wr f={f} at={F.focused} x={260} y={185} fs={34} t="focused" c={K.blue} dur={8} />
        <Wr f={f} at={F.focused + 8} x={260} y={240} fs={34} t="instructions" c={K.blue} dur={10} />
      </DCard>
      <DCard f={f} at={F.only - 6} x={500} y={110} w={400} h={180}>
        <Wr f={f} at={F.only} x={700} y={185} fs={34} t="only the tools" c={K.blue} dur={10} />
        <Wr f={f} at={F.tools + 4} x={700} y={240} fs={34} t="it needs" c={K.blue} dur={8} />
      </DCard>
      <Wr f={f} at={F.smaller} x={480} y={390} fs={56} t="SMALLER JOBS" dur={12} />
      <DLine f={f} at={F.fewer - 10} x1={480} y1={410} x2={480} y2={460} c={K.grey} w={6} head dur={6} />
      <Wr f={f} at={F.fewer} x={480} y={540} fs={56} t="FEWER MISTAKES" c={K.green} dur={12} />
    </g>
  );
  if (f < F.just - 6) { // PIPELINE WITH REVIEW
    const row: [string, string, number, number, string][] = [["RESEARCHER", "finds facts", F.researcher2, F.finds, K.green], ["WRITER", "drafts", F.writer2, F.drafts, K.amber], ["REVIEWER", "checks", F.reviewer2, F.checks, K.violet]];
    return (
      <g>
        {row.map(([t, d, at, at2, c], i) => (
          <g key={i}>
            <DCard f={f} at={at - 6} x={30 + i * 315} y={110} w={270} h={220} fill={K.soft} stroke={c}>
              <Bot f={f} at={at - 2} x={165 + i * 315} y={180} c={c} s={0.7} />
              <Wr f={f} at={at + 2} x={165 + i * 315} y={265} fs={32} t={t} c={c} dur={10} />
              <Wr f={f} at={at2} x={165 + i * 315} y={310} fs={28} t={d} dur={8} />
            </DCard>
            {i < 2 && <DLine f={f} at={row[i + 1][2] - 8} x1={302 + i * 315} y1={220} x2={343 + i * 315} y2={220} c={K.grey} w={6} head dur={5} />}
          </g>
        ))}
        <DLine f={f} at={F.sends} x1={795} y1={340} x2={795} y2={420} c={K.red} w={8} dur={6} />
        <DLine f={f} at={F.sends + 6} x1={795} y1={420} x2={480} y2={420} c={K.red} w={8} dur={8} />
        <DLine f={f} at={F.sends + 14} x1={480} y1={420} x2={480} y2={345} c={K.red} w={8} head dur={6} />
        <Wr f={f} at={F.back} x={480} y={490} fs={34} t="sends it back if it's wrong" c={K.red} dur={18} />
        <DTick f={f} at={F.wrong} x={820} y={540} ok={false} s={0.6} />
        <Wr f={f} at={F.researcher2 - 6} x={480} y={70} fs={36} t="HOW THE TEAM WORKS" c={K.grey} dur={12} />
      </g>
    );
  }
  if (f < F.but - 6) return ( // JUST LIKE A TEAM
    <g>
      <Wr f={f} at={F.just} x={480} y={150} fs={64} t="JUST LIKE A REAL TEAM" c={K.blue} dur={16} />
      <DCard f={f} at={F.minus - 6} x={300} y={230} w={360} h={250}>
        <Wr f={f} at={F.coffee - 4} x={480} y={330} fs={46} t="COFFEE" dur={10} />
        <Wr f={f} at={F.coffee + 6} x={480} y={400} fs={46} t="BREAKS" dur={10} />
      </DCard>
      <Wr f={f} at={F.minus} x={480} y={550} fs={32} t="minus…" c={K.grey} dur={6} />
      <DLine f={f} at={F.coffee + 14} x1={300} y1={480} x2={660} y2={230} c={K.red} w={12} dur={8} />
    </g>
  );
  if (f < F.remember - 6) return ( // COST
    <g>
      <Wr f={f} at={F.but} x={480} y={70} fs={44} t="BUT MORE AGENTS =" c={K.red} dur={14} />
      <Wr f={f} at={F.cost - 6} x={60} y={170} fs={34} t="more cost" a="start" dur={10} />
      <DBar f={f} at={F.cost} x={340} y={145} w={560} h={36} c={K.red} />
      <Wr f={f} at={F.coordinate - 10} x={60} y={250} fs={34} t="coordination" a="start" dur={10} />
      <DBar f={f} at={F.coordinate} x={340} y={225} w={480} h={36} c={K.amber} />
      <DCard f={f} at={F.use - 6} x={60} y={320} w={840} h={220} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.use} x={480} y={400} fs={40} t="use a team ONLY when" c={K.blue} dur={16} />
        <Wr f={f} at={F.truly - 6} x={480} y={475} fs={40} t="one agent truly struggles" c={K.blue} dur={16} />
      </DCard>
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={70} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.manager2 - 10} x={60} y={110} w={840} h={120} fill={K.ink} stroke={K.ink}>
        <Wr f={f} at={F.manager2 - 4} x={480} y={190} fs={50} t="ONE MANAGER" c="#fff" dur={12} />
      </DCard>
      <DCard f={f} at={F.specialists - 8} x={60} y={260} w={840} h={120} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.specialists - 2} x={480} y={340} fs={50} t="MANY SPECIALISTS" c={K.blue} dur={14} />
      </DCard>
      <DCard f={f} at={F.someone - 8} x={60} y={410} w={840} h={120} fill="#fff" stroke={K.green}>
        <Wr f={f} at={F.someone} x={440} y={490} fs={44} t="SOMEONE WHO CHECKS" c={K.green} dur={16} />
        <DTick f={f} at={F.someone + 18} x={840} y={470} ok s={0.6} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="An agent switched off its own alarms. Real story." tomorrowAt={F.tomorrow} schoolAt={F.agent6 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.yesterday, 0.9], [F.just - 6, 0.9], [F.just + 10, 0.3], [F.but - 4, 0.9],
      [F.truly + 12, 0.9], [F.truly + 20, 0.2], [F.remember + 4, 0.9], [F.tomorrow, 0.9], [F.agent6, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.yesterday, "openPalm"], [F.smaller, "fingerUp"], [F.researcher2, "openPalm"], [F.just, "openPalm"], [F.but, "fingerUp"],
      [F.use + 30, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent6, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.committees, F.committees + 30], [F.wrong, F.wrong + 30], [F.coffee, F.coffee + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.yesterday - 6, M], [F.yesterday + 10, S],
    [F.just - 10, S], [F.just + 14, Wd], [F.but - 8, Wd], [F.but + 4, S], [F.truly + 12, S], [F.truly + 24, Fc], [F.remember - 4, Fc], [F.remember + 6, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l019" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L19" line1="ONE AGENT" strike="ALONE" line2="A TEAM!" bubble1="TEAM UP!" bubble2="multi-agent teams" /></AbsoluteFill>
);
