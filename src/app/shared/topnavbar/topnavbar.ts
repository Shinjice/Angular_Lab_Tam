import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Logo } from './logo/logo';
import { Navigation } from './navigation/navigation';
import { ProfileMenu } from './profile-menu/profile-menu';

@Component({
  selector: 'app-topnavbar',
  imports: [Logo, Navigation, ProfileMenu],
  templateUrl: './topnavbar.html',
  styleUrl: './topnavbar.css',
})
export class Topnavbar {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
