import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-general-layout',
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './general-layout.component.html',
  styleUrl: './general-layout.component.css',
})
export class GeneralLayoutComponent {}
