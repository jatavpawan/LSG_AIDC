import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface ConfirmModel {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
}

@Component({
    selector: 'ta-confirm',
    templateUrl: 'confirm-modal.component.html',
    styleUrls: ['confirm-modal.component.scss']
})
export class ConfirmModalComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
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

    isCancelAvailable(): boolean {
        if (this.cancelText){
            return this.cancelText.length > 0;
        }
        return false;
    }
}
