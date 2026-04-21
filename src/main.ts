import { bootstrapApplication } from '@angular/platform-browser';
import { mergeApplicationConfig } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';
import { App } from './app/app';

const browserConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ]
});

bootstrapApplication(App, browserConfig)
  .catch((err) => console.error(err));
