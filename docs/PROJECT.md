# tempconv

## Summary

A tiny TypeScript command-line tool that converts a temperature between Celsius, Fahrenheit and Kelvin. It is a throwaway proof of concept for testing the Claude Agentic Project Starter Kit. (ASSUMPTION: audience is the kit tester only.)

## Done for the first version

- `npm test` passes with one unit test per behaviour below.
- `npx tsx src/cli.ts 100 C F` prints `212`.

## Scope

In:

1. `tempconv <value> <from> <to>` converts between C, F and K.
2. Invalid units or a non-numeric value print an error and exit with code 1.
3. `--help` prints usage.

Out: batch or stdin input, rounding options, other units, npm publishing, packaging, any UI.

## Technology

Node LTS, TypeScript, npm. Vitest for tests, ESLint and Prettier for lint and format, `tsc --noEmit` for types, `tsx` to run. Commands: install `npm ci`, test `npm test`, lint `npm run lint`, format `npm run format`, format check `npm run format:check`, type check `npm run typecheck`.

## Repo and delivery

MineGene/tempconv, new, public, GitHub Free. Branch rules on `main`: PR required, `check` CI job required, no force push or deletion, 0 approvals. Automation: automatic PR review plus `@claude` on request. The person merges.

## Data and protected areas

No personal data, payments or credentials. Claude must not touch `.env*`, the lockfile by hand, or `LICENSE`.

## Environments and secrets

Local only. Secrets: `.env` locally (gitignored). No `ANTHROPIC_API_KEY`; no spend outside the existing subscription; the Claude workflows are blocked because setup-token needs a local CLI.

## Budget and working style

No spend outside the existing subscription; the Claude workflows are blocked because setup-token needs a local CLI. One person. Chat for planning, Claude Code for building, GitHub for small issues.

## Decisions

- 2026-11-27: Kit dry run covers stages 0 to 8 because the handoff says so.
- 2026-11-27: Stage 2 was merged as PR #1, not committed straight to main, because Claude Code opened a PR.
- 2026-11-27: Output is the number rounded to 10 decimal places with trailing zeros dropped and `-0` shown as `0`, so float noise such as `273.24999999999997` does not print. Units are uppercase only (`C`, `F`, `K`). Conversion lives in `src/cli.ts` (issue #3).
- 2026-11-27: Input validation (issue #4). The main function requires exactly three arguments. Units are uppercase only (`C`, `F`, `K`). The value must pass `Number()` and be finite, so hex, binary, octal, exponent and padded-whitespace forms are accepted, and an empty or whitespace-only value is rejected. A result that overflows to infinity (for example `1e308 C F`) is rejected. Every failure prints one generic message to stderr, exits with code 1 and prints nothing to stdout.
- 2026-11-27: Accepted for this throwaway, from the issue #4 security review (low severity): hex, binary and octal literals are accepted; exponent forms have no upper bound beyond the overflow check; values below absolute zero are accepted; padded whitespace, `+5` and `.5` are accepted; one generic error message covers every failure.

## Deviations from the kit

- Response style: replaces the kit's "short answers" check-in default with the rules in claude/response-style.md in the Claude Project. Applies from stage 5.
- Stage 2 merged as a PR, and stage 3 is delivered as one PR, because Claude Code opens PRs by default and branch rules are not on yet.
- CI uses `format:check` instead of the format command.
- Commit and PR attribution lines are switched off in `.claude/settings.json` with `attribution` set to `commit: ""`, `pr: ""` and `sessionUrl: false`, the form that older Claude Code versions also read (the plain `attribution: false` needs v2.1.281 or later).
- `.claude/settings.json` allows `Edit` (which covers Write; path-scoped `Write(...)` rules do not match) only under `/src`, `/test` and `/docs`. Each allowed npm command has a bare form and a form with a trailing `*`, and bare `npm ci` is on the ask list.
- No template repo exists for this project, so maintenance.md compares against the kit itself instead of "the template repo".
- ci.yml adds a `format:check` step, which the kit's ci.yml does not list.
- `actions/setup-node` is pinned to `@v4`, an unverified choice (see Open questions).

## Open questions

- None essential. Risks: the Claude workflows are untested together; a personal skill could clash with /feature, /issue, /pre-pr or /handoff.
- Bare commands (`npm test`, `npm run lint`) may not match the `Bash(<cmd> *)` allow patterns; confirm during the first /feature run. Person.

## Defaults and assumptions

- DEFAULT: branch main; MIT licence; one unit test per behaviour; stack-standard tools; .env secrets; local-only environments; branch rules as in the kit; automation is PR review plus @claude; no spend outside the existing subscription; the Claude workflows are blocked because setup-token needs a local CLI.
- ASSUMPTION: owner is MineGene; runs locally; no deadline; one person, 0 approvals; Vitest, ESLint, Prettier and tsx as the toolchain; nothing else off-limits.
- ASSUMPTION: `--help` is recognised only as the first argument, before the argument validation; it prints a usage line and the units to stdout and exits with code 0, and any extra arguments after it are ignored (issue #5).
- ASSUMPTION: a missing argument, such as `tempconv 100 C`, prints an error to stderr and exits with code 1 (issue #4).
- ASSUMPTION: converting a unit to itself, such as `100 C C`, prints the value unchanged (issue #3).
