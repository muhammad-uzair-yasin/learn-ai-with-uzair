// Agent School · L7 — "The Secret Message Before Everything You Type — System Prompts"   projects/l007/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide, Recap } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 7, TITLE = "The Secret Message: System Prompts";
const W = cueFinder(WORDS);
const F = {
  theres: W("theres"), secret: W("secret"), message: W("message"), before: W("before"), everything: W("everything"), welcome: W("welcome"),
  yesterday: W("yesterday"), great: W("great"), today: W("today"), never: W("never"), see: W("see"),
  every: W("every"), hidden: W("hidden"), first: W("first"), system: W("system"), tells: W("tells"), who: W("who"), rules: W("rules"), before2: W("before", 2), say: W("say"),
  you5: W("you", 5), company: W("company"), polite: W("polite"), discuss: W("discuss"), pricing: W("pricing"),
  same: W("same"), different: W("different"), tutor: W("tutor"), lawyerstyle: W("lawyerstyle"), pirate: W("pirate"), arr: W("arr"),
  for2: W("for", 2), builders: W("builders"), personality: W("personality"), rules2: W("rules", 2), boundaries: W("boundaries"),
  but: W("but"), guidance: W("guidance"), lock: W("lock"), clever: W("clever"), around: W("around"), fight: W("fight"), twentyone: W("twentyone"),
  remember: W("remember"), system3: W("system", 3), job: W("job"), give: W("give"),
  tomorrow: W("tomorrow"), agent4: W("agent", 4), lesson3: W("lesson", 3), subscribe: W("subscribe"),
};

