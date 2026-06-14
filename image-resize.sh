#!/bin/bash
find . \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r f; do
  convert "$f" -auto-orient -resize 640x480 -quality 82 "${f%.*}-640x480.webp"
  convert "$f" -auto-orient -resize 1280x960 -quality 82 "${f%.*}-1280x960.webp"
  convert "$f" -auto-orient -resize 1920x1440 -quality 82 "${f%.*}-1920x1440.webp"
done
