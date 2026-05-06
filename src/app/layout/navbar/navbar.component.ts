import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FlowbiteService } from '../../core/service/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainButtonComponent } from '../../shared/ui/main-button/main-button.component';
import { MainLogoComponent } from '../../shared/ui/main-logo/main-logo.component';
import { AuthService } from '../../core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MainButtonComponent, MainLogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  paths = signal<string[]>(['home', 'booking', 'plans', 'gallery', 'review', 'contact-us', 'help']);

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

  notificationBasePath = input<string>();
  notificationLoggedIn = input<boolean>(false);

  logout(): void {
    (this, this.authService.logoutUser());
  }
}
