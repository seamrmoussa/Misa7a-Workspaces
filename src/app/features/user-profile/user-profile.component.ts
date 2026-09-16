import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { UpdateUserDataService } from '../../core/service/update-user-data.service';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from '../../user-profile.interface';
import { AuthService } from '../../core/auth/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForgotPassService } from '../../core/auth/services/forgot-pass.service';
import { ResetPassword } from '../../reset-password.interface';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly fb = inject(FormBuilder);
  private readonly updateUserDataService = inject(UpdateUserDataService);
  private readonly toastrService = inject(ToastrService);
  private readonly authService = inject(AuthService);
  private readonly forgotPassService = inject(ForgotPassService);

  saveImg!: File;
  imgUrl = signal<string | ArrayBuffer | null | undefined>(null);
  userId = signal<number>(0);
  userProfileData = signal<UserProfile | null>(null);
  showModalEditProfileData = signal<boolean>(false);
  private token = signal<string | null>(null);
  private initialRestPassData = signal<ResetPassword>({
    token: '',
    newPassword: '',
  });
  readonly roleType = computed<string>(() => this.authService.tokenData()?.roles[0]);

  updateUserData: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    jobTitle: ['', [Validators.required, Validators.minLength(3)]],
    companyName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{5,14}$/)]],
  });

  ngOnInit() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.token.set(localStorage.getItem('misa7aUserToken'));
      this.userId.set(Number(localStorage.getItem('misa7aUserId')));
      const userLocalData = localStorage.getItem('userProfileData');
      if (userLocalData) {
        this.userProfileData.set(JSON.parse(userLocalData));
      }

      if (!this.userProfileData()) {
        this.showImg(this.userId());
      }
    }
  }

  showImg(userId: number): void {
    this.updateUserDataService.getUserData(userId).subscribe({
      next: (res) => {
        this.userProfileData.set(res.data);
        localStorage.setItem('userProfileData', JSON.stringify(res.data));
        this.authService.trigger.set(true);
      },
      error: (err) => {
        console.error('Failed to get user data, so nothing is saved in localStorage:', err);
      },
    });
  }

  changeImg(e: Event): void {
    const inputImg = e.target as HTMLInputElement;
    if (inputImg.files) {
      this.saveImg = inputImg.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.saveImg);
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        this.imgUrl.set(e.target?.result);
      };
    }
  }

  uploadImg(): void {
    if (this.userId() !== 0 && this.saveImg) {
      this.updateUserDataService.upDateAvatar(this.userId(), this.saveImg).subscribe({
        next: (res) => {
          this.toastrService.success('Image uploaded successfully');
          this.imgUrl.set(null);
          this.showImg(this.userId());
        },
      });
    }
  }

  completeUpdateUserData() {
    if (this.updateUserData.valid) {
      this.updateUserDataService
        .updateUserData(this.userId(), this.updateUserData.value)
        .subscribe({
          next: (res) => {
            this.updateUserData.reset();
            this.toastrService.success('Your data has been successfully updated.');
            console.log(res.data);
            this.closeModalToEditProfileData();
            this.showImg(this.userId());
          },
          error: (err) => {
            this.toastrService.success(err.message);
          },
        });
    } else {
      this.updateUserData.markAllAsTouched();
    }
  }

  showPassword(element: HTMLInputElement) {
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  }

  cancelUploadImg(): void {
    this.imgUrl.set(null);
  }

  showModalToEditProfileData() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const userLocalData = localStorage.getItem('userProfileData');
      if (userLocalData) {
        this.userProfileData.set(JSON.parse(userLocalData));
      }
    }

    this.updateUserData.patchValue(this.userProfileData()!);
    this.showModalEditProfileData.set(true);
  }

  closeModalToEditProfileData() {
    this.showModalEditProfileData.set(false);
  }
}
