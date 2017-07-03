import { Injectable } from "@angular/core";
import { InternalTransferTransactionTemplate } from "../../../shared/models/internal-transfer/internal-transfer-transaction-template.model";

@Injectable()
export class InternalTransferMediatorService {

    public copiedTransfer: InternalTransferTransactionTemplate;

    constructor() {

    }

}
