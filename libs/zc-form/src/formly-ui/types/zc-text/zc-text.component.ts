import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
@Component({
  selector: 'zc-text',
  templateUrl: './zc-text.component.html',
  styleUrls: ['./zc-text.component.scss']
})
export class ZcTextComponent extends FieldType implements OnInit {
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
