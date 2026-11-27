---
description: Fix a GitHub issue end to end
argument-hint: <issue number>
disable-model-invocation: true
---

Fix GitHub issue #$ARGUMENTS.

1. Read it with `gh issue view $ARGUMENTS`. If it is unclear, ask one question and stop.
2. Create branch `claude/issue-$ARGUMENTS`.
3. Reproduce the problem or write a failing test first.
4. Fix it with the implementer agent, using the smallest change.
5. Follow .claude/commands/pre-pr.md. Fix blockers.
6. Commit, then open a draft PR whose body says `Fixes #$ARGUMENTS`.
