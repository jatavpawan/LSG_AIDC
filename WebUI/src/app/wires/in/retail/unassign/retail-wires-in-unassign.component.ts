import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import {ConfirmModalComponent} from '../../../../shared/modals/confirm-modal/confirm-modal.component';

@Component({
    selector: 'retail-wires-in-unassign',
    templateUrl: 'retail-wires-in-unassign.component.html'
})


export class RetailWiresInUnassignComponent extends DialogComponent<void, string> {
    text: string;
    comment: string;

    constructor(public dialogService: DialogService) {
        super(dialogService);
        this.comment = '';
    }

    submit() {
        this.dialogService.addDialog(ConfirmModalComponent,
            {
                title: 'Confirm Reject',
                message: `If you select Unassign, this wire will be sent back to the Cash Management queue.`,
                confirmText: 'Unassign',
                cancelText: 'Cancel'
            }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.confirm();
            }
        });
    }

    confirm() {
        this.result = this.comment;
        this.close();
    }

    cancel() {
        this.close();
    }
}