// Agent School · L14 — "Every AI Agent Runs the Same 4-Step Loop"   projects/l014/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, CodeCard, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 14, TITLE = "Every Agent Runs This Loop";
const W = cueFinder(WORDS);
const F = {
  every: W("every"), fourstep: W("fourstep"), loop: W("loop"), welcome: W("welcome"),
  yesterday: W("yesterday"), model: W("model"), tools: W("tools"), goal: W("goal"), loop2: W("loop", 2), today: W("today"),
  step: W("step"), think: W("think"), whats: W("whats"), act: W("act"), call: W("call"), search: W("search"), observe: W("observe"), read: W("read"),
  step4: W("step", 4), repeat: W("repeat"), stop: W("stop"), done: W("done"),
  think2: W("think", 2), act2: W("act", 2), observe2: W("observe", 2), repeat2: W("repeat", 2), over: W("over"), finished: W("finished"),
  booking: W("booking"), think3: W("think", 3), act3: W("act", 3), observe3: W("observe", 3), ten: W("ten"), think4: W("think", 4), compare: W("compare"), around: W("around"),
  every2: W("every", 2), stop2: W("stop", 2), rule: W("rule"), maximum: W("maximum"), spin: W("spin"), forever: W("forever"),
  remember: W("remember"), think5: W("think", 5), act4: W("act", 4), observe4: W("observe", 4), every3: W("every", 3),
  tomorrow: W("tomorrow"), agent6: W("agent", 6), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};
const STEPS = ["THINK", "ACT", "OBSERVE", "REPEAT"];
const SC = [K.blue, K.green, K.violet, K.amber];

