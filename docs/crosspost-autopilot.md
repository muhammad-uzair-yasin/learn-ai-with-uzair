# Agent School cross-post autopilot (set up Nov 2, 2026)

Uzair: "that schedule should get the live video link each day and post it to the other platforms."
A scheduled task runs every 2 hours and follows this file. Uzair changes the YouTube publish times himself in YouTube Studio,
so the stored times are NOT reliable: the only thing that decides is whether the video is public right now.

## Data
`docs/crosspost-m1.json` — one row per lesson (2–30): `planned_publish_utc` (original plan only — ignore it), `youtube_id` / `youtube_url`, `postsiva_media_id`
(the same video already uploaded to Postsiva when the lesson was scheduled — reuse it, do NOT re-upload),
`postsiva_media_url` (fallback, only L2–L8 have it), `crossposted`, `crosspost_links`.
If a media_id is rejected, retry with `media_url` = postsiva_media_url when the row has one; otherwise report it
(renders are not in git, so there is nothing to re-upload) and skip that platform.

## Steps
1. Repo `/home/claude/learn-ai-with-uzair` (github muhammad-uzair-yasin/learn-ai-with-uzair); attach with `add_repo` (access push) and clone if missing. `git pull`.
2. For every row with `crossposted: false`, check if the video is PUBLIC right now:
   `curl -s -o /dev/null -w "%{http_code}" "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<youtube_id>&format=json"`
   → `200` = public (go on) · `401`/`403`/`404` = still private/scheduled (skip, try next run). (YOUTUBE_GET_POST does NOT show
   privacy, and its published_at is the upload time — don't use it to decide.)
   a. For each public one: `YOUTUBE_GET_POST {post_id: youtube_id, channel_id: "UCZYmYaoskkNkoOE7LyJOKuw", refresh: true}` —
      its `commentary` is the YouTube description: use it for the captions.
   b. Post with `multi_execute_tool` (one call, 7 tools, `media_id` = postsiva_media_id):
      - INSTAGRAM_POST_REEL `{media_id, text}` — hook line + 3–4 emoji bullets + "🎓 FREE 6-month AI course — one short lesson every day." + "▶️ Full lesson on YouTube: <youtube_url>" + "📌 Subscribe: https://www.youtube.com/@uzair.devops" + hashtags
      - FACEBOOK_POST_REEL `{page_id: "756356074224043", media_id, text}` — same as Instagram
      - TIKTOK_POST_VIDEO `{media_id, text}` — one short line + "Full course on YouTube: youtube.com/@uzair.devops" + 5 hashtags (no clickable links on TikTok)
      - LINKEDIN_POST_VIDEO `{page_id: "urn:li:organization:108813535", media_id, text}` — professional: hook + 4 bullets + links
      - THREADS_POST_VIDEO `{media_id, text}` — ≤ 450 chars, hook + one-line takeaway + both links
      - BLUESKY_POST_VIDEO `{media_id, text}` — ≤ 280 chars, hook + both links
      - MASTODON_POST_VIDEO `{media_id, text}` — ≤ 450 chars, hook + takeaway + both links + 3 hashtags
      Every caption except TikTok carries the YouTube lesson link AND the channel link. No facts beyond the YouTube description.
   c. Set `crossposted: true` only if at least 5 of 7 succeeded; store the returned permalinks in `crosspost_links`.
      Failed platforms: retry once; if still failing, list them in `crosspost_links.failed`.
3. NO DOUBLE POSTS: right after each lesson is posted, set `crossposted: true`, add its line to `docs/publish-log.md`,
   then commit AND push immediately (before touching the next lesson). If the push fails, retry once (`git pull --rebase`
   then push); if it still fails, STOP — post nothing more this run and report it, so a later run can't post it again.
   Never post a lesson whose row is already `crossposted: true`, or that already has a cross-post line in publish-log.md.
4. If every row is `crossposted: true`, say "Month 1 cross-posting complete" in the final message.
5. Final message (Uzair reads it on his phone): which lesson(s) were cross-posted, the links, any failures. If nothing went public since the last run, reply only "Nothing new to cross-post." (keep it to that one line).
