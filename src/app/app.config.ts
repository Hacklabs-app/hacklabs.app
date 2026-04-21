import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom, PLATFORM_ID, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

import { LucideAngularModule, Menu, X, Server, Cpu, BrainCircuit, Cloud, Users, ShieldCheck, Play, Github, MessageSquare, ArrowRight } from 'lucide-angular';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    importProvidersFrom(LucideAngularModule.pick({ Menu, X, Server, Cpu, BrainCircuit, Cloud, Users, ShieldCheck, Play, Github, MessageSquare, ArrowRight })),
    
    // Only provide Firebase in the browser
    provideFirebaseApp(() => {
      const platformId = inject(PLATFORM_ID);
      if (isPlatformBrowser(platformId)) {
        return initializeApp(environment.firebase);
      }
      return null as any;
    }),
    provideFirestore(() => {
      const platformId = inject(PLATFORM_ID);
      if (isPlatformBrowser(platformId)) {
        return getFirestore();
      }
      return null as any;
    })
  ]
};
