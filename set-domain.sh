#!/bin/sh
# Replace the domain placeholder across every file in this folder.
#   ./set-domain.sh https://www.yourdomain.co.uk
# On Windows, or if you prefer: open each .html plus sitemap.xml and robots.txt
# and find-and-replace "https://REPLACE-DOMAIN" with your domain.
if [ -z "$1" ]; then echo "Usage: ./set-domain.sh https://www.yourdomain.co.uk"; exit 1; fi
NEW=$(printf '%s' "$1" | sed 's:/*$::')
for f in *.html sitemap.xml robots.txt; do
  [ -f "$f" ] || continue
  sed -i.bak "s|https://REPLACE-DOMAIN|$NEW|g" "$f" && rm -f "$f.bak"
done
echo "Domain set to $NEW"
