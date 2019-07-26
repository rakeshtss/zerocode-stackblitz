import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-template2',
  templateUrl: './form-template2.component.html',
  styleUrls: ['./form-template2.component.scss']
})
export class FormTemplate2Component implements OnInit {
  options = {
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

  constructor() {}

  ngOnInit() {}
}
