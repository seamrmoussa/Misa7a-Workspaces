import {
  Component,
  computed,
  effect,
  inject,
  model,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { FlowbiteService } from '../../core/service/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainLogoComponent } from '../../shared/ui/main-logo/main-logo.component';
import { AuthService } from '../../core/auth/services/auth.service';
import { UserProfile } from '../../user-profile.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MainLogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);

  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  paths = signal<string[]>(['home', 'booking', 'gallery', 'review', 'contact-us', 'Location']);
  isUserLoggedIn = model<boolean>(false);
  userProfileData = signal<UserProfile | null>(null);
  readonly roleType = computed<string>(() => this.authService.tokenData()?.roles[0]);

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
        this.authService.decodeUserToken();
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
        this.updateNameProfile();
      });
    }
  }

  updateNameProfile() {
    const userLocalData = localStorage.getItem('userProfileData');
    if (userLocalData) {
      this.userProfileData.set(JSON.parse(userLocalData));
    }
  }

  logout(): void {
    this.isUserLoggedIn.set(false);
    this.authService.logoutUser();
  }
}
