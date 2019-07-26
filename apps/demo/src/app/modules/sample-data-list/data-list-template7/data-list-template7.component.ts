import { Component, OnInit } from '@angular/core';
import { ZcDataListConfig } from '@zc-ui/zc-data-list';

@Component({
  selector: 'app-data-list-template7',
  templateUrl: './data-list-template7.component.html',
  styleUrls: ['./data-list-template7.component.scss']
})
export class DataListTemplate7Component implements OnInit {
  options: ZcDataListConfig = {
    title: 'Active Poll',
    properties: {
      pagination: {
        autoScroll: false,
        size: 10,
        position: 'bottom',
        displayFormat: '',
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
        'https://jsonblob.com/api/acb821d0-1ef5-11e9-a35a-599f8e5faa65',
      langProps: {},

      styling: {
        header: {
          frozen: true
        },
        row: {
          mouseOverColorSource: 'lightgreen'
        },
        freezeColumn: 2
      },
      shrinkToFit: true,
      noDataText: 'No active polls',
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
        label: 'Poll Name',
        name: 'name',
        type: 'text',
        order: 1
      },
      {
        label: 'Progress',
        name: 'progress',
        type: 'integer',
        order: 2,
        displayFormat: '{{item.progress}} %'
      },
      {
        label: 'Status',
        name: 'status.label',
        type: 'select',
        order: 3
      },
      {
        label: 'Total Questions',
        name: 'total_questions',
        type: 'integer',
        order: 4
      },
      {
        label: 'Answered',
        name: 'answered',
        type: 'integer',
        order: 5
      },
      {
        label: 'End Date',
        name: 'end_date',
        type: 'date',
        order: 6,
        displayFormat: '{{item.end_date | date: "dd-MMM-yyyy"}}'
      },
      {
        label: 'Take Poll',
        name: 'take_poll',
        type: 'text',
        order: 7
      },
      {
        label: 'Take Poll',
        name: 'take_poll',
        type: 'text',
        order: 7
      }
    ],
    actions: {
      group: {
        displayStyle: 'button', // dropdown, menu
        items: [
          // {
          //   'type': 'page', // page,component
          //   'label': '',
          //   'styling': {
          //     'icon': '',
          //     'tooltip': 'New Country Lead',
          //     'cssStyle': '',
          //     'cssColor': ''
          //   },
          //   'api': {
          //     'url': '',
          //     'method': 'post/get/put/patch/delete',
          //     'needConfirmation': 'true/false',
          //     'confirmTitle': '',
          //     'confirmMsg': ''
          //   },
          //   'component': {
          //     'id': '',
          //     'type': 'modal', // modal/inline
          //     'hideParent': true
          //   },
          //   'page': {
          //     'url': 'view/101',
          //     'type': 'internal',
          //     'target': 'self'
          //   }
          // }
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
