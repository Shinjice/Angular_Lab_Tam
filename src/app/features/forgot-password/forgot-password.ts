import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  email = '';
  error = signal<string>('');
  success = signal<boolean>(false);
  loading = signal<boolean>(false);

  constructor(private authService: AuthService) {}

  async onSubmit() {
    if (!this.email) {
      this.error.set('Please enter your email');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set(false);

    try {
      await this.authService.resetPassword(this.email);
      this.success.set(true);
      this.email = '';
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }
}
