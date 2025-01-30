#!/bin/bash

# Generate PNG versions of the favicon
magick convert favicon.svg -resize 16x16 favicon-16x16.png
magick convert favicon.svg -resize 32x32 favicon-32x32.png
magick convert favicon.svg -resize 180x180 apple-touch-icon.png 
