// The four "choose a pad" activities. Difficulty: 2 pads at level 0, 3 at levels 1-2, 4 from level 3 (remixes stay at 4).
import type { Api } from '../kit';
import type { Word } from '../pics';
import { L, startsLike, rhymesWith, blendLine } from '../lines';
import { SOUND_GROUPS, soundOf, RHYMES, rhymeOf, BLENDS } from '../words';
import { shuffle } from '../kit';
import { choice, type Round } from './choice';
const nOpts = (lv: number) => (lv === 0 ? 2 : lv < 3 ? 3 : 4);
const ALL = Object.values(SOUND_GROUPS).flat();
function pack(ans: Word, distract: Word[], n: number): { opts: Word[]; ans: number } { const opts = shuffle([ans, ...shuffle(distract).slice(0, n - 1)]); return { opts, ans: opts.indexOf(ans) }; }
export function firstSound(api: Api, lv: number) {
  const used = new Set<string>();
  return choice(api, lv, L.firstGo, () => {
    const keys = shuffle(Object.keys(SOUND_GROUPS).filter(k => SOUND_GROUPS[k].length >= 2 && !used.has(k))); const k = keys[0] ?? 's'; used.add(k);
    const [anchor, ans] = shuffle([...SOUND_GROUPS[k]]); const d = ALL.filter(w => soundOf(w) !== k);
    return { prompt: startsLike(anchor), anchor, ...pack(ans, d, nOpts(lv)) } as Round; });
}
export function rhyme(api: Api, lv: number) {
  const fams = shuffle([...RHYMES]);
  return choice(api, lv, L.rhymeGo, (r) => {
    const fam = fams[r % fams.length]; const [target, ans] = shuffle([...fam]); const d = ALL.filter(w => !fam.includes(w) && soundOf(w) !== soundOf(target)).filter(w => !rhymeOf(w)?.includes(target));
    return { prompt: rhymesWith(target), anchor: target, ...pack(ans, d, nOpts(lv)) } as Round; });
}
export function blend(api: Api, lv: number) {
  const ws = shuffle(BLENDS.map(b => b[0]));
  return choice(api, lv, L.blendGo, (r) => { const ans = ws[r % ws.length]; const d = ['sun', 'cat', 'fish', 'ball', 'tree', 'house', ...BLENDS.map(b => b[0]).filter(w => w !== ans)] as Word[]; return { prompt: blendLine(ans), ...pack(ans, d, nOpts(lv)) } as Round; });
}
export function odd(api: Api, lv: number) {
  return choice(api, lv, L.oddGo, () => {
    const n = Math.max(3, nOpts(lv)); const k = shuffle(Object.keys(SOUND_GROUPS).filter(k => SOUND_GROUPS[k].length >= n - 1))[0]; const same = shuffle([...SOUND_GROUPS[k]]).slice(0, n - 1);
    const ans = shuffle(ALL.filter(w => soundOf(w) !== k))[0]; const opts = shuffle([...same, ans]); return { prompt: L.oddGo, opts, ans: opts.indexOf(ans), sayOpts: true } as Round; });
}
