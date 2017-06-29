import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SelectCustomersTabDirective } from './search/select-customers-tab.directive';
import { SearchListComponent } from './search/search-list.component';
import { CustomerMediatorService } from './customer-mediator.service';
import { SharedModule } from '../shared/shared.module';
import { DealListComponent } from "./search/deals/deal-list.component";
import { DealDataService } from "../core/services/deal-data.service";
import { FacilityDataService } from "../core/services/facility-data.service";
import { FacilityListComponent } from "./search/facilities/facility-list.component";
import { AccountListComponent } from "./search/accounts/account-list.component";

@NgModule({
    declarations: [SearchListComponent, DealListComponent, FacilityListComponent, AccountListComponent, SelectCustomersTabDirective],
    imports: [SharedModule, RouterModule],
    exports: [SearchListComponent],
    providers: [DealDataService, FacilityDataService]
})
export class CustomersModule { }
