// Agent School · L15 — "AI Has No Hands — So How Did It Book a Flight? (Tool Calling)"   projects/l015/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, CodeCard, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide, Recap } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 15, TITLE = "AI Has No Hands: Tool Calling";
const W = cueFinder(WORDS);
const F = {
  ai: W("ai"), hands: W("hands"), how: W("how"), book: W("book"), welcome: W("welcome"),
  yesterday: W("yesterday"), think: W("think"), act: W("act"), observe: W("observe"), today: W("today"), act2: W("act", 2),
  model: W("model"), cant: W("cant"), click: W("click"), write: W("write"), menu: W("menu"), tools: W("tools"), name: W("name"), description: W("description"),
  searchflights: W("searchflights"), finds: W("finds"), cities: W("cities"),
  when: W("when"), writes: W("writes"), structured: W("structured"), request: W("request"), searchflights2: W("searchflights", 2), friday: W("friday"),
  your: W("your"), code: W("code"), reads: W("reads"), runs: W("runs"), function: W("function"), hands2: W("hands", 2), result: W("result"), decides: W("decides"),
  ai2: W("ai", 2), writes2: W("writes", 2), order: W("order"), code2: W("code", 2), work: W("work"),
  thats: W("thats"), safety: W("safety"), code3: W("code", 3), tools2: W("tools", 2), allowed: W("allowed"), exist: W("exist"),
  remember: W("remember"), tool2: W("tool", 2), asks: W("asks"), code4: W("code", 4), acts: W("acts"),
  tomorrow: W("tomorrow"), agent2: W("agent", 2), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.yesterday - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 15" c={K.blue} dur={10} />
      <Wr f={f} at={F.ai} x={480} y={180} fs={72} t="AI HAS" dur={8} />
      <Wr f={f} at={F.hands - 8} x={480} y={290} fs={96} t="NO HANDS" c={K.red} dur={10} />
      <Wr f={f} at={F.how - 2} x={480} y={385} fs={40} t="so how did it…" c={K.grey} dur={10} />
      <DCard f={f} at={F.book - 6} x={200} y={420} w={560} h={120} r={60} fill={K.blue} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.book} x={480} y={498} fs={52} t="BOOK A FLIGHT?" c="#fff" dur={12} />
      </DCard>
    </g>
  );
  if (f < F.model - 6) return ( // RECAP
    <g>
      <Recap f={f} at={F.yesterday} until={F.act2} y={90} fs={36} t="the loop" />
      {[["THINK", F.think, K.blue], ["ACT", F.act, K.green], ["OBSERVE", F.observe, K.violet]].map(([t, at, c], i) => (
        <DCard key={i} f={f} at={(at as number) - 4} x={105 + i * 270} y={150} w={210} h={90} r={45} fill={c as string} stroke={c as string} dur={6}>
          <Wr f={f} at={(at as number) + 2} x={210 + i * 270} y={209} fs={i === 2 ? 32 : 38} t={t as string} c="#fff" dur={6} />
        </DCard>
      ))}
      <DLine f={f} at={F.act2 - 4} x1={390} y1={265} x2={570} y2={265} c={K.amber} w={10} dur={8} />
      <Wr f={f} at={F.today} x={480} y={410} fs={50} t={`TODAY: HOW "ACT" WORKS`} c={K.blue} dur={18} />
    </g>
  );
  if (f < F.when - 6) return ( // ONLY TEXT -> A MENU OF TOOLS
    <g>
      <Wr f={f} at={F.cant} x={480} y={70} fs={34} t="the model can't click anything" c={K.red} dur={16} />
      <Wr f={f} at={F.write - 6} x={480} y={130} fs={44} t="it can only WRITE TEXT" dur={14} />
      <DCard f={f} at={F.menu - 8} x={110} y={170} w={740} h={390} fill="#FFFBF2" stroke={K.amber}>
        <Wr f={f} at={F.menu} x={480} y={225} fs={36} t="TOOL MENU" c={K.amber} dur={8} />
        <Wr f={f} at={F.name - 2} x={150} y={285} fs={26} t="name" c={K.grey} a="start" dur={6} />
        <Wr f={f} at={F.description - 2} x={460} y={285} fs={26} t="description" c={K.grey} a="start" dur={8} />
        <DLine f={f} at={F.description + 4} x1={140} y1={305} x2={820} y2={305} c="#E8DCC6" w={4} dur={8} />
        <Wr f={f} at={F.searchflights - 2} x={150} y={365} fs={32} t="search_flights" c={K.blue} a="start" dur={10} />
        <Wr f={f} at={F.finds} x={460} y={355} fs={28} t="finds flights between" a="start" dur={14} />
        <Wr f={f} at={F.cities - 8} x={460} y={392} fs={28} t="two cities" a="start" dur={8} />
        <Wr f={f} at={F.cities + 8} x={150} y={470} fs={32} t="…" c={K.grey} a="start" dur={4} />
        <Wr f={f} at={F.cities + 10} x={460} y={470} fs={32} t="…" c={K.grey} a="start" dur={4} />
      </DCard>
    </g>
  );
  if (f < F.your - 6) return ( // STRUCTURED REQUEST
    <g>
      <Wr f={f} at={F.writes - 6} x={480} y={80} fs={46} t="THE MODEL WRITES A REQUEST" dur={18} />
      <Wr f={f} at={F.structured - 4} x={480} y={135} fs={30} t="small · structured" c={K.grey} dur={10} />
      <CodeCard f={f} at={F.searchflights2 - 14} x={140} y={170} w={680} fs={32} per={27} title="tool call" lines={[`{ "tool": "search_flights",`, `  "from": "Lahore",`, `  "to":   "Dubai",`, `  "date": "Friday" }`]} />
      <Wr f={f} at={F.friday + 10} x={480} y={520} fs={36} t="just text — no clicking" c={K.blue} dur={14} />
    </g>
  );
  if (f < F.ai2 - 6) return ( // YOUR CODE RUNS IT
    <g>
      <DCard f={f} at={F.your - 8} x={40} y={110} w={240} h={130} fill="#0F1726" stroke="#0F1726" dur={10}>
        <Wr f={f} at={F.your - 2} x={160} y={190} fs={40} t="MODEL" c="#fff" dur={6} />
      </DCard>
      <DLine f={f} at={F.code} x1={290} y1={175} x2={350} y2={175} c={K.amber} w={8} head dur={6} />
      <DCard f={f} at={F.code + 4} x={360} y={110} w={240} h={130} fill={K.blue} stroke={K.blue} dur={10}>
        <Wr f={f} at={F.reads - 2} x={480} y={190} fs={36} t="YOUR CODE" c="#fff" dur={8} />
      </DCard>
      <Wr f={f} at={F.reads + 6} x={320} y={95} fs={26} t="request" c={K.amber} dur={8} />
      <DLine f={f} at={F.runs - 4} x1={610} y1={175} x2={670} y2={175} c={K.amber} w={8} head dur={6} />
      <Wr f={f} at={F.runs} x={640} y={95} fs={26} t="runs" c={K.amber} dur={6} />
      <DCard f={f} at={F.runs + 2} x={680} y={110} w={240} h={130} fill={K.green} stroke={K.green} dur={10}>
        <Wr f={f} at={F.function - 6} x={800} y={168} fs={32} t="REAL" c="#fff" dur={6} />
        <Wr f={f} at={F.function} x={800} y={210} fs={32} t="FUNCTION" c="#fff" dur={8} />
      </DCard>
      <DLine f={f} at={F.hands2 - 4} x1={800} y1={250} x2={800} y2={310} c={K.violet} w={8} dur={5} />
      <DLine f={f} at={F.hands2 + 2} x1={800} y1={310} x2={160} y2={310} c={K.violet} w={8} dur={14} />
      <DLine f={f} at={F.result + 6} x1={160} y1={310} x2={160} y2={255} c={K.violet} w={8} head dur={5} />
      <Wr f={f} at={F.result} x={480} y={360} fs={34} t="result comes back" c={K.violet} dur={12} />
      <DCard f={f} at={F.decides - 10} x={180} y={420} w={600} h={110} r={55} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.decides - 4} x={480} y={488} fs={34} t="model decides the next step" dur={16} />
      </DCard>
    </g>
  );
  if (f < F.thats - 6) return ( // AI WRITES THE ORDER, CODE DOES THE WORK
    <g>
      <DCard f={f} at={F.ai2 - 6} x={40} y={110} w={420} h={360} fill="#FFFBF2" stroke={K.amber}>
        <Wr f={f} at={F.ai2} x={250} y={210} fs={52} t="THE AI" dur={6} />
        <Wr f={f} at={F.writes2} x={250} y={290} fs={36} t="writes" c={K.grey} dur={6} />
        <Wr f={f} at={F.order - 6} x={250} y={380} fs={52} t="THE ORDER" c={K.amber} dur={10} />
      </DCard>
      <DCard f={f} at={F.code2 - 8} x={500} y={110} w={420} h={360} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.code2 - 4} x={710} y={210} fs={52} t="YOUR CODE" c={K.blue} dur={8} />
        <Wr f={f} at={F.code2 + 6} x={710} y={290} fs={36} t="does" c={K.grey} dur={6} />
        <Wr f={f} at={F.work - 6} x={710} y={380} fs={52} t="THE WORK" c={K.green} dur={10} />
      </DCard>
      <DTick f={f} at={F.work + 8} x={710} y={530} ok s={0.8} />
    </g>
  );
  if (f < F.remember - 6) return ( // SAFETY
    <g>
      <Wr f={f} at={F.safety - 6} x={480} y={85} fs={52} t="THE SAFETY POINT" c={K.amber} dur={12} />
      <DCard f={f} at={F.code3 - 8} x={80} y={125} w={800} h={110} fill={K.blue} stroke={K.blue}>
        <Wr f={f} at={F.code3 - 2} x={480} y={195} fs={44} t="YOUR CODE DECIDES…" c="#fff" dur={12} />
      </DCard>
      <DCard f={f} at={F.tools2 - 10} x={80} y={270} w={800} h={110}>
        <Wr f={f} at={F.tools2 - 6} x={120} y={340} fs={40} t="which tools exist" a="start" dur={12} />
        <DTick f={f} at={F.exist} x={810} y={325} ok s={0.7} />
      </DCard>
      <DCard f={f} at={F.allowed - 16} x={80} y={410} w={800} h={110}>
        <Wr f={f} at={F.allowed - 10} x={120} y={480} fs={40} t="what they're allowed to do" a="start" dur={16} />
        <DTick f={f} at={F.allowed + 8} x={810} y={465} ok s={0.7} />
      </DCard>
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={85} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.tool2 - 6} x={80} y={120} w={800} h={110}>
        <Wr f={f} at={F.tool2} x={480} y={192} fs={50} t="TOOL CALLING =" dur={14} />
      </DCard>
      <DCard f={f} at={F.asks - 12} x={80} y={270} w={360} h={200} fill="#FFFBF2" stroke={K.amber}>
        <Wr f={f} at={F.asks - 8} x={260} y={345} fs={40} t="THE AI" dur={6} />
        <Wr f={f} at={F.asks} x={260} y={430} fs={64} t="ASKS" c={K.amber} dur={6} />
      </DCard>
      <DLine f={f} at={F.code4 - 10} x1={455} y1={370} x2={505} y2={370} c={K.ink} w={8} head dur={5} />
      <DCard f={f} at={F.code4 - 6} x={520} y={270} w={360} h={200} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.code4 - 2} x={700} y={345} fs={40} t="YOUR CODE" c={K.blue} dur={8} />
        <Wr f={f} at={F.acts} x={700} y={430} fs={64} t="ACTS" c={K.green} dur={6} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="The USB-C of AI. What is MCP?" tomorrowAt={F.tomorrow} schoolAt={F.agent2 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.yesterday - 10, 0.2], [F.yesterday, 0.9], [F.ai2 - 6, 0.9], [F.ai2, 0.3], [F.ai2 + 10, 0.3], [F.code2 - 8, 0.9],
      [F.remember - 20, 0.9], [F.remember - 6, 0.2], [F.tool2, 0.9], [F.tomorrow, 0.9], [F.agent2, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.yesterday, "openPalm"], [F.cant, "fingerUp"], [F.menu, "openPalm"], [F.ai2, "fingerUp"],
      [F.thats, "openPalm"], [F.safety, "fingerUp"], [F.allowed + 20, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent2, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.hands, F.hands + 30], [F.cant, F.cant + 24], [F.safety, F.safety + 24]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.yesterday - 6, M], [F.yesterday + 10, S],
    [F.ai2 - 10, S], [F.ai2 + 2, Wd], [F.code2 - 14, Wd], [F.code2 - 4, S],
    [F.remember - 8, S], [F.remember + 6, Fc], [F.tool2 - 12, Fc], [F.tool2 - 2, S], [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l015" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L15" line1="AI HAS" fs1={150} strike="HANDS" line2="BOOKED IT?" fs3={120} bubble1="HOW?!" bubble2="tool calling explained" /></AbsoluteFill>
);
