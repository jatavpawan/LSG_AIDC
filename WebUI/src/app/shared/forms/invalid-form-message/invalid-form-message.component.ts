import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ta-invalid-form-message',
    templateUrl: 'invalid-form-message.component.html',
    styleUrls: ['invalid-form-message.component.scss']
})
export class InvalidFormMessageComponent {
    @Input() isSubmitted: boolean = false;
    @Input() isValid: boolean = false;

    constructor() {
    }
}