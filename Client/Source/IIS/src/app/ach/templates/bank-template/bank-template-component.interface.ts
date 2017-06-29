
import { BankTemplate } from '../../../shared/models/ach/bank-template.model';

export interface IBankTemplateComponentModel {
    achTemplateData: BankTemplate;
    isAddNew: boolean;
}