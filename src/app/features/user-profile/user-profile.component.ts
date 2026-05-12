import { FlowbiteService } from '../../core/service/flowbite.service';
import { initFlowbite } from 'flowbite';
import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { UpdateUserDataService } from '../../core/service/update-user-data.service';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from '../../user-profile.interface';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly updateUserDataService = inject(UpdateUserDataService);
  private readonly toastrService = inject(ToastrService);
  private readonly authService = inject(AuthService);
  constructor(private flowbiteService: FlowbiteService) {}

  saveImg!: File;
  imgUrl = signal<string | ArrayBuffer | null | undefined>(null);
  userId = signal<number>(0);
  userProfileData = signal<UserProfile | null>(null);

  recentActivity = signal([
    {
      id: '#BK-9021',
      location: 'The Zenith Suite',
      room: 'Level 42, Sky Tower',
      date: 'Nov 24, 2024',
      time: '09:00 AM - 01:00 PM',
      status: 'Confirmed',
    },
    {
      id: '#BK-8845',
      location: 'Acoustic Pod B',
      room: 'Main Lobby Annex',
      date: 'Nov 21, 2024',
      time: '02:00 PM - 03:00 PM',
      status: 'Completed',
    },
    {
      id: '#BK-8712',
      location: 'The Glass Library',
      room: 'North Wing, Floor 2',
      date: 'Nov 18, 2024',
      time: '10:00 AM - 05:00 PM',
      status: 'Completed',
    },
  ]);

  ngOnInit() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });
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

  cancelUploadImg(): void {
    this.imgUrl.set(null);
  }
}
