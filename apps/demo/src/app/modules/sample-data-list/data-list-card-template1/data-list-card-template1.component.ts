import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ZcDataListConfig } from '@zc-ui/zc-data-list';

@Component({
  selector: 'app-data-list-card-template1',
  templateUrl: './data-list-card-template1.component.html',
  styleUrls: ['./data-list-card-template1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataListCardTemplate1Component implements OnInit {
  table1Options: ZcDataListConfig = {
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
      type: 'card',
      cardTemplate: `
      <div class="card-widget">
        <div class="card-body">
          <h3 class="card-title">{{row.title}}</h3>
          <p class="card-text">{{row.desc}}</p>
          <img class="card-img-bottom" width="200"  src="{{row.image}}" alt="Card image cap" />
        </div>
      </div>
      `,
      dataSource:
        'https://jsonblob.com/api/4e0cb227-1ecb-11e9-a35a-fb67d0160e29',
      lazy: true,
      langProps: {},
      styling: {
        header: {
          frozen: true
        },
        freezeColumn: 0,
        row: {
          cssClass: 'card-template-1',
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
          fieldName: 'eligibility.value',
          value: 'no'
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
        displayStyle: 'icon',
        items: [
          {
            type: 'api',
            label: 'Edit',
            styling: {
              icon: 'icon-pencil',
              tooltip: 'Edit',
              cssStyle: '',
              cssColor: ''
            },
            api: {
              url: 'https://api.zerocode.de/editAppraisal',
              method: 'get',
              needConfirmation: true,
              confirmTitle: '',
              confirmMsg: ''
            }
          },
          {
            type: 'api',
            label: 'Delete',
            styling: {
              icon: 'icon-trash',
              tooltip: 'Delete',
              cssStyle: '',
              cssColor: ''
            },
            api: {
              url: 'https://api.zerocode.de/deleteAppraisal',
              method: 'delete',
              needConfirmation: true,
              confirmTitle: '',
              confirmMsg: ''
            }
          }
        ]
      }
    }
  };
  constructor() {}

  ngOnInit() {}
}
