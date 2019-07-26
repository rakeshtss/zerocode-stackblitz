import { Component, OnInit, Inject } from '@angular/core';
import { PageLayoutService } from '../../../services/page-layout.service';
import { ActivatedRoute } from '@angular/router';
import { PageInstructions } from '../page-utils';
import {
  AppConfigService,
  LocalStorageService,
  ActionService
} from '@zc-ui/zc-utilities';
import { HttpClient } from '@angular/common/http';
import { SiteConfigService } from '../../../services/site-config.service';
import { DynamicScriptLoaderService } from '../../../services/dynamic-script-loader.service';
declare var zc;
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  currentPageName: string;
  pageInfo: PageInstructions;
  options: any; // = { 'btnLabel': 'save', 'navigateTo': '/page/ticketform' };
  uid: any;
  addons: any = [];
  constructor(
    private ls: LocalStorageService,
    private pl: PageLayoutService,
    public http: HttpClient,
    public appConfigService: AppConfigService,
    public siteConfigService: SiteConfigService,
    public dynamicScriptLoaderService: DynamicScriptLoaderService,
    private actionService: ActionService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.pageLoad(params);
    });
  }
  ngOnInit() {}
  pageLoad(params) {
    window['zc'] = {};
    zc.user = this.ls.getItem('user', true);
    zc.params = params;  
    zc.queryParams = this.route.snapshot.queryParams;
    zc.config = this.appConfigService.settings;
    const pageInfoData = <any>this.pl.getPageSetting();
    this.pageInfo = <PageInstructions>pageInfoData.instructions;
    if (
      this.pageInfo &&
      this.pageInfo.definition &&
      this.pageInfo.definition.onLoad &&
      this.pageInfo.definition.onLoad.actions
    ) {
      const actions = this.pageInfo.definition.onLoad.actions;
      actions.forEach(action => {
        this.actionService.action(action);
      });
    }
    const styleClass =
      this.pageInfo &&
      this.pageInfo.definition &&
      this.pageInfo.definition.styleClass
        ? this.pageInfo.definition.styleClass
        : '';
    this.currentPageName = styleClass;
    this.uid = params.uid;
  }
}
