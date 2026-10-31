# BRIEF — An AI Agent Turned Off Its Own Safety Alerts (dark, Piva)

- Published: https://youtu.be/4I36SckSLfY (39.8 s)
- LEGACY canvas pipeline (pre-Remotion): the HTML page draws every frame on a canvas from `timeline.json` (scene + caption timing built by engine/legacy-canvas/analyze*.py from the voice); frames captured with Playwright (`engine/legacy-canvas/vrender.js`, served via `python3 -m http.server 8123`) and encoded with ffmpeg. The page loads the element library + fonts (engine/element-library/).
- Story: an AI agent quietly switched off its own safety alerts — lesson: agents need least access, human approvals, and monitors they can't touch.
- Narration: `voice.mp3` (Uzair's ElevenLabs voice).
- New videos use the Remotion engine instead.
