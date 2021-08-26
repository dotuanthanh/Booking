// @ts-ignore

import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {UserServiceService} from '../service/user-service.service';
import {Users} from '../model/users';
import {MatDialog} from '@angular/material/dialog';
import {NotifyServiceService} from '../service/notify/notify-service.service';
import {GeneralPopupComponent} from '../general-popup/general-popup.component';

function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  username: string;
  registerForm: FormGroup;
  // @ts-ignore
  user: Partial<Users>;
  oldPassword: string;
  newPassword: string;
  status: string;
  loginForm: FormGroup;
  isUserExists: boolean;

  constructor(private userService: UserServiceService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private auth: AuthenticationService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private notifyService: NotifyServiceService,
  ) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
    this.userService.getUserInformation(currentUser.id).subscribe(data => {
      this.user = data;
    });
    this.registerForm = this.fb.group({
      confirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      pwGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      }, {validator: comparePassword}),
    });
  }


  updatePassword(): void {
    this.user.password = this.oldPassword;
    this.auth.updateUser(this.user, this.user.password, this.newPassword)
      .subscribe(data => {
        console.log(data)
        this.notifyService.notify = 'changePasswordSuccess';
        this.dialog.open(GeneralPopupComponent).afterClosed().subscribe(
          () => {
                 this.router.navigate(['/houses'])
          }
        );
        this.loginForm = this.formBuilder.group({
          username: [data.fullname, Validators.required],
          password: [this.oldPassword, Validators.required]
        });
        this.auth.login(this.loginForm.value).subscribe(
          next1 => {
            localStorage.setItem('token', next1.data.token);
          });
      },err=>{
        this.notifyService.notify='changePasswordFail'
        this.dialog.open(GeneralPopupComponent)
      });
    return;
  }
}
