import { GenericDropDownModel } from './../generic-dropdown-model';
import { CivCustomerPhone } from "../civ-customer-phone";

export class WireOutAuthorization{
    FirstTimeWireAuthorization: boolean;
    IsNoteSigner: boolean;
    IsForm6272Signed: boolean;
    MethodRequested: GenericDropDownModel;
    IdentityVerification: GenericDropDownModel;
    CustomerCallback: CivCustomerPhone;
}