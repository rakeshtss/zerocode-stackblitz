import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss']
})
export class SampleFormComponent implements OnInit {
  form_1 = {
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
            name: 'name',
            label: 'Name',
            id: '',
            fieldClass: 'col-12',
            type: 'text',
            properties: {
              placeholder: 'Automic Ac RRR Machine',
              required: true,
              minLength: 10,
              messages: {
                required: 'Invalid',
                minlength: 'Please enter atleast 10 characters'
              }
            }
          },
          {
            name: 'part_no',
            label: 'Part Number',
            id: '',
            fieldClass: 'col-12',
            type: 'text',
            properties: {
              placeholder: 'AC690PRO',
              required: true,
              messages: {
                required: 'Invalid'
              }
            }
          },
          {
            name: 'category',
            label: 'Product category',
            id: '',
            fieldClass: 'col-12',
            type: 'select',
            properties: {
              placeholder: 'select Category',
              required: true,
              messages: {
                required: 'Please select on category'
              }
            },
            dataSource: {
              type: 'local',
              options: [
                {
                  label: 'product 1',
                  value: 'product_1',
                  icon: '',
                  color: '',
                  image: ''
                },
                {
                  label: 'product 2',
                  value: 'product_2',
                  icon: '',
                  color: '',
                  image: ''
                }
              ],
              api: {
                url: '',
                method: '',
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
            name: 'description',
            label: 'Description',
            id: 'description',
            fieldClass: 'col-12',
            type: 'textarea',
            properties: {
              placeholder: 'Your Message...',
              row: 120,
              col: 100,
              minLength: 10,
              maxLength: 100,
              required: true,
              messages: {
                maxlength: 'max length 100 ',
                minlength: 'min length 10',
                pattern: '',
                required: ''
              }
            }
          }
        ]
      }
    ]
  };
  form_2 = {
    title: 'Create a new Article',
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
        name: 'name',
        label: 'Subject / Name',
        id: '',
        fieldClass: 'col-12',
        type: 'text',
        properties: {
          placeholder: 'Title for the Article comes here',
          required: true,
          minLength: 10,
          messages: {
            required: 'Invalid',
            minlength: 'Please enter atleast 10 characters'
          }
        }
      },
      {
        name: 'abstract',
        label: 'Abstract',
        id: 'abstract',
        fieldClass: 'col-12',
        type: 'textarea',
        properties: {
          placeholder: 'Your Message...',
          row: 120,
          col: 100,
          minLength: 10,
          maxLength: 100,
          required: true,
          messages: {
            maxlength: 'Max limit 100 characters',
            minlength: 'Please enter atleast 10 characters',
            pattern: '',
            required: ''
          }
        }
      },
      {
        name: 'keywords',
        label: 'Key Words',
        id: 'keywords',
        fieldClass: 'col-12',
        type: 'autocomplete',
        properties: {
          placeholder: 'Your Message...'
        }
      },
      {
        name: 'category',
        label: 'Category',
        id: '',
        fieldClass: 'col-12',
        type: 'select',
        properties: {
          placeholder: 'dropdown',
          required: true,
          messages: {
            required: 'Please select on category'
          }
        },
        dataSource: {
          type: 'local',
          options: [
            {
              label: 'product 1',
              value: 'product_1',
              icon: '',
              color: '',
              image: ''
            },
            {
              label: 'product 2',
              value: 'product_2',
              icon: '',
              color: '',
              image: ''
            }
          ]
        }
      }
    ]
  };

  form_3 = {
    title: 'Customer Details',
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
        containerClass: 'col-12 row bg-white',
        fieldItems: [
          {
            name: 'name',
            label: 'Jobcard No. (auto generated)',
            id: '',
            fieldClass: 'col-3',
            type: 'text',
            properties: {
              placeholder: 'Title for the Article comes here',
              required: true,
              minLength: 10,
              messages: {
                required: 'Invalid',
                minlength: 'Please enter atleast 10 characters'
              }
            }
          },
          {
            name: 'customer_name',
            label: 'Customer name',
            id: '',
            fieldClass: 'col-3',
            type: 'text',
            properties: {
              placeholder: 'Enter customer name',
              required: true,
              minLength: 10,
              messages: {
                required: 'Invalid',
                minlength: 'Please enter atleast 10 characters'
              }
            }
          },
          {
            name: 'cont',
            label: 'contact person',
            id: '',
            fieldClass: 'col-3',
            type: 'text',
            properties: {
              placeholder: 'contact person',
              required: true,
              minLength: 10,
              messages: {
                required: 'Invalid',
                minlength: 'Please enter atleast 10 characters'
              }
            }
          },
          {
            name: 'name',
            label: 'Area / city',
            id: '',
            fieldClass: 'col-3',
            type: 'text',
            properties: {
              placeholder: 'Title for the Article comes here',
              required: true,
              minLength: 10,
              messages: {
                required: 'Invalid',
                minlength: 'Please enter atleast 10 characters'
              }
            }
          }
        ]
      },
      {
        template: '<div><strong>Address Info:</strong></div>',
        fieldClass: 'col-12'
      },
      {
        containerClass: 'col-12 row bg-white',
        fieldItems: [
          {
            name: 'name',
            label: 'M/c model',
            id: '',
            fieldClass: 'col-3',
            type: 'text',
            properties: {
              placeholder: 'Title for the Article comes here',
              required: true,
              minLength: 10,
              messages: {
                required: 'Invalid',
                minlength: 'Please enter atleast 10 characters'
              }
            }
          },
          {
            name: 'complaint',
            label: 'Complaint',
            id: '',
            fieldClass: 'col-12',
            type: 'html',
            properties: {
              placeholder: 'complaint herer',
              required: true,
              minLength: 10,
              messages: {
                required: 'Invalid',
                minlength: 'Please enter atleast 10 characters'
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
