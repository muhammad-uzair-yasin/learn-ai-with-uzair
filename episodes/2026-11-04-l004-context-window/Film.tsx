// Agent School · L4 — "Your AI Forgets You Mid-Conversation — The Context Window"   projects/l004/
// Locked look (engine/src/lessonkit.tsx). Cues are WORDS, so a voice swap only needs a new words.ts.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle, clamp01, eio } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout, cueFinder, EndSlide, Recap } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 4, TITLE = "Your AI Forgets You";
const W = cueFinder(WORDS);
const F = {
  your: W("your"), forgets: W("forgets"), middle: W("middle"), conversation: W("conversation"), welcome: W("welcome"),
  yesterday: W("yesterday"), today: W("today"), many: W("many"), hold: W("hold"), once: W("once"),
  every: W("every"), context: W("context"), working: W("working"), messages: W("messages"), replies: W("replies"), files: W("files"), fit: W("fit"),
  picture: W("picture"), desk: W("desk"), everything: W("everything"), see: W("see"), fall: W("fall"), gone: W("gone"),
  chat: W("chat"), fills: W("fills"), oldest: W("oldest"), slide: W("slide"), rule: W("rule"), hour: W("hour"), might: W("might"), anymore: W("anymore"),
  windows: W("windows"), huge: W("huge"), hundreds: W("hundreds"), models: W("models"), but: W("but"), isnt: W("isnt"), crowded: W("crowded"), worse: W("worse"),
  so: W("so"), long2: W("long", 2), restate: W("restate"), or: W("or"), start: W("start"), summary: W("summary"),
  remember: W("remember"), if: W("if"), doesnt: W("doesnt"), know: W("know"),
  tomorrow: W("tomorrow"), agent2: W("agent", 2), lesson2: W("lesson", 2), subscribe: W("subscribe"),
};

/** chat bubble drawn by the pen */
const Bubble: React.FC<{ f: number; at: number; x: number; y: number; w: number; t: string; me?: boolean }> = ({ f, at, x, y, w, t, me }) => (
  <DCard f={f} at={at} x={x} y={y} w={w} h={64} r={32} fill={me ? K.blue : "#EEF1F6"} stroke={me ? K.blue : "#C9D3E6"} dur={8}>
    <Wr f={f} at={at + 5} x={x + w / 2} y={y + 43} fs={28} t={t} c={me ? "#fff" : K.ink} dur={12} />
  </DCard>
);

