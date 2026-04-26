import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  private readonly fb = inject(FormBuilder);

  registrationForm: FormGroup = this.fb.group(
    {
      fullName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\u0621-\u064A ]*$/),
          Validators.minLength(3),
          Validators.maxLength(35),
        ],
      ],
      userName: [''],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9].*[0-9])[a-zA-Z0-9]{8,14}$/),
        ],
      ],
      rePassword: ['', Validators.required],
      terms: [false, Validators.required],
    },
    { validators: [this.confirmPassword] },
  );

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    if (rePassword !== password && rePassword !== '') {
      group.get('rePassword')?.setErrors({ mismatch: true });

      return { mismatch: true };
    }
    return null;
  }

  submitForm(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
