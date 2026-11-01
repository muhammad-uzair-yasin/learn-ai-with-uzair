// Agent School · L30 — "Our Agent Goes Live Today — Final Lesson of Month 1"   projects/l030/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 30, TITLE = "Our Agent Goes Live (Month 1 Finale)";
const W = cueFinder(WORDS);
const F = {
  our: W("our"), live: W("live"), today: W("today"), welcome: W("welcome"), final: W("final"),
  yesterday: W("yesterday"), wrote: W("wrote"), now: W("now"), run: W("run"),
  question: W("question"), thirtyone: W("thirtyone"), lahore: W("lahore"), whats: W("whats"),
  think: W("think"), need: W("need"), act: W("act"), calculate: W("calculate"), observe: W("observe"), eightyseven: W("eightyseven"),
  answer: W("answer"), eightyeight: W("eightyeight"), two: W("two"), done: W("done"),
  now2: W("now", 2), guardrail: W("guardrail"), rule: W("rule"), any: W("any"), sends: W("sends"), human: W("human"), first: W("first"),
  ask: W("ask"), cant: W("cant"), alone: W("alone"),
  thirty: W("thirty"), mystery: W("mystery"), now3: W("now", 3), predicts: W("predicts"), learns: W("learns"), remembers: W("remembers"), uses: W("uses"), safe: W("safe"),
  next: W("next"), build: W("build"), four: W("four"), agents: W("agents"), built: W("built"),
  remember: W("remember"), dont: W("dont"), use: W("use"), anymore: W("anymore"), you3: W("you", 3), build2: W("build", 2),
  this: W("this"), school: W("school"), two2: W("two", 2), subscribe: W("subscribe"),
};

