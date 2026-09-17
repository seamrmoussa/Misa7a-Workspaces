import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { UpdateUserDataService } from '../../core/service/update-user-data.service';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from '../../user-profile.interface';
import { AuthService } from '../../core/auth/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatedService } from '../../core/service/rated.service';

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
  private readonly ratedService = inject(RatedService);

  private readonly userId = signal<number>(0);

  saveImg!: File;
  imgUrl = signal<string | ArrayBuffer | null | undefined>(null);
  userProfileData = signal<UserProfile | null>(null);
  showModalEditProfileData = signal<boolean>(false);
  showModalDeleteUser = signal<boolean>(false);
  showRateModal = signal<boolean>(false);
  private token = signal<string | null>(null);

  private readonly roleType = computed<string[]>(() => this.authService.tokenData()?.roles ?? []);

  readonly roleNow = computed<string>(() => {
    const rolesList = this.roleType();

    if (rolesList.some((role: string) => role.toLowerCase().includes('admin'))) {
      return 'ADMIN';
    }
    if (rolesList.some((role: string) => role.toLowerCase().includes('staff'))) {
      return 'STAFF';
    }
    return 'MEMBER';
  });

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

  formRatedBooking: FormGroup = this.fb.group({
    userId: [0, [Validators.required]],
    rating: [5, [Validators.required]],
    title: ['Great workspace', [Validators.required]],
    body: ['', [Validators.required]],
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
        next: () => {
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

  createReview() {
    if (this.formRatedBooking.valid) {
      this.ratedService.sendRated(this.formRatedBooking.value).subscribe({
        next: () => {
          this.toastrService.success('Your rating has been submitted successfully.');
          this.formRatedBooking.reset();
          this.closeRatedModal();
        },
      });
    }
  }

  deleteUserAccount() {
    if (this.userId()) {
      this.updateUserDataService.confirmDeleteUserAccount(this.userId()).subscribe({
        next: () => {
          this.toastrService.success(
            'Your account has been successfully deleted. See you again soon.',
          );
          this.authService.logoutUser();
        },
      });
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

  openModalToDeleteUser() {
    this.showModalDeleteUser.set(true);
  }

  closeModalToDeleteUser() {
    this.showModalDeleteUser.set(false);
  }

  openRatedModal() {
    this.formRatedBooking.patchValue({
      userId: Number(this.userId()),
    });

    this.showRateModal.set(true);
  }

  closeRatedModal() {
    this.showRateModal.set(false);
  }
}
