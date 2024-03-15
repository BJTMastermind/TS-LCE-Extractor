# TS LCE Extractor

A simple typescript node program to extract a Minecraft LCE savegame file.

## How To Use (CLI)

1. Open `src/savegame_extractor.ts`
2. On line `88` Change the path to your **decompressed (If Xbox/PS3)** savegame file and update the enum for the platform your file is from.
3. Optionally, On line `90` Change the output path to your desired location.
4. Save the file.
5. Open a terminal and Run: `npx ts-node ./src/savegame_extractor.ts`.
6. Extracted file will appear in the output path you put, or by default in: `./extracted/`.

## Minimum NodeJS Version

* NodeJS 21.7.1
