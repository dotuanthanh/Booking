import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from '../../model/image';
import {environment} from '../../../environments/environment';
const API_URL = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {
  }

  getAllImage(): Observable<Image[]> {
    return this.http.get<Image[]>(API_URL + '/images');
  }

  createImage(image: Image): Observable<Image> {
    return this.http.post<Image>(API_URL + '/images', image);
  }

  getImage(id: number): Observable<Image> {
    return this.http.get<Image>(API_URL + `/images/${id}`)
  }
}
