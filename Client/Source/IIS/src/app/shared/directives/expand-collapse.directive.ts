import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';


@Directive({
    selector: '[ta-expand-collapse]'
})

export class ExpandCollapseDirective {
    constructor(private el: ElementRef, private renderer: Renderer) { }

    @HostListener('click') onclick() {

        let subMenu = this.el.nativeElement.parentElement.children[1];

        if (subMenu.style.display == 'none') {
            subMenu.style.display = 'block';
            this.renderer.setElementClass(subMenu.parentElement.children[0].children[1], "fa-minus", true);
            this.renderer.setElementClass(subMenu.parentElement.children[0].children[1], "fa-plus", false);

        } else {
            subMenu.style.display = 'none';
            this.renderer.setElementClass(subMenu.parentElement.children[0].children[1], "fa-plus", true);
            this.renderer.setElementClass(subMenu.parentElement.children[0].children[1], "fa-minus", false);
        }
    }

}
