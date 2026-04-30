import { Component, ChangeDetectionStrategy, AfterViewInit, ElementRef, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
             class="hero-cta-chip"
             aria-label="Watch on YouTube (opens in new tab)">
            <span aria-hidden="true">▶</span> Watch on YouTube
          </a>
          <a href="https://github.com/hacklabs-app"
             target="_blank"
             rel="noreferrer"
             class="hero-cta-chip"
             aria-label="Hacklabs on GitHub (opens in new tab)">
            <span aria-hidden="true">★</span> GitHub
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
