import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {HouseService} from '../../service/house/house.service';

import {ImageService} from '../../service/image/image.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Image} from '../../model/image';
import {House} from '../../model/house';
import {User} from '../../interface/user';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {UserToken} from '../../model/user-token';


declare var $: any;
declare var Swal: any;
let isValidated = true;

@Component({
  selector: 'app-house-create',
  templateUrl: './house-create.component.html',
  styleUrls: ['./house-create.component.css']
})
export class HouseCreateComponent implements OnInit {
  houseForm: FormGroup = new FormGroup({
    houseName: new FormControl(),
    houseAddress: new FormControl(),
    area: new FormControl(),
    type: new FormControl(),
    bedroomQuantity: new FormControl(),
    bathroomQuantity: new FormControl(),
    description: new FormControl(),
    pricePerDay: new FormControl()
  });

  selectedImages: any[] = [];

  currentUser: UserToken;
  user: User;



  constructor(private houseService: HouseService,
              private imageService: ImageService,
              private storage: AngularFireStorage,
              private authenticationService: AuthenticationService,
              private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(value => {
      this.currentUser = value;
    });
  }

  ngOnInit() {
    $.validator.addMethod(
      "regex",
      function(value, element, regexp) {
        return this.optional(element) || regexp.test(value);
      },
      "Please check your input."
    );
    $(document).ready(function() {
      $('#house-form').validate({
        rules: {
          houseName: {
            required: true
          },
          pricePerDay: {
            required: true,
            regex: /^-?(0|[1-9]\d*)?$/
          },
          houseAddress:{
            required: true,
          },
          bedroomQuantity: {
            required: true
          },
          bathroomQuantity: {
            required: true
          },
          area: {
            required: true,
            regex:/^-?(0|[1-9]\d*)?$/
          },
          type: {
            required: true
          },
          description: {
            required: true
          }
        },
        messages: {
          houseName: {
            required: 'Please enter your house name'
          },
          pricePerDay: {
            required: 'Please enter rental price by day',
            regex: 'Enter numbers only'
          },
          houseAddress: {
            required: 'Please enter the address for the house'
          },
          bedroomQuantity: {
            required: 'Please enter the bedroom number'
          },
          bathroomQuantity: {
            required: 'Please enter the bathroom number'
          },
          area: {
            required: 'Please enter the area',
            regex: 'Enter numbers only'
          },
          type: {
            required: 'Please enter house type'
          },
          description: {
            required: 'Please enter a detailed description for your home'
          }
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
          isValidated = false;
          error.addClass('text-danger');
          element.closest('.form-group').append(error);
        },
        highlight: function(element, errorClass, validClass) {
          $(element).addClass('is-invalid');
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).removeClass('is-invalid');
          isValidated=true;
        }
      });
    });
  }


  async createImage() {
    const house = await this.createHouse();
    if (house != null) {
      if (this.selectedImages.length !== 0) {
        for (const selectedImage of this.selectedImages) {
          const filePath = `${house.houseName}/${selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                const image: Image = {
                  linkImage: url,
                  house: {
                    houseId: house.houseId
                  }
                };
                this.imageService.createImage(image).subscribe(() => {
                  this.router.navigateByUrl('/');
                }, () => {
                });
              });
            })
          ).subscribe();
        }
        $(function() {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: 'success',
            title: 'Tạo mới thành công'
          });
        });
      }else {
        const defaultImage:Image ={
          linkImage : 'https://www.myistria.com/UserDocsImages/app/objekti/795/slika_hd/19082020034916_Villas-near-Rovinj-Villa-Prestige-2.jpg?preset=carousel-1-webp',
          house: {
            houseId: house.houseId
          }
        }
        this.imageService.createImage(defaultImage).subscribe(() => {
          this.router.navigateByUrl('/');
      });
        $(function() {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: 'success',
            title: 'Tạo mới thành công'
          });

        }, () => {
        });
      }
    } else {
      $(function() {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'error',
          title: 'Tạo mới thất bại'
        });
      });
    }
  }

  createHouse() {
    const house: House = {
      houseName: this.houseForm.value.houseName,
      houseAddress: this.houseForm.value.houseAddress,
      area: this.houseForm.value.area,
      type: this.houseForm.value.type,
      bedroomQuantity: this.houseForm.value.bedroomQuantity,
      bathroomQuantity: this.houseForm.value.bathroomQuantity,
      description: this.houseForm.value.description,
      pricePerDay: this.houseForm.value.pricePerDay,
      houseStatus: 'blank',
      users: {
        userId: this.currentUser.id
      }
    };
    if (isValidated) {
      return this.houseService.createHouse(house).toPromise();
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files;
    } else {
      this.selectedImages = [];
    }
  }

  removeImageFromPreview(index: number) {
    const images = [];
    for (let i = 0; i < index; i++) {
      images[i] = this.selectedImages[i];
    }
    for (let i = index; i < this.selectedImages.length - 1; i++) {
      images[i] = this.selectedImages[i + 1];
    }
    this.selectedImages = images;
  }


}
