import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-template1',
  templateUrl: './form-template1.component.html',
  styleUrls: ['./form-template1.component.scss']
})
export class FormTemplate1Component implements OnInit {
  options = {
    title: 'Feedback on Product',
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
        title: '',
        id: '',
        containerClass: 'row',
        fieldClass: 'col-12',
        fieldItems: [
          {
            name: 'text',
            label: 'Text Field',
            id: '',
            fieldClass: 'col-6',
            type: 'text',
            defaultValue: '',
            properties: {
              placeholder: 'Please enter text',
              // 'maxLength': 10,
              // 'minLength': 6,
              pattern: '', // /^[a-zA-Z ]{2,30}$/
              required: true,
              messages: {
                maxLength: 'Please enter atleast 4 characters',
                minLength: 'Please enter atleast 8 characters',
                pattern: '',
                required: 'This is Required'
              }
            },
            events: {
              onload: {},
              onblur: {}
            }
          },
          {
            name: 'selectField',
            label: 'Select',
            id: '',
            fieldClass: 'col-6',
            type: 'select',
            defaultValue: '',
            properties: {
              // 'multiple': true,
              displayFormat: '',
              displayStyle: 'select',
              placeholder: 'Pick your fruit',
              required: true,
              messages: {
                required: ''
              }
            },
            dataSource: {
              type: 'api', // api, local
              options: [
                {
                  label: 'Apple',
                  value: 'product_1',
                  icon: '',
                  color: '',
                  image: ''
                },
                {
                  label: 'Mango',
                  value: 'product_2',
                  icon: '',
                  color: '',
                  image: ''
                }
              ],
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
          },
          {
            name: 'radioField',
            label: 'Radio Field',
            id: '',
            fieldClass: 'col-4',
            type: 'radio',
            defaultValue: '',
            properties: {
              // 'multiple': true,
              displayFormat: '',
              displayStyle: 'radio',
              placeholder: '',
              required: true,
              messages: {
                required: ''
              }
            },
            dataSource: {
              type: 'api',
              options: [
                {
                  name: 'Apple',
                  uid: 'product_1',
                  icon: '',
                  color: '',
                  image: ''
                },
                {
                  name: 'Mango',
                  uid: 'product_2',
                  icon: '',
                  color: '',
                  image: ''
                }
              ],
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
          },
          {
            name: 'CheckboxField',
            label: 'Checkbox Field',
            id: '',
            fieldClass: 'col-4',
            type: 'checkbox',
            hiddenLabel: false,
            defaultValue: '',
            properties: {
              multiple: true,
              displayFormat: '',
              displayStyle: 'checkbox',
              placeholder: '',
              required: true,
              messages: {
                required: 'This field is required'
              }
            },
            dataSource: {
              type: 'api',
              options: [
                {
                  name: 'Apple',
                  uid: 'product_1',
                  icon: '',
                  color: '',
                  image: ''
                },
                {
                  name: 'Mango',
                  uid: 'product_2',
                  icon: '',
                  color: '',
                  image: ''
                }
              ],
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
          },
          {
            name: 'autocompleteField',
            label: 'Autocomplete',
            id: '',
            fieldClass: 'col-4',
            type: 'autocomplete', // choose | relation
            properties: {
              displayFormat: '<here html>',
              displayStyle: 'autocomplete',
              placeholder: 'Add tags',
              required: true,
              multiple: true,
              inlineStyle: ''
            },
            dataSource: {
              type: 'api',
              api: {
                url:
                  'https://jsonblob.com/api/8cbd4d17-245f-11e9-9d14-436617e998f3',
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
            name: 'textarea',
            label: 'Textarea Field',
            id: '',
            fieldClass: 'col-12',
            type: 'textarea',
            defaultValue: '',
            properties: {
              pattern: '',
              displayStyle: 'htmleditor',
              placeholder: 'Your Message...',
              row: 5,
              col: 100,
              minLength: 10,
              maxLength: 100,
              required: true,
              messages: {
                maxLength: '',
                minLength: '',
                pattern: '',
                required: 'This is Required'
              }
            }
          },
          {
            name: 'htmlEditorField',
            label: 'HTML Editor',
            id: '',
            fieldClass: 'col-6',
            type: 'html-editor',
            properties: {
              placeholder: 'HTML Editor',
              row: 12,
              // 'required': true,
              messages: {
                required: 'Invalid'
              }
            }
          },
          {
            name: 'map',
            label: 'Map Field',
            id: '',
            fieldClass: 'col-6',
            type: 'map',
            defaultValue: {
              lat: '',
              lng: '',
              address: ''
            },
            properties: {
              multiple: true,
              required: true,
              markerDragable: false,
              searchFilter: true,
              messages: {
                required: 'This field is required'
              }
            },
            dataSource: {
              type: 'api',
              options: [
                {
                  lat: 17.432,
                  lng: 78.44692,
                  label: 'Image Hospital, Madhapur, Hyderabad',
                  draggable: false
                },
                {
                  lat: 25.46855,
                  lng: 78.53566,
                  label: 'Sk Nagar2 - 500018',
                  draggable: false
                },
                {
                  lat: 20.28591,
                  lng: 85.79091,
                  label:
                    'Plot No. 50 51, Mouza Jokalandi, P.O.Baramunda, Bhubaneswar, Odisha, India - 751003',
                  draggable: false
                },
                {
                  lat: 20.33297,
                  lng: 85.81568,
                  label:
                    'Rail Vihar, Chandrasekharpur, Bhubaneswar, Odisha - 751023',
                  draggable: false
                },
                {
                  lat: 29.71136,
                  lng: 76.87542,
                  label: 'Zarifa Farm, Kachhwa Road, Karnal, Haryana - 132001',
                  draggable: false
                }
              ],
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
          },
          {
            name: 'tableField',
            label: 'Table',
            id: '',
            fieldClass: 'col-12',
            type: 'table',
            defaultValue: [
              {
                title: 'Motor car parts 1',
                availableStock: 20,
                make: '24 March 2014',
                charge: 5000,
                image:
                  'http://www.motorcarparts.com/content/uploads/2017/02/starter1_product.png'
              },
              {
                title: 'Motor car parts 2',
                availableStock: 20,
                make: '24 March 2014',
                charge: 5000,
                image:
                  'http://www.motorcarparts.com/content/uploads/2017/02/starter1_product.png'
              },
              {
                title: 'Motor car parts 3',
                availableStock: 20,
                make: '24 March 2014',
                charge: 5000,
                image:
                  'http://www.motorcarparts.com/content/uploads/2017/02/starter1_product.png'
              },
              {
                title: 'Motor car parts 4',
                availableStock: 20,
                make: '24 March 2014',
                charge: 5000,
                image:
                  'http://www.motorcarparts.com/content/uploads/2017/02/starter1_product.png'
              }
            ],
            properties: {
              style: 'table',
              placeholder: 'Table field',
              required: true,
              minLength: 10,
              messages: {
                required: 'Invalid',
                minlength: 'Please enter table data'
              }
            },
            cols: [
              {
                label: 'Title',
                name: 'title',
                type: 'select',
                width: '10px',
                hideLabel: false,
                displayFormat: '{{item.title}}'
              },
              {
                label: 'Available Stock',
                name: 'availableStock',
                type: 'number',
                width: '10px',
                hideLabel: false,
                displayFormat: '{{item.availableStock}}'
              },
              {
                label: 'Make',
                name: 'make',
                type: 'date',
                width: '10px',
                hideLabel: false,
                displayFormat: '{{item.make}}'
              },
              {
                label: 'Charge',
                name: 'charge',
                type: 'date',
                width: '10px',
                hideLabel: false,
                displayFormat: '{{item.charge}}'
              }
              // {
              //   'label': 'Image',
              //   'name': 'image',
              //   'type': 'image',
              //   'width': '10px',
              //   'hideLabel': false,
              //   'displayFormat': '{{item.image}}'
              // }
            ],
            actions: {
              group: {
                displayStyle: 'menu/button/icon',
                add: {
                  type: 'component',
                  label: 'Add Spares',
                  styling: {
                    icon: '',
                    tooltip: '',
                    cssStyle: '',
                    cssColor: ''
                  },
                  component: {
                    id: 'createForm',
                    type: 'modal/inline',
                    hideParent: 'true/false'
                  }
                }
              },
              row: {
                delete: {
                  type: 'local | api',
                  label: 'Add Spares',
                  styling: {
                    icon: '',
                    tooltip: '',
                    cssStyle: '',
                    cssColor: ''
                  },
                  api: {
                    url: '',
                    method: 'delete'
                  },
                  needConfirmation: 'true/false',
                  confirmTitle: '',
                  confirmMsg: ''
                },
                edit: {
                  type: 'component',
                  label: 'Edit Spare',
                  styling: {
                    icon: '',
                    tooltip: '',
                    cssStyle: '',
                    cssColor: ''
                  },
                  component: {
                    id: '',
                    type: 'modal/inline',
                    hideParent: 'true/false',
                    sendRowData: true
                  }
                }
              }
            }
          },
          {
            name: 'date',
            label: 'Date Field',
            id: '',
            fieldClass: 'col-4',
            type: 'date',
            defaultValue: '',
            properties: {
              placeholder: 'dd/mm/yyyy',
              dateFormat: 'dd/mm/yyyy',
              selectionMode: 'single | multiple | range',
              minDays: '',
              maxDays: '',
              disabledDays: [],
              required: true,
              messages: {
                required: ''
              }
            }
          },
          {
            name: 'dateTimeField',
            label: 'Date Time Field',
            id: '',
            fieldClass: 'col-4',
            type: 'date',
            defaultValue: '',
            properties: {
              placeholder: 'dd/mm/yyyy',
              dateFormat: 'dd/mm/yyyy',
              selectionMode: 'single | multiple | range',
              minDays: '',
              maxDays: '',
              disabledDays: [],
              required: true,
              showTime: true,
              messages: {
                required: ''
              }
            }
          },
          {
            name: 'timeField',
            label: 'Time Field',
            id: '',
            fieldClass: 'col-4',
            type: 'date',
            defaultValue: '',
            properties: {
              placeholder: 'dd/mm/yyyy',
              dateFormat: 'dd/mm/yyyy',
              selectionMode: 'single | multiple | range',
              minDays: '',
              maxDays: '',
              disabledDays: [],
              required: true,
              timeOnly: true,
              messages: {
                required: ''
              }
            }
          },
          {
            name: 'number',
            label: 'Number Field',
            id: '',
            fieldClass: 'col-4',
            type: 'number',
            defaultValue: '',
            properties: {
              placeholder: 'Please enter number',
              max: 15,
              min: 2,
              required: true,
              messages: {
                min: 'Minimum number should be 2',
                max: 'Maximun number should be 15',
                required: 'This field is required'
              }
            }
          },
          {
            name: 'password',
            label: 'Password Field',
            id: '',
            fieldClass: 'col-4',
            type: 'password',
            defaultValue: '',
            properties: {
              placeholder: 'Please enter a password',
              maxLength: '',
              minLength: '',
              pattern: '',
              required: true,
              messages: {
                minLength: '',
                maxLength: '',
                pattern: '',
                required: 'This field is required'
              }
            }
          },
          {
            name: 'booleanField',
            label: 'Boolean',
            id: '',
            fieldClass: 'col-3',
            type: 'boolean',
            properties: {
              placeholder: 'Boolean Field',
              // 'required': true,
              messages: {
                required: 'Invalid'
              }
            }
          },
          {
            name: 'file',
            label: 'Attachment Field',
            id: '',
            fieldClass: 'col-3',
            type: 'file',
            properties: {
              multiple: true,
              allowedTypes: ['*', 'png', 'jpg', 'pdf'],
              maxSize: 100000,
              minSize: 1000,
              minFiles: 5,
              maxFiles: 10,
              messages: {
                maxSize: '',
                minSize: '',
                minFiles: '',
                maxFiles: '',
                allowedTypes: ''
              }
            }
          },
          {
            name: 'imageFile',
            label: 'Image Field',
            id: '',
            fieldClass: 'col-3',
            type: 'image',
            properties: {
              multiple: true,
              allowedTypes: ['*', 'png', 'jpg'],
              maxSize: 100000,
              minSize: 1000,
              minFiles: 5,
              maxFiles: 10,
              messages: {
                maxSize: '',
                minSize: '',
                minFiles: '',
                maxFiles: '',
                allowedTypes: ''
              }
            }
          },
          {
            name: 'buttonField',
            label: 'Button',
            id: '',
            fieldClass: 'col-3',
            type: 'button',
            properties: {
              placeholder: 'Button',
              // 'required': true,
              messages: {
                required: 'Invalid'
              }
            }
          }
        ]
      }
    ]
  };
  constructor() {}

  ngOnInit() {}
}
