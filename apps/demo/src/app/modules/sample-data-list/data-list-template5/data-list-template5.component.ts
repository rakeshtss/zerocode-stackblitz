import { Component, OnInit } from '@angular/core';
import { ZcDataListConfig } from '@zc-ui/zc-data-list';

@Component({
  selector: 'app-data-list-template5',
  templateUrl: './data-list-template5.component.html',
  styleUrls: ['./data-list-template5.component.scss']
})
export class DataListTemplate5Component implements OnInit {
  options: ZcDataListConfig = {
    title: 'Select Emails',
    properties: {
      pagination: {
        autoScroll: false,
        size: 10,
        position: 'top',
        displayFormat: 'Selected {{(rows*page)+(+rows)}} of {{totalRecords}}',
        style: ''
      },
      type: 'table',
      dataSource:
        'https://jsonblob.com/api/16ea08cb-1f03-11e9-a35a-458f0d5ba503',
      langProps: {},
      filter: {
        title: 'Contacts filters',
        type: 'advanced',
        position: 'left',
        submissionMode: 'all'
      },

      styling: {
        container: {
          cssStyle: '',
          cssClass: '',
          bgColor: '',
          fgColor: '',
          font: ''
        },
        header: {
          cssStyle: '',
          cssClass: '',
          frozen: true
        },
        row: {
          cssStyle: '',
          cssClass: '',
          evenColor: '',
          oddColor: '',
          mouseOverColorSource: '{{row.color}}',
          bgColorSource: '{{row.color}}'
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
        label: 'Name',
        name: 'name',
        type: 'text',
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
        },
        filter: {
          required: true,
          type: 'text',
          dataSource: '',
          dataLabel: 'value',
          dataValue: 'id'
        }
      },
      {
        label: 'Email',
        name: 'email',
        type: 'text',
        order: 2
      },
      {
        label: 'Category',
        name: 'category.label',
        type: 'select',
        order: 3,
        filter: {
          required: true,
          type: 'multicheckbox',
          dataSource:
            'https://jsonblob.com/api/44f2ed71-2059-11e9-903b-59705535d904',
          dataLabel: 'value',
          dataValue: 'id'
        }
      },
      {
        label: 'Status',
        name: 'status.label',
        type: 'select',
        order: 4,
        filter: {
          required: true,
          type: 'multicheckbox',
          dataSource:
            'https://jsonblob.com/api/75f7c181-2059-11e9-903b-7952289a8d28',
          dataLabel: 'value',
          dataValue: 'id'
        }
      }
    ],
    actions: {
      group: {
        displayStyle: 'button', // dropdown, menu
        items: [
          // {
          //     'type': 'page', // page,component
          //     'label': 'Select Emails',
          //     'styling': {
          //       'icon': '',
          //       'tooltip': 'Select Emails',
          //       'cssStyle': '',
          //       'cssColor': ''
          //     },
          //     'api': {
          //       'url': '',
          //       'method': 'post/get/put/patch/delete',
          //       'needConfirmation': 'true/false',
          //       'confirmTitle': '',
          //       'confirmMsg': ''
          //     },
          //     'component': {
          //       'id': '',
          //       'type': 'modal', // modal/inline
          //       'hideParent': true
          //     },
          //     'page': {
          //       'url': 'view/101',
          //       'type': 'internal',
          //       'target': 'self'
          //     }
          //   }
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
              needConfirmation: false,
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
