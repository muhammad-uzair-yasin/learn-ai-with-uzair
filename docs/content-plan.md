# Agent School — content plan (Learn AI With Uzair)

## What it is
A **free 6-month AI course**, one short lesson every day, 180 lessons (Nov 1 2026 → Apr 30 2027).
Audience: complete beginners — **no coding or technical background needed** (said explicitly in the trailer).
Goal: take a viewer from "what is AI?" to building and shipping real AI agents.

## Why it's built this way (Uzair's decisions, Oct 31 2026)
- **Taught like a teacher, never random topics.** Each lesson builds on the last; viewers binge in order. A random-topic AI channel competes with thousands; a *course* gives a reason to subscribe and come back daily.
- **Full plan locked before recording** so the sequence is coherent for 6 months.
- **Playlists per month + one master playlist** so new viewers can "start from Lesson 1".
- **Free + beginner-level** is the core promise (no paywall, no sign-up).

## Episode template
1. Hook line = the lesson title (rules.md #1).
2. (From L2) one-line recap of yesterday.
3. ONE concept, acted out by the stick-figure teacher (chalkboard, pen writing, cursor clicking real-looking UI).
4. One memorable takeaway line.
5. Tomorrow's tease + "Lesson N+1 drops tomorrow... subscribe so you don't fall behind."
On-screen in-world sign: `M<module> · LESSON <N>`. Bright, friendly visual worlds by default (it's a school).

## How the agent-building lessons will be made (Build Month onward)
The agents are **real, working code** built and run by the AI production agent in its workspace:
real tool calls, memory, guardrails. Videos mix **real captures** (terminal output, logs, browser UI recorded
frame by frame with Playwright) with the animated teacher explaining the architecture around them.
Each week's agent is published as its own small public GitHub repo, linked in every description.

## Playlists (created Oct 31 2026, public)
| Playlist | playlist_id |
|---|---|
| Agent School — Full Course (Free AI Course) | PLeSmSWbeDFmc |
| M1: Foundations | PLEJNaKpmtTQw |
| M2: Build Month | PLHT69qM3IerE |
| M3: Advanced Agent Engineering | PLRce4lg13qJs |
| M4: The AI Stack | PLdHCoAWY8ga4 |
| M5: Agents at Work | PLKqZqtNt54E8 |
| M6: Ship Like a Pro | PLVygqy41Nm34 |

`YOUTUBE_POST_VIDEO` takes one `playlist_id` → attach the **month's** playlist at upload; add to the master list too.

## Scripts
Titles below are locked. Each day's script is written the day before (so tools and model names are current) and saved in `episodes/<date>-lNNN-<slug>/script.md`.

### Lesson 1 script (ready, awaiting Uzair's recording) — ~1:35
> AI doesn't think... it predicts. Welcome to Agent School... lesson one.
>
> When you ask ChatGPT a question, it's not understanding you. It's doing exactly one thing... predicting the next word. Then the next. Then the next. Thousands of times, every single answer.
>
> Here's the easiest way to see it. Your phone's keyboard suggests the next word, right? Trained on your texting. Now take that same idea... and train it on basically the whole internet. Books, code, websites... trillions of words. That's a large language model. Same trick... unimaginable scale.
>
> And that's why it feels so smart. It has seen almost every question humans have ever asked... and learned the patterns hiding in our answers. Ask it anything, and it continues the pattern.
>
> But here's the catch... and this one matters. A prediction machine doesn't know what's true. It only knows what's... likely. "Paris" usually follows "the capital of France is" — so it says Paris. Not because it knows... because it's probable. That's why AI can be brilliant... and confidently wrong, in the same sentence. We'll fix that later in this course.
>
> So remember one line. AI is not a mind... it's the world's most powerful autocomplete.
>
> Tomorrow... how machines learn all this, without a single programmer writing the answers.
>
> This is Agent School. Lesson two drops tomorrow... subscribe so you don't fall behind.

Scene plan: word tiles snapping in one by one → phone keyboard growing into a giant model → the "Paris" probability bars → brilliant / confidently-wrong split → "M1 · LESSON 1" sign → tomorrow tease.

---

## The 180 lessons

### M1 — NOVEMBER: Foundations (L1–30, Nov 1–30)
1. AI Doesn't Think — It Predicts (What AI Actually Is)
2. Nobody Programmed ChatGPT's Answers — How Machines Learn
3. AI Can't See the Word "Strawberry" — Tokens Explained
4. Your AI Forgets You Mid-Conversation — The Context Window
5. Why AI Lies With a Straight Face — Hallucination
6. Same AI, 10× Better Answers — Prompting That Works
7. The Secret Message Before Everything You Type — System Prompts
8. Ask AI Twice, Get Two Answers — Temperature
9. Your AI Never Read Your Files… Until This — RAG
10. AI Turns Every Sentence Into Coordinates — Embeddings
11. AI Doesn't See Your Photo, It Reads It — Multimodal
12. Stop Fine-Tuning — Prompt vs RAG vs Fine-Tune
13. A Chatbot Answers. An Agent Acts.
14. Every AI Agent Runs the Same 4-Step Loop
15. AI Has No Hands — So How Did It Book a Flight? (Tool Calling)
16. The USB-C of AI — What Is MCP?
17. Your Agent Remembers You… Selectively — Agent Memory
18. Give an Agent a Huge Task, Watch It Slice It — Planning
19. The Best AI Systems Are Committees — Multi-Agent Teams
20. An Agent Switched Off Its Own Alarms. Real Story. — Guardrails (callback to the Oct 30 video)
21. One Sentence on a Website Can Hack an AI — Prompt Injection
22. The Best AI Model Is Usually the Cheaper One — Picking a Model
23. What One AI Question Actually Costs — Your First API Call
24. Build From Scratch or Use a Framework? Here's How to Decide
25. Your Agent Passed Your Test… and Failed 100 Users — Evals
26. An Agent Loop Can Empty Your Wallet Overnight — Cost Control
27. The 4 Things Every Production Agent Needs — Shipping Safely
28. An Entire AI Agent in One Picture — Full Architecture
29. Let's Build a Real Agent. Right Now. (Part 1)
30. Our Agent Goes Live Today — Final Lesson of Month 1

### M2 — DECEMBER: Build Month — 4 real agents (L31–61)
W1 Research Agent (Dec 1–7): 31. We're Building 4 Real Agents This Month — Here's #1 · 32. Giving Our Agent Eyes — Web Search Tools · 33. Teaching It to Read 50 Pages in Seconds · 34. The Agent Takes Notes — Adding Memory · 35. No Source, No Sentence — Citation Guardrails · 36. Breaking Our Own Agent on Purpose — Testing · 37. Agent #1 Ships — The Research Agent Demo
W2 Social Media Agent (Dec 8–14): 38. Agent #2 — An AI That Runs a Social Account · 39. One Idea, Five Platforms — The Writing Pipeline · 40. Teaching the Agent Your Brand Voice · 41. It Learns the Best Time to Post — Scheduling · 42. Never Let AI Post Unsupervised — Approval Gates · 43. Can It Survive the Comments? — Test Week · 44. Agent #2 Ships — Watch It Post for Real
W3 Customer Support Agent (Dec 15–21): 45. Agent #3 — Support That Doesn't Enrage Customers · 46. Feeding It Every Answer You Ever Wrote — RAG on Docs · 47. It Remembers Angry Customers — Conversation Memory · 48. "Let Me Get a Human" — The Escalation Rule · 49. The Agent That Says "I Don't Know" · 50. 100 Fake Customers Attack Our Agent · 51. Agent #3 Ships — Live Support Demo
W4 Personal Assistant (Dec 22–28): 52. Agent #4 — An Assistant That Actually Does Things · 53. Calendar, Email, To-Dos — Wiring the Tools · 54. It Knows Your Life (Carefully) — Private Memory · 55. Money Needs a Second Key — Permissions · 56. Morning Briefings While You Sleep — Scheduled Runs · 57. One Week With an AI Assistant — Results · 58. Agent #4 Ships — Full Assistant Demo
Finale (Dec 29–31): 59. 4 Agents, 1 Pattern — What Every Build Shared · 60. The 7 Mistakes We Made Building 4 Agents · 61. Your Turn — Pick Your First Agent

### M3 — JANUARY: Advanced Agent Engineering (L62–92)
62. Context Is the New Code · 63. Your Prompt Is a Budget · 64. The Needle in the Haystack — Long Context Truths · 65. Compressing a Conversation Without Losing It · 66. One File That Makes Every Agent Smarter · 67. RAG Was Lying to You — Why Basic RAG Fails · 68. Chunking — Where You Cut Decides What AI Finds · 69. Keyword + Meaning = Hybrid Search · 70. The Reranker — A Second Brain That Sorts Results · 71. RAG That Cites Its Sources, Line by Line · 72. We Benchmarked 5 RAG Setups — The Winner Surprised Us · 73. Memory Architectures — Short, Long, Working · 74. The Memory Filesystem — Remembering for Months · 75. Forgetting Is a Feature — Memory Hygiene · 76. Shared Memory — When 5 Agents Know the Same Thing · 77. Stop Parsing Text — Structured Outputs · 78. Schemas — AI Fills Forms Perfectly Every Time · 79. When AI Breaks Your Schema — Validation & Retries · 80. Orchestration — One Brain or Many? · 81. Pipelines vs Agents — When a Flowchart Wins · 82. State Machines — Agents That Can't Get Lost · 83. The Orchestrator Pattern — Manager + Specialists · 84. Handoffs — Passing Tasks Without Dropping Them · 85. Streaming — Why AI Types Word by Word · 86. Your Agent WILL Fail — Error Recovery · 87. Retries, Timeouts, Fallbacks — The Safety Net · 88. The Checkpoint Trick — Resume After a Crash · 89. Observability — Watching Your Agent Think · 90. Logs That Explain Themselves — Tracing Decisions · 91. The Dashboard Every Agent Needs · 92. Month 3 Recap — You Engineer Agents, Not Prompts

### M4 — FEBRUARY: The AI Stack (L93–120)
93. The Big 3 APIs — OpenAI vs Anthropic vs Gemini · 94. Your First OpenAI API Project — Start to Finish · 95. The Claude API — Tool Use Done Right · 96. Gemini's Superpower — Context That Swallows Books · 97. One Interface for Every Model — Routers & Fallbacks · 98. Let's Build an MCP Server — Part 1: Your First Tool · 99. MCP Part 2 — Resources and Prompts · 100. 🎉 LESSON 100 — Our MCP Server Goes Public · 101. Connecting Your MCP Server to Claude & Cursor · 102. n8n — Automation Superpowers Without Code · 103. n8n + AI — Your First Smart Workflow · 104. The n8n RAG Pipeline — Docs In, Answers Out · 105. n8n Agents — Tools, Memory, Loops… Visually · 106. 5 n8n Workflows You'll Actually Use · 107. n8n in Production — Hosting, Errors, Costs · 108. Ollama — Run AI on Your Laptop, Free · 109. Picking a Local Model — 7B vs 70B Truths · 110. Local RAG — 100% Private Document Chat · 111. When Local Beats Cloud (and When It Doesn't) · 112. The Open-Source AI Stack — My Full Toolkit · 113. Serving Models Like a Pro — vLLM & Friends · 114. Hugging Face — The GitHub of AI · 115. The Agent SDK Landscape — Which One to Learn · 116. Building With the OpenAI Agents SDK · 117. Building With the Claude Agent SDK · 118. CrewAI — A Team of Agents in 50 Lines · 119. LangGraph — Agents as Graphs · 120. Month 4 Recap — You Own the Whole Stack

### M5 — MARCH: Agents at Work (L121–151)
121. Agents at Work — A Month of Real Business Builds · 122. The Marketing Agent — Campaigns on Autopilot · 123. The SEO Agent — 30 Blog Briefs While You Sleep · 124. The Ad Agent — 50 Ad Variants, Tested Automatically · 125. The Sales Agent — Leads In, Meetings Out · 126. Cold Outreach at Scale (Done Ethically) · 127. The CRM Agent — It Never Forgets a Follow-Up · 128. Sales Week Build — Lead-Qualifying Agent Live · 129. Support Agents in the Wild — What Actually Works · 130. Deflection Rate — The Only Support Metric That Matters · 131. Support Week Build — Ticket Triage Agent · 132. The Developer Agent — Code Review While You Sleep · 133. Agents That Fix Bugs — How Far Can They Go? · 134. The CI Agent — Tests, Changelogs, Releases · 135. Dev Week Build — A PR Review Agent Live · 136. The Data Agent — Ask Your Database in English · 137. Report Agents — Monday Dashboards, Zero Clicks · 138. The Anomaly Agent — It Noticed Before We Did · 139. Data Week Build — SQL Agent With Guardrails · 140. E-Commerce Agents — Descriptions, Pricing, Stock · 141. The Review-Mining Agent — 1,000 Reviews → 5 Insights · 142. The Price-Watch Agent — Tracking Competitors Daily · 143. E-Com Week Build — Product Listing Agent · 144. A Channel Run by AI? How I Run This Network · 145. The Script-to-Video Pipeline — My Actual Setup · 146. The Repurposing Agent — 1 Video Into 10 Posts · 147. Content Week Build — The Daily Digest Agent · 148. Agent ROI — The Math Bosses Actually Accept · 149. Case Study — Companies Saving Millions With Agents · 150. Case Study — Agent Failures That Cost Millions · 151. Month 5 Recap — Pick the Agent Your Business Needs

### M6 — APRIL: Ship Like a Pro (L152–180; Apr 30 bonus)
152. Ship Month — From Project to Product · 153. Agent Security — The Attack Surface Nobody Sees · 154. Prompt Injection in Production — Real Attacks, Real Fixes · 155. Secrets, Keys and Scopes — Locking It Down · 156. The Sandbox Rule — Never Give an Agent Your Whole Computer · 157. Evals at Scale — 1,000 Tests a Night · 158. Building an Eval Set From Real User Failures · 159. LLM-as-Judge — Can AI Grade AI? · 160. Regression Watch — The Model Update That Breaks You · 161. Cost Engineering — Cut Your AI Bill 10× · 162. Caching, Batching, Routing — The Cost Trilogy · 163. The Token Audit — Find Where Money Leaks · 164. Privacy — What You Can't Send to an API · 165. Compliance in Plain English — GDPR, SOC 2, AI Policies · 166. The Audit Trail — Proving What Your Agent Did · 167. Monetizing Agents — 5 Business Models That Work · 168. Pricing an AI Product — Seat, Use, or Outcome · 169. Selling Agents as a Service — The Agency Path · 170. From Side Project to SaaS — A Realistic Roadmap · 171. The AI Engineer Portfolio — Show This, Skip That · 172. Getting Hired in AI — The 2027 Skills Checklist · 173. Freelancing With Agents — Your First Client · 174. CAPSTONE 1 — We Ship a PUBLIC Agent Product · 175. CAPSTONE 2 — Architecture and Tools · 176. CAPSTONE 3 — Guardrails and Evals · 177. CAPSTONE 4 — Landing Page and Launch Plan · 178. CAPSTONE 5 — Launch Day 🚀 · 179. CAPSTONE 6 — First Users, First Fixes · 180. GRADUATION — 180 Lessons. You're an Agent Engineer.
Apr 30 bonus: Agent School Q&A — Your Questions, Season 2 Reveal
