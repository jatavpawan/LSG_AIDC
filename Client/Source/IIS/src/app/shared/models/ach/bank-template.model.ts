import { AuditInfo } from '../audit-info';
import { GenericDropDownModel } from '../generic-dropdown-model';

export class BankTemplate {
    BankTemplateId: number;
    AbaRoutingNumber: string;
    BankName: string;
    City: string;
    State: string;
    BankAccountType: GenericDropDownModel;
    CustomerId: number;
    ExternalAccountNumber: string;
    Purpose: string;
    IsActive: boolean;
    AuditInfo: AuditInfo;
    StatusDisplay: string;
    AccountHolderName: string;
    IsCustomerAccountHolder: boolean;
}

