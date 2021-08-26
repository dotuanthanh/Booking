import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

import {Review} from '../../model/review';


const API_URL = `${environment.api_url}`;
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private http: HttpClient
  ) { }

  getAllReview(houseId: number): Observable<Review[]> {
    return this.http.get<Review[]>(API_URL + `/houses/reviews/${houseId}`);
  }
  createReview(houseId: number,review: Review): Observable<Review> {
    return this.http.post<Review>(`${API_URL}/houses/createReview/${houseId}`, review);
  }
}
