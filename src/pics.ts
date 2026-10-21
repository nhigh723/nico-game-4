// Picture words, all drawn in code (original art). Each picture fits a ~70 px box centred on (0,0).
import type { Ctx } from './art';
const P = Math.PI * 2;
const circ = (c: Ctx, x: number, y: number, r: number, col: string) => { c.fillStyle = col; c.beginPath(); c.arc(x, y, r, 0, P); c.fill(); };
const ell = (c: Ctx, x: number, y: number, rx: number, ry: number, col: string, rot = 0) => { c.fillStyle = col; c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, P); c.fill(); };
const poly = (c: Ctx, pts: number[], col: string) => { c.fillStyle = col; c.beginPath(); for (let i = 0; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]); c.closePath(); c.fill(); };
const box = (c: Ctx, x: number, y: number, w: number, h: number, col: string) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
const eyes = (c: Ctx, x: number, y: number, d = 8, r = 3) => { circ(c, x - d, y, r + 2, '#fff'); circ(c, x + d, y, r + 2, '#fff'); circ(c, x - d, y, r, '#222'); circ(c, x + d, y, r, '#222'); };
const line = (c: Ctx, col: string, w: number, ...pts: number[]) => { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); for (let i = 0; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]); c.stroke(); };
const star = (c: Ctx, x: number, y: number, r: number, col: string) => { c.fillStyle = col; c.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.45 : r; c.lineTo(x + Math.cos(-1.571 + i * 0.628) * rr, y + Math.sin(-1.571 + i * 0.628) * rr); } c.fill(); };
export const PICS: Record<string, (c: Ctx, t: number) => void> = {
  sun: (c, t) => { c.save(); c.rotate(t * 0.5); for (let i = 0; i < 10; i++) { c.rotate(0.628); poly(c, [-6, -24, 6, -24, 0, -36], '#ffb000'); } c.restore(); circ(c, 0, 0, 22, '#ffd60a'); eyes(c, 0, -3, 7, 2); line(c, '#c47a00', 3, -7, 7, 0, 11, 7, 7); },
  star: (c) => { star(c, 0, 2, 34, '#ffd60a'); eyes(c, 0, 2, 7, 2); },
  snake: (c, t) => { line(c, '#3ddc4a', 14, -30, 18, -15, 6 + Math.sin(t * 3) * 3, 0, 18, 15, 6, 26, -10); circ(c, 28, -14, 11, '#3ddc4a'); circ(c, 31, -17, 3, '#222'); line(c, '#ff3b6b', 2, 38, -12, 44, -14); },
  sock: (c) => { poly(c, [-10, -32, 12, -32, 12, 10, 26, 18, 26, 32, -6, 32, -14, 22, -10, 8], '#ff5fd2'); box(c, -10, -32, 22, 8, '#fff'); box(c, -9, -6, 21, 6, '#fff'); },
  moon: (c) => { circ(c, 0, 0, 30, '#ffe680'); circ(c, 14, -8, 26, '#2a3a7a'); circ(c, -14, 6, 3, '#f0c040'); },
  mouse: (c) => { ell(c, 0, 8, 28, 20, '#a6a6b8'); circ(c, -16, -12, 11, '#a6a6b8'); circ(c, 16, -12, 11, '#a6a6b8'); circ(c, -16, -12, 6, '#ffb3c8'); circ(c, 16, -12, 6, '#ffb3c8'); eyes(c, 0, 4, 9, 2.5); circ(c, 0, 14, 4, '#ff5f8a'); line(c, '#a6a6b8', 3, 26, 16, 38, 10); },
  mug: (c) => { box(c, -22, -20, 36, 44, '#1fb6ff'); c.strokeStyle = '#1fb6ff'; c.lineWidth = 7; c.beginPath(); c.arc(16, 2, 11, -1.4, 1.4); c.stroke(); line(c, '#fff', 3, -12, -30, -14, -38); line(c, '#fff', 3, 0, -30, 2, -38); },
  bee: (c, t) => { ell(c, -6, -22 + Math.sin(t * 20) * 2, 12, 9, 'rgba(220,240,255,0.9)'); ell(c, 8, -22 - Math.sin(t * 20) * 2, 12, 9, 'rgba(220,240,255,0.9)'); ell(c, 0, 4, 28, 20, '#ffd60a'); box(c, -8, -14, 7, 36, '#222'); box(c, 8, -14, 7, 36, '#222'); circ(c, -20, 0, 3, '#222'); },
  ball: (c) => { circ(c, 0, 0, 30, '#ff3b6b'); c.save(); c.beginPath(); c.arc(0, 0, 30, 0, P); c.clip(); box(c, -30, -6, 60, 12, '#fff'); c.restore(); circ(c, -10, -14, 6, 'rgba(255,255,255,0.5)'); },
  bus: (c) => { c.fillStyle = '#ffd60a'; c.beginPath(); c.roundRect(-36, -24, 72, 40, 8); c.fill(); for (let i = 0; i < 3; i++) box(c, -28 + i * 20, -16, 14, 12, '#bfefff'); circ(c, -20, 18, 8, '#333'); circ(c, 20, 18, 8, '#333'); },
  bell: (c) => { poly(c, [-6, -30, 6, -30, 22, 0, 28, 18, -28, 18, -22, 0], '#ffc400'); circ(c, 0, 24, 7, '#e09000'); circ(c, 0, -32, 5, '#e09000'); },
  cat: (c) => { circ(c, 0, 4, 26, '#ff9f1c'); poly(c, [-24, -8, -20, -34, -6, -20], '#ff9f1c'); poly(c, [24, -8, 20, -34, 6, -20], '#ff9f1c'); eyes(c, 0, 0, 9, 3); poly(c, [-4, 10, 4, 10, 0, 14], '#ff5f8a'); line(c, '#7a4a10', 2, -26, 12, -10, 14); line(c, '#7a4a10', 2, 26, 12, 10, 14); },
  cup: (c) => { poly(c, [-24, -22, 24, -22, 16, 26, -16, 26], '#3ddc4a'); box(c, -24, -26, 48, 6, '#2bb83a'); line(c, '#ff3b6b', 4, 6, -24, 14, -40); },
  car: (c) => { c.fillStyle = '#ff3b6b'; c.beginPath(); c.roundRect(-38, -6, 76, 24, 8); c.fill(); poly(c, [-22, -6, -12, -26, 14, -26, 24, -6], '#ff3b6b'); poly(c, [-16, -8, -9, -21, 0, -21, 0, -8], '#bfefff'); poly(c, [4, -8, 4, -21, 12, -21, 18, -8], '#bfefff'); circ(c, -20, 20, 9, '#333'); circ(c, 20, 20, 9, '#333'); },
  cake: (c) => { box(c, -30, -4, 60, 30, '#ff9ad5'); box(c, -30, -10, 60, 10, '#fff'); for (let i = 0; i < 3; i++) { box(c, -14 + i * 12, -30, 5, 20, '#1fb6ff'); ell(c, -11.5 + i * 12, -34, 3, 5, '#ff9f1c'); } },
  fish: (c, t) => { const w = Math.sin(t * 6) * 4; poly(c, [20, 0, 38, -16 + w, 38, 16 + w], '#ff9f1c'); ell(c, -2, 0, 28, 18, '#1fb6ff'); circ(c, -16, -4, 5, '#fff'); circ(c, -16, -4, 2.5, '#222'); },
  fan: (c, t) => { box(c, -3, 4, 6, 30, '#888'); box(c, -16, 30, 32, 6, '#888'); c.save(); c.translate(0, -6); c.rotate(t * 8); for (let i = 0; i < 3; i++) { c.rotate(2.094); ell(c, 0, -14, 9, 15, '#1fb6ff'); } c.restore(); circ(c, 0, -6, 5, '#555'); },
  tree: (c) => { box(c, -6, 6, 12, 28, '#a0612a'); circ(c, 0, -10, 24, '#3ddc4a'); circ(c, -16, 2, 14, '#2bc23a'); circ(c, 16, 2, 14, '#2bc23a'); circ(c, 8, -16, 4, '#ff3b6b'); circ(c, -10, -4, 4, '#ff3b6b'); },
  tent: (c) => { poly(c, [0, -32, 34, 26, -34, 26], '#ff9f1c'); poly(c, [0, -10, 12, 26, -12, 26], '#7a3a00'); line(c, '#7a3a00', 3, 0, -32, 0, -40); poly(c, [0, -40, 12, -36, 0, -32], '#ff3b6b'); },
  hat: (c) => { box(c, -18, -26, 36, 36, '#9b5cff'); box(c, -32, 8, 64, 8, '#9b5cff'); box(c, -18, -4, 36, 7, '#ffd60a'); },
  bat: (c, t) => { const f = Math.sin(t * 8) * 6; poly(c, [-4, -4, -36, -14 + f, -28, 0, -34, 10 + f, -6, 8], '#5a3a8a'); poly(c, [4, -4, 36, -14 + f, 28, 0, 34, 10 + f, 6, 8], '#5a3a8a'); circ(c, 0, 0, 12, '#5a3a8a'); poly(c, [-9, -8, -6, -18, -2, -9], '#5a3a8a'); poly(c, [9, -8, 6, -18, 2, -9], '#5a3a8a'); eyes(c, 0, -1, 4, 1.5); },
  bun: (c) => { ell(c, 0, 4, 32, 22, '#e8a84a'); ell(c, 0, -2, 28, 16, '#f6c46a'); for (const [x, y] of [[-10, -6], [4, -10], [12, 0], [-2, 2]]) ell(c, x, y, 2.5, 1.5, '#fff6d0'); },
  jar: (c) => { c.fillStyle = 'rgba(190,235,255,0.95)'; c.beginPath(); c.roundRect(-22, -20, 44, 50, 10); c.fill(); box(c, -18, -30, 36, 10, '#ff3b6b'); box(c, -22, 4, 44, 26, '#ff9f1c'); },
  key: (c) => { c.strokeStyle = '#ffc400'; c.lineWidth = 9; c.beginPath(); c.arc(-16, 0, 13, 0, P); c.stroke(); line(c, '#ffc400', 9, -2, 0, 34, 0); line(c, '#ffc400', 7, 26, 0, 26, 12); line(c, '#ffc400', 7, 16, 0, 16, 10); },
  shell: (c) => { c.fillStyle = '#ff9ad5'; c.beginPath(); c.arc(0, 14, 34, Math.PI, 0); c.closePath(); c.fill(); for (let i = -2; i <= 2; i++) line(c, '#e26bb0', 3, 0, 14, i * 15, -16 + Math.abs(i) * 6); box(c, -8, 12, 16, 10, '#ff9ad5'); },
  house: (c) => { box(c, -26, -6, 52, 38, '#ffd60a'); poly(c, [-34, -4, 0, -34, 34, -4], '#ff3b6b'); box(c, -6, 12, 12, 20, '#a0612a'); box(c, 10, 2, 10, 10, '#bfefff'); },
  spoon: (c) => { ell(c, -12, -12, 14, 18, '#c8d0e0', -0.8); line(c, '#c8d0e0', 7, -4, -4, 26, 28); },
  dog: (c) => { circ(c, 0, 2, 24, '#c98a4b'); ell(c, -22, -2, 9, 18, '#7a4a20', 0.3); ell(c, 22, -2, 9, 18, '#7a4a20', -0.3); eyes(c, 0, -4, 8, 3); ell(c, 0, 10, 7, 5, '#222'); line(c, '#ff5f8a', 5, 0, 16, 0, 22); },
  log: (c) => { box(c, -32, -12, 60, 24, '#a0612a'); ell(c, 28, 0, 8, 12, '#e8b878'); ell(c, 28, 0, 4, 6, '#c98a4b'); line(c, '#7a4a20', 2, -24, -4, 10, -4); poly(c, [-10, -12, -6, -22, -2, -12], '#3ddc4a'); },
  dish: (c) => { ell(c, 0, 8, 36, 12, '#fff'); ell(c, 0, 6, 26, 8, '#e8f4ff'); ell(c, -6, 2, 8, 5, '#ff3b6b'); ell(c, 8, 2, 7, 5, '#3ddc4a'); },
  rainbow: (c) => { ['#ff3b6b', '#ff9f1c', '#ffd60a', '#3ddc4a', '#1fb6ff', '#9b5cff'].forEach((col, i) => { c.strokeStyle = col; c.lineWidth = 6; c.beginPath(); c.arc(0, 18, 36 - i * 6, Math.PI, 0); c.stroke(); }); circ(c, -32, 20, 9, '#fff'); circ(c, 32, 20, 9, '#fff'); },
  apple: (c) => { circ(c, -9, 6, 20, '#ff3b4b'); circ(c, 9, 6, 20, '#ff3b4b'); line(c, '#7a4a20', 4, 0, -12, 3, -24); ell(c, 12, -20, 10, 5, '#3ddc4a', -0.4); },
  pencil: (c) => { c.save(); c.rotate(-0.6); box(c, -30, -8, 48, 16, '#ffd60a'); box(c, -38, -8, 10, 16, '#ff9ad5'); poly(c, [18, -8, 34, 0, 18, 8], '#f6d6a8'); poly(c, [28, -3, 34, 0, 28, 3], '#333'); c.restore(); },
  banana: (c) => { c.fillStyle = '#ffd60a'; c.beginPath(); c.arc(0, -16, 38, 0.5, 2.6); c.arc(0, -26, 34, 2.5, 0.6, true); c.fill(); circ(c, 32, 2, 3, '#7a4a20'); },
  butterfly: (c, t) => { const f = 0.75 + Math.abs(Math.sin(t * 4)) * 0.25; for (const s of [-1, 1]) { c.save(); c.scale(s * f, 1); ell(c, 16, -12, 18, 16, '#ff5fd2'); ell(c, 14, 14, 13, 11, '#9b5cff'); circ(c, 16, -12, 6, '#ffd60a'); c.restore(); } ell(c, 0, 0, 4, 22, '#333'); line(c, '#333', 2, 0, -20, -8, -32); line(c, '#333', 2, 0, -20, 8, -32); },
  tomato: (c) => { circ(c, 0, 6, 28, '#ff3b2b'); poly(c, [0, -20, -14, -26, -6, -16, -16, -12, 0, -14, 16, -12, 6, -16, 14, -26], '#3ddc4a'); circ(c, -10, -2, 5, 'rgba(255,255,255,0.4)'); },
};
export type Word = keyof typeof PICS;
export function pic(c: Ctx, w: string, x: number, y: number, s: number, t: number) { const f = PICS[w]; if (!f) return; c.save(); c.translate(x, y); c.scale(s, s); f(c, t); c.restore(); }
