import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
API_URL=`${environment.api_url}`
  constructor(private http: HttpClient) {
  }

  getTurnOverPerEachMonth(houseId: number, year: number) {
    return this.http.get<string[]>(this.API_URL+`/bookings/statistics/${houseId}/${year}`)
  }
}
