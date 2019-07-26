import { Injectable } from '@angular/core';
import { AppHttpClient } from '@zc-ui/zc-utilities';

@Injectable()
export class SlideMenuService {
  constructor(private http: AppHttpClient) {}
  getMenuList(appName = 'app') {
    return this.http.get('menu/' + appName).map(res => res.data);
  }
}
