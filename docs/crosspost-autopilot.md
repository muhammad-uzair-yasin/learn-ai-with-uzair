# Agent School cross-post autopilot (set up Nov 2, 2026 · updated Nov 16, 2026)

Uzair: "that schedule should get the live video link each day and post it to the other platforms."
A scheduled task runs every 2 hours and follows this file. Uzair changes the YouTube publish times himself in YouTube Studio,
so the stored times are NOT reliable: the only thing that decides is whether the video is public right now.

## What changed on Nov 16
- The original Postsiva uploads (Nov 2) vanished from the media library around Nov 7–9, so L7–L15 were stuck.
  Uzair said to re-upload. Renders are not in git, but every lesson can be **re-rendered from source** with
  `bash engine/render.sh episodes/<dir> <out.mp4>` (~20 min per lesson on the 2-core cloud box; first run `npm ci` in engine/).
- Uzair chose to **spread the backlog out**: max 1 lesson per run, max 3 lessons per UTC day (see Pacing).
- Postsiva post tools now need `account_id`, and use `video_id` instead of `media_id` (Instagram keeps `media_id`).

## Data
`docs/crosspost-m1.json` — one row per lesson (2–30): `planned_publish_utc` (original plan only — ignore it), `youtube_id` / `youtube_url`,
`postsiva_media_id`, `postsiva_media_url`, `crossposted`, `crosspost_links`, and `media_reuploaded` (true = the id is from the Nov 16 re-upload and is good).

## Accounts (account_id for every post tool)
Instagram `25340010902263812` · Facebook `756356074224043` · TikTok `-000PLRXdzUtibxPUTe1jE_CEULrcablG2-7` ·
LinkedIn `urn:li:organization:108813535` · Threads `26534793699472050` · Bluesky `did:plc:33fymsarluq7hned4ke24gm2` ·
Mastodon `116959168893128714` · YouTube `UCZYmYaoskkNkoOE7LyJOKuw`

## Pacing (Uzair, Nov 16: "spread out")
- Post at most **1 lesson per run**, and at most **3 lessons per UTC day** (count today's "cross-posted" lines in docs/publish-log.md).
- Always the **lowest-numbered** public, not-yet-crossposted lesson first.

## Facebook backfill (Uzair reconnected Facebook on Nov 17)
L8–L12 were cross-posted while Facebook was disconnected (their row has `crosspost_links.failed` mentioning facebook).
Each run, in addition to its normal lesson (and even when there is no new lesson), post **one** of these to Facebook only —
lowest lesson first — with FACEBOOK_POST_REEL `{account_id, video_id: postsiva_media_id, text}` (caption built from that
lesson's YouTube description, same format as Instagram). On success put the permalink in `crosspost_links.facebook`,
remove facebook from `failed`, add a log line, commit + push. Mention it in the final message.

## Steps
1. Repo `/home/claude/learn-ai-with-uzair` (github muhammad-uzair-yasin/learn-ai-with-uzair); attach with `add_repo` (access push) and clone if missing. `git pull`.
2. For every row with `crossposted: false`, check if the video is PUBLIC right now:
   `curl -s -o /dev/null -w "%{http_code}" "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<youtube_id>&format=json"`
   → `200` = public · `401`/`403`/`404` = still private/scheduled (skip, try next run).
   If none are public, or the daily cap is reached → final message "Nothing new to cross-post." (when capped, say how many are queued).
3. Take the lowest-numbered public, not-crossposted lesson.
   a. **Media:** if the row has `media_reuploaded: true`, use its `postsiva_media_id` / `postsiva_media_url`.
      Otherwise re-render it: `cd engine && npm ci` (if no node_modules), then
      `bash engine/render.sh episodes/<2026-11-DD-lNNN-slug> <scratch>/LNN.mp4` (run in background, poll the log; ~20 min),
      upload with Postsiva `get_upload_link {media_type: "video", file_path}` → run its `curl_command` → write the returned
      media_id + public_url into the row, set `media_reuploaded: true`, commit + push. Never commit the MP4.
   b. `YOUTUBE_GET_POST {account_id: "UCZYmYaoskkNkoOE7LyJOKuw", post_id: youtube_id}` — its `description` is the YouTube
      description: use it for the captions. No facts beyond it.
   c. Post with ONE `multi_execute_tool` call (7 tools):
      - INSTAGRAM_POST_REEL `{account_id, media_id, text}` — hook line + 3–4 emoji bullets + "🎓 FREE 6-month AI course — one short lesson every day." + "▶️ Full lesson on YouTube: <youtube_url>" + "📌 Subscribe: https://www.youtube.com/@uzair.devops" + hashtags
      - FACEBOOK_POST_REEL `{account_id, video_id, text}` — same as Instagram
      - TIKTOK_POST_VIDEO `{account_id, video_id, text}` — one short line + "Full course on YouTube: youtube.com/@uzair.devops" + 5 hashtags (no clickable links on TikTok)
      - LINKEDIN_POST_VIDEO `{account_id, video_id, text}` — professional: hook + 4 bullets + links
      - THREADS_POST_VIDEO `{account_id, video_id, text}` — ≤ 450 chars, hook + one-line takeaway + both links
      - BLUESKY_POST_VIDEO `{account_id, video_id, text}` — ≤ 280 chars, hook + both links
      - MASTODON_POST_VIDEO `{account_id, video_id, text}` — ≤ 450 chars, hook + takeaway + both links + 3 hashtags
      If a media id is rejected, retry that platform with `media_url`/`video_url` = postsiva_media_url.
      Every caption except TikTok carries the YouTube lesson link AND the channel link.
   d. Set `crossposted: true` only if at least 5 of 7 succeeded; store the returned permalinks in `crosspost_links`.
      Failed platforms: retry once; if still failing, list them in `crosspost_links.failed`.
4. NO DOUBLE POSTS: right after posting, set `crossposted: true`, add a "cross-posted" line to `docs/publish-log.md`,
   then commit AND push immediately. If the push fails, retry once (`git pull --rebase` then push); if it still fails, STOP and report it.
   Never post a lesson whose row is already `crossposted: true`, or that already has a cross-post line in publish-log.md.
5. If every row is `crossposted: true`, say "Month 1 cross-posting complete — you can turn this scheduled task off."
6. Final message (Uzair reads it on his phone): which lesson was cross-posted, the links, any failures, how many public lessons are still queued.
   If nothing was posted, reply only "Nothing new to cross-post." (one line).
