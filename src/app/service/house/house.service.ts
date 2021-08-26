import {Injectable} from '@angular/core';
import {House} from '../../model/house';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Image} from '../../model/image';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

const API_URL = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  currentHouse: any;
  listHouseRecommend: any = [];

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public getListHouseRecommend() {
    this.getListRecommend().subscribe(data => {
      console.log(data)
      this.listHouseRecommend = data;
    });
  }


  createHouse(house: House): Observable<House> {
    return this.http.post<House>(API_URL + '/houses', house);
  }

  getAllHouse(): Observable<House[]> {
    return this.http.get<House[]>(API_URL + '/houses');
  }

  getHouse(id: number): Observable<House> {
    return this.http.get<House>(API_URL + `/houses/${id}`);
  }

  getAllHouseUsingPagination(page: number, size: number): Observable<House[]> {
    return this.http.get<House[]>(`${API_URL}/houses/pagination?page=${page}&size=${size}`);
  }

  getAllImageByHouse(id: number): Observable<Image[]> {
    return this.http.get<Image[]>(API_URL + `/houses/${id}/images`);
  }

  findByHouseId(houseId: number): Observable<House> {
    return this.http.get<House>(`${API_URL}/houses/detail/${houseId}`);
  }

  getAllHouseOfUser(id: any): Observable<any> {
    return this.http.get(API_URL + `/houses/myHouses/${id}`);
  }

  getSearchHouse(search: string, checkin: Date, checkout: Date): Observable<House[]> {
    return this.http.get<House[]>(`${API_URL}/houses/search?search=${search}&checkin=${checkin}&checkout=${checkout}`);
  }

  getCurrentHouse() {
    return this.currentHouse;
  }

  upDateHouse(id: number, status: string) {
    return this.http.put(`${API_URL}/houses/${id}/${status}`, null);
  }

  getListRecommend() {
    return this.http.get<any>(`${API_URL}/houses/top5`);
  }
  getTop5Stars(){
    return this.http.get(`${API_URL}/houses/stars`)
  }
}
