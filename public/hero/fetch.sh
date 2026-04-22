#!/usr/bin/env bash
# Fetch 8 hero background photos from Pollinations.ai (free, no auth).
# Endpoint: https://image.pollinations.ai/prompt/{url_encoded_prompt}?width=1920&height=1080&nologo=true&enhance=true&model=flux

set -u

DIR="/Users/gtrush/Downloads/ryskex-website/07-build/public/hero"
cd "$DIR" || exit 1

BASE="https://image.pollinations.ai/prompt"
QS="width=1920&height=1080&nologo=true&enhance=true&model=flux"

# Map of filename -> raw prompt (line-delimited, separator is '|||')
IMAGES=(
  "01-atrium.jpg|||Massive institutional trading floor atrium at Lloyd's of London, Richard Rogers exposed steel architecture, cathedral-like interior, warm moody lighting at dusk, deep navy and cobalt blue tones, cinematic wide shot, architectural photography, Film grain, editorial style, no people"
  "02-data-room.jpg|||Dimly lit high-end server data room with blue and green LED accents glowing in darkness, infinite rows of glass server racks receding into depth, luxury institutional fintech aesthetic, deep navy tones, photorealistic cinematic lighting, no text, no logos"
  "03-sky-clouds.jpg|||Deep space dark blue sky with subtle emerald green aurora borealis, swirling nebula patterns, cinematic cosmic photography, dark cobalt gradient, award winning landscape, ethereal and institutional feeling"
  "04-ocean-horizon.jpg|||Aerial view of a vast ocean at twilight, deep navy blue water with subtle green phosphorescence, horizon line, minimal editorial composition, premium luxury financial brand aesthetic, moody cinematic"
  "05-geometric-arch.jpg|||Modernist architecture viewed from below looking up at a vaulted ceiling with geometric panels, dark navy and gold tones, symmetric composition, editorial architectural photography, Brutalist minimalism"
  "06-wind-tunnel.jpg|||Abstract blue particle tunnel with depth, cobalt and emerald green energy streams flowing into a vanishing point, cinematic 3D render aesthetic, luxurious deep space, no text"
  "07-circuit-map.jpg|||Abstract top-down circuit board in deep navy with glowing cobalt blue and emerald green traces, macro photography, high detail tech aesthetic, dark background, no text"
  "08-marble-slab.jpg|||Close-up of dark navy-blue marble with subtle gold and green veining, luxurious institutional surface texture, museum quality photography, shallow depth of field"
)

urlencode() {
  # POSIX-ish URL encoder via jq if available, else python3
  if command -v jq >/dev/null 2>&1; then
    printf '%s' "$1" | jq -sRr @uri
  else
    python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.stdin.read()))' <<< "$1"
  fi
}

fetch_one() {
  local fname="$1" prompt="$2"
  local enc url
  enc="$(urlencode "$prompt")"
  url="${BASE}/${enc}?${QS}"
  echo ">>> [$fname]"
  echo "    URL: ${url:0:120}..."
  # Pollinations can take 20-60s to generate. Allow up to 180s.
  curl -fL --max-time 180 --retry 0 -A "Mozilla/5.0" -o "$fname" "$url"
  local rc=$?
  if [ $rc -ne 0 ]; then
    echo "    first attempt failed (rc=$rc), retrying once..."
    sleep 2
    curl -fL --max-time 180 --retry 0 -A "Mozilla/5.0" -o "$fname" "$url"
    rc=$?
  fi
  if [ $rc -eq 0 ]; then
    local size
    size=$(stat -f%z "$fname" 2>/dev/null || echo 0)
    echo "    OK size=${size}B"
  else
    echo "    FAILED (rc=$rc)"
  fi
}

for entry in "${IMAGES[@]}"; do
  fname="${entry%%|||*}"
  prompt="${entry#*|||}"
  fetch_one "$fname" "$prompt"
done

echo
echo "=== Verification ==="
for entry in "${IMAGES[@]}"; do
  fname="${entry%%|||*}"
  if [ -f "$fname" ]; then
    size=$(stat -f%z "$fname")
    mime=$(file -b "$fname")
    echo "$fname  ${size}B  | $mime"
  else
    echo "$fname  MISSING"
  fi
done
