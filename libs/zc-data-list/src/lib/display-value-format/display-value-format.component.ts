import { Component, Input, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'zc-display-value-format',
  templateUrl: './display-value-format.component.html',
  styleUrls: ['./display-value-format.component.scss']
})
export class DisplayValueFormatComponent implements OnInit {
  @Input() item: any;
  @Input() key: any;
  @Input() style: any;
  @Input() action: any;
  @Input() col: any;
  constructor(private el: ElementRef) { }
  ngOnInit() {
    let itemStyle: any;
    let itemValue = this.getItemValue(this.key, this.item);
    if (this.col.fontColorSource) {
      itemStyle = 'color:' + this.col.fontColorSource;
    }
    if (this.style) {
      if (this.style.type === 'color') {
        let color = '';
        if (this.style.source) {
          color = this.getItemValue(this.style.source, this.item);
        }
        itemStyle = 'color:' + color;
      }
    }

    if (this.action) {
      // console.log('action', this.action);
      if (this.action.styling && this.action.styling.cssColor) {
        itemStyle = 'color:' + this.action.styling.cssColor;
      }
    }

    if (this.col.bgColorSource) {
      itemStyle = itemStyle + '; background-color:' + this.col.bgColorSource;
    }

    itemValue = itemValue || itemValue === 0 ? itemValue : '---';
    this.el.nativeElement.innerHTML =
      '<span title="' +
      itemValue +
      '" style="' +
      itemStyle +
      '">' +
      itemValue +
      '</span>';
  }

  getItemValue(key, item) {
    try {
      const colKey = 'item.' + key;
      const fun = new Function('item', 'return ' + colKey + ' ; ');
      return fun(item);
    } catch (error) {
      console.log('error', key);
      return item[key];
    }
  }
}
