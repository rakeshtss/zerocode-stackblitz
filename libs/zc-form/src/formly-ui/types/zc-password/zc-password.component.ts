import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'zc-password',
  templateUrl: './zc-password.component.html',
  styleUrls: ['./zc-password.component.scss']
})
export class ZcPasswordComponent extends FieldType implements OnInit {
  to: any;
  pass = {
    promptLabel: 'Please enter a password',
    weakLabel: 'Weak',
    mediumLabel: 'Medium',
    strongLabel: 'Strong',
    feedback: true,
    showPassword: false
  };
  constructor() {
    super();
  }
  ngOnInit() {
    this.formControl.valueChanges.subscribe(val => {
      if (val) {
        // console.log('Password', val);
      }
    });
  }
}
