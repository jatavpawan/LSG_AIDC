import { AuditInfo } from '../audit-info';
import { DraftTransaction } from './draft-transaction.model';
import {GenericDropDownModel} from '../generic-dropdown-model';

export class DraftRejection extends DraftTransaction {
    RejectId: number;
    DraftId: number;
    RejectReasonCode: GenericDropDownModel;
    RejectReason: number;
    RejectionReasonDescription: string;
    Description: string;
    AuditInfo: AuditInfo;
    RejectType: string;
    StatusDisplay: string;
}