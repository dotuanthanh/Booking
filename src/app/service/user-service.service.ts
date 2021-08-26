import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url = `${environment.api_url}`;

  constructor(private http: HttpClient) {
  }

  getUserInformation(id: any) {
    return this.http.get(this.url + `/${id}`);
  }

  getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('currentUser'));
  }

  checkUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(this.url + `/checkusername/${username}`).pipe();
  }

  checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(this.url + `/checkemail/${email}`).pipe();
  }

  checkPhone(phone: string): Observable<boolean> {
    return this.http.get<boolean>(this.url + `/checkphone/${phone}`).pipe();
  }
  checkRightForReview(userId : number, houseId: number){
    return this.http.get(this.url+`/reviewChecking/${userId}/${houseId}`)
  }
}
