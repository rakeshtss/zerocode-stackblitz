import {
  Component,
  OnInit,
  AfterContentChecked,
  AfterContentInit
} from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'zc-date-time',
  templateUrl: './zc-date-range.component.html',
  styleUrls: ['./zc-date-range.component.scss']
})
export class ZcDateRangeComponent extends FieldType
  implements OnInit, AfterContentChecked, AfterContentInit {
  to: any;
  date: any;
  utc = true;
  ngOnInit(): void {
    // this.to.showTime = true;
    // this.to.timeOnly = true;

    if (this.formControl.value) {
      // this.to.filedDate = new Date(this.formControl.value);
      // this.formControl.setValue(date);
    }
    this.formControl.valueChanges.subscribe(res => {
      if (this.formControl.value) {
        // this.to.filedDate = new Date(this.formControl.value);

      } else {
        this.to.filedDate = null;
      }
    });
  }
  onBlur() {
    if (!this.to.filedDate) {
      this.formControl.setValue(null);
    }
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }
  ngAfterContentChecked(): void {

  }
  onSelect(event) {
    this.formControl.markAsDirty();
    this.formControl.markAsTouched();
    this.setValue(event);
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
    if (this.to.filedDate[0] && this.to.filedDate[1]) {
      this.formControl.setValue([this.getDateFormat(this.to.filedDate[0]), this.getDateFormat(this.to.filedDate[1])]);
    }

    //  this.formControl.setValue(this.getDateFormat(event));
  }
  getDateFormat(d) {
    if (this.to.showTime) {
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':00';
    } else {
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }

  }
}
