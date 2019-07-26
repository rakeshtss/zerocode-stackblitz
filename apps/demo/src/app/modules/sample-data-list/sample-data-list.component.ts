import { Component, OnInit } from '@angular/core';
import { ZcDataListConfig } from '@zc-ui/zc-data-list';

@Component({
  selector: 'app-sample-data-list',
  templateUrl: './sample-data-list.component.html',
  styleUrls: ['./sample-data-list.component.scss']
})
export class SampleDataListComponent implements OnInit {
  card1 = `<div class="card" style="width: 18rem;">
  <img class="card-img-top" width="50"  src="https://www.w3schools.com/howto/img_avatar.png" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;
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
        position: 'left',
        type: 'advanced',
        action: {
          position: 'both',
          submit: {
            label: 'Apply'
          },
          reset: {
            label: 'Clear All'
          }
        },
        submissionMode: 'all'
      },
      type: 'kanban', // kanban / table / card
      /* 'cardTemplate': `
      <div class="card-widget">
        <div class="card-body">
          <div class="card-body-left">
            <img class="card-img" width="100"
            src="https://images.vexels.com/media/users/3/129733/isolated/preview/
            a558682b158debb6d6f49d07d854f99f-casual-male-avatar-silhouette-by-vexels.png"
             alt="Card image cap" />
            <span>{{row.name}}</span>
          </div>
          <div class="card-body-right">
            <h3 class="card-title">Name:{{row.name}}</h3>
            <p class="card-text">Amount:{{row.requestedAmount.value}}</p>
            <p class="card-text">Eligibility: {{row.eligibility.label}}</p>
            <p class="card-text">Status: {{row.status.name}}</p>
            <p class="card-text">SubmittedBy: {{row.submittedBy.firstName}} {{row.submittedBy.lastName}}</p>
          </div>
        </div>
      </div>
      `, */
      kanban: {
        style: 'column', // row | column
        field: 'status.uid',
        dataSource:
          'https://jsonblob.com/api/3ef53db7-13f7-11e9-aac5-f51cbe6134d0',
        dropConfirmation: {
          needConfirmation: true,
          confirmTitle: '',
          confirmMsg: 'Are you sure you want to drop?'
        }
      },
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
      groupHeader: [
        {
          columns: [
            {
              key: 'checkbox',
              rowspan: 2
            },
            {
              key: 'name',
              rowspan: 2
            },
            {
              key: 'requestedAmount.value',
              rowspan: 2
            },
            {
              label: 'Eligibility & Status',
              cssClass: 'text-center',
              colspan: 2
            },
            {
              key: 'submittedBy.firstName',
              rowspan: 2
            },
            {
              key: 'submittedAt',
              rowspan: 2
            },
            {
              key: 'lastModifiedAt',
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
              key: 'eligibility.label'
            },
            {
              key: 'status.name'
            }
          ],
          cssStyle: '',
          cssClass: ''
        }
      ],
      noDataText: 'No appraisals found',
      rowSelection: {
        display: true,
        type: 'checkbox',
        rowspan: 2,
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
        width: '100px',
        hideLabel: false,
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
        order: 4,
        hideValue: false,
        prefix: [
          {
            iconSource: 'icon-star',
            colorSource: 'green',
            condition:
              '(item.status.name==="Pending")?"grey":(item.status.name==="Completed")?"green":"red"'
          }
        ],
        suffix: [
          {
            iconSource: 'icon-edit',
            colorSource: 'green',
            condition:
              '(item.status.name==="Pending")?"grey":(item.status.name==="Completed")?"green":"red"'
          }
        ]
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
        displayStyle: 'button',
        items: [
          {
            type: 'api',
            label: 'Add',
            styling: {
              icon: 'icon-plus',
              tooltip: 'Add',
              cssStyle: '',
              cssColor: ''
            },
            api: {
              url: 'https://api.zerocode.de/editAppraisal',
              method: 'get'
            }
          },
          {
            type: 'api',
            label: 'Delete',
            styling: {
              icon: 'icon-trash',
              tooltip: 'Delete',
              cssStyle: '',
              cssColor: 'blue'
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
      },
      row: {
        displayStyle: 'icon',
        items: [
          {
            type: 'api',
            label: 'Edit',
            disableCondition: {
              fieldName: 'eligibility.value',
              value: 'no'
            },
            styling: {
              icon: 'icon-pencil',
              tooltip: 'Edit',
              cssColor: 'blue'
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
            disableCondition: {
              fieldName: 'eligibility.value',
              value: 'no'
            },
            styling: {
              icon: 'icon-trash',
              tooltip: 'Delete',
              cssStyle: '',
              cssColor: 'red'
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

  table3Options = {
    title: 'Contracts',
    properties: {
      pagination: {
        autoScroll: false,
        size: '10',
        position: 'bottom',
        template:
          '<div class="p-1">Total {{totalRecords}}, rows {{(rows*page)+1}} - {{(rows*page)+(+rows)}}</div>'
      },
      filter: {
        title: 'Select Category',
        position: 'top',
        style: 'column'
      },
      style: 'table',
      dataSource:
        'https://jsonblob.com/api/4e6d6d5a-1e28-11e9-acce-513f083199b3',
      lazy: false,
      langProps: {},
      defaultOrder: {
        sidx: 'eligibility',
        sord: '0'
      },
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
      selection: {
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
        order: 3,
        filter: {
          required: true,
          type: 'text'
        }
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
        width: '10pt',
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
              needConfirmation: 'true/false',
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
              needConfirmation: 'true/false',
              confirmTitle: '',
              confirmMsg: ''
            },
            component: {
              id: '',
              type: 'modal/inline',
              hideParent: 'true/false /* applicable onluy for inline */'
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
              type: 'button',
              icon: '',
              tooltip: '',
              cssStyle: '',
              cssColor: ''
            },
            widget: {
              type: 'inline/modal',
              id: '',
              initParams: {
                uid: '[{{selected.uids}}]',
                parent: '{{parentId}}'
              }
            }
          }
        ]
      }
    }
  };

  constructor() {}

  ngOnInit() {}
}
