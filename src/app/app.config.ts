import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { LucideAngularModule, Menu, X, Server, Cpu, BrainCircuit, Cloud, Users, ShieldCheck, Play, Github, MessageSquare, ArrowRight } from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    importProvidersFrom(LucideAngularModule.pick({ Menu, X, Server, Cpu, BrainCircuit, Cloud, Users, ShieldCheck, Play, Github, MessageSquare, ArrowRight }))
  ]
};
