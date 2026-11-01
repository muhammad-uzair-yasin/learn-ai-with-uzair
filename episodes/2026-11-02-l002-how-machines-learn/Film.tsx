// Agent School · L2 — "Nobody Programmed ChatGPT's Answers — How Machines Learn"   projects/l002/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 2, TITLE = "Nobody Programmed ChatGPT's Answers";
const W = cueFinder(WORDS);
const F = {
  nobody: W("nobody"), not1: W("not"), welcome: W("welcome"), yesterday: W("yesterday"), old: W("old"), rules1: W("rules"),
  ifw: W("if"), human: W("human"), machine: W("machine"), flips: W("flips"), examples1: W("examples"), finds: W("finds"),
  heres: W("heres"), hide: W("hide"), guesses: W("guesses"), wrong: W("wrong"), nudges: W("nudges"), again: W("again"), billions1: W("billions"),
  tweak: W("tweak"), parameters: W("parameters"), nobody2: W("nobody", 2), theyre: W("theyre"),
  creators: W("creators"), isnt: W("isnt"), remember: W("remember"), programmers: W("programmers"), machines: W("machines"),
  tomorrow: W("tomorrow"), agent2: W("agent", 2), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.yesterday - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 2" c={K.blue} dur={10} />
      <Wr f={f} at={F.nobody} x={480} y={210} fs={96} t="NOBODY" dur={12} />
      <Wr f={f} at={F.nobody + 12} x={480} y={320} fs={72} t="PROGRAMMED" dur={14} />
      <Wr f={f} at={F.nobody + 26} x={480} y={420} fs={72} t="ChatGPT's answers" c={K.blue} dur={18} />
      <DCard f={f} at={F.not1} x={330} y={460} w={300} h={90} r={45} fill={K.red} stroke={K.red} dur={8}>
        <Wr f={f} at={F.not1 + 6} x={480} y={520} fs={44} t="NOT ONE." c="#fff" dur={8} />
      </DCard>
    </g>
  );
  if (f < F.machine - 6) return ( // OLD SOFTWARE = RULES
    <g>
      <Wr f={f} at={F.yesterday} x={480} y={70} fs={30} t="yesterday: AI predicts the next word" c={K.grey} dur={22} />
      <Wr f={f} at={F.old} x={480} y={150} fs={56} t="OLD SOFTWARE = RULES" dur={18} />
      <DCard f={f} at={F.ifw - 8} x={160} y={200} w={640} h={230} fill="#0F1726" stroke="#0F1726">
        <Wr f={f} at={F.ifw} x={200} y={270} fs={34} t="if  question == ..." c="#7EE787" a="start" dur={14} />
        <Wr f={f} at={F.ifw + 14} x={240} y={330} fs={34} t="answer = ..." c="#E6EDF3" a="start" dur={10} />
        <Wr f={f} at={F.ifw + 26} x={200} y={390} fs={34} t="else if ..." c="#7EE787" a="start" dur={10} />
      </DCard>
      <Wr f={f} at={F.human - 6} x={480} y={500} fs={34} t="every answer typed by a human" c={K.amber} dur={22} />
    </g>
  );
  if (f < F.heres - 4) return ( // ML FLIPS IT
    <g>
      <Wr f={f} at={F.machine - 4} x={480} y={70} fs={50} t="MACHINE LEARNING FLIPS IT" c={K.blue} dur={22} />
      <DCard f={f} at={F.machine + 16} x={60} y={130} w={380} h={300}>
        <Wr f={f} at={F.machine + 26} x={250} y={200} fs={30} t="OLD WAY" c={K.grey} dur={8} />
        <Wr f={f} at={F.machine + 36} x={250} y={280} fs={36} t="human → rules" dur={12} />
        <Wr f={f} at={F.machine + 50} x={250} y={350} fs={36} t="rules → answers" dur={12} />
      </DCard>
      <DCard f={f} at={F.examples1 - 10} x={520} y={130} w={380} h={300} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.examples1 - 2} x={710} y={200} fs={30} t="MACHINE LEARNING" c={K.blue} dur={12} />
        <Wr f={f} at={F.examples1 + 6} x={710} y={280} fs={36} t="examples →" dur={10} />
        <Wr f={f} at={F.finds} x={710} y={350} fs={36} t="machine finds rules" c={K.green} dur={18} />
      </DCard>
      <DTick f={f} at={F.flips + 4} x={250} y={480} ok={false} s={0.9} />
      <DTick f={f} at={F.finds + 12} x={710} y={480} ok s={0.9} />
    </g>
  );
  if (f < F.tweak - 4) { // TRAINING LOOP
    const guess = f >= F.again ? "mat" : f >= F.nudges ? "mat" : "car";
    const ok = f >= F.nudges + 12;
    return (
      <g>
        <Wr f={f} at={F.heres} x={480} y={70} fs={44} t="HOW IT LEARNS" c={K.blue} dur={12} />
        <DCard f={f} at={F.hide - 8} x={80} y={110} w={800} h={110} fill={K.soft} stroke={K.blue}>
          <Wr f={f} at={F.hide} x={120} y={182} fs={44} t="The cat sat on the  _____" a="start" dur={18} />
        </DCard>
        <Wr f={f} at={F.guesses} x={300} y={300} fs={34} t="model guesses:" c={K.grey} dur={10} />
        {f >= F.guesses + 10 && <text x={520} y={302} fontFamily="InterLocal, sans-serif" fontWeight={800} fontSize={54} fill={ok ? K.green : K.red}>{ok ? "mat" : guess}</text>}
        <DTick f={f} at={F.wrong} x={720} y={286} ok={false} s={0.8} />
        {ok && <DTick f={f} at={F.nudges + 12} x={820} y={286} ok s={0.8} />}
        <DLine f={f} at={F.nudges} x1={300} y1={380} x2={660} y2={380} c={K.amber} w={8} head />
        <Wr f={f} at={F.nudges + 4} x={480} y={440} fs={32} t="a little math nudges it" c={K.amber} dur={18} />
        <Wr f={f} at={F.billions1 - 4} x={480} y={540} fs={56} t="× BILLIONS OF TIMES" c={K.blue} dur={18} />
      </g>
    );
  }
  if (f < F.creators - 10) { // PARAMETERS
    const cols = 16, rows = 7;
    return (
      <g>
        <Wr f={f} at={F.tweak} x={480} y={70} fs={44} t="BILLIONS OF TINY NUMBERS" dur={20} />
        {[...Array(cols * rows)].map((_, i) => { const x = 120 + (i % cols) * 48, y = 130 + Math.floor(i / cols) * 46; const on = f >= F.tweak + 10 + i * 0.25; if (!on) return null;
          const v = (Math.sin(i * 1.7 + f * 0.25) + 1) / 2; return <circle key={i} cx={x} cy={y} r={8 + v * 8} fill={v > 0.5 ? K.blue : K.cyan} opacity={0.35 + v * 0.65} />; })}
        <DCard f={f} at={F.parameters - 6} x={250} y={460} w={460} h={70} r={35} fill={K.ink} stroke={K.ink} dur={8}>
          <Wr f={f} at={F.parameters} x={480} y={507} fs={36} t="PARAMETERS" c="#fff" dur={10} />
        </DCard>
        <Wr f={f} at={F.nobody2} x={480} y={580} fs={30} t="nobody sets them by hand — they're learned" c={K.green} dur={26} />
      </g>
    );
  }
  if (f < F.remember - 6) return ( // NO LINE OF CODE
    <g>
      <Wr f={f} at={F.creators - 8} x={480} y={80} fs={40} t="even its creators can't point to…" dur={22} />
      <DCard f={f} at={F.creators + 14} x={200} y={130} w={560} h={250} fill="#0F1726" stroke="#0F1726">
        <Wr f={f} at={F.creators + 24} x={240} y={210} fs={34} t="def write_answer():" c="#7EE787" a="start" dur={14} />
        <Wr f={f} at={F.creators + 40} x={280} y={280} fs={34} t="???" c="#E6EDF3" a="start" dur={6} />
      </DCard>
      <DLine f={f} at={F.isnt - 6} x1={220} y1={150} x2={740} y2={360} c={K.red} w={14} dur={8} />
      <Wr f={f} at={F.isnt} x={480} y={470} fs={60} t="THERE ISN'T ONE." c={K.red} dur={14} />
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={90} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.programmers - 6} x={80} y={140} w={800} h={150}>
        <Wr f={f} at={F.programmers} x={480} y={235} fs={52} t="PROGRAMMERS WRITE RULES" dur={18} />
      </DCard>
      <DCard f={f} at={F.machines - 6} x={80} y={330} w={800} h={190} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.machines} x={480} y={410} fs={52} t="MACHINES LEARN THEM" c={K.blue} dur={16} />
        <Wr f={f} at={F.machines + 18} x={480} y={475} fs={40} t="from examples" c={K.green} dur={12} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next={`Why AI can't see the word "strawberry"`} tomorrowAt={F.tomorrow} schoolAt={F.agent2 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.yesterday, 0.9], [F.heres - 4, 0.9], [F.heres, 0.3], [F.hide, 0.9],
      [F.creators - 10, 0.9], [F.creators, 0.2], [F.creators + 20, 0.85], [F.remember - 6, 0.2], [F.programmers, 0.9], [F.tomorrow, 0.9], [F.agent2, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.yesterday, "openPalm"], [F.heres, "fingerUp"], [F.hide, "openPalm"], [F.creators - 10, "fingerUp"],
      [F.creators + 20, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent2, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.nobody, F.nobody + 40], [F.wrong, F.wrong + 30], [F.isnt, F.isnt + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.yesterday - 6, M], [F.yesterday + 10, S],
    [F.heres - 8, S], [F.heres + 4, Fc], [F.hide - 8, Fc], [F.hide + 6, S], [F.creators - 14, S], [F.creators, Wd], [F.isnt + 20, S],
    [F.remember - 8, S], [F.remember + 6, Fc], [F.programmers - 8, Fc], [F.programmers + 4, S], [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l002" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L2" line1="NOBODY" strike="WROTE" line2="ITS ANSWERS" fs1={160} bubble1="SO WHO DID?!" bubble2="how machines learn" /></AbsoluteFill>
);
