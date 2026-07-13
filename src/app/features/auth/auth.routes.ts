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
  {
    path: 'otp',
    loadComponent: () =>
      import('./otp.component').then((m) => m.OtpComponent),
  },
  {
    path: 'complete-profile',
    loadComponent: () =>
      import('./complete-profile.component').then((m) => m.CompleteProfileComponent),
  },
];
