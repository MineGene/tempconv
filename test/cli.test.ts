import { afterEach, describe, expect, it, vi } from "vitest";
import { convert, formatNumber, main } from "../src/cli.js";

describe("convert", () => {
  it.each([
    [100, "C", "F", 212],
    [0, "C", "K", 273.15],
    [32, "F", "C", 0],
    [100, "C", "C", 100],
    [212, "F", "K", 373.15],
    [273.15, "K", "C", 0],
    [-40, "C", "F", -40],
  ] as const)("converts %s %s to %s as %s", (value, from, to, expected) => {
    expect(convert(value, from, to)).toBeCloseTo(expected, 10);
  });
});

describe("formatNumber", () => {
  it("formats whole and decimal numbers", () => {
    expect(formatNumber(212)).toBe("212");
    expect(formatNumber(273.15)).toBe("273.15");
  });

  it("prints negative zero as 0", () => {
    expect(formatNumber(-0)).toBe("0");
  });

  it("rounds away floating point noise", () => {
    expect(formatNumber(convert(98.6, "F", "C"))).toBe("37");
    expect(formatNumber(convert(0.1, "C", "K"))).toBe("273.25");
  });
});

describe("main", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs the converted value and returns 0", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    expect(main(["100", "C", "F"])).toBe(0);
    expect(log).toHaveBeenCalledWith("212");
  });

  it("prints the value unchanged when the units match", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    expect(main(["100", "C", "C"])).toBe(0);
    expect(log).toHaveBeenCalledWith("100");
  });

  describe("invalid input", () => {
    it.each([
      ["an unknown unit", ["100", "C", "X"]],
      ["a lowercase unit", ["100", "c", "f"]],
      ["a non-numeric value", ["abc", "C", "F"]],
      ["an empty value", ["", "C", "F"]],
      ["a whitespace-only value", ["  ", "C", "F"]],
      ["a non-finite value", ["Infinity", "C", "F"]],
      ["a missing argument", ["100", "C"]],
      ["no arguments", []],
      ["an extra argument", ["100", "C", "F", "K"]],
    ])("prints an error to stderr and returns 1 for %s", (_name, argv) => {
      const log = vi.spyOn(console, "log").mockImplementation(() => {});
      const error = vi.spyOn(console, "error").mockImplementation(() => {});
      expect(main(argv)).toBe(1);
      expect(error).toHaveBeenCalledTimes(1);
      expect(log).not.toHaveBeenCalled();
    });
  });
});
