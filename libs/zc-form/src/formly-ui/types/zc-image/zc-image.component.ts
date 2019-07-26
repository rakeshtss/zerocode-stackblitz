import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToasterService, AppConfigService } from '@zc-ui/zc-utilities';

@Component({
  selector: 'zc-image',
  templateUrl: './zc-image.component.html',
  styleUrls: ['./zc-image.component.scss']
})
export class ZcImageComponent extends FieldType implements OnInit {
  files: FileList;
  uploadedFiles: any[];
  uploadFiles = [];
  to: any;
  showLoader = false;
  urls = new Array<string>();
  defaultImageValue = {
    allowedTypes: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
    maxSize: 200000,
    minSize: 0
  };
  baseUrl: any;
  constructor(
    private http: HttpClient,
    private toasterService: ToasterService,
    private appConfigService: AppConfigService
  ) {
    super();
  }
  ngOnInit(): void {
    // this.formControl.valueChanges.subscribe(val => {
    //   if (val) {
    //     this.uploadFiles = val;
    //   }
    // });
    this.baseUrl = this.appConfigService.settings.fileServer;
    if (!this.to.allowedTypes) {
      this.to.allowedTypes = this.defaultImageValue.allowedTypes;
    }
    if (!this.to.maxSize) {
      this.to.maxSize = this.defaultImageValue.maxSize;
    }
    if (!this.to.minSize) {
      this.to.minSize = this.defaultImageValue.minSize;
    }
  }
  detectFiles(event) {
    // this.urls = [];
    // const uploadFiles = [];
    if (!this.formControl.value) {
      this.formControl.setValue([]);
    }
    const selectedFiles = event.target.files;
    this.files = selectedFiles;
    if (selectedFiles) {
      this.uploadFiles = [];
      for (const file of selectedFiles) {
        if (this.checkValidation(file)) {
          this.uploadFiles.push(file);
          // this.formControl.setValue(this.uploadFiles);
          // const reader = new FileReader();
          // reader.onload = (e: any) => {
          //   this.uploadFiles.push({ name: file.name, data: e.target.result })
          //   this.formControl.setValue(this.uploadFiles);
          // }
          // reader.readAsDataURL(file);
        }
      }
      if (this.uploadFiles && this.uploadFiles.length > 0) {
        this.uploadFile();
      }
    }
    // this.formControl.setValue(uploadFiles);
  }
  deleteFile(file, index) {
    this.urls.splice(index, 1);
  }
  checkValidation(file): boolean {
    const size = file.size / 1000; // convert to byte to kbs
    const type = file.type;
    if (!this.to.messages) {
      this.to.messages = {};
    }
    if (this.to.allowedTypes.includes(type)) {
      if (size <= this.to.maxSize && size >= this.to.minSize) {
        return true;
      } else {
        this.toasterService.show(
          'error',
          this.to.messages.maxSize || 'Invalid file size'
        );
        return false;
      }
    } else {
      this.toasterService.show(
        'error',
        this.to.messages.allowedTypes || 'Invalid file type'
      );
      return false;
    }
  }

  uploadFile() {
    this.showLoader = true;
    this.postFile(this.baseUrl + 'upload/').subscribe(
      res => {
        this.showLoader = false;
        if (this.formControl.value && this.to.multiple) {
          this.formControl.setValue([...this.formControl.value, ...res.data]);
        } else {
          if (
            this.formControl.value &&
            this.formControl.value.length > 0 &&
            this.formControl.value[0].saved
          ) {
            const existingFile: any = [];
            if(this.formControl.value[0]) {
              this.formControl.value[0].deleted = true;
            }
            existingFile.push(this.formControl.value[0]);
            existingFile.push(res.data);
            this.formControl.setValue(existingFile);
          } else {
            this.formControl.setValue([res.data]);
          }
        }
        // this.formControl.setValue(res.data);
        // do something, if upload success
      },
      error => {
        this.showLoader = false;
      }
    );
  }

  postFile(url): Observable<any> {
    const formData: FormData = new FormData();

    for (let i = 0; i < this.uploadFiles.length; i++) {
      formData.append('file', this.uploadFiles[i]);
    }
    // if (this.to.multiple ) {
    //   for (let i = 0; i < this.uploadFiles.length; i++) {
    //     formData.append('file', this.uploadFiles[i]);
    //   }
    // } else {
    //   formData.append('file', this.files.item(0));
    // }

    return this.http.post(url, formData);
  }
  removeFile(inx, file) {
    if (file.saved) {
      file.deleted = true;
    } else {
      this.form.markAsDirty();
      this.form.markAsTouched();
      this.formControl.value.splice(inx, 1);
    }
  }
}
