import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'ta-form-group-validation',
    templateUrl: 'form-group-validation.component.html',
    styleUrls: ['form-group-validation.component.scss']
})
export class FormGroupValidationComponent implements OnChanges {

    @Input() isInvalid: boolean = false;
    @Input() isRequired: boolean = false;
    @Input() extraClass: string;

    isCurrentlyInvalid: boolean = false;
    formGroupClass: string;

    ngOnChanges(changes: SimpleChanges) {
        this.isCurrentlyInvalid = changes['isInvalid'] ? changes['isInvalid'].currentValue : this.isCurrentlyInvalid;
        this.formGroupClass = `form-group ${this.extraClass || ''} ${this.isCurrentlyInvalid ? 'has-danger ' : ' '}${this.isRequired ? 'is-required' : ''}`;
    }
}