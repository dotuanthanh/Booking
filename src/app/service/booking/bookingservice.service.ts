import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {House} from '../../model/house';

const API_URL = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
  //lấy id house hiện tại
  currentId: number;

  constructor(private http: HttpClient) {
  }

  public getAllBookingByUserId(id: number): Observable<any> {
    return this.http.get(API_URL + `/bookings/${id}`);
  }

  public getBookingByHouseId(houseId: number): Observable<any> {
    return this.http.get(API_URL + `/bookings/house/${houseId}`);
  }

  public doBooking(booking: any): Observable<any> {
    return this.http.post(API_URL + `/bookings`, booking);
  }

  public deleteBooking(id: any): Observable<any> {
    return this.http.delete(API_URL + `/bookings/${id}`);
  }

  public getBookingByStatus(statusId: number, userId: number): Observable<any> {
    return this.http.get(API_URL + `/bookings/status/${statusId}/${userId}`);
  }
  public getBookingByHouseAndMonth(houseId:number,month:number,year:number){
    return this.http.get(`${API_URL}/bookings/${houseId}/${month}/${year}`)
  }
}
