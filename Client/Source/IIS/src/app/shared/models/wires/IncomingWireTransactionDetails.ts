import { Account } from '../account.model';
import { GenericDropDownModel } from '../generic-dropdown-model';

export class IncomingWireTransactionDetails {   

    Amount: number;
    Account: Account;
    TransactionType: GenericDropDownModel;
    FeeCode: GenericDropDownModel;
    GLAccountId: GenericDropDownModel;
    GLSubledger: string;
    Description: string;
    DisplayAccountId: string;
}