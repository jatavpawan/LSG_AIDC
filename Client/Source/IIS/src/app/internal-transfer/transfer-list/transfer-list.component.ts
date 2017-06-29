import { Router } from '@angular/router';
import { Component } from "@angular/core";
import { CustomerService } from "../../core/services/customer.service";
import { InternalTransferDataService } from "../../core/services/internal-transfer/internal-transfer-data.service";
import { InternalTransferTransactionTemplate } from "../../shared/models/internal-transfer/internal-transfer-transaction-template.model";
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmModalComponent } from "../../shared/modals/confirm-modal/confirm-modal.component";
import { GrowlerMediatorService } from "../../core/services/mediators/growler-mediator.service";
import { ViewTransferModalComponent } from "../view-transfer-modal/view-transfer-modal.component";
import { InternalTransferMediatorService } from "../../core/services/mediators/internal-transfer-mediator.service";
import * as moment from 'moment';
import {RoutesFactory} from "../../shared/routes.factory";

@Component({
    selector: 'internal-transfer-list',
    templateUrl: 'transfer-list.component.html',
    styleUrls: ['transfer-list.component.scss']
})
export class InternalTransferListComponent {

    public transfers: InternalTransferTransactionTemplate[];
    selectedTemplate: InternalTransferTransactionTemplate;

    constructor(private customerService: CustomerService,
        private internalTransferDataService: InternalTransferDataService,
        private router: Router, private dialogService: DialogService,
        private growlerMediatorService: GrowlerMediatorService,
        private internalTransferService: InternalTransferMediatorService) {
    }


    ngOnInit() {
        this.initializeObjects();
    }

    initializeObjects() {
        this.getInternalTransfers();
    }

    getInternalTransfers() {
        this.internalTransferDataService.getInternalTransfers(this.customerService.selectedCustomer.Id)
            .subscribe((ret: InternalTransferTransactionTemplate[]) => {
                this.transfers = ret;
            }, (err: any) => {
                console.log(err);
            });
    }

    addNew() {
        this.router.navigate([RoutesFactory.createInternalTransferSetupRoute(this.customerService.selectedCustomer.Id)]);
    }

    viewTransfer(transfer: InternalTransferTransactionTemplate) {
        this.selectedTemplate = Object.assign({}, transfer);
        this.dialogService.addDialog(ViewTransferModalComponent,
            {
                title: 'View Transfer',
                message: '',
                confirmText: 'OK',
                cancelText: '',
                transferObject: transfer,
                isForm2279Required: transfer.IsForm2279Complete
            }).subscribe((isConfirmed) => {
                if (isConfirmed) { }

                this.selectedTemplate = undefined;
        });
    }

    editTransfer(transfer: InternalTransferTransactionTemplate) {
        let currentDate: Date = new Date();
        this.selectedTemplate = Object.assign({}, transfer);

        if ((transfer.Schedule.Frequency === 'once') && (moment(transfer.Schedule.OneTimePaymentDate).isSameOrBefore(currentDate, 'day'))) {
            var message: string;
            if (moment(transfer.Schedule.OneTimePaymentDate).isSame(currentDate, 'day')) {
                message = 'Transfers scheduled for today have already been processed.'
            } else {
                message = 'This transfer has already been processed.';
            }
            this.editForOneTimeProcessingToday(message);
            return;
        }

        this.internalTransferService.copiedTransfer = transfer;
        this.router.navigate([RoutesFactory.createInternalTransferSetupRoute(this.customerService.selectedCustomer.Id)]);
    }

    private editForActiveRecurringTransfer(transfer: InternalTransferTransactionTemplate) {
        this.dialogService.addDialog(ConfirmModalComponent, {
            title: 'Confirm',
            message: `You are only able to edit payments scheduled after today. Are you sure you want to edit future payments for this Internal Transfer?`,
            confirmText: 'Yes',
            cancelText: 'No'
        }).subscribe((isConfirmed: boolean) => {
            if (isConfirmed) {
                this.internalTransferService.copiedTransfer = transfer;
                this.router.navigate([RoutesFactory.createInternalTransferSetupRoute(this.customerService.selectedCustomer.Id)]);
            }
        }, (err) => {
            console.log(err);
        });
    }

    private editForOneTimeProcessingToday(message: string) {
        this.dialogService.addDialog(ConfirmModalComponent, {
            title: 'Confirm',
            message: message,
            confirmText: 'OK',
            cancelText: ''
        }).subscribe((isConfirmed) => {
            this.selectedTemplate = undefined;
        });
    }

    confirmDelete(transfer: InternalTransferTransactionTemplate) {
        let currentDate: Date = new Date();
        this.selectedTemplate = Object.assign({}, transfer);

        if (transfer.Schedule.NextPaymentDates && (transfer.Schedule.NextPaymentDates.length > 0) && moment(transfer.StartDate).isSameOrBefore(currentDate, 'day')) {
            this.deleteForActiveRecurringTransfer(transfer);
            return;
        }

        if ((transfer.Schedule.Frequency === 'once') && (moment(transfer.Schedule.OneTimePaymentDate).isSameOrBefore(currentDate, 'day'))) {
            var message: string;
            if (moment(transfer.Schedule.OneTimePaymentDate).isSame(currentDate, 'day')) {
                message = 'Transfers scheduled for today have already been processed.'
            } else {
                message = 'This transfer has already been processed.';
            }
            this.deleteForOneTimeProcessingToday(message);
            return;
        }

        this.deleteForTransferHasNotReachedStartDate(transfer);
    }

    deleteTransfer(transfer: InternalTransferTransactionTemplate) {
        this.internalTransferDataService.deleteInternalTransfer(transfer.TransactionId)
            .subscribe((ret: boolean) => {
                this.getInternalTransfers();
                this.growlerMediatorService.growlSuccess('Success', 'Transfer has been deleted successfully');
            }, (err: any) => {
                console.log(err);
            });
    }

    private deleteForActiveRecurringTransfer(transfer: InternalTransferTransactionTemplate) {
        this.dialogService.addDialog(ConfirmModalComponent, {
            title: 'Confirm',
            message: `You are only able to delete payments scheduled after today. Are you sure you want to delete future payments for this Internal Transfer?`,
            confirmText: 'Yes',
            cancelText: 'No'
        }).subscribe((isConfirmed: boolean) => {
            if (isConfirmed) {
                this.deleteTransfer(transfer);
            }

            this.selectedTemplate = undefined;

        }, (err) => {
            console.log(err);
        });
    }

    private deleteForOneTimeProcessingToday(message: string) {
        this.dialogService.addDialog(ConfirmModalComponent, {
            title: 'Confirm',
            message: message,
            confirmText: 'OK',
            cancelText: ''
        }).subscribe((isConfirmed: boolean) => {
            if (isConfirmed) {}
            this.selectedTemplate = undefined;
        });
    }

    private deleteForTransferHasNotReachedStartDate(transfer: InternalTransferTransactionTemplate) {
        this.dialogService.addDialog(ConfirmModalComponent, {
            title: 'Confirm',
            message: `Are you sure you want to delete this Internal Transfer?`,
            confirmText: 'Yes',
            cancelText: 'No'
        }).subscribe((isConfirmed: boolean) => {
            if (isConfirmed) {
                this.deleteTransfer(transfer);
            }
            this.selectedTemplate = undefined;
        }, (err) => {
            console.log(err);
        });
    }
}