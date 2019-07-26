import {
  Input,
  ElementRef,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from '@zc-ui/zc-utilities';
import { LAZYMODULES } from '../../lazy-module.config';
declare var zc;
@Component({
  selector: 'zc-com-render',
  templateUrl: './com-render.component.html',
  styleUrls: ['./com-render.component.scss']
})
export class ComRenderComponent implements OnInit {
  @Input() type: string;
  @Input() options: any = {}; // baseUrl http uid client
  @Input() showHideWidget = false;
  @Output() componentReady = new EventEmitter();
  lazyModules: any = [];
  template: string;
  uid: string;
  client: string;
  baseUrl: string;
  showLoader = true;
  widgetId: any;
  element: HTMLElement;
  constructor(
    private route: ActivatedRoute,
    public appConfig: AppConfigService
  ) {
    this.route.params.subscribe(params => {
      zc['params'] = params;
      if (params && params.uid) {
        this.uid = params.uid;
      } else {
        this.uid = null;
      }
    });
  }

  ngOnInit() {
    this.widgetId = 'widget_' + Math.floor(Math.random() * 1000) + 1;
    if (!this.options.id) {
      this.options.id = this.widgetId;
    }
    console.log('this.options.uid',this.options.uid);
    if (!this.options.uid && this.uid) {
      this.options.uid = this.uid;
    }
    switch (this.type) {
      case 'html':
        this.lazyModules = [];
        this.template = this.options.template;
        break;
      default:
        // find LAZYMODULESWIDGETCONFIG
        if (this.options.hidden && !this.showHideWidget) {
          this.lazyModules = [];
          this.template = this.options.template;
          zc[this.options.id + '_ref'] = { options: this.options };
          this.showLoader = false;
        } else {
          const widgetconfig = LAZYMODULES.find(
            widget => widget.data.type === this.type
          );
          if (widgetconfig) {
            this.lazyModules = widgetconfig.data.lazyModule;
            this.template =
              '<' +
              widgetconfig.data.selector +
              '  [options]="options"  id="' +
              this.options.id +
              '"' +
              ' #' +
              this.options.id +
              '></' +
              widgetconfig.data.selector +
              '>';
          } else {
            this.lazyModules = [];
            this.template = 'oops! ' + this.type + ' widget not found';
          }
        }
        break;
    }
  }
  templateReady(event, widgetId?: string) {
    // console.log('templateReady', event);
    this.showLoader = false;
    this.componentReady.emit(event);
  }
}
