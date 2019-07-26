import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'zc-html-editor',
  templateUrl: './zc-html-editor.component.html',
  styleUrls: ['./zc-html-editor.component.scss']
})
export class ZcHtmlEditorComponent extends FieldType implements OnInit {
  showCode = false;
  editorData: any;
  cols = 152; // Full=152, Model=91
  rows = 10;
  constructor() {
    super();
  }

  ngOnInit() {
    if (this.to.row) {
      this.rows = this.to.row;
    }
    if (this.formControl.value) {
      this.editorData = this.formControl.value;
    }
  }

  toggleCode() {
    this.showCode = !this.showCode;
  }
}
