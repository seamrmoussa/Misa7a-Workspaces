import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatedService {
  private readonly http = inject(HttpClient);

  getAllReview(
    page: number = 0,
    size: number = 10,
    sorts: string = 'createdOn,desc',
  ): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size).set('sorts', sorts);

    return this.http.get(`${environment.baseUrl}/api/v1/reviews`, { params });
  }

  sendRated(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/reviews`, data);
  }

  responseAdminToReview(reviewId: number, data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/reviews/${reviewId}/response`, data);
  }

  getAvgReview(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/reviews/summary`);
  }

  getReviewByRating(
    rate: number,
    page: number = 0,
    size: number = 10,
    sorts: string = 'createdOn,desc',
  ): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size).set('sorts', sorts);
    return this.http.get(`${environment.baseUrl}/api/v1/reviews/rating/${rate}`, { params });
  }

  getRatedCounts(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/reviews/rating-counts`);
  }
}
