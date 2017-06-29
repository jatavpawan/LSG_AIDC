import { NgForm } from '@angular/forms';
import { PaymentDataService } from './../../../core/services/payment/payment-data.service';
import { GrowlerMediatorService } from './../../../core/services/mediators/growler-mediator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { StopPayment } from './../../../shared/models/payments/stop-payment.model';
import { DraftStopPayment } from './../../../shared/models/payments/draft-stop-payment.model';
import { ACHStopPayment } from './../../../shared/models/payments/ach-stop-payment.model';
import { PaymentType } from "../../../shared/models/payments/payment-type";
import { AuditInfo } from "../../../shared/models/audit-info";
import { Account } from '../../../shared/models/account.model';
import * as moment from 'moment';

export interface StopPaymentModel {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    stopPayment: StopPayment;
    customerId: number;
    accounts: Account[];
}

@Component({
    selector: 'ta-stop-payment',
    templateUrl: 'stop-payments-modal.component.html'
})

export class StopPaymentModalComponent extends DialogComponent<StopPaymentModel, boolean> implements OnInit {
    public stopPaymentType: PaymentType;
    public isDraftVisible: boolean = false;
    public isAchVisible: boolean = false;
    public isFeeVisible: boolean = false;
    public feeAmount: number;
    public defaultDropDownValue: any;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    public stopPayment: StopPayment;
    private sub: any;
    customerId: number;
    accounts: Account[];
    @ViewChild('stopPaymentModal') confirmForm: NgForm;

    constructor(dialogService: DialogService,
        public router: Router,
        private route: ActivatedRoute,
        public growler: GrowlerMediatorService,
        private paymentDataService: PaymentDataService) {
        super(dialogService);
    }

    ngOnInit(): void {
        if (this.stopPayment === undefined) {
            this.initializeObjects();
        } else {
            if (this.stopPayment.ACHStopPayment == undefined) {
                this.stopPayment.ACHStopPayment = new ACHStopPayment();
            }
            if (this.stopPayment.DraftStopPayment == undefined) {
                this.stopPayment.DraftStopPayment = new DraftStopPayment();
            }
            this.displayPaymentTypeSubsection();
            this.populateSelectedAccount();
        }
    }

    public initializeObjects() {
        this.stopPayment = new StopPayment();
        this.stopPayment.CustomerId = this.customerId;
        this.defaultDropDownValue = this.stopPayment.Account;
        this.stopPayment.AuditInfo = new AuditInfo();
        this.stopPayment.ACHStopPayment = new ACHStopPayment();
        this.stopPayment.DraftStopPayment = new DraftStopPayment();

    }

    getAchStopPayment() {
        return PaymentType.ACH;
    }

    getDraftStopPayment() {
        return PaymentType.Draft;
    }

    setEndingDraftNumber() {
        this.stopPayment.DraftStopPayment.EndingDraftNumber = this.stopPayment.DraftStopPayment.BeginningDraftNumber;
    }

    isEndingDraftNumberValid() {
        if (this.stopPayment.StopPaymentType == PaymentType.ACH) {
            return true;
        }
        if (this.stopPayment.DraftStopPayment.EndingDraftNumber < this.stopPayment.DraftStopPayment.BeginningDraftNumber) {
            return false;
        }
        return true;
    }

    isEndingAmountValueValid() {
        if (this.stopPayment.StopPaymentType == PaymentType.Draft) {
            return true;
        }
        if (this.stopPayment.ACHStopPayment.ToAmount > 0 && this.stopPayment.ACHStopPayment.ToAmount < this.stopPayment.ACHStopPayment.FromAmount) {
            return false;
        }
        return true;
    }

    displayPaymentTypeSubsection() {
        if (this.stopPayment.StopPaymentId == undefined) {
            this.getFeeAmount();
        }

        this.calculateExpirationDate();
        if (+this.stopPayment.StopPaymentType === +PaymentType.ACH) {
            this.isAchVisible = true;
            this.isDraftVisible = false;
        }
        if (+this.stopPayment.StopPaymentType === +PaymentType.Draft) {
            this.isAchVisible = false;
            this.isDraftVisible = true;
        }
    }

    calculateExpirationDate() {
        this.stopPayment.ExpirationDate = moment().add(1, 'year').toDate();
    }

    confirm() {
        let list = this.accounts.filter(x => x.AccountId === this.stopPayment.Account.AccountId);
        if (list && list.length > 0) {
            this.stopPayment.Account = list[0];
        }

        this.paymentDataService.updateStopPayment(this.stopPayment).subscribe((ret: boolean) => {
            this.result = true;
            this.growler.growlSuccess("Success", "Stop Payment saved");
            this.close();
        },
            (err: any) => {
                this.growler.growlError("Error", "Error getting accounts: " + err);
            });
    }

    clear(confirmForm: NgForm) {
        this.initializeObjects();
        this.isDraftVisible = false;
        this.isAchVisible = false;
        confirmForm.reset();
    }

    cancel() {
        this.result = false;
        this.close();
    }

    populateSelectedAccount(): any {
        let accountList = this.accounts.filter(x => x.AccountId === this.stopPayment.Account.AccountId);
        if (accountList && accountList.length > 0) {
            this.stopPayment.Account = accountList[0];
        }
    }

    getFeeAmount() {
        this.paymentDataService.getFeeAmount(this.stopPayment.StopPaymentType).subscribe((ret: number) => {
            this.feeAmount = ret;
            this.isFeeVisible = true;
        });
    }
}