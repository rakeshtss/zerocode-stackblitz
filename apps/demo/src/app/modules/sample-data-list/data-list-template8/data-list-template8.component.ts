import { Component, OnInit } from '@angular/core';
import { ZcDataListConfig } from '@zc-ui/zc-data-list';

@Component({
  selector: 'app-data-list-template8',
  templateUrl: './data-list-template8.component.html',
  styleUrls: ['./data-list-template8.component.scss']
})
export class DataListTemplate8Component implements OnInit {
  options: ZcDataListConfig = {
    title: 'Client',
    properties: {
      pagination: {
        autoScroll: false,
        size: 50,
        position: 'bottom',
        displayFormat:
          '<div class="p-1">{{(rows*page)+1}} - {{(rows*page)+(+rows)}} of {{totalRecords}}</div>',
        style: ''
      },
      type: 'table',
      filter: {
        title: '',
        position: '',
        type: 'column',
        submissionMode: 'all'
      },
      dataSource:
        'https://jsonblob.com/api/9f42f82e-1ede-11e9-a35a-3544401ec017',
      langProps: {},
      globalFilter: {
        label: 'Search',
        position: 'topLeft'
      },

      styling: {
        header: {
          frozen: true
        },
        row: {
          mouseOverColorSource: 'grey'
        }
      },
      shrinkToFit: true,
      noDataText: 'No Poll found',
      rowSelection: {
        display: true,
        type: 'row',
        disableCondition: {
          fieldName: 'name',
          value: 's'
        }
      }
    },
    cols: [
      {
        label: 'Client Name',
        name: 'name',
        type: 'text',
        order: 1
      },
      {
        label: 'Location',
        name: 'location',
        type: 'text',
        order: 2
      },
      {
        label: '# of Leads',
        name: 'no_of_leads',
        type: 'integer',
        order: 3
      },
      {
        label: 'Monthly Sales (2016)',
        name: 'monthly_sales',
        type: '',
        order: 4
      },
      {
        label: 'Leads Stages',
        name: 'leads_stages',
        type: '',
        order: 5
      },
      {
        label: 'Toatal Sales',
        name: 'total_sales.value',
        type: 'currency',
        displayFormat:
          '{{item.total_sales.value | currency:null:item.total_sales.symbol + " "}}',
        order: 6
      },
      {
        label: 'Forecast',
        name: 'forecast.value',
        type: 'currency',
        displayFormat:
          '{{item.forecast.value | currency:null:item.forecast.symbol + " "}}',
        order: 7
      },
      {
        label: 'Account Manager',
        name: 'account_manager.label',
        type: 'select',
        order: 8
      },
      {
        label: 'Stock Status',
        name: 'status.name',
        type: 'select',
        // 'displayFormat': '{{row.icon}}',
        order: 9
      }
    ],
    actions: {
      group: {
        displayStyle: 'button', // dropdown, menu
        items: [
          {
            type: 'page', // page,component
            label: 'New Client',
            styling: {
              icon: '',
              tooltip: 'New Client',
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
