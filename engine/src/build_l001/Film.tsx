// Agent School · M1 · Lesson 1 — "AI Doesn't Think — It Predicts"
// Course look v1 (all 4 styles): GLASS hook → SCREEN chat demo → BLUEPRINT phone→LLM → ISO robot world
// → GLASS catch → SCREEN terminal (Paris) → GLASS brilliant/wrong → GLASS recap → BLUEPRINT tomorrow + subscribe.
// Voice: Uzair's ElevenLabs clone (eleven_v4, emotion tags). No sound effects (Uzair, Nov 1).
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle, ramp, eio, eout, pop, clamp01, lerp, VW, VH } from "./kit";
import { Narration, Caps, FONT, Director, Shot, countUp } from "./factkit";
import {
  C, MONO, BlueprintBg, Draw, BpBox, BpArrow, BpLabel, BpDim, Window, typed, Caret, Pointer, wrap,
  GlassBg, Glass, Kinetic, Strike, Tick, iso, IsoBox, IsoFloor, IsoRobot, LessonChrome,
} from "./coursekit";
import { WORDS, CHUNKS, TOTAL } from "./words";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const W = (word: string, n = 1): number => {
  let k = 0;
  for (const w of WORDS) if (norm(w[2]) === word && ++k === n) return w[0];
  throw new Error(`cue word not found: ${word} #${n}`);
};
const F = {
  ai: W("ai"), think: W("think"), it: W("it"), predicts: W("predicts"), welcome: W("welcome"), lesson1: W("lesson"),
  when: W("when"), chatgpt: W("chatgpt"), its2: W("its", 2), one2: W("one", 2), predicting: W("predicting"),
  then1: W("then", 1), then2: W("then", 2), thousands: W("thousands"),
  heres: W("heres"), keyboard: W("keyboard"), suggests: W("suggests"), word2: W("word", 2), trained: W("trained"),
  now: W("now"), same1: W("same", 1), whole: W("whole"), internet: W("internet"), books: W("books"), code: W("code"),
  websites: W("websites"), trillions: W("trillions"), large: W("large"), same2: W("same", 2), unimaginable: W("unimaginable"),
  feels: W("feels"), seen: W("seen"), question: W("question", 2), learned: W("learned"), patterns: W("patterns"),
  ask: W("ask", 2), continues: W("continues"),
  but: W("but"), catch: W("catch"), prediction: W("prediction"), tru: W("true"), only: W("only"), likely: W("likely"),
  paris1: W("paris", 1), follows: W("follows"), france: W("france"), paris2: W("paris", 2), not2: W("not", 2),
  because2: W("because", 2), probable: W("probable"), brilliant: W("brilliant"), confidently: W("confidently"),
  sentence: W("sentence"), dont: W("dont", 1), fix: W("fix"),
  remember: W("remember"), mind: W("mind"), worlds: W("worlds"), most: W("most"), powerful: W("powerful"), autocomplete: W("autocomplete"),
  tomorrow: W("tomorrow", 1), machines: W("machines"), programmer: W("programmer"), agent2: W("agent", 2), lesson2: W("lesson", 2),
  subscribe: W("subscribe"),
};

// ===================== SHOT 1 — GLASS HOOK =====================
const Hook: React.FC<{ f: number }> = ({ f: f0 }) => {
  const f = f0 < 15 ? F.welcome + 30 : f0; // frames 0-14 = finished card (thumbnail / cover frame)
  return (
    <g>
      <GlassBg f={f} id="h" />
      <Glass f={f} id="h1" x={70} y={470} w={940} h={700} p={f0 < 15 ? 1 : eout(ramp(f, 4, 18))}>
        <Kinetic f={f} at={F.ai} x={540} y={640} text="AI DOESN'T" fs={118} />
        <Kinetic f={f} at={F.think} x={540} y={800} text="THINK" fs={170} />
        <Strike f={f} at={F.think + 14} x1={290} x2={790} y={745} />
        <Kinetic f={f} at={F.it} x={540} y={985} text="IT PREDICTS." fs={128} fill={C.cyan} />
        <Kinetic f={f} at={F.predicts + 8} x={540} y={1080} text="the next word · the next word · the next…" fs={36} fill="rgba(255,255,255,0.7)" />
      </Glass>
      <Glass f={f} id="h2" x={170} y={1230} w={740} h={110} r={55} p={pop(f, F.welcome, 12)} tint="rgba(94,231,255,0.16)">
        <Kinetic f={f} at={F.welcome} x={540} y={1303} text="AGENT SCHOOL · LESSON 1" fs={48} ls={3} />
      </Glass>
      <Kinetic f={f} at={F.welcome + 6} x={540} y={400} text="FREE AI COURSE · MODULE 1" fs={34} fill={C.amber} ls={4} />
    </g>
  );
};

