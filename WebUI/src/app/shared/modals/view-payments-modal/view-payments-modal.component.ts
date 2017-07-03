import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface ViewPaymentsModel {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    upcomingPayments: string[];
}

@Component({
    selector: 'ta-view-payments',
    templateUrl: 'view-payments-modal.component.html',
    styleUrls: ['view-payments-modal.component.scss']
})
export class ViewPaymentsModalComponent extends DialogComponent<ViewPaymentsModel, boolean> implements ViewPaymentsModel {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    upcomingPayments: string[];

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    confirm() {
        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }
}
