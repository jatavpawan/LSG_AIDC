import { Observable } from "rxjs";

import { CounterDraft } from '../../shared/models/drafts/counter-draft.model';
import { AuditInfo } from '../../shared/models/audit-info';
import { Office } from '../../shared/models/office.model';
import { Draft } from "../../shared/models/drafts/draft.model";
import { DraftSearch } from "../../shared/models/drafts/draft-search.model";
import { DraftImage } from "../../shared/models/drafts/draft-image.model";
import { DraftTransaction } from './../../shared/models/drafts/draft-transaction.model';
import { DraftRejection } from '../../shared/models/drafts/draft-rejection.model';

export class MockDraftDataService {

    get(customerId: string): Observable<CounterDraft[]> {

        let mockCounterDrafts: CounterDraft[] = [];

        let mockCounterDraft: CounterDraft = new CounterDraft();

        mockCounterDraft.CounterDraftId = 1;
        mockCounterDraft.CustomerId = 1;
        mockCounterDraft.LASAccountNumber = 1234;
        mockCounterDraft.BeginningDraftNumber = 1;
        mockCounterDraft.EndingDraftNumber = 10;
        mockCounterDraft.StatusDescription = 'Active';
        mockCounterDraft.IsActive = true;
        mockCounterDraft.AuditInfo = new AuditInfo();
        mockCounterDraft.Office = new Office();
        mockCounterDrafts.push(mockCounterDraft);

        mockCounterDraft = new CounterDraft();
        mockCounterDraft.CounterDraftId = 2;
        mockCounterDraft.CustomerId = 1;
        mockCounterDraft.LASAccountNumber = 4321;
        mockCounterDraft.BeginningDraftNumber = 11;
        mockCounterDraft.EndingDraftNumber = 20;
        mockCounterDraft.StatusDescription = 'Deleted';
        mockCounterDraft.IsActive = false;
        mockCounterDraft.AuditInfo = new AuditInfo();

        mockCounterDraft.Office = new Office();

        mockCounterDrafts.push(mockCounterDraft);

        return Observable.of(mockCounterDrafts);
    }

    deleteCounterDraft(counterDraftId: number): Observable<boolean> {
        if (counterDraftId < 0) {
            return Observable.of(false);
        }
        else {
            return Observable.of(true);
        }
    }

    insertCounterDraft(counterDraft: CounterDraft): Observable<boolean> {
        if (counterDraft.CounterDraftId <= 0) {
            return Observable.of(true);
        }
        else {
            return Observable.of(false);
        }
    }

    draftsExistInRangeForOffice(beginningDraftNumber: number, endingDraftNumber: number, officeId: number): Observable<boolean> {
        if (officeId === 1 && beginningDraftNumber > 10 && endingDraftNumber < 20) {
            return Observable.of(true);
        }
        else {
            return Observable.of(false);
        }
    }

    getDraftsSearch(searchModel: DraftSearch): Observable<Draft[]> {
        let returnArray: Draft[] = [];
        returnArray.push(new Draft());
        returnArray.push(new Draft());
        returnArray.push(new Draft());

        return Observable.of(returnArray);
    }

    updateDraft(draftId: number) {
        return Observable.of(true);
    }

    deleteDraft(draftId: number) {
        return Observable.of(true);
    }

    getDraftImages(draftId: number): Observable<DraftImage> {
        var draftImage = new DraftImage();
        draftImage.FrontImageBase64 = 'test front';
        draftImage.BackImageBase64 = 'test back';

        return Observable.of(draftImage);
    }

    getDraftTransactions(): Observable<DraftTransaction[]> {
        let returnArray1: DraftTransaction[] = [];

        var draftTransaction1 = new DraftTransaction();
        draftTransaction1.DraftId = 1;
        draftTransaction1.Amount = "1";

        returnArray1.push(draftTransaction1);

        var draftTransaction2 = new DraftTransaction();
        draftTransaction2.DraftId = 2;
        draftTransaction2.Amount = "1";

        returnArray1.push(draftTransaction2);

        return Observable.of(returnArray1);
    }

    getDraftRejectionsData(): Observable<DraftRejection[]> {
        return Observable.of(new Array<DraftRejection>());
    }

    deleteDraftRejections(draftId: number): Observable<boolean> {
        return Observable.of(true);
    }

    rejectDraftTransaction(draftRejection: DraftRejection): Observable<boolean> {
        return Observable.of(true);
    }
}