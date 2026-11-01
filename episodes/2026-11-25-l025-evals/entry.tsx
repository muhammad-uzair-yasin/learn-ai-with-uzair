import React from "react";
import { Composition, Still, registerRoot } from "remotion";
import { LessonFilm, LessonThumb } from "./Film";
import { TOTAL } from "./words";
const Root: React.FC = () => (
  <>
    <Composition id="L025" component={LessonFilm} durationInFrames={TOTAL} fps={30} width={1080} height={1920} />
    <Still id="L025Thumb" component={LessonThumb} width={1080} height={1920} />
  </>
);
registerRoot(Root);
