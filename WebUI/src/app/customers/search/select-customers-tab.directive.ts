import { Directive } from '@angular/core';

@Directive({
    selector: '.select-customers-tab'
})
export class SelectCustomersTabDirective {
    select() {
        const customersTabPill: any = $('.select-customers-tab');
        customersTabPill.tab('show');
    }
}