import { Component, OnInit, Input } from '@angular/core';
import { ZcAccordionConfig } from '../zc-accordion.config';

@Component({
  selector: 'zc-accordion',
  templateUrl: './zc-accordion.component.html',
  styleUrls: ['./zc-accordion.component.scss']
})
export class ZcAccordionComponent implements OnInit {
  @Input() options: ZcAccordionConfig;
  constructor() { }

  ngOnInit() {
    console.log('zc-accordion', this.options);
  }

  onTabOpen(event) {
    console.log('onTabOpen', event);
  }

  onTabClose(event) {
    console.log('onTabClose', event);
  }

  checkCondition(condition) {
    if (condition) {
      try {
        const fun = new Function('return ' + condition + ';');
        return fun();
      } catch (error) {
        console.log(condition, error)
        return true;
      }
    } else {
      return false;
    }
  }

}
