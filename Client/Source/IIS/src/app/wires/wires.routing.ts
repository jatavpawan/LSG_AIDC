import { RouterModule, Routes } from '@angular/router';

import { WiresInComponent } from './in/finance/wires-in.component';
import { RetailWiresInComponent } from './in/retail/retail-wires-in.component';
import {RetailWiresInAssignmentComponent} from './in/retail/assignment/retail-wires-in-assignment.component';

const routes: Routes = [
    { path: 'wiresin', component: WiresInComponent },
    { path: 'retailwiresin', component: RetailWiresInComponent },
    { path: 'retailwiresinassign/:wireInId', component: RetailWiresInAssignmentComponent }
];

export const wiresRouting = RouterModule.forChild(routes);