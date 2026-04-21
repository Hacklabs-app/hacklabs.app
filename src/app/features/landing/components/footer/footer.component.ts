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
          <img ngSrc="assets/logo.svg" width="1024" height="768" alt="Hacklabs" class="footer-logo">
        </div>
        
        <div class="footer-links">
          <a href="https://github.com/hacklabs-app" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/orgs/Hacklabs-app/discussions" target="_blank" rel="noreferrer">Discussions</a>
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
      padding: 0.25rem 1.5rem 0;
    }

    .footer-inner {
      width: min(100%, 76rem);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      padding: 0;
    }

    .footer-brand {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
    }

    .footer-logo {
      width: auto;
      height: 16rem;
      max-width: none;
      opacity: 0.95;
      margin-bottom: -1.5rem;
    }

    .footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    .footer-links a {
      color: #7c8689;
      text-decoration: none;
      font-size: 0.88rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .footer-links a:hover {
      color: #fff;
    }

    @media (max-width: 48rem) {
      .footer-inner {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 0;
      }

      .footer-logo {
        height: 12rem;
        margin-bottom: -1rem;
      }
    }
  `]
})
export class FooterComponent {}
