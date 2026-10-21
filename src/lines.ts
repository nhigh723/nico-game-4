// Every line the mascot says (static strings, collected by scripts/voice-lines.mjs). The name comes from brand.ts.
import { MASCOT_NAME } from './brand';
import { PICS, type Word } from './pics';
import { BLENDS, RHYMES, SOUND_GROUPS } from './words';
/** Lines that say the mascot's name (re-clone these after a rename). */
export const NAMED = { title: `Hi! I'm ${MASCOT_NAME}. Let's hop!` };
export const NAMED_LINES = Object.values(NAMED);
const cap = (w: string) => w[0].toUpperCase() + w.slice(1);
export const WORD: Record<string, string> = Object.fromEntries(Object.keys(PICS).map(w => [w, cap(w) + '!']));
export const startsLike = (w: Word) => `Hop to the one that starts like ${w}!`;
export const rhymesWith = (w: Word) => `What rhymes with ${w}?`;
export const blendLine = (w: Word) => `Listen! ${BLENDS.find(b => b[0] === w)![1]} What is it?`;
export const L = {
  ...NAMED,
  hub: 'Which game shall we play?', locked: 'Ask a grown-up to open this one!',
  firstGo: 'Listen to the first sound. Tap the right lily pad!',
  rhymeGo: 'Rhymes sound the same at the end. Find the rhyme!',
  beatGo: 'Tap the frog once for each beat. Then tap the flower!', beatAgain: 'Let us count the beats again!',
  blendGo: 'I will say a word in little pieces. Put it together!',
  oddGo: 'Which one starts with a different sound?',
  traceGo: 'Trace the letter with your finger!', traceDone: 'You made a letter!',
  yes: 'Yes!', gotIt: 'You got it!', great: 'Great listening!', again: 'Listen again!',
  crossed: 'You crossed the pond!', bankHi: 'Welcome to Frog Bank!', bankEmpty: 'Cross the pond to bring frogs here!',
  unlockFriend: 'A new frog joined the family!', unlockFlower: 'A new flower bloomed!',
};
export function allLines(): string[] {
  const s = new Set<string>(Object.values(L)); Object.values(WORD).forEach(x => s.add(x));
  Object.values(SOUND_GROUPS).flat().forEach(w => s.add(startsLike(w))); RHYMES.flat().forEach(w => s.add(rhymesWith(w))); BLENDS.forEach(b => s.add(blendLine(b[0])));
  return [...s];
}
