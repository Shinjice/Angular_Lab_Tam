import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { TopNavbarComponent } from './shared/top-navbar/top-navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopNavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular_Lab_Tam';
}
