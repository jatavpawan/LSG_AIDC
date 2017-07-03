import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { RetailWireOutFinalBank } from "../../../../../shared/models/wires/retail-wire-out-final-bank.model";
import { WiresInDataService } from "../../../../../core/services/wires/wires-in-data.service";
import {CentralCodesDataService} from "../../../../../core/services/central-codes-data.service";
import {GenericDropDownModel} from "../../../../../shared/models/generic-dropdown-model";
import {GrowlerMediatorService} from "../../../../../core/services/mediators/growler-mediator.service";
import {RetailWireOut} from "../../../../../shared/models/wires/retail-wire-out.model";
import {Utilities} from "../../../../../shared/utilities.service";

@Component({
    selector: 'app-final-bank',
    templateUrl: './final-bank.component.html',
    styleUrls: ['./final-bank.component.scss']
})
export class FinalBankComponent implements OnInit {
    @Output() onFinalBankCompleted = new EventEmitter<boolean>();
    finalBank: RetailWireOutFinalBank;
    accountTypeList: GenericDropDownModel[];
    utilities: Utilities;
    @Input() outgoingWire: RetailWireOut;

    constructor(private centralCodesDataService: CentralCodesDataService, private growler: GrowlerMediatorService) { }

    ngOnInit() {
        this.initializeObjects();
    }

    initializeObjects() {
        this.utilities = new Utilities();
        this.finalBank = new RetailWireOutFinalBank();
        this.finalBank.AccountType = this.utilities.defaultDropDownValue;

        const accountTypeCallback = (ret: GenericDropDownModel[]) => {
            if (ret && ret.length > 0) {
                this.accountTypeList = ret;
            }
        };
        this.getAccountTypes(accountTypeCallback);
    }

    getAccountTypes(successCallback: any) {
        this.centralCodesDataService.getAccountTypes()
            .subscribe(successCallback, (err: any) => {
                this.growler.growlError("Error", "Error getting Account Type");
            });
        
    }

    finalBankCompleted() {
        return this.onFinalBankCompleted.emit(false);
    }
}