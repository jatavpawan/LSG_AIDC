import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface CustomerSelectionModel {
    title: string;
    message: string;
}

@Component({
    selector: 'ta-customer-selection',
    templateUrl: 'customer-selection-modal.component.html',
    styleUrls: ['customer-selection-modal.component.scss']
})
export class CustomerSelectionModalComponent extends DialogComponent<CustomerSelectionModel, boolean> implements CustomerSelectionModel {
    title: string;
    message: string;
    constructor(dialogService: DialogService) {
        super(dialogService);
    }
    confirm() {
        this.result = true;
        this.close();
    }
}