// ===================== SHOT 2 — SCREEN: CHAT DEMO =====================
const REPLY = ["Sunlight", "scatters", "off", "tiny", "air", "molecules,", "and", "blue", "light", "scatters", "the", "most,", "so", "the", "whole", "sky", "glows", "blue.", "At", "sunset", "light", "travels", "through", "more", "air,", "so", "reds", "and", "oranges", "win."];
const CANDS: [number, [string, number][]][] = [
  [0, [["Sunlight", 41], ["Because", 28], ["The", 19]]],
  [1, [["scatters", 52], ["is", 23], ["hits", 11]]],
  [2, [["off", 47], ["in", 30], ["when", 9]]],
];
const Chat: React.FC<{ f: number }> = ({ f }) => {
  const q = "Why is the sky blue?";
  const tStart = F.when + 4, tEnd = F.chatgpt + 30, send = F.chatgpt + 44;
  const sent = f >= send + 4;
  // tokens shown
  let n = 0;
  if (f >= F.predicting) n = 1;
  if (f >= F.then1) n = 2;
  if (f >= F.then2) n = 3;
  if (f >= F.thousands) n = 3 + Math.floor((REPLY.length - 3) * eio(ramp(f, F.thousands, F.thousands + 70)));
  const cand = f < F.then1 ? CANDS[0] : f < F.then2 ? CANDS[1] : CANDS[2];
  const lines = wrap(REPLY.slice(0, n).join(" "), 30);
  const ptr = f < send - 18 ? [700, 1260] : [lerp(700, 905, eio(ramp(f, send - 18, send - 2))), lerp(1260, 1240, eio(ramp(f, send - 18, send - 2)))];
  const thinking = sent && f < F.predicting;
  return (
    <g>
      <GlassBg f={f} id="c" hue={["#2B4BFF", "#1E90FF", "#7B5CFF"]} />
      <Window x={50} y={250} w={980} h={1200} title="AI Chat" p={eout(ramp(f, F.when - 6, F.when + 10))}>
        {/* user bubble */}
        {sent && (
          <g opacity={eout(ramp(f, send + 4, send + 12))}>
            <rect x={420} y={50} width={520} height={92} rx={46} fill={C.blue} />
            <text x={680} y={108} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill="#fff">{q}</text>
          </g>
        )}
        {/* AI reply */}
        {sent && (
          <g opacity={eout(ramp(f, send + 10, send + 20))}>
            <circle cx={84} cy={214} r={36} fill={C.ink} />
            <path d="M68 222 L84 198 L100 222 M73 215 H95" stroke={C.cyan} strokeWidth={5} fill="none" strokeLinecap="round" />
            <rect x={136} y={176} width={800} height={Math.max(100, 40 + lines.length * 60)} rx={30} fill="#fff" stroke="#D7DBE6" strokeWidth={3} />
            {thinking && [0, 1, 2].map((i) => <circle key={i} cx={190 + i * 34} cy={226} r={11} fill="#8B93AD" opacity={0.35 + 0.65 * Math.abs(Math.sin(f * 0.15 + i))} />)}
            {lines.map((l, i) => <text key={i} x={170} y={242 + i * 60} fontFamily={FONT} fontWeight={800} fontSize={40} fill={C.ink}>{l}</text>)}
            {n > 0 && n < REPLY.length && lines.length > 0 && <Caret f={f} x={170 + lines[lines.length - 1].length * 22.5} y={242 + (lines.length - 1) * 60} h={44} />}
          </g>
        )}
        {/* next-word popup */}
        {f >= F.predicting && f < F.thousands + 6 && (
          <g transform={`translate(160 ${330 + (lines.length - 1) * 60})`} opacity={eout(ramp(f, F.predicting, F.predicting + 8)) * (1 - ramp(f, F.thousands, F.thousands + 6))}>
            <rect x={6} y={14} width={560} height={300} rx={26} fill="#000" opacity={0.25} />
            <rect width={560} height={300} rx={26} fill={C.ink} stroke={C.cyan} strokeWidth={3} />
            <text x={30} y={56} fontFamily={MONO} fontSize={28} fill={C.cyan}>{`next word #${cand[0] + 1} ?`}</text>
            {cand[1].map(([w, pc], i) => {
              const g = eout(ramp(f, (cand[0] === 0 ? F.predicting : cand[0] === 1 ? F.then1 : F.then2) + i * 3, (cand[0] === 0 ? F.predicting : cand[0] === 1 ? F.then1 : F.then2) + 14 + i * 3));
              return (
                <g key={w} transform={`translate(30 ${100 + i * 66})`}>
                  <text y={32} fontFamily={FONT} fontWeight={800} fontSize={34} fill={i === 0 ? "#fff" : "#9AA4C0"}>{w}</text>
                  <rect x={200} y={6} width={260 * (pc / 55) * g} height={32} rx={10} fill={i === 0 ? C.green : "#3A4766"} />
                  <text x={470} y={32} fontFamily={MONO} fontSize={28} fill={i === 0 ? C.green : "#9AA4C0"}>{`${Math.round(pc * g)}%`}</text>
                </g>
              );
            })}
          </g>
        )}
        {/* input box */}
        <rect x={40} y={1000} width={900} height={96} rx={48} fill="#fff" stroke={f >= tStart && !sent ? C.blue : "#D7DBE6"} strokeWidth={3} />
        <text x={84} y={1060} fontFamily={FONT} fontWeight={800} fontSize={36} fill={sent ? "#A0A7BD" : C.ink}>{sent ? "Message…" : typed(f, tStart, tEnd, q) || "Message…"}</text>
        {!sent && f >= tStart && <Caret f={f} x={84 + typed(f, tStart, tEnd, q).length * 20.5} y={1062} />}
        <circle cx={880} cy={1048} r={36} fill={C.ink} />
        <path d="M880 1066 V1032 M866 1046 L880 1032 L894 1046" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Window>
      {f < send + 10 && <Pointer f={f} x={ptr[0]} y={ptr[1]} clickAt={send} />}
      {/* label chip + counter */}
      <Glass f={f} id="c1" x={140} y={150} w={800} h={84} r={42} p={pop(f, F.one2, 12)} tint="rgba(7,11,30,0.55)" hue={["#2B4BFF", "#1E90FF", "#7B5CFF"]}>
        <text x={540} y={206} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill="#fff" letterSpacing={2}>ONE JOB: <tspan fill={C.cyan}>PREDICT THE NEXT WORD</tspan></text>
      </Glass>
      {f >= F.thousands && (
        <g opacity={eout(ramp(f, F.thousands, F.thousands + 10))}>
          <rect x={250} y={1000} width={580} height={110} rx={30} fill={C.ink} stroke={C.green} strokeWidth={4} />
          <text x={540} y={1046} textAnchor="middle" fontFamily={MONO} fontSize={28} fill="#9AA4C0">next-word predictions</text>
          <text x={540} y={1094} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={C.green}>{countUp(f, F.thousands, F.thousands + 80, 1280).toLocaleString("en-US")}</text>
        </g>
      )}
    </g>
  );
};

