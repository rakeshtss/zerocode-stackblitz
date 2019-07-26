import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfGeneratorComponent } from './pdf-generator.component';

@NgModule({
  declarations: [PdfGeneratorComponent],
  imports: [
    CommonModule
  ],
  exports:[PdfGeneratorComponent]
})
export class ZcPdfGeneratorModule { }
