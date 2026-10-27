#!/bin/bash
# Waits for voice generation, then gate + install (carrier method + clip checks), build, commit, push, deploy.
cd /workspace/nico-game-4
while pgrep -f "gen_takes.py voice/pad.json voice/padtakes" >/dev/null; do sleep 60; done
/workspace/tts/pvenv/bin/python /workspace/tts/qclone/gate.py voice/pad.json voice/padtakes > voice/gate-pad.log 2>&1
/workspace/tts/pvenv/bin/python scripts/pad-voice.py install voice/all.json > voice/pad-install.log 2>&1
npm run build > /tmp/g4-build.log 2>&1
git add -A && git -c user.name="Nick High" -c user.email="nick@local" commit -qm "Cloned voice (carrier method + clip checks)" && git push -q
./scripts/deploy.sh > /tmp/g4-deploy.log 2>&1
touch /tmp/g4-voice-done
