import { WiresOutDataService } from './../core/services/wires/wires-out-data.service';
import { NgModule } from '@angular/core';
import { AutoCompleteModule } from 'primeng/primeng';

import { SharedModule } from "../shared/shared.module";

import { AuditInfoComponent } from './out/outgoing-wire/shared/audit-info/audit-info.component';
import { BeneficiaryInfoComponent } from './out/outgoing-wire/shared/beneficiary-info/beneficiary-info.component';
import { CreditInfoComponent } from './out/outgoing-wire/shared/credit-info/credit-info.component';
import { FinalBankComponent } from './out/outgoing-wire/shared/final-bank/final-bank.component';
import { ReceivingBankComponent } from './out/outgoing-wire/shared/receiving-bank/receiving-bank.component';
import { AuthorizationComponent } from './out/outgoing-wire/shared/authorization/authorization.component';
import { RecurringComponent } from './out/outgoing-wire/recurring/recurring.component';
import { ParticipationComponent } from './out/outgoing-wire/participation/participation.component';
import { NewLoanComponent } from './out/outgoing-wire/new-loan/new-loan.component';
import { StandardTemplateComponent } from './out/outgoing-wire/standard-template/standard-template.component';
import { RetailWiresOutComponent } from './out/outgoing-wire/retail-outgoing-wire.component';
import { WiresInComponent } from './in/finance/wires-in.component';
import { WiresInAssignmentComponent } from './in/finance/assignment/wires-in-assignment.component';
import { wiresRouting } from "./wires.routing";
import { RetailWiresInUnassignComponent } from './in/retail/unassign/retail-wires-in-unassign.component';
import { RetailWiresInAssignmentComponent } from './in/retail/assignment/retail-wires-in-assignment.component';
import { RetailWiresInComponent } from './in/retail/retail-wires-in.component';
import { WireAllocationComponent } from './in/retail/assignment/allocation/wire-allocation.component';
import {RetailWiresInDetailsComponent} from './in/retail/assignment/details/retail-wires-in-details.component';
import {WireAllocationInputDetailsComponent} from
    './in/retail/assignment/allocation/wire-allocation-input-details.component';
import {WireAllocationCustomerSearchComponent} from
    './in/retail/assignment/allocation/wire-allocation-customer-search.component';
import {WiresInDataService} from "../core/services/wires/wires-in-data.service";

@NgModule(({
    imports: [SharedModule, wiresRouting, AutoCompleteModule],
    providers: [WiresOutDataService, WiresInDataService],
    declarations: [WiresInComponent, 
    WiresInAssignmentComponent, 
    RetailWiresInComponent, 
    RetailWiresInAssignmentComponent, 
    RetailWiresInUnassignComponent, 
    RetailWiresOutComponent, 
    StandardTemplateComponent,
    NewLoanComponent,
    ParticipationComponent,
    RecurringComponent,
    AuthorizationComponent, 
    ReceivingBankComponent, 
    FinalBankComponent, 
    CreditInfoComponent,
    BeneficiaryInfoComponent, 
    AuditInfoComponent, WireAllocationComponent, RetailWiresInDetailsComponent, WireAllocationInputDetailsComponent
        , WireAllocationCustomerSearchComponent],
    entryComponents: [WiresInComponent, WiresInAssignmentComponent, RetailWiresInAssignmentComponent, RetailWiresInUnassignComponent, RetailWiresOutComponent, WireAllocationComponent, WireAllocationCustomerSearchComponent]
}))
export class WiresModule { }
