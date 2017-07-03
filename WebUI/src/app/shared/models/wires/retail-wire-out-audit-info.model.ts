import {AchApprover} from "../ach/ach-approver.model";

export class RetailWireOutAuditInfo {
    PreparedBy: string;
    PreparedOn: string;
    Approver: AchApprover;
}