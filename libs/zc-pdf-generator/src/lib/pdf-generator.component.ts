import { Component, OnInit, Input } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'zc-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.scss']
})
export class PdfGeneratorComponent implements OnInit {
  @Input() options: any;
  constructor() { }

  ngOnInit() {
  }
  printPDF() {
    const data = document.getElementById(this.options.elementId) as HTMLElement;
    // const data = document.getElementById(this.options.elementId).innerHTML;
    const headerData = document.getElementsByTagName("head");
    const headerHtml = headerData[0].innerHTML
    const styleList = document.getElementsByTagName("style") as HTMLCollection;
    const styleContain = '';
    console.log('styleList', styleList);
    // styleList.forEach(style => {
    //   styleContain += style.innerHTML;
    // });
    console.log('styleContain', styleContain);
    html2canvas(data).then(canvas => {
      const docWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * docWidth / canvas.width;
      const heightLeft = imgHeight;
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      const html = `<!DOCTYPE html>
      <html>
      <head>
      <title>Page Title</title>
      <style>  ${styleContain} </style>
      </head>
      <body>
      ${data.innerHTML}
      </body>
      </html>`;
      console.log('data', html);
      pdf.fromHTML(html, 5, 5, { 'width': docWidth });
      pdf.save('MYPdf.pdf');
    });

    // let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    // const position = 0;
    // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    // pdf.save('MYPdf.pdf'); // Generated PDF
    // printDoc.fromHTML(data, 10, 10, { 'width': 180 });
    // // printDoc.autoPrint();
    // // printDoc.output("dataurlnewwindow"); // this opens a new popup,  after this the PDF opens the print window view but there are browser inconsistencies with how this is handled
    // printDoc.save('MYPdf.pdf');
  }
  captureScreen() {
    const data = document.getElementById(this.options.elementId) as HTMLElement;
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        console.log('contentDataURL', contentDataURL);
        const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('MYPdf.pdf'); // Generated PDF
      });
    }
  }

}
