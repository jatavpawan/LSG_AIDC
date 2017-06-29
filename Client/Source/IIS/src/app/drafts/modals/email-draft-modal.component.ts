import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

import { Draft } from "../../shared/models/drafts/draft.model";

export interface EmailDraftModel {
    drafts: Draft[]
}

@Component({
    selector: 'ta-print-draft',
    templateUrl: 'email-draft-modal.component.html',
    styleUrls: ['email-draft-modal.component.scss']
})
export class EmailDraftModalComponent extends DialogComponent<EmailDraftModel, boolean> implements EmailDraftModel {
    drafts: Draft[];
    result: boolean;
    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    email() {
        this.result = true;
        this.close();
    }

    cancel() {
        this.result = false;
        this.close();
    }

}
