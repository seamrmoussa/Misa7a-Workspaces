import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserDataService {
  private readonly http = inject(HttpClient);

  getUserData(userId: number): Observable<any> {
    const parameter = new HttpParams().set('userId', userId);
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(`/api/v1/users/me`, { params: parameter, headers });
  }

  upDateAvatar(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${environment.baseUrl}/api/v1/users/${userId}/avatar`, formData);
  }

  updateUserData(userId: number, data: object): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    const parameter = new HttpParams().set('userId', userId);
    return this.http.put(`/api/v1/users/update`, data, {
      params: parameter,
      headers,
    });
  }
}
