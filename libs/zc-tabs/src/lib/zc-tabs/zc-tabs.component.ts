import { Component, OnInit, Input } from '@angular/core';
import { ZcTabsConfig } from '../zc-tabs.config';

@Component({
  selector: 'zc-tabs',
  templateUrl: './zc-tabs.component.html',
  styleUrls: ['./zc-tabs.component.scss']
})
export class ZcTabsComponent implements OnInit {
  @Input() options: ZcTabsConfig;
  constructor() {}

  ngOnInit() {}
}
