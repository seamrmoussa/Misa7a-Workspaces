import { Component, effect, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-general-layout',
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './general-layout.component.html',
  styleUrl: './general-layout.component.css',
})
export class GeneralLayoutComponent implements OnInit {
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);
  isLoggedIn = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.authService.trigger()) {
        if (isPlatformBrowser(this.pLATFORM_ID)) {
          this.updateProfileList();
        }
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.updateProfileList();
    }
  }

  updateProfileList() {
    if (localStorage.getItem('misa7aUserToken')) {
      this.isLoggedIn.set(true);
    } else {
      this.isLoggedIn.set(false);
    }
  }
}
