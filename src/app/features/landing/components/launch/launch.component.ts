import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-launch',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <section class="launch-section" aria-labelledby="launch-title">
      <div class="launch-shell">
        <div class="launch-copy">
          <p class="launch-kicker">Launch</p>
          <h2 id="launch-title" class="launch-title">Starting May 4, 2026.</h2>
          <p class="launch-text">
            Hacklabs begins on <strong>May 4, 2026</strong>. This program is being launched in partnership with
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
