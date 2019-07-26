import { Component, OnInit } from '@angular/core';
import { ZcDataListConfig } from '@zc-ui/zc-data-list';

@Component({
  selector: 'app-data-list-template3',
  templateUrl: './data-list-template3.component.html',
  styleUrls: ['./data-list-template3.component.scss']
})
export class DataListTemplate3Component implements OnInit {
  options: ZcDataListConfig = {
    title: 'Comparison',
    properties: {
      pagination: {
        autoScroll: false,
        size: 10,
        position: 'top',
        displayFormat: 'Selected {{(rows*page)+(+rows)}} of {{totalRecords}}',
        style: ''
      },
      lazy: false,
      type: 'table',
      dataSource:
        'https://jsonblob.com/api/430d8357-1fa3-11e9-94d1-dba70dcf1536',
      langProps: {},
      globalFilter: {
        label: 'Search',
        position: 'topLeft'
      },
      filter: {
        title: 'Contacts Filters',
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
          cssClass: ''
        },
        row: {
          cssStyle: '',
          cssClass: '',
          evenColor: '',
          oddColor: '',
          mouseOverColorSource: '{{row.color}}'
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
        label: 'Project Name',
        name: 'name',
        type: 'text',
        order: 1,
        filter: {
          required: true,
          type: 'multicheckbox',
          dataSource:
            'https://jsonblob.com/api/4002d45f-1fa6-11e9-94d1-c76b3d6bfdb2',
          dataLabel: 'value',
          dataValue: 'id',
          fieldNames:
            'project_name' /*comma seperated field names to serach for*/
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
        label: 'Department Name',
        name: 'department_name',
        type: 'text',
        order: 2,
        filter: {
          required: true,
          type: 'multicheckbox',
          dataSource:
            'https://jsonblob.com/api/b81854e5-1fb3-11e9-94d1-dd7e661416c4',
          dataLabel: 'value',
          dataValue: 'id',
          fieldNames:
            'department_name' /*comma seperated field names to serach for*/
        }
      },
      {
        label: 'Scientists Involved',
        name: 'scientists_involved',
        type: 'text',
        order: 3,
        filter: {
          required: true,
          type: 'multicheckbox',
          dataSource:
            'https://jsonblob.com/api/112ac2da-1fb4-11e9-94d1-bb34d83ff78c',
          dataLabel: 'value',
          dataValue: 'id',
          fieldNames:
            'scientists_involved' /*comma seperated field names to serach for*/
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
        label: 'Powered By',
        name: 'powered_by',
        type: 'text',
        order: 4
      },
      {
        label: 'Ratings',
        name: 'ratings',
        type: 'integer',
        order: 5
      },
      {
        label: 'Comments',
        name: 'comments',
        type: 'relation',
        displayFormat: '',
        order: 6,
        hideValue: true,
        cssStyle: 'font-size:50px;',
        prefix: [
          {
            iconSource: 'icon-comment',
            colorSource: '#CCC',
            condition: {
              fieldName: 'comments',
              value: 'null'
            }
          },
          {
            iconSource: 'icon-comment',
            colorSource: 'blue',
            condition: {
              fieldName: 'comments',
              value: 'test comments'
            }
          }
        ]
      }
      // {
      //   'label': 'Comments',
      //   'displayFormat': `<i *ngIf="item.comments" class="icon-comment" style="color:blue;font-size:30px;"></i>
      //       <i *ngIf="!item.comments" class="icon-comment" style="color:#CCC;font-size:30px;"></i>`,
      //   'name': 'comments',
      //   'type': 'text',
      //   'order': 6
      // }
    ]
  };

  constructor() {}

  ngOnInit() {}
}
