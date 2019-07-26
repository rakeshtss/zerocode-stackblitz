import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { AppHttpClient } from '@zc-ui/zc-utilities';

@Injectable()
export class ZcManageAppService {
  constructor(private http: AppHttpClient) {}

  getAppList(url: string) {
    return this.http.get(url).pipe(map(res => <any>res));
  }
}
