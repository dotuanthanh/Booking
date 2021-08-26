import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {Observable} from 'rxjs';
import {JwtResponse} from '../interface/Jwt-Response';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser: JwtResponse;

  constructor(private authService: AuthenticationService) {
    this.currentUser = this.authService.currentUserValue;
  }

  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.currentUser) {
      return true;
    } else {
      return false;
    }
  }
}
