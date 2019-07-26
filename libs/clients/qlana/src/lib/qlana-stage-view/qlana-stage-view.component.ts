import { Component, OnInit, Input } from '@angular/core';
import { AppHttpClient } from '@zc-ui/zc-utilities';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { StageConfig } from './../qlana-stage-config';

@Component({
  selector: 'zc-qlana-stage-view',
  templateUrl: './qlana-stage-view.component.html',
  styleUrls: ['./qlana-stage-view.component.scss']
})
export class QlanaStageViewComponent implements OnInit {

  @Input() options: StageConfig;
  params: any;
  queryPrams: any;
  parentParams: any;
  pageInfo: any;
  stageList = [];
  currentStageIndex = 0;
  moduleType:any;
  constructor(private http: AppHttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.moduleType = this.options.api.map.type;
    this.route.parent.params.subscribe(parentParams => {
      this.parentParams = parentParams;
      this.route.queryParams.subscribe(queryPrams => {
        this.route.params.subscribe(params => {
          this.params = params;
          this.queryPrams = queryPrams;
          this.loadPage(this.queryPrams.page);
          this.currentStageIndex = this.stageList.indexOf(queryPrams.page);
        });
      })
    })
    this.getStageList();
  }
  getStageList() {
    this.stageList = [];
    const params = this.route.snapshot.params;
    const queryParams = this.route.snapshot.queryParams;
    // 'api/qlana/contact/list/contact-secsubsec-config'
    const keyType = this.options.api.map.type;
    this.http.post(this.options.api.url, { dependents: { uid: params.uid } })
      .subscribe(res => {
        if (res && res.data && res.data.listData && res.data.listData.rows) {
          const rows = res.data.listData.rows;
          rows.forEach(row => {
            const sectionList = row[keyType + '_type'][keyType + '_section_config'];
            sectionList.forEach(section => {
              const subSections = section[keyType + '_subsection_config'];
              subSections.forEach(subSection => {
                if (subSection[keyType + '_subsection']['code']) {
                  this.stageList.push(subSection[keyType + '_subsection']['code']);
                }
              });
            });
          });
          this.currentStageIndex = this.stageList.indexOf(queryParams.page);
        }
      });

  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2019-05-13
   * @param string pageName
   */
  loadPage(pageName?: string) {
    let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Accept', 'application/json');
    headers = headers.append('page', this.queryPrams.page);
    this.http.get('page/' + this.parentParams.app + '/' + this.params.module + '/' + pageName, { headers: headers })
      .subscribe(pageInfo => {
        this.pageInfo = pageInfo.data.instructions.definition.widgets;
      })
  }
  next() {
    const pageIndex = this.stageList.indexOf(this.queryPrams.page);
    const pageName = this.stageList[pageIndex + 1];
    // this.loadPage(pageName);
    this.navigateUrl(pageName);

  }
  previous() {
    const pageIndex = this.stageList.indexOf(this.queryPrams.page);
    if (pageIndex !== 0) {
      const pageName = this.stageList[pageIndex - 1];
      // this.loadPage(this.stageList[pageIndex - 1]);
      this.navigateUrl(pageName);
    }
  }
  navigateUrl(pageName) {
    this.router.navigate([], {
      queryParams: { page: pageName }
    })
  }
}
