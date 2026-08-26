import { Component } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Topnavbar } from '../../shared/topnavbar/topnavbar';

@Component({
  selector: 'app-home',
  imports: [Footer, Topnavbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
