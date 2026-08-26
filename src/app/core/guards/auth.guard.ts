import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Protects routes that require authentication
export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Wait for auth to finish loading
  let attempts = 0;
  while (authService.loading() && attempts < 50) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    attempts++;
  }

  if (authService.currentUser()) {
    return true;
  }

  // Redirect to login with return URL
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};

// Prevents authenticated users from accessing auth pages
export const publicGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Wait for auth to finish loading
  let attempts = 0;
  while (authService.loading() && attempts < 50) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    attempts++;
  }

  if (!authService.currentUser()) {
    return true;
  }

  // Already logged in, redirect to home
  router.navigate(['/home']);
  return false;
};
