// Agent School · L9 — "Your AI Never Read Your Files… Until This — RAG"   projects/l009/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 9, TITLE = "Your AI Never Read Your Files";
const W = cueFinder(WORDS);
const F = {
  your: W("your"), never: W("never"), read: W("read"), files: W("files"), until: W("until"), welcome: W("welcome"),
  we: W("we"), only: W("only"), training: W("training"), plus: W("plus"), context: W("context"),
  so: W("so"), company: W("company"), chatbot: W("chatbot"), refund: W("refund"), it: W("it"), wasnt: W("wasnt"), trained: W("trained"), it3: W("it", 3),
  rag: W("rag"), retrievalaugmented: W("retrievalaugmented"), three: W("three"), one: W("one"), search: W("search"), documents: W("documents"), match: W("match"),
  two: W("two"), paste: W("paste"), prompt: W("prompt"), three2: W("three", 2), model: W("model"), answers: W("answers"), using: W("using"),
  its3: W("its", 3), openbook: W("openbook"), exam: W("exam"), memorize: W("memorize"), looks: W("looks"), right: W("right"), ask: W("ask"),
  and: W("and"), fights: W("fights"), hallucination: W("hallucination"), now: W("now"), source: W("source"), check: W("check"),
  hard: W("hard"), search2: W("search", 2), find: W("find"), wrong: W("wrong"), page: W("page"), wrong2: W("wrong", 2),
  remember: W("remember"), rag2: W("rag", 2), look: W("look"), then: W("then"),
  tomorrow: W("tomorrow"), agent2: W("agent", 2), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

/** a small document icon drawn by the pen */
const Doc: React.FC<{ f: number; at: number; x: number; y: number; w?: number; h?: number; c?: string; fill?: string }> = ({ f, at, x, y, w = 110, h = 140, c = K.blue, fill = "#fff" }) => (
  <DCard f={f} at={at} x={x} y={y} w={w} h={h} r={10} fill={fill} stroke={c} dur={8}>
    {[0, 1, 2, 3].map((i) => <rect key={i} x={x + 16} y={y + 26 + i * 26} width={i === 3 ? (w - 32) * 0.6 : w - 32} height={10} rx={5} fill={c} opacity={0.35} />)}
  </DCard>
);

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.we - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 9" c={K.blue} dur={10} />
      <Wr f={f} at={F.your} x={480} y={160} fs={60} t="YOUR AI HAS NEVER" dur={14} />
      <Wr f={f} at={F.read - 4} x={480} y={250} fs={72} t="READ YOUR FILES" c={K.red} dur={14} />
      <Doc f={f} at={F.files} x={250} y={300} />
      <Doc f={f} at={F.files + 4} x={380} y={300} />
      <Doc f={f} at={F.files + 8} x={510} y={300} />
      <DCard f={f} at={F.until} x={310} y={475} w={340} h={86} r={43} fill={K.amber} stroke={K.amber} dur={8}>
        <Wr f={f} at={F.until + 6} x={480} y={532} fs={42} t="…UNTIL THIS" c={K.ink} dur={12} />
      </DCard>
    </g>
  );
  if (f < F.so - 6) return ( // WHAT AI KNOWS
    <g>
      <Wr f={f} at={F.we} x={480} y={80} fs={46} t="AI ONLY KNOWS…" dur={12} />
      <DCard f={f} at={F.training - 8} x={60} y={140} w={360} h={250} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.training} x={240} y={245} fs={44} t="training" c={K.blue} dur={10} />
        <Wr f={f} at={F.training + 8} x={240} y={305} fs={44} t="data" c={K.blue} dur={6} />
      </DCard>
      <Wr f={f} at={F.plus} x={480} y={295} fs={80} t="+" dur={4} />
      <DCard f={f} at={F.context - 10} x={540} y={140} w={360} h={250} fill="#F3EFFF" stroke={K.violet}>
        <Wr f={f} at={F.context - 2} x={720} y={245} fs={44} t="context" c={K.violet} dur={10} />
        <Wr f={f} at={F.context + 8} x={720} y={305} fs={44} t="window" c={K.violet} dur={8} />
      </DCard>
    </g>
  );
  if (f < F.rag - 8) return ( // REFUND POLICY?
    <g>
      <Wr f={f} at={F.company + 2} x={480} y={80} fs={40} t="HOW DOES A COMPANY CHATBOT…" dur={20} />
      <DCard f={f} at={F.refund - 10} x={300} y={130} w={560} h={90} r={45} fill={K.blue} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.refund - 4} x={580} y={188} fs={36} t="What's your refund policy?" c="#fff" dur={14} />
      </DCard>
      <DCard f={f} at={F.refund + 6} x={100} y={250} w={380} h={90} r={45} fill="#EEF1F6" stroke="#C9D3E6" dur={8}>
        <Wr f={f} at={F.refund + 12} x={290} y={308} fs={36} t="Here's our policy…" dur={10} />
      </DCard>
      <Wr f={f} at={F.wasnt - 4} x={480} y={430} fs={40} t="but it was never trained on it!" c={K.red} dur={22} />
      <DTick f={f} at={F.wasnt + 20} x={480} y={510} ok={false} s={0.8} />
    </g>
  );
  if (f < F.its3 - 6) { // RAG IN 3 STEPS
    const steps: [number, number, string, string, string][] = [
      [F.one, F.match, "SEARCH", "your documents", K.blue],
      [F.two, F.prompt, "PASTE", "into the prompt", K.violet],
      [F.three2, F.using, "ANSWER", "using those parts", K.green],
    ];
    return (
      <g>
        <Wr f={f} at={F.rag - 4} x={480} y={85} fs={80} t="RAG" c={K.blue} dur={8} />
        <Wr f={f} at={F.retrievalaugmented - 4} x={480} y={140} fs={34} t="Retrieval-Augmented Generation" c={K.grey} dur={24} />
        <Wr f={f} at={F.three} x={480} y={205} fs={34} t="3 STEPS" dur={8} />
        {steps.map(([at, at2, t, sub, c], i) => (
          <g key={i}>
            <DCard f={f} at={at - 4} x={50 + i * 300} y={240} w={260} h={290} fill="#fff" stroke={c}>
              <Wr f={f} at={at + 2} x={180 + i * 300} y={330} fs={70} t={`${i + 1}`} c={c} dur={4} />
              <Wr f={f} at={at + 8} x={180 + i * 300} y={410} fs={44} t={t} dur={10} />
              <Wr f={f} at={at2 - 2} x={180 + i * 300} y={470} fs={26} t={sub} c={K.grey} dur={12} />
            </DCard>
            {i < 2 && <DLine f={f} at={steps[i + 1][0] - 8} x1={314 + i * 300} y1={385} x2={346 + i * 300} y2={385} c={K.amber} w={8} head dur={4} />}
          </g>
        ))}
        <Wr f={f} at={F.match + 4} x={480} y={575} fs={26} t="…the parts that match the question" c={K.blue} dur={16} />
      </g>
    );
  }
  if (f < F.and - 6) return ( // OPEN-BOOK EXAM
    <g>
      <Wr f={f} at={F.openbook - 4} x={480} y={85} fs={60} t="AN OPEN-BOOK EXAM" dur={18} />
      <DCard f={f} at={F.exam - 6} x={100} y={130} w={170} h={200} r={10} fill={K.soft} stroke={K.blue} dur={10} />
      <DCard f={f} at={F.exam} x={270} y={130} w={170} h={200} r={10} fill={K.soft} stroke={K.blue} dur={10} />
      {[0, 1, 2, 3].map((i) => <DLine key={i} f={f} at={F.exam + 10 + i * 2} x1={125} y1={170 + i * 38} x2={245} y2={170 + i * 38} c="#AFC6EE" w={8} dur={4} />)}
      {[0, 1, 2, 3].map((i) => <DLine key={i} f={f} at={F.exam + 14 + i * 2} x1={295} y1={170 + i * 38} x2={415} y2={170 + i * 38} c="#AFC6EE" w={8} dur={4} />)}
      <DCard f={f} at={F.memorize - 8} x={480} y={130} w={400} h={110} fill="#FDECEB" stroke={K.red}>
        <Wr f={f} at={F.memorize - 2} x={680} y={200} fs={34} t="doesn't memorize" c={K.red} dur={12} />
      </DCard>
      <DCard f={f} at={F.looks - 6} x={480} y={260} w={400} h={110} fill="#E9F8F0" stroke={K.green}>
        <Wr f={f} at={F.looks} x={680} y={330} fs={34} t="looks things up" c={K.green} dur={12} />
      </DCard>
      <DCard f={f} at={F.right - 4} x={150} y={420} w={660} h={110} r={55} fill={K.ink} stroke={K.ink} dur={10}>
        <Wr f={f} at={F.right + 2} x={480} y={490} fs={40} t="right when you ask" c="#fff" dur={14} />
      </DCard>
    </g>
  );
  if (f < F.hard - 6) return ( // FIGHTS HALLUCINATION
    <g>
      <Wr f={f} at={F.fights - 4} x={480} y={85} fs={50} t="IT FIGHTS HALLUCINATION" c={K.violet} dur={20} />
      <DCard f={f} at={F.now - 6} x={90} y={140} w={780} h={150} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.now} x={130} y={205} fs={30} t="answer" c={K.grey} a="start" dur={6} />
        <Wr f={f} at={F.now + 6} x={130} y={255} fs={40} t="Here's our refund policy…" a="start" dur={16} />
      </DCard>
      <DLine f={f} at={F.source - 10} x1={480} y1={300} x2={480} y2={345} c={K.amber} w={7} head dur={6} />
      <Doc f={f} at={F.source - 4} x={260} y={355} w={120} h={150} c={K.green} fill="#E9F8F0" />
      <Wr f={f} at={F.source + 4} x={410} y={430} fs={40} t="+ a source" c={K.green} a="start" dur={10} />
      <Wr f={f} at={F.check - 6} x={410} y={485} fs={34} t="you can check" a="start" dur={10} />
      <DTick f={f} at={F.check + 6} x={790} y={455} ok s={0.8} />
    </g>
  );
  if (f < F.remember - 6) return ( // THE HARD PART: SEARCH
    <g>
      <Wr f={f} at={F.hard - 2} x={480} y={85} fs={50} t="THE HARD PART: SEARCH" dur={18} />
      <Doc f={f} at={F.find - 4} x={130} y={170} w={170} h={220} c={K.red} fill="#FDECEB" />
      <Wr f={f} at={F.page - 8} x={215} y={440} fs={34} t="wrong page" c={K.red} dur={10} />
      <DLine f={f} at={F.wrong2 - 10} x1={330} y1={280} x2={540} y2={280} c={K.amber} w={8} head dur={8} />
      <DCard f={f} at={F.wrong2 - 2} x={570} y={180} w={290} h={200} fill="#FDECEB" stroke={K.red} dur={10}>
        <Wr f={f} at={F.wrong2 + 4} x={715} y={265} fs={34} t="wrong" c={K.red} dur={6} />
        <Wr f={f} at={F.wrong2 + 10} x={715} y={320} fs={34} t="answer" c={K.red} dur={8} />
      </DCard>
      <DTick f={f} at={F.wrong2 + 18} x={715} y={460} ok={false} s={0.9} />
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={90} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <Wr f={f} at={F.rag2 - 4} x={480} y={190} fs={80} t="RAG =" c={K.blue} dur={8} />
      <DCard f={f} at={F.look - 8} x={80} y={230} w={800} h={130} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.look} x={480} y={315} fs={52} t="1  LOOK IT UP FIRST" dur={14} />
      </DCard>
      <DCard f={f} at={F.then - 6} x={80} y={390} w={800} h={130} fill="#E9F8F0" stroke={K.green}>
        <Wr f={f} at={F.then} x={480} y={475} fs={52} t="2  THEN ANSWER" c={K.green} dur={12} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="How AI turns sentences into coordinates" tomorrowAt={F.tomorrow} schoolAt={F.agent2 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.we, 0.9], [F.so - 4, 0.9], [F.so + 4, 0.2], [F.company, 0.9],
      [F.remember - 6, 0.2], [F.rag2 - 6, 0.9], [F.tomorrow, 0.9], [F.agent2, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.we, "openPalm"], [F.wasnt, "fingerUp"], [F.rag, "fingerUp"], [F.one, "openPalm"], [F.openbook, "openPalm"],
      [F.hard, "fingerUp"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent2, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.never, F.never + 40], [F.wasnt, F.wasnt + 30], [F.wrong2, F.wrong2 + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.we - 6, M], [F.we + 10, S],
    [F.so - 6, S], [F.so + 4, Fc], [F.company - 6, Fc], [F.company + 6, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l009" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L9" line1="NEVER READ" line2="YOUR FILES" fs1={128} fs3={128} bubble1="UNTIL THIS!" bubble2="RAG explained" /></AbsoluteFill>
);
