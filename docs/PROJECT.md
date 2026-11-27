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

Local only. Secrets: `.env` locally (gitignored); `ANTHROPIC_API_KEY` as a GitHub Actions secret at stage 8.

## Budget and working style

Dedicated Console workspace with a US$20 monthly limit. One person. Chat for planning, Claude Code for building, GitHub for small issues.

## Decisions

- 2026-11-27: Kit dry run covers stages 0 to 8 because the handoff says so.
- 2026-11-27: Stage 2 was merged as PR #1, not committed straight to main, because Claude Code opened a PR.

## Deviations from the kit

- Response style: replaces the kit's "short answers" check-in default with the rules in claude/response-style.md in the Claude Project. Applies from stage 5.
- Stage 2 merged as a PR, and stage 3 is delivered as one PR, because Claude Code opens PRs by default and branch rules are not on yet.
- CI uses `format:check` instead of the format command.
- Commit and PR attribution lines are switched off.
- No template repo exists for this project, so maintenance.md compares against the kit itself instead of "the template repo".
- ci.yml adds a `format:check` step, which the kit's ci.yml does not list.
- `actions/setup-node` is pinned to `@v4`, an unverified choice (see Open questions).

## Open questions

- None essential. Risks: the Claude workflows are untested together; a personal skill could clash with /feature, /issue, /pre-pr or /handoff.
- Action versions in ci.yml (`actions/checkout@v6`, `actions/setup-node@v4`) could not be checked against the current releases; confirm at the first CI run. Person.
- Bare commands (`npm test`, `npm run lint`) may not match the `Bash(<cmd> *)` allow patterns; confirm during the first /feature run. Person.

## Defaults and assumptions

- DEFAULT: branch main; MIT licence; one unit test per behaviour; stack-standard tools; .env secrets; local-only environments; branch rules as in the kit; automation is PR review plus @claude; API key with a US$20 limit.
- ASSUMPTION: owner is MineGene; runs locally; no deadline; one person, 0 approvals; Vitest, ESLint, Prettier and tsx as the toolchain; nothing else off-limits.
- ASSUMPTION: a missing argument, such as `tempconv 100 C`, prints an error to stderr and exits with code 1 (issue #4).
- ASSUMPTION: converting a unit to itself, such as `100 C C`, prints the value unchanged (issue #3).
