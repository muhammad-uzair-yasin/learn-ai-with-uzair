// Agent School · L29 — "Let's Build a Real Agent. Right Now. (Part 1)"   projects/l029/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 29, TITLE = "Let's Build a Real Agent (Part 1)";
const W = cueFinder(WORDS);
const F = {
  lets: W("lets"), build: W("build"), real: W("real"), right: W("right"), welcome: W("welcome"),
  our: W("our"), job: W("job"), weather: W("weather"), math: W("math"), two: W("two"),
  step: W("step"), tools2: W("tools", 2), getweather: W("getweather"), calculate: W("calculate"), each: W("each"), description: W("description"), read: W("read"),
  step2: W("step", 2), system: W("system"), are: W("are"), use: W("use"),
  step3: W("step", 3), loop: W("loop"), send: W("send"), list: W("list"), if1: W("if"), run: W("run"), add: W("add"), loop2: W("loop", 2), if2: W("if", 2), answers: W("answers"), done: W("done"),
  step4: W("step", 4), stop: W("stop"), maximum: W("maximum"), five: W("five"),
  thats: W("thats"), around: W("around"), thirty: W("thirty"), no: W("no"), framework: W("framework"),
  remember: W("remember"), tools4: W("tools", 4), prompt2: W("prompt", 2), loop3: W("loop", 3), limit: W("limit"), thats2: W("thats", 2), tonight: W("tonight"),
  tomorrow: W("tomorrow"), agent5: W("agent", 5), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

const MONO = "DejaVu Sans Mono, monospace";
const cl = (v: number) => Math.max(0, Math.min(1, v));
/** Code card whose lines are typed at their own cue frames: [text, at, colour?]. */
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
  if (f < F.our - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 29" c={K.blue} dur={10} />
      <Wr f={f} at={F.lets} x={480} y={200} fs={88} t="LET'S BUILD" dur={12} />
      <Wr f={f} at={F.real - 2} x={480} y={320} fs={66} t="A REAL AI AGENT" c={K.blue} dur={14} />
      <DCard f={f} at={F.right - 4} x={300} y={400} w={360} h={110} r={55} fill={K.red} stroke={K.red} dur={8}>
        <Wr f={f} at={F.right + 4} x={480} y={473} fs={52} t="RIGHT NOW." c="#fff" dur={8} />
      </DCard>
    </g>
  );
  if (f < F.step - 6) return ( // THE JOB
    <g>
      <Wr f={f} at={F.our} x={480} y={80} fs={46} t="OUR AGENT'S JOB" dur={14} />
      <DCard f={f} at={F.weather - 10} x={80} y={130} w={370} h={220} fill={K.soft} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.weather - 2} x={265} y={230} fs={46} t="WEATHER" c={K.blue} dur={8} />
        <Wr f={f} at={F.weather + 8} x={265} y={295} fs={30} t="answer questions" c={K.grey} dur={10} />
      </DCard>
      <DCard f={f} at={F.math - 8} x={510} y={130} w={370} h={220} fill="#ECFAF3" stroke={K.green} dur={8}>
        <Wr f={f} at={F.math} x={695} y={230} fs={46} t="MATH" c={K.green} dur={6} />
        <Wr f={f} at={F.math + 8} x={695} y={295} fs={30} t="do the math" c={K.grey} dur={8} />
      </DCard>
      <DLine f={f} at={F.two - 6} x1={265} y1={360} x2={430} y2={440} c={K.ink} w={6} dur={6} />
      <DLine f={f} at={F.two - 6} x1={695} y1={360} x2={530} y2={440} c={K.ink} w={6} dur={6} />
      <Wr f={f} at={F.two} x={480} y={515} fs={64} t="= 2 TOOLS" c={K.amber} dur={10} />
    </g>
  );
  if (f < F.step2 - 6) return ( // STEP 1: TOOLS
    <g>
      <Wr f={f} at={F.step} x={40} y={66} fs={40} t="STEP 1 · THE TOOLS" c={K.blue} a="start" dur={14} />
      <Code f={f} at={F.tools2} x={40} y={100} w={880} rows={5} lines={[
        ["def get_weather(city):", F.getweather], ['    """Current weather for a city."""', F.description, "#7EE787"], ["", 0],
        ["def calculate(expression):", F.calculate], ['    """Do math on an expression."""', F.description + 14, "#7EE787"]]} />
      <DLine f={f} at={F.read - 14} x1={640} y1={440} x2={640} y2={372} c={K.green} w={6} head dur={8} />
      <Wr f={f} at={F.each - 2} x={480} y={500} fs={32} t="each one has a short description" dur={18} />
      <Wr f={f} at={F.read - 6} x={480} y={556} fs={32} t="the MODEL can read" c={K.green} dur={12} />
    </g>
  );
  if (f < F.step3 - 6) return ( // STEP 2: SYSTEM PROMPT
    <g>
      <Wr f={f} at={F.step2} x={40} y={66} fs={40} t="STEP 2 · SYSTEM PROMPT" c={K.blue} a="start" dur={16} />
      <Code f={f} at={F.system} x={40} y={110} w={880} rows={2} fs={28} lines={[
        ['SYSTEM = "You are a helpful assistant.', F.are, "#FFA657"], ['  Use tools when you need facts or math."', F.use, "#FFA657"]]} />
      <DCard f={f} at={F.use + 30} x={180} y={330} w={600} h={150} fill="#FFF8EC" stroke={K.amber} dur={10}>
        <Wr f={f} at={F.use + 38} x={480} y={392} fs={34} t="its job description" c={K.amber} dur={12} />
        <Wr f={f} at={F.use + 50} x={480} y={445} fs={28} t="+ when to reach for a tool" c={K.grey} dur={14} />
      </DCard>
    </g>
  );
  if (f < F.thats - 6) { // STEP 3: LOOP  + STEP 4: STOP RULE
    const strike = f >= F.maximum;
    return (
      <g>
        <Wr f={f} at={F.step3} x={40} y={62} fs={32} t="STEP 3 · THE LOOP" c={K.blue} a="start" dur={12} />
        <Wr f={f} at={F.step4} x={920} y={62} fs={32} t="STEP 4 · STOP RULE" c={K.red} a="end" dur={12} />
        <Code f={f} at={F.loop - 8} x={40} y={86} w={880} rows={8} fs={27} lines={[
          ["MAX_STEPS = 5", F.five, "#FFA657"],
          ["while True:", F.send - 6, strike ? "#6E7681" : undefined],
          ["    reply = model(messages, tools)", F.send + 6],
          ["    if reply.tool_call:", F.if1],
          ["        result = run(reply.tool_call)", F.run],
          ["        messages.append(result)  # loop again", F.add],
          ["    else:", F.if2],
          ["        return reply.text  # done", F.answers]]} />
        <DLine f={f} at={F.maximum} x1={58} y1={196} x2={248} y2={196} c={K.red} w={5} dur={6} />
        <Wr f={f} at={F.maximum + 6} x={280} y={205} fs={27} t="for step in range(MAX_STEPS):" c="#FFA657" a="start" dur={20} />
        <DTick f={f} at={F.done} x={860} y={540} ok s={0.6} />
        <Wr f={f} at={F.stop} x={480} y={560} fs={30} t="max 5 steps — then it stops" c={K.red} dur={16} />
      </g>
    );
  }
  if (f < F.remember - 6) return ( // ~30 LINES, NO FRAMEWORK
    <g>
      <Wr f={f} at={F.thats} x={480} y={80} fs={44} t="THAT'S THE WHOLE AGENT" dur={16} />
      {[...Array(30)].map((_, i) => <DBar key={i} f={f} at={F.around + i * 1.2} x={80 + Math.floor(i / 10) * 140} y={120 + (i % 10) * 34} w={40 + ((i * 37) % 70)} h={16} c={[K.blue, K.green, K.amber, K.violet][i % 4]} dur={4} />)}
      <Wr f={f} at={F.thirty} x={700} y={240} fs={80} t="≈ 30" c={K.blue} dur={10} />
      <Wr f={f} at={F.thirty + 10} x={700} y={300} fs={34} t="lines of code" dur={12} />
      <DCard f={f} at={F.no - 6} x={520} y={360} w={360} h={110} r={30} fill="#FFF1F0" stroke={K.red} dur={8}>
        <Wr f={f} at={F.framework - 4} x={700} y={428} fs={40} t="framework" c={K.grey} dur={10} />
      </DCard>
      <DLine f={f} at={F.framework + 8} x1={560} y1={418} x2={840} y2={410} c={K.red} w={10} dur={6} />
      <Wr f={f} at={F.no} x={700} y={530} fs={40} t="NO FRAMEWORK" c={K.red} dur={12} />
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={80} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      {[["TOOLS", F.tools4, K.green], ["PROMPT", F.prompt2, K.amber], ["LOOP", F.loop3, K.violet], ["LIMIT", F.limit, K.red]].map(([t, at, c], i) => (
        <DCard key={i} f={f} at={(at as number) - 6} x={40 + i * 225} y={140} w={205} h={170} stroke={c as string} dur={6}>
          <Wr f={f} at={at as number} x={142 + i * 225} y={240} fs={40} t={t as string} c={c as string} dur={6} />
        </DCard>
      ))}
      <DCard f={f} at={F.thats2 - 6} x={110} y={370} w={740} h={130} fill={K.soft} stroke={K.blue} dur={10}>
        <Wr f={f} at={F.thats2 + 2} x={480} y={452} fs={40} t="an agent you can build tonight" c={K.blue} dur={18} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="We run it live + add a guardrail" tomorrowAt={F.tomorrow} schoolAt={F.agent5 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.our, 0.9], [F.thats - 6, 0.9], [F.thats, 0.3], [F.around, 0.9],
      [F.remember - 6, 0.9], [F.remember, 0.2], [F.tools4 - 4, 0.9], [F.tomorrow, 0.9], [F.agent5, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.our, "openPalm"], [F.step, "fingerUp"], [F.getweather, "openPalm"], [F.step2, "fingerUp"], [F.system + 10, "openPalm"],
      [F.step3, "fingerUp"], [F.send, "openPalm"], [F.step4, "fingerUp"], [F.thats, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent5, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.right, F.right + 30], [F.thirty, F.thirty + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.our - 6, M], [F.our + 10, S],
    [F.thats - 6, S], [F.thats + 8, Wd], [F.around - 2, Wd], [F.around + 10, S],
    [F.remember - 6, S], [F.remember + 4, Wd], [F.tools4 - 6, Wd], [F.tools4 + 6, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l029" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L29" line1="REAL AGENT" strike="FRAMEWORK" line2="30 LINES" fs1={130} fs2={118} fs3={150} bubble1="ONLY 30?!" bubble2="build it tonight" /></AbsoluteFill>
);
