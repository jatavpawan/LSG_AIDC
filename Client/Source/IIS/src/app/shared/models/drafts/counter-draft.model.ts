
import { AuditInfo } from '../audit-info';
import { Office } from '../office.model';

export class CounterDraft {
    CounterDraftId: number;
    CustomerId: number;
    LASAccountNumber: number;
    BeginningDraftNumber: number;
    EndingDraftNumber: number;
    StatusDescription: string;
    IsActive: boolean;
    AuditInfo: AuditInfo;
    Office: Office;
    PreparedBy: string;
}