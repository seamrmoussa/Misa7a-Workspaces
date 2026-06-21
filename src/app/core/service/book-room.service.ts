import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookRoomService {
  private readonly http = inject(HttpClient);
  private readonly toastrService = inject(ToastrService);

  headers = new HttpHeaders({
    'ngrok-skip-browser-warning': '69420',
  });

  checkAvailabilityRoomId(dataToCheck: any, roomId: number): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });

    const params = new HttpParams()
      .set('workspaceId', roomId)
      .set('startDatetime', new Date(dataToCheck.startTimeSelected).toISOString())
      .set('endDatetime', new Date(dataToCheck.endTimeSelected).toISOString());
    return this.http.get('/api/v1/bookings/availability', { params, headers });
  }

  checkAvailabilityRoomByDate(dataToCheck: any): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });

    const params = new HttpParams()
      .set('startDatetime', new Date(dataToCheck.startTimeSelected).toISOString())
      .set('endDatetime', new Date(dataToCheck.endTimeSelected).toISOString());
    return this.http.get('/api/v1/workspaces/available', { params, headers });
  }

  getAllMyPrevBookings(
    userId: string,
    page: number,
    size: string = '10',
    sort: string = 'id,desc',
  ): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    const params = new HttpParams().set('page', page).set('size', size).set('sort', sort);
    return this.http.get(`/api/v1/bookings/users/${userId}`, { params, headers });
  }

  confirmBooking(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/bookings`, data);
  }

  cancelBooking(bookingId: number, data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/bookings/${bookingId}/cancel`, data);
  }
}
