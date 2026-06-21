import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private expirationTimer: any;
  readonly tokenData = signal<any>(null);
  trigger = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.decodeUserToken();
    }
  }

  decodeUserToken(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const enCodedToken = localStorage.getItem('misa7aUserToken');
      if (enCodedToken) {
        try {
          const decodedToken = jwtDecode(enCodedToken);
          this.tokenData.set(decodedToken);
          this.autoLogout(this.tokenData().exp);
        } catch (error) {
          this.logoutUser();
        }
      }
    }
  }

  signUp(data: object): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/v1/users/register', data, {});
  }

  signIn(data: object): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/v1/auth/login', data, {});
  }

  logoutUser(): void {
    localStorage.removeItem('misa7aUserToken');
    localStorage.removeItem('misa7aUserId');
    localStorage.removeItem('userProfileData');
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.router.navigate(['/loggedout']);
  }

  autoLogout(expTime: number): void {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeRemaining = expTime - currentTime;
    if (timeRemaining <= 0) {
      this.logoutUser();
      return;
    }

    if (isPlatformBrowser(this.pLATFORM_ID)) {
      if (this.expirationTimer) {
        clearTimeout(this.expirationTimer);
      }

      this.expirationTimer = setTimeout(() => {
        this.logoutUser();
      }, timeRemaining * 1000);
    }
  }
}
