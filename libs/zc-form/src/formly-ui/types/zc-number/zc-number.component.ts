import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'zc-number',
  templateUrl: './zc-number.component.html',
  styleUrls: ['./zc-number.component.scss']
})
export class ZcNumberComponent extends FieldType implements OnInit {
  to: any;
  constructor() {
    super();
  }
  ngOnInit() {
    this.formControl.valueChanges.subscribe(val => {
      if (val) {
        if (this.field.templateOptions.onblur) {
          this.field.templateOptions.onblur(this.field, this.formControl.value);
        }
      }
    });
  }
}
