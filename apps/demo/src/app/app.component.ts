import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@zc-ui/zc-utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zc-widgets-v3';
  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.settings.apiUrl =
      'http://mahait-dev.zeroco.de/zc-v3-user-svc/2.0/';
    this.appConfigService.settings.client = 'mahait';
  }
  ngOnInit() {
    window['zc'] = {};
  }
}
