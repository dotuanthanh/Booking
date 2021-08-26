import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DetailHouseComponent} from './detail-house/detail-house.component';

import {HouseCreateComponent} from './house-create/house-create.component';
import {ListHouseComponent} from './list-house/list-house.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HouseRoutingModule} from './house-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MatDatepickerModule, MatInputModule} from '@angular/material';
import {SharedRoutingModule} from '../shared/shared-routing.module';
import {BookingActiveModule} from '../booking-active/booking-active.module';
import {OpenListHouse} from './my-house/my-house.component';
import {GeneralPopupComponent} from '../general-popup/general-popup.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {BookingList} from '../booking-module/my-booking/my-booking.component';
import {BookingModuleModule} from '../booking-module/booking-module.module';
import {TurnoverModule} from '../turnover/turnover.module';
import {TurnoverRoutingModule} from '../turnover/turnover-routing.module';
import {MonthsComponent} from '../turnover/months/months.component';

;

@NgModule({
  declarations: [
    ListHouseComponent,
    DetailHouseComponent,
    HouseCreateComponent,
    OpenListHouse,
    MonthsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HouseRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    BookingActiveModule,
    MatDialogModule,
    MatButtonModule,
    TurnoverRoutingModule,

  ],
  exports: [
    ListHouseComponent, BookingModuleModule, MonthsComponent
  ],
  entryComponents: [
  ]
})
export class HouseModule {

}
