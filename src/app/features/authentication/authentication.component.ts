import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authentication',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
})
export class AuthenticationComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  loginSubscription = signal<Subscription>(new Subscription());

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9].*[0-9])[a-zA-Z0-9]{8,14}$/),
      ],
    ],
  });

  sendLoginData(): void {
    this.loginSubscription().unsubscribe();

    if (this.loginForm.valid) {
      this.loginSubscription.set(
        this.authService.signIn(this.loginForm.value).subscribe({
          next: (res) => {
            localStorage.setItem('misa7aUserToken', res.data.data.token);
            this.router.navigate(['/user/user-profile']);
          },
        }),
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  showPassword(element: HTMLInputElement): void {
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  }
}
