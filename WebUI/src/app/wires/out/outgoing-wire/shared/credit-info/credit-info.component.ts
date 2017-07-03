import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import {WireOutAuthorization} from '../../../../../shared/models/wires/retail-wire-out-authorization.model';
import {RetailWireOutFurtherCreditInfo} from
    "../../../../../shared/models/wires/retail-wire-out-further-credit-info.model";
import {RetailWireOut} from "../../../../../shared/models/wires/retail-wire-out.model";

@Component({
    selector: 'app-credit-info',
    templateUrl: './credit-info.component.html',
    styleUrls: ['./credit-info.component.scss']
})
export class CreditInfoComponent implements OnInit {
    @Output() onFurtherCreditInfoCompleted = new EventEmitter<boolean>();
    public creditInfo: RetailWireOutFurtherCreditInfo;
    @Input() outgoingWire: RetailWireOut;

    constructor() { }

    ngOnInit() {
        this.initializeObjects();
    }

    initializeObjects() {
        this.creditInfo = new RetailWireOutFurtherCreditInfo();
    }

    validateAccountNumber() {
        if (this.creditInfo.AccountNumber != undefined) {
            if (this.creditInfo.AccountNumber.toString().includes('-')) {
                this.creditInfo.AccountNumber = +this.creditInfo.AccountNumber.toString().replace('-', '');
            }
        }
    }

    creditInfoCompleted() {
        return this.onFurtherCreditInfoCompleted.emit(false);
    }
}