import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../interface/user';
import {AuthenticationService} from '../../service/authentication.service';
import {UserToken} from '../../model/user-token';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser: UserToken;
  user: User;
  userName: '';
  ngOnInit(): void {
  }

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(value => {
      this.currentUser = value;
      this.userName =  JSON.parse(window.localStorage.getItem('currentUser')).username;
    });
  }

  logout() {
    this.authenticationService.logout()
    this.router.navigate(['/houses']);
  }



}
