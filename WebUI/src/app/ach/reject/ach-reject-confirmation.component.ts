import { Component, OnInit } from '@angular/core';
import { IAchRejectConfirmationComponent } from './ach-reject-confirmation.component.interface';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { AchTransaction } from "../../shared/models/ach/ach-transaction.model";
import { AchDataService } from "../../core/services/ach/ach-data.service";
import { GrowlerMediatorService } from "../../core/services/mediators/growler-mediator.service";
import { AchRejectConfirmationMediatorService } from
    "../../core/services/mediators/ach-reject-confirmation-mediator.service";
import { ConfirmModalComponent } from "../../shared/modals/confirm-modal/confirm-modal.component";
import { CentralCodesDataService } from '../../core/services/central-codes-data.service';
import { CurrencyFormatPipe } from "../../shared/pipes/currency-format.pipe";
import { CurrencyPipe } from '@angular/common';
import { GenericDropDownModel } from '../../shared/models/generic-dropdown-model';

@Component({
    selector: 'ta-ach-reject-conformation-component',
    templateUrl: 'ach-reject-confirmation.component.html',
    styleUrls: ['ach-reject-confirmation.component.scss']
})
export class AchRejectConfirmationComponent extends DialogComponent<IAchRejectConfirmationComponent, boolean> implements OnInit {

    achRejection: AchTransaction;
    achRejectionReasonCodes: GenericDropDownModel[];
    otherNoteVisible: boolean;
    currencyPipe: any;
    ng2CurrencyPipe: CurrencyPipe;

    constructor(public dialogService: DialogService,
        public centralCodesDataService: CentralCodesDataService,
        public achDataService: AchDataService,
        public growlerMediatorService: GrowlerMediatorService,
        public achRejectConfirmationMediatorService: AchRejectConfirmationMediatorService) {
        super(dialogService);
        this.currencyPipe = new CurrencyFormatPipe();
        this.ng2CurrencyPipe = new CurrencyPipe('USD');
    }

    ngOnInit() {
        this.getAchRejectionReasonCodes();

        this.achRejection.RejectionReasonId = 0;
        this.achRejection.OtherNote = '';
        this.achRejection.Form2269 = false;
        this.otherNoteVisible = false;
    }

    getAchRejectionReasonCodes() {        

        if (this.achRejection.OlderThan24Hours) {
            this.centralCodesDataService.getAchOlderThan24HoursRejectReasonCodes()
                .subscribe((ret: GenericDropDownModel[]) => {
                    this.achRejectionReasonCodes = ret;
                },
                (err) => {
                    this.growlerMediatorService.growlError('Error', 'Error getting ACH older than 24 hours Rejection Reason codes');
                });
        }
        else if (this.achRejection.TransactionDirection && this.achRejection.TransactionDirection.Description === "In") {
            this.centralCodesDataService.getAchInRejectReasonCodes()
                .subscribe((ret: GenericDropDownModel[]) => {
                    this.achRejectionReasonCodes = ret;
                },
                (err) => {
                    this.growlerMediatorService.growlError('Error', 'Error getting ACH In Rejection Reason codes');
                });
        }
        else if (this.achRejection.TransactionDirection && this.achRejection.TransactionDirection.Description === "Out") {
            this.centralCodesDataService.getAchOutRejectReasonCodes()
                .subscribe((ret: GenericDropDownModel[]) => {
                    this.achRejectionReasonCodes = ret;
                },
                (err) => {
                    this.growlerMediatorService.growlError('Error', 'Error getting ACH Out Rejection Reason codes');
                });
        }
    }

    submit() {
        this.dialogService.removeAll();
        let message = this.achRejection.TransactionDirection ? this.achRejection.TransactionDirection.Description : 'NO DIRECTION PROVIDED';
        let amount = this.currencyPipe.transform(this.ng2CurrencyPipe.transform(this.achRejection.Amount, 'USD', true, ''));

        this.dialogService.addDialog(ConfirmModalComponent,
            {
                title: 'Confirm Reject',
                message: `Are you sure you want to reject this ACH ${message} for ${amount}?`,
                confirmText: 'Yes',
                cancelText: 'No'
            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.achDataService.rejectAch(this.achRejection)
                        .subscribe((ret: void) => {
                            this.broadcast();
                        });
                }
            });
    }

    private broadcast() {
        this.achRejectConfirmationMediatorService.broadCastRefreshRejectsChanged(true);
    }

    setIsNoteVisible() {
        let rejectReasons: GenericDropDownModel[] = this.achRejectionReasonCodes.filter(c => c.Id === this.achRejection.RejectionReasonId);

        if (rejectReasons && rejectReasons.length > 0) {
            let rejectReason: string = rejectReasons[0].Description;

            this.otherNoteVisible = false;

            if (rejectReason && rejectReason.startsWith('Other')){
                this.otherNoteVisible = true;
            } else {
                this.achRejection.OtherNote = '';
            }
        }
    }

    getAchRejectionDropDownPlaceHolder(): string {

        let description = '';

        if (this.achRejection.OlderThan24Hours) {
            description = 'Select Reject Reason (ACH Older Than 24 hours)';
        }
        else if (this.achRejection.TransactionDirection && this.achRejection.TransactionDirection.Description === "In") {
            description = 'Select Reject Reason (ACH In/Payment)';
        }
        else if (this.achRejection.TransactionDirection && this.achRejection.TransactionDirection.Description === "Out") {
            description = 'Select Reject Reason (ACH Out/Advance)';
        }

        return description;
    }

    isAchOlderThan24Hours(): boolean {
        return this.achRejection.OlderThan24Hours;
    }

}
