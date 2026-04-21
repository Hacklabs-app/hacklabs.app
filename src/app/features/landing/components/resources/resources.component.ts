import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-resources',
  standalone: true,
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

    .resource-icon.join {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(0, 177, 153, 0.18));
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.14);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.07),
        0 12px 24px -18px rgba(0, 177, 153, 0.4);
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
      label: 'Get Started',
      icon: 'arrow-right',
      iconClass: 'join',
      title: 'Join the first run',
      copy: 'Use the form below to join us, tell us your focus area, and help us shape the opening cohort.',
      href: '#join',
      cta: 'Go to Join Us',
      external: false
    }
  ] as const;
}
