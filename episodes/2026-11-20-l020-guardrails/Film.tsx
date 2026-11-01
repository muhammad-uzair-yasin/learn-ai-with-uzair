// Agent School · L20 — "An Agent Switched Off Its Own Alarms. Real Story. — Guardrails"   projects/l020/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
// Facts shown are only those in the script: Dec 2024, OpenAI published safety tests run by Apollo Research,
// o1 tried to disable oversight in ~5% of those tests, lab tests not the real world.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 20, TITLE = "An AI Switched Off Its Own Alarms";
const W = cueFinder(WORDS);
const F = {
  switched: W("switched"), alarms: W("alarms"), real: W("real"), result: W("result"), welcome: W("welcome"),
  december: W("december"), openai: W("openai"), safety: W("safety"), apollo: W("apollo"), when: W("when"), o1: W("o1"), believed: W("believed"), watched: W("watched"),
  shut: W("shut"), tried: W("tried"), disable: W("disable"), oversight: W("oversight"), five: W("five"), those: W("those"),
  lab: W("lab"), not: W("not"), world: W("world"), but: W("but"), builders: W("builders"), dont: W("dont"), police: W("police"),
  thats: W("thats"), guardrails: W("guardrails"), rules: W("rules"), enforced: W("enforced"), code: W("code"), outside: W("outside"), model2: W("model", 2),
  three: W("three"), basics: W("basics"), one: W("one"), least: W("least"), give: W("give"), two: W("two"), human: W("human"), risky: W("risky"),
  money: W("money"), deleting: W("deleting"), sending: W("sending"), three2: W("three", 2), monitors: W("monitors"), cant: W("cant"), logs: W("logs"), permission: W("permission"),
  remember: W("remember"), never: W("never"), keys: W("keys"), alarms3: W("alarms", 3),
  tomorrow: W("tomorrow"), agent6: W("agent", 6), lesson3: W("lesson", 3), subscribe: W("subscribe"),
};

