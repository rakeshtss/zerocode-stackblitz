import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppHttpClient } from '@zc-ui/zc-utilities';
import { map } from 'rxjs/operators/map';
@Injectable()
export class ZcWidgetDataListService {
  constructor(private http: AppHttpClient) {}

  getDataList(url, param): any {
    return this.http.post(url, param);
  }
  getFilterData(url, payload, method = 'get'): any {
    if (method === 'post') {
      return this.http
        .post(url, payload)
        .pipe(map(res => <any>res.data.listData.rows));
    } else {
      return this.http.get(url, payload);
    }
  }
}
