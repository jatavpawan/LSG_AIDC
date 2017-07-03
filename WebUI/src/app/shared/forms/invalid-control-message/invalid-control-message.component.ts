import { Component, Input } from '@angular/core';

@Component({
    selector: 'ta-invalid-control-message',
    templateUrl: 'invalid-control-message.component.html',
    styleUrls: ['invalid-control-message.component.scss']
})
export class InvalidControlMessageComponent {

    @Input() isInvalid: boolean = false;
    @Input() message: string;
}