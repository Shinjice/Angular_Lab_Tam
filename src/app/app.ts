import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topnavbar } from './shared/topnavbar/topnavbar';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Angular_Lab_Tam');
}
