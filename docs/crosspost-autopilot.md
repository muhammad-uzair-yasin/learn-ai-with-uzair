# Agent School cross-post autopilot (set up Nov 2, 2026)

Uzair: "that schedule should get the live video link each day and post it to the other platforms."
A daily scheduled task (03:39 PKT, after the lesson goes live at 02:00 PKT weekdays / 22:00 PKT weekends) follows this file.

## Data
`docs/crosspost-m1.json` — one row per lesson (2–30): `publish_utc`, `youtube_id` / `youtube_url`, `postsiva_media_id`
(the same video already uploaded to Postsiva when the lesson was scheduled — reuse it, do NOT re-upload),
`postsiva_media_url` (fallback, only L2–L8 have it), `crossposted`, `crosspost_links`.
If a media_id is ever rejected, re-upload `episodes/<date>-lNNN-*/render.mp4`… but renders are not in git, so instead
download nothing — report it and skip that platform.

## Steps
1. Repo `/home/claude/learn-ai-with-uzair` (github muhammad-uzair-yasin/learn-ai-with-uzair); attach with `add_repo` (access push) and clone if missing. `git pull`.
2. For every row with `crossposted: false` and `publish_utc` in the past:
   a. `YOUTUBE_GET_POST {post_id: youtube_id, channel_id: "UCZYmYaoskkNkoOE7LyJOKuw", refresh: true}` — continue only if the video
      is public (it returns published data). Its `commentary` is the YouTube description: use it for the captions.
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
3. Append a line per lesson to `docs/publish-log.md` (under the L2–L8 / L9–L30 tables), commit, push.
4. If every row is `crossposted: true`, say "Month 1 cross-posting complete" in the final message.
5. Final message (Uzair reads it on his phone): which lesson(s) were cross-posted, the links, any failures. If nothing was due, one line.
