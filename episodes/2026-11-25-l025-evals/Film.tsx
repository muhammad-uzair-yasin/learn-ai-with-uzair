// Agent School · L25 — "Your Agent Passed Your Test… and Failed 100 Users — Evals"   projects/l025/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 25, TITLE = "Passed Your Test, Failed 100 Users";
const W = cueFinder(WORDS);
const F = {
  your: W("your"), passed: W("passed"), failed: W("failed"), hundred: W("hundred"), welcome: W("welcome"),
  you: W("you"), three: W("three"), times: W("times"), worked: W("worked"), shipped: W("shipped"), then: W("then"), people: W("people"),
  real2: W("real", 2), typos: W("typos"), slang: W("slang"), weird: W("weird"), ai: W("ai"), random: W("random"), pass: W("pass"), fail: W("fail"),
  thats: W("thats"), evals: W("evals"), test2: W("test", 2), examples: W("examples"), each: W("each"), good: W("good"), fifty: W("fifty"), hundred2: W("hundred", 2), more: W("more"),
  every: W("every"), change: W("change"), prompt: W("prompt"), model: W("model"), run: W("run"), score: W("score"), did: W("did"), better: W("better"), worse: W("worse"),
  and5: W("and", 5), failure: W("failure"), becomes: W("becomes"), test3: W("test", 3), grows: W("grows"), week: W("week"),
  remember: W("remember"), one: W("one"), demo: W("demo"), nothing: W("nothing"), test4: W("test", 4), progress: W("progress"),
  tomorrow: W("tomorrow"), agent4: W("agent", 4), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const Person: React.FC<{ f: number; at: number; x: number; y: number; c: string }> = ({ f, at, x, y, c }) => {
  const p = Math.min(1, Math.max(0, (f - at) / 6)); if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${p})`}><circle cy={-26} r={16} fill={c} /><path d="M-24 22 Q-24 -6 0 -6 Q24 -6 24 22 Z" fill={c} /></g>;
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.you - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 25" c={K.blue} dur={10} />
      <DCard f={f} at={F.your} x={60} y={120} w={380} h={300} fill={K.soft} stroke={K.green} dur={10}>
        <Wr f={f} at={F.your + 8} x={250} y={200} fs={44} t="YOUR TEST" dur={10} />
        <DTick f={f} at={F.passed} x={250} y={320} ok s={1.4} />
      </DCard>
      <DCard f={f} at={F.failed - 10} x={520} y={120} w={380} h={300} fill="#FFF1F0" stroke={K.red} dur={10}>
        <Wr f={f} at={F.hundred - 4} x={710} y={200} fs={44} t="100 USERS" dur={10} />
        <DTick f={f} at={F.hundred + 6} x={710} y={320} ok={false} s={1.4} />
      </DCard>
      <Wr f={f} at={F.hundred + 16} x={480} y={520} fs={64} t="THE FIX: EVALS" c={K.amber} dur={14} />
    </g>
  );
  if (f < F.real2 - 6) return ( // THE DEMO TRAP
    <g>
      <Wr f={f} at={F.you} x={480} y={70} fs={40} t="you tried it 3 times…" dur={14} />
      {[0, 1, 2].map(i => <DTick key={i} f={f} at={F.times + i * 8} x={330 + i * 150} y={160} ok s={0.8} />)}
      <Wr f={f} at={F.worked} x={480} y={260} fs={40} t="it worked!" c={K.green} dur={10} />
      <DCard f={f} at={F.shipped - 6} x={330} y={290} w={300} h={80} r={40} fill={K.blue} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.shipped + 2} x={480} y={345} fs={40} t="SHIPPED" c="#fff" dur={8} />
      </DCard>
      <Wr f={f} at={F.then} x={480} y={440} fs={36} t="then real people arrived…" c={K.red} dur={16} />
      {[...Array(12)].map((_, i) => <Person key={i} f={f} at={F.people + i * 2} x={150 + i * 60} y={540} c={[K.blue, K.violet, K.amber, K.cyan][i % 4]} />)}
    </g>
  );
  if (f < F.thats - 6) return ( // USERS SURPRISE YOU + AI IS RANDOM
    <g>
      <Wr f={f} at={F.real2} x={480} y={70} fs={36} t="real users ask in ways you never imagined" dur={24} />
      {[["typos", F.typos, 120], ["slang", F.slang, 330], ["weird edge cases", F.weird, 640]].map(([t, at, x], i) => (
        <DCard key={i} f={f} at={(at as number) - 6} x={(x as number) - (i === 2 ? 170 : 85)} y={110} w={i === 2 ? 340 : 170} h={80} r={40} fill={K.soft} stroke={K.violet} dur={6}>
          <Wr f={f} at={at as number} x={x as number} y={162} fs={32} t={t as string} c={K.violet} dur={8} />
        </DCard>
      ))}
      <DLine f={f} at={F.ai - 6} x1={80} y1={240} x2={880} y2={240} c="#C9D6EA" w={4} />
      <Wr f={f} at={F.ai} x={480} y={310} fs={48} t="AND AI IS RANDOM" c={K.amber} dur={14} />
      <DCard f={f} at={F.pass - 8} x={120} y={360} w={330} h={190} dur={8}>
        <Wr f={f} at={F.pass - 2} x={285} y={420} fs={32} t="run 1" c={K.grey} dur={6} />
        <DTick f={f} at={F.pass + 4} x={285} y={490} ok s={0.9} />
      </DCard>
      <DCard f={f} at={F.fail - 8} x={510} y={360} w={330} h={190} dur={8}>
        <Wr f={f} at={F.fail - 2} x={675} y={420} fs={32} t="run 2" c={K.grey} dur={6} />
        <DTick f={f} at={F.fail + 4} x={675} y={490} ok={false} s={0.9} />
      </DCard>
    </g>
  );
  if (f < F.every - 6) return ( // EVALS = TEST SET
    <g>
      <Wr f={f} at={F.evals - 4} x={480} y={80} fs={64} t="EVALS" c={K.blue} dur={10} />
      <DCard f={f} at={F.test2 - 4} x={110} y={115} w={740} h={330} fill={K.soft} stroke={K.blue} dur={10}>
        <Wr f={f} at={F.test2 + 4} x={480} y={170} fs={32} t="a test set of real examples" dur={18} />
        {[0, 1, 2].map(i => (
          <g key={i}>
            <DCard f={f} at={F.examples + 4 + i * 6} x={140} y={200 + i * 78} w={300} h={62} r={14} dur={6}>
              <Wr f={f} at={F.examples + 8 + i * 6} x={290} y={242 + i * 78} fs={28} t={`question ${i + 1}`} dur={6} />
            </DCard>
            <DLine f={f} at={F.good - 6 + i * 4} x1={455} y1={231 + i * 78} x2={515} y2={231 + i * 78} c={K.grey} w={6} dur={5} head />
            <DCard f={f} at={F.good + i * 6} x={530} y={200 + i * 78} w={290} h={62} r={14} stroke={K.green} dur={6}>
              <Wr f={f} at={F.good + 4 + i * 6} x={675} y={242 + i * 78} fs={28} t="good answer" c={K.green} dur={6} />
            </DCard>
          </g>
        ))}
      </DCard>
      <Wr f={f} at={F.fifty} x={260} y={540} fs={56} t="50" dur={6} />
      <Wr f={f} at={F.hundred2} x={470} y={540} fs={56} t="100" dur={6} />
      <Wr f={f} at={F.more} x={700} y={540} fs={56} t="more…" c={K.blue} dur={8} />
    </g>
  );
  if (f < F.and5 - 6) return ( // RUN ALL → SCORE
    <g>
      <Wr f={f} at={F.every} x={480} y={70} fs={40} t="every change…" c={K.grey} dur={12} />
      <DCard f={f} at={F.prompt - 6} x={60} y={110} w={260} h={90} r={45} fill={K.soft} stroke={K.blue} dur={6}>
        <Wr f={f} at={F.prompt} x={190} y={170} fs={36} t="prompt" c={K.blue} dur={8} />
      </DCard>
      <DCard f={f} at={F.model - 6} x={60} y={220} w={260} h={90} r={45} fill={K.soft} stroke={K.blue} dur={6}>
        <Wr f={f} at={F.model} x={190} y={280} fs={36} t="model" c={K.blue} dur={8} />
      </DCard>
      <DLine f={f} at={F.run - 8} x1={340} y1={210} x2={430} y2={210} c={K.ink} w={8} head />
      <DCard f={f} at={F.run} x={450} y={130} w={440} h={160} fill={K.ink} stroke={K.ink} dur={8}>
        <Wr f={f} at={F.run + 6} x={670} y={200} fs={40} t="RUN ALL TESTS" c="#fff" dur={12} />
        <Wr f={f} at={F.score - 4} x={670} y={258} fs={34} t="→ get a score" c={K.amber} dur={10} />
      </DCard>
      <Wr f={f} at={F.did} x={80} y={390} fs={32} t="before" c={K.grey} a="start" dur={8} />
      <DBar f={f} at={F.did + 6} x={230} y={364} w={420} h={36} c={K.grey} />
      <Wr f={f} at={F.better - 4} x={80} y={480} fs={32} t="after" c={K.grey} a="start" dur={8} />
      <DBar f={f} at={F.better - 2} x={230} y={454} w={560} h={36} c={K.green} />
      <Wr f={f} at={F.better + 10} x={480} y={565} fs={44} t="better… or worse?" c={K.blue} dur={18} />
    </g>
  );
  if (f < F.remember - 6) return ( // FAILURES BECOME TESTS
    <g>
      <DCard f={f} at={F.failure - 8} x={60} y={110} w={300} h={170} fill="#FFF1F0" stroke={K.red} dur={8}>
        <Wr f={f} at={F.failure} x={210} y={180} fs={30} t="user reports" c={K.red} dur={10} />
        <Wr f={f} at={F.failure + 10} x={210} y={235} fs={30} t="a failure" c={K.red} dur={10} />
      </DCard>
      <DLine f={f} at={F.becomes} x1={380} y1={195} x2={500} y2={195} c={K.ink} w={8} head />
      <DCard f={f} at={F.test3 - 6} x={520} y={110} w={380} h={170} fill={K.soft} stroke={K.green} dur={8}>
        <Wr f={f} at={F.test3 - 2} x={710} y={210} fs={48} t="NEW TEST" c={K.green} dur={10} />
      </DCard>
      <Wr f={f} at={F.grows - 12} x={480} y={350} fs={32} t="your eval set:" c={K.grey} dur={10} />
      {[...Array(8)].map((_, i) => <DBar key={i} f={f} at={F.grows + i * 4} x={120 + i * 92} y={490 - (i + 1) * 12} w={70} h={(i + 1) * 12 + 10} c={i === 7 ? K.green : K.blue} dur={6} />)}
      <Wr f={f} at={F.week - 12} x={480} y={560} fs={38} t="grows smarter every week" c={K.green} dur={18} />
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={80} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.one - 6} x={80} y={120} w={800} h={170}>
        <Wr f={f} at={F.one} x={480} y={195} fs={48} t="ONE GOOD DEMO" dur={12} />
        <Wr f={f} at={F.nothing - 4} x={480} y={260} fs={36} t="proves nothing" c={K.red} dur={12} />
      </DCard>
      <DCard f={f} at={F.test4 - 6} x={80} y={320} w={800} h={200} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.test4} x={480} y={405} fs={48} t="TEST SET + SCORE" c={K.blue} dur={14} />
        <Wr f={f} at={F.progress - 6} x={480} y={475} fs={40} t="proves progress" c={K.green} dur={12} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="An agent loop can empty your wallet overnight" tomorrowAt={F.tomorrow} schoolAt={F.agent4 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.you, 0.9], [F.then - 4, 0.9], [F.then, 0.3], [F.people, 0.9],
      [F.remember - 6, 0.9], [F.remember, 0.2], [F.one, 0.9], [F.tomorrow, 0.9], [F.agent4, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.you, "openPalm"], [F.thats, "fingerUp"], [F.evals + 20, "openPalm"], [F.failure, "fingerUp"], [F.grows, "openPalm"],
      [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent4, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.failed, F.failed + 30], [F.then, F.then + 30], [F.random, F.random + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.you - 6, M], [F.you + 10, S],
    [F.then - 6, S], [F.then + 4, Wd], [F.real2 - 6, Wd], [F.real2 + 6, S],
    [F.every - 6, S], [F.every + 10, Wd], [F.prompt - 6, Wd], [F.prompt + 6, S],
    [F.remember - 8, S], [F.remember + 4, Wd], [F.one - 4, Wd], [F.one + 8, S], [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l025" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L25" line1="DEMO ✓" line2="100 USERS ✗" fs1={170} fs3={124} bubble1="NOW WHAT?!" bubble2="the fix: evals" /></AbsoluteFill>
);
