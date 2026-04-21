# Contributing

This repo uses a branch-and-PR workflow for contributors inside the organization.

## Workflow

1. Pull the latest `main`
2. Create a new branch from `main`
3. Make focused changes
4. Run the relevant checks locally
5. Open a pull request into `main`
6. Wait for review before merge

## Branching

Use clear branch names, for example:

- `feature/resources-section`
- `fix/mobile-navbar`
- `content/hero-copy`
- `chore/readme-update`

## Rules

- Do not push directly to `main`
- Keep pull requests small and reviewable
- Do not mix unrelated UI, content, and infrastructure changes in one PR when avoidable
- If a change affects copy, screenshots or context in the PR description help a lot
- If a change affects Firestore behavior, review `firestore.rules` too

## Local Checks

Before opening a PR, run:

```bash
pnpm lint
pnpm build
```

CI runs both of these as status checks on every pull request. The PR cannot merge unless they pass.

If your change is small and `pnpm build` is too heavy for the moment, at minimum run `pnpm lint` and ensure the relevant area works locally.

## Content Changes

This repo includes both code and website messaging. For content-heavy changes:

- prefer clear, direct language
- keep the Hacklabs tone practical and grounded
- avoid vague hype language
- make sure claims match the actual program

## Secrets And Config

- Never commit real secrets
- Never commit production credentials
- Keep local-only config out of Git
- Use tracked example files only for safe placeholders

## Pull Request Guidance

A good PR should make it easy for reviewers to answer:

- What changed?
- Why did it change?
- How was it checked?
- Are there any follow-up tasks?

Useful PR notes:

- screenshots for UI updates
- absolute dates when talking about launches or schedules
- mention of any env or Firestore implications

## When In Doubt

If the change is large, ambiguous, or affects messaging direction, align in the org before building too far ahead.
