import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingModuleModule} from '../booking-module/booking-module.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {
  MatButtonModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BookingActiveComponent} from './bookingActive/bookingactive.component';
import {PopUpContent, PopUpFormComponent} from './popup-form/popup-form.component';

@NgModule({
  declarations: [BookingActiveComponent, PopUpFormComponent,PopUpContent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    // AppModule
  ],
  exports: [BookingActiveComponent],
  providers:[{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  entryComponents:[PopUpContent]
})
export class BookingActiveModule {
}
