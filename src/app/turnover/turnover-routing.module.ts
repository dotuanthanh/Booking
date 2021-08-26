import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as path from 'path';
import {MonthsComponent} from './months/months.component';


const routes: Routes = [
  // {
  //   path:"statics",
  //   component:MonthsComponent
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnoverRoutingModule { }
