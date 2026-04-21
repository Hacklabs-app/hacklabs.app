import { Component, AfterViewInit, ElementRef, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section id="about" class="about-section">
      <div #container class="about-panel opacity-0 translate-y-12 transition-all duration-1000 ease-out">
        <p class="about-kicker">What You Get</p>
        <h2 class="about-title">
          From shipping prompts to making <span class="about-title-muted">engineering decisions.</span>
        </h2>
        <p class="about-copy">
          Hacklabs is built for people who can already use tools, but want to understand what sits underneath them:
          the backend, the deployment flow, the infrastructure, the tradeoffs, and the failure points.
          The goal is not to reject AI. The goal is to stop being blocked by what you do not understand.
        </p>
        <div class="about-points">
          <article class="about-point">
            <h3>Build with context</h3>
            <p>Understand APIs, servers, databases, deployment, Linux, and the path from code to production.</p>
          </article>
          <article class="about-point">
            <h3>Think like a teammate</h3>
            <p>Work through daily sessions, accountability, peer learning, reviews, and practical team communication.</p>
          </article>
          <article class="about-point">
            <h3>Handle real constraints</h3>
            <p>Learn to ask what happens when traffic increases, services fail, configs drift, or a product needs to ship.</p>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      width: 100%;
      display: block;
    }

    .about-section {
      width: 100%;
      padding: 3rem 1.5rem;
    }

    .about-panel {
      width: min(100%, 58rem);
      margin: 0 auto;
      padding: clamp(2rem, 4vw, 3.5rem);
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.75rem;
      background:
        linear-gradient(180deg, rgba(16, 20, 20, 0.92), rgba(9, 11, 11, 0.88));
      box-shadow:
        0 30px 80px -45px rgba(0, 0, 0, 0.9),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .about-kicker {
      margin: 0 0 1rem;
      color: var(--color-brand-primary);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.22em;
    }

    .about-title {
      margin: 0 0 1.5rem;
      font-size: clamp(2.4rem, 6vw, 4.6rem);
      line-height: 1;
      font-weight: 850;
      letter-spacing: -0.05em;
      text-transform: uppercase;
    }

    .about-title-muted {
      color: #697173;
      text-decoration: line-through;
      text-decoration-color: var(--color-brand-primary);
      text-decoration-thickness: 0.22rem;
    }

    .about-copy {
      margin: 0 0 2rem;
      color: #d4dbdd;
      font-size: clamp(1rem, 2.2vw, 1.35rem);
      line-height: 1.9;
      font-weight: 500;
    }

    .about-accent {
      color: var(--color-brand-primary);
      font-family: var(--font-mono);
      font-size: 1.15em;
    }

    .about-points {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
      text-align: left;
    }

    .about-point {
      padding: 1.25rem;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.25rem;
      background: rgba(255, 255, 255, 0.03);
    }

    .about-point h3 {
      margin: 0 0 0.75rem;
      font-size: 1.05rem;
      line-height: 1.3;
    }

    .about-point p {
      margin: 0;
      color: #aab2b4;
      font-family: var(--font-mono);
      font-size: 0.92rem;
      line-height: 1.75;
    }

    @media (max-width: 64rem) {
      .about-points {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('container') private containerRef!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }
        });
      }, { threshold: 0.3 });
      observer.observe(this.containerRef.nativeElement);
    }
  }
}
