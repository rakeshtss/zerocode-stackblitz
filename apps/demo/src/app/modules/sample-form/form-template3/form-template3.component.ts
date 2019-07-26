import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject
} from '@angular/core';

@Component({
  selector: 'app-form-template3',
  templateUrl: './form-template3.component.html',
  styleUrls: ['./form-template3.component.scss']
})
export class FormTemplate3Component implements OnInit, AfterViewInit {
  @ViewChild('createForm') createForm: ElementRef;

  options = {
    title: 'Create job card',
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
            fieldClass: 'col-12 pb-2',
            template: '<div><strong>Customer Details:</strong></div>'
          },
          {
            name: 'jobcardNo',
            label: 'Jobcard No. (auto generated)',
            id: '',
            fieldClass: 'col-3',
            type: 'text',
            defaultValue: '1231',
            properties: {
              placeholder: 'Title for the Article comes here',
              required: true,
              minLength: 10,
              pattern: '^[a-zA-Z]*$',
              messages: {
                required: 'Invalid',
                minlength: 'Please enter atleast 10 characters',
                pattern: 'Please enter alphabetics only'
              }
            }
          },
          {
            name: 'customerName',
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
            name: 'contact_person',
            label: 'Contact Person',
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
            name: 'area',
            label: 'Area / city',
            id: '',
            fieldClass: 'col-3',
            type: 'text',
            properties: {
              placeholder: 'Area Name',
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
        containerClass: 'col-12 row bg-white border m-3',
        fieldItems: [
          {
            template: '<div><strong>Product Details:</strong></div>',
            fieldClass: 'col-12 pb-2'
          },
          {
            name: 'model_name',
            label: 'M/c model',
            id: '',
            fieldClass: 'col-3',
            type: 'text',
            properties: {
              placeholder: 'Model Number',
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
            type: 'textarea',
            properties: {
              placeholder: 'Write complaint details',
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
        containerClass: 'col-12 row bg-white border m-3',
        fieldItems: [
          {
            containerClass: 'col-12 ',
            fieldClass: 'col-12',
            fieldItems: [
              {
                template: '<div><strong>Spare Parts Fitted</strong></div>',
                fieldClass: 'col-12'
              },
              {
                name: 'spareParts',
                label: 'Spare Parts',
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
                    minlength: 'Please enter atleast 10 characters'
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
                  /* {
                    'label': 'Image',
                    'name': 'image',
                    'type': 'image',
                    'width': '10px',
                    'hideLabel': false,
                    'displayFormat': '{{item.image}}'
                  } */
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
                        hideParent:
                          'true/false /* applicable onluy for inline */'
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
                        hideParent:
                          'true/false /* applicable onluy for inline */',
                        sendRowData: true
                      }
                    }
                  }
                }
              }
            ]
          }
          /* {
            'containerClass': 'col-6',
            'fieldClass': 'col-6',
            'fieldItems': [
              {
                'template': '<div><strong>Complaints of Servicemen</strong></div>',
                'fieldClass': 'col-12'
              },
              {
                'name': 'complaint',
                'label': 'Complaint',
                'id': '',
                'fieldClass': 'col-12',
                'type': 'table',
                'defaultValue': [
                  {
                    'name': 'Complaint 1',
                    'description': 'Complaint 1 description'
                  },
                  {
                    'name': 'Complaint 2',
                    'description': 'Complaint 2 description'
                  }
                ],
                'properties': {
                  'placeholder': 'Complaints Table field',
                  'required': true,
                  'minLength': 10,
                  'messages': {
                    'required': 'Invalid',
                    'minlength': 'Please enter atleast 10 characters'
                  }
                },
                'cols': [
                  {
                    'label': 'Complaint',
                    'name': 'name',
                    'type': 'select',
                    'width': '10px',
                    'hideLabel': false
                  },
                  {
                    'label': 'Description',
                    'name': 'description',
                    'type': 'textarea'
                  }
                ]
              }
            ]
          } */
        ]
      },
      {
        containerClass: 'col-12 row bg-white border m-3',
        fieldItems: [
          {
            fieldClass: 'col-12 pb-2',
            template: '<div><strong>Service Charges:</strong></div>'
          },
          {
            name: 'serviceCharge',
            label: 'Charges for the Service',
            id: '',
            fieldClass: 'col-12',
            type: 'text',
            properties: {
              placeholder: 'Service charge',
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

  newFormOptions = {
    title: 'Add New Record',
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
            fieldClass: 'col-12 pb-2',
            template: '<div><strong>User Details:</strong></div>'
          },
          {
            name: 'name',
            label: 'Name',
            id: '',
            fieldClass: 'col-12',
            type: 'text',
            defaultValue: 'Raja - The Great',
            properties: {
              placeholder: 'Enter Your Name',
              required: true,
              messages: {
                required: 'Invalid',
                minlength: 'Please enter atleast 10 characters',
                pattern: 'Please enter alphabetics only'
              }
            }
          },
          {
            name: 'email',
            label: 'Email ID',
            id: '',
            fieldClass: 'col-12',
            type: 'text',
            properties: {
              placeholder: 'Enter Email ID',
              required: true,
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

  formsJson = {};
  element: HTMLElement;
  formTemp = true;

  constructor() {}

  ngOnInit() {
    // this.formsJson['createForm'] = document.getElementById(
    //   'createForm'
    // ) as HTMLElement;
    // const abc = document.getElementById('createForm') as HTMLElement;
    // console.log('abc', abc);
    // console.log('createForm', this.formsJson['createForm']);
    // this.element = document.getElementById('createForm') as HTMLElement;
    // console.log('element', this.element);
    setTimeout(() => {
      this.formTemp = false;
    }, 5000);
  }

  ngAfterViewInit() {
    // console.log(this.createForm.nativeElement.innerHTML);
    // console.log('createForm', this.createForm.nativeElement.innerHTML);
  }
}
