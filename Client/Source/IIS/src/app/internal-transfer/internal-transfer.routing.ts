import { RouterModule, Routes } from '@angular/router';

import { CustomerCanActivateGuard } from "../core/navbar/customer-can-activate.guard";
import { InternalTransferSetupComponent } from "./setup/internal-transfer-setup.component";
import { InternalTransferListComponent } from "./transfer-list/transfer-list.component";

const routes: Routes = [
    { path: 'setup', component: InternalTransferSetupComponent },
    { path: 'list', component: InternalTransferListComponent}
];

export const appRoutingProviders: any[] = [

];

export const internalTransferRouting = RouterModule.forChild(routes);