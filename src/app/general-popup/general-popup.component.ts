import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {NotifyServiceService} from '../service/notify/notify-service.service';

@Component({
  selector: 'app-general-popup',
  templateUrl: './general-popup.component.html',
  styleUrls: ['./general-popup.component.css']
})
export class GeneralPopupComponent implements OnInit {
  notify: string;

  constructor(private notifyService: NotifyServiceService) {
  }

  ngOnInit() {
    this.notify = this.notifyService.notify;
  }

}
