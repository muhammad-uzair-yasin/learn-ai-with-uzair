// Agent School · L17 — "Your Agent Remembers You… Selectively — Agent Memory"   projects/l017/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 17, TITLE = "Your Agent Remembers You… Selectively";
const W = cueFinder(WORDS);
const F = {
  your: W("your"), selectively: W("selectively"), welcome: W("welcome"), we: W("we"), context: W("context"), shortterm: W("shortterm"), wiped: W("wiped"),
  how: W("how"), week: W("week"), longterm: W("longterm"), outside: W("outside"), database: W("database"), saves: W("saves"), prefers: W("prefers"),
  project: W("project"), next2: W("next", 2), searches: W("searches"), embeddings: W("embeddings"), pulls: W("pulls"), relevant: W("relevant"), window2: W("window", 2),
  doesnt: W("doesnt"), whole: W("whole"), picks: W("picks"), now: W("now"), deciding: W("deciding"), forget: W("forget"), old: W("old"), stale: W("stale"),
  private: W("private"), shouldnt: W("shouldnt"), good: W("good"), teammate: W("teammate"), stranger: W("stranger"), morning: W("morning"),
  remember2: W("remember", 2), shortterm2: W("shortterm", 2), longterm2: W("longterm", 2), searches2: W("searches", 2),
  tomorrow: W("tomorrow"), agent7: W("agent", 7), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.we - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 17" c={K.blue} dur={10} />
      <Wr f={f} at={F.your} x={480} y={220} fs={84} t="YOUR AGENT" dur={10} />
      <Wr f={f} at={F.your + 10} x={480} y={330} fs={84} t="REMEMBERS YOU" c={K.blue} dur={14} />
      <DCard f={f} at={F.selectively - 6} x={250} y={400} w={460} h={100} r={50} fill={K.amber} stroke={K.amber} dur={8}>
        <Wr f={f} at={F.selectively} x={480} y={468} fs={52} t="…SELECTIVELY" c={K.ink} dur={14} />
      </DCard>
    </g>
  );
  if (f < F.longterm - 6) { // SHORT-TERM = CONTEXT WINDOW, WIPED
    const wiped = f >= F.wiped + 4;
    return (
      <g>
        <Wr f={f} at={F.context - 6} x={480} y={80} fs={48} t="CONTEXT WINDOW" c={K.blue} dur={14} />
        <DCard f={f} at={F.context + 4} x={180} y={120} w={600} h={240} fill={K.soft} stroke={K.blue}>
          <Wr f={f} at={F.shortterm} x={480} y={200} fs={44} t="SHORT-TERM MEMORY" dur={16} />
          {!wiped && <Wr f={f} at={F.shortterm + 14} x={480} y={280} fs={30} t="today's chat, your name, the task…" c={K.grey} dur={20} />}
          {wiped && <Wr f={f} at={F.wiped + 4} x={480} y={290} fs={60} t="WIPED" c={K.red} dur={8} />}
        </DCard>
        <DLine f={f} at={F.wiped} x1={200} y1={340} x2={760} y2={140} c={K.red} w={10} dur={8} />
        <Wr f={f} at={F.how - 4} x={480} y={450} fs={40} t="so how does it remember you" dur={20} />
        <Wr f={f} at={F.week - 6} x={480} y={530} fs={56} t="NEXT WEEK?" c={K.amber} dur={10} />
      </g>
    );
  }
  if (f < F.next2 - 6) return ( // LONG-TERM = DATABASE OUTSIDE THE MODEL
    <g>
      <Wr f={f} at={F.longterm} x={480} y={70} fs={46} t="LONG-TERM MEMORY" c={K.blue} dur={14} />
      <DCard f={f} at={F.outside - 6} x={40} y={130} w={250} h={160} fill={K.ink} stroke={K.ink}>
        <Wr f={f} at={F.outside + 2} x={165} y={225} fs={44} t="MODEL" c="#fff" dur={10} />
      </DCard>
      <Wr f={f} at={F.outside + 10} x={165} y={330} fs={26} t="(forgets)" c={K.grey} dur={8} />
      <DLine f={f} at={F.saves - 4} x1={310} y1={210} x2={420} y2={210} c={K.blue} w={8} head />
      <Wr f={f} at={F.saves} x={365} y={180} fs={26} t="saves" c={K.blue} dur={6} />
      <DCard f={f} at={F.database - 6} x={440} y={110} w={480} h={420} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.database} x={680} y={175} fs={44} t="DATABASE" c={K.blue} dur={12} />
        <DCard f={f} at={F.prefers - 6} x={470} y={220} w={420} h={110} fill="#fff" stroke="#C9D6EA">
          <Wr f={f} at={F.prefers} x={680} y={290} fs={30} t="prefers short answers" dur={14} />
        </DCard>
        <DCard f={f} at={F.project - 6} x={470} y={360} w={420} h={110} fill="#fff" stroke="#C9D6EA">
          <Wr f={f} at={F.project} x={680} y={430} fs={30} t="deadline: Friday" dur={14} />
        </DCard>
      </DCard>
      <Wr f={f} at={F.outside} x={250} y={450} fs={32} t="lives OUTSIDE" c={K.green} dur={10} />
      <Wr f={f} at={F.outside + 10} x={250} y={500} fs={32} t="the model" c={K.green} dur={8} />
    </g>
  );
  if (f < F.doesnt - 6) { // SEARCH → ONLY RELEVANT → CONTEXT
    const facts = ["likes Python", "prefers short answers", "dog named Max", "deadline: Friday", "lives in Lahore"];
    const rel = [false, true, false, true, false];
    return (
      <g>
        <Wr f={f} at={F.next2} x={480} y={70} fs={44} t="NEXT TIME: SEARCH MEMORY" dur={18} />
        <DCard f={f} at={F.searches - 4} x={30} y={110} w={420} h={400} fill={K.soft} stroke={K.blue}>
          <Wr f={f} at={F.searches + 4} x={240} y={160} fs={32} t="DATABASE" c={K.blue} dur={8} />
          {facts.map((t, i) => <Wr key={i} f={f} at={F.searches + 10 + i * 5} x={60} y={225 + i * 62} fs={28} t={t} a="start" c={rel[i] && f >= F.relevant ? K.green : K.ink} dur={8} />)}
        </DCard>
        <Wr f={f} at={F.embeddings - 2} x={480} y={570} fs={30} t="often with embeddings" c={K.violet} dur={14} />
        <DLine f={f} at={F.pulls} x1={470} y1={310} x2={600} y2={310} c={K.green} w={8} head />
        <Wr f={f} at={F.pulls + 2} x={535} y={280} fs={26} t="pulls" c={K.green} dur={6} />
        <DCard f={f} at={F.relevant - 4} x={620} y={160} w={310} h={300} fill="#fff" stroke={K.green}>
          <Wr f={f} at={F.relevant + 4} x={775} y={210} fs={26} t="CONTEXT WINDOW" c={K.blue} dur={10} />
          <Wr f={f} at={F.relevant + 14} x={775} y={290} fs={26} t="short answers" c={K.green} dur={10} />
          <Wr f={f} at={F.relevant + 24} x={775} y={360} fs={26} t="deadline Friday" c={K.green} dur={10} />
          <Wr f={f} at={F.window2} x={775} y={430} fs={26} t="only these 2" c={K.grey} dur={8} />
        </DCard>
      </g>
    );
  }
  if (f < F.deciding - 6) return ( // NOT YOUR WHOLE LIFE
    <g>
      <Wr f={f} at={F.doesnt - 4} x={480} y={170} fs={48} t="REPLAY YOUR WHOLE LIFE" c={K.grey} dur={16} />
      <DLine f={f} at={F.whole + 10} x1={160} y1={150} x2={800} y2={156} c={K.red} w={12} dur={8} />
      <DCard f={f} at={F.picks - 6} x={130} y={270} w={700} h={200} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.picks} x={480} y={350} fs={52} t="PICK WHAT MATTERS" c={K.blue} dur={14} />
        <Wr f={f} at={F.now - 8} x={480} y={430} fs={48} t="RIGHT NOW" c={K.green} dur={10} />
      </DCard>
    </g>
  );
  if (f < F.good - 6) return ( // FORGETTING
    <g>
      <Wr f={f} at={F.deciding} x={480} y={70} fs={44} t="DECIDING WHAT TO FORGET" c={K.blue} dur={18} />
      <DCard f={f} at={F.old - 6} x={40} y={120} w={420} h={330}>
        <Wr f={f} at={F.old} x={250} y={190} fs={38} t="OLD FACTS" dur={10} />
        <Wr f={f} at={F.old + 10} x={250} y={260} fs={28} t="deadline: last May" c={K.grey} dur={12} />
        <Wr f={f} at={F.stale - 2} x={250} y={350} fs={44} t="GO STALE" c={K.amber} dur={10} />
      </DCard>
      <DCard f={f} at={F.private - 6} x={500} y={120} w={420} h={330}>
        <Wr f={f} at={F.private} x={710} y={190} fs={38} t="PRIVATE THINGS" dur={12} />
        <Wr f={f} at={F.shouldnt - 2} x={710} y={260} fs={28} t="passwords, health…" c={K.grey} dur={12} />
        <Wr f={f} at={F.shouldnt + 12} x={710} y={350} fs={44} t="DON'T SAVE" c={K.red} dur={10} />
      </DCard>
      <DTick f={f} at={F.stale + 10} x={250} y={520} ok={false} s={0.8} />
      <DTick f={f} at={F.shouldnt + 26} x={710} y={520} ok={false} s={0.8} />
    </g>
  );
  if (f < F.remember2 - 6) return ( // TEAMMATE VS STRANGER
    <g>
      <Wr f={f} at={F.good} x={480} y={80} fs={48} t="GOOD MEMORY =" dur={12} />
      <DCard f={f} at={F.teammate - 8} x={60} y={140} w={400} h={260} fill={K.soft} stroke={K.green}>
        <Wr f={f} at={F.teammate} x={260} y={250} fs={48} t="TEAMMATE" c={K.green} dur={10} />
        <Wr f={f} at={F.teammate + 10} x={260} y={320} fs={28} t="knows your work" c={K.grey} dur={10} />
      </DCard>
      <DCard f={f} at={F.stranger - 4} x={500} y={140} w={400} h={260}>
        <Wr f={f} at={F.stranger + 2} x={700} y={250} fs={48} t="STRANGER" c={K.red} dur={10} />
        <Wr f={f} at={F.morning - 4} x={700} y={320} fs={28} t="every morning" c={K.grey} dur={10} />
      </DCard>
      <DTick f={f} at={F.teammate + 16} x={260} y={480} ok s={0.9} />
      <DTick f={f} at={F.morning + 8} x={700} y={480} ok={false} s={0.9} />
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember2} x={480} y={80} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.shortterm2 - 6} x={60} y={130} w={840} h={180}>
        <Wr f={f} at={F.shortterm2} x={480} y={205} fs={44} t="SHORT-TERM MEMORY" dur={14} />
        <Wr f={f} at={F.shortterm2 + 30} x={480} y={270} fs={36} t="= the context window" c={K.blue} dur={16} />
      </DCard>
      <DCard f={f} at={F.longterm2 - 6} x={60} y={350} w={840} h={200} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.longterm2} x={480} y={430} fs={44} t="LONG-TERM MEMORY" c={K.blue} dur={14} />
        <Wr f={f} at={F.longterm2 + 34} x={480} y={500} fs={36} t="= a database the agent searches" c={K.green} dur={22} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="Give an agent a huge task — watch it slice it up" tomorrowAt={F.tomorrow} schoolAt={F.agent7 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.we, 0.9], [F.doesnt - 6, 0.9], [F.doesnt, 0.3], [F.picks, 0.9],
      [F.good - 6, 0.9], [F.good + 4, 0.3], [F.teammate - 6, 0.85], [F.remember2 - 6, 0.2], [F.shortterm2, 0.9], [F.tomorrow, 0.9], [F.agent7, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.we, "openPalm"], [F.doesnt, "fingerUp"], [F.picks, "openPalm"], [F.private, "fingerUp"], [F.good, "openPalm"],
      [F.remember2 - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent7, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.selectively, F.selectively + 30], [F.wiped, F.wiped + 30], [F.private, F.private + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.we - 6, M], [F.we + 10, S],
    [F.doesnt - 10, S], [F.doesnt + 4, Fc], [F.picks - 10, Fc], [F.picks + 4, S], [F.good - 10, S], [F.good + 4, Wd], [F.teammate - 8, Wd], [F.teammate + 4, S],
    [F.remember2 - 8, S], [F.remember2 + 4, Fc], [F.shortterm2 - 8, Fc], [F.shortterm2 + 4, S], [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l017" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L17" line1="IT REMEMBERS" strike="EVERYTHING" line2="ONLY THIS" fs1={104} fs2={118} bubble1="NOT ALL?!" bubble2="agent memory" /></AbsoluteFill>
);
