// Agent School · L16 — "The USB-C of AI — What Is MCP?"   projects/l016/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide, Recap } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 16, TITLE = "The USB-C of AI: What Is MCP?";
const W = cueFinder(WORDS);
const F = {
  usbc: W("usbc"), ai: W("ai"), welcome: W("welcome"),
  yesterday: W("yesterday"), problem: W("problem"), every: W("every"), custom: W("custom"), code: W("code"),
  mcp: W("mcp"), model: W("model"), fixes: W("fixes"), anthropic: W("anthropic"), open: W("open"), late: W("late"),
  remember: W("remember"), drawers: W("drawers"), different: W("different"), chargers: W("chargers"), usbc2: W("usbc", 2), made: W("made"), one: W("one"), everything: W("everything"), mcp2: W("mcp", 2),
  build: W("build"), server: W("server"), once: W("once"), calendar: W("calendar"), database: W("database"), files: W("files"), any: W("any"), speaks: W("speaks"), plug2: W("plug", 2),
  spread: W("spread"), openai: W("openai"), google: W("google"), many: W("many"), added: W("added"), support: W("support"),
  a: W("a"), plug3: W("plug", 3), care: W("care"), only: W("only"), trust: W("trust"), least: W("least"),
  remember2: W("remember", 2), build2: W("build", 2), plug4: W("plug", 4), thats: W("thats"),
  tomorrow: W("tomorrow"), agent3: W("agent", 3), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

/** USB-C plug drawn by the pen; (x,y) = centre of the connector. */
const Plug: React.FC<{ f: number; at: number; x: number; y: number; s?: number }> = ({ f, at, x, y, s = 1 }) => (
  <g>
    <DLine f={f} at={at + 14} x1={x} y1={y + 40 * s} x2={x} y2={y + 110 * s} c={K.ink} w={18 * s} dur={6} />
    <DCard f={f} at={at + 6} x={x - 40 * s} y={y + 18 * s} w={80 * s} h={34 * s} r={10 * s} fill="#3A4560" stroke={K.ink} dur={8} />
    <DCard f={f} at={at} x={x - 70 * s} y={y - 30 * s} w={140 * s} h={60 * s} r={30 * s} fill="#C9D3E6" stroke={K.ink} dur={10} />
    <DCard f={f} at={at + 8} x={x - 44 * s} y={y - 9 * s} w={88 * s} h={18 * s} r={9 * s} fill={K.ink} stroke={K.ink} dur={6} />
  </g>
);

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.yesterday - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 16" c={K.blue} dur={10} />
      <Wr f={f} at={F.usbc - 8} x={480} y={190} fs={96} t="THE USB-C" dur={14} />
      <Wr f={f} at={F.ai - 10} x={480} y={300} fs={96} t="OF AI" c={K.blue} dur={10} />
      <Plug f={f} at={F.ai + 2} x={480} y={410} s={1.1} />
    </g>
  );
  if (f < F.mcp - 6) { // THE PROBLEM: custom code everywhere
    const L = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    return (
      <g>
        <Recap f={f} at={F.yesterday} until={F.problem} y={70} fs={32} t="tools let AI act" />
        <Wr f={f} at={F.problem - 6} x={480} y={135} fs={48} t="TODAY'S PROBLEM" c={K.red} dur={12} />
        {["App A", "App B", "App C"].map((t, i) => (
          <DCard key={i} f={f} at={F.every + i * 4} x={60} y={180 + i * 115} w={200} h={76} r={16} fill={K.soft} stroke={K.blue} dur={8}>
            <Wr f={f} at={F.every + 6 + i * 4} x={160} y={230 + i * 115} fs={32} t={t} c={K.blue} dur={6} />
          </DCard>
        ))}
        {["Tool 1", "Tool 2", "Tool 3"].map((t, i) => (
          <DCard key={i} f={f} at={F.every + 10 + i * 4} x={700} y={180 + i * 115} w={200} h={76} r={16} fill="#FFF4E2" stroke={K.amber} dur={8}>
            <Wr f={f} at={F.every + 16 + i * 4} x={800} y={230 + i * 115} fs={32} t={t} dur={6} />
          </DCard>
        ))}
        {L.map(([a, b], i) => <DLine key={i} f={f} at={F.custom - 6 + i * 2.5} x1={262} y1={218 + a * 115 + (b - 1) * 14} x2={698} y2={218 + b * 115 + (a - 1) * 14} c={i % 2 ? K.red : K.amber} w={5} dur={6} />)}
        <Wr f={f} at={F.code - 4} x={480} y={565} fs={34} t="custom tool code for every app" c={K.red} dur={16} />
      </g>
    );
  }
  if (f < F.remember - 6) return ( // MCP
    <g>
      <Wr f={f} at={F.mcp - 2} x={480} y={140} fs={100} t="MCP" c={K.blue} dur={8} />
      <Wr f={f} at={F.model - 4} x={480} y={220} fs={44} t="Model Context Protocol" dur={26} />
      <DTick f={f} at={F.fixes} x={720} y={110} ok s={0.8} />
      <DCard f={f} at={F.anthropic - 10} x={130} y={270} w={700} h={270} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.anthropic - 2} x={480} y={340} fs={38} t="Anthropic released it" dur={14} />
        <Wr f={f} at={F.open - 6} x={480} y={420} fs={46} t="as an OPEN STANDARD" c={K.green} dur={14} />
        <Wr f={f} at={F.late - 4} x={480} y={500} fs={40} t="late 2024" c={K.amber} dur={10} />
      </DCard>
    </g>
  );
  if (f < F.build - 6) return ( // CHARGERS -> USB-C -> MCP
    <g>
      <DCard f={f} at={F.drawers - 6} x={40} y={60} w={420} h={370} fill="#FFF4E2" stroke={K.amber}>
        <DCard f={f} at={F.drawers + 4} x={90} y={110} w={80} h={44} r={8} fill={K.amber} stroke={K.ink} dur={6} />
        <DCard f={f} at={F.drawers + 8} x={220} y={95} w={50} h={70} r={6} fill={K.red} stroke={K.ink} dur={6} />
        <DCard f={f} at={F.different - 4} x={320} y={120} w={100} h={36} r={18} fill={K.violet} stroke={K.ink} dur={6} />
        <DCard f={f} at={F.different} x={110} y={220} w={64} h={64} r={32} fill={K.green} stroke={K.ink} dur={6} />
        <DCard f={f} at={F.different + 4} x={260} y={230} w={90} h={44} r={4} fill={K.cyan} stroke={K.ink} dur={6} />
        <DLine f={f} at={F.drawers + 10} x1={130} y1={155} x2={300} y2={300} c={K.ink} w={6} dur={6} />
        <DLine f={f} at={F.drawers + 14} x1={245} y1={166} x2={140} y2={330} c={K.ink} w={6} dur={6} />
        <DLine f={f} at={F.different + 8} x1={370} y1={157} x2={220} y2={340} c={K.ink} w={6} dur={6} />
        <Wr f={f} at={F.chargers - 6} x={250} y={400} fs={32} t="different chargers" c={K.red} dur={12} />
      </DCard>
      <DCard f={f} at={F.usbc2 - 8} x={500} y={60} w={420} h={370} fill={K.soft} stroke={K.blue}>
        <Plug f={f} at={F.usbc2} x={710} y={150} />
        <Wr f={f} at={F.made} x={710} y={330} fs={48} t="USB-C" c={K.blue} dur={8} />
        <Wr f={f} at={F.one} x={710} y={395} fs={30} t="one plug fits everything" c={K.green} dur={16} />
      </DCard>
      <DCard f={f} at={F.mcp2 - 8} x={130} y={465} w={700} h={95} r={48} fill={K.blue} stroke={K.blue} dur={10}>
        <Wr f={f} at={F.mcp2} x={480} y={526} fs={38} t="MCP does that for AI tools" c="#fff" dur={18} />
      </DCard>
    </g>
  );
  if (f < F.spread - 6) return ( // BUILD ONCE, PLUG INTO ANY AI APP
    <g>
      <Wr f={f} at={F.build} x={480} y={70} fs={40} t="BUILD AN MCP SERVER ONCE" dur={18} />
      {[["calendar", F.calendar], ["database", F.database], ["files", F.files]].map(([t, at], i) => (
        <g key={i}>
          <DCard f={f} at={(at as number) - 6} x={40} y={130 + i * 125} w={210} h={76} r={16} fill="#FFF4E2" stroke={K.amber} dur={8}>
            <Wr f={f} at={(at as number)} x={145} y={180 + i * 125} fs={32} t={t as string} dur={8} />
          </DCard>
          <DLine f={f} at={(at as number) + 6} x1={252} y1={168 + i * 125} x2={348} y2={295} c={K.amber} w={6} dur={6} />
        </g>
      ))}
      <DCard f={f} at={F.server - 8} x={350} y={230} w={260} h={130} fill="#0F1726" stroke="#0F1726" dur={10}>
        <Wr f={f} at={F.server - 2} x={480} y={290} fs={36} t="MCP" c="#7EE787" dur={4} />
        <Wr f={f} at={F.server + 2} x={480} y={335} fs={34} t="SERVER" c="#fff" dur={6} />
      </DCard>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <DCard f={f} at={F.any + 4 + i * 5} x={710} y={130 + i * 125} w={210} h={76} r={16} fill={K.soft} stroke={K.blue} dur={8}>
            <Wr f={f} at={F.any + 10 + i * 5} x={815} y={180 + i * 125} fs={32} t="AI app" c={K.blue} dur={6} />
          </DCard>
          <DLine f={f} at={F.plug2 - 4 + i * 4} x1={612} y1={295} x2={708} y2={168 + i * 125} c={K.blue} w={6} head dur={6} />
        </g>
      ))}
      <Wr f={f} at={F.speaks - 8} x={480} y={540} fs={34} t="any AI app that speaks MCP plugs in" c={K.green} dur={26} />
    </g>
  );
  if (f < F.a - 6) return ( // IT SPREAD FAST
    <g>
      <Wr f={f} at={F.spread - 2} x={480} y={100} fs={60} t="IT SPREAD FAST" c={K.blue} dur={12} />
      {[["OpenAI", F.openai, 40], ["Google", F.google, 40], ["many others", F.many, 32]].map(([t, at, fs], i) => (
        <g key={i}>
          <DCard f={f} at={(at as number) - 8} x={60 + i * 300} y={170} w={240} h={130} dur={10}>
            <Wr f={f} at={at as number} x={180 + i * 300} y={250} fs={fs as number} t={t as string} dur={8} />
          </DCard>
          <DTick f={f} at={F.support - 6 + i * 6} x={180 + i * 300} y={380} ok s={0.8} />
        </g>
      ))}
      <Wr f={f} at={F.added - 4} x={480} y={520} fs={44} t="added MCP support" c={K.green} dur={14} />
    </g>
  );
  if (f < F.remember2 - 6) return ( // CARE
    <g>
      <Wr f={f} at={F.plug3 - 4} x={480} y={85} fs={38} t="a plug that fits everything…" dur={20} />
      <Wr f={f} at={F.care - 10} x={480} y={160} fs={56} t="…NEEDS CARE" c={K.amber} dur={12} />
      <DCard f={f} at={F.only - 10} x={80} y={210} w={800} h={130}>
        <Wr f={f} at={F.only - 2} x={480} y={290} fs={38} t="only connect servers you TRUST" dur={30} />
      </DCard>
      <DCard f={f} at={F.least - 16} x={80} y={380} w={800} h={130}>
        <Wr f={f} at={F.least - 10} x={480} y={460} fs={34} t="give them the LEAST access they need" dur={30} />
      </DCard>
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember2} x={480} y={85} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.build2 - 6} x={80} y={120} w={800} h={120}>
        <Wr f={f} at={F.build2} x={480} y={198} fs={46} t="BUILD THE TOOL ONCE" dur={16} />
      </DCard>
      <DCard f={f} at={F.plug4 - 8} x={80} y={270} w={800} h={120} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.plug4} x={480} y={348} fs={46} t="PLUG IT INTO ANY AI" c={K.blue} dur={16} />
      </DCard>
      <Wr f={f} at={F.thats - 4} x={480} y={500} fs={70} t="THAT'S MCP" c={K.green} dur={12} />
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="Your agent remembers you. Selectively." tomorrowAt={F.tomorrow} schoolAt={F.agent3 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.yesterday - 10, 0.2], [F.yesterday, 0.9], [F.remember - 8, 0.9], [F.remember, 0.25], [F.drawers - 10, 0.25], [F.drawers, 0.9],
      [F.remember2 - 20, 0.9], [F.remember2 - 6, 0.2], [F.build2, 0.9], [F.tomorrow, 0.9], [F.agent3, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.yesterday, "openPalm"], [F.mcp, "fingerUp"], [F.anthropic, "openPalm"], [F.mcp2, "fingerUp"],
      [F.build, "openPalm"], [F.a, "fingerUp"], [F.only + 20, "openPalm"], [F.remember2 - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent3, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.usbc, F.usbc + 30], [F.drawers, F.drawers + 24], [F.spread, F.spread + 30]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.yesterday - 6, M], [F.yesterday + 10, S],
    [F.remember - 10, S], [F.remember, Fc], [F.drawers - 14, Fc], [F.drawers - 4, S], [F.spread - 8, S], [F.spread + 4, Wd], [F.openai - 6, Wd], [F.openai + 4, S],
    [F.remember2 - 8, S], [F.remember2 + 6, Fc], [F.build2 - 12, Fc], [F.build2 - 2, S], [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l016" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L16" line1="THE USB-C" fs1={140} line2="OF AI" fs3={160} bubble1="WHAT IS MCP?" bubble2="one plug for all tools" />
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}><text x={540} y={830} textAnchor="middle" fontFamily="InterLocal, Inter, sans-serif" fontWeight={800} fontSize={84} fill={K.amber}>= MCP</text></svg></AbsoluteFill>
);
