import { SharedModule } from './../../shared/shared.module';
import { GlobalDraftSearchComponent } from './global-search/global-search.component';
import { NgModule } from '@angular/core';
import {EditDraftModalComponent} from "../modals/edit-draft-modal.component";
import {EmailDraftModalComponent} from "../modals/email-draft-modal.component";
import {PrintDraftModalComponent} from "../modals/print-draft-modal.component";

@NgModule({
    imports: [SharedModule],
    providers: [],
    declarations: [GlobalDraftSearchComponent, EditDraftModalComponent, EmailDraftModalComponent, PrintDraftModalComponent],
    exports: [GlobalDraftSearchComponent, EditDraftModalComponent, EmailDraftModalComponent, PrintDraftModalComponent],
    entryComponents: [EditDraftModalComponent, EmailDraftModalComponent, PrintDraftModalComponent]
})

export class DraftsSharedModule { }