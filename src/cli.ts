#!/usr/bin/env -S npx tsx
import { pathToFileURL } from "node:url";

export function main(argv: string[]): number {
  void argv;
  console.log("tempconv: not implemented yet");
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  process.exitCode = main(process.argv.slice(2));
}
