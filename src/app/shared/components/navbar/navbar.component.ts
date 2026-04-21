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
          <img ngSrc="assets/logo.svg" width="560" height="140" alt="Hacklabs" class="nav-logo">
        </a>

        <div class="nav-links">
          <a href="#resources">Resources</a>
          <a href="#join" class="nav-link-cta">Join Us</a>
        </div>

        <button class="nav-toggle" type="button" (click)="toggleMenu()" [attr.aria-expanded]="isMenuOpen()" aria-label="Toggle navigation menu">
          <lucide-icon [name]="isMenuOpen() ? 'x' : 'menu'" [size]="24"></lucide-icon>
        </button>
      </div>

      @if (isMenuOpen()) {
        <button
          class="nav-backdrop"
          type="button"
          (click)="toggleMenu()"
          aria-label="Close navigation menu">
        </button>

        <div class="nav-drawer-wrap">
          <div class="nav-drawer">
            <p class="nav-drawer-label">Navigate</p>
            <a href="#resources" (click)="toggleMenu()">Resources</a>
            <a href="#join" (click)="toggleMenu()" class="nav-drawer-cta">Join Us</a>
          </div>
        </div>
      }
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

    .nav-links a,
    .nav-drawer a {
      color: #b0b8ba;
      text-decoration: none;
      font-size: 0.92rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .nav-links a:hover,
    .nav-drawer a:hover {
      color: #fff;
    }

    .nav-links a.nav-link-cta,
    .nav-drawer a.nav-drawer-cta {
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

    .nav-links a.nav-link-cta:hover,
    .nav-drawer a.nav-drawer-cta:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(0, 177, 153, 0.95));
      color: #000000 !important;
    }

    .nav-toggle {
      display: none;
      width: 2.8rem;
      height: 2.8rem;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      color: #fff;
      cursor: pointer;
    }

    .nav-backdrop {
      position: fixed;
      inset: 0;
      border: 0;
      background: rgba(2, 4, 4, 0.58);
      backdrop-filter: blur(8px);
    }

    .nav-drawer-wrap {
      position: fixed;
      top: 5.9rem;
      left: 0;
      width: 100%;
      padding: 0 1rem;
      z-index: 1;
      pointer-events: none;
    }

    .nav-drawer {
      width: min(100%, 76rem);
      margin: 0.6rem auto 0;
      display: grid;
      gap: 0.8rem;
      padding: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.45rem;
      background: linear-gradient(180deg, rgba(10, 12, 12, 0.98), rgba(5, 7, 7, 0.96));
      backdrop-filter: blur(18px);
      box-shadow:
        0 24px 50px -28px rgba(0, 0, 0, 0.95),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
      pointer-events: auto;
      animation: navDrawerIn 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .nav-drawer-label {
      margin: 0 0 0.15rem;
      color: var(--color-brand-primary);
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .nav-drawer a {
      min-height: 3.4rem;
      padding: 0.9rem 1rem;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.03);
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .nav-drawer a:hover {
      border-color: rgba(255, 255, 255, 0.14);
      background: rgba(255, 255, 255, 0.05);
    }

    .nav-drawer a.nav-drawer-cta {
      justify-content: center;
      margin-top: 0.25rem;
    }

    @media (max-width: 48rem) {
      .nav-links {
        display: none;
      }

      .nav-toggle {
        display: inline-flex;
      }
    }

    @keyframes navDrawerIn {
      from {
        opacity: 0;
        transform: translateY(-10px) scale(0.98);
      }

      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `]
})
export class NavbarComponent {
  readonly isScrolled = signal(false);
  readonly isMenuOpen = signal(false);

  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }
}
