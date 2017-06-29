import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { rejectionsRouting } from "./rejections.routing";
import { RejectionsComponent } from "./rejections.component";
import { AchRejectionsComponent } from './ach/ach-rejections.component';
import { DraftRejectionsComponent } from './draft/draft-rejections.component';

@NgModule({
    imports: [rejectionsRouting, SharedModule],
    declarations: [RejectionsComponent, AchRejectionsComponent, DraftRejectionsComponent],
    entryComponents: [RejectionsComponent]
})

export class RejectionsModule { }