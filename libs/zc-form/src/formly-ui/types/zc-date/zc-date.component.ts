import {
  Component,
  OnInit,
  AfterContentChecked,
  AfterContentInit
} from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'zc-date-time',
  templateUrl: './zc-date.component.html',
  styleUrls: ['./zc-date.component.scss']
})
export class ZcDateComponent extends FieldType
  implements OnInit, AfterContentChecked, AfterContentInit {
  to: any;
  date: any;
  utc = true;
  ngOnInit(): void {
    // this.to.showTime = true;
    // this.to.timeOnly = true;

    if (this.formControl.value) {
      this.to.filedDate = new Date(this.formControl.value);
      // this.formControl.setValue(date);
    }
    this.formControl.valueChanges.subscribe(res => {
      if (this.formControl.value) {
        console.log('(this.formControl.value) -->', this.formControl.value);
        this.to.filedDate = new Date(this.formControl.value);
        this.dateChange(this.formControl.value);
      } else {
        this.to.filedDate = null;
      }
    });
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }
  ngAfterContentChecked(): void {
    if (typeof this.to.maxDate === 'string') {
      this.to.maxDate = new Date(this.to.maxDate);
    }
    if (typeof this.to.minDate === 'string') {
      this.to.minDate = new Date(this.to.minDate);
    }
    // if (typeof this.to.maxDate === "string") {
    //   this.to.maxDate = new Date(this.to.maxDate);
    // }
    // if (typeof this.to.minDate === "string") {
    //   this.to.minDate = new Date(this.to.minDate);
    // }
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    // console.log('ngAfterContentChecked', this.to);
  }
  onSelect(event) {
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
    this.setValue(event);
    this.dateChange(event);
  }
  onYearChange(event) {
    const myDate = new Date(this.formControl.value);
    myDate.setFullYear(event.year);
    // this.formControl.setValue(myDate);
    this.setValue(myDate);
    this.dateChange(myDate);
  }
  onMonthChange(event) {
    const myDate = new Date(this.formControl.value);
    myDate.setMonth(event.month - 1);
    myDate.setFullYear(event.year);
    // this.formControl.setValue(myDate);
    this.setValue(myDate);
    this.dateChange(myDate);
  }
  dateChange(event) {
    if (this.field.templateOptions.change) {
      this.field.templateOptions.change(this.field, event);
    }
  }
  setValue(event) {
    // let _date = event;
    // if (!this.to.showTime) {
    //   let day = event.getDate();
    //   let month = event.getMonth() + 1; // add 1 because months are indexed from 0
    //   let year = event.getFullYear();
    //   // _date = new Date(year, month, day, 0, 0, 0, 0);
    //   // _date.setHours(0, 0, 0, 0);
    //   console.log('_date', _date.toISOString());
    // }
    this.formControl.setValue(this.getDateFormat(event));
  }
  getDateFormat(d) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
}
