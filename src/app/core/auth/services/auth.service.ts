import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly ngrokHeaders = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true',
  });

  signUp(data: object): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/v1/users/register', data, {
      headers: this.ngrokHeaders,
    });
  }

  signIn(data: object): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/v1/auth/login', data, {
      headers: this.ngrokHeaders,
    });
  }

  logoutUser(): void {
    localStorage.removeItem('misa7aUserToken');
    this.router.navigate(['/home']);
  }
}
