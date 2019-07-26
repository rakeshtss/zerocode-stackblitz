import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import {
  AppHttpClient,
  HttpInterceptorService,
  ToasterService,
  LoadingIndicatorService,
  LocalStorageService,
  ErrorHandlerService,
  AppHttpClientCreator,
  AppConfigService,
  ZcUtilitiesModule
} from '@zc-ui/zc-utilities';
import {
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import { PageRenderModule } from '@zc-ui/zc-page-builder';
import { PageLayoutGuard } from './guards/page-layout.guard';
import { PageLayoutComponent } from './modules/pages/page-layout/page-layout.component';
import { PageComponent } from './modules/pages/page/page.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SafeHtmlPipe } from './core/pipes/safe-html-pipe';
import { RunScriptsDirective } from './core/directives/run-scripts.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiteConfigService } from './services/site-config.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app.routing';
export function initialConfigLoad(config: SiteConfigService) {
  return () => config.getSiteConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    PageLayoutComponent,
    PageComponent,
    SafeHtmlPipe,
    RunScriptsDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ZcUtilitiesModule,
    NxModule.forRoot(),
    AppRoutingModule,
    PageRenderModule,
    HttpClientModule,
    NgbModalModule
  ],
  providers: [
    SiteConfigService,
    PageLayoutGuard,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initialConfigLoad,
      deps: [SiteConfigService],
      multi: true
    },
    {
      provide: AppHttpClient,
      useFactory: AppHttpClientCreator,
      deps: [HttpClient, AppConfigService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    ToasterService,
    LoadingIndicatorService,
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
