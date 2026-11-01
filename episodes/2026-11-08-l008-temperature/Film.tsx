// Agent School · L8 — "Ask AI Twice, Get Two Answers — Temperature"   projects/l008/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 8, TITLE = "Ask AI Twice, Get Two Answers";
const W = cueFinder(WORDS);
const F = {
  ask: W("ask"), same: W("same"), twice: W("twice"), two: W("two"), different: W("different"), answers: W("answers"), welcome: W("welcome"),
  remember: W("remember"), picks: W("picks"), next: W("next"), list: W("list"), probabilities: W("probabilities"),
  but: W("but"), doesnt: W("doesnt"), top: W("top"), rolls: W("rolls"), weighted: W("weighted"), dice: W("dice"), setting: W("setting"), temperature: W("temperature"), wild: W("wild"),
  low: W("low"), safest: W("safest"), focused: W("focused"), repeatable: W("repeatable"),
  high: W("high"), risks: W("risks"), surprising: W("surprising"), creative: W("creative"), nonsense: W("nonsense"),
  so: W("so"), facts: W("facts"), code: W("code"), data: W("data"), low2: W("low", 2), brainstorming: W("brainstorming"), stories: W("stories"), slogans: W("slogans"), turn: W("turn"),
  not: W("not"), change: W("change"), behind: W("behind"), dial: W("dial"), always3: W("always", 3),
  remember2: W("remember", 2), low3: W("low", 3), accuracy: W("accuracy"), high2: W("high", 2), creativity: W("creativity"),
  tomorrow: W("tomorrow"), agent2: W("agent", 2), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const CANDS: [string, number][] = [["mat", 1], ["floor", 0.55], ["sofa", 0.3], ["moon", 0.08]];
/** next-word probability bars (the pen colours them in) */
const ProbBars: React.FC<{ f: number; at: number; y: number; hi?: number; hiC?: string }> = ({ f, at, y, hi = -1, hiC = K.green }) => (
  <g>
    {CANDS.map(([w, p], i) => (
      <g key={i}>
        <Wr f={f} at={at + i * 4} x={250} y={y + i * 62 + 30} fs={34} t={w} c={i === hi ? hiC : K.ink} a="end" dur={6} />
        <DBar f={f} at={at + 4 + i * 4} x={275} y={y + i * 62 + 6} w={Math.max(40, 560 * p)} h={32} c={i === hi ? hiC : "#AFC6EE"} dur={10} />
      </g>
    ))}
  </g>
);
/** temperature slider: track drawn by the pen, knob slides to `v` (0..1) */
const Slider: React.FC<{ f: number; at: number; x: number; y: number; w: number; v: number }> = ({ f, at, x, y, w, v }) => {
  const kx = x + w * v;
  return (
    <g>
      <DLine f={f} at={at} x1={x} y1={y} x2={x + w / 2} y2={y} c={K.blue} w={14} dur={8} />
      <DLine f={f} at={at + 8} x1={x + w / 2} y1={y} x2={x + w} y2={y} c={K.red} w={14} dur={8} />
      {f >= at + 16 && <circle cx={kx} cy={y} r={22} fill="#fff" stroke={K.ink} strokeWidth={6} />}
    </g>
  );
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.remember - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 8" c={K.blue} dur={10} />
      <Wr f={f} at={F.ask} x={480} y={160} fs={50} t="SAME QUESTION, ASKED" dur={14} />
      <Wr f={f} at={F.twice - 4} x={480} y={245} fs={80} t="TWICE" c={K.amber} dur={8} />
      <DCard f={f} at={F.two - 4} x={80} y={300} w={340} h={210} fill={K.soft} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.two + 2} x={250} y={360} fs={30} t="answer 1" c={K.blue} dur={8} />
        {[0, 1, 2].map((i) => <DBar key={i} f={f} at={F.two + 6 + i * 3} x={120} y={390 + i * 34} w={i === 2 ? 160 : 260} h={16} c="#AFC6EE" dur={6} />)}
      </DCard>
      <Wr f={f} at={F.different} x={480} y={435} fs={84} t="≠" c={K.red} dur={6} />
      <DCard f={f} at={F.different + 2} x={540} y={300} w={340} h={210} fill="#FFF3DF" stroke={K.amber} dur={8}>
        <Wr f={f} at={F.different + 8} x={710} y={360} fs={30} t="answer 2" c={K.amber} dur={8} />
        {[0, 1, 2].map((i) => <DBar key={i} f={f} at={F.different + 12 + i * 3} x={580} y={390 + i * 34} w={i === 1 ? 140 : 250} h={16} c="#F5CF94" dur={6} />)}
      </DCard>
    </g>
  );
  if (f < F.but - 6) return ( // NEXT-WORD PROBABILITIES
    <g>
      <Wr f={f} at={F.remember} x={480} y={70} fs={30} t="remember: AI picks the next word" c={K.grey} dur={20} />
      <DCard f={f} at={F.next - 4} x={110} y={100} w={740} h={90} r={45} fill="#F4F6FA" stroke="#C9D3E6" dur={8}>
        <Wr f={f} at={F.next + 2} x={480} y={160} fs={40} t="The cat sat on the ____" dur={14} />
      </DCard>
      <Wr f={f} at={F.list} x={480} y={240} fs={30} t="from a list of probabilities" c={K.blue} dur={18} />
      <ProbBars f={f} at={F.probabilities - 6} y={280} />
    </g>
  );
  if (f < F.low - 6) { // WEIGHTED DICE + TEMPERATURE
    const pip = (cx: number, cy: number, k: number) => f >= F.dice + k * 2 ? <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={11} fill={K.ink} /> : null;
    return (
      <g>
        <Wr f={f} at={F.doesnt - 4} x={480} y={70} fs={36} t="not always the top word…" dur={16} />
        <DCard f={f} at={F.rolls - 6} x={110} y={110} w={180} h={180} r={26} fill="#fff" stroke={K.ink} dur={10}>
          {pip(155, 155, 0)}{pip(245, 155, 1)}{pip(200, 200, 2)}{pip(155, 245, 3)}{pip(245, 245, 4)}
        </DCard>
        <Wr f={f} at={F.weighted - 4} x={330} y={185} fs={44} t="it rolls" a="start" dur={8} />
        <Wr f={f} at={F.weighted + 4} x={330} y={250} fs={44} t="weighted dice" c={K.violet} a="start" dur={12} />
        <DCard f={f} at={F.setting - 4} x={80} y={330} w={800} h={230} fill={K.soft} stroke={K.blue}>
          <Wr f={f} at={F.temperature - 4} x={480} y={400} fs={56} t="TEMPERATURE" c={K.red} dur={14} />
          <Slider f={f} at={F.temperature + 8} x={180} y={460} w={600} v={0.5 + 0.4 * Math.sin(Math.max(0, f - F.wild) * 0.15)} />
          <Wr f={f} at={F.wild - 6} x={480} y={535} fs={30} t="controls how wild the dice are" c={K.grey} dur={18} />
        </DCard>
      </g>
    );
  }
  if (f < F.high - 6) return ( // LOW TEMPERATURE
    <g>
      <Wr f={f} at={F.low} x={480} y={70} fs={52} t="LOW TEMPERATURE" c={K.blue} dur={12} />
      <Slider f={f} at={F.low + 6} x={280} y={115} w={400} v={0.1} />
      <ProbBars f={f} at={F.low + 14} y={150} hi={0} hiC={K.blue} />
      <Wr f={f} at={F.safest - 4} x={480} y={440} fs={34} t="almost always the safest word" dur={18} />
      <DCard f={f} at={F.focused - 6} x={150} y={475} w={300} h={80} r={40} fill={K.blue} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.focused} x={300} y={528} fs={36} t="FOCUSED" c="#fff" dur={8} />
      </DCard>
      <DCard f={f} at={F.repeatable - 6} x={490} y={475} w={320} h={80} r={40} fill={K.blue} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.repeatable} x={650} y={528} fs={36} t="REPEATABLE" c="#fff" dur={10} />
      </DCard>
    </g>
  );
  if (f < F.so - 6) return ( // HIGH TEMPERATURE
    <g>
      <Wr f={f} at={F.high} x={480} y={70} fs={52} t="HIGH TEMPERATURE" c={K.red} dur={12} />
      <Slider f={f} at={F.high + 6} x={280} y={115} w={400} v={0.9} />
      <ProbBars f={f} at={F.high + 14} y={150} hi={3} hiC={K.red} />
      <Wr f={f} at={F.risks - 4} x={480} y={440} fs={34} t="it takes risks" dur={10} />
      <DCard f={f} at={F.surprising - 4} x={40} y={475} w={270} h={80} r={40} fill={K.violet} stroke={K.violet} dur={8}>
        <Wr f={f} at={F.surprising + 2} x={175} y={527} fs={30} t="SURPRISING" c="#fff" dur={8} />
      </DCard>
      <DCard f={f} at={F.creative - 4} x={345} y={475} w={270} h={80} r={40} fill={K.green} stroke={K.green} dur={8}>
        <Wr f={f} at={F.creative + 2} x={480} y={527} fs={30} t="CREATIVE" c="#fff" dur={8} />
      </DCard>
      <DCard f={f} at={F.nonsense - 4} x={650} y={475} w={270} h={80} r={40} fill={K.red} stroke={K.red} dur={8}>
        <Wr f={f} at={F.nonsense + 2} x={785} y={527} fs={30} t="NONSENSE" c="#fff" dur={8} />
      </DCard>
    </g>
  );
  if (f < F.not - 6) return ( // WHEN TO USE WHICH
    <g>
      <DCard f={f} at={F.so} x={60} y={60} w={400} h={500} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.so + 8} x={260} y={125} fs={40} t="KEEP IT LOW" c={K.blue} dur={10} />
        <Wr f={f} at={F.facts - 2} x={260} y={225} fs={38} t="facts" dur={6} />
        <Wr f={f} at={F.code} x={260} y={300} fs={38} t="code" dur={6} />
        <Wr f={f} at={F.data - 2} x={260} y={375} fs={38} t="data extraction" dur={12} />
        <Slider f={f} at={F.low2 - 6} x={130} y={480} w={260} v={0.1} />
      </DCard>
      <DCard f={f} at={F.brainstorming - 8} x={500} y={60} w={400} h={500} fill="#FDECEB" stroke={K.red}>
        <Wr f={f} at={F.brainstorming - 2} x={700} y={125} fs={40} t="TURN IT UP" c={K.red} dur={10} />
        <Wr f={f} at={F.brainstorming + 6} x={700} y={225} fs={38} t="brainstorming" dur={10} />
        <Wr f={f} at={F.stories} x={700} y={300} fs={38} t="stories" dur={6} />
        <Wr f={f} at={F.slogans - 2} x={700} y={375} fs={38} t="slogans" dur={6} />
        <Slider f={f} at={F.turn} x={570} y={480} w={260} v={0.9} />
      </DCard>
    </g>
  );
  if (f < F.remember2 - 6) { // THE DIAL IS ALWAYS THERE
    const v = 0.5 + 0.35 * Math.sin(Math.max(0, f - F.dial) * 0.12);
    return (
      <g>
        <Wr f={f} at={F.change + 8} x={480} y={85} fs={38} t="NOT EVERY APP LETS YOU CHANGE IT" dur={20} />
        <DCard f={f} at={F.behind - 6} x={130} y={140} w={700} h={260} fill="#F4F6FA" stroke="#C9D3E6">
          <Wr f={f} at={F.behind + 4} x={480} y={210} fs={32} t="behind the scenes" c={K.grey} dur={12} />
          <Wr f={f} at={F.dial - 8} x={200} y={290} fs={30} t="low" c={K.blue} a="start" dur={4} />
          <Wr f={f} at={F.dial - 8} x={760} y={290} fs={30} t="high" c={K.red} a="end" dur={4} />
          <Slider f={f} at={F.dial - 6} x={200} y={335} w={560} v={v} />
        </DCard>
        <Wr f={f} at={F.always3 - 4} x={480} y={500} fs={48} t="THE DIAL IS ALWAYS THERE" c={K.ink} dur={18} />
      </g>
    );
  }
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember2} x={480} y={90} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.low3 - 6} x={80} y={140} w={800} h={170} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.low3} x={110} y={215} fs={36} t="LOW TEMPERATURE" c={K.blue} a="start" dur={12} />
        <Wr f={f} at={F.accuracy - 4} x={110} y={280} fs={50} t="→ ACCURACY" a="start" dur={12} />
      </DCard>
      <DCard f={f} at={F.high2 - 6} x={80} y={350} w={800} h={170} fill="#FDECEB" stroke={K.red}>
        <Wr f={f} at={F.high2} x={110} y={425} fs={36} t="HIGH TEMPERATURE" c={K.red} a="start" dur={12} />
        <Wr f={f} at={F.creativity - 6} x={110} y={490} fs={50} t="→ CREATIVITY" a="start" dur={12} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="Your AI never read your files… until this" tomorrowAt={F.tomorrow} schoolAt={F.agent2 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.remember, 0.9], [F.not - 6, 0.9], [F.not + 2, 0.2], [F.change + 6, 0.9],
      [F.remember2 - 6, 0.2], [F.low3 - 4, 0.9], [F.tomorrow, 0.9], [F.agent2, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.remember, "fingerUp"], [F.picks, "openPalm"], [F.temperature, "fingerUp"], [F.low, "openPalm"],
      [F.not, "openPalm"], [F.dial, "fingerUp"], [F.remember2 - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent2, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.twice, F.twice + 40], [F.rolls, F.rolls + 30], [F.nonsense, F.nonsense + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.remember - 6, M], [F.remember + 10, S],
    [F.not - 8, S], [F.not + 4, Fc], [F.change, Fc], [F.change + 12, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l008" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L8" line1="ASK TWICE" line2="2 ANSWERS" fs1={140} bubble1="WHY?!" bubble2="the hidden dial" /></AbsoluteFill>
);
