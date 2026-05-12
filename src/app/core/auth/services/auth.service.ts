import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  trigger = signal<boolean>(false);

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
    this.router.navigate(['/loggedout']);
  }
}
