import { RouterModule, Routes } from '@angular/router';

import {BankAccountManagerComponent} from "./templates/bank-account-manager/bank-account-manager.component";
import {CustomerCanActivateGuard} from "../core/navbar/customer-can-activate.guard";
import {AchSetupComponent} from "./shared/ach-setup.component";
import {AchTransactionsComponent} from "./ach-transactions/ach-transactions.component";
import { AchRejectComponent } from "./reject/ach-reject.component";

const routes: Routes = [
    { path: 'bankTemplate', component: BankAccountManagerComponent},
    { path: 'createAch/:bankTemplateId', component: AchSetupComponent},
    { path: 'createAch', component: AchSetupComponent},
    { path: 'achTransactions', component: AchTransactionsComponent},    
    { path: 'reject', component: AchRejectComponent}    
   
];

export const appRoutingProviders: any[] = [

];

export const achTemplatesRouting = RouterModule.forChild(routes);