import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  Renderer2,
  HostListener
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLayoutService } from '../../../services/page-layout.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PageRenderModule } from '@zc-ui/zc-page-builder';
import { AppConfigService } from '@zc-ui/zc-utilities';
import { Location } from '@angular/common';
import { LocalStorageService } from '@zc-ui/zc-utilities';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent implements OnChanges, OnInit, OnDestroy {
  myExtraModule = [RouterModule, PageRenderModule, NgbDropdownModule];
  htmlTemplate: any;
  subscription: Subscription;
  thisLayout: any;
  layoutComponents = {};
  componentsList = {};
  menuState = ''; /*hide-menu*/
  pageTitle = 'Home';
  showProfile = false;
  breadcrumb: any[];
  backBtn: boolean;
  userDetails = {};
  scriptLoad = false;
  siteConfig: any;
  siteUiConfig: any;
  currentApp: any;
  lockState = '';
  lockValue = '';
  constructor(
    public pl: PageLayoutService,
    private _location: Location,
    private ls: LocalStorageService,
    private router: Router,
    private appConfigService: AppConfigService,
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute
  ) {
    this.htmlTemplate = this.pl.htmlLayout;
    this.siteConfig = this.appConfigService.settings;
    this.currentApp = this.pl.currentApp;
    this.pl.getPageSettingObservable().subscribe(res => {
      const pageSetting = res;
      this.reloadBreadcrumb(pageSetting);
      this.currentApp = this.pl.currentApp;
    });
    this.subscription = this.pl.getHtml().subscribe(res => {
      this.scriptLoad = false;
      setTimeout(() => {
        this.scriptLoad = true;
      }, 100);
      const pageSetting = this.pl.getPageSetting();
      this.reloadBreadcrumb(pageSetting);

      this.htmlTemplate = this.pl.htmlLayout;
      this.componentsList = this.pl.layoutComponents;
      if (ls.getItem('user')) {
        this.userDetails = ls.getItem('user', true);
        this.showProfile = true;
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  /**
   * @description method to Resize window < 1023 menu should close
   * @author Raja
   * @date 2019-03-20
   */
  onResize(event) {
    // event.target.innerWidth;
    // console.log('innerWidth', event.target.innerWidth);
    if (window.innerWidth <= 1023) {
      if (this.hasClass(document.querySelector('body'), 'show-menu')) {
        this.renderer.removeClass(document.body, 'show-menu');
      }
    } else {
      this.renderer.addClass(document.body, 'show-menu');
    }
  }
  ngOnInit() {
    this.thisLayout = { ly: this };
    if (window.innerWidth <= 1023) {
      if (this.hasClass(document.querySelector('body'), 'show-menu')) {
        this.renderer.removeClass(document.body, 'show-menu');
      }
    }
    this.enableToggle();
  }

  ngOnChanges(changes: SimpleChanges) { }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  // Check if element has class
  private hasClass(target: any, elementClassName: string) {
    return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(
      target.className
    );
  }
  /**
   *
   */
  toggleMenu() {
    // 1-line if statement that toggles the value:
    // this.menuState = this.menuState === 'show-menu' ? 'hide-menu' : 'show-menu';
    if (this.hasClass(document.querySelector('body'), 'show-menu')) {
      this.renderer.removeClass(document.body, 'show-menu');
    } else {
      this.renderer.addClass(document.body, 'show-menu');
    }
    if (window.innerWidth <= 800) {
      if (this.hasClass(document.querySelector('body'), 'stage-menu-open')) {
        this.renderer.removeClass(document.body, 'stage-menu-open');
      }
    }
  }
  logout() {
    this.ls.removeItem('user');
    this.router.navigate(['/']);
    this.userDetails = {};
    // localStorage.clear();
  }
  backClicked() {
    this._location.back();
  }
  reloadBreadcrumb(pageSetting) {
    console.log('pageSetting', pageSetting);
    this.pageTitle = pageSetting.label;
    if (
      pageSetting.instructions &&
      pageSetting.instructions.definition &&
      pageSetting.instructions.definition.backBtn
    ) {
      this.backBtn = true;
    } else {
      this.backBtn = false;
    }
    this.breadcrumb = [];
    if (
      pageSetting &&
      pageSetting.instructions &&
      pageSetting.instructions.definition &&
      pageSetting.instructions.definition.breadcrumb
    ) {
      console.log('this.activatedRoute.snapshot.params.uid', this.activatedRoute.snapshot.firstChild.params.uid);
      this.breadcrumb = pageSetting.instructions.definition.breadcrumb.map(res => {
        res.url = res.url.replace(/\{uid\}/g, this.activatedRoute.snapshot.firstChild.params.uid);
        return res;
      });
    }
  }

  /**
   * @description method to Disable Menu Toggle and Menu Lock
   * @author Raja
   * @date 2019-03-26
   */
  disableToggle(event) {
    const lockStatus = localStorage.getItem('lockValue');
    this.lockValue = lockStatus;
    if (event) {
      this.lockValue =
        this.lockValue === 'icon-lock-1' ? 'icon-unlock' : 'icon-lock-1';
    }
    if (
      this.lockValue &&
      this.lockValue !== null &&
      this.lockValue !== 'null' &&
      this.lockValue !== undefined &&
      this.lockValue !== 'undefined'
    ) {
      if (this.lockValue === 'icon-unlock') {
        this.lockValue = 'icon-lock-1';
        this.renderer.addClass(document.body, 'disable-toggle');
      } else {
        this.lockValue = 'icon-unlock';
        this.renderer.removeClass(document.body, 'disable-toggle');
      }
      localStorage.setItem('lockValue', this.lockValue);
    } else {
      this.lockValue = 'icon-unlock';
      localStorage.setItem('lockValue', this.lockValue);
      this.renderer.removeClass(document.body, 'disable-toggle');
    }
  }

  /**
   * @description method to call disableToggle method
   * @author Raja
   * @date 2019-03-26
   */
  enableToggle() {
    this.disableToggle(true);
  }

  pageRedirect(url) {
    let _path = '';
    let _pathArray = [];
    if (this.activatedRoute.routeConfig && this.activatedRoute.routeConfig.children && this.activatedRoute.routeConfig.children.length > 0) {
      _path = this.activatedRoute.routeConfig.children[this.activatedRoute.routeConfig.children.length - 1]['path'];
      _path = _path.replace(/:/g, "");
      _pathArray = _path.split('/');
    }
    let _currentUrl = this.activatedRoute.snapshot['_routerState']['url'].split('/');
    const removeItem = (_currentUrl.length - _pathArray.length);
    _currentUrl.splice(0, removeItem);
    const _urlParamArray = [];
    _currentUrl.forEach((itemUrl, inx) => {
      _pathArray.forEach((itemPath, index) => {
        if (inx === index) {
          _urlParamArray.push({
            name: itemPath,
            value: itemUrl
          });
        }
      });
    });

    let _newUrl = '';
    let _item = '';
    let _url = url.split('/');
    _url.forEach((_urlItem, inx) => {
      let arrayIndex = null;
      _urlParamArray.forEach((_urlParam, index) => {
        if (_urlItem == '{' + _urlParam.name + '}') {
          arrayIndex = index;
          _item = _urlParam.value;
        } else {
          _item = _urlItem;
        }
      });
      if (arrayIndex !== null) {
        _item = _urlParamArray[arrayIndex]['value'];
      }
      _newUrl = (_newUrl) ? (_newUrl + '/' + _item) : _item;
    });
    // console.log('_currentUrl', _currentUrl);
    // console.log('_pathArray', _pathArray);
    // console.log('i/p url', url);
    // console.log('_url', _url);
    // console.log('_urlParamArray', _urlParamArray);
    // console.log('_newUrl', _newUrl);
    this.router.navigate([_newUrl]);
  }
  getZcDataKey(key) {
    try {
      const fun = new Function('return ' + key);
      return fun();
    } catch (e) {
      console.log('key', key);
    }

  }
}
