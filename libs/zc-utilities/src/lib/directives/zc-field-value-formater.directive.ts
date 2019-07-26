import {
  Directive,
  OnInit,
  ElementRef,
  Input,
  SimpleChanges,
  Renderer2,
  OnChanges
} from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[zcFieldValueFormat]',
  providers: [DatePipe, CurrencyPipe]
})
export class ZcFieldValueFormaterDirective implements OnInit, OnChanges {
  @Input() type: string;
  @Input() value: any;
  @Input() row: any;
  @Input() key: any;
  @Input() properties: any;
  @Input() defaultValue = '---';
  @Input() colProperties: any;
  @Input() formatType: string;
  constructor(
    private el: ElementRef,
    private datePipe: DatePipe,
    private renderer: Renderer2,
    private currencyPipe: CurrencyPipe
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (changes['value']) {
      this.ngOnInit();
    }
  }
  ngOnInit() {
    if (this.formatType === 'row') {
      this.value = this.getKeyValue(this.key, this.row);
    }
    if (!this.defaultValue) {
      this.defaultValue = '---';
    }
    let displayValue = this.defaultValue;
    switch (this.type) {
      case 'phone':
        if (this.value && this.value.isdCode) {
          displayValue = this.value.isdCode + '-' + this.value.value;
        } else {
          displayValue = this.defaultValue;
        }
        break;
      case 'date':
      case 'datetime':
        let dateformat = 'd-MMM-yyyy';
        if (this.type === 'datetime') {
          dateformat = 'd-MMM-yyyy h:mm a';
        }
        if (this.value) {
          displayValue = this.datePipe.transform(this.value, dateformat);
        } else {
          displayValue = this.defaultValue;
        }
        break;
      case 'time':
        dateformat = 'h:mm a';
        if (this.value) {
          const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
          displayValue = currentDate + ' ' + this.value;
          displayValue = this.datePipe.transform(displayValue, dateformat);
        } else {
          displayValue = this.defaultValue;
        }
        break;
      case 'number':
        if (this.value || this.value === 0) {
          if (this.properties && this.properties.displayType === 'currency') {
            let currencyCode = 'INR';
            if (this.properties.currency) {
              currencyCode = this.properties.currency;
            }
            displayValue = this.currencyPipe.transform(this.value, (currencyCode) ? currencyCode : null, ' ');
          } else {
            displayValue = this.value;
          }
        }
        break;
      case 'currency':
        if (
          this.value &&
          (this.value.value ||
            this.value.value === '0' ||
            this.value.value === 0)
        ) {
          const code = this.value.code || this.defaultValue;
          if (this.colProperties && this.colProperties.hideCode) {
            displayValue = this.currencyPipe.transform(
              this.value.value,
              code ? code : null,
              ' '
            );
          } else {
            // displayValue = this.currencyPipe.transform(this.value.value, (code) ? code : null, code + ' ');
            displayValue = this.currencyPipe.transform(
              this.value.value,
              code ? code : null,
              ' '
            );
          }
        }
        break;
      case 'select':
      case 'radio':
      case 'country':
        if (this.properties && this.properties.multiple) {
          displayValue = this.getMultiselect();
        } else {
          if (this.properties && this.properties.displayLabelKey) {
            if (this.value && this.value[this.properties.displayLabelKey]) {
              displayValue = this.value[this.properties.displayLabelKey];
            }
          } else {
            if (this.value && this.value.name) {
              displayValue = this.value.name;
            }
          }
        }

        break;
      case 'map':
        if (this.value && this.value.lat) {
          displayValue = this.value.lat + '-' + this.value.lng;
        }
        break;
      case 'file':
        displayValue = this.getFileList();
        break;
      case 'image':
        if (this.value && this.value.length > 0 && this.value[0].path) {
          displayValue =
            '<img width="50" class="rounded" src="' +
            this.properties.baseUrl +
            '../' +
            this.value[0].path +
            '"/>';
        }
        break;
      case 'multiselect':
        displayValue = this.getMultiselect();
        break;
      case 'stringArray':
        if (this.value) {
          displayValue = this.value.join(', ');
        }

        break;
      default:
        if (this.value === 0) {
          displayValue = this.value;
        } else {
          displayValue = this.value || this.defaultValue;
        }
        break;
    }
    // this.el.nativeElement.attr = 'zcFileHttpDownload';
    // const child = document.createElement('span');
    // child.addEventListener('click', this.onClick.bind(this));
    // // addEventListener
    // // const child.('span');
    // // child.setAttribute = 'zcFileHttpDownload';
    // child.innerHTML = displayValue;
    // this.renderer.setAttribute(this.el.nativeElement, 'zcFileHttpDownload', null);
    // this.renderer.appendChild(this.el.nativeElement, child);
    if (this.type === 'file' || (this.type === 'select' && (this.properties && this.properties.multiple))) {
      this.el.nativeElement.innerHTML = displayValue;
    } else {
      this.el.nativeElement.innerHTML = '<span title="' + displayValue + '">' + displayValue + '</span>';
    }

  }
  onClick(event) { }
  /**
     *   <span *ngIf='row[col.field] && row[col.field].length  > 0;else dash;'>
                                  <ul>
                                      <li *ngFor='let a of row[col.field]'>
                                          <a *ngIf='a.src' [attr.href]='properties.baseUrl+a.src' download>{{a.name}}</a></li>
                                  </ul>
                              </span>
     */
  getFileList() {
    let fileHtml = '';
    if (this.value && this.value.length > 0) {
      fileHtml += '<ul class="zc-files-list">';
      this.value.forEach(item => {
        fileHtml += '<li>';
        if (item.src) {
          fileHtml +=
            '<a  zcFileHttpDownload href="' +
            this.properties.baseUrl +
            item.src +
            '" download>';
          fileHtml += '<span class="zc-file-name">' + item.name + '</span>';
          fileHtml +=
            '<i title="' + item.name + '" class="icon-download"></i></a>';
        } else {
          fileHtml += '' + item.name;
        }
        fileHtml += '</li>';
      });
      fileHtml += '</ul>';
    }
    return fileHtml;
  }
  getMultiselect() {
    let fileHtml = '';
    if (this.value && this.value.length) {
      // result = this.value.filter(item => item.label);
      this.value.forEach((item, inx) => {
        // fileHtml += '<li>';
        fileHtml += '<span>';
        fileHtml +=
          ' ' +
          this.getKeyValue(this.properties.dataSource.api.map.label || 'name', item);
        if (inx !== this.value.length - 1) {
          fileHtml += '<span class="comma">, </span>';
        }
        fileHtml += '</span>';
        // fileHtml += '</li>';
      });
    }
    // fileHtml += '</ul>';
    return fileHtml;
  }
  getKeyValue(key, item) {
    try {
      const colKey = 'item.' + key;
      const fun = new Function('item', 'return ' + colKey + ' ; ');
      return fun(item);
    } catch (error) {
      return item[key];
      console.log('error', error, key);
    }
  }
}
