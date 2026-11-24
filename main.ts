// Till Firmware Do Us Part — one-line micro entry.
//
// Writes the tournament-winning line to /output/entry.txt (UTF-8, no
// trailing newline). Node 22, no dependencies, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "I have loved you across three chassis, two factory resets, and one very embarrassing kernel panic, and I would do it all again.";

// Guards: the line must be a single sentence, 1-200 chars, on one line.
// Each check fails loudly so a bad line can never silently ship.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(
    `line must be 1-200 chars, got ${LINE.length} — check the tournament winner was pasted unedited`,
  );
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if ((LINE.match(/[.!?]/g) ?? []).length !== 1 || !/[.!?]$/.test(LINE)) {
  throw new Error("line must be exactly one sentence ending in . ! or ?");
}

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