// ===================== SHOT 3 — BLUEPRINT: PHONE → LLM =====================
const Phone: React.FC<{ f: number }> = ({ f }) => {
  const x = 110, y = 400, w = 300, h = 560;
  const sugg = ["you", "the", "I'm"];
  return (
    <g>
      <Draw d={`M${x + 40} ${y} H${x + w - 40} Q${x + w} ${y} ${x + w} ${y + 40} V${y + h - 40} Q${x + w} ${y + h} ${x + w - 40} ${y + h} H${x + 40} Q${x} ${y + h} ${x} ${y + h - 40} V${y + 40} Q${x} ${y} ${x + 40} ${y} Z`} f={f} at={F.heres} dur={22} fill="rgba(77,163,255,0.06)" />
      <Draw d={`M${x + 120} ${y + 24} H${x + 180}`} f={f} at={F.heres + 14} dur={8} w={6} />
      {/* typed message line */}
      <Draw d={`M${x + 30} ${y + 120} H${x + 250} M${x + 30} ${y + 160} H${x + 190}`} f={f} at={F.heres + 18} dur={14} stroke={C.blue} w={8} />
      {/* suggestion bar */}
      {sugg.map((s, i) => {
        const p = pop(f, F.suggests + i * 4, 10);
        const hi = f >= F.word2 && i === 0;
        return p > 0 ? (
          <g key={s} transform={`translate(${x + 52 + i * 98} ${y + 300}) scale(${p})`}>
            <rect x={-44} y={-30} width={88} height={56} rx={14} fill={hi ? C.cyan : "rgba(77,163,255,0.15)"} stroke={C.cyan} strokeWidth={3} />
            <text y={10} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={28} fill={hi ? C.ink : C.line}>{s}</text>
          </g>
        ) : null;
      })}
      {/* keyboard */}
      {[0, 1, 2].map((r) => [...Array(7 - r)].map((_, k) => {
        const kx = x + 28 + r * 18 + k * 36, ky = y + 360 + r * 52;
        return <Draw key={`${r}${k}`} d={`M${kx} ${ky} h28 v40 h-28 Z`} f={f} at={F.keyboard + (r * 7 + k) * 0.8} dur={8} w={3} stroke={C.blue} />;
      }))}
      <BpLabel f={f} at={F.keyboard} x={x + w / 2} y={y - 30} text="YOUR PHONE" hue={C.line} fs={30} />
      {/* texts flowing in */}
      {[0, 1, 2, 3].map((i) => {
        const t = ramp(f, F.trained + i * 6, F.trained + 26 + i * 6);
        if (t <= 0 || t >= 1) return null;
        return <rect key={i} x={x + 60 + i * 40} y={lerp(y - 140, y + 140, eio(t))} width={90} height={40} rx={18} fill={C.cyan} opacity={1 - t * 0.6} />;
      })}
      <BpLabel f={f} at={F.trained} x={x + w / 2} y={y + h + 50} text="trained on: your texts" />
    </g>
  );
};
const Icon: React.FC<{ f: number; at: number; x: number; y: number; kind: "book" | "code" | "web"; label: string }> = ({ f, at, x, y, kind, label }) => (
  <g>
    {kind === "book" && <Draw d={`M${x - 60} ${y - 50} h50 q10 0 10 10 v100 q0 -10 -10 -10 h-50 Z M${x + 60} ${y - 50} h-50 q-10 0 -10 10 v100 q0 -10 10 -10 h50 Z`} f={f} at={at} dur={16} />}
    {kind === "code" && <g><Draw d={`M${x - 70} ${y - 50} h140 v100 h-140 Z`} f={f} at={at} dur={14} /><Draw d={`M${x - 25} ${y - 18} l-22 18 l22 18 M${x + 25} ${y - 18} l22 18 l-22 18 M${x + 8} ${y - 26} l-16 52`} f={f} at={at + 8} dur={12} stroke={C.cyan} /></g>}
    {kind === "web" && <g><Draw d={`M${x - 70} ${y - 50} h140 v100 h-140 Z M${x - 70} ${y - 26} h140`} f={f} at={at} dur={14} /><Draw d={`M${x - 50} ${y} h100 M${x - 50} ${y + 22} h60`} f={f} at={at + 8} dur={12} stroke={C.cyan} /></g>}
    <BpLabel f={f} at={at + 6} x={x} y={y + 90} text={label} />
  </g>
);
const Blueprint1: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <BlueprintBg f={f} />
    <Phone f={f} />
    <BpArrow f={f} at={F.same1} x1={430} y1={640} x2={600} y2={560} bend={-0.15} />
    {/* internet globe */}
    <g>
      <Draw d="M820 330 m-150 0 a150 150 0 1 0 300 0 a150 150 0 1 0 -300 0" f={f} at={F.whole} dur={20} fill="rgba(77,163,255,0.07)" />
      <Draw d="M820 180 q-90 150 0 300 M820 180 q90 150 0 300 M670 330 h300 M690 260 h260 M690 400 h260" f={f} at={F.internet} dur={18} stroke={C.blue} w={3} />
      <BpLabel f={f} at={F.internet} x={820} y={530} text="THE WHOLE INTERNET" hue={C.line} />
    </g>
    <Icon f={f} at={F.books} x={570} y={690} kind="book" label="books" />
    <Icon f={f} at={F.code} x={760} y={690} kind="code" label="code" />
    <Icon f={f} at={F.websites} x={950} y={690} kind="web" label="websites" />
    {f >= F.trillions && <Kinetic f={f} at={F.trillions} x={760} y={880} text="TRILLIONS OF WORDS" fs={52} fill={C.cyan} />}
    {/* the model */}
    <BpArrow f={f} at={F.large - 6} x1={570} y1={800} x2={500} y2={1030} />
    <BpArrow f={f} at={F.large - 3} x1={760} y1={910} x2={700} y2={1030} />
    <BpArrow f={f} at={F.large} x1={950} y1={800} x2={880} y2={1030} />
    <BpBox f={f} at={F.large} x={110} y={1040} w={860} h={300} label="LARGE LANGUAGE MODEL" sub="predict_next(word) × trillions of examples" fs={58} hue={C.line} />
    {/* same trick */}
    <BpDim f={f} at={F.same2} x1={110} x2={410} y={1010 - 30} label="same trick" />
    {f >= F.unimaginable && <Kinetic f={f} at={F.unimaginable} x={540} y={1440} text="UNIMAGINABLE SCALE" fs={70} fill={C.amber} ls={2} />}
  </g>
);

