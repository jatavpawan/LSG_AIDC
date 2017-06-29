import { Ach } from '../../../shared/models/ach/ach.model';

export interface IViewTransactionModel {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    ach: Ach;
    twentyOneFourty: boolean;
    verbalAchReceived: boolean;
}