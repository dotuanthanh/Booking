import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookingModuleRoutingModule} from './booking-module-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {BookingList} from './my-booking/my-booking.component';
import {MatButtonModule, MatTableModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {BookingHistoryComponent} from "./booking-history/booking-history.component";
// import {OpenListHouse} from '../house/my-house/my-house.component';

@NgModule({
  declarations: [ BookingList, BookingHistoryComponent],
  imports: [
    CommonModule,
    BookingModuleRoutingModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    SharedModule,
  ],
  exports: [
  ],
  entryComponents: []
})
export class BookingModuleModule {
}
