import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};

const firebaseConfig = {
  apiKey: 'AIzaSyA6iwkDbiI4B5lGlBVRgVx6FWlobrGLbmM',
  authDomain: 'angular-lab-tam.firebaseapp.com',
  projectId: 'angular-lab-tam',
  storageBucket: 'angular-lab-tam.firebasestorage.app',
  messagingSenderId: '1024458928432',
  appId: '1:1024458928432:web:e3fcd486c805a2cec258f5',
  measurementId: 'G-N41K86GGQR',
};
