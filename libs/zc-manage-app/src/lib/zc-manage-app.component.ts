import { Component, OnInit, Input } from '@angular/core';
import { ZcManageAppService } from './zc-manage-app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'zc-manage-app',
  templateUrl: './zc-manage-app.component.html',
  styleUrls: ['./zc-manage-app.component.scss']
})
export class ZcManageAppComponent implements OnInit {
  @Input() options: any;
  appList: any = [];
  selectedApp: any;
  constructor(
    private manageAppService: ZcManageAppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAppList();
  }

  getAppList() {
    const url = 'apps'; // const url = 'https://jsonblob.com/api/5f6a29ee-2931-11e9-8247-63d7a4b28b4e';
    this.manageAppService.getAppList(url).subscribe(result => {
      if (result.success) {
        this.appList = result.data;
      }
    });
  }
  navigateUrl(event) {
    if (event.value.redirectUrl) {
      this.router.navigate(['/' + event.value.redirectUrl]);
    }
  }
  /* setDropDownOptions(data) {
    this.appList = [];
    if (data.length !== 0) {
      data.forEach(item => {
        this.appList.push(
          {
            name: item.name,
            code: item.name,
            other: {
              url: item.name
            }
          }
        );
      });
    }
  } */
}