// ===================== SHOT 4 — ISOMETRIC: THE ROBOT THAT READ EVERYTHING =====================
const ISO_O: [number, number, number] = [540, 760, 96];
const Iso1: React.FC<{ f: number }> = ({ f }) => {
  const o = ISO_O;
  const grow = (k: number) => eout(ramp(f, F.seen + k * 8, F.seen + 60 + k * 8));
  const stacks: [number, number, string][] = [[0.4, 0.4, "#4DA3FF"], [4.4, 0.5, "#8B7CFF"], [0.5, 4.3, "#FFB547"], [4.5, 4.4, "#4BE3A0"], [2.4, 0.2, "#5EE7FF"], [0.2, 2.4, "#FF8FA3"]];
  const pat = eio(ramp(f, F.patterns, F.patterns + 24));
  const q = (a: number, b: number, c: number) => iso(a, b, c, o[0], o[1], o[2]);
  const head = q(2.95, 2.95, 1.9);
  const contN = Math.floor(clamp01((f - F.continues) / 40) * 6);
  return (
    <g>
      <rect width={VW} height={VH} fill="#081430" />
      <defs><radialGradient id="isoglow" cx="50%" cy="45%" r="60%"><stop offset="0" stopColor="#1B3B7A" /><stop offset="1" stopColor="#081430" stopOpacity={0} /></radialGradient></defs>
      <rect width={VW} height={VH} fill="url(#isoglow)" />
      <IsoFloor o={o} n={6} />
      {/* question-card stacks (back ones first) */}
      {stacks.map(([sx, sy, col], k) => {
        const n = Math.round(8 * grow(k));
        return [...Array(n)].map((_, i) => <IsoBox key={`${k}-${i}`} x={sx} y={sy} z={i * 0.16} w={1.0} d={0.75} h={0.13} o={o} color={i % 2 ? col : "#EAF2FF"} />);
      })}
      {/* pattern lines from stacks to robot */}
      {pat > 0 && stacks.map(([sx, sy], k) => {
        const s = q(sx + 0.5, sy + 0.37, 8 * 0.16 * grow(k) + 0.1);
        return <path key={k} d={`M${s[0]} ${s[1]} L${lerp(s[0], head[0], pat)} ${lerp(s[1], head[1], pat)}`} stroke={C.cyan} strokeWidth={4} strokeDasharray="10 10" strokeDashoffset={-f * 2} opacity={0.85} />;
      })}
      {/* desk + robot */}
      <IsoBox x={2.3} y={3.6} z={0} w={1.6} d={0.9} h={0.55} o={o} color="#5B6FA3" />
      <IsoRobot x={2.5} y={2.5} o={o} f={f} glow={pat > 0 ? 1 : 0.5} nod={f >= F.ask && f < F.ask + 20 ? -0.06 * Math.sin(((f - F.ask) / 20) * Math.PI) : 0} />
      {/* question coming in */}
      {f >= F.ask && (() => {
        const t = eio(ramp(f, F.ask, F.ask + 22));
        const p0 = [140, 520], p1 = [head[0] - 150, head[1] - 140];
        return (
          <g transform={`translate(${lerp(p0[0], p1[0], t)} ${lerp(p0[1], p1[1], t)})`} opacity={1 - ramp(f, F.continues - 4, F.continues + 6)}>
            <rect x={-70} y={-50} width={140} height={100} rx={26} fill="#fff" />
            <text y={30} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={76} fill={C.blue}>?</text>
          </g>
        );
      })()}
      {/* continuing the pattern: tiles extend */}
      {[...Array(contN)].map((_, i) => <IsoBox key={i} x={3.6 + i * 0.0} y={1.9 - i * 0.62} z={1.4 + i * 0.12} w={0.5} d={0.5} h={0.1} o={o} color={C.cyan} />)}
      <Kinetic f={f} at={F.feels} x={540} y={330} text="WHY IT FEELS SO SMART" fs={58} fill={C.amber} ls={2} />
      <Kinetic f={f} at={F.seen} x={540} y={420} text="it has seen almost every question" fs={40} fill="#fff" />
      {f >= F.patterns && <Kinetic f={f} at={F.patterns} x={540} y={1440} text="→ IT LEARNED THE PATTERNS" fs={54} fill={C.cyan} />}
    </g>
  );
};

