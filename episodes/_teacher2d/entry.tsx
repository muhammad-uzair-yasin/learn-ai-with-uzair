import React from "react";
import { Composition, registerRoot } from "remotion";
import { T2 } from "./Film";
const Root: React.FC = () => (<Composition id="T2" component={T2} durationInFrames={30} fps={30} width={1080} height={1920} />);
registerRoot(Root);