const MONO = "DejaVu Sans Mono, monospace";
const cl = (v: number) => Math.max(0, Math.min(1, v));
/** Terminal/code card whose lines are typed at their own cue frames: [text, at, colour?]. */
const Code: React.FC<{ f: number; at: number; x: number; y: number; w: number; rows: number; fs?: number; title?: string; lines: [string, number, string?][] }> = ({ f, at, x, y, w, rows, fs = 26, title = "agent.py", lines }) => (
  <DCard f={f} at={at} x={x} y={y} w={w} h={64 + rows * fs * 1.45} fill="#0F1726" stroke="#0F1726">
    <rect x={x} y={y} width={w} height={44} rx={22} fill="#1B2538" />
    {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <circle key={i} cx={x + 26 + i * 22} cy={y + 22} r={7} fill={c} />)}
    <text x={x + w / 2} y={y + 30} textAnchor="middle" fontFamily={MONO} fontSize={18} fill="#8B949E">{title}</text>
    {lines.map(([l, t0, c], i) => { const n = Math.round(l.length * cl((f - t0) / Math.max(6, l.length * 0.55)));
      return n > 0 ? <text key={i} x={x + 24} y={y + 50 + fs * 1.1 + i * fs * 1.45} fontFamily={MONO} fontSize={fs} fill={c ?? (l.trim().startsWith("#") ? "#7EE787" : "#E6EDF3")} xmlSpace="preserve">{l.slice(0, n)}</text> : null; })}
  </DCard>
);

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.yesterday - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 30 · FINALE" c={K.blue} dur={12} />
      <Wr f={f} at={F.our} x={480} y={210} fs={84} t="OUR AGENT" dur={12} />
      <Wr f={f} at={F.live - 6} x={480} y={330} fs={84} t="GOES LIVE" c={K.blue} dur={12} />
      <DCard f={f} at={F.today} x={330} y={390} w={300} h={100} r={50} fill={K.red} stroke={K.red} dur={8}>
        <circle cx={385} cy={440} r={14} fill="#fff" opacity={0.6 + 0.4 * Math.sin(f * 0.3)} />
        <Wr f={f} at={F.today + 6} x={500} y={458} fs={48} t="TODAY" c="#fff" dur={8} />
      </DCard>
      <Wr f={f} at={F.final} x={480} y={560} fs={32} t="final lesson of month 1" c={K.grey} dur={16} />
    </g>
  );
  if (f < F.question - 6) return ( // WROTE IT → RUN IT
    <g>
      <DCard f={f} at={F.yesterday - 2} x={80} y={110} w={800} h={160} dur={10}>
        <Wr f={f} at={F.yesterday + 6} x={140} y={210} fs={44} t="yesterday: we WROTE it" a="start" dur={16} />
        <DTick f={f} at={F.wrote + 6} x={810} y={190} ok s={0.8} />
      </DCard>
      <DCard f={f} at={F.now - 6} x={80} y={320} w={800} h={160} fill="#ECFAF3" stroke={K.green} dur={10}>
        <Wr f={f} at={F.now} x={140} y={420} fs={44} t="today: let's RUN it" c={K.green} a="start" dur={14} />
        <path d="M790 370 L840 400 L790 430 Z" fill={K.green} opacity={f >= F.run + 6 ? 1 : 0} />
      </DCard>
    </g>
  );
  if (f < F.now2 - 6) return ( // THE LIVE RUN
    <g>
      <Code f={f} at={F.question - 4} x={40} y={40} w={880} rows={8} fs={27} title="python agent.py" lines={[
        ["USER    It's 31 degrees in Lahore.", F.thirtyone - 4, "#79C0FF"],
        ["        What's that in Fahrenheit?", F.whats, "#79C0FF"],
        ["", 0],
        ["THINK   I need math", F.think],
        ["ACT     calculate(31 * 9/5 + 32)", F.act, "#FFA657"],
        ["OBSERVE 87.8", F.observe],
        ["ANSWER  About 88 degrees Fahrenheit.", F.answer, "#7EE787"],
        ["", 0]]} />
      <DCard f={f} at={F.two - 6} x={250} y={470} w={460} h={100} r={50} fill="#ECFAF3" stroke={K.green} dur={8}>
        <Wr f={f} at={F.two} x={450} y={535} fs={42} t="2 steps. Done." c={K.green} dur={10} />
        <DTick f={f} at={F.done} x={650} y={520} ok s={0.55} />
      </DCard>
    </g>
  );
  if (f < F.thirty - 6) return ( // ADD A GUARDRAIL
    <g>
      <Wr f={f} at={F.now2} x={480} y={66} fs={44} t="+ A GUARDRAIL" c={K.red} dur={12} />
      <Code f={f} at={F.rule - 8} x={40} y={96} w={880} rows={3} fs={28} lines={[
        ["# rule in code", F.rule],
        ["if tool.sends or tool.deletes:", F.any],
        ['    need_human_yes_first()', F.human, "#FFA657"]]} />
      <DCard f={f} at={F.ask - 10} x={60} y={330} w={400} h={220} fill="#ECFAF3" stroke={K.green} dur={8}>
        <Wr f={f} at={F.ask - 4} x={260} y={410} fs={36} t="agent can ASK" c={K.green} dur={10} />
        <DTick f={f} at={F.ask + 8} x={260} y={485} ok s={0.8} />
      </DCard>
      <DCard f={f} at={F.cant - 6} x={500} y={330} w={400} h={220} fill="#FFF1F0" stroke={K.red} dur={8}>
        <Wr f={f} at={F.cant} x={700} y={410} fs={36} t="can't act ALONE" c={K.red} dur={10} />
        <DTick f={f} at={F.alone + 4} x={700} y={485} ok={false} s={0.8} />
      </DCard>
    </g>
  );
  if (f < F.next - 6) { // 30 LESSONS: MYSTERY → YOU KNOW
    const C: [string, number][] = [["predicts", F.predicts], ["learns", F.learns], ["remembers", F.remembers], ["uses tools", F.uses], ["stays safe", F.safe]];
    return (
      <g>
        <Wr f={f} at={F.thirty} x={480} y={70} fs={34} t="30 lessons ago…" c={K.grey} dur={12} />
        <DCard f={f} at={F.mystery - 10} x={330} y={100} w={300} h={120} fill={K.ink} stroke={K.ink} dur={8}>
          <Wr f={f} at={F.mystery - 2} x={480} y={180} fs={50} t="AI = ???" c={K.amber} dur={8} />
        </DCard>
        <DLine f={f} at={F.now3 - 4} x1={480} y1={230} x2={480} y2={290} c={K.ink} w={7} head dur={6} />
        <Wr f={f} at={F.now3} x={480} y={330} fs={36} t="now you know how it…" c={K.blue} dur={14} />
        {C.map(([t, at], i) => { const x = 32 + i * 182; return (
          <DCard key={i} f={f} at={at - 6} x={x} y={370} w={174} h={150} fill={K.soft} stroke={K.blue} dur={6}>
            <DTick f={f} at={at + 2} x={x + 87} y={420} ok s={0.5} />
            <Wr f={f} at={at} x={x + 87} y={490} fs={26} t={t} c={K.blue} dur={8} />
          </DCard>); })}
      </g>
    );
  }
  if (f < F.remember - 6) return ( // MONTH 2 = BUILD MONTH
    <g>
      <Wr f={f} at={F.next} x={480} y={80} fs={36} t="next month is…" c={K.grey} dur={10} />
      <Wr f={f} at={F.build - 2} x={480} y={170} fs={76} t="BUILD MONTH" c={K.blue} dur={12} />
      {[0, 1, 2, 3].map(i => (
        <DCard key={i} f={f} at={F.four + i * 6} x={60 + i * 215} y={230} w={195} h={220} fill="#ECFAF3" stroke={K.green} dur={6}>
          <Wr f={f} at={F.agents + i * 4} x={157 + i * 215} y={320} fs={30} t="AGENT" c={K.green} dur={6} />
          <Wr f={f} at={F.agents + 4 + i * 4} x={157 + i * 215} y={400} fs={64} t={`${i + 1}`} c={K.green} dur={6} />
        </DCard>
      ))}
      <Wr f={f} at={F.built} x={480} y={530} fs={40} t="real agents, built step by step" dur={18} />
    </g>
  );
  if (f < F.this - 4) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={80} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <Wr f={f} at={F.dont - 2} x={480} y={190} fs={46} t="you don't just USE AI anymore" dur={20} />
      <DCard f={f} at={F.you3 - 6} x={110} y={260} w={740} h={230} fill={K.soft} stroke={K.blue} dur={10}>
        <Wr f={f} at={F.you3} x={480} y={350} fs={46} t="YOU CAN" dur={8} />
        <Wr f={f} at={F.build2} x={480} y={445} fs={80} t="BUILD IT." c={K.blue} dur={10} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} nextLabel="MONTH 2 → BUILD MONTH" next="4 real agents, built step by step" tomorrowAt={F.this} schoolAt={F.school} buttonAt={F.two2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.yesterday, 0.9], [F.thirty - 6, 0.9], [F.thirty, 0.3], [F.mystery, 0.9],
      [F.remember - 6, 0.9], [F.remember, 0.2], [F.dont, 0.9], [F.this, 0.9], [F.school + 10, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.yesterday, "openPalm"], [F.two, "fingerUp"], [F.now2, "openPalm"], [F.rule, "fingerUp"], [F.ask, "openPalm"],
      [F.thirty, "openPalm"], [F.next, "fingerUp"], [F.four + 20, "openPalm"], [F.remember - 4, "fingerUp"], [F.this, "openPalm"], [F.school + 10, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.live, F.live + 30], [F.eightyeight, F.eightyeight + 30], [F.mystery, F.mystery + 30], [F.build, F.build + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.yesterday - 6, M], [F.yesterday + 10, S],
    [F.thirty - 6, S], [F.thirty + 6, Wd], [F.mystery - 12, Wd], [F.mystery, S],
    [F.next - 6, S], [F.next + 6, Wd], [F.build - 8, Wd], [F.build + 4, S],
    [F.remember - 6, S], [F.remember + 10, Wd], [F.dont - 4, S],
    [F.this - 6, S], [F.this + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l030" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L30" line1="OUR AGENT" line2="GOES LIVE" fs1={150} fs3={140} bubble1="FINAL LESSON" bubble2="month 1 finale" /></AbsoluteFill>
);
