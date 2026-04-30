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
