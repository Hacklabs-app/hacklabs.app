import { Component, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, NgOptimizedImage],
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
          <a href="#join" class="nav-link-cta">Join Us</a>
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

    .nav-links a.nav-link-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 2.6rem;
      padding: 0.65rem 1rem;
      border-radius: 999px;
      border: 1px solid rgba(0, 177, 153, 0.2);
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(0, 177, 153, 0.78));
      color: #000000 !important;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      box-shadow: 0 16px 30px -24px rgba(0, 177, 153, 0.8);
      text-shadow: none;
    }

    .nav-links a.nav-link-cta:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(0, 177, 153, 0.95));
      color: #000000 !important;
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
