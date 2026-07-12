import { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

export const SHELL_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'activity',
        loadComponent: () =>
          import('../activity/activity.component').then((m) => m.ActivityComponent),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('../account/account.component').then((m) => m.AccountComponent),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
