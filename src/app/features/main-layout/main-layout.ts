import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topnavbar } from '../../shared/topnavbar/topnavbar';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Topnavbar, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
