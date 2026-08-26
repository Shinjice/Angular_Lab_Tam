import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topnavbar',
  imports: [],
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
