// Letter Trace (ages 5-6): a big letter shape made of glowing dots; drag along it in order (a frog trail). When every stroke
// is traced, the picture that starts with it pops out and is spoken. Letters are shapes to trace, never text to read.
import { type Ctx, W } from '../art';
import { pic } from '../pics';
import { water, frog, flower } from '../pond';
import { L, WORD } from '../lines';
import { LETTERS } from '../words';
import { type Activity, type Api, type Pt, near } from '../kit';
const BX = 85, BY = 250, BW = 220, BH = 300, PER = 2;
export function trace(api: Api, level: number): Activity {
  const set = Array.from({ length: PER }, (_, i) => LETTERS[(level * PER + i) % LETTERS.length]); let li = 0, si = 0, di = 0, tracing = false, show = -1, done = false, fin = { x: 0, y: 0 };
  const dots = (s: [number, number][]) => { const out: [number, number][] = []; for (let i = 0; i < s.length - 1; i++) { const [ax, ay] = s[i], [bx, by] = s[i + 1]; const len = Math.hypot((bx - ax) * BW, (by - ay) * BH), n = Math.max(1, Math.round(len / 26)); for (let k = 0; k < n; k++) out.push([BX + (ax + (bx - ax) * k / n) * BW, BY + (ay + (by - ay) * k / n) * BH]); } const l = s[s.length - 1]; out.push([BX + l[0] * BW, BY + l[1] * BH]); return out; };
  let D = set.map(l => l.strokes.map(dots));
  const step = (p: Pt) => { const S = D[li][si]; while (di < S.length && near(p, S[di][0], S[di][1], 36)) { di++; if (di % 3 === 0) api.sfx.pick(); }
    if (di >= S.length) { si++; di = 0; tracing = false; api.sfx.snap(); if (si >= D[li].length) { show = 0; api.burst(W / 2, BY + BH / 2, 30); api.say(WORD[set[li].w]); } } };
  return {
    intro: L.traceGo,
    update(dt) { if (show >= 0) { show += dt; if (show > 2.2) { show = -1; li++; si = 0; di = 0; if (li >= set.length) { done = true; li = set.length - 1; si = D[li].length; api.win(L.traceDone); } } } },
    draw(c: Ctx) { const t = api.t(); water(c, t, 160); c.fillStyle = 'rgba(255,255,255,0.85)'; c.beginPath(); c.roundRect(BX - 40, BY - 40, BW + 80, BH + 80, 40); c.fill();
      const Ls = D[li]; Ls.forEach((S, s) => { c.strokeStyle = 'rgba(155,92,255,0.18)'; c.lineWidth = 40; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); S.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke();
        S.forEach(([x, y], i) => { const lit = s < si || (s === si && i < di); c.fillStyle = lit ? '#3ddc4a' : s === si && i === di ? '#ff3b6b' : '#c9b8ff'; c.beginPath(); c.arc(x, y, lit ? 11 : s === si && i === di ? 12 + Math.sin(t * 8) * 3 : 8, 0, 6.28); c.fill(); });
        if (s === si && di === 0 && show < 0) { const [x0, y0] = S[0], [x1, y1] = S[Math.min(2, S.length - 1)]; c.strokeStyle = '#ff3b6b'; c.lineWidth = 5; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); } });
      if (show >= 0) { const k = Math.min(1, show * 2); c.fillStyle = `rgba(255,255,255,${0.8 * k})`; c.beginPath(); c.arc(W / 2, BY + BH / 2, 110 * k, 0, 6.28); c.fill(); pic(c, set[li].w, W / 2, BY + BH / 2, 2.2 * k, t); }
      for (let i = 0; i < set.length; i++) if (i < li || (i === li && show >= 0) || done) flower(c, 60 + i * 70, 720, 0.9, '#ff9f1c', t + i);
      frog(c, tracing ? fin.x : W - 70, tracing ? fin.y - 40 : 700, tracing ? 0.5 : 0.9, '#3ddc4a', t, show >= 0); },
    down(p: Pt) { if (show >= 0 || done) return; const S = D[li][si]; if (S && near(p, S[di][0], S[di][1], 40)) { tracing = true; fin = p; step(p); } },
    move(p: Pt) { if (!tracing) return; fin = p; step(p); },
    up() { tracing = false; },
    next() { if (show >= 0 || done) return null; const S = D[li][si]; const P = S.slice(di).map(([x, y]) => [x, y] as [number, number]); if (P.length < 2) P.unshift([P[0][0] - 1, P[0][1]]); return { type: 'drag', path: P }; },
    busy: () => show >= 0 || done,
  };
}
