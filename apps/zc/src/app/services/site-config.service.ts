import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { AppHttpClient, AppConfigService } from '@zc-ui/zc-utilities';

@Injectable({
  providedIn: 'root'
})
export class SiteConfigService {
  appSettings: any = {};
  timeStamp = new Date().getTime();
  client: any = document.location.hostname.split('.')[0];
  constructor(
    private http: AppHttpClient,
    private titleService: Title,
    private appConfigService: AppConfigService
  ) { }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2018-10-30
   */
  getSiteConfig(): Promise<any> {
    return this.http
      .getHtml('assets/config.json')
      .toPromise()
      .then(appConfig => {
        this.appConfigService.settings = {
          ...this.appConfigService.settings,
          ...appConfig
        };
        if (!appConfig.client || appConfig.client === '') {
          this.appConfigService.settings.client = this.client;
        }
        return this.http
          .get('zc-setting?encrypt=false')
          .toPromise()
          .then(serverConfig => {
            if (serverConfig && serverConfig.data) {
              this.appConfigService.settings = {
                ...this.appConfigService.settings,
                ...serverConfig.data
              };
            }
            this.appConfigService.settings.fileServer =
              this.appConfigService.settings.fileServer +
              this.appConfigService.settings.client +
              '/';
            console.log(
              ' this.appConfigService.settings',
              this.appConfigService.settings
            );
            localStorage.setItem(
              'ZC_client',
              this.appConfigService.settings.client
            );
            if (this.appConfigService.settings.theme) {
              this.loadCssLink(this.appConfigService.settings.theme);
            }
            // if (this.appConfigService.settings.cssUrl) {
            //   this.loadCssLink();
            // }
            if (this.appConfigService.settings.faviconUrl) {
              this.setFavicon(this.appConfigService.settings.faviconUrl);
            }
            if (this.appConfigService.settings.siteTitle) {
              this.titleService.setTitle(
                this.appConfigService.settings.siteTitle
              );
            }
            return true;
          });
      });
  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2018-10-30
   */
  setTitle() {
    if (
      this.appConfigService.settings &&
      this.appConfigService.settings.siteTitle
    ) {
      this.titleService.setTitle(this.appConfigService.settings.siteTitle);
    }
  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2018-10-30
   * @param string [url]
   */
  loadCssLink(appTheme) {
    console.log('this.timeStamp',this.timeStamp);
    const cssUrl = 'assets/themes/' + appTheme + '/css/styles.css?cache=' + this.timeStamp;
    const defaultCssUrl = 'default/css/styles.css';
    if (document.getElementById('theme')) {
      document.getElementById('theme').setAttribute('href', cssUrl);
    }
  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2018-10-30
   * @param string [url]
   */
  setFavicon(url?: string) {
    const favIconUrl =
      url ||
      './assets/themes/' +
      this.appConfigService.settings +
      '/images/favicon.png';
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = favIconUrl;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}