/** The 4-node loop, each node drawn by the pen at its own cue; `hot` = index of the node to highlight. */
const Loop: React.FC<{ f: number; at: number[]; cy: number; ry: number; hot?: number }> = ({ f, at, cy, ry, hot = -1 }) => {
  const P = [[480, cy - ry], [770, cy], [480, cy + ry], [190, cy]];
  const A = [[[590, cy - ry + 20], [690, cy - 50]], [[740, cy + 45], [595, cy + ry - 20]], [[365, cy + ry - 20], [220, cy + 45]], [[190, cy - 45], [365, cy - ry + 20]]];
  return (
    <g>
      {P.map(([x, y], i) => (
        <DCard key={i} f={f} at={at[i]} x={x - 110} y={y - 42} w={220} h={84} r={42} fill={hot === i ? SC[i] : "#fff"} stroke={SC[i]} dur={8}>
          <Wr f={f} at={at[i] + 4} x={x} y={y + 14} fs={i === 2 || i === 3 ? 36 : 40} t={STEPS[i]} c={hot === i ? "#fff" : SC[i]} dur={8} />
        </DCard>
      ))}
      {A.map(([[x1, y1], [x2, y2]], i) => <DLine key={i} f={f} at={at[i] + 10} x1={x1} y1={y1} x2={x2} y2={y2} c={K.grey} w={6} head dur={6} />)}
    </g>
  );
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.yesterday - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={60} fs={40} t="EVERY AI AGENT ON EARTH" c={K.blue} dur={18} />
      <Loop f={f} at={[F.fourstep - 20, F.fourstep - 14, F.fourstep - 8, F.fourstep - 2]} cy={350} ry={170} />
      <Wr f={f} at={F.loop} x={480} y={365} fs={44} t="4 STEPS" dur={8} />
    </g>
  );
  if (f < F.step - 6) return ( // RECAP
    <g>
      <Wr f={f} at={F.yesterday} x={480} y={90} fs={40} t="yesterday: an agent =" c={K.grey} dur={14} />
      {[["MODEL", F.model], ["TOOLS", F.tools], ["GOAL", F.goal], ["LOOP", F.loop2]].map(([t, at], i) => (
        <DCard key={i} f={f} at={(at as number) - 6} x={60 + i * 215} y={140} w={195} h={90} r={45} fill={i === 3 ? K.amber : K.soft} stroke={i === 3 ? K.amber : K.blue} dur={8}>
          <Wr f={f} at={(at as number) + 2} x={157 + i * 215} y={199} fs={34} t={t as string} c={i === 3 ? K.ink : K.blue} dur={6} />
        </DCard>
      ))}
      <DLine f={f} at={F.today - 6} x1={802} y1={245} x2={700} y2={340} c={K.amber} w={8} head dur={8} />
      <Wr f={f} at={F.today} x={480} y={420} fs={64} t="TODAY: THE LOOP" c={K.blue} dur={14} />
    </g>
  );
  if (f < F.think2 - 6) { // THE FOUR STEPS
    const k = f >= F.step4 ? 3 : f >= F.observe - 6 ? 2 : f >= F.act - 6 ? 1 : 0;
    const txt = [["\"what's my", "next move?\"", F.whats], ["call a tool:", "search · calc · send", F.call], ["read what", "came back", F.read], ["repeat… or", "STOP if done", F.repeat + 6]][k];
    return (
      <g>
        <Loop f={f} at={[F.step, F.act - 6, F.observe - 8, F.repeat - 8]} cy={330} ry={210} hot={k} />
        <Wr key={k} f={f} at={(txt[2] as number) - 4} x={480} y={315} fs={30} t={txt[0] as string} c={K.ink} dur={10} />
        <Wr f={f} at={(txt[2] as number) + 6} x={480} y={365} fs={30} t={txt[1] as string} c={SC[k]} dur={12} />
      </g>
    );
  }
  if (f < F.booking - 6) { // THINK. ACT. OBSERVE. REPEAT.
    const k = f >= F.repeat2 ? 3 : f >= F.observe2 ? 2 : f >= F.act2 ? 1 : 0;
    return (
      <g>
        <Loop f={f} at={[F.think2 - 6, F.act2 - 6, F.observe2 - 6, F.repeat2 - 6]} cy={330} ry={210} hot={f >= F.over ? -1 : k} />
        <Wr f={f} at={F.over} x={480} y={320} fs={36} t="OVER & OVER" c={K.ink} dur={10} />
        <Wr f={f} at={F.finished - 10} x={480} y={370} fs={28} t="until the job's done" c={K.green} dur={14} />
      </g>
    );
  }
  if (f < F.every2 - 6) return ( // FLIGHT EXAMPLE
    <g>
      <Wr f={f} at={F.booking} x={480} y={70} fs={44} t="BOOKING A FLIGHT" c={K.blue} dur={14} />
      {[[0, F.think3, "search flights"], [1, F.act3, "search( )"], [2, F.observe3, "10 results"], [0, F.think4, "compare prices"]].map(([s, at, t], i) => (
        <g key={i}>
          <DCard f={f} at={(at as number) - 4} x={80} y={110 + i * 95} w={230} h={76} r={38} fill={SC[s as number]} stroke={SC[s as number]} dur={6}>
            <Wr f={f} at={(at as number) + 2} x={195} y={161 + i * 95} fs={32} t={STEPS[s as number]} c="#fff" dur={6} />
          </DCard>
          <Wr f={f} at={(at as number) + (i === 2 ? 10 : 6)} x={350} y={162 + i * 95} fs={38} t={t as string} a="start" dur={12} />
        </g>
      ))}
      <Wr f={f} at={F.around - 4} x={480} y={555} fs={38} t="…and around it goes" c={K.amber} dur={14} />
    </g>
  );
  if (f < F.remember - 6) return ( // STOP RULE
    <g>
      <Wr f={f} at={F.every2} x={480} y={80} fs={42} t="EVERY LOOP NEEDS A STOP RULE" dur={18} />
      <DCard f={f} at={F.stop2 - 6} x={330} y={115} w={300} h={110} r={55} fill={K.red} stroke={K.red} dur={8}>
        <Wr f={f} at={F.stop2} x={480} y={193} fs={64} t="STOP" c="#fff" dur={6} />
      </DCard>
      <CodeCard f={f} at={F.maximum - 14} x={170} y={260} w={620} fs={32} per={12} title="agent.py" lines={["if steps >= max_steps:", "    stop()"]} />
      <Wr f={f} at={F.spin - 6} x={480} y={500} fs={38} t="…or it can spin FOREVER" c={K.red} dur={16} />
      <DLine f={f} at={F.forever + 8} x1={250} y1={530} x2={710} y2={530} c={K.red} w={6} dur={8} />
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={85} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      {[F.think5, F.act4, F.observe4, F.observe4 + 10].map((at, i) => (
        <DCard key={i} f={f} at={at - 6} x={40 + i * 230} y={170} w={190} h={100} r={50} fill={SC[i]} stroke={SC[i]} dur={8}>
          <Wr f={f} at={at} x={135 + i * 230} y={233} fs={i >= 2 ? 30 : 36} t={STEPS[i]} c="#fff" dur={6} />
        </DCard>
      ))}
      {[0, 1, 2].map((i) => <DLine key={i} f={f} at={[F.act4, F.observe4, F.observe4 + 10][i] - 8} x1={234 + i * 230} y1={220} x2={266 + i * 230} y2={220} c={K.ink} w={5} head dur={4} />)}
      <DLine f={f} at={F.observe4 + 20} x1={825} y1={285} x2={135} y2={285} c={K.grey} w={5} head dur={10} />
      <Wr f={f} at={F.every3 - 6} x={480} y={430} fs={56} t="THAT'S EVERY AGENT" c={K.green} dur={14} />
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="AI has no hands. So how did it book a flight?" tomorrowAt={F.tomorrow} schoolAt={F.agent6 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.yesterday - 10, 0.2], [F.yesterday, 0.9],
      [F.remember - 20, 0.9], [F.remember - 6, 0.2], [F.think5, 0.9], [F.tomorrow, 0.9], [F.agent6, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.yesterday, "openPalm"], [F.step, "fingerUp"], [F.think2, "openPalm"], [F.every2, "fingerUp"],
      [F.spin, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent6, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.every, F.every + 30], [F.ten, F.ten + 24], [F.forever, F.forever + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.yesterday - 6, M], [F.yesterday + 10, S],
    [F.think2 - 8, S], [F.think2 + 4, Wd], [F.booking - 10, Wd], [F.booking, S],
    [F.remember - 8, S], [F.remember + 6, Fc], [F.think5 - 12, Fc], [F.think5 - 2, S], [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l014" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L14" line1="EVERY AGENT" fs1={118} line2="RUNS THIS" fs3={136} bubble1="4 STEPS!" bubble2="the agent loop" />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}><text x={540} y={820} textAnchor="middle" fontFamily="InterLocal, Inter, sans-serif" fontWeight={800} fontSize={60} fill={K.amber}>THINK → ACT → OBSERVE</text></svg></AbsoluteFill>
);
