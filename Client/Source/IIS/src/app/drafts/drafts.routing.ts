import { RouterModule, Routes } from '@angular/router';

import { CounterDraftListComponent } from "./counter-draft/counter-draft-list/counter-draft-list.component";
import { CustomerCanActivateGuard } from "../core/navbar/customer-can-activate.guard";
import { GlobalDraftSearchComponent } from './shared/global-search/global-search.component';
import { RejectDraftTransactionComponent } from './reject/reject-draft-transaction.component';

const routes: Routes = [
    { path: 'counterdraft', component: CounterDraftListComponent },
    { path: 'customerDraftSearch', component: GlobalDraftSearchComponent},
    { path: 'rejectDraft', component: RejectDraftTransactionComponent}

];

export const draftRouting = RouterModule.forChild(routes);