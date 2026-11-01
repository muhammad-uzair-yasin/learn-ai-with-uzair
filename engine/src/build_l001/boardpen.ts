// boardpen.ts — marker drawing on the 1700x1000 whiteboard canvas (Agent School). Everything takes a progress
// p (0..1) so writing/drawing happens live, in sync with the voice.
import { L } from "./classroom";
export const FONTB = "InterLocal, sans-serif";
const c01 = (v: number) => Math.max(0, Math.min(1, v));
export const prog = (f: number, a: number, dur = 14) => c01((f - a) / dur);

/** Text written left→right (wipe reveal), like a hand writing it. */
export const txt = (ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, color: string = L.ink, p = 1, align: CanvasTextAlign = "center") => {
  if (p <= 0) return;
  ctx.save();
  ctx.font = `800 ${size}px ${FONTB}`; ctx.textAlign = align; ctx.textBaseline = "alphabetic"; ctx.fillStyle = color;
  const w = ctx.measureText(s).width;
  const x0 = align === "center" ? x - w / 2 : align === "right" ? x - w : x;
  ctx.beginPath(); ctx.rect(x0 - 10, y - size * 1.1, (w + 20) * c01(p), size * 1.5); ctx.clip();
  ctx.fillText(s, x, y);
  ctx.restore();
};
export const textW = (ctx: CanvasRenderingContext2D, s: string, size: number) => { ctx.font = `800 ${size}px ${FONTB}`; return ctx.measureText(s).width; };
/** Polyline drawn on progressively. */
export const line = (ctx: CanvasRenderingContext2D, pts: [number, number][], p: number, color: string = L.ink, w = 10) => {
  if (p <= 0 || pts.length < 2) return;
  const seg: number[] = []; let tot = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); tot += d; }
  let left = tot * c01(p);
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.beginPath(); ctx.moveTo(...pts[0]);
  for (let i = 1; i < pts.length && left > 0; i++) {
    const t = Math.min(1, left / seg[i - 1]);
    ctx.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t);
    left -= seg[i - 1];
  }
  ctx.stroke(); ctx.restore();
};
export const rrectPts = (x: number, y: number, w: number, h: number, r = 26): [number, number][] => {
  const pts: [number, number][] = [];
  const arc = (cx: number, cy: number, a0: number) => { for (let k = 0; k <= 6; k++) { const a = a0 + (k / 6) * (Math.PI / 2); pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } };
  arc(x + w - r, y + r, -Math.PI / 2); arc(x + w - r, y + h - r, 0); arc(x + r, y + h - r, Math.PI / 2); arc(x + r, y + r, Math.PI);
  pts.push(pts[0]);
  return pts;
};
export const box = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, p: number, color: string = L.ink, fill?: string, lw = 9) => {
  if (fill && p > 0.6) { ctx.save(); ctx.globalAlpha = c01((p - 0.6) / 0.4); ctx.fillStyle = fill; ctx.beginPath(); const P = rrectPts(x, y, w, h); ctx.moveTo(...P[0]); P.forEach((q) => ctx.lineTo(...q)); ctx.fill(); ctx.restore(); }
  line(ctx, rrectPts(x, y, w, h), p, color, lw);
};
export const arrow = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, p: number, color: string = L.blue, w = 10) => {
  line(ctx, [[x1, y1], [x2, y2]], p, color, w);
  if (p >= 0.9) { const a = Math.atan2(y2 - y1, x2 - x1); line(ctx, [[x2 - 34 * Math.cos(a - 0.5), y2 - 34 * Math.sin(a - 0.5)], [x2, y2], [x2 - 34 * Math.cos(a + 0.5), y2 - 34 * Math.sin(a + 0.5)]], 1, color, w); }
};
export const check = (ctx: CanvasRenderingContext2D, x: number, y: number, s: number, p: number) => line(ctx, [[x - s * 0.5, y], [x - s * 0.15, y + s * 0.38], [x + s * 0.55, y - s * 0.45]], p, L.green, s * 0.16);
export const cross = (ctx: CanvasRenderingContext2D, x: number, y: number, s: number, p: number) => {
  line(ctx, [[x - s / 2, y - s / 2], [x + s / 2, y + s / 2]], p * 2, L.red, s * 0.16);
  line(ctx, [[x + s / 2, y - s / 2], [x - s / 2, y + s / 2]], p * 2 - 1, L.red, s * 0.16);
};
export const circleMark = (ctx: CanvasRenderingContext2D, cx: number, cy: number, rx: number, ry: number, p: number, color: string = L.red, w = 9) => {
  const pts: [number, number][] = [];
  for (let k = 0; k <= 48; k++) { const a = -Math.PI * 0.6 + (k / 48) * Math.PI * 2.15; pts.push([cx + Math.cos(a) * rx * (1 + 0.03 * Math.sin(k)), cy + Math.sin(a) * ry]); }
  line(ctx, pts, p, color, w);
};
export const strike = (ctx: CanvasRenderingContext2D, x1: number, x2: number, y: number, p: number) => line(ctx, [[x1, y + 10], [x2, y - 12]], p, L.red, 22);
export const underline = (ctx: CanvasRenderingContext2D, x1: number, x2: number, y: number, p: number, color: string = L.blue) => line(ctx, [[x1, y], [(x1 + x2) / 2, y + 6], [x2, y - 2]], p, color, 12);
/** Filled bar growing to width w*p. */
export const bar = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, p: number, color: string) => {
  if (p <= 0) return; ctx.save(); ctx.fillStyle = color; ctx.beginPath(); (ctx as any).roundRect(x, y, Math.max(h, w * c01(p)), h, h / 2); ctx.fill(); ctx.restore();
};
/** Sticky note (rotated square) with text lines. */
export const sticky = (ctx: CanvasRenderingContext2D, x: number, y: number, s: number, rot: number, color: string, lines: string[], p: number, fs = 40) => {
  if (p <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const k = 0.8 + 0.2 * c01(p); ctx.scale(k, k); ctx.globalAlpha = c01(p * 1.5);
  ctx.fillStyle = "rgba(0,0,0,0.12)"; ctx.fillRect(-s / 2 + 8, -s / 2 + 12, s, s);
  ctx.fillStyle = color; ctx.fillRect(-s / 2, -s / 2, s, s);
  ctx.fillStyle = L.ink; ctx.font = `800 ${fs}px ${FONTB}`; ctx.textAlign = "center";
  lines.forEach((t, i) => ctx.fillText(t, 0, (i - (lines.length - 1) / 2) * fs * 1.2 + fs * 0.35));
  ctx.restore();
};
