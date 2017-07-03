import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

import { Draft } from "../../shared/models/drafts/draft.model";

export interface PrintDraftModel {
    drafts: Draft[]
}

@Component({
    selector: 'ta-print-draft',
    templateUrl: 'print-draft-modal.component.html',
    styleUrls: ['print-draft-modal.component.scss']
})
export class PrintDraftModalComponent extends DialogComponent<PrintDraftModel, boolean> implements PrintDraftModel {
    drafts: Draft[];
    result: boolean;
    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    print() {
        this.result = true;
        this.close();
    }

    cancel() {
        this.result = false;
        this.close();
    }

}
