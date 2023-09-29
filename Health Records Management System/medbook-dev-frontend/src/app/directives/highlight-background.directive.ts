import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[highlightBackground]',
})
export class HighlightBackgroundDirective implements OnChanges {
  @Input() highlightBackground!: boolean;
  constructor(private element: ElementRef) {}

  ngOnChanges(): void {
    if (this.highlightBackground) {
      this.element.nativeElement.style.backgroundColor =
        'var(--ion-color-success)';
    } else {
      this.element.nativeElement.style.backgroundColor =
        'var(--ion-background-color)';
    }
  }
}
