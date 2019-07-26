import { Directive, OnInit, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[zcColicons]'
})
export class ColiconsDirective implements OnInit {
  @Input() row: any;
  @Input() icon: any;
  constructor(private el: ElementRef) {}
  ngOnInit() {
    let flag = false;
    if (
      this.icon.condition &&
      this.icon.condition.value &&
      this.icon.condition.fieldName
    ) {
      flag =
        this.icon.condition &&
        this.getItemValue(this.icon.condition.fieldName, this.row) ===
          this.icon.condition.value;
    }
    if (flag) {
      this.el.nativeElement.innerHTML =
        '<i class="' +
        this.icon.iconSource +
        '" style="color:' +
        this.icon.colorSource +
        '"></i>';
    }
  }

  getItemValue(key, item) {
    const colKey = 'item.' + key;
    const fun = new Function('item', 'return ' + colKey + ' ; ');
    return fun(item);
  }
}
