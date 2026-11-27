#!/usr/bin/env -S npx tsx
import { pathToFileURL } from "node:url";

export type Unit = "C" | "F" | "K";

export function convert(value: number, from: Unit, to: Unit): number {
  if (from === to) {
    return value;
  }
  let celsius = value;
  if (from === "F") {
    celsius = ((value - 32) * 5) / 9;
  } else if (from === "K") {
    celsius = value - 273.15;
  }
  if (to === "F") {
    return (celsius * 9) / 5 + 32;
  }
  if (to === "K") {
    return celsius + 273.15;
  }
  return celsius;
}

export function formatNumber(n: number): string {
  // Adding 0 turns -0 into 0.
  return String(Number(n.toFixed(10)) + 0);
}

function isUnit(s: string): s is Unit {
  return s === "C" || s === "F" || s === "K";
}

export function main(argv: string[]): number {
  const [value, from, to] = argv;
  if (
    argv.length !== 3 ||
    value === undefined ||
    from === undefined ||
    to === undefined ||
    value.trim() === "" ||
    !Number.isFinite(Number(value)) ||
    !isUnit(from) ||
    !isUnit(to)
  ) {
    console.error("Invalid input. Usage: tempconv <value> <C|F|K> <C|F|K>");
    return 1;
  }
  console.log(formatNumber(convert(Number(value), from, to)));
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  process.exitCode = main(process.argv.slice(2));
}
