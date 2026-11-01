# Agent School lesson format (LOCKED — Uzair approved Lesson 1 on Nov 1 2026)

Reference video: `reference/L001-ai-predicts/L001_final.mp4`. Every lesson looks and sounds like it.

## The look (do not change without Uzair)
- **Bright 2D classroom** (cream wall, wood floor, window, plant, desk) with a **big screen** on the wall.
- **Teacher** = `Teacher2D` (white man, side-part brown hair, round glasses, blue eyes, **navy blazer, white shirt, red tie**). No book.
  Right hand holds the pointer; left hand gestures: `openPalm` (explaining, default), `wave` (welcome/outro), `fingerUp` (key point / "remember"), `thumbsUp` (subscribe), `relaxed`, `pocket`.
  Mouth moves with the voice (ENV), blinks, eyebrow raises on surprises, points at the screen while the pen writes.
- **A blue marker pen writes and draws EVERYTHING on the screen** (`Wr` text, `DCard` boxes, `DLine` strikes/arrows/underlines, `DBar` bars, `DTick` ✓/✗), timed to the spoken words.
- **Title visible the whole video**, top-left (`TitleBar`: LESSON n · AGENT SCHOOL · MODULE n · title).
- **Captions** word-by-word on a white band (`CaptionBar`). **No sound effects.** No music unless Uzair asks.
- **Camera**: one Director shot, keys between `CAMS.WIDE / SCREEN / FACE / MID`. Never MID/FACE while the pen is writing (crops the screen).
- Vertical 1080×1920, 30 fps, ~1–1.5 min.

## Voice (ElevenLabs = text-to-voice ONLY)
- Voice "Muhammad Uzair" (voice_id `IhzMMQ5LDAqfPKflkxUf`), model **eleven_v4**, script with inline emotion tags
  (`[excited]`, `[whispering]`, `[chuckles]`, `[serious, slower]`, `[playful urgency]` …). 2 takes, pick the clearest.
- Never use ElevenLabs image/video/lip-sync tools.

## Steps for a new lesson
1. Script from the locked title list (`docs/content-plan.md`): hook = title in the first line, 1 concept, recap line, "Lesson N+1 drops tomorrow — subscribe".
2. Generate voice (above) → `episodes/<date>-lNNN-<slug>/narration.mp3`; save the spoken text (no tags) as `script.txt`.
3. `python3 engine/align_words.py episodes/<ep>` → `words.ts` (real word timings via faster-whisper).
4. `cp -r episodes/_template-lesson/* episodes/<ep>/`, set slug/LESSON/TITLE, write cue words, slides, gestures, camera, thumbnail text.
5. Preview stills: `bash engine/render.sh episodes/<ep> --still <frame>`; full render: `bash engine/render.sh episodes/<ep>` (~1 h on 2 CPUs).
   Fix a few frames without a full re-render: render `--frames=a-b` and splice (see L001 BRIEF).
6. QA twice: `python3 engine/qa/verify.py episodes/<ep>` (audio offset ≈0.5 s, corr > 0.6, frame count) + read the contact sheets frame by frame.
7. Thumbnail: `Still` "LessonThumb" (LessonThumbLayout: tag pill, hook text on the screen, excited teacher, amber bubble).
8. Show Uzair → post to Learn AI With Uzair with the module playlist, thumbnail, US-prime-time schedule → push the episode folder.
