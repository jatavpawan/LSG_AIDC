import { DateFormatPipe } from './../../shared/pipes/date-format.pipe';
import { StopPaymentModalComponent } from './stop-payments-modal/stop-payments-modal.component';
import { PaymentDataService } from './../../core/services/payment/payment-data.service';
import { Account } from './../../shared/models/account.model';
import { AccountsDataService } from './../../core/services/accounts-data.service';
import { StopPayment } from './../../shared/models/payments/stop-payment.model';

import { GrowlerMediatorService } from './../../core/services/mediators/growler-mediator.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmModalComponent } from './../../shared/modals/confirm-modal/confirm-modal.component';

import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { PaymentType } from '../../shared/models/payments/payment-type';

@Component({
    selector: 'app-stop-payments',
    templateUrl: './stop-payments.component.html',
    styleUrls: ['./stop-payments.component.css']
})
export class StopPaymentsComponent implements OnInit {
    public customerId: number;
    public stopPaymentsList: StopPayment[];
    private sub: any;
    accounts: Account[];
    public isRegionalCustomer: boolean = true;
    selectedStopPayment: StopPayment;

    constructor(public router: Router,
        private accountService: AccountsDataService,
        private route: ActivatedRoute,
        public dialogService: DialogService,
        public growler: GrowlerMediatorService,
        private paymentDataService: PaymentDataService) {
    }

    ngOnInit() {
        this.getRouteParams();
        this.initializeStopPayments();
    };

    initializeStopPayments() {

    }

    delete(item: StopPayment) {
        this.selectedStopPayment = Object.assign({}, item);

        this.dialogService.addDialog(ConfirmModalComponent, {
            title: 'Delete Confirmation',
            message: 'Are you sure you want to delete this Stop Payment?',
            confirmText: 'Yes',
            cancelText: 'No'
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.deleteSelectedPayment(item.StopPaymentId, item.StopPaymentType);
            }

            this.selectedStopPayment = undefined;
        });
    }

    public getDynamicAutoId(name: string, id: string) {
        return name + id;
    }

    getRouteParams() {
        this.sub = this.route.params.subscribe((params) => {
            this.customerId = +params['customerId'];
            if (this.customerId !== 0) {
                this.getAccounts(this.customerId);
                this.getStopPayment(this.customerId);
            }
        });
    }

    getAccounts(Id: number) {
        this.accountService.getAccounts(Id)
            .subscribe((ret: Account[]) => {
                if (ret && ret.length > 0) {
                    this.accounts = ret;
                }
            },
            (err: any) => {
                this.growler.growlError("Error", "Error getting accounts: " + err);
            });
    }

    getStopPayment(Id: number) {
        this.paymentDataService.getStopPayment(Id)
            .subscribe((ret: StopPayment[]) => {
                if (ret && ret.length > 0) {
                    this.stopPaymentsList = ret;
                    this.applyPipes();
                    this.checkIfCustomerIsRegional();
                }
                else {
                    this.stopPaymentsList = new Array<StopPayment>();
                }
            },
            (err: any) => {
                this.growler.growlError("Error", "Error getting accounts: " + err);
            });
    }

    checkIfCustomerIsRegional() {
        if (this.stopPaymentsList[0].IsRegionalAccount === false) {
            this.isRegionalCustomer = false;

            this.dialogService.addDialog(ConfirmModalComponent, {
                title: 'Invalid Region',
                message: 'This account is outside of your region. You can only place Stop Payments on accounts in your region.',
                confirmText: 'OK'
            });
        }
    }

    applyPipes() {
        let pipe = new DateFormatPipe();

        if (this.stopPaymentsList && this.stopPaymentsList.length > 0) {
            var i: number;
            for (i = 0; i < this.stopPaymentsList.length; i++) {
                this.stopPaymentsList[i].ExpirationDateDisplay = pipe.transform(this.stopPaymentsList[i].ExpirationDate.toString(), "MM/DD/YYYY");
            }
        }
    }

    deleteSelectedPayment(stopPaymentId: number, stopPaymentTypeId: number) {
        this.paymentDataService.deleteStopPayment(stopPaymentId, stopPaymentTypeId).subscribe((ret: boolean) => {
            if (ret) {
                this.getStopPayment(this.customerId);
                this.growler.growlSuccess("Success", "Stop Payment has been successfully deleted");
            }
        },
            (err: any) => {
                this.growler.growlError("Error", "Error deleting record.");
            });
    }

    editPayment(item: StopPayment) {
        var stopPaymentCopy = Object.assign({}, item);
        this.selectedStopPayment = Object.assign({}, item);

        this.dialogService.addDialog(StopPaymentModalComponent,
            {
                title: 'Edit Stop Payment',
                message: '',
                confirmText: '',
                cancelText: '',
                stopPayment: stopPaymentCopy,
                customerId: this.customerId,
                accounts: this.accounts
            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.getStopPayment(this.customerId);
                }

                this.selectedStopPayment = undefined;
        });
    }

    addNew() {
        this.dialogService.addDialog(StopPaymentModalComponent,
            {
                title: 'Add Stop Payment',
                message: '',
                confirmText: '',
                cancelText: '',
                stopPayment: undefined,
                customerId: this.customerId,
                accounts: this.accounts
            }).subscribe((isConfirmed) => {
                this.getStopPayment(this.customerId);
            });
    }

    isAch(item: StopPayment) {
        if (item != undefined) {
            return item.StopPaymentType == PaymentType.ACH;
        }
        return false;
    }

    isDraft(item: StopPayment) {
        if (item != undefined) {
            return item.StopPaymentType == PaymentType.Draft;
        }
        return false;
    }

    pipeRow(item: StopPayment) {

        if (item.StopPaymentType == PaymentType.ACH) {
            if (item.ACHStopPayment.DisplayToAmount !== null) {
                return item.ACHStopPayment.DisplayFromAmount + ' - '
                    + item.ACHStopPayment.DisplayToAmount;
            }
            return item.ACHStopPayment.DisplayFromAmount;
        }
        return '';
    }
}