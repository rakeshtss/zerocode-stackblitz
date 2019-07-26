import { Directive, Input, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[zcKeyFormat]'
})
export class KeyFormatDirective implements OnInit {
  @Input() item: any;
  @Input() key: any;
  @Input() style: any;
  constructor(private el: ElementRef) {}
  ngOnInit() {
    let itemStyle: any;
    const itemValue = this.getItemValue(this.key, this.item);
    if (this.style) {
      if (this.style.type === 'color') {
        let color = '';
        if (this.style.source) {
          color = this.getItemValue(this.style.source, this.item);
        }
        itemStyle = 'color:' + color;
      }
    }
    if (itemValue) {
      this.el.nativeElement.innerHTML =
        '<span style="' + itemStyle + '">' + itemValue + '</span>';
    } else {
      this.el.nativeElement.innerHTML = '---';
    }
  }

  getItemValue(key, item) {
    const colKey = 'item.' + key;
    const fun = new Function('item', 'return ' + colKey + ' ; ');
    return fun(item);
  }
}
