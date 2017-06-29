import { RouterModule, Routes } from '@angular/router';
import { RejectionsComponent } from "./rejections.component";

const routes: Routes = [
    { path: '', component: RejectionsComponent }
];

export const rejectionsRouting = RouterModule.forChild(routes);