---
description: Write HANDOFF.md so a fresh session can continue
disable-model-invocation: true
---
Rewrite HANDOFF.md (local, gitignored) from this session with exactly these headings:

# Handoff
Updated: <date and time> by <chat, Claude Code or GitHub>
## Goal: <current objective in one sentence>
## State: done (with PR or commit links), in progress (where), branch, tests passing or failing
## Decisions made: <decision> because <reason>
## Next steps: numbered, the first one exact
## Open questions and blockers: <question>, <who must answer>
## Do not: dead ends already tried
## Recommended setup: surface, model, effort, first prompt

Be specific: branch names, file paths, commands run, failing tests. Move any lasting decision into
docs/PROJECT.md on the current branch. Then print the whole handoff so it can be pasted into a new
chat or session.
