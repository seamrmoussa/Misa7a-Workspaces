import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainButtonComponent } from '../../shared/ui/main-button/main-button.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MainButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
