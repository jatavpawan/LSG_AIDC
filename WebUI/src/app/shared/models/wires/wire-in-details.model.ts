import {WireInSender} from './wire-in-sender.model';
import {WireInBeneficiary} from './wire-in-beneficiary.model';
import {WireInOther} from './wire-in-other.model';

export class WireInDetailsModel {
    IncomingWireId: number;
    DateReceived: string;
    Amount:number;
    Office: string;
    Comments: string;
    WireInSender: WireInSender;
    WireInBeneficiary: WireInBeneficiary;
    WireInOther: WireInOther;
}