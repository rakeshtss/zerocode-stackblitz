import { Component, OnInit } from '@angular/core';
import { ZcDataListConfig } from '@zc-ui/zc-data-list';

@Component({
  selector: 'app-data-list-template9',
  templateUrl: './data-list-template9.component.html',
  styleUrls: ['./data-list-template9.component.scss']
})
export class DataListTemplate9Component implements OnInit {
  options: ZcDataListConfig = {
    title: 'Pending Convenents',
    properties: {
      pagination: {
        autoScroll: true,
        size: 10,
        style: ''
      },
      dataSource:
        'https://jsonblob.com/api/5753e5c0-2381-11e9-85f5-471d54fe50d7',
      langProps: {},

      type: 'table',
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
          fieldName: '',
          value: ''
        }
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
      noDataText: 'No records found'
    },
    cols: [
      {
        label: 'Pic',
        name: 'pic',
        hideLabel: true,
        type: 'image',
        order: 1,
        displayFormat: '<img src="{{item.pic}}" style="width:50%">'
      },
      {
        label: 'Company Name',
        name: 'company_name',
        type: 'text',
        order: 2
      },
      {
        label: 'Loan Type',
        name: 'loan_type.label',
        type: 'select',
        order: 3
      },
      {
        label: 'Stage',
        name: 'stage.label',
        type: 'currency',
        order: 4
      },
      {
        label: 'Loan Amount',
        name: 'loan_amount.value',
        type: 'currency',
        order: 5,
        displayFormat:
          '{{item.loan_amount.value | currency:null:item.loan_amount.symbol + " "}}'
      },
      {
        label: 'Last Updated',
        name: 'last_updated',
        type: 'date',
        order: 6,
        displayFormat: '{{item.last_updated | date: "dd, MMM-yyyy"}}',
        filter: {
          required: true,
          type: 'daterange',
          dataSource: '',
          dataLabel: 'value',
          dataValue: 'id'
        }
      },
      {
        label: 'Data Completeness(%)',
        name: 'data_complete',
        type: 'integer',
        order: 7
      }
    ]
  };

  constructor() {}

  ngOnInit() {}
}
