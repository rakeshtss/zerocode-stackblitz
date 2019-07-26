import {
  Directive,
  ElementRef,
  OnInit,
  Input,
  Inject,
  Renderer2
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({ selector: '[appRunScripts]' })
export class RunScriptsDirective implements OnInit {
  @Input() template: any;
  htmlElement: HTMLElement;
  constructor(
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      // wait for DOM rendering
      this.reinsertScripts();
    });
  }
  reinsertScripts(): void {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(this.template, 'text/html');
    const scripts = parsedHtml.getElementsByTagName('script');
    const scriptsInitialLength = scripts.length;
    for (let i = 0; i < scriptsInitialLength; i++) {
      const script = scripts[i];
      const scriptCopy = <HTMLScriptElement>document.createElement('script');
      scriptCopy.type = script.type ? script.type : 'text/javascript';
      if (script.innerHTML) {
        scriptCopy.innerHTML = script.innerHTML;
      } else if (script.src) {
        scriptCopy.src = script.src;
      }

      scriptCopy.async = true;
      // script.parentNode.replaceChild(scriptCopy, script);
      const parent = this.elementRef.nativeElement.parentNode;
      const refChild = this.elementRef.nativeElement;
      // this.renderer.appendChild(refChild, scriptCopy);
      this.elementRef.nativeElement.appendChild(scriptCopy);
      // this.elementRef.nativeElement.parentNode.appendChild('<div></div>');
    }
  }
}