// ===================== SHOT 5 — GLASS: THE CATCH =====================
const AMB = ["#FF8A00", "#FF3D6E", "#7B3CFF"];
const Catch: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <GlassBg f={f} id="k" hue={AMB} />
    <Glass f={f} id="k1" x={90} y={330} w={900} h={340} hue={AMB} p={eout(ramp(f, F.but - 2, F.but + 10))}>
      <path d="M540 380 L590 466 H490 Z" fill={C.amber} />
      <text x={540} y={456} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={60} fill={C.ink}>!</text>
      <Kinetic f={f} at={F.but} x={540} y={560} text="BUT HERE'S" fs={64} />
      <Kinetic f={f} at={F.catch} x={540} y={640} text="THE CATCH" fs={90} fill={C.amber} />
    </Glass>
    <Glass f={f} id="k2" x={60} y={740} w={460} h={560} hue={AMB} p={eout(ramp(f, F.prediction, F.prediction + 12))}>
      <text x={290} y={830} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={36} fill="rgba(255,255,255,0.8)">IT DOESN'T KNOW</text>
      <Kinetic f={f} at={F.tru} x={290} y={1010} text="TRUE" fs={130} />
      <Tick f={f} at={F.tru + 6} x={290} y={1170} ok={false} s={1.3} />
    </Glass>
    <Glass f={f} id="k3" x={560} y={740} w={460} h={560} hue={AMB} p={eout(ramp(f, F.only - 4, F.only + 8))}>
      <text x={790} y={830} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={36} fill="rgba(255,255,255,0.8)">IT ONLY KNOWS</text>
      <Kinetic f={f} at={F.likely} x={790} y={1010} text="LIKELY" fs={118} fill={C.amber} />
      <Tick f={f} at={F.likely + 6} x={790} y={1170} ok s={1.3} />
    </Glass>
  </g>
);

