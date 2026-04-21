import { Component, AfterViewInit, ElementRef, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-focus-areas',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <section id="focus" class="focus-section">
      <div class="focus-shell">
        <div class="focus-heading">
          <p class="focus-kicker">Program Output</p>
          <h2 class="focus-title">What this program actually helps you build.</h2>
        </div>
        
        <div #cards class="focus-grid">
          @for (area of areas; track area.title) {
            <article class="focus-card">
              <div>
                <div class="focus-icon">
                  <lucide-icon [name]="area.icon" [size]="40" [strokeWidth]="1.5"></lucide-icon>
                </div>
                <h3 class="focus-card-title">{{ area.title }}</h3>
                <p class="focus-card-copy">{{ area.description }}</p>
              </div>
            </article>
          }
        </div>

        <div class="focus-expectations">
          <div>
            <p class="focus-expectations-kicker">What to expect</p>
            <h3 class="focus-expectations-title">This is structured, intense, and hands-on.</h3>
          </div>
          <ul class="focus-list">
            @for (expectation of expectations; track expectation) {
              <li>{{ expectation }}</li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      width: 100%;
      display: block;
    }

    .focus-section {
      width: 100%;
      padding: 3rem 1.5rem;
    }

    .focus-shell {
      width: min(100%, 76rem);
      margin: 0 auto;
    }

    .focus-heading {
      margin-bottom: 2.5rem;
      text-align: center;
    }

    .focus-kicker {
      margin: 0 0 0.85rem;
      color: var(--color-brand-primary);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.22em;
    }

    .focus-title {
      margin: 0;
      font-size: clamp(2rem, 5vw, 3rem);
      line-height: 1.05;
      letter-spacing: -0.05em;
    }

    .focus-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }

    .focus-card {
      min-height: 16rem;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.5rem;
      background:
        linear-gradient(180deg, rgba(19, 25, 25, 0.94), rgba(9, 12, 12, 0.96));
      box-shadow: 0 25px 70px -50px rgba(0, 0, 0, 0.9);
    }

    .focus-card:hover {
      transform: translateY(-4px);
      border-color: rgba(0, 177, 153, 0.45);
      box-shadow: 0 35px 70px -40px rgba(0, 177, 153, 0.28);
    }

    .focus-icon {
      width: 4rem;
      height: 4rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2.25rem;
      border-radius: 1.1rem;
      background: rgba(255, 255, 255, 0.04);
      color: var(--color-brand-primary);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .focus-card-title {
      margin: 0 0 0.85rem;
      font-size: 1.55rem;
      line-height: 1.15;
    }

    .focus-card-copy {
      margin: 0;
      color: #a9b2b4;
      font-family: var(--font-mono);
      font-size: 0.96rem;
      line-height: 1.75;
    }

    .focus-expectations {
      margin-top: 1.5rem;
      padding: 1.75rem;
      display: grid;
      grid-template-columns: 0.95fr 1.05fr;
      gap: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.5rem;
      background: rgba(255, 255, 255, 0.03);
    }

    .focus-expectations-kicker {
      margin: 0 0 0.65rem;
      color: var(--color-brand-primary);
      font-family: var(--font-mono);
      font-size: 0.74rem;
      text-transform: uppercase;
      letter-spacing: 0.18em;
    }

    .focus-expectations-title {
      margin: 0;
      font-size: clamp(1.5rem, 3vw, 2.2rem);
      line-height: 1.15;
      letter-spacing: -0.04em;
    }

    .focus-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 0.8rem;
    }

    .focus-list li {
      position: relative;
      padding-left: 1.5rem;
      color: #cfd6d7;
      font-family: var(--font-mono);
      line-height: 1.7;
    }

    .focus-list li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.7rem;
      width: 0.55rem;
      height: 0.55rem;
      border-radius: 50%;
      background: var(--color-brand-primary);
      box-shadow: 0 0 12px rgba(0, 177, 153, 0.55);
    }

    @media (max-width: 64rem) {
      .focus-grid {
        grid-template-columns: 1fr;
      }

      .focus-expectations {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FocusAreasComponent implements AfterViewInit {
  @ViewChild('cards') private cardsRef!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  areas = [
    {
      icon: 'brain-circuit',
      title: 'Think clearly about AI systems',
      description: 'Move beyond prompts into fundamentals, workflows, evaluation, and the reasoning behind what AI tools are actually doing for you.'
    },
    {
      icon: 'cpu',
      title: 'Get practical with IoT',
      description: 'Build confidence around devices, hardware interaction, system behavior, and the discipline needed to work closer to the real world.'
    },
    {
      icon: 'server',
      title: 'Understand backend and DevOps',
      description: 'Learn what sits behind applications, how services get deployed, and how software behaves once real users and infrastructure are involved.'
    },
    {
      icon: 'users',
      title: 'Operate like a real team',
      description: 'Practice accountability, peer learning, communication, and project pressure in a setup that feels closer to work than a casual tutorial.'
    }
  ];

  expectations = [
    'A shared fundamentals base, then applied learning across AI, IoT, and Backend/DevOps.',
    'Daily sessions and consistent participation, not passive lurking.',
    'Challenges that force you to think, debug, explain, and improve.',
    'Peer learning through Slack, GitHub Discussions, and recorded sessions.'
  ];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      const el = this.cardsRef.nativeElement;
      const cards = el.querySelectorAll('.focus-card');

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%'
        }
      });
    }
  }
}
