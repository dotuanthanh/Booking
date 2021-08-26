import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {ChangePasswordComponent} from './change-password.component';
import {ChangePasswordRoutingModule} from './change-password-routing.module';





@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [
    ChangePasswordComponent
  ],
  entryComponents: [
  ]
})
export class ChangePasswordModule { }
