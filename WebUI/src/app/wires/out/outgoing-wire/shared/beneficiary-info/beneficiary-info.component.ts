import { CustomerService } from './../../../../../core/services/customer.service';
import { WiresOutDataService } from './../../../../../core/services/wires/wires-out-data.service';
import { RetailWireOutTemplateCheck } from './../../../../../shared/models/wires/retail-wire-out-template-check.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { RetailWireOutBeneficiaryInfo } from "../../../../../shared/models/wires/retail-wire-out-beneficiary-info.model";
import { RetailWireOut } from "../../../../../shared/models/wires/retail-wire-out.model";
import { ConfirmModalComponent } from "../../../../../shared/modals/confirm-modal/confirm-modal.component";
import { DialogService } from "ng2-bootstrap-modal";

@Component({
    selector: 'app-beneficiary-info',
    templateUrl: './beneficiary-info.component.html',
    styleUrls: ['./beneficiary-info.component.scss']
})
export class BeneficiaryInfoComponent implements OnInit {
    @Output() onBeneficiaryInfoCompleted = new EventEmitter<boolean>();
    @Output() onPreviousTemplateSelected = new EventEmitter<RetailWireOut>();
    public beneficiaryInfo: RetailWireOutBeneficiaryInfo;
    public templateCheck: RetailWireOutTemplateCheck;
    @Input() outgoingWire: RetailWireOut;

    constructor(private dialogService: DialogService,
        private wiresOutDataService: WiresOutDataService, private customerService: CustomerService) { }

    ngOnInit() {
        this.initializeObjects();
    }

    initializeObjects() {
        this.beneficiaryInfo = new RetailWireOutBeneficiaryInfo();
        this.templateCheck = new RetailWireOutTemplateCheck();
    }

    beneficiaryCompleted() {
        return this.onBeneficiaryInfoCompleted.emit(false);
    }

    checkAbaNumber(event: any) {
        this.populateTempleCheck();
        this.wiresOutDataService.checkForExistingWireTemplate(this.templateCheck).subscribe((wireOut: RetailWireOut) => {
            if (wireOut) {
                this.dialogService.addDialog(ConfirmModalComponent,
                    {
                        title: '',
                        message: `This template looks similar to another. Would you like to view the existing template?`,
                        confirmText: 'Yes',
                        cancelText: 'No'
                    }).subscribe((isConfirmed) => {
                        if (isConfirmed) {
                            this.onPreviousTemplateSelected.emit(wireOut);
                        }
                        console.log("Do nothing");
                    });
            } else{

            }
        });
    }

    populateTempleCheck() {
        this.templateCheck.AbaNumber = this.outgoingWire.ReceivingBank.AbaRoutingNumber;
        this.templateCheck.BeneficiaryAccountNumber = this.beneficiaryInfo.AccountNumber;
        this.templateCheck.BeneficiaryName = this.beneficiaryInfo.Name;
        this.templateCheck.CustomerId = this.customerService.selectedCustomer.Id;
    }
}