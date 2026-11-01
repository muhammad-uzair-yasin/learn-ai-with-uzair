// Agent School · L3 — "AI Can't See the Word "Strawberry" — Tokens Explained"   projects/l003/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 3, TITLE = "AI Can't See \"Strawberry\"";
const W = cueFinder(WORDS);
const F = {
  ai: W("ai"), cant: W("cant"), the1: W("the"), straw0: W("strawberry"), seriously: W("seriously"), welcome: W("welcome"),
  yesterday: W("yesterday"), today: W("today"), examples2: W("examples", 2), actually: W("actually"), machine: W("machine"),
  ai2: W("ai", 2), reads: W("reads"), chunks: W("chunks"), strawberry2: W("strawberry", 2), straw: W("straw"), berry: W("berry"),
  each: W("each"), becomes: W("becomes"), number: W("number"), sees: W("sees"), not: W("not"), letters2: W("letters", 2),
  thats: W("thats"), why: W("why"), models: W("models"), miscounted: W("miscounted"), never: W("never"),
  english: W("english"), one: W("one"), roughly: W("roughly"), hundred: W("hundred"), thirty: W("thirty"),
  and3: W("and", 3), tokens3: W("tokens", 3), priced: W("priced"), memory: W("memory"), measured: W("measured"),
  remember: W("remember"), doesnt2: W("doesnt", 2), words2: W("words", 2), reads2: W("reads", 2),
  tomorrow: W("tomorrow"), agent2: W("agent", 2), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.yesterday - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 3" c={K.blue} dur={10} />
      <Wr f={f} at={F.ai} x={480} y={190} fs={84} t="AI CAN'T SEE" dur={14} />
      <Wr f={f} at={F.the1} x={480} y={260} fs={36} t="the word" c={K.grey} dur={6} />
      <DCard f={f} at={F.straw0 - 4} x={190} y={290} w={580} h={140} fill={K.soft} stroke={K.blue} dur={10}>
        <Wr f={f} at={F.straw0 + 4} x={480} y={390} fs={84} t="strawberry" c={K.blue} dur={14} />
      </DCard>
      <DCard f={f} at={F.seriously} x={310} y={475} w={340} h={84} r={42} fill={K.red} stroke={K.red} dur={8}>
        <Wr f={f} at={F.seriously + 6} x={480} y={531} fs={40} t="SERIOUSLY." c="#fff" dur={10} />
      </DCard>
    </g>
  );
  if (f < F.ai2 - 6) return ( // WHAT DOES THE MACHINE SEE?
    <g>
      <Wr f={f} at={F.yesterday} x={480} y={70} fs={30} t="yesterday: machines learn from examples" c={K.grey} dur={24} />
      <Wr f={f} at={F.today} x={480} y={160} fs={52} t="TODAY: WHAT DOES IT SEE?" c={K.blue} dur={18} />
      <DCard f={f} at={F.examples2 - 4} x={60} y={220} w={370} h={250}>
        <Wr f={f} at={F.examples2 + 4} x={245} y={285} fs={30} t="you type:" c={K.grey} dur={8} />
        <Wr f={f} at={F.examples2 + 12} x={245} y={380} fs={46} t="Hello, world" dur={14} />
      </DCard>
      <DLine f={f} at={F.actually} x1={445} y1={345} x2={520} y2={345} c={K.amber} w={8} head />
      <DCard f={f} at={F.machine - 12} x={535} y={220} w={365} h={250} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.machine - 4} x={717} y={285} fs={30} t="machine sees:" c={K.grey} dur={10} />
        <Wr f={f} at={F.machine + 6} x={717} y={410} fs={100} t="???" c={K.blue} dur={10} />
      </DCard>
    </g>
  );
  if (f < F.each - 6) return ( // TOKENS = CHUNKS
    <g>
      <Wr f={f} at={F.ai2} x={480} y={75} fs={48} t="AI DOESN'T READ LETTERS" dur={18} />
      <Wr f={f} at={F.reads - 2} x={480} y={160} fs={66} t="IT READS TOKENS" c={K.blue} dur={14} />
      <Wr f={f} at={F.chunks} x={480} y={215} fs={32} t="= chunks of text" c={K.grey} dur={12} />
      <DCard f={f} at={F.strawberry2 - 8} x={190} y={250} w={580} h={120} dur={10}>
        <Wr f={f} at={F.strawberry2 + 2} x={480} y={333} fs={70} t="strawberry" dur={12} />
      </DCard>
      <DLine f={f} at={F.straw - 6} x1={360} y1={378} x2={310} y2={430} c={K.amber} w={6} dur={6} />
      <DCard f={f} at={F.straw} x={140} y={440} w={320} h={110} fill={K.soft} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.straw + 5} x={300} y={516} fs={60} t="straw" c={K.blue} dur={8} />
      </DCard>
      <DLine f={f} at={F.berry - 6} x1={600} y1={378} x2={650} y2={430} c={K.amber} w={6} dur={6} />
      <DCard f={f} at={F.berry} x={500} y={440} w={320} h={110} fill={K.soft} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.berry + 5} x={660} y={516} fs={60} t="berry" c={K.blue} dur={8} />
      </DCard>
    </g>
  );
  if (f < F.thats - 6) return ( // TOKENS -> NUMBERS
    <g>
      <Wr f={f} at={F.each} x={480} y={75} fs={50} t="EACH TOKEN → A NUMBER" dur={14} />
      <DCard f={f} at={F.each + 2} x={140} y={110} w={320} h={100} dur={8}>
        <Wr f={f} at={F.each + 6} x={300} y={180} fs={52} t="straw" dur={6} />
      </DCard>
      <DCard f={f} at={F.each + 6} x={500} y={110} w={320} h={100} dur={8}>
        <Wr f={f} at={F.each + 10} x={660} y={180} fs={52} t="berry" dur={6} />
      </DCard>
      <DLine f={f} at={F.becomes} x1={300} y1={220} x2={300} y2={285} c={K.amber} w={7} dur={8} head />
      <DLine f={f} at={F.becomes + 4} x1={660} y1={220} x2={660} y2={285} c={K.amber} w={7} dur={8} head />
      <DCard f={f} at={F.number - 6} x={170} y={300} w={260} h={90} fill={K.soft} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.number} x={300} y={362} fs={52} t="4729" c={K.blue} dur={8} />
      </DCard>
      <DCard f={f} at={F.number} x={530} y={300} w={260} h={90} fill={K.soft} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.number + 6} x={660} y={362} fs={52} t="8162" c={K.blue} dur={8} />
      </DCard>
      <Wr f={f} at={F.number + 12} x={480} y={418} fs={22} t="(example IDs)" c={K.grey} dur={6} />
      <Wr f={f} at={F.sees} x={480} y={470} fs={40} t="the model sees: [4729, 8162]" dur={22} />
      <Wr f={f} at={F.not} x={480} y={545} fs={46} t="s t r a w b e r r y" c={K.grey} dur={12} />
      <DLine f={f} at={F.letters2} x1={260} y1={530} x2={700} y2={530} c={K.red} w={10} dur={8} />
      <Wr f={f} at={F.letters2 + 8} x={890} y={545} fs={32} t="10 letters" c={K.red} a="end" dur={8} />
    </g>
  );
  if (f < F.english - 6) return ( // MISCOUNTED R's
    <g>
      <Wr f={f} at={F.thats} x={480} y={90} fs={52} t="How many R's in" dur={12} />
      <Wr f={f} at={F.why + 6} x={480} y={180} fs={76} t="strawberry?" c={K.blue} dur={12} />
      <DCard f={f} at={F.models - 6} x={160} y={230} w={640} h={170} fill="#0F1726" stroke="#0F1726">
        <Wr f={f} at={F.models + 6} x={480} y={295} fs={30} t="some AI models:" c="#8B949E" dur={10} />
        <Wr f={f} at={F.miscounted} x={430} y={370} fs={56} t="miscounted" c="#FF7B72" dur={14} />
      </DCard>
      <DTick f={f} at={F.miscounted + 14} x={710} y={350} ok={false} s={0.8} />
      <Wr f={f} at={F.never} x={480} y={490} fs={44} t="they never saw the letters!" c={K.amber} dur={18} />
    </g>
  );
  if (f < F.and3 - 4) return ( // TOKEN MATH
    <g>
      <Wr f={f} at={F.english - 4} x={480} y={75} fs={36} t="IN ENGLISH" c={K.grey} dur={10} />
      <DCard f={f} at={F.one - 6} x={150} y={110} w={660} h={120} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.one + 2} x={480} y={192} fs={60} t="1 token ≈ ¾ word" c={K.blue} dur={18} />
      </DCard>
      <Wr f={f} at={F.hundred - 6} x={70} y={335} fs={36} t="100 words" a="start" dur={10} />
      <DBar f={f} at={F.hundred + 4} x={290} y={306} w={440} h={42} c={K.ink} />
      <Wr f={f} at={F.thirty - 10} x={70} y={455} fs={36} t="130 tokens" c={K.blue} a="start" dur={10} />
      <DBar f={f} at={F.thirty} x={290} y={426} w={572} h={42} c={K.blue} />
      <Wr f={f} at={F.thirty + 16} x={480} y={560} fs={30} t="about 1.3 tokens per word" c={K.grey} dur={16} />
    </g>
  );
  if (f < F.remember - 6) return ( // WHY TOKENS MATTER
    <g>
      <Wr f={f} at={F.tokens3 - 2} x={480} y={85} fs={52} t="TOKENS MATTER FOR YOU" dur={18} />
      <DCard f={f} at={F.priced - 12} x={70} y={140} w={390} h={360}>
        <Wr f={f} at={F.priced - 2} x={265} y={290} fs={110} t="$" c={K.green} dur={6} />
        <Wr f={f} at={F.priced + 4} x={265} y={380} fs={44} t="PRICE" dur={8} />
        <Wr f={f} at={F.priced + 12} x={265} y={440} fs={30} t="priced in tokens" c={K.grey} dur={12} />
      </DCard>
      <DCard f={f} at={F.memory - 12} x={500} y={140} w={390} h={360} fill={K.soft} stroke={K.blue}>
        {[0, 1, 2, 3, 4, 5].map((i) => <DCard key={i} f={f} at={F.memory - 2 + i * 3} x={545 + i * 50} y={210} w={40} h={60} r={8} fill={i < 4 ? K.blue : "#fff"} stroke={K.blue} dur={5} />)}
        <Wr f={f} at={F.memory + 4} x={695} y={380} fs={44} t="MEMORY" c={K.blue} dur={10} />
        <Wr f={f} at={F.measured} x={695} y={440} fs={28} t="measured in tokens" c={K.grey} dur={12} />
      </DCard>
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={90} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.doesnt2 - 12} x={80} y={140} w={800} h={150}>
        <Wr f={f} at={F.doesnt2 - 4} x={480} y={235} fs={50} t="AI DOESN'T READ WORDS" dur={18} />
      </DCard>
      <DLine f={f} at={F.words2 + 10} x1={640} y1={218} x2={860} y2={218} c={K.red} w={10} dur={8} />
      <DCard f={f} at={F.reads2 - 8} x={80} y={330} w={800} h={190} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.reads2} x={480} y={448} fs={64} t="IT READS TOKENS" c={K.blue} dur={16} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="Why your AI forgets you mid-conversation" tomorrowAt={F.tomorrow} schoolAt={F.agent2 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.yesterday, 0.9], [F.thats - 4, 0.9], [F.thats + 4, 0.4], [F.models, 0.9],
      [F.never, 0.9], [F.never + 8, 0.3], [F.english - 6, 0.9], [F.remember - 6, 0.2], [F.doesnt2 - 4, 0.9], [F.tomorrow, 0.9], [F.agent2, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.yesterday, "openPalm"], [F.ai2, "fingerUp"], [F.strawberry2, "openPalm"], [F.never, "fingerUp"],
      [F.english, "openPalm"], [F.tokens3, "fingerUp"], [F.priced, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent2, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.cant, F.cant + 40], [F.seriously, F.seriously + 30], [F.miscounted, F.miscounted + 30], [F.never, F.never + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.yesterday - 6, M], [F.yesterday + 10, S],
    [F.never + 18, S], [F.never + 28, M], [F.english - 10, M], [F.english + 2, S],
    [F.remember - 8, S], [F.remember + 6, Fc], [F.doesnt2 - 14, Fc], [F.doesnt2 - 2, S], [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l003" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L3" line1="AI CAN'T SEE" line2="STRAWBERRY" fs1={112} fs3={122} bubble1="WAIT, WHAT?!" bubble2="tokens explained" /></AbsoluteFill>
);