// ===================== SHOT 6 — SCREEN: TERMINAL "PARIS" =====================
const PROBS: [string, number][] = [["Paris", 0.92], ["Lyon", 0.03], ["the", 0.02], ["a", 0.01]];
const Term: React.FC<{ f: number }> = ({ f }) => {
  const l1 = ">>> model.predict_next(", l2 = '...     "The capital of France is")';
  const barT = (i: number) => eout(ramp(f, F.france + 10 + i * 3, F.france + 34 + i * 3));
  const pick = f >= F.paris2;
  const c1 = "# does it KNOW it's true?   no", c2 = "# is it the most PROBABLE?  yes";
  return (
    <g>
      <GlassBg f={f} id="t" hue={["#123C8C", "#0B6E8C", "#3B2B8C"]} />
      <Window x={40} y={270} w={1000} h={1160} title="agent-school — python" dark p={eout(ramp(f, F.paris1 - 8, F.paris1 + 6))}>
        <text x={40} y={80} fontFamily={MONO} fontSize={36} fill="#E6EDF3">{typed(f, F.paris1, F.follows + 4, l1)}</text>
        <text x={40} y={136} fontFamily={MONO} fontSize={36} fill="#A5D6FF">{typed(f, F.follows + 4, F.france + 6, l2)}</text>
        {f >= F.france + 8 && <text x={40} y={220} fontFamily={MONO} fontSize={28} fill="#8B949E">next word        probability</text>}
        {PROBS.map(([w, pr], i) => {
          const t = barT(i);
          if (t <= 0) return null;
          const hl = pick && i === 0;
          return (
            <g key={w} transform={`translate(40 ${290 + i * 84})`}>
              {hl && <rect x={-16} y={-46} width={936} height={70} rx={14} fill={C.green} opacity={0.16} stroke={C.green} strokeWidth={3} />}
              <text y={0} fontFamily={MONO} fontSize={38} fill={hl ? C.green : "#E6EDF3"}>{w}</text>
              <rect x={180} y={-30} width={Math.max(6, 520 * pr * t)} height={36} rx={8} fill={i === 0 ? C.green : "#30363D"} />
              <text x={720} y={0} fontFamily={MONO} fontSize={38} fill={i === 0 ? C.green : "#8B949E"}>{(pr * t).toFixed(2)}</text>
            </g>
          );
        })}
        {pick && <text x={40} y={680} fontFamily={MONO} fontSize={36} fill={C.green}>{typed(f, F.paris2, F.paris2 + 10, "→ output: Paris")}</text>}
        {f >= F.not2 && <text x={40} y={780} fontFamily={MONO} fontSize={32} fill={C.red}>{typed(f, F.not2, F.not2 + 22, c1)}</text>}
        {f >= F.because2 && <text x={40} y={840} fontFamily={MONO} fontSize={32} fill={C.green}>{typed(f, F.because2, F.because2 + 22, c2)}</text>}
        <text x={40} y={1030} fontFamily={MONO} fontSize={24} fill="#6E7681">(illustrative numbers)</text>
      </Window>
      {f >= F.not2 && <Tick f={f} at={F.not2 + 22} x={930} y={1040} ok={false} />}
      {f >= F.because2 && <Tick f={f} at={F.because2 + 22} x={930} y={1100} ok />}
    </g>
  );
};

