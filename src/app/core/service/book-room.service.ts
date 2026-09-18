import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookRoomService {
  private readonly http = inject(HttpClient);

  checkAvailabilityRoomId(dataToCheck: any, roomId: number): Observable<any> {
    const params = new HttpParams()
      .set('workspaceId', roomId)
      .set('startDatetime', new Date(dataToCheck.startTimeSelected).toISOString())
      .set('endDatetime', new Date(dataToCheck.endTimeSelected).toISOString());
    return this.http.get(`${environment.baseUrl}/api/v1/bookings/availability`, { params });
  }

  checkAvailabilityRoomByDate(dataToCheck: any): Observable<any> {
    const params = new HttpParams()
      .set('startDatetime', new Date(dataToCheck.startTimeSelected).toISOString())
      .set('endDatetime', new Date(dataToCheck.endTimeSelected).toISOString());
    return this.http.get(`${environment.baseUrl}/api/v1/workspaces/available`, { params });
  }

  getAllMyPrevBookings(
    userId: string,
    page: number = 0,
    size: string = '10',
    sort: string = 'id,desc',
  ): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size).set('sort', sort);
    return this.http.get(`${environment.baseUrl}/api/v1/bookings/users/${userId}`, { params });
  }

  getBookingById(bookingId: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/bookings/${bookingId}`);
  }

  confirmBooking(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/bookings`, data);
  }

  cancelBooking(bookingId: number, data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/bookings/${bookingId}/cancel`, data);
  }

  sendPaymentConfirmationRequest(data: object, bookingId: number): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/payments/bookings/${bookingId}`, data);
  }

  DoApprovalOfPaymenT(data: object, reqId: number): Observable<any> {
    return this.http.patch(`${environment.baseUrl}/api/v1/payments/${reqId}/status`, data);
  }

  getPaymentConfirmationRequest(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${environment.baseUrl}/api/v1/payments`, { params });
  }

  getPaymentConfirmationRequestByStatus(
    status: string,
    page: number = 0,
    size: number = 10,
  ): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(`${environment.baseUrl}/api/v1/payments/status/${status}`, { params });
  }

  getPaymentConfirmationRequestByTransactionType(
    transactionType: string,
    page: number = 0,
    size: number = 10,
  ): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get(
      `${environment.baseUrl}/api/v1/payments/transaction-type/${transactionType}`,
      {
        params,
      },
    );
  }
}
