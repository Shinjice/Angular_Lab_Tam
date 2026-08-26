import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserRegistration } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
})
export class Register {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = signal<string>('');
  loading = signal<boolean>(false);

  constructor(private authService: AuthService) {}

  async onSubmit() {
    // Validation
    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      this.error.set('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error.set('Passwords do not match');
      return;
    }

    if (this.password.length < 6) {
      this.error.set('Password must be at least 6 characters');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    try {
      const registration: UserRegistration = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      };

      await this.authService.register(registration);
      // AuthService handles navigation
    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.loading.set(false);
    }
  }
}
