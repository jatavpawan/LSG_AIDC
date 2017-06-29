import { NgModule } from '@angular/core';
import { AutoCompleteModule } from 'primeng/primeng';

import { SharedModule } from "../shared/shared.module";
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

@NgModule(({
    imports: [SharedModule, wiresRouting, AutoCompleteModule],
    providers: [],
    declarations: [WiresInComponent, WiresInAssignmentComponent, RetailWiresInComponent, RetailWiresInAssignmentComponent, RetailWiresInUnassignComponent, WireAllocationComponent, RetailWiresInDetailsComponent, WireAllocationInputDetailsComponent
        , WireAllocationCustomerSearchComponent],
    entryComponents: [WiresInComponent, WiresInAssignmentComponent, RetailWiresInAssignmentComponent, RetailWiresInUnassignComponent, WireAllocationComponent
,WireAllocationCustomerSearchComponent]
}))
export class WiresModule { }