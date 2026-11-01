// Agent School · L22 — "The Best AI Model Is Usually the Cheaper One — Picking a Model"   projects/l022/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 22, TITLE = "The Best AI Model Is the Cheaper One";
const W = cueFinder(WORDS);
const F = {
  best: W("best"), usually: W("usually"), cheaper: W("cheaper"), welcome: W("welcome"),
  everyone: W("everyone"), biggest: W("biggest"), smartest: W("smartest"), wallet: W("wallet"), disagrees: W("disagrees"),
  big: W("big"), hard: W("hard"), slower: W("slower"), expensive: W("expensive"), small: W("small"), fast: W("fast"), cheap: W("cheap"), great: W("great"), simple: W("simple"),
  sorting: W("sorting"), extracting: W("extracting"), form: W("form"), small2: W("small", 2), perfectly: W("perfectly"), fraction: W("fraction"), price: W("price"),
  builders: W("builders"), route: W("route"), small3: W("small", 3), easy: W("easy"), ninety: W("ninety"), big2: W("big", 2), truly: W("truly"),
  how: W("how"), write: W("write"), ten: W("ten"), try: W("try"), cheapest: W("cheapest"), move: W("move"), fails: W("fails"),
  remember: W("remember"), start: W("start"), upgrade: W("upgrade"), proves: W("proves"),
  tomorrow: W("tomorrow"), agent2: W("agent", 2), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.everyone - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={60} fs={30} t="AGENT SCHOOL · LESSON 22" c={K.blue} dur={10} />
      <Wr f={f} at={F.best - 4} x={480} y={180} fs={72} t="THE BEST AI MODEL" dur={14} />
      <Wr f={f} at={F.usually - 4} x={480} y={270} fs={52} t="is usually…" c={K.grey} dur={10} />
      <DCard f={f} at={F.cheaper - 8} x={140} y={320} w={680} h={150} r={40} fill={K.green} stroke={K.green} dur={8}>
        <Wr f={f} at={F.cheaper} x={480} y={420} fs={68} t="THE CHEAPER ONE" c="#fff" dur={14} />
      </DCard>
    </g>
  );
  if (f < F.big - 6) return ( // EVERYONE WANTS THE BIGGEST
    <g>
      <Wr f={f} at={F.everyone} x={480} y={80} fs={40} t="everyone wants the…" c={K.grey} dur={14} />
      <Wr f={f} at={F.biggest - 4} x={480} y={180} fs={72} t="BIGGEST" dur={10} />
      <Wr f={f} at={F.smartest - 2} x={480} y={270} fs={72} t="SMARTEST" c={K.blue} dur={10} />
      <DCard f={f} at={F.wallet - 10} x={160} y={330} w={640} h={200} fill="#FFF1F0" stroke={K.red}>
        <Wr f={f} at={F.wallet - 2} x={480} y={410} fs={48} t="YOUR WALLET" dur={12} />
        <Wr f={f} at={F.disagrees} x={480} y={480} fs={48} t="DISAGREES" c={K.red} dur={12} />
      </DCard>
    </g>
  );
  if (f < F.sorting - 6) { // BIG VS SMALL
    const card = (x: number, title: string, c: string, at: number, rows: [string, number][]) => (
      <DCard f={f} at={at - 6} x={x} y={60} w={420} h={490} fill={x > 300 ? K.soft : "#fff"} stroke={c}>
        <Wr f={f} at={at} x={x + 210} y={130} fs={44} t={title} c={c} dur={12} />
        {rows.map(([t, a], i) => <Wr key={i} f={f} at={a} x={x + 210} y={220 + i * 80} fs={29} t={t} dur={10} />)}
      </DCard>
    );
    return (
      <g>
        {card(40, "BIG MODELS", K.violet, F.big, [["best at hard reasoning", F.hard - 4], ["slower", F.slower], ["$$$ expensive", F.expensive - 4]])}
        {card(500, "SMALL MODELS", K.green, F.small, [["fast", F.fast], ["cheap", F.cheap], ["great at simple,", F.great], ["clear tasks", F.simple + 4]])}
      </g>
    );
  }
  if (f < F.builders - 6) return ( // EXAMPLES: SMALL MODEL DOES IT
    <g>
      <DCard f={f} at={F.sorting - 6} x={40} y={50} w={600} h={100}>
        <Wr f={f} at={F.sorting} x={80} y={115} fs={36} t="sorting emails?" a="start" dur={12} />
      </DCard>
      <DTick f={f} at={F.small2} x={720} y={100} ok s={0.7} />
      <DCard f={f} at={F.extracting - 6} x={40} y={170} w={600} h={100}>
        <Wr f={f} at={F.extracting} x={80} y={235} fs={36} t="a name from a form?" a="start" dur={14} />
      </DCard>
      <DTick f={f} at={F.small2 + 8} x={720} y={220} ok s={0.7} />
      <Wr f={f} at={F.small2} x={480} y={340} fs={40} t="a SMALL model does it perfectly" c={K.green} dur={20} />
      <Wr f={f} at={F.fraction - 6} x={60} y={430} fs={30} t="big" a="start" c={K.violet} dur={6} />
      <DBar f={f} at={F.fraction - 2} x={160} y={405} w={740} h={34} c={K.violet} />
      <Wr f={f} at={F.fraction + 6} x={60} y={510} fs={30} t="small" a="start" c={K.green} dur={6} />
      <DBar f={f} at={F.fraction + 10} x={160} y={485} w={60} h={34} c={K.green} />
      <Wr f={f} at={F.price - 4} x={560} y={512} fs={30} t="← a fraction of the price" c={K.green} dur={16} />
    </g>
  );
  if (f < F.how - 6) return ( // ROUTING
    <g>
      <Wr f={f} at={F.builders} x={480} y={60} fs={44} t="BUILDERS ROUTE THE WORK" dur={18} />
      <DCard f={f} at={F.route - 4} x={40} y={230} w={230} h={130} fill={K.ink} stroke={K.ink}>
        <Wr f={f} at={F.route + 4} x={155} y={310} fs={36} t="ROUTER" c="#fff" dur={8} />
      </DCard>
      <DLine f={f} at={F.small3 - 4} x1={280} y1={270} x2={450} y2={170} c={K.green} w={8} head />
      <DCard f={f} at={F.small3 + 4} x={460} y={100} w={460} h={150} fill={K.soft} stroke={K.green}>
        <Wr f={f} at={F.small3 + 10} x={690} y={160} fs={36} t="SMALL MODEL" c={K.green} dur={10} />
        <Wr f={f} at={F.easy} x={690} y={215} fs={30} t="the easy 90%" dur={12} />
      </DCard>
      <DLine f={f} at={F.big2 - 4} x1={280} y1={320} x2={450} y2={410} c={K.violet} w={8} head />
      <DCard f={f} at={F.big2 + 4} x={460} y={340} w={460} h={150} stroke={K.violet}>
        <Wr f={f} at={F.big2 + 10} x={690} y={400} fs={36} t="BIG MODEL" c={K.violet} dur={10} />
        <Wr f={f} at={F.truly - 6} x={690} y={455} fs={30} t="only truly hard tasks" dur={16} />
      </DCard>
      <DBar f={f} at={F.ninety} x={40} y={530} w={790} h={30} c={K.green} />
      <DBar f={f} at={F.big2 + 20} x={830} y={530} w={90} h={30} c={K.violet} />
    </g>
  );
  if (f < F.remember - 6) { // HOW TO PICK
    const st: [string, number, string][] = [["write 10 real examples", F.write, K.ink], ["try the CHEAPEST model first", F.try, K.green], ["move up only if it fails", F.move, K.violet]];
    return (
      <g>
        <Wr f={f} at={F.how} x={480} y={70} fs={44} t="HOW TO PICK" c={K.blue} dur={12} />
        {st.map(([t, at, c], i) => (
          <g key={i}>
            <DCard f={f} at={at - 6} x={60 + i * 60} y={110 + i * 150} w={720} h={120} stroke={c}>
              <Wr f={f} at={at - 2} x={100 + i * 60} y={185 + i * 150} fs={36} t={`${i + 1}.  ${t}`} a="start" dur={18} />
            </DCard>
          </g>
        ))}
      </g>
    );
  }
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={70} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.start - 8} x={160} y={120} w={640} h={160} fill={K.soft} stroke={K.green}>
        <Wr f={f} at={F.start} x={480} y={225} fs={72} t="START SMALL" c={K.green} dur={14} />
      </DCard>
      <Wr f={f} at={F.upgrade} x={480} y={380} fs={44} t="upgrade only when the task" dur={20} />
      <Wr f={f} at={F.proves} x={480} y={460} fs={52} t="PROVES IT NEEDS MORE" c={K.violet} dur={16} />
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="What one AI question actually costs — first API call" tomorrowAt={F.tomorrow} schoolAt={F.agent2 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.everyone, 0.9], [F.wallet - 12, 0.9], [F.wallet - 4, 0.3], [F.big - 6, 0.9],
      [F.remember - 6, 0.9], [F.tomorrow, 0.9], [F.agent2, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.everyone, "openPalm"], [F.builders, "fingerUp"], [F.route, "openPalm"], [F.how, "fingerUp"], [F.write, "openPalm"],
      [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent2, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.cheaper, F.cheaper + 30], [F.disagrees, F.disagrees + 30], [F.fraction, F.fraction + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.everyone - 6, M], [F.everyone + 10, S],
    [F.disagrees + 16, S], [F.disagrees + 26, M], [F.big - 8, M], [F.big + 2, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l022" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L22" line1="BEST MODEL?" strike="BIGGEST" line2="CHEAPEST!" fs1={120} fs2={170} bubble1="SAVE $$$" bubble2="picking a model" /></AbsoluteFill>
);
