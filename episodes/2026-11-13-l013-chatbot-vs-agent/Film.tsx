// Agent School · L13 — "A Chatbot Answers. An Agent Acts."   projects/l013/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, CodeCard, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 13, TITLE = "A Chatbot Answers. An Agent Acts.";
const W = cueFinder(WORDS);
const F = {
  chatbot: W("chatbot"), answers: W("answers"), agent: W("agent"), acts: W("acts"), welcome: W("welcome"),
  everything: W("everything"), talks: W("talks"), now: W("now"), job: W("job"),
  ask: W("ask"), find: W("find"), tells: W("tells"), search: W("search"),
  agent3: W("agent", 3), same: W("same"), searches: W("searches"), compares: W("compares"), comes: W("comes"), options: W("options"),
  agent4: W("agent", 4), model2: W("model", 2), plus: W("plus"), tools: W("tools"), goal: W("goal"), loop: W("loop"), done: W("done"),
  the2: W("the", 2), brain: W("brain"), predicts: W("predicts"), predictions: W("predictions"), actions: W("actions"), search2: W("search", 2),
  more: W("more"), power: W("power"), risk: W("risk"), act: W("act"), wrong: W("wrong"), guardrails: W("guardrails"),
  remember: W("remember"), chatbot3: W("chatbot", 3), talk: W("talk"), agent6: W("agent", 6), model4: W("model", 4), tools2: W("tools", 2), goal2: W("goal", 2), loop2: W("loop", 2),
  tomorrow: W("tomorrow"), agent8: W("agent", 8), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.everything - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 13" c={K.blue} dur={10} />
      <DCard f={f} at={F.chatbot - 12} x={60} y={110} w={400} h={400}>
        <Wr f={f} at={F.chatbot - 4} x={260} y={200} fs={50} t="CHATBOT" c={K.grey} dur={10} />
        <DCard f={f} at={F.answers - 6} x={100} y={250} w={320} h={120} r={40} fill="#EEF1F6" stroke="#C9D3E6" dur={8}>
          <Wr f={f} at={F.answers} x={260} y={328} fs={44} t="ANSWERS" dur={8} />
        </DCard>
        <Wr f={f} at={F.answers + 10} x={260} y={450} fs={30} t="talk" c={K.grey} dur={6} />
      </DCard>
      <DCard f={f} at={F.agent - 8} x={500} y={110} w={400} h={400} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.agent} x={700} y={200} fs={56} t="AGENT" c={K.blue} dur={8} />
        <Wr f={f} at={F.acts} x={700} y={340} fs={90} t="ACTS" c={K.green} dur={8} />
        <DTick f={f} at={F.acts + 10} x={700} y={430} ok s={0.8} />
      </DCard>
    </g>
  );
  if (f < F.ask - 6) return ( // SO FAR: TALK. NOW: A JOB
    <g>
      <Wr f={f} at={F.everything} x={480} y={95} fs={40} t="SO FAR: A MODEL THAT TALKS" c={K.grey} dur={20} />
      <DCard f={f} at={F.talks - 8} x={230} y={140} w={500} h={110} r={50} fill="#EEF1F6" stroke="#C9D3E6" dur={10}>
        <Wr f={f} at={F.talks} x={480} y={210} fs={40} t={`"Here's what I think…"`} dur={14} />
      </DCard>
      <Wr f={f} at={F.now} x={480} y={400} fs={60} t="NOW: GIVE IT A JOB" c={K.blue} dur={16} />
      <DLine f={f} at={F.job + 4} x1={190} y1={430} x2={770} y2={430} c={K.amber} w={10} dur={10} />
    </g>
  );
  if (f < F.agent3 - 8) return ( // ASK A CHATBOT
    <g>
      <Wr f={f} at={F.ask} x={480} y={75} fs={44} t="ASK A CHATBOT" c={K.grey} dur={10} />
      <DCard f={f} at={F.find - 8} x={300} y={105} w={620} h={90} r={45} fill={K.amber} stroke={K.amber} dur={8}>
        <Wr f={f} at={F.find} x={610} y={162} fs={30} t={`"find me a cheap flight to Dubai"`} dur={22} />
      </DCard>
      <DCard f={f} at={F.tells - 10} x={40} y={230} w={640} h={230} fill="#EEF1F6" stroke="#C9D3E6">
        <Wr f={f} at={F.tells - 2} x={80} y={295} fs={34} t="Here's how to search:" a="start" dur={12} />
        <Wr f={f} at={F.tells + 10} x={80} y={360} fs={30} t="step 1 …" c={K.grey} a="start" dur={6} />
        <Wr f={f} at={F.tells + 16} x={80} y={415} fs={30} t="step 2 …" c={K.grey} a="start" dur={6} />
      </DCard>
      <Wr f={f} at={F.search} x={480} y={545} fs={48} t="it just TELLS you" c={K.red} dur={12} />
    </g>
  );
  if (f < F.agent4 - 6) return ( // ASK AN AGENT
    <g>
      <Wr f={f} at={F.agent3 - 4} x={480} y={75} fs={44} t="ASK AN AGENT" c={K.blue} dur={10} />
      <DCard f={f} at={F.same - 6} x={300} y={105} w={620} h={90} r={45} fill={K.amber} stroke={K.amber} dur={8}>
        <Wr f={f} at={F.same} x={610} y={162} fs={30} t={`"find me a cheap flight to Dubai"`} dur={14} />
      </DCard>
      {[["SEARCH", "flights", F.searches], ["COMPARE", "prices", F.compares], ["COME BACK", "with options", F.comes]].map(([a, b, at], i) => (
        <DCard key={i} f={f} at={(at as number) - 6} x={40 + i * 305} y={240} w={270} h={140} fill={K.soft} stroke={K.blue} dur={10}>
          <Wr f={f} at={at as number} x={175 + i * 305} y={305} fs={36} t={a as string} c={K.blue} dur={8} />
          <Wr f={f} at={(at as number) + 6} x={175 + i * 305} y={352} fs={28} t={b as string} c={K.grey} dur={8} />
        </DCard>
      ))}
      <DLine f={f} at={F.compares - 10} x1={312} y1={310} x2={343} y2={310} c={K.ink} w={6} head dur={4} />
      <DLine f={f} at={F.comes - 10} x1={617} y1={310} x2={648} y2={310} c={K.ink} w={6} head dur={4} />
      <DCard f={f} at={F.options - 8} x={200} y={420} w={560} h={110} r={55} fill={K.green} stroke={K.green} dur={10}>
        <Wr f={f} at={F.options} x={480} y={490} fs={44} t="OPTIONS READY" c="#fff" dur={10} />
      </DCard>
    </g>
  );
  if (f < F.the2 - 6) return ( // AGENT = MODEL + 3 THINGS
    <g>
      <Wr f={f} at={F.agent4} x={480} y={85} fs={52} t="AN AGENT =" dur={10} />
      <DCard f={f} at={F.model2 - 8} x={300} y={115} w={360} h={100} fill="#0F1726" stroke="#0F1726">
        <Wr f={f} at={F.model2 - 2} x={480} y={182} fs={44} t="AI MODEL" c="#fff" dur={10} />
      </DCard>
      <Wr f={f} at={F.plus} x={480} y={290} fs={64} t="+" c={K.amber} dur={4} />
      {[["TOOLS", "it can use", F.tools], ["GOAL", "to reach", F.goal], ["LOOP", "until it's done", F.loop]].map(([a, b, at], i) => (
        <DCard key={i} f={f} at={(at as number) - 8} x={40 + i * 305} y={320} w={270} h={180} fill={K.soft} stroke={K.blue} dur={10}>
          <Wr f={f} at={at as number} x={175 + i * 305} y={400} fs={48} t={a as string} c={K.blue} dur={8} />
          <Wr f={f} at={(at as number) + 8} x={175 + i * 305} y={455} fs={28} t={b as string} c={K.grey} dur={10} />
        </DCard>
      ))}
    </g>
  );
  if (f < F.more - 6) return ( // MODEL = BRAIN, PREDICTIONS -> ACTIONS
    <g>
      <Wr f={f} at={F.the2} x={480} y={85} fs={48} t="THE MODEL = THE BRAIN" dur={16} />
      <Wr f={f} at={F.predicts - 6} x={480} y={145} fs={32} t="it still predicts…" c={K.grey} dur={10} />
      <DCard f={f} at={F.predictions - 10} x={80} y={180} w={800} h={100} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.predictions - 2} x={480} y={245} fs={38} t="…but now predictions → ACTIONS" c={K.blue} dur={20} />
      </DCard>
      <CodeCard f={f} at={F.search2 - 14} x={200} y={320} w={560} fs={32} per={16} title="agent actions" lines={[`search("this")`, `open("that")`, `check()   # again`]} />
    </g>
  );
  if (f < F.remember - 6) return ( // MORE POWER, MORE RISK
    <g>
      <Wr f={f} at={F.more} x={480} y={90} fs={52} t="MORE POWER = MORE RISK" c={K.red} dur={18} />
      <Wr f={f} at={F.power} x={90} y={200} fs={34} t="power" a="start" dur={6} />
      <DBar f={f} at={F.power + 4} x={240} y={176} w={640} h={32} c={K.green} dur={18} />
      <Wr f={f} at={F.risk - 6} x={90} y={270} fs={34} t="risk" a="start" dur={6} />
      <DBar f={f} at={F.risk} x={240} y={246} w={640} h={32} c={K.red} dur={18} />
      <DCard f={f} at={F.act - 14} x={80} y={315} w={800} h={110}>
        <Wr f={f} at={F.act - 6} x={480} y={385} fs={38} t="can act… can also act WRONG" dur={34} />
      </DCard>
      <DCard f={f} at={F.guardrails - 14} x={180} y={460} w={600} h={90} r={45} fill={K.amber} stroke={K.amber} dur={10}>
        <Wr f={f} at={F.guardrails - 6} x={480} y={518} fs={34} t="GUARDRAILS → later lessons" dur={16} />
      </DCard>
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={85} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.chatbot3 - 6} x={80} y={120} w={800} h={120}>
        <Wr f={f} at={F.chatbot3} x={480} y={198} fs={50} t="CHATBOT = TALK" c={K.grey} dur={16} />
      </DCard>
      <DCard f={f} at={F.agent6 - 8} x={80} y={275} w={800} h={270} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.agent6} x={480} y={350} fs={50} t="AGENT =" c={K.blue} dur={8} />
        {[["MODEL", F.model4], ["TOOLS", F.tools2], ["GOAL", F.goal2], ["LOOP", F.loop2]].map(([t, at], i) => (
          <DCard key={i} f={f} at={(at as number) - 6} x={110 + i * 190} y={400} w={170} h={90} r={45} fill={K.blue} stroke={K.blue} dur={8}>
            <Wr f={f} at={(at as number) + 2} x={195 + i * 190} y={458} fs={32} t={t as string} c="#fff" dur={6} />
          </DCard>
        ))}
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="The four-step loop every AI agent runs." tomorrowAt={F.tomorrow} schoolAt={F.agent8 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.everything - 10, 0.2], [F.everything, 0.9], [F.more - 6, 0.9], [F.more, 0.3], [F.more + 10, 0.3], [F.act - 10, 0.9],
      [F.remember - 20, 0.9], [F.remember - 6, 0.2], [F.chatbot3, 0.9], [F.tomorrow, 0.9], [F.agent8, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.everything, "openPalm"], [F.agent4, "fingerUp"], [F.the2, "openPalm"], [F.more, "fingerUp"],
      [F.act, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent8, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.acts, F.acts + 30], [F.searches, F.searches + 30], [F.wrong, F.wrong + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.everything - 6, M], [F.everything + 10, S],
    [F.more - 8, S], [F.more + 4, Wd], [F.act - 16, Wd], [F.act - 6, S],
    [F.remember - 8, S], [F.remember + 6, Fc], [F.chatbot3 - 12, Fc], [F.chatbot3 - 2, S], [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l013" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L13" line1="CHATBOT" fs1={150} strike="TALKS" line2="AGENT ACTS" fs3={120} bubble1="BIG DIFF!" bubble2="chatbot vs agent" /></AbsoluteFill>
);
