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
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '69420');
    return this.http.get(`/api/v1/users/me`, { params: parameter, headers: headers });
  }

  upDateAvatar(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${environment.baseUrl}/api/v1/users/${userId}/avatar`, formData);
  }
}
