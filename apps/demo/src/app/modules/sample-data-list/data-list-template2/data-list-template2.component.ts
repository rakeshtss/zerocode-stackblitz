import { Component, OnInit } from '@angular/core';
import { ZcDataListConfig } from '@zc-ui/zc-data-list';

@Component({
  selector: 'app-data-list-template2',
  templateUrl: './data-list-template2.component.html',
  styleUrls: ['./data-list-template2.component.scss']
})
export class DataListTemplate2Component implements OnInit {
  options: ZcDataListConfig = {
    title: '',
    properties: {
      pagination: {
        autoScroll: false,
        size: 10,
        position: 'bottom',
        displayFormat: '',
        style: ''
      },
      lazy: false,
      type: 'table',
      dataSource:
        'https://jsonblob.com/api/08cd6a28-1fa7-11e9-94d1-2732c0a6303d',
      langProps: {},

      globalFilter: {
        label: 'Search',
        position: 'topLeft'
      },
      shrinkToFit: true,
      groupHeader: [
        {
          columns: [
            {
              key: 'title',
              rowspan: 2
            },
            {
              key: 'coordinators',
              rowspan: 2
            },
            {
              key: 'inauguration',
              rowspan: 2
            },
            {
              key: 'website_flash_date',
              rowspan: 2
            },
            {
              label: 'Number of participants (ONLY for completed programmes)',
              cssClass: 'text-left',
              colspan: 3
            },
            {
              key: 'status.label',
              rowspan: 2
            },
            {
              label: 'Actions',
              type: 'actions',
              rowspan: 2
            }
          ],
          cssStyle: '',
          cssClass: ''
        },
        {
          columns: [
            {
              key: 'total'
            },
            {
              key: 'women'
            },
            {
              key: 'farmers'
            }
          ],
          cssStyle: '',
          cssClass: ''
        }
      ],
      noDataText: 'No records found',
      filter: {
        title: '',
        position: '',
        type: 'column',
        submissionMode: 'all'
      },
      rowSelection: {
        display: true,
        type: 'row',
        disableCondition: {
          fieldName: 'name',
          value: 's'
        }
      },
      styling: {
        header: {
          frozen: true
        },
        row: {
          mouseOverColorSource: 'lightgreen'
        }
      }
    },
    cols: [
      {
        label: 'Title',
        name: 'title',
        sort: true,
        hideLabel: true,
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
          dataValue: 'id',
          fieldNames: 'title' /*comma seperated field names to serach for*/
        }
      },
      {
        label: 'Coordinators',
        name: 'coordinators',
        type: 'text',
        order: 2
      },
      {
        label: 'Inauguration / Valedictory on',
        name: 'inauguration',
        type: 'date',
        order: 3,
        displayFormat: '{{item.inauguration | date: "dd, MMM-yyyy"}}',
        filter: {
          required: true,
          type: 'date',
          dataSource: '',
          dataLabel: 'value',
          dataValue: 'id',
          fieldNames:
            'inauguration' /*comma seperated field names to serach for*/
        }
      },
      {
        label: 'Date(s) of Website flash',
        name: 'website_flash_date',
        type: 'date',
        order: 4,
        displayFormat: '{{item.website_flash_date | date: "dd, MMM-yyyy"}}',
        filter: {
          required: true,
          type: 'date',
          dataSource: '',
          dataLabel: 'value',
          dataValue: 'id',
          fieldNames:
            'website_flash_date' /*comma seperated field names to serach for*/
        }
      },
      {
        label: 'Total',
        name: 'total',
        type: 'integer',
        order: 5
      },
      {
        label: 'Women',
        name: 'women',
        type: 'integer',
        order: 6
      },
      {
        label: 'Farmers',
        name: 'farmers',
        type: 'integer',
        order: 7
      },
      {
        label: 'Status',
        name: 'status.label',
        type: 'select',
        order: 8,
        displayStyle: {
          type: 'color',
          source: 'status.color'
        }
      }
    ],
    actions: {
      group: {
        displayStyle: 'button', // dropdown, menu
        items: []
      },
      row: {
        displayStyle: 'icon',
        items: [
          {
            type: 'api',
            label: 'Delete',
            styling: {
              icon: 'icon-trash',
              tooltip: '',
              cssStyle: 'color: #4286f4',
              cssColor: '#4286f4'
            },
            api: {
              url: '',
              method: 'delete',
              needConfirmation: true,
              confirmTitle: '',
              confirmMsg: ''
            }
          }
          // {
          //   'type': 'widget',
          //   'label': 'Bulk Update',
          //   'styling': {
          //     'type': 'button',
          //     'icon': '',
          //     'tooltip': '',
          //     'cssStyle': '',
          //     'cssColor': ''
          //   },
          //   'widget': {
          //     'type': 'inline/modal',
          //     'id': '',
          //     'initParams': {
          //       'uid': '[{{selected.uids}}]',
          //       'parent': '{{parentId}}'
          //     }
          //   }
          // }
        ]
      }
    }
  };

  constructor() {}

  ngOnInit() {}
}
