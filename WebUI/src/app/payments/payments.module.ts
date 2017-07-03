import { PaymentDataService } from './../core/services/payment/payment-data.service';
import { SharedModule } from './../shared/shared.module';

import { NgModule } from '@angular/core';

import { StopPaymentsComponent } from './stop-payments/stop-payments.component';
import { StopPaymentModalComponent } from "./stop-payments/stop-payments-modal/stop-payments-modal.component";
import { stopPaymentsRouting } from "./stop-payments-routing";

@NgModule({
    imports: [stopPaymentsRouting, SharedModule],
    exports: [],
    declarations: [StopPaymentsComponent, StopPaymentModalComponent],
    providers: [PaymentDataService],
    entryComponents: [StopPaymentModalComponent]
})
export class PaymentsModule { }
