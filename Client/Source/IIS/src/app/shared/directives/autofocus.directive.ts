import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';
import * as $ from 'jquery';

@Directive({
    selector: '[ta-autofocus]'
})

export class AutofocusDirective {
    constructor(private el: ElementRef, private renderer: Renderer) {
        let $element = $(this.el.nativeElement);

        window.setTimeout(() => {
            $element.focus();
        }, 250);
    }

}

