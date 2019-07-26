import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PageLayoutService } from '../services/page-layout.service';
import { AppConfigService } from '@zc-ui/zc-utilities';
import { SiteConfigService } from '../services/site-config.service';

@Injectable()
export class PageLayoutGuard implements CanActivate {
  constructor(
    private pl: PageLayoutService,
    private router: Router,
    private appConfigService: AppConfigService,
    private siteConfigService: SiteConfigService
  ) { }
  canActivate(next: ActivatedRouteSnapshot): Promise<any> {
    const params: any = next.params;
    const app = next.parent.params['app'];
    const module = params['module'];
    const page = params['page'];
    // const theme = next.parent.params['page'];
    this.pl.currentApp = app;
    this.appConfigService.settings.app = next.parent.params['app'];
    this.appConfigService.settings.module = module;
    this.appConfigService.settings.page = page;

    const promise = new Promise((resolve, reject) => {
      if (app && this.appConfigService.settings.defaultApp !== app) {
        this.pageLoad(app, module, page).then(res2 => {
          resolve(true);
        });
      } else {
        this.pageLoad(app, module, page).then(res => {
          resolve(true);
        });
      }
    });

    return promise; // Promise.all([promise1, promise2]);
  }
  pageLoad(app, module, page) {
    const promise = new Promise((resolve, reject) => {
      if (app) {
        this.pl.getPageInfo(app, module, page).subscribe(pRes => {
          if (pRes) {
            const appTheme = pRes.theme;
            const layout = pRes.layout;
            this.pl.setPageSetting({});
            if (appTheme) {
              if (
                this.pl.currentTheme !== appTheme ||
                this.pl.currentLayout !== layout
              ) {
                if (this.pl.currentTheme !== appTheme) {
                  this.siteConfigService.loadCssLink(appTheme);
                }
                this.pl.loadHtml(appTheme, layout).then(res => {
                  this.pl.setPageSetting(pRes);
                });
              } else {
                this.pl.setPageSetting(pRes);
              }
            } else {
              this.pl.setHtml(layout);
            }
            resolve(true);
          }
          resolve(false);
        }, error => {
          console.log('error', error.status);
          if (error.status === 401) {
            this.router.navigateByUrl('/');
            resolve(false);
          }
        });
      } else {
        this.router.navigate(['/' + this.appConfigService.settings.defaultApp]);
        resolve(true);
      }
    });
    return promise;
  }
}
