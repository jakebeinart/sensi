import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]', // The selector to use in HTML
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    // Focus on the native element after the view has initialized
    this.el.nativeElement.focus();
  }
}
