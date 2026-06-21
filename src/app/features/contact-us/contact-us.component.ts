import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactUsService } from '../../core/service/contact-us.service';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  private readonly contactUsService = inject(ContactUsService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly fb = inject(FormBuilder);

  private readonly userId = signal<number>(0);

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const userId = localStorage.getItem('misa7aUserId');
      if (userId) {
        this.userId.set(Number(userId));
      }
    }
  }

  formContactUs: FormGroup = this.fb.group({
    userId: [this.userId(), [Validators.required, Validators.minLength(3)]],
    customerName: ['', [Validators.required, Validators.minLength(3)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  isLoggedInUser() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const userId = localStorage.getItem('misa7aUserId');
      if (userId) {
        this.submitForm();
      } else {
        this.router.navigate(['/login']);
        this.toastrService.warning('Please logIn first');
      }
    }
  }

  submitForm() {
    this.formContactUs.patchValue({ userId: this.userId() });
    if (this.formContactUs.valid) {
      this.contactUsService.createNewSR(this.formContactUs.value).subscribe({
        next: () => {
          this.toastrService.success(
            'Your request has been successfully submitted, and you will be contacted if necessary.',
          );
          this.formContactUs.reset();
        },
      });
    } else {
      this.formContactUs.markAllAsTouched();
    }
  }
}
