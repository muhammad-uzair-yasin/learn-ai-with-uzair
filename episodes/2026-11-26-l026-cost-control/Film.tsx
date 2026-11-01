// Agent School · L26 — "An Agent Loop Can Empty Your Wallet Overnight — Cost Control"   projects/l026/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 26, TITLE = "Cost Control: Don't Empty Your Wallet";
const W = cueFinder(WORDS);
const F = {
  an: W("an"), loop: W("loop"), empty: W("empty"), wallet: W("wallet"), overnight: W("overnight"), welcome: W("welcome"),
  lesson2: W("lesson", 2), every: W("every"), costs: W("costs"), tokens: W("tokens"), picture: W("picture"), never: W("never"), stops: W("stops"),
  a2: W("a", 2), failing: W("failing"), retrying: W("retrying"), each: W("each"), whole: W("whole"), growing: W("growing"), thousands: W("thousands"), sleep: W("sleep"),
  four: W("four"), guards: W("guards"), one: W("one"), maximum: W("maximum"), two: W("two"), budget: W("budget"), day: W("day"), three: W("three"), smaller: W("smaller"), simple: W("simple"),
  four2: W("four", 2), caching: W("caching"), twice: W("twice"),
  and2: W("and", 2), billing: W("billing"), spending: W("spending"), jumps: W("jumps"), hear: W("hear"), bill: W("bill"),
  most: W("most"), bugs: W("bugs"), not: W("not"), busy: W("busy"),
  remember: W("remember"), every2: W("every", 2), step: W("step"), budget2: W("budget", 2),
  tomorrow: W("tomorrow"), agent5: W("agent", 5), lesson3: W("lesson", 3), subscribe: W("subscribe"),
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.lesson2 - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 26" c={K.blue} dur={10} />
      <DCard f={f} at={F.an} x={60} y={120} w={340} h={240} fill={K.soft} stroke={K.blue} dur={10}>
        <Wr f={f} at={F.an + 6} x={230} y={200} fs={40} t="AGENT LOOP" c={K.blue} dur={10} />
        <Wr f={f} at={F.loop + 4} x={230} y={310} fs={90} t="↻" c={K.blue} dur={6} />
      </DCard>
      <DLine f={f} at={F.empty - 6} x1={420} y1={240} x2={530} y2={240} c={K.ink} w={8} head dur={6} />
      <DCard f={f} at={F.empty} x={550} y={120} w={350} h={240} fill="#FFF1F0" stroke={K.red} dur={8}>
        <Wr f={f} at={F.wallet - 4} x={725} y={200} fs={44} t="WALLET" dur={8} />
        <Wr f={f} at={F.wallet + 6} x={725} y={300} fs={64} t="$0" c={K.red} dur={6} />
      </DCard>
      <Wr f={f} at={F.overnight} x={480} y={480} fs={72} t="…OVERNIGHT" c={K.ink} dur={14} />
    </g>
  );
  if (f < F.a2 - 6) { // RECAP: EVERY CALL COSTS + LOOP THAT NEVER STOPS
    return (
      <g>
        <Wr f={f} at={F.lesson2} x={480} y={70} fs={30} t="lesson 23: every call costs tokens" c={K.grey} dur={20} />
        <DCard f={f} at={F.costs - 6} x={330} y={100} w={300} h={90} r={45} fill={K.soft} stroke={K.amber} dur={8}>
          <Wr f={f} at={F.costs + 2} x={480} y={160} fs={40} t="1 call = $" c={K.amber} dur={8} />
        </DCard>
        <Wr f={f} at={F.picture} x={480} y={260} fs={36} t="now picture a loop that never stops…" dur={22} />
        {[...Array(24)].map((_, i) => { const at = F.never + i * 2.2; if (f < at) return null; const x = 70 + (i % 12) * 70, y = 330 + Math.floor(i / 12) * 110;
          return <g key={i}><rect x={x} y={y} width={60} height={80} rx={12} fill={K.amber} opacity={0.25 + 0.75 * Math.min(1, (f - at) / 6)} /><text x={x + 30} y={y + 52} textAnchor="middle" fontFamily="InterLocal, sans-serif" fontWeight={800} fontSize={36} fill={K.ink}>$</text></g>; })}
      </g>
    );
  }
  if (f < F.four - 6) return ( // RUNAWAY RETRIES
    <g>
      <DCard f={f} at={F.a2} x={60} y={60} w={260} h={90} r={45} fill="#FFF1F0" stroke={K.red} dur={8}>
        <Wr f={f} at={F.failing - 6} x={190} y={120} fs={32} t="tool fails ✗" c={K.red} dur={10} />
      </DCard>
      <DLine f={f} at={F.retrying - 10} x1={335} y1={105} x2={420} y2={105} c={K.ink} w={7} head dur={6} />
      <DCard f={f} at={F.retrying - 4} x={435} y={60} w={290} h={90} r={45} fill={K.soft} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.retrying + 4} x={580} y={120} fs={32} t="agent retries ↻" c={K.blue} dur={10} />
      </DCard>
      <Wr f={f} at={F.each} x={480} y={210} fs={30} t="each retry resends the WHOLE growing conversation" c={K.ink} dur={26} />
      {[0, 1, 2, 3, 4].map(i => (
        <g key={i}>
          <Wr f={f} at={F.growing + i * 6} x={70} y={268 + i * 46} fs={26} t={`call ${i + 1}`} c={K.grey} a="start" dur={6} />
          <DBar f={f} at={F.growing + 4 + i * 6} x={180} y={246 + i * 46} w={120 + i * 150} h={30} c={i > 2 ? K.red : K.amber} dur={8} />
        </g>
      ))}
      <Wr f={f} at={F.thousands} x={480} y={535} fs={44} t="thousands of calls… while you sleep" c={K.red} dur={22} />
      <Wr f={f} at={F.sleep + 4} x={890} y={480} fs={40} t="zzz" c={K.violet} dur={8} />
    </g>
  );
  if (f < F.and2 - 6) { // FOUR GUARDS
    const G: [string, string, number, number][] = [["1 · MAX STEPS", "per task", F.one, F.maximum], ["2 · BUDGET LIMIT", "per task + per day", F.two, F.budget], ["3 · SMALLER MODELS", "for simple steps", F.three, F.smaller], ["4 · CACHING", "don't pay twice", F.four2, F.caching]];
    return (
      <g>
        <Wr f={f} at={F.four} x={480} y={70} fs={48} t="FOUR GUARDS" c={K.blue} dur={12} />
        {G.map(([a, b, at, at2], i) => { const x = 60 + (i % 2) * 430, y = 110 + Math.floor(i / 2) * 230; return (
          <DCard key={i} f={f} at={at - 6} x={x} y={y} w={410} h={200} fill={K.soft} stroke={K.blue} dur={8}>
            <Wr f={f} at={at2 - 2} x={x + 205} y={y + 85} fs={33} t={a} dur={12} />
            <Wr f={f} at={at2 + 12} x={x + 205} y={y + 150} fs={30} t={b} c={K.green} dur={12} />
          </DCard>); })}
      </g>
    );
  }
  if (f < F.most - 6) return ( // BILLING ALERTS
    <g>
      <Wr f={f} at={F.billing - 4} x={480} y={70} fs={48} t="+ BILLING ALERTS" c={K.amber} dur={14} />
      <DLine f={f} at={F.billing + 6} x1={100} y1={480} x2={860} y2={480} c={K.grey} w={5} dur={8} />
      <DLine f={f} at={F.billing + 6} x1={100} y1={480} x2={100} y2={140} c={K.grey} w={5} dur={8} />
      <Wr f={f} at={F.billing + 14} x={110} y={530} fs={28} t="spending" c={K.grey} a="start" dur={8} />
      <DLine f={f} at={F.spending} x1={110} y1={440} x2={300} y2={430} c={K.blue} w={8} dur={6} />
      <DLine f={f} at={F.spending + 6} x1={300} y1={430} x2={480} y2={420} c={K.blue} w={8} dur={6} />
      <DLine f={f} at={F.jumps} x1={480} y1={420} x2={560} y2={170} c={K.red} w={10} dur={6} />
      <DCard f={f} at={F.jumps + 10} x={600} y={140} w={280} h={100} r={24} fill={K.amber} stroke={K.ink} dur={8}>
        <Wr f={f} at={F.jumps + 16} x={740} y={205} fs={40} t="⚠ ALERT" dur={8} />
      </DCard>
      <Wr f={f} at={F.hear} x={680} y={330} fs={30} t="you hear first…" c={K.green} dur={12} />
      <Wr f={f} at={F.bill - 6} x={680} y={390} fs={30} t="before the bill arrives" c={K.green} dur={14} />
    </g>
  );
  if (f < F.remember - 6) return ( // BUGS, NOT BUSY USERS
    <g>
      <Wr f={f} at={F.most} x={480} y={90} fs={42} t="MOST SURPRISE BILLS ARE…" dur={14} />
      <DCard f={f} at={F.bugs - 8} x={110} y={150} w={340} h={260} fill="#FFF1F0" stroke={K.red} dur={8}>
        <Wr f={f} at={F.bugs} x={280} y={300} fs={72} t="BUGS" c={K.red} dur={8} />
      </DCard>
      <DTick f={f} at={F.bugs + 8} x={280} y={480} ok s={0.9} />
      <DCard f={f} at={F.not} x={510} y={150} w={340} h={260} dur={8}>
        <Wr f={f} at={F.busy - 2} x={680} y={300} fs={40} t="busy users" c={K.grey} dur={8} />
      </DCard>
      <DTick f={f} at={F.busy + 8} x={680} y={480} ok={false} s={0.9} />
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={80} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <Wr f={f} at={F.every2} x={480} y={170} fs={52} t="EVERY LOOP NEEDS" dur={12} />
      <DCard f={f} at={F.step - 6} x={80} y={230} w={370} h={200} fill={K.soft} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.step} x={265} y={350} fs={46} t="STEP LIMIT" c={K.blue} dur={8} />
      </DCard>
      <Wr f={f} at={F.step + 10} x={480} y={350} fs={56} t="+" dur={4} />
      <DCard f={f} at={F.budget2 - 6} x={510} y={230} w={370} h={200} fill={K.soft} stroke={K.green} dur={8}>
        <Wr f={f} at={F.budget2} x={695} y={350} fs={46} t="BUDGET" c={K.green} dur={8} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="The 4 things every production agent needs" tomorrowAt={F.tomorrow} schoolAt={F.agent5 - 4} buttonAt={F.lesson3 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.lesson2, 0.9], [F.most - 6, 0.9], [F.most, 0.3], [F.bugs, 0.9],
      [F.remember - 6, 0.9], [F.remember, 0.2], [F.every2, 0.9], [F.tomorrow, 0.9], [F.agent5, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.lesson2, "openPalm"], [F.four, "fingerUp"], [F.one + 10, "openPalm"], [F.most, "fingerUp"],
      [F.busy + 10, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent5, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.empty, F.empty + 40], [F.thousands, F.thousands + 30], [F.jumps, F.jumps + 30], [F.bugs, F.bugs + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.lesson2 - 6, M], [F.lesson2 + 10, S],
    [F.four - 6, S], [F.four + 10, Wd], [F.one - 4, Wd], [F.one + 8, S],
    [F.most - 6, S], [F.most + 6, Wd], [F.remember - 4, Wd], [F.every2 - 4, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l026" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L26" line1="WALLET" strike="FULL" line2="EMPTY $0" fs1={160} fs3={136} bubble1="OVERNIGHT?!" bubble2="4 guards stop it" /></AbsoluteFill>
);
