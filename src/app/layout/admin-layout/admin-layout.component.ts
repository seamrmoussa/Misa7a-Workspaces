import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AsideComponent } from '../../features/aside/aside.component';

@Component({
  selector: 'app-admin-layout',
  imports: [NavbarComponent, FooterComponent, RouterOutlet, AsideComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {}
