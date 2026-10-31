# AGENTS.md — handoff manual (Learn AI With Uzair)

You are continuing the production of **Learn AI With Uzair** (@uzair.devops, channel_id `UCZYmYaoskkNkoOE7LyJOKuw`).
Read this file, then `docs/rules.md`, then `docs/content-plan.md`. Everything you need is in this repo.

## The job
**Agent School** — a free, beginner-friendly 6-month AI course: one lesson per day, 180 lessons, from "what is AI?" to shipping real AI agents. No coding experience needed.
One video per day. End line of every video: *"Lesson N+1 drops tomorrow... subscribe so you don't fall behind."*

## Who does what
- **Uzair (owner):** approves, records the narration in his ElevenLabs cloned voice from your script, uploads finished MP4s to Postsiva when asked (the agent workspace can't reach the upload server), gives direction.
- **You (agent):** research + verify facts, write scripts, build the film in code, QA, publish via Postsiva MCP, keep this repo up to date.

## Current status (update this block after every video)
- Trailer published Oct 31 (https://youtu.be/CCi9tOoL0Vs) + cross-posted to 7 platforms.
- 7 playlists created (ids in docs/content-plan.md).
- **Lesson 1** script is written (docs/content-plan.md) — waiting for Uzair's recording.

## Next actions
1. When Uzair attaches the Lesson 1 MP3: create `episodes/2026-11-01-l001-ai-predicts/`, build the film (bright classroom world, `M1 · LESSON 1` sign), QA, send.
2. On approval: post to this channel with `playlist_id` = M1 (PLEJNaKpmtTQw), then cross-post with the YT link.
3. Each following day: write the next lesson's script from the locked title list, the day before.

## Definition of done for a video
1. Script follows docs/rules.md (hook = topic, verified facts, CTA last) and Uzair recorded it.
2. Film built with the engine: word-highlight captions, lip-sync, both hands, motion on every shot, cover frame.
3. QA stills checked; final MP4 sent to Uzair; approved.
4. Published (YouTube first, then cross-posts if requested) with description per docs/posting.md.
5. **Committed + pushed**: `episodes/<date>-<slug>/` (script.md, sents.json, words.ts, Film.tsx, entry.tsx, narration.mp3, BRIEF.md with link + sources, contact_sheet.jpg) + `docs/publish-log.md` + the status block above.

## Don'ts
- Don't change the channel's purpose or the rules without Uzair.
- Don't commit rendered MP4s (they live on YouTube) or any API keys/tokens.
- Don't invent facts, prices or links — verify or cut.
