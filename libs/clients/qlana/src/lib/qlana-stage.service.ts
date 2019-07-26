import { Injectable } from '@angular/core';
import { AppHttpClient } from '@zc-ui/zc-utilities';

@Injectable({
  providedIn: 'root'
})
export class QlanaStageService {

  constructor(private http: AppHttpClient) { }
   
}
