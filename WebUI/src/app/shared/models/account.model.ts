
import { Office } from './office.model';

export class Account {
    AccountId: number;
    ExternalAccountNumber: number;
    AccountNumber: number;
    AccountDescription: string;
    PrePayRestriction: string;
    CurrentBilledAmount: number;
    CommitmentFcsAvailableAmount: number;
    CurrentBilledPrincipal: number;
    MaturityDate: Date;
    AccountLiabilityCode: number;
    AccountLiabilityCodeDescription: number;
    InterestAmount: number;
    NextDueAmount: number;
    Office: Office;
    AccountAlias: number;
    ScheduledPaymentAmount: number;
    Purpose: string;
}
