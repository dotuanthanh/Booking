import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BookingServiceService} from '../../service/booking/bookingservice.service';
import {UserServiceService} from '../../service/user-service.service';
import {DateServiceService} from '../../service/date/date-service.service';
import {MatTableDataSource} from '@angular/material';
import {Booking} from '../../model/booking';
import {GeneralPopupComponent} from '../../general-popup/general-popup.component';
import {NotifyServiceService} from '../../service/notify/notify-service.service';

@Component({
  selector: 'booking-list',
  templateUrl: 'booking-list.html',
  styleUrls: ['./my-booking.component.css']
})
export class BookingList implements OnInit {
  dataSource: Booking[] = [];
  bookingId: string;

  constructor(private bookingService: BookingServiceService,
              private dialog: MatDialog, private activeRouter: ActivatedRoute,
              private userService: UserServiceService,
              private router:Router,
              private dateService: DateServiceService,
              private notifyService: NotifyServiceService) {

  }

  getAllBookingListOfUser() {
    this.bookingService.getAllBookingByUserId(this.userService.getCurrentUser().id).subscribe(data => {
      // this.bookingList = data;
      for (let i = 0; i < data.length; i++) {
        data[i].checkinDate = this.dateService.formatDate(data[i].checkinDate);
        data[i].checkoutDate = this.dateService.formatDate(data[i].checkoutDate);
        this.dataSource.push(data[i]);
      }
      console.log(this.dataSource);
    });
  }

  ngOnInit(): void {
    this.getAllBookingListOfUser();

  }


  deleteBooking(id: any) {
    this.notifyService.notify = 'deleteBooking';
    this.dialog.open(GeneralPopupComponent).afterClosed().subscribe(result => {
        if (result == true) {
          this.bookingService.deleteBooking(id).subscribe(
            () => {
              this.notifyService.notify = 'deleteSuccess';
              this.dialog.open(GeneralPopupComponent).afterClosed(

              ).subscribe(()=>location.reload());
            }
          );
        }
      }

    );


  }


  cannotDelete() {
    this.notifyService.notify = 'cannotDeleteBooking';
    this.dialog.open(GeneralPopupComponent);
  }
}
