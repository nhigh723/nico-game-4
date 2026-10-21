// Pond scenery shared by every activity: water, lily pads, the frog (with hop), blooming flowers.
import { type Ctx, W } from './art';
export const FROG_COLS = ['#3ddc4a', '#ff5fd2', '#1fb6ff', '#ffb000', '#9b5cff', '#ff3b6b', '#00d1b2', '#a6e22e'];
export function water(c: Ctx, t: number, top = 180) {
  const g = c.createLinearGradient(0, top, 0, 844); g.addColorStop(0, '#22d3ee'); g.addColorStop(1, '#1e8fff'); c.fillStyle = g; c.fillRect(0, top, W, 844 - top);
  c.strokeStyle = 'rgba(255,255,255,0.35)'; c.lineWidth = 3; for (let i = 0; i < 9; i++) { const y = top + 40 + i * 70, x = ((i * 97 + t * 18) % (W + 120)) - 60; c.beginPath(); c.ellipse(x, y, 30, 6, 0, 0, Math.PI * 2); c.stroke(); }
}
export function pad(c: Ctx, x: number, y: number, r: number, t: number, glow = false, col = '#5fe05a') {
  const b = Math.sin(t * 2 + x * 0.05) * 2; c.save(); c.translate(x, y + b);
  if (glow) { c.fillStyle = 'rgba(255,255,140,0.55)'; c.beginPath(); c.ellipse(0, 0, r * 1.25, r * 0.85, 0, 0, 6.283); c.fill(); }
  c.fillStyle = 'rgba(0,40,80,0.25)'; c.beginPath(); c.ellipse(0, 8, r, r * 0.62, 0, 0, 6.283); c.fill();
  c.fillStyle = col; c.beginPath(); c.moveTo(0, 0); c.ellipse(0, 0, r, r * 0.62, 0, 0.25, 6.03); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(0,90,0,0.25)'; c.lineWidth = 2; for (let a = 0.6; a < 6; a += 0.9) { c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a) * r * 0.85, Math.sin(a) * r * 0.53); c.stroke(); }
  c.restore();
}
export function flower(c: Ctx, x: number, y: number, s: number, col: string, t: number) {
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(Math.sin(t) * 0.1);
  for (let i = 0; i < 8; i++) { c.rotate(0.785); c.fillStyle = col; c.beginPath(); c.ellipse(0, -18, 9, 16, 0, 0, 6.283); c.fill(); }
  c.fillStyle = '#ffd60a'; c.beginPath(); c.arc(0, 0, 11, 0, 6.283); c.fill(); c.restore();
}
/** A round friendly frog. jump = 0..1 hop arc progress (squash at ends), happy = big smile, croak = throat puff. */
export function frog(c: Ctx, x: number, y: number, s: number, col: string, t: number, happy = false, croak = 0, flip = false) {
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
  const br = Math.sin(t * 3) * 1.5; c.fillStyle = 'rgba(0,40,80,0.2)'; c.beginPath(); c.ellipse(0, 26, 34, 8, 0, 0, 6.283); c.fill();
  c.fillStyle = col; c.beginPath(); c.ellipse(-24, 20, 14, 8, 0, 0, 6.283); c.ellipse(24, 20, 14, 8, 0, 0, 6.283); c.fill();
  c.beginPath(); c.ellipse(0, 4 - br, 32, 26 + br, 0, 0, 6.283); c.fill();
  if (croak > 0) { c.fillStyle = '#ffe6a8'; c.beginPath(); c.ellipse(0, 18, 16 * (0.6 + croak), 10 * (0.6 + croak), 0, 0, 6.283); c.fill(); }
  else { c.fillStyle = 'rgba(255,255,255,0.45)'; c.beginPath(); c.ellipse(0, 14, 18, 10, 0, 0, 6.283); c.fill(); }
  for (const sx of [-14, 14]) { c.fillStyle = col; c.beginPath(); c.arc(sx, -20, 12, 0, 6.283); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(sx, -21, 8, 0, 6.283); c.fill(); c.fillStyle = '#1a1a2a'; c.beginPath(); c.arc(sx + 1, -20, 4.5, 0, 6.283); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(sx + 2.5, -22, 1.6, 0, 6.283); c.fill(); }
  c.strokeStyle = '#1a3a1a'; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.arc(0, 0, happy ? 14 : 10, 0.25, Math.PI - 0.25); c.stroke();
  c.fillStyle = 'rgba(255,120,150,0.45)'; c.beginPath(); c.arc(-20, 4, 5, 0, 6.283); c.arc(20, 4, 5, 0, 6.283); c.fill();
  c.restore();
}
