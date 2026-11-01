// Agent School · L6 — "Same AI, 10× Better Answers — Prompting That Works"   projects/l006/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 6, TITLE = "Same AI, 10× Better Answers";
const W = cueFinder(WORDS);
const F = {
  same: W("same"), ten: W("ten"), better: W("better"), answers: W("answers"), welcome: W("welcome"),
  yesterday: W("yesterday"), missing: W("missing"), today: W("today"), give: W("give"),
  write: W("write"), coffee: W("coffee"), youll: W("youll"), generic: W("generic"),
  now: W("now"), four: W("four"), role: W("role"), barista: W("barista"), experience: W("experience"), context: W("context"), instagram: W("instagram"),
  task: W("task"), cold: W("cold"), format: W("format"), fifty: W("fifty"), emoji: W("emoji"), question: W("question"),
  same2: W("same", 2), completely: W("completely"), answer: W("answer"),
  and: W("and"), bonus: W("bonus"), show: W("show"), example: W("example"), good: W("good"), copies: W("copies"), patterns: W("patterns"), descriptions: W("descriptions"),
  vague: W("vague"), guess: W("guess"), clear: W("clear"), removes: W("removes"),
  remember: W("remember"), role2: W("role", 2), context2: W("context", 2), task2: W("task", 2), format2: W("format", 2), show2: W("show", 2),
  tomorrow: W("tomorrow"), agent2: W("agent", 2), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const Pill: React.FC<{ f: number; at: number; x: number; y: number; w: number; t: string; c: string; fs?: number }> = ({ f, at, x, y, w, t, c, fs = 30 }) => (
  <DCard f={f} at={at} x={x} y={y} w={w} h={64} r={32} fill={c} stroke={c} dur={8}>
    <Wr f={f} at={at + 5} x={x + w / 2} y={y + 44} fs={fs} t={t} c="#fff" dur={8} />
  </DCard>
);
const GreyLines: React.FC<{ f: number; at: number; x: number; y: number; w: number; n: number }> = ({ f, at, x, y, w, n }) => (
  <g>{[...Array(n)].map((_, i) => <DBar key={i} f={f} at={at + i * 4} x={x} y={y + i * 34} w={i === n - 1 ? w * 0.6 : w} h={16} c="#D5DCE8" dur={8} />)}</g>
);

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.yesterday - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 6" c={K.blue} dur={10} />
      <Wr f={f} at={F.same} x={480} y={175} fs={76} t="SAME AI." dur={10} />
      <Wr f={f} at={F.ten} x={480} y={300} fs={100} t="10× BETTER" c={K.green} dur={14} />
      <Wr f={f} at={F.answers - 4} x={480} y={385} fs={60} t="ANSWERS" dur={10} />
      <Wr f={f} at={F.answers + 4} x={150} y={466} fs={26} t="before" c={K.grey} a="end" dur={6} />
      <DBar f={f} at={F.answers + 6} x={170} y={446} w={90} h={28} c={K.grey} dur={8} />
      <Wr f={f} at={F.answers + 12} x={150} y={526} fs={26} t="after" c={K.green} a="end" dur={6} />
      <DBar f={f} at={F.answers + 14} x={170} y={506} w={720} h={28} c={K.green} dur={16} />
    </g>
  );
  if (f < F.write - 6) return ( // GIVE IT THE INFORMATION
    <g>
      <Wr f={f} at={F.yesterday} x={480} y={70} fs={30} t="yesterday: AI makes things up" c={K.grey} dur={18} />
      <Wr f={f} at={F.missing - 4} x={480} y={115} fs={30} t="when information is missing" c={K.grey} dur={16} />
      <Wr f={f} at={F.today} x={480} y={220} fs={56} t="TODAY:" c={K.blue} dur={8} />
      <DCard f={f} at={F.give - 8} x={110} y={270} w={740} h={180} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.give} x={480} y={380} fs={52} t="GIVE IT THE INFORMATION" c={K.blue} dur={22} />
      </DCard>
    </g>
  );
  if (f < F.now - 6) return ( // VAGUE PROMPT
    <g>
      <Wr f={f} at={F.write - 6} x={480} y={70} fs={30} t="PROMPT" c={K.grey} dur={6} />
      <DCard f={f} at={F.write - 4} x={110} y={100} w={740} h={100} r={50} fill="#F4F6FA" stroke="#C9D3E6" dur={10}>
        <Wr f={f} at={F.write + 2} x={480} y={165} fs={40} t={"\"Write a post about coffee.\""} dur={20} />
      </DCard>
      <DLine f={f} at={F.youll - 4} x1={480} y1={215} x2={480} y2={265} c={K.amber} w={7} head dur={6} />
      <DCard f={f} at={F.youll} x={170} y={280} w={620} h={250} fill="#fff">
        <GreyLines f={f} at={F.youll + 8} x={220} y={330} w={520} n={5} />
      </DCard>
      <DCard f={f} at={F.generic - 2} x={330} y={385} w={300} h={86} r={14} fill={K.grey} stroke={K.grey} dur={8}>
        <Wr f={f} at={F.generic + 4} x={480} y={442} fs={44} t="GENERIC" c="#fff" dur={8} />
      </DCard>
    </g>
  );
  if (f < F.same2 - 6) { // FOUR INGREDIENTS
    const rows: [number, string, string, string][] = [
      [F.role, "ROLE", "barista, 20 years' experience", K.blue],
      [F.context, "CONTEXT", "for my café's Instagram", K.violet],
      [F.task, "TASK", "one post: our new cold brew", K.green],
      [F.format, "FORMAT", "< 50 words · 1 emoji · end with ?", K.amber],
    ];
    return (
      <g>
        <Wr f={f} at={F.role - 12} x={480} y={75} fs={48} t="4 INGREDIENTS" dur={10} />
        {rows.map(([at, lab, txt, c], i) => (
          <g key={i}>
            <Pill f={f} at={at - 4} x={50} y={120 + i * 115} w={220} t={lab} c={c} />
            <Wr f={f} at={at + 8} x={295} y={164 + i * 115} fs={31} t={txt} a="start" dur={30} />
          </g>
        ))}
      </g>
    );
  }
  if (f < F.and - 6) return ( // SAME MODEL, DIFFERENT ANSWER
    <g>
      <Wr f={f} at={F.same2} x={480} y={80} fs={52} t="SAME MODEL" dur={10} />
      <DCard f={f} at={F.same2 + 8} x={70} y={130} w={380} h={320} fill="#F4F6FA">
        <Wr f={f} at={F.same2 + 14} x={260} y={185} fs={30} t="vague prompt" c={K.grey} dur={10} />
        <GreyLines f={f} at={F.same2 + 18} x={110} y={230} w={300} n={4} />
        <Wr f={f} at={F.same2 + 22} x={260} y={420} fs={34} t="generic" c={K.grey} dur={8} />
      </DCard>
      <DCard f={f} at={F.completely - 8} x={510} y={130} w={380} h={320} fill="#E9F8F0" stroke={K.green}>
        <Wr f={f} at={F.completely - 2} x={700} y={185} fs={30} t="4 ingredients" c={K.green} dur={10} />
        {[0, 1, 2, 3].map((i) => <DBar key={i} f={f} at={F.completely + 6 + i * 4} x={550} y={230 + i * 34} w={i === 3 ? 180 : 300} h={16} c={[K.blue, K.violet, K.green, K.amber][i]} dur={8} />)}
        <Wr f={f} at={F.answer - 6} x={700} y={420} fs={34} t="on target" c={K.green} dur={8} />
      </DCard>
      <Wr f={f} at={F.answer} x={480} y={530} fs={42} t="completely different answer" c={K.blue} dur={18} />
    </g>
  );
  if (f < F.vague - 6) return ( // BONUS: SHOW AN EXAMPLE
    <g>
      <Wr f={f} at={F.bonus - 4} x={480} y={75} fs={48} t="BONUS TRICK" c={K.amber} dur={10} />
      <DCard f={f} at={F.show - 6} x={110} y={110} w={740} h={150} fill="#FFF7EC" stroke={K.amber}>
        <Wr f={f} at={F.show} x={480} y={180} fs={44} t="SHOW AN EXAMPLE" dur={12} />
        <Wr f={f} at={F.good - 6} x={480} y={232} fs={30} t="of what good looks like" c={K.grey} dur={14} />
      </DCard>
      <Wr f={f} at={F.copies - 4} x={480} y={330} fs={34} t="AI copies…" dur={10} />
      <Wr f={f} at={F.patterns - 4} x={60} y={420} fs={32} t="patterns" c={K.green} a="start" dur={8} />
      <DBar f={f} at={F.patterns} x={300} y={396} w={580} h={34} c={K.green} />
      <Wr f={f} at={F.descriptions - 6} x={60} y={510} fs={32} t="descriptions" c={K.grey} a="start" dur={10} />
      <DBar f={f} at={F.descriptions + 2} x={300} y={486} w={300} h={34} c={K.grey} />
    </g>
  );
  if (f < F.remember - 6) return ( // VAGUE vs CLEAR
    <g>
      <DCard f={f} at={F.vague - 6} x={70} y={70} w={820} h={220} fill="#FDECEB" stroke={K.red}>
        <Wr f={f} at={F.vague} x={480} y={150} fs={48} t="VAGUE PROMPT" c={K.red} dur={12} />
        <Wr f={f} at={F.guess - 10} x={480} y={240} fs={40} t="→ the model guesses ? ? ?" dur={18} />
      </DCard>
      <DCard f={f} at={F.clear - 6} x={70} y={320} w={820} h={220} fill="#E9F8F0" stroke={K.green}>
        <Wr f={f} at={F.clear} x={480} y={400} fs={48} t="CLEAR PROMPT" c={K.green} dur={12} />
        <Wr f={f} at={F.removes - 2} x={480} y={490} fs={40} t="→ no more guessing" dur={16} />
      </DCard>
      <DTick f={f} at={F.removes + 18} x={820} y={475} ok s={0.6} />
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={90} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <Pill f={f} at={F.role2 - 4} x={70} y={160} w={390} t="ROLE" c={K.blue} fs={38} />
      <Pill f={f} at={F.context2} x={500} y={160} w={390} t="CONTEXT" c={K.violet} fs={38} />
      <Pill f={f} at={F.task2 - 2} x={70} y={250} w={390} t="TASK" c={K.green} fs={38} />
      <Pill f={f} at={F.format2 - 2} x={500} y={250} w={390} t="FORMAT" c={K.amber} fs={38} />
      <DCard f={f} at={F.show2 - 8} x={110} y={380} w={740} h={150} fill="#FFF7EC" stroke={K.amber}>
        <Wr f={f} at={F.show2} x={480} y={475} fs={52} t="+ SHOW AN EXAMPLE" dur={14} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="The secret message before everything you type" tomorrowAt={F.tomorrow} schoolAt={F.agent2 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.yesterday, 0.9], [F.now - 6, 0.9], [F.now + 2, 0.2], [F.role - 12, 0.9],
      [F.remember - 6, 0.2], [F.role2 - 4, 0.9], [F.tomorrow, 0.9], [F.agent2, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.yesterday, "openPalm"], [F.now, "fingerUp"], [F.role, "openPalm"], [F.bonus, "fingerUp"], [F.show, "openPalm"],
      [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent2, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.ten, F.ten + 40], [F.generic, F.generic + 30], [F.completely, F.completely + 30], [F.bonus, F.bonus + 25]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.yesterday - 6, M], [F.yesterday + 10, S],
    [F.now - 8, S], [F.now + 4, Fc], [F.role - 16, Fc], [F.role - 4, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l006" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L6" line1="SAME AI" strike="GENERIC" line2="10× BETTER" fs2={150} bubble1="THE 4 KEYS" bubble2="the prompt formula" /></AbsoluteFill>
);
