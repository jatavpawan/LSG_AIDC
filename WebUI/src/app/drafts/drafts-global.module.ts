import { GlobalDraftSearchComponent } from './shared/global-search/global-search.component';
import { draftGlobalRouting } from './drafts-global.routing';
import { DraftsSharedModule } from './shared/drafts-shared.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [draftGlobalRouting, SharedModule, DraftsSharedModule],
    providers: [],
    declarations: [],  
    entryComponents: []
})

export class DraftsGlobalModule { }