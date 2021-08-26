 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnoverRoutingModule } from './turnover-routing.module';
 import {MonthsComponent} from './months/months.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TurnoverRoutingModule,
  ],
  exports:[

  ]
})
export class TurnoverModule { }
