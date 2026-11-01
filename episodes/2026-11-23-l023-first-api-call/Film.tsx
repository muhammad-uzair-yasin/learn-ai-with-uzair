// Agent School · L23 — "What One AI Question Actually Costs — Your First API Call"   projects/l023/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, CodeCard, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 23, TITLE = "What One AI Question Actually Costs";
const W = cueFinder(WORDS);
const F = {
  what: W("what"), actually: W("actually"), cost: W("cost"), welcome: W("welcome"),
  apps: W("apps"), chatgpt: W("chatgpt"), shop: W("shop"), builders: W("builders"), api: W("api"), back: W("back"), door: W("door"), code: W("code"),
  an: W("an"), call: W("call"), message: W("message"), model: W("model"), few: W("few"), answer: W("answer"), text: W("text"),
  pay: W("pay"), token: W("token"), tokens: W("tokens"), prompt2: W("prompt", 2), tokens2: W("tokens", 2), out: W("out"), reply: W("reply"), output: W("output"), cost2: W("cost", 2),
  short: W("short"), small2: W("small", 2), less: W("less"), cent: W("cent"), but: W("but"), big: W("big"), long: W("long"), agent2: W("agent", 2), hundred: W("hundred"), adds: W("adds"), fast: W("fast"),
  so: W("so"), read: W("read"), bill: W("bill"), tokens4: W("tokens", 4), out2: W("out", 2), times2: W("times", 2), price: W("price"), times3: W("times", 3), calls2: W("calls", 2),
  remember: W("remember"), cost3: W("cost", 3), tokens6: W("tokens", 6), price2: W("price", 2), calls3: W("calls", 3),
  tomorrow: W("tomorrow"), agent3: W("agent", 3), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.apps - 6) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={60} fs={30} t="AGENT SCHOOL · LESSON 23" c={K.blue} dur={10} />
      <Wr f={f} at={F.what} x={480} y={170} fs={60} t="WHAT DOES ONE" dur={10} />
      <Wr f={f} at={F.what + 10} x={480} y={250} fs={60} t="AI QUESTION" c={K.blue} dur={10} />
      <Wr f={f} at={F.actually - 6} x={480} y={330} fs={60} t="ACTUALLY COST?" dur={14} />
      <DCard f={f} at={F.cost} x={330} y={380} w={300} h={170} r={85} fill={K.green} stroke={K.green} dur={8}>
        <Wr f={f} at={F.cost + 6} x={480} y={495} fs={96} t="$ ?" c="#fff" dur={8} />
      </DCard>
    </g>
  );
  if (f < F.an - 6) return ( // SHOP WINDOW vs BACK DOOR
    <g>
      <DCard f={f} at={F.apps - 4} x={40} y={80} w={420} h={430}>
        <Wr f={f} at={F.apps + 2} x={250} y={150} fs={40} t="APPS" dur={8} />
        <Wr f={f} at={F.chatgpt - 4} x={250} y={220} fs={30} t="like ChatGPT" c={K.grey} dur={12} />
        <DCard f={f} at={F.shop - 8} x={90} y={260} w={320} h={180} fill={K.soft} stroke={K.blue}>
          <Wr f={f} at={F.shop} x={250} y={340} fs={40} t="SHOP" c={K.blue} dur={6} />
          <Wr f={f} at={F.shop + 6} x={250} y={400} fs={40} t="WINDOW" c={K.blue} dur={8} />
        </DCard>
      </DCard>
      <DCard f={f} at={F.builders - 4} x={500} y={80} w={420} h={430} fill="#0F1726" stroke="#0F1726">
        <Wr f={f} at={F.builders} x={710} y={150} fs={34} t="BUILDERS USE" c="#9FB3D1" dur={10} />
        <Wr f={f} at={F.api - 2} x={710} y={240} fs={80} t="API" c="#7EE787" dur={8} />
        <Wr f={f} at={F.back} x={710} y={330} fs={40} t="the back door" c="#E6EDF3" dur={10} />
        <Wr f={f} at={F.code - 4} x={710} y={410} fs={30} t="your code talks to" c="#9FB3D1" dur={12} />
      </DCard>
    </g>
  );
  if (f < F.pay - 6) return ( // THE API CALL
    <g>
      <Wr f={f} at={F.an} x={480} y={60} fs={40} t="AN API CALL = A SMALL MESSAGE" c={K.blue} dur={20} />
      <CodeCard f={f} at={F.message - 4} x={60} y={90} w={840} fs={28} per={18} title="first_call.py"
        lines={["reply = client.ask(", "    model=\"small-model\",", "    system=\"Be brief.\",", "    question=\"What is AI?\")", "print(reply.text)"]} />
      <Wr f={f} at={F.few} x={480} y={455} fs={30} t="a few lines of code" c={K.grey} dur={12} />
      <DCard f={f} at={F.answer - 8} x={140} y={480} w={680} h={90} r={45} fill={K.soft} stroke={K.green} dur={8}>
        <Wr f={f} at={F.answer} x={480} y={538} fs={36} t="→ the answer comes back as TEXT" c={K.green} dur={20} />
      </DCard>
    </g>
  );
  if (f < F.short - 6) return ( // PAY PER TOKEN
    <g>
      <Wr f={f} at={F.pay} x={480} y={70} fs={50} t="YOU PAY PER TOKEN" c={K.blue} dur={14} />
      <DCard f={f} at={F.tokens - 6} x={40} y={120} w={260} h={150} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.tokens} x={170} y={185} fs={36} t="TOKENS IN" c={K.blue} dur={10} />
        <Wr f={f} at={F.prompt2 - 4} x={170} y={235} fs={28} t="your prompt" dur={8} />
      </DCard>
      <DLine f={f} at={F.prompt2 + 4} x1={310} y1={195} x2={370} y2={195} c={K.grey} w={6} head dur={5} />
      <DCard f={f} at={F.prompt2 + 6} x={380} y={140} w={200} h={110} fill={K.ink} stroke={K.ink} dur={8}>
        <Wr f={f} at={F.prompt2 + 12} x={480} y={208} fs={34} t="MODEL" c="#fff" dur={6} />
      </DCard>
      <DLine f={f} at={F.tokens2 - 2} x1={590} y1={195} x2={650} y2={195} c={K.grey} w={6} head dur={5} />
      <DCard f={f} at={F.tokens2} x={660} y={120} w={260} h={150} fill="#FFF7EC" stroke={K.amber}>
        <Wr f={f} at={F.out - 4} x={790} y={185} fs={36} t="TOKENS OUT" c={K.amber} dur={10} />
        <Wr f={f} at={F.reply - 2} x={790} y={235} fs={28} t="the reply" dur={8} />
      </DCard>
      <Wr f={f} at={F.output - 2} x={480} y={350} fs={34} t="output tokens usually cost MORE" dur={22} />
      <Wr f={f} at={F.cost2 - 10} x={60} y={430} fs={28} t="in" a="start" c={K.blue} dur={4} />
      <DBar f={f} at={F.cost2 - 6} x={140} y={405} w={240} h={34} c={K.blue} />
      <Wr f={f} at={F.cost2} x={60} y={510} fs={28} t="out" a="start" c={K.amber} dur={4} />
      <DBar f={f} at={F.cost2 + 4} x={140} y={485} w={720} h={34} c={K.amber} />
    </g>
  );
  if (f < F.so - 6) return ( // CHEAP vs ADDS UP FAST
    <g>
      <DCard f={f} at={F.short - 6} x={40} y={50} w={880} h={190} fill={K.soft} stroke={K.green}>
        <Wr f={f} at={F.short} x={80} y={115} fs={34} t="short question + small model" a="start" dur={20} />
        <Wr f={f} at={F.less - 6} x={80} y={195} fs={46} t="< 1/10 of a cent" a="start" c={K.green} dur={16} />
        <DTick f={f} at={F.cent + 4} x={840} y={150} ok s={0.7} />
      </DCard>
      <DCard f={f} at={F.but} x={40} y={270} w={880} h={300} fill="#FFF1F0" stroke={K.red}>
        <Wr f={f} at={F.big} x={80} y={330} fs={32} t="big model" a="start" dur={8} />
        <Wr f={f} at={F.long - 2} x={290} y={330} fs={32} t="+ long document" a="start" dur={12} />
        <Wr f={f} at={F.agent2 - 4} x={80} y={385} fs={32} t="+ an agent calling it ×100" a="start" dur={20} />
        {[...Array(20)].map((_, i) => <DBar key={i} f={f} at={F.hundred + i * 1.5} x={80 + i * 41} y={410} w={30} h={30} c={K.red} dur={4} />)}
        <Wr f={f} at={F.adds - 2} x={480} y={530} fs={60} t="ADDS UP FAST" c={K.red} dur={14} />
      </DCard>
    </g>
  );
  if (f < F.remember - 6) return ( // READ THE BILL
    <g>
      <Wr f={f} at={F.read - 6} x={480} y={70} fs={44} t="LEARN TO READ THE BILL" dur={18} />
      <DCard f={f} at={F.bill} x={180} y={100} w={600} h={460}>
        <Wr f={f} at={F.tokens4} x={230} y={175} fs={36} t="tokens in" a="start" c={K.blue} dur={8} />
        <Wr f={f} at={F.tokens4 + 20} x={230} y={245} fs={36} t="+ tokens out" a="start" c={K.amber} dur={10} />
        <Wr f={f} at={F.times2} x={230} y={315} fs={36} t="× price" a="start" dur={8} />
        <Wr f={f} at={F.times3} x={230} y={385} fs={36} t="× calls" a="start" dur={8} />
        <DLine f={f} at={F.calls2 + 4} x1={230} y1={420} x2={730} y2={420} c={K.ink} w={5} dur={8} />
        <Wr f={f} at={F.calls2 + 12} x={230} y={500} fs={52} t="= YOUR BILL" a="start" c={K.green} dur={12} />
      </DCard>
    </g>
  );
  if (f < F.tomorrow - 6) { // REMEMBER: COST = TOKENS × PRICE × CALLS
    const parts: [string, number, string][] = [["TOKENS", F.tokens6, K.blue], ["PRICE", F.price2, K.amber], ["CALLS", F.calls3 - 4, K.green]];
    return (
      <g>
        <Wr f={f} at={F.remember} x={480} y={70} fs={40} t="REMEMBER" c={K.amber} dur={10} />
        <Wr f={f} at={F.cost3} x={480} y={210} fs={90} t="COST =" dur={12} />
        {parts.map(([t, at, c], i) => (
          <g key={i}>
            <DCard f={f} at={at - 6} x={40 + i * 310} y={290} w={260} h={140} fill={K.soft} stroke={c}>
              <Wr f={f} at={at} x={170 + i * 310} y={378} fs={46} t={t} c={c} dur={8} />
            </DCard>
            {i < 2 && <Wr f={f} at={at + 8} x={325 + i * 310} y={380} fs={48} t="×" dur={4} />}
          </g>
        ))}
        <Wr f={f} at={F.calls3 + 10} x={480} y={520} fs={30} t="(how many calls)" c={K.grey} dur={10} />
      </g>
    );
  }
  return <EndSlide f={f} lesson={LESSON} next="Build from scratch or use a framework? How to decide" tomorrowAt={F.tomorrow} schoolAt={F.agent3 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.apps, 0.9], [F.text + 10, 0.9], [F.text + 20, 0.3], [F.pay, 0.9],
      [F.remember - 6, 0.9], [F.tomorrow, 0.9], [F.agent3, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.apps, "openPalm"], [F.pay, "fingerUp"], [F.tokens, "openPalm"], [F.adds, "fingerUp"], [F.so, "openPalm"],
      [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent3, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.actually, F.actually + 30], [F.less, F.less + 30], [F.adds, F.adds + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.apps - 12, M], [F.apps + 2, S],
    [F.text + 10, S], [F.text + 20, Wd], [F.pay - 4, Wd], [F.pay + 6, S],
    [F.fast + 16, S], [F.fast + 26, M], [F.so - 2, M], [F.so + 10, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l023" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L23" line1="ONE QUESTION" strike="FREE" line2="= $ ???" fs1={100} bubble1="API COSTS" bubble2="your first API call" /></AbsoluteFill>
);
