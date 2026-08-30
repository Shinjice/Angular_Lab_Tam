import { Routes } from '@angular/router';

import { Login } from './features/login/login';
import { Home } from './features/home/home';
import { ForgotPassword } from './features/forgot-password/forgot-password';
import { Register } from './features/register/register';
import { AdminPanel } from './features/admin-panel/admin-panel';
import { Profile } from './features/profile/profile';

import { MainLayout } from './features/main-layout/main-layout';

import { adminGuard } from './core/guards/admin.guard';
import { authGuard, publicGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // =========================
  // PUBLIC ROUTES
  // =========================

  {
    path: 'login',
    component: Login,
    canActivate: [publicGuard],
  },

  {
    path: 'register',
    component: Register,
    canActivate: [publicGuard],
  },

  {
    path: 'forgot-password',
    component: ForgotPassword,
    canActivate: [publicGuard],
  },

  // =========================
  // AUTHENTICATED ROUTES
  // =========================

  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],

    children: [
      {
        path: 'home',
        component: Home,
      },

      {
        path: 'profile',
        component: Profile,
      },

      {
        path: 'admin',
        component: AdminPanel,
        canActivate: [adminGuard],
      },
    ],
  },

  // =========================
  // DEFAULT
  // =========================

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
