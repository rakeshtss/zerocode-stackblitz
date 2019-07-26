import { Component, OnInit } from '@angular/core';
import { ZcDataListConfig } from '@zc-ui/zc-data-list';

@Component({
  selector: 'app-data-list-template4',
  templateUrl: './data-list-template4.component.html',
  styleUrls: ['./data-list-template4.component.scss']
})
export class DataListTemplate4Component implements OnInit {
  options: ZcDataListConfig = {
    title: 'Requests',
    properties: {
      pagination: {
        autoScroll: false,
        size: 10,
        position: 'bottom',
        displayFormat:
          '<div class="p-1">Total {{totalRecords}}, rows {{(rows*page)+1}} - {{(rows*page)+(+rows)}}</div>',
        style: ''
      },
      lazy: false,
      filter: {
        title: '',
        type: 'advanced',
        position: 'left',
        submissionMode: 'all',
        action: {
          position: 'top',
          submit: {
            label: 'Apply'
          },
          reset: {
            label: 'Clear All'
          }
        }
      },
      type: 'table',
      dataSource:
        'https://jsonblob.com/api/fb95cc9d-1fb9-11e9-94d1-5f1ea07826c7',
      langProps: {},

      styling: {
        header: {
          frozen: true
        }
      },
      shrinkToFit: true,
      noDataText: 'No records found',
      rowSelection: {
        display: true,
        type: 'checkbox',
        disableCondition: {
          fieldName: 'name',
          value: 's'
        }
      }
    },
    cols: [
      {
        label: 'Date',
        name: 'date',
        type: 'date',
        sort: true,
        order: 1,
        prefix: [
          {
            iconSource: 'icon-star',
            colorSource: 'green'
          }
        ]
      },
      {
        label: 'Form Code',
        name: 'code',
        type: 'text',
        order: 2,
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
        label: 'Purpose',
        name: 'purpose',
        type: 'text',
        order: 3,
        sort: true
      },
      {
        label: 'Amount',
        name: 'amount',
        type: 'currency',
        // 'val': [15, 30],
        filter: {
          required: true,
          type: 'integerrange'
        },
        order: 4
      },
      {
        label: 'Sender',
        name: 'sender',
        type: 'text',
        sort: true,
        filter: {
          required: true,
          dataSource: '',
          type: 'text'
        },
        order: 5
      },
      {
        label: 'Due IN',
        name: 'dueDate',
        type: 'text',
        sort: true,
        filter: {
          required: true,
          // 'data': [
          //   {
          //     'label': '2',
          //     'value': '2'
          //   },
          //   {
          //     'label': '5',
          //     'value': '5'
          //   }
          // ],
          type: 'integer'
        },
        displayStyle: {
          type: 'text'
        },
        order: 6
      }
    ],
    actions: {
      group: {
        displayStyle: 'icon',
        items: []
      },
      row: {
        displayStyle: 'menu',
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
              confirmTitle: 'Edit Confirmation',
              confirmMsg: 'Do you want to edit?'
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
              confirmTitle: 'Delete Confirmation',
              confirmMsg: 'Do you want to delete?'
            }
          }
        ]
      }
    }
  };

  constructor() {}

  ngOnInit() {}
}
