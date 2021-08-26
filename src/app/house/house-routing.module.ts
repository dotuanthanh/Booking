import {NgModule} from '@angular/core';

import {HouseCreateComponent} from './house-create/house-create.component';
import {ListHouseComponent} from './list-house/list-house.component';
import {DetailHouseComponent} from './detail-house/detail-house.component';
import {RouterModule, Routes} from '@angular/router';
import {OpenListHouse} from './my-house/my-house.component';
import * as path from 'path';
import {BookingList} from '../booking-module/my-booking/my-booking.component';
import {MonthsComponent} from '../turnover/months/months.component';
const routes: Routes = [
  {
    path: '',
    component: ListHouseComponent
  }, {
    path: 'my-houses',
    component: OpenListHouse
  },
  {
    path: 'detail/:houseId',
    component: DetailHouseComponent,
    loadChildren: () => import('../booking-active/booking-active.module').then(module => module.BookingActiveModule)
  },

  {
    path: 'create',
    component: HouseCreateComponent
  },
  {
    path:'my-bookings',
    component:BookingList
  },
  {
    path:"statistics",
    component:MonthsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule {
}
