import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <footer class="footer-shell">
      <div class="footer-inner">
        <div class="footer-brand">
          <img ngSrc="assets/logo.svg" width="640" height="160" alt="Hacklabs" class="footer-logo">
        </div>
        
        <div class="footer-links">
          <a href="https://github.com/hacklabs-app" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/orgs/Hacklabs-app/discussions" target="_blank" rel="noreferrer">Discussions</a>
          <a href="https://hacklabs.app">Waitlist</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      width: 100%;
      display: block;
    }

    .footer-shell {
      width: 100%;
      padding: 0.75rem 1.5rem 1.5rem;
    }

    .footer-inner {
      width: min(100%, 76rem);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.5rem;
      background: rgba(10, 12, 12, 0.82);
      backdrop-filter: blur(16px);
    }

    .footer-brand {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
    }

    .footer-logo {
      width: auto;
      height: 4.75rem;
      max-width: none;
      opacity: 0.92;
    }

    .footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    .footer-links a {
      color: #9ca5a8;
      text-decoration: none;
      font-size: 0.92rem;
      font-weight: 600;
    }

    .footer-links a:hover {
      color: #fff;
    }

    @media (max-width: 48rem) {
      .footer-inner {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }

      .footer-logo {
        height: 4rem;
      }
    }
  `]
})
export class FooterComponent {}
