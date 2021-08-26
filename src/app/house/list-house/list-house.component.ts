import {Component, OnInit} from '@angular/core';

import {HouseService} from '../../service/house/house.service';
import {House} from '../../model/house';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as moment from 'moment';




@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.css']
})
export class ListHouseComponent implements OnInit {
  public currentPage = 0;
  public recommendHouse;
  public stars;
  public size = 9;
  private listHouse: House[] = [];
  private numberOfPage = 1;
  today = new Date();
  maxDate : Date;
  message : string;
  nextday= new Date();
  searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    checkin: new FormControl('', Validators.required),
    checkout: new FormControl('', Validators.required)
  });


  get filteredListHouse() {
    const startIndex = this.currentPage * this.size;
    const endIndex = (this.currentPage + 1) * this.size;
    return this.listHouse.slice(startIndex, endIndex);
  }


  constructor(private houseService: HouseService,
              private router: Router) { }

  get pageArray() {
    const pages = [...Array(this.numberOfPage).keys()];
    return Array.from(pages.map(page => page + 1));
  }

  ngOnInit() {
    this.getAllHouse();
    this.houseService.getListRecommend().subscribe(
      result => {
        this.recommendHouse = result;
        console.log(this.recommendHouse);
      }
    );
    this.houseService.getTop5Stars().subscribe(
      result => {
        console.log(result)
        this.stars = result;
        // @ts-ignore
        for(let i =0;i<result.length;i++){
         this.stars[i]=(result[i].substring(0,3))
        }
      }
    );
  }

  getAllHouse() {
    this.houseService.getAllHouse().subscribe(listHouse => {
      this.listHouse = listHouse;
      this.addImageToHouse(this.listHouse);
      this.numberOfPage = Math.ceil(this.listHouse.length / this.size);
    });
  }
  next() {
    if (this.currentPage < this.numberOfPage - 1) {
      this.currentPage++;
    }
  }

  previous(){
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  public goTo(page) {
    this.currentPage = page;
  }

  search() {
    const search = this.searchForm.value.search;
    const checkin = this.formatDate(this.searchForm.value.checkin);
    const checkout =  this.formatDate(this.searchForm.value.checkout);

    this.houseService.getSearchHouse(search, checkin, checkout).subscribe(listHouse => {
      this.listHouse = listHouse;
      if (listHouse.length==0){
        this.message ='No result'
      }
      this.addImageToHouse(this.listHouse);
      this.router.navigate(['/houses'], {queryParams: {search: search, checkin: checkin, checkout: checkout}});
    });
  }

  private addImageToHouse(listHouse: House[]) {
    listHouse.map(async house => {
      house.imagesList = await this.getAllImageByProduct(house);
    });
  }

  private async getAllImageByProduct(house: House) {
    return this.houseService.getAllImageByHouse(house.houseId).toPromise();

  }
  formatDate(date: any): any {
    return (moment(date)).format('yyyy-MM-DD');
  }

  validateForCheckoutDate() {
    this.nextday = this.formatDate(this.searchForm.value.checkin)
  }
  validateForCheckinDate() {
    this.maxDate = this.formatDate(this.searchForm.value.checkout)
  }
}
