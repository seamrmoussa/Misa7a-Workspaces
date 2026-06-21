import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private readonly http = inject(HttpClient);

  createNewSR(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/contact-us`, data);
  }

  getAllRequestForAdmin(page: number, size: number = 20, sorts: string[] = []): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    let params = new HttpParams().set('page', page).set('size', size);

    sorts.forEach((sortItems) => {
      params = params.append('sort', sortItems);
    });

    return this.http.get('/api/v1/contact-us', { params, headers });
  }

  getRequestForOneUser(
    page: number = 0,
    userId: number,
    sorts: string[] = [],
    size: number = 10,
  ): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    let params = new HttpParams().set('page', page).set('size', size);

    sorts.forEach((sortItems) => {
      params = params.append('sort', sortItems);
    });

    return this.http.get(`/api/v1/contact-us/users/${userId}`, { params, headers });
  }

  getReqAsPerStatus(
    status: string,
    page: number = 0,
    size: number = 10,
    sort: string = 'createdOn,desc',
  ): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    const params = new HttpParams()
      .set('status', status)
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    return this.http.get('/api/v1/contact-us/status', { params, headers });
  }

  closeRequest(requestId: number): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });

    return this.http.patch(`/api/v1/contact-us/${requestId}/close`, {}, { headers });
  }
}
