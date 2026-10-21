# Fizby's Hop Pond (game #4)
Ages 3-6 listening game (sounds inside words, the step before reading): First Sound Hop, Rhyme Hop, Beat Hop, Sound Blender, Odd Frog Out and Letter Trace, plus Frog Bank, which fills with frogs and flowers. No text: Fizby speaks every instruction (cloned voice, device voice fallback), drawn hand demos, single-tap Back, no ads or tracking. Concept: docs/CONCEPT.md.
Brand lives in `src/brand.ts` (MASCOT_NAME, GAME_TITLE, CLUB_NAME); lines naming the mascot are in `NAMED` in `src/lines.ts`. App id `com.nickhigh.game4`.
- `npm run build`, `npx vite preview --port 4182`
- Tests: `node tests/play-all.mjs`, `node tests/monkey.mjs`, `URL=... node tests/offline-check.mjs`, `node tests/shots.mjs`, `node tests/store-shots.mjs`, `node tests/live-check.mjs`
- Voice: `node scripts/voice-lines.mjs`, then `python3 scripts/pad-voice.py prep voice/todo.json`, `scripts/gen_takes.py voice/pad.json voice/padtakes 8` (qvenv), `/workspace/tts/qclone/gate.py voice/pad.json voice/padtakes` (pvenv), `scripts/pad-voice.py install voice/todo.json` (pvenv). Every line is generated inside a carrier phrase, gated at WER 0 and sim >= 0.84 on the padded clip, cut at the real pauses, and must pass the objective clip checks in `scripts/clipcheck.py` (padding, clean edges, no leftover carrier, heard exactly alone, loudness). Lines that fail stay on the device voice.
- Deploy: `./scripts/deploy.sh` → https://nhigh723.github.io/nico-game-4/
- iOS: Capacitor 7, StoreKit 2 (ids com.nickhigh.game4.*, see store/products.json), codemagic.yaml. App Store steps: docs/SUBMIT.md.
