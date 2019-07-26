import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-template4',
  templateUrl: './form-template4.component.html',
  styleUrls: ['./form-template4.component.scss']
})
export class FormTemplate4Component implements OnInit {
  options = {
    title: 'Simple Form',
    id: 'sample',
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
            "name": "submitBtn",
            "label": "Submit",
            "id": "submitBtn",
            "fieldClass": "pr-2",
            "type": "button",
            "defaultValue": "",
            "properties": {
              "style": ""
            },
            "action": {
              "type": "script",
              "script": "const form = document.createElement('form'); form.method = 'post';form.action = 'http://localhost/post.php'; const hiddenField = document.createElement('input');hiddenField.type = 'hidden'; hiddenField.name = 'cafId'; hiddenField.value = zc.sample.model.price; form.appendChild(hiddenField); document.body.appendChild(form); form.submit();"
            }
          }
        ]
      }
    ]
  };
  constructor() {}

  ngOnInit() {}
}
