import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {config} from 'rxjs';
import {NotifyServiceService} from '../../service/notify/notify-service.service';
import {element} from 'protractor';
import {templateSourceUrl} from '@angular/compiler';
import {getTemplateUrl} from 'codelyzer/util/ngQuery';
import {GeneralPopupComponent} from '../../general-popup/general-popup.component';
import {UserServiceService} from '../../service/user-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'popup-button',
  templateUrl: 'popup-form.component.html',
  // styleUrls: ['popup-form.component.css']
})
export class PopUpFormComponent implements OnInit {
  constructor(private dialog: MatDialog,
              private userService: UserServiceService,
              private router: Router,
              private notifyService: NotifyServiceService) {
  }

  @Output()
  submitEvt = new EventEmitter<any>();

  openDialog() {
    if (this.userService.getCurrentUser() == null) {
      this.notifyService.notify = 'loginToBooking';
      this.dialog.open(GeneralPopupComponent).afterClosed().subscribe(
        (data) => {
          if (data == true) {
            this.router.navigate(['/login']);
          }
        }
      );
    }else {
    if (this.notifyService.notify == 'valid') {
      const dialogRef = this.dialog.open(PopUpContent);
      dialogRef.afterClosed().subscribe(result => {
        return new Promise(function(resolve, reject) {
          resolve(result);
          console.log('ket qua khi close' + result);
        }).then((result) => {
          this.submitEvt.emit(result);
        }).then(() => {
          console.log('sau khi goi ham booking');
          console.log(this.notifyService.notify);
        }).then((() => {
          if (this.notifyService.notify == 'success') {
            this.dialog.open(PopUpContent);
          }
        }));
      });

    } else {
      this.dialog.open(PopUpContent);
    }
    }
  }


  ngOnInit(): void {
  }
}

@Component({
  selector: 'popup',
  templateUrl: 'popup.html',
  styleUrls: ['popup-form.component.css']
})
export class PopUpContent implements OnInit {
  notify: any;

  constructor(private notify2: NotifyServiceService) {
  }

  ngOnInit(): void {
    this.notify = this.notify2.notify;
    console.log('notify : ' + this.notify);
  }

}

