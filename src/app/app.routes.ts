import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/onboarding/splash.component').then((m) => m.SplashComponent),
  },
  {
    path: 'onboarding',
    loadComponent: () =>
      import('./features/onboarding/onboarding.component').then((m) => m.OnboardingComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./features/shell/shell.routes').then((m) => m.SHELL_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
