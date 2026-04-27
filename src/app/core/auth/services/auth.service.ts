import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  signUp(data: object): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/v1/users/register', data);
  }

  signIn(data: object): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/v1/auth/login', data);
  }
}
