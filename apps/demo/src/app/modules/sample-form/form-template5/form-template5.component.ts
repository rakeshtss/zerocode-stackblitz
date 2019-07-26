import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-template5',
  templateUrl: './form-template5.component.html',
  styleUrls: ['./form-template5.component.scss']
})
export class FormTemplate5Component implements OnInit {
  options = {
    title: 'Form events and conditions examples',
    id: '',
    properties: {
      preFillApi: {
        url: '',
        method: '',
        params: [
          {
            key: 'uid',
            value: '{{param.uid}}'
          }
        ]
      }
    },
    fields: [
      {
        containerClass: 'col-12 row bg-white border m-3',
        fieldItems: [
          {
            fieldClass: 'col-12 pt-3 pb-3',
            template: '<div><strong>Product total price:</strong></div>'
          },
          {
            name: 'price',
            label: 'Price',
            id: '',
            fieldClass: 'col-3',
            type: 'number',
            properties: {
              placeholder: 'Product price'
            }
          },
          {
            name: 'quantity',
            label: 'Quantity',
            id: '',
            fieldClass: 'col-3',
            type: 'number',
            properties: {
              placeholder: 'Product Quantity'
            }
          },
          {
            name: 'total',
            label: 'Total price',
            id: '',
            fieldClass: 'col-3',
            type: 'number',
            properties: {
              placeholder: 'Total Price',
              readonly: true
            },
            events: {
              onload: {
                conditions: [
                  {
                    fields: [
                      {
                        name: 'price',
                        type: 'number'
                      },
                      {
                        name: 'quantity',
                        type: 'number'
                      }
                    ],
                    value: '$[price]*$[quantity]'
                  }
                ]
              }
            }
          }
        ]
      },
      {
        containerClass: 'col-12 row bg-white border m-3',
        fieldItems: [
          {
            template: '<div><strong>Dependency dropdown:</strong></div>',
            fieldClass: 'col-12 pb-2'
          },
          {
            name: 'country',
            label: 'Country',
            id: '',
            fieldClass: 'col-6',
            type: 'select',
            defaultValue: '',
            properties: {
              // 'multiple': true,
              displayFormat: '',
              displayStyle: 'select',
              placeholder: 'Select country',
              required: true,
              messages: {
                required: ''
              }
            },
            dataSource: {
              type: 'api', // api, local
              options: [],
              api: {
                url:
                  'https://jsonblob.com/api/0b8c980f-283d-11e9-a29f-53c69e844e52',
                method: 'get',
                params: [],
                map: {
                  label: '',
                  value: '',
                  icon: '',
                  color: '',
                  image: ''
                }
              }
            }
          },
          {
            name: 'state',
            label: 'State',
            id: '',
            fieldClass: 'col-6',
            type: 'select',
            defaultValue: '',
            properties: {
              // 'multiple': true,
              displayFormat: '',
              displayStyle: 'select',
              placeholder: 'Select state',
              required: true,
              messages: {
                required: ''
              }
            },
            dataSource: {
              type: 'api', // api, local
              options: [],
              api: {
                url:
                  'https://jsonblob.com/api/04aa07af-2392-11e9-85f5-030483bdec17',
                method: 'get',
                params: [],
                map: {
                  label: '',
                  value: '',
                  icon: '',
                  color: '',
                  image: ''
                }
              }
            }
          }
        ]
      },
      {
        containerClass: 'col-12 row bg-white border m-3',
        fieldItems: [
          {
            fieldClass: 'col-12 pt-3 pb-3',
            template: '<div><strong>Table field totals:</strong></div>'
          },
          {
            "name": "invoice_details",
            "label": "Invoice Details",
            "fieldClass": "col-12",
            "type": "table",
            "defaultValue": [
              {
                "fee": "f1",
                "department": "d1",
                "gst": 9,
                "amount": 10000000,
                "total": 10900000
              }
            ],
            "properties": {},
            "cols": [
              {
                "name": "fee",
                "label": "Fee",
                "fieldClass": "col-12",
                "type": "text"
              },
              {
                "name": "department",
                "label": "Department",
                "fieldClass": "col-12",
                "type": "text"
              },
              {
                "name": "gst",
                "label": "GST",
                "fieldClass": "col-12",
                "type": "number"
              },
              {
                "name": "amount",
                "label": "Amount",
                "fieldClass": "col-12",
                "type": "number",
                "properties": {
                  "displayType": "currency",
                  "cssClass": "text-right",
                  "cssStyle": ""
                }
              },
              {
                "name": "total",
                "label": "Total",
                "fieldClass": "col-12",
                "type": "number",
                "properties": {
                  "displayType": "currency",
                  "currency": "UGX"
                }
              }
            ],
            "footer": [
              {
                "cols": [
                  {
                    "cssClass": "",
                    "cssStyle": "",
                    "colspan": 3,
                    "type": "label",
                    "label": "Total"
                    
                  },
                  {
                    "cssClass": "",
                    "cssStyle": "",
                    "colspan": 1,
                    "type": "expression",
                    "expression": "sum(amount)",
                    "displayType": "number"
                  },
                  {
                    "cssClass": "",
                    "cssStyle": "",
                    "colspan": 1,
                    "type": "expression",
                    "expression": "sum(total)",
                    "displayType": "currency",
                    "currency": "UGX"
                  }
                ]
              }
              
            ]
          }
        ]
      },
      {
        containerClass: 'col-12 row bg-white border m-3',
        fieldItems: [
          {
            fieldClass: 'col-12 pt-3 pb-3',
            template: '<div><strong>Table field inline:</strong></div>'
          },
          {
            "name": "candidates",
            "label": "Candidates",
            "fieldClass": "col-12",
            "type": "table",
            "defaultValue": [
              {
                "name": "ysr",
                "round_results.vote": "100",
                "is_leading": true
              },
              {
                "name": "tdp",
                "round_results.vote": "50",
                "is_leading": false
              },
              {
                "name": "others",
                "round_results.vote": "10",
                "is_leading": "true"
              }
            ],
            "properties": {},
            "cols": [
              {
                "name": "name",
                "label": "Name",
                "fieldClass": "col-12",
                "type": "text",
                "displayFormat": "{{item.name}} {{item.votes}}"
              },
              {
                "name": "round_results.vote",
                "label": "Votes",
                "fieldClass": "col-12",
                "type": "number",
                "inline": true
              },
              {
                "name": "is_leading",
                "label": "Leading",
                "fieldClass": "col-12",
                "type": "radio",
                "inline": true,
                "unique": true
              }
            ]
          }
        ]
      },
      {
        containerClass: 'col-12 row bg-white border m-3',
        fieldItems: [
          {
            fieldClass: 'col-12 pt-3 pb-3',
            template: '<div><strong>Submit Button Script:</strong></div>'
          },
          {
            "name": "submitBtn",
            "label": "Proceed",
            "id": "submitBtn",
            "fieldClass": "pr-2",
            "type": "button",
            "defaultValue": "",
            "properties": {
              "style": ""
            },
            "action": {
              "type": "script",
              "script": 'document.getElementById("myForm").submit();'
            }
          }
        ]
      }
    ]
  };
  constructor() { }

  ngOnInit() { }
}
