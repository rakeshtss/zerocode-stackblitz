import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { AppConfigService } from './app-config.service';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AppHttpClient {
  private client: string;

  private api: string;
  // private api = 'http://192.168.0.77/services/2.0/tss/eu/';
  _isLoader = true;

  // Extending the HttpClient through the Angular DI.
  public constructor(
    public http: HttpClient,
    private appConfig: AppConfigService
  ) {
    // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...) http://v3dev.zeroco.de/zc-v3-user-svc/2.0/sample1/build-info
  }
  getApiUrl() {
    this.client = localStorage.getItem('ZC_client');
    // this.api = 'http://v3dev.zeroco.de/v3-services/2.0/' + this.client + '/eu/';
    this.api =
      this.appConfig.settings.apiUrl + this.appConfig.settings.client + '/';
    return this.api;
  }

  /**
   * GET request
   * @param string endPoint it doesn't need / in front of the end point
   * @param IRequestOptions options options of the request like headers, body, etc.
   * @returns Observable<T>
   */
  public get<T>(endPoint: string, options?: IRequestOptions): Observable<any> {
    this.client = localStorage.getItem('ZC_client');
    return this.http.get<T>(this.getApiUrl() + endPoint, options);
  }

  /**
   * POST request
   * @param string endPoint end point of the api
   * @param Object params body of the request.
   * @param IRequestOptions options options of the request like headers, body, etc.
   * @returns Observable<T>
   */
  public post<T>(
    endPoint: string,
    params: Object,
    options?: IRequestOptions
  ): Observable<any> {
    return this.http.post<T>(this.getApiUrl() + endPoint, params, options);
  }

  /**
   * PUT request
   * @param string endPoint end point of the api
   * @param Object params body of the request.
   * @param IRequestOptions options options of the request like headers, body, etc.
   * @returns Observable<T>
   */
  public put<T>(
    endPoint: string,
    params: Object,
    options?: IRequestOptions
  ): Observable<any> {
    return this.http.put<T>(this.getApiUrl() + endPoint, params, options);
  }

  public patch<T>(
    endPoint: string,
    params: Object,
    options?: IRequestOptions
  ): Observable<any> {
    return this.http.patch<T>(this.getApiUrl() + endPoint, params, options);
  }

  /**
   * DELETE request
   * @param string endPoint end point of the api
   * @param IRequestOptions options options of the request like headers, body, etc.
   * @returns Observable<T>
   */
  public delete<T>(
    endPoint: string,
    options?: IRequestOptions
  ): Observable<any> {
    return this.http.delete<T>(this.getApiUrl() + endPoint, options);
  }

  /**
   * Get html data
   * @param string url
   * @param * [options]
   * @returns Observable<any>
   */
  public getHtml(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }

  /**
   * Get external link
   * @param string url
   * @param * [options]
   * @returns Observable<any>
   */
  public getExternalUrl(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }

  public request(method?: string, url?: string, payload?: any) {
    if (method === 'post') {
      return this.post(url, payload);
    } else if (method === 'put') {
      return this.put(url, payload);
    } else if (method === 'patch') {
      return this.http.patch(url, payload);
    } else if (method === 'delete') {
      return this.http.delete(url, payload);
    } else {
      return this.http.get(url, { params: payload });
    }
  }
}

export function AppHttpClientCreator(
  http: HttpClient,
  appConfig: AppConfigService
) {
  return new AppHttpClient(http, appConfig);
}
