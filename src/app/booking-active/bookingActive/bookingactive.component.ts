import {Component, DoCheck, OnInit} from '@angular/core';
import * as moment from 'moment';
import {BookingServiceService} from '../../service/booking/bookingservice.service';
import {Booking} from '../../model/booking';
import {NotifyServiceService} from '../../service/notify/notify-service.service';
import {UserServiceService} from '../../service/user-service.service';
import {HouseService} from '../../service/house/house.service';
import {GeneralPopupComponent} from '../../general-popup/general-popup.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'booking-active',
  templateUrl: './bookingActive.component.html',
  styleUrls: ['./bookingActive.component.css']
})
export class BookingActiveComponent implements OnInit, DoCheck {

  listDisableDate = [];
  checkInDate: any;
  checkOutDate: any;
  today: any = Date.now();
  minDate: Date;
  maxDate: Date;

  constructor(private bookingService: BookingServiceService,
              private notifyService: NotifyServiceService,
              private userService: UserServiceService,
              private router: Router,
              private dialog:MatDialog,
              private houseService: HouseService) {
  }

  ngOnInit() {
    this.getAllBookingByHouseId(this.bookingService.currentId);
    this.notifyService.notify='' // reset thong bao
  }

  dateFilter = (d: Date) => {
    if (d < this.today) {
      return false;
    }
    let formattedDate = this.formatDate(d);
    return this.listDisableDate.indexOf(formattedDate) == -1;
    //type date na0 ??
  };


  getAllBookingByHouseId(id: any) {
    this.bookingService.getBookingByHouseId(id).subscribe((data) => {
      this.getListDisableDate(data);
    });
  }

  getListDisableDate(data: any) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let start = new Date(data[i].checkinDate);
      let end = new Date(data[i].checkoutDate);
      this.setListDisableDate(start, end);
    }
  }

  setListDisableDate(start: any, end: any): any {
    while (start <= end) {
      this.listDisableDate.push(this.formatDate(start));
      start = this.getNextDay(start);
    }
    return this.listDisableDate;
  }

  getNextDay(day: any): any {
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    return nextDay;
  }

  formatDate(date: any): any {
    return (moment(date)).format('yyyy-MM-DD');
  }

  doBooking(data: any): boolean {

    if (data == true) {
      this.notifyService.notify = 'success'
      let start = this.formatDate(this.checkInDate);
      let end = this.formatDate(this.checkOutDate);
      let booking: Booking = {
        bookingStatus: -1,
        checkinDate: start,
        checkoutDate: end,
        total: this.checkTotalMoney(this.checkInDate, this.checkOutDate),
        house: {
          houseId: this.bookingService.currentId
        },
        users: {
          userId: this.userService.getCurrentUser().id
        }
      };
      console.log('data booking : ');
      // console.log(booking);
      console.log('data booking : ');
      this.bookingService.doBooking(booking).subscribe((data) => {
        console.log("booking success")
       setTimeout( ()=>{
         window.location.reload()
       },1000);
      });
      return true;
    }
    return false;
  }

  validateForCheckoutDate() {
    this.minDate = this.checkInDate;
    //Kiểm tra ngày sau ngày checkin xem có bị khóa không
    //Để tránh trường hợp chọn ngày bị ngắt quãng

    let start = this.checkInDate;
    if (this.listDisableDate.length != 0) {
      let x = 1;
      while (++x < 60) {
        let theDayAfterCheckInDay = this.formatDate(this.getNextDay(start));
        if (this.listDisableDate.indexOf(theDayAfterCheckInDay) != -1) {
          this.maxDate = start;
          break;
        }
        start = this.getNextDay(start);
      }
    }

  }

  ngDoCheck() {
    if (this.notifyService.notify == 'success') {
      return;
    }
    if(this.notifyService.notify=='loginToBooking'){
      return;
    }
    if (this.formatDate(this.checkInDate) == this.formatDate(this.today)) {
      this.notifyService.notify = 'inValidInStartDate';
    } else if (this.formatDate(this.checkOutDate) == this.formatDate(this.today)) {
      this.notifyService.notify = 'inValidInEndDate';
    } else if (this.formatDate(this.checkOutDate) < this.formatDate(this.checkInDate)) {
      this.notifyService.notify = 'inValidInStartDate2';
    } else {
      console.log('do check chay');
      this.notifyService.notify = 'valid';
    }
  }

  checkTotalMoney(start: any, end: any): number {
    let totalDays = 0;
    let total;
    let pricesPerDay = this.houseService.getCurrentHouse().pricePerDay;
    while (start <= end) {
      totalDays++;
      start = this.getNextDay(start);
    }
    total = totalDays * pricesPerDay;
    return total;
  }
}
