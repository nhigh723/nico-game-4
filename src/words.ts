// Word bank: first-sound groups, rhyme families, syllable beats and blends. Every word has a drawn picture (pics.ts).
import type { Word } from './pics';
export const SOUND_GROUPS: Record<string, Word[]> = {
  s: ['sun', 'sock', 'snake', 'star'], m: ['moon', 'mouse', 'mug'], b: ['bee', 'ball', 'bus', 'bell', 'bat', 'bun'],
  k: ['cat', 'cup', 'car', 'cake', 'key'], f: ['fish', 'fan'], t: ['tree', 'tent', 'tomato'], h: ['hat', 'house'], d: ['dog', 'dish'],
};
export const soundOf = (w: Word) => Object.keys(SOUND_GROUPS).find(k => SOUND_GROUPS[k].includes(w))!;
export const RHYMES: Word[][] = [['cat', 'hat', 'bat'], ['sun', 'bun'], ['star', 'car', 'jar'], ['bee', 'tree', 'key'], ['bell', 'shell'], ['cake', 'snake'], ['mouse', 'house'], ['moon', 'spoon'], ['dog', 'log'], ['fish', 'dish']];
export const rhymeOf = (w: Word) => RHYMES.find(r => r.includes(w));
export const BEATS: [Word, number][] = [['sun', 1], ['cat', 1], ['ball', 1], ['fish', 1], ['rainbow', 2], ['apple', 2], ['pencil', 2], ['banana', 3], ['butterfly', 3], ['tomato', 3]];
export const BLENDS: [Word, string][] = [['rainbow', 'Rain... bow.'], ['pencil', 'Pen... cil.'], ['apple', 'Ap... ple.'], ['banana', 'Ba... na... na.'], ['butterfly', 'But... ter... fly.'], ['tomato', 'To... ma... to.']];
/** Letters to trace (strokes in a 0..1 box) and the picture each one starts. */
export const LETTERS: { k: string; w: Word; strokes: [number, number][][] }[] = [
  { k: 'c', w: 'cat', strokes: [[[0.85, 0.22], [0.65, 0.04], [0.38, 0.02], [0.15, 0.18], [0.06, 0.45], [0.12, 0.74], [0.32, 0.95], [0.6, 0.98], [0.85, 0.8]]] },
  { k: 's', w: 'sun', strokes: [[[0.82, 0.15], [0.6, 0.02], [0.3, 0.04], [0.14, 0.2], [0.2, 0.38], [0.5, 0.5], [0.8, 0.62], [0.86, 0.82], [0.65, 0.98], [0.32, 0.98], [0.12, 0.85]]] },
  { k: 'm', w: 'moon', strokes: [[[0.05, 1], [0.05, 0.1], [0.28, 0.02], [0.5, 0.2], [0.5, 1]], [[0.5, 0.2], [0.72, 0.02], [0.95, 0.1], [0.95, 1]]] },
  { k: 't', w: 'tree', strokes: [[[0.5, 0], [0.5, 1]], [[0.15, 0.3], [0.85, 0.3]]] },
  { k: 'b', w: 'ball', strokes: [[[0.15, 0], [0.15, 1]], [[0.15, 0.55], [0.4, 0.42], [0.7, 0.48], [0.82, 0.72], [0.7, 0.95], [0.4, 1], [0.15, 0.92]]] },
  { k: 'f', w: 'fish', strokes: [[[0.8, 0.08], [0.6, 0], [0.42, 0.1], [0.38, 0.3], [0.38, 1]], [[0.12, 0.42], [0.7, 0.42]]] },
];
