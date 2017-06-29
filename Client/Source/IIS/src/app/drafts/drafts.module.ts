import { DraftsSharedModule } from './shared/drafts-shared.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CounterDraftListComponent } from './counter-draft/counter-draft-list/counter-draft-list.component';
import { CounterDraftComponent } from './counter-draft/counter-draft.component';
import { draftRouting } from "./drafts.routing";
import { RejectDraftTransactionComponent } from './reject/reject-draft-transaction.component';
import { RejectDraftConfirmationComponent } from './reject/reject-draft-confirmation.component';

@NgModule({
    imports: [draftRouting, SharedModule, DraftsSharedModule],
    providers: [],
    declarations: [CounterDraftListComponent, CounterDraftComponent, RejectDraftTransactionComponent, RejectDraftConfirmationComponent],
    entryComponents: [CounterDraftComponent, RejectDraftTransactionComponent, RejectDraftConfirmationComponent]
})

export class DraftsModule { }