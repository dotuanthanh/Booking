
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,AbstractControl} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NotifyServiceService} from '../service/notify/notify-service.service';
import {GeneralPopupComponent} from '../general-popup/general-popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup= new FormGroup({
    username: new FormControl('', [Validators.required,]),
    password: new FormControl('', Validators.required)
  });

  constructor(private authenticationService: AuthenticationService,
              private dialog:MatDialog,
              private notifyService : NotifyServiceService,
              private router: Router) {
  }

  ngOnInit() {

  }


  login() {
    this.authenticationService.login(this.loginForm.value).subscribe(user => {
      console.log(user)
      localStorage.setItem('ACCESS_TOKEN', user.token);
      this.router.navigateByUrl('/houses');
    },err=>{
      this.notifyService.notify='loginFail',
        this.dialog.open(GeneralPopupComponent)
    });
  }
}
