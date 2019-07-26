import { Component, OnInit } from '@angular/core';
import { ZcDataListConfig } from '@zc-ui/zc-data-list';

@Component({
  selector: 'app-data-list-template1',
  templateUrl: './data-list-template1.component.html',
  styleUrls: ['./data-list-template1.component.scss']
})
export class DataListTemplate1Component implements OnInit {
  options: ZcDataListConfig = {
    title: 'Appraisals',
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
        title: 'Advanced',
        position: 'right',
        type: 'column',
        submissionMode: 'all'
      },
      type: 'table',
      dataSource:
        'https://jsonblob.com/api/343e0491-1303-11e9-b2cc-c94266e92db5',
      lazy: true,
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
      noDataText: 'No appraisals found',
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
        label: 'Name',
        name: 'name',
        type: 'text',
        filter: {
          required: true,
          type: 'text',
          dataSource: '',
          dataLabel: 'value',
          dataValue: 'id',
          fieldNames:
            'firstname, lastname' /*comma seperated field names to serach for*/
        },
        order: 1,
        toolTip: '',
        target: {
          type: 'page',
          page: {
            type: 'self',
            mode: 'internal',
            url: '',
            uid: '{{uid}}'
          }
        },
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
        label: 'Requested',
        name: 'requestedAmount.value',
        type: 'currency',
        displayFormat:
          '{{item.requestedAmount.value | currency:null:item.requestedAmount.code + " "}}',
        sort: true,
        filter: {
          required: true,
          type: 'integer',
          dataSource: '',
          dataLabel: 'value',
          dataValue: 'id'
        },
        order: 2
      },
      {
        label: 'Eligibile',
        name: 'eligibility.label',
        type: 'choose',
        displayStyle: {
          type: 'color',
          source: 'eligibility.color'
        },
        filter: {
          required: true,
          type: 'radio',
          dataSource:
            'https://jsonblob.com/api/e08d9b9a-13f6-11e9-aac5-db67d55e0221',
          dataLabel: 'value',
          dataValue: 'id',
          fieldNames:
            'firstname, lastname' /*comma seperated field names to serach for*/
        },
        order: 3
      },
      {
        label: 'Status',
        name: 'status.name',
        type: 'relation',
        displayStyle: {
          type: 'color',
          source: 'status.color'
        },
        filter: {
          required: true,
          type: 'multicheckbox',
          dataSource:
            'https://jsonblob.com/api/3ef53db7-13f7-11e9-aac5-f51cbe6134d0',
          dataLabel: 'value',
          dataValue: 'id',
          fieldNames:
            'firstname, lastname' /*comma seperated field names to serach for*/
        },
        order: 4
      },

      {
        label: 'Submitted by',
        name: 'submittedBy.firstName',
        type: 'relation',
        displayFormat:
          '{{item.submittedBy.firstName}} {{item.submittedBy.lastName}}',
        filter: {
          required: true,
          type: 'text',
          dataSource:
            'https://jsonblob.com/api/3b64bc30-13fa-11e9-aac5-ff48c8d37b5d',
          dataLabel: 'value',
          dataValue: 'id',
          fieldNames:
            'firstname, lastname' /*comma seperated field names to serach for*/
        },
        order: 5
      },
      {
        label: 'Date submitted',
        name: 'submittedAt',
        type: 'datetime',
        displayFormat: '{{item.submittedAt | date: "dd-MMM-yy"}}',
        filter: {
          required: true,
          type: 'date',
          dataSource: '',
          dataLabel: 'value',
          dataValue: 'id',
          fieldNames:
            'firstname, lastname' /*comma seperated field names to serach for*/
        },
        order: 6
      },
      {
        label: 'Last Modified',
        name: 'lastModifiedAt',
        type: 'datetime',
        displayFormat: '{{item.lastModifiedAt | timeAgo}}',
        order: 7
      }
    ],
    actions: {
      group: {
        displayStyle: 'button', // dropdown, menu
        items: [
          {
            type: 'page', // page,component
            label: 'New Appraisal',
            styling: {
              icon: '',
              tooltip: 'New Appraisal',
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
              hideParent: false
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
