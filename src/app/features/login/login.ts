import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  email = '';
  password = '';
  error = signal<string>('');
  loading = signal<boolean>(false);

  private returnUrl: string = '/home';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    // Get return URL from query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  async onSubmit() {
    if (!this.email || !this.password) {
      this.error.set('Please fill in all fields');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    try {
      await this.authService.signIn(this.email, this.password);
      // AuthService handles navigation
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }

  async signInWithGoogle() {
    this.loading.set(true);
    this.error.set('');

    try {
      await this.authService.signInWithGoogle();
      // AuthService handles navigation
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }
}
