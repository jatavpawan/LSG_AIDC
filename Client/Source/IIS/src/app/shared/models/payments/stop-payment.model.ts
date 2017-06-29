import { DraftStopPayment } from './draft-stop-payment.model';
import { ACHStopPayment } from './ach-stop-payment.model';
import { Account } from './../account.model';
import { AuditInfo } from './../audit-info';
import { PaymentType } from './payment-type';

export class StopPayment {
    StopPaymentId: number;
    Account: Account;
    ACHStopPayment: ACHStopPayment;
    DraftStopPayment: DraftStopPayment;
    IsRegionalAccount: boolean;
    StopPaymentType: PaymentType;
    StopPaymentTypeDisplay: string;
    Description: string;
    ExpirationDate: Date;
    ExpirationDateDisplay: string;
    AuditInfo: AuditInfo;
    CustomerId: number;
}
