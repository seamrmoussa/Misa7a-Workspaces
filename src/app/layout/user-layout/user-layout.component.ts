import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AsideComponent } from '../../features/aside/aside.component';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AsideComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent {}
