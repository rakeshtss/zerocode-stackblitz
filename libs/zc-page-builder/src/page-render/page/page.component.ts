import { Component, OnInit, Input } from '@angular/core';
import { PageConfig } from '../page-utils';
@Component({
  selector: 'zc-page-render',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  @Input() options: PageConfig;
  constructor() {}
  ngOnInit() {}
}
