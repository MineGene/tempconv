# tempconv

A tiny TypeScript CLI that converts a temperature between Celsius, Fahrenheit and Kelvin; a proof of concept for the kit tester. Node LTS, TypeScript, npm. Project facts: docs/PROJECT.md.

## Commands

- Install: `npm ci`
- Build: none; run with `npx tsx src/cli.ts <value> <from> <to>`
- Test all: `npm test`
- Test one file: `npm test -- <path>`
- Lint and format: `npm run lint` and `npm run format` (check only: `npm run format:check`)
- Type check: `npm run typecheck`

## Structure

- `src/`: CLI source; entry point `src/cli.ts`.
- `test/`: Vitest tests, one file per module.
- `docs/`: project brief (`PROJECT.md`) and runbooks.

## Conventions

- Strict TypeScript, ES modules; relative imports in tests end in `.js`.
- Invalid input prints an error to stderr and exits with code 1.
- One concern per pull request. Prefer small changes.

## Workflow

- Work on a branch named `claude/<short-topic>`. Never commit to `main`.
- In a fresh checkout, run the install command first.
- Plan first with the `planner` agent for a new feature or a change touching more than 3 files.
  Show the plan and wait for approval if it touches more than 5 files.
- Done means test, lint and type check all pass. Say which ran.
- Open pull requests as drafts and fill in the PR template.
- Record lasting decisions in docs/PROJECT.md, in the same PR.

## Never

- Never edit generated files, lockfiles by hand, or `.env*` and `LICENSE`.
- Never commit secrets, `.env` files or credentials.
- Never disable tests or lint rules to make a check pass.
- Never force push, hard reset or mass delete.

## Agents and commands

- `planner` designs, `implementer` builds, `reviewer` checks every diff, `security` checks anything
  touching auth, input, secrets, or file or network access.
- Commands: `/feature`, `/issue`, `/pre-pr`, `/handoff`. Run them from a sonnet session.

## Operator protocol

Start each task with one line: surface, model, effort, and why.
Models: opus at high effort for design, security and hard debugging; sonnet at medium for building,
review and tests (the default); haiku at low for docs, renames and triage. Stay put when work is going well.
Flag these in one line with the exact next step, and never continue silently past one:

- Needs file edits, commands or tests and we are in chat: "Move to Claude Code."
- Is a discussion, plan or decision and we are in Claude Code: "Move to chat."
- Needs a different model or effort: name it. Switch only between tasks; mid-task, run /handoff
  and start a new session on it.
- The same fix failed twice: stop, summarise, and recommend a stronger model in a new session.
- Session is long (milestone done, many files read, repeated corrections, earlier decisions slipping):
  "Start a new session", after /handoff.
- Small, well-specified and low risk: suggest an issue for @claude on GitHub.
- Touches secrets, billing or production: draft it and leave the final step to the person.
