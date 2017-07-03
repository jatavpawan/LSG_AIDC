import { RetailWiresOutComponent } from './out/outgoing-wire/retail-outgoing-wire.component';
import { RouterModule, Routes } from '@angular/router';

import { WiresInComponent } from './in/finance/wires-in.component';
import { RetailWiresInComponent } from './in/retail/retail-wires-in.component';
import { CustomerCanActivateGuard } from '../core/navbar/customer-can-activate.guard';
import {RetailWiresInAssignmentComponent} from './in/retail/assignment/retail-wires-in-assignment.component';

const routes: Routes = [
    { path: 'wiresin', component: WiresInComponent },
    { path: 'retailwiresin', component: RetailWiresInComponent },
    { path: 'retailwiresinassign/:wireInId', component: RetailWiresInAssignmentComponent },
    { path: 'retailwiresout', component: RetailWiresOutComponent, canActivate: [CustomerCanActivateGuard] }
];

export const wiresRouting = RouterModule.forChild(routes);