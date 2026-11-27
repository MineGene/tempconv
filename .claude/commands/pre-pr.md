---
description: Final checks before opening a pull request
disable-model-invocation: true
---

Run in order and stop at the first failure:

1. The Done checks in CLAUDE.md's Workflow section.
2. The reviewer agent on the full diff against the base branch.
3. The security agent if the diff touches auth, input, secrets, or file or network access.
4. Confirm the diff has no secrets, debug output or stray files.
5. Draft the PR description from the PR template.
