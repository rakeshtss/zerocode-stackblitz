import { Injectable } from '@angular/core';
export interface SiteConfig {
  apiUrl?: string;
  client?: string;
  clientLogo?: string;
  faviconUrl?: string;
  fileServer?: string;
  powerByTitle?: string;
  siteTitle?: string;
  defaultApp?: string;
  loaderUrl?: string;
  profileLinks?: any[];
  captchaKey?: string;
  googleMapKey?: string;
  app?: string;
  module?: string;
  page?: string;
  theme?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  settings: SiteConfig = <SiteConfig>{};
  constructor() { }
}
