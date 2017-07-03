import {WireOutAuthorization} from "./retail-wire-out-authorization.model";
import {AbaModel} from "../aba.model";
import {RetailWireOutFinalBank} from "./retail-wire-out-final-bank.model";
import {RetailWireOutBeneficiaryInfo} from "./retail-wire-out-beneficiary-info.model";
import {GenericDropDownModel} from "../generic-dropdown-model";
import {RetailWireOutFurtherCreditInfo} from "./retail-wire-out-further-credit-info.model";
import {RetailWireOutAuditInfo} from "./retail-wire-out-audit-info.model";

export class RetailWireOut {
    CustomerId: number;
    TemplateType: GenericDropDownModel[];
    RequestedBy: string;
    ByOrderOf: string;
    Description: string;
    IsFinished: boolean;
    Amount: number;
    Authorization: WireOutAuthorization;
    ReceivingBank: AbaModel;
    FinalBank: RetailWireOutFinalBank;
    BeneficiaryInfo: RetailWireOutBeneficiaryInfo;
    FurtherCreditInfo: RetailWireOutFurtherCreditInfo;
    AuditInfo: RetailWireOutAuditInfo;
}