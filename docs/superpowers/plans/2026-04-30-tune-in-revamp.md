# Tune-In Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the waitlist form and service; reframe the site from a recruitment funnel into a "follow along" landing page for Cohort 1.

**Architecture:** Pure UI changes — delete two files, update five components. No new routes, services, or abstractions. Each task is self-contained and committed separately on branch `feature/tune-in-revamp`.

**Tech Stack:** Angular 20+, TypeScript, GSAP (hero animations), CSS-in-component styles, pnpm

---

## File Map

| File | Action |
|---|---|
| `src/app/features/landing/components/waitlist-form/waitlist-form.component.ts` | Delete |
| `src/app/core/services/waitlist.service.ts` | Delete |
| `src/app/features/landing/landing.component.ts` | Remove WaitlistFormComponent import + usage |
| `src/app/shared/components/navbar/navbar.component.ts` | Replace "Join Us" CTA with "Watch" ghost button |
| `src/app/features/landing/components/hero/hero.component.ts` | Add CTA chip row + GSAP step |
| `src/app/features/landing/components/launch/launch.component.ts` | Update kicker, heading, body copy |
| `src/app/features/landing/components/resources/resources.component.ts` | Replace 4th resource card |

---

## Task 1: Delete waitlist files and clean up landing shell

**Files:**
- Delete: `src/app/features/landing/components/waitlist-form/waitlist-form.component.ts`
- Delete: `src/app/core/services/waitlist.service.ts`
- Modify: `src/app/features/landing/landing.component.ts`

- [ ] **Step 1: Delete the waitlist form component**

```bash
git rm src/app/features/landing/components/waitlist-form/waitlist-form.component.ts
```

- [ ] **Step 2: Delete the waitlist service**

```bash
git rm src/app/core/services/waitlist.service.ts
```

- [ ] **Step 3: Rewrite landing.component.ts**

Replace the entire file with:

```typescript
import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { LaunchComponent } from './components/launch/launch.component';
import { AboutComponent } from './components/about/about.component';
import { FocusAreasComponent } from './components/focus-areas/focus-areas.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-landing',
  imports: [
    NavbarComponent,
    HeroComponent,
    LaunchComponent,
    AboutComponent,
    FocusAreasComponent,
    ResourcesComponent,
    FooterComponent
  ],
  template: `
    <div class="landing-shell">
      <app-navbar></app-navbar>
      <main class="landing-main">
        <app-hero></app-hero>
        <app-launch></app-launch>
        <app-about></app-about>
        <app-focus-areas></app-focus-areas>
        <app-resources></app-resources>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .landing-shell {
      width: 100%;
      position: relative;
      overflow: clip;
    }

    .landing-main {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
      position: relative;
      z-index: 1;
    }
  `]
})
export class LandingComponent {}
```

- [ ] **Step 4: Verify build**

```bash
pnpm run build 2>&1 | tail -20
```

Expected: Build succeeds — no errors referencing `WaitlistFormComponent` or `waitlist.service`.

- [ ] **Step 5: Commit**

```bash
git add src/app/features/landing/landing.component.ts
git commit -m "feat: remove waitlist form and service"
```

---

## Task 2: Update navbar — "Watch" ghost button

**Files:**
- Modify: `src/app/shared/components/navbar/navbar.component.ts`

- [ ] **Step 1: Replace the entire file**

