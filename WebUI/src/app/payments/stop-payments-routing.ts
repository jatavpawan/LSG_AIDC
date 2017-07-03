import { Routes, RouterModule } from '@angular/router';

import {StopPaymentsComponent} from "./stop-payments/stop-payments.component";
import { CustomerCanActivateGuard } from "../core/navbar/customer-can-activate.guard";

const routes: Routes = [
    // tslint:disable-next-line:max-line-length
    { path: 'stoppayments', component: StopPaymentsComponent}
];


export const appRoutingProviders: any[] = [

];

export const stopPaymentsRouting = RouterModule.forChild(routes);