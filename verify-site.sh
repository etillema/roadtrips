#!/bin/bash
# Verificeer dat elk item een gebouwde HTML-pagina heeft met de juiste naam.
# Vereist een eerder uitgevoerde `bundle exec jekyll build`.
# Schema-validatie: gebruik verify-schema.py

declare -A COLLECTIONS=(
  ["_campings"]="campings"
  ["_fietstochten"]="fietstochten"
  ["_wandelroutes"]="wandelroutes"
  ["_kano_suproutes"]="kano-suproutes"
  ["_plaats"]="plaats"
  ["_musea"]="musea"
)

if [ ! -d "_site" ]; then
  echo "Geen _site map gevonden. Voer eerst uit: bundle exec jekyll build"
  exit 1
fi

errors=0
checked=0

for dir in "${!COLLECTIONS[@]}"; do
  output="${COLLECTIONS[$dir]}"
  for md_file in "$dir"/*.md; do
    [ -f "$md_file" ] || continue
    slug=$(basename "$md_file" .md)
    html_file="_site/$output/$slug/index.html"
    naam=$(grep "^naam:" "$md_file" | sed 's/^naam: *"\(.*\)"/\1/')
    checked=$((checked + 1))

    if [ ! -f "$html_file" ]; then
      echo "ONTBREEKT  $html_file"
      errors=$((errors + 1))
    elif [ -n "$naam" ] && ! grep -q "$naam" "$html_file"; then
      echo "NAAM MIST  $html_file (verwacht: $naam)"
      errors=$((errors + 1))
    fi
  done
done

echo "Gecontroleerd: $checked items — fouten: $errors"
[ $errors -eq 0 ] && exit 0 || exit 1
