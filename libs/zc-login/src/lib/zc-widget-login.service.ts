import { Injectable } from '@angular/core';
import { AppHttpClient } from '@zc-ui/zc-utilities';

@Injectable()
export class ZcWidgetLoginService {
  constructor(private http: AppHttpClient) {}

  verifyLogin(payload, apiUrl): any {
    return this.http.post(apiUrl, payload);
  }
  getUserDetail(apiUrl): any {
    return this.http.get(apiUrl);
  }
}
