import { Component, signal } from '@angular/core';
import { MainLogoComponent } from '../../shared/ui/main-logo/main-logo.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-footer',
  imports: [MainLogoComponent, RouterLink],
  templateUrl: './auth-footer.component.html',
  styleUrl: './auth-footer.component.css',
})
export class AuthFooterComponent {
  currentYear = signal(new Date().getFullYear());
}
