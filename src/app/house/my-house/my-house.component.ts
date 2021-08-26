import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {HouseService} from '../../service/house/house.service';
import {House} from '../../model/house';
import {UserServiceService} from '../../service/user-service.service';
import {NotifyServiceService} from '../../service/notify/notify-service.service';
import {DateServiceService} from '../../service/date/date-service.service';
import {GeneralPopupComponent} from '../../general-popup/general-popup.component';
import {Router} from '@angular/router';


@Component({
  selector: 'my-list-house',
  templateUrl: 'list-house.html',
  styleUrls: ['./my-house.component.css']
})
export class OpenListHouse implements OnInit {
  myHouses: House[] = [];
  myBooking = [];
  house: House;
  isAllowToChangeToUpdate: boolean; //cho phep doi rent -> blank hay khong

  ngOnInit(): void {
    this.getAllMyHouse(this.userService.getCurrentUser().id);
    this.notifyService.notify = '';
  }

  constructor(private houseService: HouseService,
              private userService: UserServiceService,
              private dialog: MatDialog,
              private notifyService: NotifyServiceService,
              private router:Router,
              private dateService: DateServiceService) {

  }

  getAllMyHouse(id: number) {
    this.houseService.getAllHouseOfUser(id).subscribe(data => {
      this.myHouses = data;
      this.addImageToHouse(this.myHouses);
      for (this.house of this.myHouses){
        console.log(this.house.imagesList)
      }
    });
  }
  private addImageToHouse(listHouse: House[]) {
    listHouse.map(async house => {
      house.imagesList = await this.getAllImageByHouse(house);
    });
  }

  private async getAllImageByHouse(house: House) {
    return this.houseService.getAllImageByHouse(house.houseId).toPromise();

  }

  updateStatus(houseId: number, status: string) {
    if (this.isAllowToChangeToUpdate) {
      this.houseService.findByHouseId(houseId).subscribe((data) => {
        data.houseStatus = status;
        this.houseService.upDateHouse(houseId, status).subscribe((data) => {
          this.dialog.open(GeneralPopupComponent);
          this.notifyService.notify = 'success';
          // const currentRoute = this.router.url;
          // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          //   this.router.navigate([currentRoute]); // navigate to same route
          // });
          location.reload()
        });
      });
    } else {
      this.notifyService.notify = 'notAllowed';
      this.dialog.open(GeneralPopupComponent);
    }

  }

  changeRentStatus(houseId: number) {
    this.notifyService.notify = '';
    this.isAllowToChangeToUpdate = true;
    this.dialog.open(GeneralPopupComponent).afterClosed().subscribe(result => {
      if (result == true) {
        this.updateStatus(houseId, 'rent');
      }
    });
  }

  async changeUpgradeStatus(houseId: number) {
    // this.isAllowToChangeToUpdate = true;
    // this.notifyService.notify = '';
    // this.dialog.open(GeneralPopupComponent).afterClosed().subscribe(result => {
    //   if (result == true) {
    //     this.updateStatus(houseId, 'upgrade');
    //   }
    // });
    await this.checkingHouse(houseId).then(r => {
        console.log('2');
      }
    ).then(() => {
      console.log('3');
      this.notifyService.notify = '';
      this.dialog.open(GeneralPopupComponent).afterClosed().subscribe(result => {
        if (result == true) {
          this.updateStatus(houseId, 'upgrade');
        }
      });
    });
  }

//Su dung nhieu callBack nen e xu li = asysn/await
  //Luong chay em da console ra
  async changeBlankStatus(houseId: number) {
    await this.checkingHouse(houseId).then(r => {
        console.log('2');
      }
    ).then(() => {
      console.log('3');
      this.notifyService.notify = '';
      this.dialog.open(GeneralPopupComponent).afterClosed().subscribe(result => {
        if (result == true) {
          this.updateStatus(houseId, 'blank');
        }
      });
    });
  }


  async checkingHouse(houseId: any) {
    this.dateService.allBookingDate = []
    await this.dateService.setHouseId(houseId).then(
      () => {
        console.log('start');
      }
    ).then(() => {
      console.log('1');
      console.log(this.dateService.getAllBookingDate())
      console.log(this.dateService.formatDate(Date.now()));
      console.log(this.dateService.allBookingDate.indexOf(this.dateService.formatDate(Date.now())));
      if (this.dateService.allBookingDate.indexOf(this.dateService.formatDate(Date.now())) != -1) {
        this.isAllowToChangeToUpdate = false;
      } else {
        this.isAllowToChangeToUpdate = true;
      }
    });

  }
  setHouseId(houseId: number) {
    this.houseService.currentHouse = houseId;
  }
}