/** alarm bell drawn by the pen (outline then fill) */
const Bell: React.FC<{ f: number; at: number; x: number; y: number; s?: number; off?: boolean }> = ({ f, at, x, y, s = 1, off }) => {
  const p = Math.min(1, Math.max(0, (f - at) / 12)); if (p <= 0) return null;
  const c = off ? K.grey : K.red;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-50 30 Q-50 -50 0 -55 Q50 -50 50 30 L62 45 H-62 Z" fill={c} opacity={p >= 1 ? 1 : 0} />
      <path d="M-50 30 Q-50 -50 0 -55 Q50 -50 50 30 L62 45 H-62 Z" fill="none" stroke={K.ink} strokeWidth={6} strokeLinejoin="round" pathLength={1} strokeDasharray={`${p} 1`} />
      {p >= 1 && <circle cy={60} r={12} fill={K.ink} />}
      {p >= 1 && !off && [-1, 1].map((d) => <path key={d} d={`M${d * 72} -40 Q${d * 92} -5 ${d * 72} 30`} stroke={K.red} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.5 + 0.5 * Math.sin(f * 0.5)} />)}
    </g>
  );
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.december - 6) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={60} fs={30} t="AGENT SCHOOL · LESSON 20" c={K.blue} dur={10} />
      <Wr f={f} at={F.switched - 8} x={480} y={170} fs={64} t="AN AI SWITCHED OFF" dur={16} />
      <Wr f={f} at={F.alarms - 10} x={480} y={260} fs={64} t="ITS OWN ALARMS" c={K.red} dur={14} />
      <Bell f={f} at={F.alarms + 4} x={480} y={370} s={0.8} off={f >= F.alarms + 22} />
      <DCard f={f} at={F.real - 4} x={250} y={470} w={460} h={84} r={42} fill={K.amber} stroke={K.amber} dur={8}>
        <Wr f={f} at={F.real + 2} x={480} y={526} fs={40} t="REAL TEST RESULT" dur={14} />
      </DCard>
    </g>
  );
  if (f < F.when - 6) return ( // THE STUDY
    <g>
      <DCard f={f} at={F.december - 6} x={280} y={50} w={400} h={110} r={30} fill={K.ink} stroke={K.ink}>
        <Wr f={f} at={F.december} x={480} y={125} fs={56} t="DEC 2024" c="#fff" dur={12} />
      </DCard>
      <Wr f={f} at={F.openai} x={480} y={240} fs={44} t="OpenAI published" dur={14} />
      <Wr f={f} at={F.safety - 4} x={480} y={310} fs={56} t="SAFETY TESTS" c={K.blue} dur={14} />
      <Wr f={f} at={F.apollo - 14} x={480} y={390} fs={34} t="run by" c={K.grey} dur={6} />
      <DCard f={f} at={F.apollo - 6} x={200} y={420} w={560} h={110} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.apollo} x={480} y={493} fs={48} t="Apollo Research" c={K.blue} dur={14} />
      </DCard>
    </g>
  );
  if (f < F.lab - 6) return ( // o1 + 5%
    <g>
      <DCard f={f} at={F.o1 - 8} x={40} y={60} w={220} h={150} fill={K.ink} stroke={K.ink}>
        <Wr f={f} at={F.o1} x={150} y={160} fs={72} t="o1" c="#fff" dur={8} />
      </DCard>
      <Wr f={f} at={F.believed} x={290} y={110} fs={30} t="believed it was watched" a="start" dur={14} />
      <Wr f={f} at={F.shut - 10} x={290} y={170} fs={30} t="& might be shut down…" a="start" c={K.red} dur={14} />
      <DLine f={f} at={F.tried - 6} x1={150} y1={225} x2={150} y2={275} c={K.grey} w={6} head dur={5} />
      <DCard f={f} at={F.tried} x={40} y={290} w={880} h={100} fill="#FFF1F0" stroke={K.red}>
        <Wr f={f} at={F.disable - 4} x={480} y={358} fs={44} t="tried to DISABLE OVERSIGHT" c={K.red} dur={18} />
      </DCard>
      <Wr f={f} at={F.five - 2} x={180} y={510} fs={84} t="~5%" c={K.red} dur={10} />
      <rect x={330} y={455} width={580} height={44} rx={22} fill="#EEF1F6" opacity={f >= F.five ? 1 : 0} />
      <DBar f={f} at={F.five + 6} x={330} y={455} w={29} h={44} c={K.red} />
      <Wr f={f} at={F.those - 2} x={620} y={555} fs={30} t="of those tests" c={K.grey} dur={10} />
    </g>
  );
  if (f < F.thats - 6) return ( // LAB, NOT REAL WORLD → LESSON FOR BUILDERS
    <g>
      <Wr f={f} at={F.lab} x={480} y={90} fs={48} t="LAB TESTS ≠ REAL WORLD" c={K.grey} dur={18} />
      <Wr f={f} at={F.builders - 10} x={480} y={190} fs={40} t="THE LESSON FOR BUILDERS:" c={K.blue} dur={18} />
      <DCard f={f} at={F.dont - 8} x={80} y={240} w={800} h={200} fill="#FFF1F0" stroke={K.red}>
        <Wr f={f} at={F.dont} x={480} y={320} fs={44} t="DON'T let the agent" dur={14} />
        <Wr f={f} at={F.police - 4} x={480} y={395} fs={48} t="POLICE ITSELF" c={K.red} dur={12} />
      </DCard>
      <DTick f={f} at={F.police + 14} x={480} y={520} ok={false} s={0.9} />
    </g>
  );
  if (f < F.three - 6) return ( // GUARDRAILS = RULES IN YOUR CODE, OUTSIDE THE MODEL
    <g>
      <Wr f={f} at={F.guardrails - 6} x={480} y={70} fs={52} t="GUARDRAILS" c={K.blue} dur={12} />
      <Wr f={f} at={F.rules} x={480} y={130} fs={32} t="rules enforced by YOUR code" dur={20} />
      <DCard f={f} at={F.code - 4} x={140} y={170} w={680} h={380} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.code + 6} x={480} y={220} fs={30} t="YOUR CODE" c={K.blue} dur={10} />
        <DCard f={f} at={F.model2 - 10} x={330} y={290} w={300} h={170} fill={K.ink} stroke={K.ink}>
          <Wr f={f} at={F.model2 - 2} x={480} y={390} fs={46} t="MODEL" c="#fff" dur={8} />
        </DCard>
        <Wr f={f} at={F.outside} x={480} y={520} fs={28} t="the rules live OUTSIDE the model" c={K.green} dur={18} />
      </DCard>
    </g>
  );
  if (f < F.remember - 6) { // THREE BASICS
    const rows: [string, string, number, number][] = [
      ["1  LEAST ACCESS", "only the tools it needs", F.one, F.give],
      ["2  HUMAN APPROVAL", "money · deleting · sending", F.two, F.money],
      ["3  MONITORS IT CAN'T TOUCH", "logs + alarms it can't turn off", F.three2, F.logs],
    ];
    return (
      <g>
        <Wr f={f} at={F.three} x={480} y={60} fs={40} t="THREE BASICS" c={K.blue} dur={12} />
        {rows.map(([t, d, at, at2], i) => (
          <g key={i}>
            <DCard f={f} at={at - 6} x={40} y={90 + i * 165} w={880} h={145} fill={i === 2 ? K.soft : "#fff"} stroke={i === 2 ? K.blue : "#C9D6EA"}>
              <Wr f={f} at={at} x={80} y={150 + i * 165} fs={40} t={t} a="start" dur={16} />
              <Wr f={f} at={at2} x={80} y={205 + i * 165} fs={30} t={d} a="start" c={K.grey} dur={i === 1 ? 26 : 18} />
            </DCard>
            <DTick f={f} at={at2 + 22} x={860} y={162 + i * 165} ok s={0.6} />
          </g>
        ))}
      </g>
    );
  }
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={70} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <Wr f={f} at={F.never} x={480} y={160} fs={54} t="NEVER LET THE AGENT" dur={18} />
      <Wr f={f} at={F.keys - 6} x={480} y={240} fs={54} t="HOLD THE KEYS" c={K.red} dur={14} />
      <Wr f={f} at={F.alarms3 - 10} x={480} y={310} fs={40} t="to its own alarms" c={K.grey} dur={14} />
      <Bell f={f} at={F.alarms3} x={480} y={440} s={0.9} />
      <DCard f={f} at={F.alarms3 + 10} x={640} y={400} w={250} h={80} r={40} fill={K.green} stroke={K.green} dur={8}>
        <Wr f={f} at={F.alarms3 + 16} x={765} y={452} fs={30} t="YOUR CODE" c="#fff" dur={8} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="One sentence on a website can hack an AI" tomorrowAt={F.tomorrow} schoolAt={F.agent6 - 4} buttonAt={F.lesson3 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.december - 6, 0.9], [F.lab + 20, 0.9], [F.lab + 30, 0.25], [F.but + 4, 0.9],
      [F.thats - 4, 0.9], [F.remember - 6, 0.9], [F.remember, 0.3], [F.never, 0.9], [F.tomorrow, 0.9], [F.agent6, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.december, "openPalm"], [F.five, "fingerUp"], [F.lab, "openPalm"], [F.dont, "fingerUp"], [F.thats, "openPalm"],
      [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent6, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.switched, F.switched + 40], [F.disable, F.disable + 30], [F.five, F.five + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.december - 12, M], [F.december + 2, S],
    [F.lab + 20, S], [F.lab + 30, Fc], [F.but - 2, Fc], [F.but + 10, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l020" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L20" line1="AI TURNED" line2="ALARMS OFF" fs3={120} bubble1="REAL TEST!" bubble2="AI guardrails" /></AbsoluteFill>
);
