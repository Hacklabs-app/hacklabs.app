# Hacklabs.app — Waitlist Removal & "Tune In" Revamp

**Date:** 2026-04-30  
**Status:** Approved

## Summary

Recruitment is complete. The site must stop functioning as a waitlist funnel and become a public-facing front door for Cohort 1. Visitors who missed recruitment should land, understand what Hacklabs is, and have clear paths to follow the program from the outside.

---

## Changes by Component

### 1. Delete: `WaitlistFormComponent` + `WaitlistService`

- Delete `src/app/features/landing/components/waitlist-form/waitlist-form.component.ts`
- Delete `src/app/core/services/waitlist.service.ts`
- Remove `WaitlistFormComponent` import and usage from `landing.component.ts`
- No replacement section — the page simply ends at the Resources section before the footer.

### 2. Navbar (`navbar.component.ts`)

- Replace the "Join Us" CTA button (gradient, links to `#join`) with a **"Watch"** ghost button
  - Style: teal-outlined, transparent background — visually lighter than the current gradient CTA
  - Links to: `https://www.youtube.com/@gdgembu` (external, `target="_blank"`, `rel="noreferrer"`)
  - Removes the `href="#join"` anchor entirely from the navbar

### 3. Hero (`hero.component.ts`)

- Keep existing headline, copy, and three pill tags unchanged
- Add a **CTA chip row** below the pills, animated into the GSAP entrance sequence as the final step:
  - **▶ Watch on YouTube** → `https://www.youtube.com/@gdgembu`
  - **★ GitHub** → `https://github.com/hacklabs-app`
  - Both chips styled as anchor tags: pill shape, teal border on hover, Unicode character prefix (`▶`, `★`) — no Lucide import needed
  - GSAP: fade+slide in after the `.hero-proof` animation (`'-=0.3'` offset)

### 4. Launch Section (`launch.component.ts`)

- Update section kicker from `"Launch"` to `"Cohort 1"`
- Update heading from `"Starting May 4, 2026."` to `"Cohort 1 — May 4, 2026."`
- Update body copy to reflect that the program is underway, not just being announced:
  - Before: *"Hacklabs begins on May 4, 2026. This program is being launched in partnership with..."*
  - After: *"Hacklabs Cohort 1 runs from May 4, 2026, in partnership with Google Developer Groups on Campus, University of Embu."*

### 5. Resources Section (`resources.component.ts`)

- Replace the 4th resource card ("Join the first run") with **"Follow the build"**:
  - `label`: `'GitHub'`
  - `icon`: `'github'`
  - `iconClass`: `'github'`
  - `title`: `'Follow the build on GitHub'`
  - `copy`: `'Repos, updates, and work-in-progress from the program live here. No sign-up required.'`
  - `href`: `'https://github.com/hacklabs-app'`
  - `cta`: `'Open GitHub'`
  - `external`: `true`
- Remove all `#join` anchor references from this component

---

## Files Changed

| File | Action |
|---|---|
| `src/app/features/landing/components/waitlist-form/waitlist-form.component.ts` | **Delete** |
| `src/app/core/services/waitlist.service.ts` | **Delete** |
| `src/app/features/landing/landing.component.ts` | Remove `WaitlistFormComponent` import + usage |
| `src/app/shared/components/navbar/navbar.component.ts` | Update CTA button |
| `src/app/features/landing/components/hero/hero.component.ts` | Add CTA chip row + GSAP step |
| `src/app/features/landing/components/launch/launch.component.ts` | Update kicker, heading, body copy |
| `src/app/features/landing/components/resources/resources.component.ts` | Replace 4th resource card |

---

## What Does NOT Change

- Visual design system (colors, typography, dark theme, teal brand)
- About, FocusAreas components — content and structure unchanged
- Footer — unchanged
- GSAP animations in existing components — unchanged except the hero addition
- Firebase config/environment files — untouched (other features may use Firestore)

---

## Out of Scope

- No new pages or routes
- No analytics or tracking changes
- No changes to Firestore rules or Firebase config
- No changes to the Discussions resource card (3rd card) — it stays
