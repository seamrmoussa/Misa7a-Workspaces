import { Component, inject, signal, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  registerSubscription = signal<Subscription>(new Subscription());

  registrationForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    jobTitle: ['', [Validators.required, Validators.minLength(3)]],
    companyName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{5,14}$/)]],
  });

  showPassword(element: HTMLInputElement): void {
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  }

  submitForm(): void {
    this.registerSubscription().unsubscribe();

    if (this.registrationForm.valid) {
      this.registerSubscription.set(
        this.authService.signUp(this.registrationForm.value).subscribe({
          next: (res) => {
            this.toastrService.success('Your account has been successfully created');
            this.router.navigate(['/login']);
          },
        }),
      );
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
