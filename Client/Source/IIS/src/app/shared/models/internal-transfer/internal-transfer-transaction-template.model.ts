import { GenericDropDownModel } from './../generic-dropdown-model';
import { SchedulerContainer } from "../scheduler-container.model";
import { AuditInfo } from '../audit-info';
import { Account } from '../account.model';
import { Customer } from "../customer.model";
import { ScheduleType } from "../schedule-type.model";

export class InternalTransferTransactionTemplate {
    TransactionId: number;
    FromCustomer: Customer;
    ToCustomer: Customer;
    FromAccount: Account;
    ToAccount: Account;
    Nickname: string;
    HowToApply: GenericDropDownModel;
    Amount: string;
    ExcessAmount: string;
    AuditInfo: AuditInfo;
    Schedule: SchedulerContainer;
    IsActive: boolean;
    IsForm2279Complete: boolean;
    StartDate: Date;
    FromDisplay: string;
    ToDisplay: string;
    ScheduleType: string;
    OtherFeeCode: GenericDropDownModel;
}