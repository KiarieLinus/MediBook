import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[highlightBackground]'
})
export class HighlightBackgroundDirective {
  @Input() highlightBackground!: boolean;
  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.highlightBackground) {
      this.element.nativeElement.style.backgroundColor = "green";
    }
  }
}

