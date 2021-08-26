import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class NotifyServiceService {
  notify: any;
  constructor(private dialog: MatDialog) {

  }
}
