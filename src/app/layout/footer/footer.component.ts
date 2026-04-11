import { Component, input, InputSignal, signal } from '@angular/core';
import { FlowbiteService } from '../../core/service/flowbite.service';
import { initFlowbite } from 'flowbite';

import { MainLogoComponent } from '../../shared/ui/main-logo/main-logo.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [MainLogoComponent, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  currentYear = signal(new Date().getFullYear());

  userMode = input<'guest' | 'user' | 'admin'>('guest');

  guestLinks = signal({
    company: [
      { name: 'Our Location', router: '/home' },
      { name: 'Our Vision', router: '/home' },
    ],
    support: [
      { name: 'Contact Support', router: '/home' },
      { name: 'Privacy Policy', router: '/home' },
      { name: 'Terms of Service', router: '/home' },
    ],
  });

  userLinks = signal({
    platform: [
      { name: 'My Bookings', router: '/home' },
      { name: 'Wallet', router: '/home' },
    ],
    help: [
      { name: 'Help Center', router: '/home' },
      { name: 'Feedback', router: '/home' },
    ],
  });
}
