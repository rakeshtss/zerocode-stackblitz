import { Injectable } from '@angular/core';
import { AppHttpClient } from '@zc-ui/zc-utilities';
import { map } from 'rxjs/operators/map';

@Injectable({
  providedIn: 'root'
})
export class FormFieldService {
  constructor(private http: AppHttpClient) {}

  getOptionsList(url: string, method: string, payload?: any) {
    let result: any = {};
    if (method === 'post') {
      result = this.http
        .post(url, payload)
        .pipe(map(res => <any>res.data.listData.rows));
    } else {
      result = this.http
        .get(url, { params: payload })
        .pipe(map(res => <any>res.data));
    }
    return result;
  }
}
