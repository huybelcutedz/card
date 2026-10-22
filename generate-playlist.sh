#!/bin/bash
# ── Generate audio/playlist.json from all .mp3 files in audio/ ──
# Run this script whenever you add/remove songs in the audio/ folder,
# then commit and push. The music player reads this JSON automatically.

DIR="$(cd "$(dirname "$0")" && pwd)"
AUDIO_DIR="$DIR/audio"
OUT="$AUDIO_DIR/playlist.json"

echo "[" > "$OUT"

first=true
for f in "$AUDIO_DIR"/*.mp3; do
    [ -f "$f" ] || continue

    filename="$(basename "$f")"
    # Title = filename without .mp3 extension
    title="${filename%.mp3}"

    if [ "$first" = true ]; then
        first=false
    else
        echo "," >> "$OUT"
    fi

    printf '  { "src": "audio/%s", "title": "%s" }' "$filename" "$title" >> "$OUT"
done

echo "" >> "$OUT"
echo "]" >> "$OUT"

echo "✅ Generated $OUT with $(grep -c '"src"' "$OUT") track(s)"

