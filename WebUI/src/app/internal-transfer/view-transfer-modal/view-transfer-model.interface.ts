import { InternalTransferTransactionTemplate } from "../../shared/models/internal-transfer/internal-transfer-transaction-template.model";

export interface IViewTransferModel {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    transferObject: InternalTransferTransactionTemplate;
    isForm2279Required: boolean;
}