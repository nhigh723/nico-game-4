// Shared "hop to the right lily pad" activity: First Sound Hop, Rhyme Hop, Sound Blender and Odd Frog Out.
// Each round: a spoken prompt (optionally with a prompt picture), 2-4 picture pads. Right pad: the frog hops on, the pad blooms.
// Wrong pad: soft wobble, the word is spoken, "Listen again!", prompt repeats. No fail state. 4 rounds cross the pond.
import { type Ctx, W } from '../art';
import { pic, type Word } from '../pics';
import { water, pad, frog, flower, FROG_COLS } from '../pond';
import { L, WORD } from '../lines';
import { type Activity, type Api, type Pt, near } from '../kit';
export type Round = { prompt: string; anchor?: Word; opts: Word[]; ans: number; sayOpts?: boolean };
export const ROUNDS = 4;
const FLOWER = ['#ff5fd2', '#ff9f1c', '#9b5cff', '#ff3b6b'];
export function choice(api: Api, level: number, intro: string, gen: (r: number) => Round): Activity {
  let r = 0, R = gen(0), t0 = 0, hop: { i: number; t: number } | null = null, wob = [0, 0, 0, 0], done = false, sayQ: [number, string][] = [], clock = 0, blooms = 0;
  const fcol = FROG_COLS[level % FROG_COLS.length];
  const padXY = (i: number) => { const n = R.opts.length, gap = n > 3 ? 92 : 120; return [W / 2 + (i - (n - 1) / 2) * gap, 470 + (n > 3 && i % 2 ? 40 : 0)] as [number, number]; };
  const startRound = (first: boolean) => { t0 = clock; sayQ = []; const d = first ? 3.2 : 0.4; sayQ.push([clock + d, R.prompt]); if (R.sayOpts) R.opts.forEach((w, i) => sayQ.push([clock + d + 2.4 + i * 1.1, WORD[w]])); };
  startRound(true);
  return {
    intro,
    update(dt) { clock += dt; wob = wob.map(v => Math.max(0, v - dt)); while (sayQ.length && sayQ[0][0] <= clock) api.say(sayQ.shift()![1]);
      if (hop) { hop.t += dt; if (hop.t > 1.3) { hop = null; blooms++; r++; if (r >= ROUNDS) { done = true; api.win(L.crossed); } else { R = gen(r); startRound(false); } } } },
    draw(c: Ctx) { const t = api.t(); water(c, t, 160);
      // progress: flowers along the bottom bank
      c.fillStyle = '#5fd83a'; c.fillRect(0, 770, W, 74); for (let i = 0; i < ROUNDS; i++) { const x = 60 + i * 90; if (i < blooms) flower(c, x, 800, 0.9, FLOWER[i], t + i); else { c.fillStyle = 'rgba(255,255,255,0.5)'; c.beginPath(); c.arc(x, 800, 12, 0, 6.28); c.fill(); } }
      if (R.anchor) { c.fillStyle = '#fff'; c.beginPath(); c.arc(W / 2, 250, 58, 0, 6.28); c.fill(); c.strokeStyle = '#ffd60a'; c.lineWidth = 6; c.stroke(); pic(c, R.anchor, W / 2, 250, 1.15, t); }
      else { // an ear: listen!
        c.fillStyle = '#fff'; c.beginPath(); c.arc(W / 2, 250, 52, 0, 6.28); c.fill(); c.fillStyle = '#ffb3a0'; c.beginPath(); c.ellipse(W / 2, 250, 22, 32, 0, 0, 6.28); c.fill(); c.strokeStyle = '#e08070'; c.lineWidth = 5; c.beginPath(); c.arc(W / 2 + 2, 244, 11, 3.6, 7.5); c.stroke();
        const k = (clock * 1.5) % 1; c.strokeStyle = `rgba(31,182,255,${1 - k})`; c.lineWidth = 4; for (const s of [-1, 1]) { c.beginPath(); c.arc(W / 2, 250, 60 + k * 30, s > 0 ? -0.6 : Math.PI - 0.6, s > 0 ? 0.6 : Math.PI + 0.6); c.stroke(); } }
      R.opts.forEach((w, i) => { const [x, y] = padXY(i); const sx = wob[i] > 0 ? Math.sin(wob[i] * 40) * 7 : 0; const bloomed = hop && hop.i === i && hop.t > 0.7;
        pad(c, x + sx, y, 52, t + i, !hop && R.sayOpts && sayQ.length > 0 && Math.abs(sayQ[0][0] - 1.1 - clock) < 0.6 && R.opts.length - sayQ.length === i);
        if (bloomed) flower(c, x, y - 4, 1.4, FLOWER[r % 4], t); else pic(c, w, x + sx, y - 14, 0.95, t + i); });
      // frog: on the start pad, or hopping to the chosen pad
      const home: [number, number] = [W / 2, 680]; pad(c, home[0], home[1] + 20, 56, t, false, '#4cc94a'); let fx = home[0], fy = home[1];
      if (hop) { const [px, py] = padXY(hop.i), k = Math.min(1, hop.t / 0.6), back = Math.max(0, Math.min(1, (hop.t - 0.8) / 0.45)); const kk = k - back; fx = home[0] + (px - home[0]) * kk; fy = home[1] + (py - 20 - home[1]) * kk - Math.sin(kk * Math.PI) * 90 * (back ? 0.6 : 1); }
      frog(c, fx, fy, 1.1, fcol, t, !!hop, 0);
    },
    down(p: Pt) { if (hop || done) return; if (near(p, W / 2, 250, 60)) { api.sfx.tap(); api.say(R.prompt); return; }
      const i = R.opts.findIndex((_, i) => { const [x, y] = padXY(i); return near(p, x, y - 10, 58); }); if (i < 0) return;
      if (i === R.ans) { api.sfx.hop(); hop = { i, t: 0 }; sayQ = []; api.say([L.yes, L.gotIt, L.great][r % 3]); setTimeout(() => api.sfx.snap(), 600); const [x, y] = padXY(i); setTimeout(() => api.burst(x, y, 16), 650); }
      else { wob[i] = 0.5; api.sfx.wrong(); api.say(WORD[R.opts[i]]); sayQ = [[clock + 1.2, L.again], [clock + 2.4, R.prompt]]; } },
    move() { /* tap game */ }, up() { /* */ },
    next() { if (hop || done) return null; if (sayQ.length && clock - t0 < 1) return { type: 'wait', ms: 300 }; const [x, y] = padXY(R.ans); return { type: 'tap', x, y: y - 10 }; },
    busy: () => !!hop || done,
  };
}
