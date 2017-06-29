import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MenuService } from './services/menu.service';
import { TopNavbarComponent } from './navbar/top-navbar/top-navbar.component';
import { SideNavbarComponent } from './navbar/side-navbar/side-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsService } from './services/settings.service';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { AchDataService } from './services/ach/ach-data.service';
import { ModuleLoadedOnceGuard } from './module-loaded-once.guard';
import { CustomerCanActivateGuard } from './navbar/customer-can-activate.guard';
import { CustomerService } from './services/customer.service';
import { AccountsDataService } from './services/accounts-data.service';
import { CustomerLocalStorageService } from './services/local-storage/customer-local-storage.service';
import { CustomerSearchDataService } from './services/customers-search-data.service';
import { GrowlerMediatorService } from './services/mediators/growler-mediator.service';
import { SharedModule } from '../shared/shared.module';
import { AccountsMediatorService } from './services/mediators/accounts-mediator.service';
import { CentralCodesDataService } from './services/central-codes-data.service';
import { UserSettingsDataService } from './services/user-settings-data.service';
import { CustomersRecentComponent } from './customers-recent/customers-recent.component';
import { AchMediatorService } from "./services/mediators/ach-mediator.service";
import { DraftsDataService } from '../core/services/drafts/drafts-data.service';
import { InternalTransferDataService } from "./services/internal-transfer/internal-transfer-data.service";
import { ProcessingDatesDataService } from "./services/processing-dates-data.service";
import { InternalTransferMediatorService } from "./services/mediators/internal-transfer-mediator.service";
import { WiresDataService } from './services/wires/wires-data.service';
import { DealLocalStorageService } from "./services/local-storage/deal-local-storage.service";
import { FacilityLocalStorageService } from "./services/local-storage/facility-local-storage.service";
import { AccountLocalStorageService } from "./services/local-storage/account-local-storage.service";

@NgModule({
    imports: [BrowserModule, RouterModule, SharedModule],
    declarations: [TopNavbarComponent, SideNavbarComponent, FooterComponent, CustomerInfoComponent, CustomersRecentComponent],
    exports: [TopNavbarComponent, SideNavbarComponent, FooterComponent, RouterModule, CustomerInfoComponent, CustomersRecentComponent],
    providers: [MenuService, SettingsService, AchDataService,
        CustomerService, CustomerCanActivateGuard, AccountsDataService, CustomerLocalStorageService,
        DealLocalStorageService, FacilityLocalStorageService, AccountLocalStorageService, CustomerSearchDataService, GrowlerMediatorService, AccountsMediatorService, CentralCodesDataService,
        UserSettingsDataService, AchMediatorService, DraftsDataService, InternalTransferDataService, ProcessingDatesDataService, InternalTransferMediatorService, WiresDataService]
})

export class CoreModule extends ModuleLoadedOnceGuard {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
    }
}