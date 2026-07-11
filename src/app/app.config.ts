import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

const PgePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#E8FAF0', 100: '#C6F2DB', 200: '#9FE9C3', 300: '#6FDDA5',
      400: '#43D384', 500: '#17C964', 600: '#12A150', 700: '#0E7F40',
      800: '#0A5D2F', 900: '#063D1F', 950: '#032312',
    },
    colorScheme: {
      dark: {
        surface: {
          0: '#FFFFFF', 50: '#F7F7F7', 100: '#E5E5E5', 200: '#D4D4D4',
          300: '#BDBDBD', 400: '#9E9E9E', 500: '#7C7C7C', 600: '#4A4A4A',
          700: '#2E2E2E', 800: '#232323', 900: '#1A1A1A', 950: '#121212',
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: PgePreset,
        options: { darkModeSelector: '.pge-dark' },   // dark ativado pela classe que pusemos no <html>
      },
    }),
  ],
}
