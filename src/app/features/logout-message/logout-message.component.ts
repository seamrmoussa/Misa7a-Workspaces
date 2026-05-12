import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-logout-message',
  imports: [RouterLink],
  templateUrl: './logout-message.component.html',
  styleUrl: './logout-message.component.css',
})
export class LogoutMessageComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  private timeOutId = signal<any>(null);

  ngOnInit(): void {
    this.toHome();
  }

  toHome(): void {
    this.timeOutId.set(
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 5000),
    );
  }

  ngOnDestroy(): void {
    if (this.timeOutId()) {
      clearTimeout(this.timeOutId());
    }
  }
}
