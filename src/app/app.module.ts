import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './service/authentication.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {JwtInterceptor} from './helper/jwt-interceptor';
import {LoginModule} from './login/login.module';
import {RegisterModule} from './register/register.module';
import {RegisterComponent} from './register/register.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {HouseModule} from './house/house.module';
import {BookingActiveModule} from './booking-active/booking-active.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HouseService} from './service/house/house.service';
import {CommonModule} from '@angular/common';
import {GeneralPopupComponent} from './general-popup/general-popup.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';

import {UpdateUserModule} from './update-user/update-user.module';
import {SharedModule} from './shared/shared.module';
import {HouseRoutingModule} from './house/house-routing.module';
import {BookingModuleModule} from './booking-module/booking-module.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {ChangePasswordModule} from './change-password/change-password.module';
import {ChangePasswordRoutingModule} from "./change-password/change-password-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    GeneralPopupComponent,
  ],
  imports: [
    LoginModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HouseModule,
    BookingActiveModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RegisterModule,
    LoginModule,
    MatDialogModule,
    RegisterModule,
    UpdateUserModule,
    HouseRoutingModule,
    BookingModuleModule,
    MatButtonModule,
    ChangePasswordModule,
    ChangePasswordRoutingModule
  ],
  providers: [
    HttpClient,
    HouseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  entryComponents: [GeneralPopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
