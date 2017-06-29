import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { DraftRejection } from '../../shared/models/drafts/draft-rejection.model';
import { Utilities } from '../../shared/utilities.service';
import { CentralCodesDataService } from '../../core/services/central-codes-data.service';
import { GrowlerMediatorService } from '../../core/services/mediators/growler-mediator.service';
import { ConfirmModalComponent } from '../../shared/modals/confirm-modal/confirm-modal.component';
import { CurrencyFormatPipe } from "../../shared/pipes/currency-format.pipe";
import {GenericDropDownModel} from '../../shared/models/generic-dropdown-model';

export interface IRejectConfirmModal {
    draftNumber: number;
    amount: number;
}

@Component({
    selector: 'reject-draft-confirmation.component',
    templateUrl: 'reject-draft-confirmation.component.html',
    styleUrls: ['reject-draft-confirmation.component.scss']
})
export class RejectDraftConfirmationComponent extends DialogComponent<IRejectConfirmModal, DraftRejection> implements OnInit, IRejectConfirmModal {
    draftRejectionReasonCodes: GenericDropDownModel[];
    draftRejection: DraftRejection;
    draftRejectionDescriptionVisible: boolean;
    utilities: Utilities;
    currencyPipe: any;
    draftNumber: number;
    amount: number;
    ng2CurrencyPipe: CurrencyPipe;

    constructor(public centralCodesDataService: CentralCodesDataService, public dialogService: DialogService, public growlerMediatorService: GrowlerMediatorService) {
        super(dialogService);

        this.utilities = new Utilities();
        this.currencyPipe = new CurrencyFormatPipe();
        this.ng2CurrencyPipe = new CurrencyPipe('USD');        
    }

    ngOnInit(): void {
        this.initializeComponent();
    }

    initializeComponent() {
        this.draftRejection = new DraftRejection();
        this.draftRejectionReasonCodes = [];
        this.draftRejection.RejectReasonCode = this.utilities.defaultDropDownValue;
        this.draftRejection.Description = '';
        this.draftRejectionDescriptionVisible = false;
        this.getDraftRejectionReasonCodes();
    }

    getDraftRejectionReasonCodes() {
        this.centralCodesDataService.getDraftRejectReasonCodes()
            .subscribe((ret: GenericDropDownModel[]) => {
                if (ret && ret.length > 0) {
                    this.draftRejectionReasonCodes = ret;
                } else {
                    this.growlerMediatorService.growlError('Error', 'Error getting Draft Rejection Reason Codes');
                }
            }, (err) => {
                this.growlerMediatorService.growlError('Error', 'Error getting Draft Rejection Reason Codes');
            });
    }

    selectionChanged() {
        if (this.draftRejection.RejectReasonCode.Description.startsWith('Other')) {
            this.draftRejectionDescriptionVisible = true;
        } else {
            this.draftRejectionDescriptionVisible = false;
            this.draftRejection.Description = undefined;
        }
    }

    submit() {
        this.dialogService.addDialog(ConfirmModalComponent,
            {
                title: 'Confirm Reject',
                message: `Are you sure you want to reject draft ${this.draftNumber} for ${this.currencyPipe.transform(this.ng2CurrencyPipe.transform(this.amount, 'USD', true,''))}?`,
                confirmText: 'Yes',
                cancelText: 'No'
            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.confirm();
                }
            });
    }

    confirm() {
        this.result = this.draftRejection;
        this.close();
    }
}