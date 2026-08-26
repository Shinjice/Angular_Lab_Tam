import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Home } from './features/home/home';
import { ForgotPassword } from './features/forgot-password/forgot-password';
import { Register } from './features/register/register';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard, publicGuard } from './core/guards/auth.guard';
import { AdminPanel } from './features/admin-panel/admin-panel';

export const routes: Routes = [
  // Public routes (redirect to home if already logged in)
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

  // Protected routes (require authentication)
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
  },

  // Admin routes (require admin role)
  {
    path: 'admin',
    component: AdminPanel,
    canActivate: [adminGuard],
  },

  // Default redirect
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
