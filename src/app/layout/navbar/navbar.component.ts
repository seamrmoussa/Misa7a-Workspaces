import {
  Component,
  effect,
  inject,
  input,
  model,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { FlowbiteService } from '../../core/service/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainButtonComponent } from '../../shared/ui/main-button/main-button.component';
import { MainLogoComponent } from '../../shared/ui/main-logo/main-logo.component';
import { AuthService } from '../../core/auth/services/auth.service';
import { UserProfile } from '../../user-profile.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MainButtonComponent, MainLogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);

  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  paths = signal<string[]>(['home', 'booking', 'plans', 'gallery', 'review', 'contact-us', 'help']);
  notificationBasePath = input<string>();
  notificationLoggedIn = model<boolean>(false);
  userProfileData = signal<UserProfile | null>(null);

  classesProfile: string[] = [
    'bg-white',
    'border',
    'border-gray-100',
    'shadow-sm',
    'rounded-xl',
    'scale-[1.05]',
  ];

  classesAsideActiveLinks: string[] = [
    'font-bold',
    'text-mainColorDark',
    'bg-white',
    'border',
    'border-gray-100',
    'shadow-sm',
    'rounded-xl',
  ];

  constructor(private flowbiteService: FlowbiteService) {
    effect(() => {
      if (this.authService.trigger()) {
        this.updateNameProfile();
        this.authService.trigger.set(false);
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });
      this.updateNameProfile();
    }
  }

  updateNameProfile() {
    const userLocalData = localStorage.getItem('userProfileData');
    if (userLocalData) {
      this.userProfileData.set(JSON.parse(userLocalData));
    }
  }

  logout(): void {
    this.notificationLoggedIn.set(false);
    this.authService.logoutUser();
  }
}
