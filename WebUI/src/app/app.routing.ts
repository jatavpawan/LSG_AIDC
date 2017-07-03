import { AchRejectionsComponent } from './rejections/ach/ach-rejections.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { CustomerCanActivateGuard } from './core/navbar/customer-can-activate.guard';
import { AccountsSearchListComponent } from './accounts/search/accounts-search-list-component';
import { SearchListComponent } from './customers/search/search-list.component';

const APP_ROUTES: Routes = [
    { path: '', component: SearchListComponent },
    { path: 'customer/:customerId', component: HomeComponent, canActivate: [CustomerCanActivateGuard] },
    { path: 'customer/:customerId/accountsSearch', component: AccountsSearchListComponent, canActivate: [CustomerCanActivateGuard] },
    { path: 'customersSearch', component: SearchListComponent },
    
    { path: 'customer/:customerId/ach', loadChildren: './ach/ach.module#AchModule', canActivate: [CustomerCanActivateGuard] },
    { path: 'customer/:customerId/drafts', loadChildren: './drafts/drafts.module#DraftsModule', canActivate: [CustomerCanActivateGuard] },
    { path: 'drafts', loadChildren: './drafts/drafts-global.module#DraftsGlobalModule'},
    { path: 'customer/:customerId/payments', loadChildren: './payments/payments.module#PaymentsModule', canActivate: [CustomerCanActivateGuard] },
    { path: 'review', loadChildren: './rejections/rejections.module#RejectionsModule' },
    { path: 'customer/:customerId/internalTransfer', loadChildren: './internal-transfer/internal-transfer.module#InternalTransferModule', canActivate: [CustomerCanActivateGuard] },
    { path: 'wires', loadChildren: './wires/wires.module#WiresModule' }
];

export const appRouting = RouterModule.forRoot(APP_ROUTES);

