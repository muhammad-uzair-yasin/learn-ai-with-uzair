#!/usr/bin/env python3
"""Real word timings for an ElevenLabs narration (replaces gen_words.py's proportional timing).

usage: python3 engine/align_words.py <ep_dir> [--tail 75]
  needs <ep>/script.txt (spoken text, no [emotion] tags) and <ep>/narration.mp3
  writes <ep>/words.ts : WORDS, CHUNKS, VOICE_END, TOTAL, ENV, SPK  (frame = 15 + sec*30)

faster-whisper (base.en, CPU) gives word timestamps; the clean script words are aligned onto them with
difflib so captions show the script's spelling ("ChatGPT", punctuation) at the real spoken time.
"""
import sys, os, re, json, math, difflib, subprocess
import numpy as np
from faster_whisper import WhisperModel

ep = sys.argv[1].rstrip('/')
tail = int(sys.argv[sys.argv.index('--tail') + 1]) if '--tail' in sys.argv else 75
script = open(os.path.join(ep, 'script.txt')).read()
script = re.sub(r'\[[^\]]*\]', ' ', script)
toks = []
for t in script.split():
    if toks and not re.search(r'[A-Za-z0-9]', t): toks[-1] += t   # glue standalone '—' onto the previous word
    else: toks.append(t)
norm = lambda w: re.sub(r'[^a-z0-9]', '', w.lower())

pcm = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(ep, 'narration.mp3'), '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], capture_output=True).stdout, np.float32)
m = WhisperModel('base.en', device='cpu', compute_type='int8')
segs, _ = m.transcribe(pcm, word_timestamps=True)
ww = [(w.start, w.end, w.word.strip()) for s in segs for w in s.words]
# split whisper words like "chat"+"GPT" vs script "ChatGPT": compare on concatenated char level via difflib on normalized tokens
A = [norm(t) for t in toks]; B = [norm(w[2]) for w in ww]
times = [None] * len(toks)
sm = difflib.SequenceMatcher(None, A, B, autojunk=False)
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal':
        for k in range(i2 - i1): times[i1 + k] = (ww[j1 + k][0], ww[j1 + k][1])
    elif tag == 'replace' and j2 > j1:
        t0, t1 = ww[j1][0], ww[j2 - 1][1]; n = i2 - i1
        for k in range(n): times[i1 + k] = (t0 + (t1 - t0) * k / n, t0 + (t1 - t0) * (k + 1) / n)
# fill gaps (deleted words) by interpolation
for i in range(len(toks)):
    if times[i] is None:
        p = next((times[j][1] for j in range(i - 1, -1, -1) if times[j]), 0.0)
        q = next((times[j][0] for j in range(i + 1, len(toks)) if times[j]), p + 0.3)
        times[i] = (p, max(p + 0.08, q))
W = []
for (t0, t1), tok in zip(times, toks):
    W.append((15 + round(t0 * 30), max(15 + round(t0 * 30) + 2, 15 + round(t1 * 30)), tok.replace('"', '\\"')))
# chunks: 2-4 words, break at punctuation or pauses > 0.35 s
CH = []; i = 0
while i < len(W):
    j = i
    while j < len(W) - 1 and j - i < 3:
        if W[j][2].endswith(('.', ',', '?', '!', '—', ':', '...', '…')): break
        if W[j + 1][0] - W[j][1] > 10: break
        j += 1
    CH.append((i, j)); i = j + 1

raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(ep, 'narration.mp3'), '-ac', '1', '-ar', '30000', '-f', 's16le', '-'], capture_output=True).stdout
x = np.frombuffer(raw, np.int16).astype(np.float32)
n = len(x) // 1000
env = np.sqrt((x[:n * 1000].reshape(n, 1000) ** 2).mean(1)) / 32768
env = env / (env.max() or 1); env = np.where(env < 0.09, 0, env ** 0.7)
env = np.convolve(env, np.ones(3) / 3, 'same')

end = W[-1][1]
L = ['export const WORDS: [number, number, string][] = [']
L += [f'  [{a}, {b}, "{w}"],' for a, b, w in W]
L.append('];')
L.append('export const CHUNKS: [number, number][] = [' + ', '.join(f'[{a}, {b}]' for a, b in CH) + '];')
L.append(f'export const VOICE_END = {end};')
L.append(f'export const TOTAL = {end + tail};')
L.append('export const ENV: number[] = [' + ','.join(str(round(float(e), 3)) for e in env) + '];')
L.append(f'export const SPK: [number, number, string][] = [[{W[0][0]}, {end}, "host"]];')
open(os.path.join(ep, 'words.ts'), 'w').write('\n'.join(L) + '\n')
print(f'words {len(W)} (whisper {len(ww)})  chunks {len(CH)}  voice_end {end}  total {end + tail}')
for k, (a, b, w) in enumerate(W): print(k, a, w, end=' | ')