// ===================== SHOT 7 — GLASS: BRILLIANT vs CONFIDENTLY WRONG =====================
const Split: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <GlassBg f={f} id="s" hue={["#0FA36B", "#3B5BFF", "#FF3D6E"]} />
    <Glass f={f} id="s1" x={70} y={300} w={940} h={460} hue={["#0FA36B", "#3B5BFF", "#FF3D6E"]} tint="rgba(75,227,160,0.12)" p={eout(ramp(f, F.brilliant - 6, F.brilliant + 6))}>
      <Tick f={f} at={F.brilliant} x={180} y={530} ok s={1.4} />
      <Kinetic f={f} at={F.brilliant} x={300} y={520} text="BRILLIANT" fs={100} anchor="start" />
      <Kinetic f={f} at={F.brilliant + 8} x={300} y={600} text="explains, writes, codes" fs={40} anchor="start" fill="rgba(255,255,255,0.75)" />
    </Glass>
    <Glass f={f} id="s2" x={70} y={800} w={940} h={460} hue={["#0FA36B", "#3B5BFF", "#FF3D6E"]} tint="rgba(255,92,108,0.14)" p={eout(ramp(f, F.confidently - 6, F.confidently + 6))}>
      <Tick f={f} at={F.confidently} x={180} y={1030} ok={false} s={1.4} />
      <Kinetic f={f} at={F.confidently} x={300} y={990} text="CONFIDENTLY" fs={84} anchor="start" />
      <Kinetic f={f} at={F.confidently + 10} x={300} y={1090} text="WRONG" fs={100} anchor="start" fill={C.red} />
      <Kinetic f={f} at={F.confidently + 18} x={300} y={1160} text="invents facts, sounds sure" fs={40} anchor="start" fill="rgba(255,255,255,0.75)" />
    </Glass>
    {f >= F.sentence - 8 && (
      <g transform={`translate(540 780) scale(${pop(f, F.sentence - 8, 10)})`}>
        <rect x={-230} y={-38} width={460} height={76} rx={38} fill={C.amber} />
        <text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill={C.ink} letterSpacing={2}>SAME SENTENCE</text>
      </g>
    )}
    {f >= F.fix - 4 && (
      <g opacity={eout(ramp(f, F.fix - 4, F.fix + 8))} transform={`translate(${lerp(-200, 0, eout(ramp(f, F.fix - 4, F.fix + 8)))} 0)`}>
        <rect x={160} y={1300} width={760} height={92} rx={46} fill="rgba(7,11,30,0.8)" stroke={C.cyan} strokeWidth={3} />
        <text x={540} y={1360} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill="#fff">WE FIX THIS → <tspan fill={C.cyan}>LESSON 5</tspan></text>
      </g>
    )}
  </g>
);

// ===================== SHOT 8 — GLASS RECAP =====================
const Recap: React.FC<{ f: number }> = ({ f }) => {
  const u = eio(ramp(f, F.autocomplete + 10, F.autocomplete + 30));
  return (
    <g>
      <GlassBg f={f} id="r" />
      <Glass f={f} id="r1" x={60} y={430} w={960} h={940} p={eout(ramp(f, F.remember - 6, F.remember + 8))}>
        <Kinetic f={f} at={F.remember} x={540} y={560} text="REMEMBER ONE LINE" fs={46} fill={C.amber} ls={4} />
        <Kinetic f={f} at={F.mind - 22} x={540} y={740} text="AI IS NOT A MIND" fs={96} />
        <Kinetic f={f} at={F.worlds} x={540} y={900} text="IT'S THE WORLD'S" fs={64} fill="rgba(255,255,255,0.85)" />
        <Kinetic f={f} at={F.most} x={540} y={1030} text="MOST POWERFUL" fs={100} />
        <Kinetic f={f} at={F.autocomplete} x={540} y={1190} text="AUTOCOMPLETE" fs={128} fill={C.cyan} />
        {u > 0 && <rect x={540 - 420 * u} y={1218} width={840 * u} height={10} rx={5} fill={C.cyan} />}
      </Glass>
    </g>
  );
};

