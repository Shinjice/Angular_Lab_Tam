import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  imports: [],
  templateUrl: './profile-menu.html',
  styleUrl: './profile-menu.css',
})
export class ProfileMenu {
  constructor(public authService: AuthService) {}

  theme = 'light';

  setTheme(theme: string) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }
}
