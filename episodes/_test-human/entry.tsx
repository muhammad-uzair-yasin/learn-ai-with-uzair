import React from "react";
import { Composition, registerRoot } from "remotion";
import { T } from "./Film";
const Root: React.FC = () => (<Composition id="T" component={T} durationInFrames={30} fps={30} width={1080} height={1920} />);
registerRoot(Root);
