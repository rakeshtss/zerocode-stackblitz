// https://github.com/vigneshsithirai/Angular-Interceptor/blob/master/src/app/interceptor/httpconfig.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { LoadingIndicatorService } from './loading-indicator.service';
import { LocalStorageService } from './local-storage.service';
import { ToasterService } from './toaster.service';
import { SessionService } from '../services/session.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import { AppConfigService } from './app-config.service';
import { environment } from "../../../../../apps/zc/src/environments/environment";
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  public client: string;
  public apiUrl: string;
  public baseUrl: string;
  constructor(
    private loader: LoadingIndicatorService,
    private ls: LocalStorageService,
    private toasterService: ToasterService,
    private sessionService: SessionService,
    private appConfig: AppConfigService
  ) { }

  /**
   *
   *
   * @param HttpRequest<any> request
   * @param HttpHandler next
   * @returns Observable<HttpEvent<any>>
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('appConfig -->', this.appConfig.settings.app);
    request = request.clone({
      setHeaders: {
        'User-Type': 'Application Manager',
        app: this.appConfig.settings.app ? this.appConfig.settings.app : '',
        module: this.appConfig.settings.module? this.appConfig.settings.module : '',
        page: this.appConfig.settings.page ? this.appConfig.settings.page : ''
      },
      url: request.url
    });
    // if user logged in you need to pass token
    if (!(request.url.match('zc-setting')) && this.ls.getItem('user') && !request.headers.has('X-Skip-Authorization')) {
      const userData = this.ls.getItem('user', true);

      request = request.clone({
        setHeaders: {
          'User-Type': 'Application Manager',
          Authorization: 'Bearer ' + userData.token,
          lang: userData.preference && userData.preference.lang ? userData.preference.lang : 'en'
        },
        body: this.encryptionRequest(request.body)
      });
    }
    this.loader.onStarted(request);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loader.onFinished(request);
          event = event.clone({ body: this.decryptionResponse(event.body) });
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('error details', error);
        const data = {
          reason: error.message,
          status: error.status
        };
        this.loader.onFinished(request);
        // this.toasterService.show('error', '' + data.status, data.reason);
        if (error.status === 401) {
          this.sessionService.sessionExpired();
           // this.toasterService.show('error', error.message);
           this.toasterService.show('error',"Unauthorized");
        } else if (error.status === 403) {
          if (!this.sessionService.checkSession()) {
            // this.sessionService.sessionExpired();
          }
          // this.toasterService.show('error', error.message);
          this.toasterService.show('error', "You don’t have permission to access");
        } else {
          if (environment.production) {

          } else {
            if (error.message) {
              this.toasterService.show('error', error.message);
            }
          }

          // this.toasterService.show('error', error.name, error.message + ' Url :' + request.url);
        }
        // this.errorDialogService.openDialog(data);
        return throwError(error);
      })
    );
    //  next.handle(request).map(event => {

    //     if (event instanceof HttpResponse) {
    //         this.loader.onFinished(request);
    //         event = event.clone({ body: this.decryptionResponse(event.body) });
    //     }
    //     return event;

    // }).catch(err => {
    //     this.loader.onFinished(request);
    //     if (err.status === 401) {
    //         this.sessionService.sessionExpired();
    //         this.toasterService.show('error', err.error.message);
    //     } else if (err.status === 403) {
    //         if (!this.sessionService.checkSession()) {
    //             this.sessionService.sessionExpired();
    //         }
    //         this.toasterService.show('error', err.error.message);
    //     } else {
    //         this.toasterService.show('error', err.name, err.message + ' Url :' + request.url);
    //     }

    //     return Observable.throw(err);
    // });
  }

  /**
   * @param any reqBody
   * @returns object
   */
  private encryptionRequest(reqBody) {
    const param: any = reqBody;
    return param;
  }
  /**
   * @param any res
   * @returns json object
   */
  private decryptionResponse(res) {
    const resJson = res;
    // console.log('siteConfig', siteConfig);
    // checking encryptionKey
    if (resJson.success) {
      if (resJson.message) {
        this.toasterService.show('success', resJson.message, '');
      }
    } else {
      // Multiple error
      this.toasterService.show('error', resJson.message, ' ');
      if (resJson.data && resJson.data.errors) {
        // Object.keys(resJson.data.errors).forEach(e => {
        //   if (typeof resJson.data.errors[e] === 'string') {
        //     this.toasterService.show('error', resJson.data.errors[e]);
        //   }
        // });
        if (resJson.data.errors && resJson.data.errors.length > 0) {
          let msg = '';
          resJson.data.errors.forEach(e => {
            console.log('e', e);
            if (e['msg']) {
              msg += e['msg'];
            }
          });
          if (msg !== '') {
            this.toasterService.show('error', msg);
          }
        }
      } else {
        this.toasterService.show('error', resJson.message, ' ');
      }
    }
    return resJson;
  }
}
