import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';
import * as $ from 'jquery';

@Directive({
    selector: '[ta-animate]'
})

export class AnimationDirective {
    constructor(private el: ElementRef, private renderer: Renderer) { }

    @HostListener('click') onclick() {

        let subMenu = this.el.nativeElement.parentElement.children[1];

        if (subMenu.style.display == 'block') {
            subMenu.style.display = 'none';
            $(subMenu).slideDown(200);
            subMenu.style.display = 'block';
        } else {
            subMenu.style.display = 'block';
            $(subMenu).slideUp(200);
            subMenu.style.display = 'block';
        }
    }

}

