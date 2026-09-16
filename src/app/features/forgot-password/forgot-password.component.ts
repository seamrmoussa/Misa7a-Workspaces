import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ForgotPassService } from '../../core/auth/services/forgot-pass.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResetPassword } from '../../reset-password.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  private readonly forgotPassService = inject(ForgotPassService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);


  private  token = signal<string | null>(null);
  private  initialRestPassData = signal<ResetPassword>({
    token: '',
    newPassword: '',
  });
  isRestStep = signal<boolean>(false);
  submitEmailSubscription = signal<Subscription>(new Subscription());
  restPassSubscription = signal<Subscription>(new Subscription());
  
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  newPassword: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{5,14}$/),]);

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.token.set(params.get('token'));
      if (this.token()) {
        this.isRestStep.set(true);
      } else {
        this.isRestStep.set(false);
      }
    });
  }

  submitSendEmail(e: Event): void {
    e.preventDefault();
    this.submitEmailSubscription().unsubscribe();
    if (this.email.valid) {
      this.submitEmailSubscription.set(
        this.forgotPassService.submitEmail(this.email.value).subscribe({
          next: () => {
            this.email.reset();
            this.toastrService.success('An email has been sent to your registered account.');
          },
        }),
      );
    }
  }

  submitResetPass(e: Event): void {
    e.preventDefault();
    this.restPassSubscription().unsubscribe();
    this.initialRestPassData.set({
      token: this.token()!,
      newPassword: this.newPassword.value,
    });
    if (this.newPassword.valid && this.token()) {
      this.restPassSubscription.set(
        this.forgotPassService.restPass(this.initialRestPassData()).subscribe({
          next: () => {
            this.newPassword.reset();
            this.toastrService.success('The password has been changed.');
            this.initialRestPassData.update(() => ({
              token: '',
              newPassword: '',}));
              this.router.navigate(['/login']);
            },
            error:()=>{
              this.toastrService.success('Error Changing Password.');
          }
        }),
      );
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
