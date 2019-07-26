import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpHeaders } from '@angular/common/http';
import { AppHttpClient } from '@zc-ui/zc-utilities';

@Injectable({
  providedIn: 'root'
})
export class PageLayoutService {
  constructor(private http: AppHttpClient) {}
  htmlTeplate = new Subject<any>();
  pageSettingObservable = new Subject<any>();
  pageSetting: any = {};
  currentApp: string;
  currentTheme: string;
  currentLayout: string;
  htmlLayout = { template: '<router-outlet></router-outlet>' };
  layoutComponents = {};

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2018-10-30
   * @param string html
   */
  setHtml(html: any) {
    this.htmlLayout = html;
    this.htmlTeplate.next(html);
  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2018-10-30
   * @param string theme
   * @param string layout
   */
  loadHtml(theme: string, layout: string) {
    const promise = new Promise((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.append('Cache-control', 'no-cache');
      headers.append('Cache-control', 'no-store');
      headers.append('Expires', '0');
      headers.append('Pragma', 'no-cache');
      this.currentTheme = theme;
      this.currentLayout = layout;
      this.http
        .getHtml(
          'assets/themes/' + theme + '/layouts/' + layout + '-layout.html',
          { responseType: 'text', headers: headers }
        )
        .toPromise()
        .then(res => {
          this.setHtml({ template: res });
          resolve();
        });
    });
    return promise;
  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2018-10-30
   * @returns Observable
   */
  getHtml(): Observable<any> {
    return this.htmlTeplate.asObservable();
  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2018-10-30
   * @returns Observable
   */
  getPageSettingObservable(): Observable<any> {
    return this.pageSettingObservable.asObservable();
  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2018-10-30
   * @param Object data
   */
  setPageSetting(data) {
    this.pageSetting = data;
    this.pageSettingObservable.next(data);
  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2018-10-30
   * @returns Object
   */
  getPageSetting(): any {
    return this.pageSetting;
  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2018-10-30
   */
  clearHtml() {
    this.htmlTeplate.next();
  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2018-10-30
   * @param string [app]
   * @param string [module]
   * @param string [page]
   */
  getPageInfo(app?: string, module?: string, page?: string) {
    let url: string;
    if (app) {
      url = app;
    }
    if (app && module) {
      url = app + '/' + module;
    }
    if (app && module && page) {
      url = app + '/' + module + '/' + page;
    }
    this.currentApp = app;
    return this.http.get('page/' + url).map(res => res.data);
  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2018-10-30
   */
  getDefaultApp() {
    return this.http.get('apps').map(res => {
      return res.data.filter(app => app.default === true);
    });
  }
}
