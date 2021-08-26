import {Component, OnInit} from '@angular/core';
import {BookingServiceService} from '../../service/booking/bookingservice.service';
import {UserServiceService} from '../../service/user-service.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  dataSource: any;

  constructor(private bookingService: BookingServiceService,
              private userService: UserServiceService) {
  }

  ngOnInit() {
    this.getAllBookings()
  }

  getAllBookings() {
    this.bookingService.getBookingByStatus(1, this.userService.getCurrentUser().id).subscribe(
      result => {
        this.dataSource = result;
      }
    );
  }
}
