import { Component, OnInit, Input } from '@angular/core';
import { AppHttpClient } from '@zc-ui/zc-utilities';
import { ActivatedRoute } from '@angular/router';
import { StageConfig } from '../qlana-stage-config';

@Component({
  selector: 'zc-qlana-stage-list',
  templateUrl: './qlana-stage-list.component.html',
  styleUrls: ['./qlana-stage-list.component.scss']
})
export class QlanaStageListComponent implements OnInit {
  @Input() options: StageConfig;
  params: any;
  queryPrams: any;
  parentParams: any;
  pageInfo: any;
  stageList = [];
  moduleType: any;
  constructor(private http: AppHttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.moduleType = this.options.api.map.type;
    this.route.parent.params.subscribe(parentParams => {
      this.parentParams = parentParams;
      this.route.queryParams.subscribe(queryPrams => {
        this.route.params.subscribe(params => {
          this.params = params;
          this.queryPrams = queryPrams;
          this.getStageList();
        });
      })
    })

  }
  getStageList() {
    this.stageList = [];
    const keyType = this.options.api.map.type;
    this.http.post(this.options.api.url, { dependents: { uid: this.params.uid } })
      .subscribe(res => {
        if (res && res.data && res.data.listData && res.data.listData.rows) {
          const rows = res.data.listData.rows;
          rows.forEach((row) => {
            const sectionList = row[keyType + '_type'][keyType + '_section_config'];

            sectionList.forEach((section, secInx) => {
              const subSections = section[keyType + '_subsection_config'];
              this.stageList[secInx] = section[keyType + '_section'];
              this.stageList[secInx]['subSection'] = [];
              subSections.forEach(subSection => {
                if (subSection[keyType + '_subsection']['code']) {
                  this.stageList[secInx]['subSection'].push(subSection[keyType + '_subsection']);
                  // this.stageList.push(subSection['contact_subsection']['code']);
                }
              });
            });
          });
          console.log(' this.stageList ', this.stageList);
        }
      });
  }

}
