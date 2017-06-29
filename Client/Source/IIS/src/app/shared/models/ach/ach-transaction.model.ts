
import { AchStatus } from './ach-status';
import {GenericDropDownModel} from '../generic-dropdown-model';

export class AchTransaction {
    AchId: number;
    RejectionReasonId: number;
    OtherNote: string;
    Form2269: boolean;
    ExternalAccountNumber: string;
    Purpose: string;
    Amount: number;
    CompanyName: string;
    TransactionDirection: GenericDropDownModel;
    TransactionDate: string;
    OlderThan24Hours: boolean;
    DisplayAmount: string;
    TransactionDirectionDisplay: string;
    AchStatus: AchStatus;
    IsDeletedRejection: boolean;
    BankName: string;
}