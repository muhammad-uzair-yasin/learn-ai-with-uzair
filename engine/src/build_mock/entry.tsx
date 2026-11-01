import React from "react";
import { Composition, registerRoot } from "remotion";
import { Mock } from "./Film";
const Root: React.FC = () => (<Composition id="Mock" component={Mock} durationInFrames={225} fps={30} width={1080} height={1920} />);
registerRoot(Root);