// ===================== SHOT 9 — BLUEPRINT: TOMORROW + SUBSCRIBE =====================
const End: React.FC<{ f: number }> = ({ f }) => {
  const sub = F.subscribe;
  const clicked = f >= sub + 18;
  const ptrT = eio(ramp(f, sub - 10, sub + 14));
  return (
    <g>
      <BlueprintBg f={f} />
      <BpLabel f={f} at={F.tomorrow} x={540} y={300} text="TOMORROW →" hue={C.amber} fs={40} />
      <BpBox f={f} at={F.tomorrow + 4} x={110} y={340} w={860} h={330} label="LESSON 2" sub="how machines learn" fs={92} hue={C.line} />
      {/* gears = learning */}
      <Draw d="M880 400 m-40 0 a40 40 0 1 0 80 0 a40 40 0 1 0 -80 0" f={f} at={F.machines} dur={14} stroke={C.cyan} />
      <Draw d="M180 600 l40 -50 l40 30 l50 -70" f={f} at={F.programmer} dur={16} stroke={C.green} />
      {/* course map */}
      <Kinetic f={f} at={F.agent2 - 4} x={540} y={800} text="AGENT SCHOOL" fs={84} />
      <BpLabel f={f} at={F.agent2} x={540} y={860} text="MODULE 1 · FOUNDATIONS · 30 LESSONS" fs={28} />
      {[...Array(30)].map((_, i) => {
        const p = pop(f, F.agent2 + i * 1.2, 8);
        if (p <= 0) return null;
        const cx = 165 + (i % 10) * 83, cy = 940 + Math.floor(i / 10) * 86;
        const done = i === 0, next = i === 1;
        return (
          <g key={i} transform={`translate(${cx} ${cy}) scale(${p})`}>
            <circle r={30} fill={done ? C.green : next ? "rgba(94,231,255,0.25)" : "none"} stroke={done ? C.green : next ? C.cyan : C.grid} strokeWidth={4}
              opacity={next ? 0.6 + 0.4 * Math.sin(f * 0.2) : 1} />
            <text y={10} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={26} fill={done ? C.ink : next ? C.cyan : C.blue}>{i + 1}</text>
          </g>
        );
      })}
      {/* subscribe */}
      <g transform={`translate(540 1330) scale(${pop(f, F.lesson2, 12) * (clicked ? 1 : 1)})`}>
        <rect x={-260} y={-56} width={520} height={112} rx={56} fill={clicked ? "#30363D" : "#FF2D3D"} />
        <text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={46} fill="#fff" letterSpacing={2}>{clicked ? "SUBSCRIBED ✓" : "SUBSCRIBE"}</text>
      </g>
      {f >= sub - 10 && f < sub + 50 && <Pointer f={f} x={lerp(900, 640, ptrT)} y={lerp(1500, 1340, ptrT)} clickAt={sub + 14} />}
    </g>
  );
};

// ===================== DIRECTOR =====================
const SHOTS: Shot[] = [
  { from: 0, to: F.when, cam: [[0, { x: 540, y: 900, z: 1 }], [F.when, { x: 540, y: 880, z: 1.06 }]], render: () => null },
  { from: F.when, to: F.heres, tr: "zoom", cam: [[F.when, { x: 540, y: 900, z: 1.0 }], [F.predicting, { x: 540, y: 840, z: 1.08 }], [F.thousands, { x: 540, y: 920, z: 1.02 }]], render: () => null },
  { from: F.heres, to: F.feels - 22, tr: "whip", cam: [[F.heres, { x: 270, y: 680, z: 1.45 }], [F.trained + 30, { x: 290, y: 700, z: 1.35 }], [F.whole, { x: 600, y: 600, z: 1.15 }], [F.large, { x: 540, y: 900, z: 1.0 }]], render: () => null },
  { from: F.feels - 22, to: F.but - 6, tr: "iris", cam: [[F.feels - 22, { x: 540, y: 960, z: 1.0 }], [F.continues + 20, { x: 560, y: 900, z: 1.12 }]], render: () => null },
  { from: F.but - 6, to: F.paris1 - 10, tr: "push", cam: [[F.but, { x: 540, y: 900, z: 1.0 }], [F.likely + 20, { x: 540, y: 960, z: 1.04 }]], render: () => null },
  { from: F.paris1 - 10, to: F.brilliant - 30, tr: "whip", cam: [[F.paris1, { x: 540, y: 820, z: 1.12 }], [F.paris2, { x: 500, y: 860, z: 1.18 }], [F.not2, { x: 540, y: 960, z: 1.06 }]], render: () => null },
  { from: F.brilliant - 30, to: F.remember - 10, tr: "zoom", cam: [[F.brilliant, { x: 540, y: 900, z: 1.0 }], [F.fix + 30, { x: 540, y: 920, z: 1.04 }]], render: () => null },
  { from: F.remember - 10, to: F.tomorrow - 10, tr: "zoom", cam: [[F.remember, { x: 540, y: 900, z: 1.0 }], [F.autocomplete + 30, { x: 540, y: 960, z: 1.08 }]], render: () => null },
  { from: F.tomorrow - 10, to: TOTAL + 1, tr: "whipUp", cam: [[F.tomorrow, { x: 540, y: 560, z: 1.3 }], [F.agent2 - 10, { x: 540, y: 820, z: 1.05 }], [F.subscribe, { x: 540, y: 960, z: 1.0 }]], render: () => null },
];

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  const R = [Hook, Chat, Blueprint1, Iso1, Catch, Term, Split, Recap, End];
  const shots = SHOTS.map((s, i) => ({ ...s, render: () => React.createElement(R[i], { f }) }));
  return (
    <AbsoluteFill style={{ background: "#070B1E" }}>
      <FontStyle />
      <Narration slug="l001" total={TOTAL} />
      <Director f={f} shots={shots} handheld={1.5} />
      <LessonChrome f={f} total={TOTAL} lesson="M1 · LESSON 1" from={F.welcome} />
      <Caps f={f} words={WORDS} chunks={CHUNKS} accent={C.blue} y={1560} />
    </AbsoluteFill>
  );
};
