import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.get(`${environment.baseUrl}/api/v1/users/me`, { params: parameter });
  }

  upDateAvatar(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${environment.baseUrl}/api/v1/users/${userId}/avatar`, formData);
  }

  updateUserData(userId: number, data: object): Observable<any> {
    const parameter = new HttpParams().set('userId', userId);
    return this.http.put(`/api/v1/users/update`, data, {
      params: parameter,
    });
  }

  confirmDeleteUserAccount(userId: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v1/users/delete/${userId}`);
  }
}
