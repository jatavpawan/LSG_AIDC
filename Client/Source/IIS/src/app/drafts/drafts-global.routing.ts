import { RouterModule, Routes } from '@angular/router';

import { GlobalDraftSearchComponent } from './shared/global-search/global-search.component';

const routes: Routes = [
    { path: 'globalSearch', component: GlobalDraftSearchComponent },
];

export const draftGlobalRouting = RouterModule.forChild(routes);