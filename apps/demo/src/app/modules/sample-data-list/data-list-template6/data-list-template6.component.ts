import { Component, OnInit } from '@angular/core';
import { ZcDataListConfig } from '@zc-ui/zc-data-list';

@Component({
  selector: 'app-sample-data-template6',
  templateUrl: './data-list-template6.component.html',
  styleUrls: ['./data-list-template6.component.scss']
})
export class DataListTemplate6Component implements OnInit {
  options: ZcDataListConfig = {
    title: 'Contracts',
    properties: {
      pagination: {
        autoScroll: false,
        size: 10,
        position: 'bottom',
        displayFormat:
          '<div class="p-1">Total {{totalRecords}}, rows {{(rows*page)+1}} - {{(rows*page)+(+rows)}}</div>',
        style: ''
      },
      filter: {
        title: 'Select Category',
        position: 'top',
        type: 'advanced',
        submissionMode: 'all'
      },
      type: 'table',
      dataSource:
        'https://jsonblob.com/api/4e6d6d5a-1e28-11e9-acce-513f083199b3',
      lazy: false,
      langProps: {},

      styling: {
        header: {
          frozen: true
        },
        freezeColumn: 0,
        row: {
          evenColor: '#FAFAFB',
          oddColor: '#FFFFFF',
          mouseOverColorSource: '#CCC'
        }
      },
      shrinkToFit: true,
      noDataText: 'No Contracts found',
      rowSelection: {
        display: true,
        type: 'row',
        disableCondition: {
          fieldName: 'eligibility',
          value: 'yes'
        }
      }
    },
    cols: [
      {
        label: 'PROVIDER',
        name: 'provider.label',
        type: 'select',
        sort: true,
        fontColorSource: 'blue',
        order: 1,
        action: {
          type: 'page',
          label: 'Delete',
          styling: {
            icon: '',
            tooltip: '',
            cssStyle: '',
            cssColor: '#4286f4'
          },
          page: {
            url: 'view/101',
            type: 'internal',
            target: 'self'
          }
        }
      },
      {
        label: 'CATEGORY',
        name: 'category.label',
        type: 'select',
        sort: true,
        order: 2,
        filter: {
          required: true,
          type: 'select',
          dataSource:
            'https://jsonblob.com/api/71dc8c56-1e35-11e9-acce-8d77339b702d',
          dataLabel: 'value',
          dataValue: 'id'
        }
      },
      {
        label: 'CONTRACT NAME',
        name: 'contact_name',
        type: 'text',
        sort: true,
        order: 3
      },
      {
        label: 'DEADLINE FOR REVIEW',
        name: 'deadline_for_review',
        displayFormat: '{{item.deadline_for_review | date: "dd MMM, yyyy"}}',
        type: 'date',
        sort: true,
        order: 4
      },
      {
        label: 'LAST REVIEW',
        name: 'last_review',
        displayFormat: '{{item.last_review | date: "dd MMM, yyyy"}}',
        type: 'date',
        sort: true,
        order: 5
      },
      {
        label: 'LAST SCORE',
        name: 'last_score',
        type: '',
        sort: false,
        order: 6
      },
      {
        label: 'STATUS',
        name: 'status.name',
        type: 'text',
        sort: false,
        order: 7,
        toolTip: '{{row.tootip}}'
      }
    ],
    actions: {
      group: {
        displayStyle: 'button', // dropdown, menu
        items: [
          {
            type: 'page', // page,component
            label: 'New Contract',
            styling: {
              icon: '',
              tooltip: 'New Contract',
              cssStyle: '',
              cssColor: ''
            },
            api: {
              url: '',
              method: 'post/get/put/patch/delete',
              needConfirmation: true,
              confirmTitle: '',
              confirmMsg: ''
            },
            component: {
              id: '',
              type: 'modal', // modal/inline
              hideParent: true
            },
            page: {
              url: 'view/101',
              type: 'internal',
              target: 'self'
            }
          }
        ]
      },
      row: {
        displayStyle: 'dropdown/button/menu',
        items: [
          {
            type: 'api/component/page',
            label: 'Delete',
            styling: {
              icon: '',
              tooltip: '',
              cssStyle: '',
              cssColor: ''
            },
            api: {
              url: '',
              method: 'post/get/put/patch/delete',
              needConfirmation: true,
              confirmTitle: '',
              confirmMsg: ''
            },
            component: {
              id: '',
              type: 'modal/inline',
              hideParent: true
            },
            page: {
              url: '',
              type: 'internal/external',
              target: 'new/self'
            }
          },
          {
            type: 'widget',
            label: 'Bulk Update',
            styling: {
              icon: '',
              tooltip: '',
              cssStyle: '',
              cssColor: ''
            }
            // 'widget': {
            //   'type': 'inline/modal',
            //   'id': '',
            //   'initParams': {
            //     'uid': '[{{selected.uids}}]',
            //     'parent': '{{parentId}}'
            //   }
            // }
          }
        ]
      }
    }
  };

  constructor() {}

  ngOnInit() {}
}
