import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input
} from '@angular/core';
import {
  NgbDropdownConfig,
  NgbDropdown,
  NgbModalRef,
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
declare var zc;
@Component({
  selector: 'zc-form-modal',
  templateUrl: './zc-form-modal.component.html',
  styleUrls: ['./zc-form-modal.component.scss']
})
export class ZcFormModalComponent implements OnInit, AfterViewInit {
  @Input() options: any;
  inlineFormOptions: any;
  inlineForm = false;
  @ViewChild('zcFormModal') zcFormModal: any;
  modal: NgbModalRef;
  constructor(private modalService: NgbModal) {}
  ngAfterViewInit(): void {
    zc[this.options.id] = this;
  }
  ngOnInit() {
    this.inlineFormOptions = JSON.parse(JSON.stringify(this.options));
    this.inlineFormOptions.id = this.options.id + '_ref';
  }
  open(type = 'modal') {
    // this.inlineForm = !this.inlineForm;
    if (type === 'inline') {
      this.inlineForm = false;
      setTimeout(() => {
        this.inlineForm = true;
      }, 0);
    } else {
      // backdrop: 'static'
      this.modal = this.modalService.open(this.zcFormModal, {
        size: 'lg',
        centered: true
      });
    }
  }
  close(type = 'inline') {
    console.log('type', type);
    if (this.modal) {
      this.modal.dismiss();
    } else {
      this.inlineForm = false;
    }
  }
}
