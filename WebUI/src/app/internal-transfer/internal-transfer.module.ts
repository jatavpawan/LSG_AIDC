import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";

import { InternalTransferSetupComponent } from "./setup/internal-transfer-setup.component";
import { appRoutingProviders, internalTransferRouting } from './internal-transfer.routing';
import { CustomerSearchModalComponent } from "../shared/modals/customer-search-modal/customer-search-modal.component";
import { ViewTransferModalComponent } from "./view-transfer-modal/view-transfer-modal.component";
import { InternalTransferListComponent } from "./transfer-list/transfer-list.component";

@NgModule(({
    imports: [internalTransferRouting, SharedModule],
    providers: [appRoutingProviders],
    declarations: [InternalTransferSetupComponent, CustomerSearchModalComponent, ViewTransferModalComponent, InternalTransferListComponent],
    entryComponents: [InternalTransferSetupComponent, CustomerSearchModalComponent, ViewTransferModalComponent, InternalTransferListComponent]
}))
export class InternalTransferModule { }