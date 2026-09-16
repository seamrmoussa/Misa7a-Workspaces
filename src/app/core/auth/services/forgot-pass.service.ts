import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotPassService {
  private readonly http = inject(HttpClient);

  submitEmail(userEmail: string): Observable<any> {
    const parameter = new HttpParams().set('email', userEmail);
    return this.http.post(
      `${environment.baseUrl}/api/v1/auth/forgot-password`,
      {},
      { params: parameter },
    );
  }

 restPass(data: object): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/v1/auth/reset-password', data);
  }


}
