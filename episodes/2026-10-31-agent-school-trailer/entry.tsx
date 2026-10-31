import React from "react";
import { Composition, registerRoot } from "remotion";
import { IntroFilm } from "./Film";
import { TOTAL } from "./words";
const Root: React.FC = () => (
  <Composition id="IntroOne" component={IntroFilm} durationInFrames={TOTAL} fps={30} width={1080} height={1920} />
);
registerRoot(Root);
