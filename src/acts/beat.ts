// Beat Hop: the mascot says a word; tap the frog once per beat (syllable) so it hops stone to stone, then tap the flower.
// Right count: the flower blooms. Wrong count: the frog swims back and the word is said again. No fail state.
import { type Ctx, W } from '../art';
import { pic, type Word } from '../pics';
import { water, pad, frog, flower, FROG_COLS } from '../pond';
import { L, WORD } from '../lines';
import { BEATS } from '../words';
import { type Activity, type Api, type Pt, near, shuffle } from '../kit';
import { ROUNDS } from './choice';
export function beat(api: Api, level: number): Activity {
  const pool = BEATS.filter(b => b[1] <= (level === 0 ? 2 : 3)); const picks: [Word, number][] = [];
  const sh = shuffle([...pool]); for (let n = 1; n <= 3 && picks.length < ROUNDS; n++) { const b = sh.find(b => b[1] === n && !picks.includes(b)); if (b) picks.push(b); } for (const b of sh) if (picks.length < ROUNDS && !picks.includes(b)) picks.push(b); shuffle(picks);
  let r = 0, hops = 0, ft = 9, back = -1, bloom = -1, done = false, clock = 0, sayAt = 3.2, blooms = 0;
  const STONE = (i: number): [number, number] => [62 + i * 74, 560 - i * 10], FLOWER: [number, number] = [W - 38, 500];
  const fcol = FROG_COLS[(level + 3) % FROG_COLS.length];
  const cur = () => picks[Math.min(r, picks.length - 1)];
  return {
    intro: L.beatGo,
    update(dt) { clock += dt; ft += dt; if (sayAt >= 0 && clock >= sayAt) { sayAt = -1; api.say(WORD[cur()[0]]); }
      if (back >= 0) { back += dt; if (back > 1) { back = -1; hops = 0; sayAt = clock + 0.3; } }
      if (bloom >= 0) { bloom += dt; if (bloom > 1.6) { bloom = -1; blooms++; r++; hops = 0; if (r >= ROUNDS) { done = true; api.win(L.crossed); } else sayAt = clock + 0.3; } } },
    draw(c: Ctx) { const t = api.t(); water(c, t, 160); c.fillStyle = '#5fd83a'; c.fillRect(0, 770, W, 74);
      for (let i = 0; i < ROUNDS; i++) { const x = 60 + i * 90; if (i < blooms) flower(c, x, 800, 0.9, '#ff5fd2', t + i); else { c.fillStyle = 'rgba(255,255,255,0.5)'; c.beginPath(); c.arc(x, 800, 12, 0, 6.28); c.fill(); } }
      c.fillStyle = '#fff'; c.beginPath(); c.arc(W / 2, 270, 70, 0, 6.28); c.fill(); c.strokeStyle = '#ffd60a'; c.lineWidth = 6; c.stroke(); pic(c, cur()[0], W / 2, 270, 1.4, t);
      for (let i = 0; i < 3; i++) { const [x, y] = STONE(i + 1); c.fillStyle = i < hops ? '#ffd60a' : '#b9a58a'; c.beginPath(); c.ellipse(x, y + 18, 30, 14, 0, 0, 6.28); c.fill(); c.strokeStyle = 'rgba(0,0,0,0.15)'; c.lineWidth = 3; c.stroke(); }
      pad(c, STONE(0)[0], STONE(0)[1] + 20, 46, t); pad(c, FLOWER[0], FLOWER[1] + 30, 50, t + 1, hops > 0 && back < 0 && bloom < 0);
      flower(c, FLOWER[0], FLOWER[1], bloom >= 0 ? 1.2 + Math.min(1, bloom) * 0.8 : 0.8, bloom >= 0 ? '#ff5fd2' : '#c8b8d8', t);
      let [fx, fy] = STONE(Math.min(hops, 3)); fy -= 4; if (ft < 0.35 && hops > 0) { const [px, py] = STONE(Math.min(hops - 1, 3)), k = ft / 0.35; fx = px + (fx - px) * k; fy = py - 4 + (fy - py) * k - Math.sin(k * Math.PI) * 60; }
      if (back >= 0) { const [sx, sy] = STONE(0); fx = fx + (sx - fx) * Math.min(1, back); fy = sy - 4; } if (bloom >= 0) { fx = FLOWER[0] - 40; fy = FLOWER[1] + 10 - Math.max(0, Math.sin(Math.min(1, bloom * 2) * Math.PI)) * 50; }
      frog(c, fx, fy, 0.85, fcol, t, bloom >= 0, 0); },
    down(p: Pt) { if (done || back >= 0 || bloom >= 0) return;
      if (near(p, W / 2, 270, 72)) { api.sfx.tap(); api.say(WORD[cur()[0]]); return; }
      if (near(p, FLOWER[0], FLOWER[1] + 6, 44) && hops > 0) { if (hops === cur()[1]) { bloom = 0; api.sfx.cheer(); api.say([L.yes, L.gotIt, L.great][r % 3]); api.burst(FLOWER[0], FLOWER[1], 20); } else { back = 0; api.sfx.wrong(); api.say(L.beatAgain); } return; }
      const [fx, fy] = STONE(Math.min(hops, 3)); if (near(p, fx, fy, 50)) { if (hops < 3) { hops++; ft = 0; api.sfx.hop(); } else { api.sfx.boing(); } } },
    move() { /* */ }, up() { /* */ },
    next() { if (done || back >= 0 || bloom >= 0) return null; if (hops < cur()[1]) { const [x, y] = STONE(hops); return { type: 'tap', x, y }; } return { type: 'tap', x: FLOWER[0], y: FLOWER[1] + 6 }; },
    busy: () => back >= 0 || bloom >= 0 || done,
  };
}
