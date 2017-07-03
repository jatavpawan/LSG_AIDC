
import { CounterDraft } from '../../shared/models/drafts/counter-draft.model';

export interface ICounterDraftModal {
    counterDraft: CounterDraft;
    isAddNew: boolean;
    customerId: number;
}