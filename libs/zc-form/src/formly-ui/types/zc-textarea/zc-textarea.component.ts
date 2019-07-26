import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'zc-textarea',
  templateUrl: './zc-textarea.component.html',
  styleUrls: ['./zc-textarea.component.scss']
})
export class ZcTextareaComponent extends FieldType implements OnInit {
  to: any;
  defaultOptions = {
    templateOptions: {
      cols: 1,
      rows: 1
    }
  };
  constructor() {
    super();
  }

  ngOnInit() {}
}
