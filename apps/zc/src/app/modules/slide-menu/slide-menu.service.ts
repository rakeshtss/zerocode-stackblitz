import { Injectable } from '@angular/core';
import { PageLayoutService } from '../../services/page-layout.service';
import { AppHttpClient } from '@zc-ui/zc-utilities';

@Injectable({
  providedIn: 'root'
})
export class SlideMenuService {
  constructor(private http: AppHttpClient, private pls: PageLayoutService) {}
  getMenuList() {
    return this.http.get('menu/' + this.pls.currentApp).map(res => res.data);
  }
}