```typescript
import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule, NgOptimizedImage],
  host: {
    '(window:scroll)': 'onScroll()'
  },
  template: `
    <nav class="nav-shell" [class.is-scrolled]="isScrolled()">
      <div class="nav-inner">
        <a href="/" class="nav-brand" aria-label="Hacklabs home">
          <img ngSrc="assets/logo.svg" width="1024" height="768" priority alt="Hacklabs" class="nav-logo">
        </a>
        <div class="nav-links">
          <a href="#resources" class="nav-link-desktop">Resources</a>
          <a href="https://www.youtube.com/@gdgembu"
             target="_blank"
             rel="noreferrer"
             class="nav-link-watch">Watch</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      position: relative;
      z-index: 10;
    }

    .nav-shell {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 50;
      padding: 1rem 1rem 0;
      transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .nav-inner {
      width: min(100%, 76rem);
      margin: 0 auto;
      min-height: 4.75rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.9rem 1.2rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.3rem;
      background: rgba(6, 8, 8, 0.52);
      backdrop-filter: blur(12px);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.06),
        0 10px 30px -24px rgba(0, 0, 0, 0.9);
    }

    .nav-shell.is-scrolled .nav-inner {
      border-color: rgba(255, 255, 255, 0.16);
      background: rgba(6, 8, 8, 0.84);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.08),
        0 16px 30px -28px rgba(0, 0, 0, 0.8);
    }

    .nav-brand {
      display: inline-flex;
      align-items: center;
      position: relative;
      height: 2.8rem;
      overflow: visible;
    }

    .nav-logo {
      width: auto;
      height: 10rem;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      max-width: none;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.4rem;
    }

    .nav-links a {
      color: #b0b8ba;
      text-decoration: none;
      font-size: 0.92rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .nav-links a:hover {
      color: #fff;
    }

    .nav-links a.nav-link-watch {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 2.6rem;
      padding: 0.65rem 1.1rem;
      border-radius: 999px;
      border: 1px solid rgba(0, 177, 153, 0.45);
      background: transparent;
      color: var(--color-brand-primary) !important;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: border-color 0.2s, background 0.2s, color 0.2s;
    }

    .nav-links a.nav-link-watch:hover {
      border-color: var(--color-brand-primary);
      background: rgba(0, 177, 153, 0.1);
      color: #f4fffe !important;
    }

    @media (max-width: 48rem) {
      .nav-link-desktop {
        display: none;
      }

      .nav-shell.is-scrolled {
        transform: translateY(-0.6rem);
      }

      .nav-inner {
        min-height: 4rem;
        padding: 0.6rem 0.8rem;
      }

      .nav-logo {
        height: 7rem;
      }
    }
  `]
})
export class NavbarComponent {
  readonly isScrolled = signal(false);

  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm run build 2>&1 | tail -20
```

Expected: Build succeeds, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/shared/components/navbar/navbar.component.ts
git commit -m "feat: replace join-us nav cta with watch ghost button"
```

---

## Task 3: Update hero — CTA chip row with GSAP

**Files:**
- Modify: `src/app/features/landing/components/hero/hero.component.ts`

- [ ] **Step 1: Replace the entire file**

```typescript
import { Component, AfterViewInit, ElementRef, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  template: `
    <section class="hero-section">
      <div class="hero-orb hero-orb-primary" aria-hidden="true"></div>
      <div class="hero-orb hero-orb-secondary" aria-hidden="true"></div>
      <div #content class="hero-content">
        <h1 class="hero-title">
          BACK TO<br/>
          <span class="hero-title-accent glow-text">BASICS.</span>
        </h1>

        <p class="hero-copy">
          Build with AI if you want, but know what your code is doing.
          Learn the fundamentals behind backends, deployment, traffic, collaboration, and shipping in the real world.
        </p>

        <div class="hero-proof">
          <span>AI</span>
          <span>IoT</span>
          <span>Backend & DevOps</span>
        </div>

        <div class="hero-cta">
          <a href="https://www.youtube.com/@gdgembu"
             target="_blank"
             rel="noreferrer"
             class="hero-cta-chip">▶ Watch on YouTube</a>
          <a href="https://github.com/hacklabs-app"
             target="_blank"
             rel="noreferrer"
             class="hero-cta-chip">★ GitHub</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      width: 100%;
      display: block;
    }

    .hero-section {
      min-height: 100svh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 7rem 1.5rem 2.5rem;
      position: relative;
      isolation: isolate;
    }

    .hero-content {
      width: min(100%, 70rem);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .hero-title {
      margin: 0 0 1.5rem;
      font-size: clamp(3rem, 10vw, 6.5rem);
      line-height: 0.92;
      font-weight: 900;
      letter-spacing: -0.06em;
    }

    .hero-title-accent {
      color: var(--color-brand-primary);
      display: inline-block;
      font-style: italic;
      padding-right: 0.2em;
    }

    .hero-copy {
      margin: 0 0 2.5rem;
      max-width: 44rem;
      color: #a8b0b2;
      font-size: clamp(1.05rem, 2.4vw, 1.55rem);
      line-height: 1.7;
      font-family: var(--font-mono);
    }

    .hero-proof {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
      margin: 0 0 1.5rem;
    }

    .hero-proof span {
      padding: 0.5rem 0.85rem;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.03);
      color: #d3d8d9;
      font-size: 0.84rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .hero-cta {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
    }

    .hero-cta-chip {
      display: inline-flex;
      align-items: center;
      padding: 0.6rem 1.2rem;
      border-radius: 999px;
      border: 1px solid rgba(0, 177, 153, 0.35);
      background: rgba(0, 177, 153, 0.06);
      color: var(--color-brand-primary);
      font-family: var(--font-mono);
      font-size: 0.84rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-decoration: none;
      text-transform: uppercase;
      transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s;
    }

    .hero-cta-chip:hover {
      border-color: var(--color-brand-primary);
      background: rgba(0, 177, 153, 0.14);
      color: #f4fffe;
      transform: translateY(-2px);
    }

    .hero-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(12px);
      opacity: 0.7;
      pointer-events: none;
    }

    .hero-orb-primary {
      width: min(34rem, 70vw);
      height: min(34rem, 70vw);
      top: 5rem;
      right: max(-8rem, -10vw);
      background: radial-gradient(circle, rgba(0, 177, 153, 0.22), transparent 72%);
    }

    .hero-orb-secondary {
      width: min(28rem, 60vw);
      height: min(28rem, 60vw);
      bottom: 1rem;
      left: max(-10rem, -12vw);
      background: radial-gradient(circle, rgba(255, 255, 255, 0.12), transparent 72%);
    }

    @media (max-width: 48rem) {
      .hero-section {
        padding-top: 6.5rem;
      }

      .hero-copy br {
        display: none;
      }
    }
  `]
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('content') private contentRef!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const el = this.contentRef.nativeElement;
      const tl = gsap.timeline();

      tl.from(el.querySelector('h1'), { y: 40, opacity: 0, duration: 1, ease: 'power4.out' })
        .from(el.querySelector('p'), { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from(el.querySelector('.hero-proof'), { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45')
        .from(el.querySelector('.hero-cta'), { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3');
    }
  }
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm run build 2>&1 | tail -20
```

Expected: Build succeeds, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/features/landing/components/hero/hero.component.ts
git commit -m "feat: add follow-along cta chips to hero with gsap animation"
```

---

## Task 4: Update launch section copy

**Files:**
- Modify: `src/app/features/landing/components/launch/launch.component.ts`

- [ ] **Step 1: Replace the entire file**

```typescript
import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-launch',
  imports: [NgOptimizedImage],
  template: `
    <section class="launch-section" aria-labelledby="launch-title">
      <div class="launch-shell">
        <div class="launch-copy">
          <p class="launch-kicker">Cohort 1</p>
          <h2 id="launch-title" class="launch-title">Cohort 1 — May 4, 2026.</h2>
          <p class="launch-text">
            Hacklabs Cohort 1 runs from <strong>May 4, 2026</strong>, in partnership with
            Google Developer Groups on Campus, University of Embu.
          </p>
        </div>

        <div class="launch-logos" aria-label="Partners">
          <a
            class="launch-logo-card launch-logo-link"
            href="/"
            aria-label="Visit Hacklabs home">
            <img ngSrc="assets/logo.svg" width="1024" height="768" alt="Hacklabs" class="launch-logo launch-logo-hacklabs">
          </a>
          <a
            class="launch-logo-card launch-logo-link"
            href="https://gdg.community.dev/gdg-on-campus-university-of-embu-embu-kenya/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit GDG on Campus University of Embu">
            <img ngSrc="assets/gdg.png" width="192" height="192" alt="Google Developer Groups on Campus University of Embu" class="launch-logo launch-logo-gdg">
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      width: 100%;
      display: block;
    }

    .launch-section {
      width: 100%;
      padding: 0 1.5rem 3rem;
    }

    .launch-shell {
      width: min(100%, 76rem);
      margin: 0 auto;
      padding: clamp(1.4rem, 2.5vw, 1.9rem);
      display: grid;
      grid-template-columns: 1.08fr 0.92fr;
      gap: 1.5rem;
      align-items: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.8rem;
      background:
        linear-gradient(180deg, rgba(15, 18, 18, 0.94), rgba(8, 10, 10, 0.95));
      box-shadow:
        0 35px 80px -55px rgba(0, 0, 0, 0.95),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .launch-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 100%;
    }

    .launch-kicker {
      margin: 0 0 0.55rem;
      color: var(--color-brand-primary);
      font-family: var(--font-mono);
      font-size: 0.76rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
    }

    .launch-title {
      margin: 0 0 0.75rem;
      font-size: clamp(2rem, 4vw, 3.2rem);
      line-height: 1.02;
      letter-spacing: -0.05em;
    }

    .launch-text {
      margin: 0;
      max-width: 34rem;
      color: #a8b0b2;
      font-family: var(--font-mono);
      line-height: 1.85;
      font-size: 0.98rem;
    }

    .launch-logos {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .launch-logo-card {
      min-height: 5.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.35rem 0.45rem;
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 1.35rem;
      background: rgba(255, 255, 255, 0.04);
      overflow: hidden;
    }

    .launch-logo-link {
      text-decoration: none;
    }

    .launch-logo-link:hover {
      border-color: rgba(0, 177, 153, 0.45);
      background: rgba(255, 255, 255, 0.06);
    }

    .launch-logo {
      width: 100%;
      max-width: 100%;
      height: 100%;
      object-fit: contain;
      opacity: 1;
      filter: none;
    }

    .launch-logo-hacklabs {
      transform: scale(1.18);
    }

    .launch-logo-gdg {
      transform: scale(1.2);
    }

    @media (max-width: 64rem) {
      .launch-shell {
        grid-template-columns: 1fr;
      }

      .launch-logos {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LaunchComponent {}
```

- [ ] **Step 2: Verify build**

```bash
pnpm run build 2>&1 | tail -20
```

Expected: Build succeeds, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/features/landing/components/launch/launch.component.ts
git commit -m "feat: update launch section to cohort 1 framing"
```

---

## Task 5: Update resources — replace 4th card

**Files:**
- Modify: `src/app/features/landing/components/resources/resources.component.ts`

- [ ] **Step 1: Replace the entire file**

```typescript
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-resources',
  imports: [LucideAngularModule],
  template: `
    <section id="resources" class="resources-section">
      <div class="resources-shell">
        <div class="resources-header">
          <p class="resources-kicker">Resources</p>
          <h2 class="resources-title">Lost? Start here.</h2>
          <p class="resources-copy">
            Use this section as your warm-up lane. Watch recordings, follow discussions, and get familiar with the ecosystem before the full program begins.
          </p>
          <p class="resources-note">
            Session recordings will be published on
            <a href="https://www.youtube.com/@gdgembu" target="_blank" rel="noreferrer">GDG on Campus University of Embu on YouTube</a>.
          </p>
        </div>

        <div class="resources-grid">
          @for (resource of resources; track resource.title) {
            <article class="resource-card">
              <div class="resource-icon" [class]="resource.iconClass">
                <lucide-icon [name]="resource.icon" [size]="22" [strokeWidth]="2"></lucide-icon>
              </div>
              <p class="resource-label">{{ resource.label }}</p>
              <h3 class="resource-title">{{ resource.title }}</h3>
              <p class="resource-copy">{{ resource.copy }}</p>
              <a class="resource-link" [href]="resource.href" [target]="resource.external ? '_blank' : null" [rel]="resource.external ? 'noreferrer' : null">
                {{ resource.cta }}
              </a>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      width: 100%;
      display: block;
    }

    .resources-section {
      width: 100%;
      padding: 3rem 1.5rem;
    }

    .resources-shell {
      width: min(100%, 76rem);
      margin: 0 auto;
      padding: clamp(1.5rem, 3vw, 2.25rem);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.8rem;
      background:
        linear-gradient(180deg, rgba(15, 18, 18, 0.94), rgba(9, 11, 11, 0.92));
      box-shadow:
        0 30px 80px -55px rgba(0, 0, 0, 0.95),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .resources-header {
      max-width: 44rem;
      margin-bottom: 1.75rem;
    }

    .resources-kicker {
      margin: 0 0 0.75rem;
      color: var(--color-brand-primary);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
    }

    .resources-title {
      margin: 0 0 0.7rem;
      font-size: clamp(2rem, 5vw, 2.8rem);
      line-height: 1.02;
      letter-spacing: -0.05em;
    }

    .resources-copy {
      margin: 0;
      color: #aab2b4;
      font-family: var(--font-mono);
      line-height: 1.85;
      font-size: 0.98rem;
    }

    .resources-note {
      margin: 0.9rem 0 0;
      color: #97a2a4;
      font-family: var(--font-mono);
      line-height: 1.8;
      font-size: 0.92rem;
    }

    .resources-note a {
      color: #fff;
      text-decoration: underline;
      text-underline-offset: 0.18em;
    }

    .resources-note a:hover {
      color: var(--color-brand-primary);
    }

    .resources-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .resource-card {
      position: relative;
      padding: 1.25rem;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.25rem;
      background: rgba(255, 255, 255, 0.03);
    }

    .resource-icon {
      width: 2.85rem;
      height: 2.85rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      border-radius: 0.95rem;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.04);
      color: #fff;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }

    .resource-icon.youtube {
      position: relative;
      background: linear-gradient(180deg, rgba(255, 31, 31, 0.24), rgba(173, 16, 16, 0.2));
      color: #ffffff;
      border-color: rgba(255, 70, 70, 0.28);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.06),
        0 12px 24px -18px rgba(255, 0, 0, 0.7);
    }

    .resource-icon.youtube::before {
      content: "";
      position: absolute;
      width: 1.2rem;
      height: 0.85rem;
      border-radius: 0.4rem;
      background: #ff2222;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06);
    }

    .resource-icon.youtube lucide-icon {
      position: relative;
      z-index: 1;
      transform: translateX(1px);
    }

    .resource-icon.github {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(120, 126, 132, 0.14));
      color: #f3f4f6;
      border-color: rgba(255, 255, 255, 0.12);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.07),
        0 12px 24px -18px rgba(255, 255, 255, 0.25);
    }

    .resource-icon.discussions {
      background: linear-gradient(180deg, rgba(0, 177, 153, 0.22), rgba(0, 96, 82, 0.2));
      color: #d8fffa;
      border-color: rgba(0, 177, 153, 0.2);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.05),
        0 12px 24px -18px rgba(0, 177, 153, 0.45);
    }

    .resource-label {
      margin: 0 0 0.65rem;
      color: var(--color-brand-primary);
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .resource-title {
      margin: 0 0 0.65rem;
      font-size: 1.25rem;
      line-height: 1.2;
    }

    .resource-copy {
      margin: 0 0 1rem;
      color: #aab2b4;
      font-family: var(--font-mono);
      line-height: 1.75;
      font-size: 0.92rem;
    }

    .resource-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 2.65rem;
      padding: 0.7rem 1rem;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.06);
      color: #fff;
      text-decoration: none;
      font-weight: 700;
      letter-spacing: 0.04em;
    }

    .resource-link:hover {
      border-color: rgba(0, 177, 153, 0.45);
      background: rgba(0, 177, 153, 0.14);
      color: #f5fffe;
    }

    @media (max-width: 48rem) {
      .resources-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ResourcesComponent {
  readonly resources = [
    {
      label: 'Recordings',
      icon: 'play',
      iconClass: 'youtube',
      title: 'Warm-up sessions on YouTube',
      copy: 'Session recordings and shared learning moments will live on the GDG on Campus University of Embu YouTube channel.',
      href: 'https://www.youtube.com/@gdgembu',
      cta: 'Open YouTube',
      external: true
    },
    {
      label: 'GitHub',
      icon: 'github',
      iconClass: 'github',
      title: 'Follow the Hacklabs work in public',
      copy: 'Use GitHub to stay close to updates, repos, and the broader build process around the program.',
      href: 'https://github.com/hacklabs-app',
      cta: 'Open GitHub',
      external: true
    },
    {
      label: 'Discussions',
      icon: 'message-square',
      iconClass: 'discussions',
      title: 'Read questions and community threads',
      copy: 'GitHub Discussions is where ideas, clarifications, and program-adjacent conversation can keep moving outside live sessions.',
      href: 'https://github.com/orgs/Hacklabs-app/discussions',
      cta: 'Open Discussions',
      external: true
    },
    {
      label: 'GitHub',
      icon: 'github',
      iconClass: 'github',
      title: 'Follow the build on GitHub',
      copy: 'Repos, updates, and work-in-progress from the program live here. No sign-up required.',
      href: 'https://github.com/hacklabs-app',
      cta: 'Open GitHub',
      external: true
    }
  ] as const;
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm run build 2>&1 | tail -20
```

Expected: Build succeeds, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/features/landing/components/resources/resources.component.ts
git commit -m "feat: replace join-the-run resource card with follow-the-build"
```

---

## Task 6: Lint + final verification

**Files:** No code changes — verification only.

- [ ] **Step 1: Run lint**

```bash
pnpm run lint 2>&1
```

Expected: No errors or warnings across modified files.

- [ ] **Step 2: Run production build**

```bash
pnpm run build 2>&1 | tail -30
```

Expected: `Build complete.` with no errors.

- [ ] **Step 3: Smoke-test in the browser**

```bash
pnpm run start
```

Open `http://localhost:4200` and verify:
- Navbar shows "Watch" ghost button (teal-outlined, no gradient fill), linking to YouTube
- Hero shows two CTA chips below the pills ("▶ Watch on YouTube", "★ GitHub"), animated in via GSAP
- Launch section reads "Cohort 1" kicker and "Cohort 1 — May 4, 2026." heading
- Resources 4th card reads "Follow the build on GitHub"
- Scrolling past Resources to the footer — no form renders, page ends cleanly
- No console errors