const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.welcome + 50 : f0;
  if (f < F.yesterday - 4) return ( // HOOK
    <g>
      <Wr f={f} at={2} x={480} y={70} fs={30} t="AGENT SCHOOL · LESSON 4" c={K.blue} dur={10} />
      <Wr f={f} at={F.your} x={480} y={165} fs={76} t="YOUR AI" dur={10} />
      <Wr f={f} at={F.forgets} x={480} y={255} fs={76} t="FORGETS YOU" c={K.red} dur={14} />
      <DCard f={f} at={F.middle - 8} x={150} y={295} w={660} h={270} fill="#F8FAFD">
        <Bubble f={f} at={F.middle} x={430} y={320} w={350} t="Remember my name?" me />
        <Bubble f={f} at={F.conversation + 8} x={180} y={405} w={340} t="Sorry… who are you?" />
        <Wr f={f} at={F.conversation + 24} x={480} y={540} fs={26} t="…in the middle of a conversation" c={K.grey} dur={18} />
      </DCard>
    </g>
  );
  if (f < F.every - 6) { // HOW MANY TOKENS AT ONCE?
    const n = 14;
    return (
      <g>
        <Recap f={f} at={F.yesterday} until={F.today} y={70} fs={30} t="AI reads tokens" />
        <Wr f={f} at={F.today} x={480} y={160} fs={50} t="TODAY: HOW MANY CAN IT HOLD?" c={K.blue} dur={22} />
        <DCard f={f} at={F.hold - 10} x={90} y={240} w={780} h={150} fill={K.soft} stroke={K.blue} />
        {[...Array(n)].map((_, i) => <DCard key={i} f={f} at={F.hold + i * 2} x={115 + i * 53} y={275} w={42} h={80} r={8} fill={K.blue} stroke={K.blue} dur={5} />)}
        <Wr f={f} at={F.once} x={480} y={480} fs={46} t="…at once?" dur={10} />
      </g>
    );
  }
  if (f < F.picture - 6) return ( // CONTEXT WINDOW = WORKING MEMORY
    <g>
      <Wr f={f} at={F.context - 4} x={480} y={80} fs={60} t="CONTEXT WINDOW" c={K.blue} dur={14} />
      <Wr f={f} at={F.working - 4} x={480} y={140} fs={36} t="= its working memory" c={K.grey} dur={16} />
      <DCard f={f} at={F.working + 10} x={170} y={180} w={620} h={330} fill={K.soft} stroke={K.blue} />
      <DCard f={f} at={F.messages - 4} x={220} y={215} w={520} h={70} r={35} fill="#fff" stroke="#C9D6EA" dur={8}>
        <Wr f={f} at={F.messages} x={480} y={262} fs={34} t="your messages" dur={10} />
      </DCard>
      <DCard f={f} at={F.replies - 4} x={220} y={305} w={520} h={70} r={35} fill="#fff" stroke="#C9D6EA" dur={8}>
        <Wr f={f} at={F.replies} x={480} y={352} fs={34} t="its replies" dur={10} />
      </DCard>
      <DCard f={f} at={F.files - 4} x={220} y={395} w={520} h={70} r={35} fill="#fff" stroke="#C9D6EA" dur={8}>
        <Wr f={f} at={F.files} x={480} y={442} fs={34} t="any files" dur={10} />
      </DCard>
      <Wr f={f} at={F.fit - 4} x={480} y={570} fs={40} t="ALL MUST FIT INSIDE" c={K.amber} dur={14} />
    </g>
  );
  if (f < F.chat - 6) { // THE DESK
    const drop = eio(clamp01((f - F.fall - 4) / 20));
    return (
      <g>
        <Wr f={f} at={F.desk + 14} x={480} y={75} fs={48} t="PICTURE A DESK" dur={12} />
        <DLine f={f} at={F.desk + 18} x1={150} y1={330} x2={700} y2={330} c="#A8743F" w={22} dur={10} />
        <DLine f={f} at={F.desk + 24} x1={190} y1={340} x2={190} y2={470} c="#A8743F" w={16} dur={6} />
        <DLine f={f} at={F.desk + 24} x1={660} y1={340} x2={660} y2={470} c="#A8743F" w={16} dur={6} />
        {[0, 1, 2].map((i) => <DCard key={i} f={f} at={F.everything + i * 4} x={190 + i * 140} y={210} w={110} h={110} r={10} fill="#fff" stroke={K.blue} dur={8} />)}
        <Wr f={f} at={F.see - 8} x={330} y={540} fs={34} t="on the desk = AI sees it" c={K.green} dur={18} />
        <DTick f={f} at={F.see + 6} x={60} y={260} ok s={0.7} />
        {f >= F.fall - 8 && (
          <g transform={`translate(${620 + drop * 150} ${210 + drop * 220}) rotate(${drop * 40} 55 55)`} opacity={1 - drop * 0.3}>
            <DCard f={f} at={F.fall - 8} x={0} y={0} w={110} h={110} r={10} fill="#fff" stroke={K.red} dur={8} />
          </g>
        )}
        <Wr f={f} at={F.gone - 4} x={900} y={250} fs={44} t="GONE" c={K.red} a="end" dur={8} />
      </g>
    );
  }
  if (f < F.windows - 6) { // OLDEST MESSAGES SLIDE OFF
    const rows = ["your rule (1 hour ago)", "message 2", "reply 2", "message 3", "reply 3", "message 4", "reply 4", "message 5"];
    const shift = eio(clamp01((f - F.slide) / 24)) * 2 * 54;
    return (
      <g>
        <Wr f={f} at={F.chat} x={480} y={52} fs={34} t="CHAT LONG ENOUGH…" dur={12} />
        <DCard f={f} at={F.chat + 4} x={250} y={170} w={460} h={330} fill={K.soft} stroke={K.blue} />
        <Wr f={f} at={F.chat + 10} x={725} y={200} fs={24} t="window" c={K.blue} a="start" dur={8} />
        {rows.map((t, i) => {
          const y = 184 + i * 54 - shift; const out = y < 170;
          if (f < (i < 6 ? F.chat + 14 + i * 4 : F.slide + 10 + (i - 6) * 8)) return null;
          return (
            <g key={i} opacity={out ? 0.75 : 1}>
              <rect x={280} y={y} width={400} height={44} rx={22} fill={i === 0 ? (out ? "#FDE3E1" : "#FFF3DF") : "#fff"} stroke={out ? K.red : i === 0 ? K.amber : "#C9D6EA"} strokeWidth={3} />
              <text x={480} y={y + 31} textAnchor="middle" fontFamily="InterLocal, sans-serif" fontWeight={800} fontSize={24} fill={out ? K.red : K.ink}>{t}</text>
            </g>
          );
        })}
        <Wr f={f} at={F.fills} x={480} y={545} fs={34} t="the window fills up" c={K.amber} dur={12} />
        <Wr f={f} at={F.oldest} x={150} y={118} fs={24} t="oldest slide off ↑" c={K.red} dur={14} />
        <DTick f={f} at={F.might} x={760} y={98} ok={false} s={0.7} />
        <Wr f={f} at={F.anymore - 6} x={480} y={584} fs={26} t="that rule? not on the desk anymore" c={K.red} dur={20} />
      </g>
    );
  }
  if (f < F.so - 6) return ( // HUGE ≠ INFINITE
    <g>
      <Wr f={f} at={F.windows} x={480} y={80} fs={50} t="WINDOWS ARE HUGE TODAY" dur={18} />
      <DBar f={f} at={F.hundreds - 4} x={80} y={130} w={800} h={56} c={K.blue} dur={22} />
      <Wr f={f} at={F.hundreds + 2} x={480} y={250} fs={40} t="hundreds of thousands of tokens" dur={20} />
      <Wr f={f} at={F.models - 2} x={480} y={300} fs={28} t="on many models" c={K.grey} dur={10} />
      <DCard f={f} at={F.but} x={110} y={340} w={340} h={180} fill="#fff">
        <Wr f={f} at={F.isnt - 4} x={280} y={420} fs={40} t="huge ≠" dur={8} />
        <Wr f={f} at={F.isnt + 6} x={280} y={480} fs={40} t="infinite" c={K.red} dur={10} />
      </DCard>
      <DCard f={f} at={F.crowded - 10} x={510} y={340} w={340} h={180} fill="#FFF7EC" stroke={K.amber}>
        <Wr f={f} at={F.crowded} x={680} y={420} fs={36} t="crowded desk" dur={12} />
        <Wr f={f} at={F.worse - 4} x={680} y={480} fs={36} t="→ worse answers" c={K.red} dur={14} />
      </DCard>
    </g>
  );
  if (f < F.remember - 6) return ( // FOR LONG WORK
    <g>
      <Wr f={f} at={F.so} x={480} y={80} fs={50} t="FOR LONG WORK" c={K.blue} dur={12} />
      <DCard f={f} at={F.restate - 10} x={80} y={130} w={800} h={150} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.restate} x={130} y={225} fs={52} t="1  RESTATE what matters" a="start" dur={20} />
      </DCard>
      <Wr f={f} at={F.or} x={480} y={335} fs={36} t="or" c={K.grey} dur={6} />
      <DCard f={f} at={F.start - 8} x={80} y={370} w={800} h={170} fill="#E9F8F0" stroke={K.green}>
        <Wr f={f} at={F.start} x={130} y={445} fs={50} t="2  START A FRESH CHAT" a="start" dur={16} />
        <Wr f={f} at={F.summary - 10} x={190} y={505} fs={34} t="+ a short summary" c={K.green} a="start" dur={14} />
      </DCard>
    </g>
  );
  if (f < F.tomorrow - 6) return ( // REMEMBER
    <g>
      <Wr f={f} at={F.remember} x={480} y={90} fs={40} t="REMEMBER" c={K.amber} dur={10} />
      <DCard f={f} at={F.if - 8} x={80} y={140} w={800} h={150}>
        <Wr f={f} at={F.if + 4} x={480} y={235} fs={44} t="NOT IN THE CONTEXT WINDOW?" dur={24} />
      </DCard>
      <DCard f={f} at={F.doesnt - 10} x={80} y={330} w={800} h={190} fill="#FDECEB" stroke={K.red}>
        <Wr f={f} at={F.doesnt - 2} x={480} y={448} fs={52} t="THE AI DOESN'T KNOW IT" c={K.red} dur={18} />
      </DCard>
    </g>
  );
  return <EndSlide f={f} lesson={LESSON} next="Why AI lies with a straight face" tomorrowAt={F.tomorrow} schoolAt={F.agent2 - 4} buttonAt={F.lesson2 - 4} subscribeAt={F.subscribe} />;
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const pose = perform(f, ENV, {
    point: [[0, 0.95], [F.welcome, 0.95], [F.welcome + 20, 0.2], [F.yesterday, 0.9], [F.picture - 6, 0.9], [F.picture + 2, 0.2], [F.desk + 10, 0.9],
      [F.remember - 6, 0.2], [F.if - 4, 0.9], [F.tomorrow, 0.9], [F.agent2, 0.2], [TOTAL, 0.2]],
    hands: [[0, "openPalm"], [F.welcome, "wave"], [F.yesterday, "openPalm"], [F.context, "fingerUp"], [F.working + 10, "openPalm"], [F.oldest, "fingerUp"], [F.windows, "openPalm"],
      [F.but, "fingerUp"], [F.so, "openPalm"], [F.remember - 4, "fingerUp"], [F.tomorrow, "openPalm"], [F.agent2, "wave"], [F.subscribe, "thumbsUp"]],
    brows: [[F.forgets, F.forgets + 40], [F.gone, F.gone + 25], [F.might, F.might + 30], [F.isnt, F.isnt + 25]],
  });
  const S = CAMS.SCREEN, Wd = CAMS.WIDE, M = CAMS.MID, Fc = CAMS.FACE;
  const cam: [number, typeof S][] = [[0, Wd], [F.welcome - 10, { x: 540, y: 920, z: 1.04 }], [F.welcome + 10, M], [F.yesterday - 6, M], [F.yesterday + 10, S],
    [F.picture - 10, S], [F.picture + 2, M], [F.desk + 4, M], [F.desk + 16, S],
    [F.tomorrow - 6, S], [F.tomorrow + 14, Wd], [TOTAL, { x: 540, y: 940, z: 1.03 }]];
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam, render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="l004" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module="MODULE 1" title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag="FREE AI COURSE · L4" line1="YOUR AI" strike="REMEMBERS" line2="FORGETS YOU" fs2={120} fs3={112} bubble1="MID-CHAT?!" bubble2="the context window" /></AbsoluteFill>
);
