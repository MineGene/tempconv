import { describe, expect, it } from "vitest";
import { main } from "../src/cli.js";

describe("main", () => {
  it("exits with code 0", () => {
    expect(main([])).toBe(0);
  });
});
