import { AuditInfo } from '../audit-info';
import { Account } from '../account.model';
import { Bank } from './bank.model';
import { DraftStatus } from './draft-status.model';

export class Draft {
    DraftId: number;
    Cif: number;
    DraftNumber: number;
    Amount: number;
    Date: string;
    Bank: Bank;
    IsSelectedForAction: boolean;
    Status: DraftStatus;
    Account: Account;
    AuditInfo: AuditInfo;
}