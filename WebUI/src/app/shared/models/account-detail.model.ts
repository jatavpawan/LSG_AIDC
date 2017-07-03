import { Account } from "./account.model";

export class AccountDetail extends Account {

    ProductTypeDescription: string;
    LoanLiabilityBalance: number;
    CommitmentFcsAvailableAmount: number;
    CurrentDueDate: Date;
    PastDueDate: Date;
    PastDueAmount: number;
    CurrentBilledAmount: number;
    AccruedInterest: number;
    LastRenewalDate: Date;
    FeeAmount: number;
    LateChargeAmount: number;
    InterestRate: number;
    PerDiem: number;
    InterestPaidToDate: number;
    InterestPaidEarnedLastYear: number;
    InterestReportedIrsAmount: number;
    FinalRiskRating: number;
}
