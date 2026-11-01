// TEMPLATE — Agent School lesson (copy this folder to episodes/<date>-lNNN-<slug>/ and edit).
// projects/lNNN/   <- change the slug (render.sh reads it from this line)
// Everything visual comes from engine/src/lessonkit.tsx (the locked L001 look). You only write:
//   1) cue words (F)  2) ScreenContent slides written by the pen  3) teacher pointing/gestures  4) camera keys  5) thumbnail text
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FontStyle } from "./kit";
import { Narration, Director, Shot } from "./factkit";
import { K, Wr, DCard, DLine, DBar, DTick, resetClips, Classroom, TitleBar, CaptionBar, perform, CAMS, LessonThumbLayout } from "./lessonkit";
import { WORDS, CHUNKS, TOTAL, ENV } from "./words";

const LESSON = 1, MODULE = "MODULE 1", TITLE = "Lesson title here";
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const W = (word: string, n = 1): number => { let k = 0; for (const w of WORDS) if (norm(w[2]) === word && ++k === n) return w[0]; throw new Error(`cue word not found: ${word} #${n}`); };
// 1) cue frames = the frame each key word is spoken (pen writes on these)
const F = { a: W("ai"), b: W("when"), end: W("subscribe") };

// 2) the big screen (local coords 0..960 x 0..600). One slide per idea; the PEN writes everything.
const ScreenContent: React.FC<{ f: number }> = ({ f: f0 }) => {
  resetClips();
  const f = f0 < 15 ? F.a + 60 : f0; // frames 0-14 = finished hook slide (cover frame)
  if (f < F.b) return (
    <g>
      <Wr f={f} at={F.a} x={480} y={220} fs={100} t="HOOK LINE" />
      <DLine f={f} at={F.a + 20} x1={300} y1={250} x2={660} y2={240} c={K.red} w={14} />
      <DCard f={f} at={F.a + 30} x={200} y={320} w={560} h={160} fill={K.soft} stroke={K.blue}>
        <Wr f={f} at={F.a + 40} x={480} y={420} fs={60} t="key idea" c={K.blue} />
      </DCard>
    </g>
  );
  return (
    <g>
      <Wr f={f} at={F.b} x={480} y={120} fs={50} t="NEXT SLIDE" c={K.blue} />
      <DBar f={f} at={F.b + 20} x={200} y={260} w={500} h={40} c={K.green} />
      <DTick f={f} at={F.b + 40} x={480} y={420} ok />
    </g>
  );
};

export const LessonFilm: React.FC = () => {
  const f = useCurrentFrame();
  // 3) teacher: point at the screen while the pen writes, gestures for emphasis
  const pose = perform(f, ENV, { point: [[0, 0.95], [F.b, 0.9], [TOTAL, 0.2]], hands: [[0, "openPalm"], [F.end, "thumbsUp"]], brows: [] });
  // 4) camera — never MID/FACE while the pen is writing
  const shots: Shot[] = [{ from: 0, to: TOTAL + 1, cam: [[0, CAMS.WIDE], [F.b, CAMS.SCREEN], [TOTAL, CAMS.WIDE]], render: () => <Classroom f={f} pose={pose} screen={<ScreenContent f={f} />} /> }];
  return (
    <AbsoluteFill style={{ background: K.wall }}>
      <FontStyle />
      <Narration slug="lNNN" total={TOTAL} />
      <Director f={f} shots={shots} handheld={0} />
      <TitleBar f={f} total={TOTAL} lesson={LESSON} module={MODULE} title={TITLE} />
      <CaptionBar f={f} words={WORDS} chunks={CHUNKS} />
    </AbsoluteFill>
  );
};
// 5) thumbnail
export const LessonThumb: React.FC = () => (
  <AbsoluteFill><FontStyle /><LessonThumbLayout tag={`FREE AI COURSE · L${LESSON}`} line1="AI DOESN'T" strike="THINK" line2="IT PREDICTS" bubble1="WAIT… WHAT?!" bubble2="how AI really works" /></AbsoluteFill>
);
