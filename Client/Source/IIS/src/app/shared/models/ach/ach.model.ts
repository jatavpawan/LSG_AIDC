import { AchApprover } from './ach-approver.model';
import { BankTemplate } from './bank-template.model';
import { SchedulerContainer } from "../scheduler-container.model";
import { AuditInfo } from '../audit-info';
import { AchStatus } from './ach-status';
import { Account } from '../account.model';
import { AuthorizationType } from './authorization-type.enum';
import { GenericDropDownModel } from '../generic-dropdown-model';

export class Ach {
    AchId: number;
    CustomerId: number;
    Account: Account;
    Amount: string;
    ExcessAmount: string;
    Addenda: string;
    BankTemplate: BankTemplate;
    Nickname: string;
    AchApprover: AchApprover;
    Status: AchStatus;
    StatusDescription: string;
    TransactionDirection: GenericDropDownModel;
    TransactionDirectionDisplay: string;
    FrequencyDisplay: string;
    AuditInfo: AuditInfo;
    Schedule: SchedulerContainer;
    HowToApply: GenericDropDownModel;
    AuthorizationType: AuthorizationType;
    OtherFeeCode: GenericDropDownModel;
}