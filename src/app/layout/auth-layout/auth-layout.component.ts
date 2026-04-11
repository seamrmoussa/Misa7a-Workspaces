import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthFooterComponent } from '../auth-footer/auth-footer.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthFooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {}