/** dashed "hidden" card (local helper: DCard + dashed overlay) */
const Hidden: React.FC<{ f: number; at: number; x: number; y: number; w: number; h: number; children?: React.ReactNode }> = ({ f, at, x, y, w, h, children }) => (
  <DCard f={f} at={at} x={x} y={y} w={w} h={h} fill="#F3EFFF" stroke={K.violet}>
    <rect x={x + 8} y={y + 8} width={w - 16} height={h - 16} rx={16} fill="none" stroke={K.violet} strokeWidth={3} strokeDasharray="12 10" opacity={0.6} />
    {children}
  </DCard>
);

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.yesterday - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 7" c={K.blue} dur={10} />
      <Wr f={f} at={F.theres} x={480} y={165} fs={66} t="A SECRET MESSAGE…" dur={16} />
      <Hidden f={f} at={F.message - 4} x={190} y={205} w={580} h={130}>
        <Wr f={f} at={F.message + 6} x={480} y={287} fs={48} t="[ hidden ]" c={K.violet} dur={10} />
      </Hidden>
      <DLine f={f} at={F.before} x1={480} y1={345} x2={480} y2={400} c={K.amber} w={7} head dur={8} />
      <Wr f={f} at={F.before + 2} x={560} y={385} fs={28} t="comes first" c={K.amber} a="start" dur={8} />
      <DCard f={f} at={F.everything - 4} x={140} y={415} w={680} h={100} r={50} fill="#F4F6FA" stroke="#C9D3E6" dur={10}>
        <Wr f={f} at={F.everything + 4} x={480} y={478} fs={38} t="…everything you type" c={K.grey} dur={14} />
      </DCard>
    </g>
  );
  if (f < F.every - 6) return ( // THE PROMPT YOU NEVER SEE
    <g>
      <Recap f={f} at={F.yesterday} until={F.great} y={70} fs={30} t="writing great prompts" />
      <DCard f={f} at={F.great - 4} x={240} y={110} w={480} h={110} fill="#E9F8F0" stroke={K.green} dur={10}>
        <Wr f={f} at={F.great + 4} x={480} y={180} fs={40} t="your prompt" c={K.green} dur={10} />
      </DCard>
      <Wr f={f} at={F.today} x={480} y={300} fs={44} t="TODAY:" c={K.blue} dur={8} />
      <Hidden f={f} at={F.never - 10} x={70} y={340} w={820} h={180}>
        <Wr f={f} at={F.never - 2} x={480} y={450} fs={44} t="THE PROMPT YOU NEVER SEE" c={K.violet} dur={20} />
      </Hidden>
    </g>
  );
  if (f < F.you5 - 6) return ( // HIDDEN FIRST MESSAGE
    <g>
      <Wr f={f} at={F.every} x={480} y={65} fs={34} t="EVERY AI APP SENDS…" dur={14} />
      <Hidden f={f} at={F.hidden - 4} x={110} y={95} w={740} h={250}>
        <Wr f={f} at={F.hidden + 4} x={150} y={150} fs={26} t="1st message · hidden" c={K.grey} a="start" dur={12} />
        <Wr f={f} at={F.system - 2} x={480} y={210} fs={50} t="SYSTEM PROMPT" c={K.violet} dur={14} />
        <Wr f={f} at={F.who - 4} x={480} y={265} fs={34} t="• who to be" a="middle" dur={10} />
        <Wr f={f} at={F.rules - 4} x={480} y={315} fs={34} t="• what rules to follow" dur={14} />
      </Hidden>
      <DLine f={f} at={F.before2} x1={480} y1={355} x2={480} y2={420} c={K.amber} w={7} head dur={8} />
      <Wr f={f} at={F.before2 + 4} x={560} y={400} fs={28} t="then…" c={K.amber} a="start" dur={6} />
      <DCard f={f} at={F.say - 6} x={140} y={435} w={680} h={100} r={50} fill="#F4F6FA" stroke="#C9D3E6" dur={10}>
        <Wr f={f} at={F.say + 2} x={480} y={498} fs={38} t="your first word" c={K.grey} dur={10} />
      </DCard>
    </g>
  );
  if (f < F.same - 6) return ( // EXAMPLE SYSTEM PROMPT
    <g>
      <Wr f={f} at={F.you5 - 4} x={480} y={70} fs={36} t="A SYSTEM PROMPT" c={K.violet} dur={10} />
      <DCard f={f} at={F.you5 - 2} x={80} y={100} w={800} h={430} fill="#0F1726" stroke="#0F1726">
        <rect x={80} y={100} width={800} height={50} rx={22} fill="#1B2538" />
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <circle key={i} cx={110 + i * 24} cy={125} r={8} fill={c} />)}
        <Wr f={f} at={F.you5 + 4} x={120} y={215} fs={34} t="You are a helpful support agent" c="#E6EDF3" a="start" dur={22} />
        <Wr f={f} at={F.company - 6} x={120} y={275} fs={34} t="for this company." c="#E6EDF3" a="start" dur={12} />
        <Wr f={f} at={F.polite - 6} x={120} y={365} fs={34} t="Be polite." c="#7EE787" a="start" dur={8} />
        <Wr f={f} at={F.discuss} x={120} y={455} fs={34} t="Never discuss pricing." c="#FF7B72" a="start" dur={16} />
      </DCard>
    </g>
  );
  if (f < F.for2 - 6) return ( // SAME MODEL, DIFFERENT PERSONAS
    <g>
      <Wr f={f} at={F.same} x={480} y={70} fs={32} t="SAME MODEL + DIFFERENT SYSTEM PROMPT" dur={22} />
      <DCard f={f} at={F.different + 4} x={330} y={105} w={300} h={100} r={50} fill={K.ink} stroke={K.ink} dur={10}>
        <Wr f={f} at={F.different + 10} x={480} y={168} fs={40} t="MODEL" c="#fff" dur={8} />
      </DCard>
      <DLine f={f} at={F.tutor - 8} x1={400} y1={215} x2={190} y2={290} c={K.amber} w={6} head dur={6} />
      <DCard f={f} at={F.tutor - 2} x={50} y={300} w={270} h={150} fill={K.soft} stroke={K.blue} dur={8}>
        <Wr f={f} at={F.tutor + 4} x={185} y={395} fs={44} t="TUTOR" c={K.blue} dur={8} />
      </DCard>
      <DLine f={f} at={F.lawyerstyle - 8} x1={480} y1={215} x2={480} y2={290} c={K.amber} w={6} head dur={6} />
      <DCard f={f} at={F.lawyerstyle - 2} x={345} y={300} w={270} h={150} fill="#F4F6FA" stroke={K.ink} dur={8}>
        <Wr f={f} at={F.lawyerstyle + 4} x={480} y={370} fs={28} t="LAWYER-STYLE" dur={10} />
        <Wr f={f} at={F.lawyerstyle + 14} x={480} y={415} fs={28} t="ASSISTANT" dur={8} />
      </DCard>
      <DLine f={f} at={F.pirate - 8} x1={560} y1={215} x2={770} y2={290} c={K.amber} w={6} head dur={6} />
      <DCard f={f} at={F.pirate - 2} x={640} y={300} w={270} h={150} fill="#FFF7EC" stroke={K.amber} dur={8}>
        <Wr f={f} at={F.pirate + 4} x={775} y={395} fs={44} t="PIRATE" c={K.amber} dur={8} />
      </DCard>
      <Wr f={f} at={F.arr} x={775} y={540} fs={60} t="Arr!" c={K.red} dur={8} />
    </g>
  );
  if (f < F.but - 6) return ( // FOR BUILDERS
    <g>
      <Wr f={f} at={F.builders + 4} x={480} y={80} fs={48} t="FOR BUILDERS" c={K.blue} dur={10} />
      <Wr f={f} at={F.builders + 14} x={480} y={135} fs={30} t="the system prompt holds your agent's…" c={K.grey} dur={20} />
      {([[F.personality, "PERSONALITY", K.violet], [F.rules2, "RULES", K.blue], [F.boundaries, "BOUNDARIES", K.red]] as [number, string, string][]).map(([at, t, c], i) => (
        <DCard key={i} f={f} at={at - 6} x={130} y={175 + i * 125} w={700} h={105} fill="#fff" stroke={c} dur={10}>
          <Wr f={f} at={at + 2} x={480} y={245 + i * 125} fs={50} t={t} c={c} dur={12} />
        </DCard>
      ))}
    </g>
  );
  if (f < F.remember - 6) { // GUIDANCE, NOT A LOCK
    return (
      <g>
        <Wr f={f} at={F.guidance - 4} x={480} y={80} fs={48} t="GUIDANCE, NOT A LOCK" dur={18} />
        <g transform="translate(240 280) scale(1.3)">
          <DCard f={f} at={F.lock - 6} x={-70} y={-30} w={140} h={120} r={18} fill={K.amber} stroke={K.ink} dur={8} />
          <DLine f={f} at={F.lock - 2} x1={-45} y1={-30} x2={-45} y2={-75} c={K.ink} w={12} dur={4} />
          <DLine f={f} at={F.lock + 2} x1={45} y1={-30} x2={45} y2={-75} c={K.ink} w={12} dur={4} />
          <DLine f={f} at={F.lock + 4} x1={-45} y1={-75} x2={45} y2={-75} c={K.ink} w={12} dur={4} />
        </g>
        <DTick f={f} at={F.lock + 10} x={400} y={290} ok={false} s={0.9} />
        <DCard f={f} at={F.clever - 6} x={470} y={160} w={420} h={210} fill="#FDECEB" stroke={K.red}>
          <Wr f={f} at={F.clever + 2} x={680} y={235} fs={34} t="clever users" c={K.red} dur={10} />
          <Wr f={f} at={F.around - 12} x={680} y={295} fs={30} t="can try to" dur={8} />
          <Wr f={f} at={F.around - 4} x={680} y={340} fs={30} t="talk around it" dur={10} />
        </DCard>
        <DCard f={f} at={F.fight - 4} x={190} y={430} w={580} h={110} r={55} fill={K.ink} stroke={K.ink} dur={10}>
          <Wr f={f} at={F.fight + 4} x={480} y={500} fs={36} t="we'll fight that: LESSON 21" c="#fff" dur={22} />
        </DCard>
      </g>
    );
  }
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={90} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <Hidden f={f} at={F.system3 - 8} x={80} y={140} w={800} h={140}>
        <Wr f={f} at={F.system3} x={480} y={230} fs={60} t="SYSTEM PROMPT" c={K.violet} dur={12} />
      </Hidden>
      <Wr f={f} at={F.job - 10} x={480} y={330} fs={40} t="=" dur={4} />
      <DCard f={f} at={F.job - 6} x={80} y={360} w={800} h={180} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.job} x={480} y={445} fs={56} t="THE JOB DESCRIPTION" c={K.blue} dur={16} />
        <Wr f={f} at={F.give - 6} x={480} y={505} fs={32} t="you give your AI" c={K.grey} dur={12} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="Ask AI twice, get two different answers" tomorrowAt={F.tomorrow} schoolAt={F.agent4 - 4} buttonAt={F.lesson3 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.yesterday, 0.9], [F.arr - 4, 0.9], [F.arr + 4, 0.2], [F.builders + 2, 0.9],
      [F.remember - 6, 0.2], [F.system3 - 6, 0.9], [F.tomorrow, 0.9], [F.agent4, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.yesterday, "openPalm"], [F.hidden, "fingerUp"], [F.tells, "openPalm"], [F.arr, "wave"], [F.builders, "openPalm"],
      [F.but, "fingerUp"], [F.clever, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent4, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.secret, F.secret + 40], [F.hidden, F.hidden + 30], [F.pirate, F.arr + 30], [F.lock, F.lock + 25]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.yesterday - 6, M], [F.yesterday + 10, S],
    [F.arr - 2, S], [F.arr + 8, Fc], [F.for2 - 6, Fc], [F.builders + 4, S],
    [F.remember - 8, S], [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l007" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L7" line1="YOU NEVER" line2="SEE THIS" fs1={130} bubble1="SECRET?!" bubble2="the system prompt" /></AbsoluteFill>
);
