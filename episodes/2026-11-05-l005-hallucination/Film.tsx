// Agent School · L5 — "Why AI Lies With a Straight Face — Hallucination"   projects/l005/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 5, TITLE = "Why AI Lies With a Straight Face";
const W = cueFinder(WORDS);
const F = {
  why: W("why"), lie: W("lie"), straight: W("straight"), face: W("face"), welcome: W("welcome"),
  remember: W("remember"), predicts: W("predicts"), likely: W("likely"), not: W("not"), true1: W("true"), today: W("today"), costs: W("costs"),
  in1: W("in"), y2023: W("2023"), lawyers: W("lawyers"), york: W("york"), filed: W("filed"), brief: W("brief"), cases: W("cases"), chatgpt: W("chatgpt"), cited: W("cited"),
  didnt: W("didnt"), exist: W("exist"), judge: W("judge"), fined: W("fined"), thousand: W("thousand"),
  thats: W("thats"), hallucination: W("hallucination"), confident: W("confident"), made: W("made"), model: W("model"), fills: W("fills"), gap: W("gap"), something: W("something"), sounds: W("sounds"),
  why2: W("why", 2), because: W("because"), sounding: W("sounding"), pattern: W("pattern"), fluent: W("fluent"), true2: W("true", 2), same: W("same"), prediction: W("prediction"),
  three: W("three"), fixes: W("fixes"), one2: W("one", 2), source: W("source"), two: W("two"), quote: W("quote"), fact: W("fact"), three2: W("three", 2), say: W("say"), know: W("know"),
  remember2: W("remember", 2), fluent2: W("fluent", 2), not2: W("not", 2), true3: W("true", 3),
  tomorrow: W("tomorrow"), agent2: W("agent", 2), lesson3: W("lesson", 3), subscribe: W("subscribe"),
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.remember - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 5" c={K.blue} dur={10} />
      <Wr f={f} at={F.why} x={480} y={165} fs={78} t="WHY DOES AI LIE" dur={14} />
      <Wr f={f} at={F.straight - 6} x={480} y={235} fs={44} t="with a straight face?" c={K.red} dur={12} />
      <DCard f={f} at={F.face - 4} x={140} y={290} w={240} h={240} r={40} fill={K.soft} stroke={K.blue} dur={10}>
        <circle cx={215} cy={385} r={18} fill={K.ink} />
        <circle cx={305} cy={385} r={18} fill={K.ink} />
      </DCard>
      <DLine f={f} at={F.face + 8} x1={210} y1={465} x2={310} y2={465} c={K.ink} w={10} dur={6} />
      <DCard f={f} at={F.face + 14} x={430} y={330} w={420} h={110} r={55} fill="#fff" stroke={K.blue} dur={8}>
        <Wr f={f} at={F.face + 20} x={640} y={400} fs={40} t="Totally true." dur={10} />
      </DCard>
      <DTick f={f} at={F.face + 34} x={640} y={500} ok={false} s={0.8} />
    </g>
  );
  if (f < F.in1 - 4) return ( // LIKELY ≠ TRUE
    <g>
      <Wr f={f} at={F.remember} x={480} y={70} fs={30} t="remember lesson 1:" c={K.grey} dur={10} />
      <Wr f={f} at={F.predicts - 10} x={480} y={150} fs={52} t="AI PREDICTS WHAT'S…" dur={18} />
      <DCard f={f} at={F.likely - 8} x={80} y={200} w={360} h={200} fill="#E9F8F0" stroke={K.green}>
        <Wr f={f} at={F.likely} x={260} y={320} fs={64} t="LIKELY" c={K.green} dur={10} />
      </DCard>
      <DTick f={f} at={F.likely + 10} x={260} y={445} ok s={0.8} />
      <Wr f={f} at={F.not} x={480} y={312} fs={30} t="not" c={K.grey} dur={6} />
      <DCard f={f} at={F.true1 - 8} x={520} y={200} w={360} h={200} fill="#FDECEB" stroke={K.red}>
        <Wr f={f} at={F.true1} x={700} y={320} fs={64} t="TRUE" c={K.red} dur={8} />
      </DCard>
      <DTick f={f} at={F.true1 + 10} x={700} y={445} ok={false} s={0.8} />
      <Wr f={f} at={F.costs - 10} x={480} y={560} fs={36} t="today: what that costs" c={K.amber} dur={14} />
    </g>
  );
  if (f < F.thats - 6) { // THE NEW YORK CASE
    const rows = [0, 1, 2];
    return (
      <g>
        <Wr f={f} at={F.y2023} x={480} y={70} fs={44} t="2023 · NEW YORK" c={K.blue} dur={14} />
        <DCard f={f} at={F.lawyers} x={130} y={110} w={460} h={380} fill="#FFFDF7" stroke="#C9B48A">
          <Wr f={f} at={F.brief - 4} x={360} y={170} fs={36} t="COURT BRIEF" dur={10} />
          <Wr f={f} at={F.filed} x={360} y={205} fs={22} t="filed by lawyers" c={K.grey} dur={10} />
        </DCard>
        {rows.map((i) => (
          <g key={i}>
            <Wr f={f} at={F.cases + i * 8} x={170} y={270 + i * 70} fs={32} t={`Case #${i + 1}  (cited)`} a="start" dur={10} />
            <DLine f={f} at={F.didnt + i * 6} x1={160} y1={259 + i * 70} x2={520} y2={259 + i * 70} c={K.red} w={8} dur={6} />
          </g>
        ))}
        <Wr f={f} at={F.chatgpt} x={360} y={470} fs={26} t="cases cited by ChatGPT" c={K.violet} dur={14} />
        <Wr f={f} at={F.exist - 8} x={770} y={250} fs={38} t="didn't exist!" c={K.red} dur={12} />
        <DCard f={f} at={F.fined - 8} x={630} y={320} w={280} h={170} r={20} fill={K.red} stroke={K.red} dur={10}>
          <Wr f={f} at={F.fined} x={770} y={385} fs={32} t="JUDGE: FINED" c="#fff" dur={10} />
          <Wr f={f} at={F.thousand - 6} x={770} y={455} fs={54} t="$5,000" c="#fff" dur={12} />
        </DCard>
      </g>
    );
  }
  if (f < F.why2 - 6) { // HALLUCINATION = CONFIDENT + MADE UP
    const blocks = ["fact", "fact", "GAP", "fact"];
    return (
      <g>
        <Wr f={f} at={F.hallucination - 8} x={480} y={85} fs={66} t="HALLUCINATION" c={K.violet} dur={16} />
        <Wr f={f} at={F.confident - 6} x={480} y={150} fs={36} t="a confident answer that's made up" dur={24} />
        {blocks.map((b, i) => {
          const gap = b === "GAP";
          return (
            <DCard key={i} f={f} at={F.model - 6 + i * 4} x={70 + i * 210} y={220} w={190} h={110} fill={gap ? "#fff" : K.soft} stroke={gap ? K.amber : K.blue} dur={8}>
              {gap ? <Wr f={f} at={F.gap - 4} x={165 + i * 210} y={292} fs={56} t="?" c={K.amber} dur={6} /> : <Wr f={f} at={F.model + 2 + i * 4} x={165 + i * 210} y={290} fs={38} t="known" c={K.blue} dur={8} />}
            </DCard>
          );
        })}
        <DLine f={f} at={F.something - 4} x1={485} y1={460} x2={485} y2={345} c={K.amber} w={8} dur={8} head />
        <DCard f={f} at={F.something} x={230} y={470} w={510} h={90} r={45} fill="#FFF3DF" stroke={K.amber} dur={8}>
          <Wr f={f} at={F.sounds - 4} x={485} y={528} fs={36} t="something that sounds right" dur={16} />
        </DCard>
      </g>
    );
  }
  if (f < F.three - 6) return ( // FLUENT = TRUE (to the model)
    <g>
      <Wr f={f} at={F.because - 4} x={480} y={80} fs={48} t="WHY SO CONFIDENT?" dur={12} />
      <Wr f={f} at={F.sounding} x={480} y={145} fs={34} t="sounding sure is just another pattern" c={K.grey} dur={22} />
      <DCard f={f} at={F.fluent - 8} x={70} y={200} w={340} h={180} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.fluent} x={240} y={305} fs={46} t="fluent text" c={K.blue} dur={10} />
      </DCard>
      <Wr f={f} at={F.same - 6} x={480} y={318} fs={84} t="=" dur={6} />
      <DCard f={f} at={F.true2 - 8} x={550} y={200} w={340} h={180} fill="#E9F8F0" stroke={K.green}>
        <Wr f={f} at={F.true2} x={720} y={305} fs={46} t="true text" c={K.green} dur={10} />
      </DCard>
      <Wr f={f} at={F.prediction - 8} x={480} y={480} fs={40} t="…to a prediction machine" c={K.amber} dur={18} />
    </g>
  );
  if (f < F.remember2 - 6) return ( // THREE FIXES
    <g>
      <Wr f={f} at={F.three} x={480} y={75} fs={52} t="3 FIXES" c={K.blue} dur={10} />
      <DCard f={f} at={F.one2 - 8} x={80} y={110} w={800} h={130} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.one2} x={120} y={192} fs={40} t="1  Give it the real source" a="start" dur={20} />
      </DCard>
      <DTick f={f} at={F.source + 14} x={820} y={175} ok s={0.6} />
      <DCard f={f} at={F.two - 8} x={80} y={260} w={800} h={130} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.two} x={120} y={342} fs={38} t="2  Ask where each fact came from" a="start" dur={22} />
      </DCard>
      <DTick f={f} at={F.fact + 14} x={840} y={325} ok s={0.6} />
      <DCard f={f} at={F.three2 - 8} x={80} y={410} w={800} h={130} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.three2} x={120} y={492} fs={40} t={'3  Let it say "I don\'t know"'} a="start" dur={20} />
      </DCard>
      <DTick f={f} at={F.know + 8} x={820} y={475} ok s={0.6} />
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember2} x={480} y={90} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.fluent2 - 6} x={80} y={140} w={800} h={150}>
        <Wr f={f} at={F.fluent2} x={480} y={240} fs={68} t="FLUENT" c={K.blue} dur={10} />
      </DCard>
      <Wr f={f} at={F.not2} x={480} y={350} fs={40} t="is not the same as" c={K.grey} dur={12} />
      <DCard f={f} at={F.true3 - 6} x={80} y={380} w={800} h={160} fill="#E9F8F0" stroke={K.green}>
        <Wr f={f} at={F.true3} x={480} y={485} fs={72} t="TRUE" c={K.green} dur={8} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="How the same AI gives you 10× better answers" tomorrowAt={F.tomorrow} schoolAt={F.agent2 - 4} buttonAt={F.lesson3 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.remember, 0.9], [F.why2 - 6, 0.9], [F.why2 + 2, 0.2], [F.because - 4, 0.9],
      [F.remember2 - 6, 0.2], [F.fluent2 - 2, 0.9], [F.tomorrow, 0.9], [F.agent2, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.remember, "fingerUp"], [F.in1, "openPalm"], [F.thats, "fingerUp"], [F.confident, "openPalm"],
      [F.three, "fingerUp"], [F.one2, "openPalm"], [F.remember2 - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent2, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.lie, F.lie + 40], [F.didnt, F.didnt + 35], [F.fined, F.fined + 30], [F.why2, F.why2 + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.remember - 6, M], [F.remember + 10, S],
    [F.why2 - 8, S], [F.why2 + 4, Fc], [F.because - 10, Fc], [F.because + 2, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l005" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L5" line1="CONFIDENT" strike="TRUE" line2="MADE UP" fs1={128} bubble1="$5,000 FINE!" bubble2="AI hallucination" /></AbsoluteFill>
);
