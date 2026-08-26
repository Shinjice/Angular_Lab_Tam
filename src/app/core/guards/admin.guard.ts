import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Protects routes that require admin role
export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Wait for auth to finish loading
  let attempts = 0;
  while (authService.loading() && attempts < 50) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    attempts++;
  }

  // Check if user is authenticated
  if (!authService.currentUser()) {
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  // Check if user has admin role
  const user = authService.currentUser();
  if (user && user.role === 'Admin') {
    return true;
  }

  // User is authenticated but not an admin
  console.warn('Access denied: User does not have admin role');
  router.navigate(['/home']);
  return false;
};
