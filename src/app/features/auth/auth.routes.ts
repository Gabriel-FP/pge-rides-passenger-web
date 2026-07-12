import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'get-started' },
  {
    path: 'get-started',
    loadComponent: () =>
      import('./get-started.component').then((m) => m.GetStartedComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./sign-up.component').then((m) => m.SignUpComponent),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./sign-in.component').then((m) => m.SignInComponent),
  },
];
