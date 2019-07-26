import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageRenderService {
  widgetConfig: any;
  constructor() {}
  addWidget(id, widget) {
    this.widgetConfig[id] = widget;
  }
}
