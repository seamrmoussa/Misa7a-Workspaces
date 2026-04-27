import { Component, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-registration',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  registrationForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    jobTitle: ['', [Validators.required, Validators.minLength(3)]],
    companyName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9].*[0-9])[a-zA-Z0-9]{8,14}$/),
      ],
    ],
  });

  showPassword(element: HTMLInputElement): void {
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  }

  submitForm(): void {
    if (this.registrationForm.valid) {
      this.authService.signUp(this.registrationForm.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
