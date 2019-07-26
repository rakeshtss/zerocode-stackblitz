import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[zcPattern]'
})
export class ZcPatternDirective {
  @Input() zcPatternRegex: any;
  // Allow decimal numbers and negative values
  private regex: RegExp;
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'ArrowLeft',
    'ArrowRight',
    'ctrlKey'
  ];
  // private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-'];

  constructor(private el: ElementRef) {}
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.regex = new RegExp(this.zcPatternRegex);
    // Allow Backspace, tab, end, and home keys
    // console.log('this.regex', this.regex);
    if (this.regex) {
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      const current: string = this.el.nativeElement.value;
      const next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    }
  }
}
