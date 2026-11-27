# Maintenance runbook

Stop and ask a person if: a dependency update changes a major version, tests fail after an update, or spend is above the monthly limit.

1. Trim CLAUDE.md: delete anything Claude now does correctly without being told.
2. Remove agents and commands not used in the last month.
3. Check model choices and cost per merged PR in the Console workspace.
4. Run `npm outdated`, then `npm update`; run the Done checks from CLAUDE.md.
5. Compare the repo with the kit (no template repo exists for this project) and list differences in the PR.
6. Open one PR for the changes and close the monthly issue with its link.
