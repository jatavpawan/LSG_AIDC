import { DraftStatus } from './draft-status.model';
import { AuditInfo } from '../audit-info';

export class DraftTransaction {
    DraftId: number;
    Account: string;
    Purpose: string;
    Amount: string;
    DraftNumber: string;
    TransactionDate: string;
    Bank: string;
    CostCenter: string;
    CustomerName: string;
    PreparedBy: string;
    Status: DraftStatus;
    AuditInfo: AuditInfo;
}