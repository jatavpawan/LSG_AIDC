import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";

import { SettingsService } from '../settings.service';
import { GrowlerMediatorService } from "../mediators/growler-mediator.service";
import { CounterDraft } from '../../../shared/models/drafts/counter-draft.model';
import { Draft } from "../../../shared/models/drafts/draft.model";
import { DraftSearch } from "../../../shared/models/drafts/draft-search.model";
import { DraftImage } from '../../../shared/models/drafts/draft-image.model';
import {DraftTransaction} from '../../../shared/models/drafts/draft-transaction.model';
import {DraftRejection} from '../../../shared/models/drafts/draft-rejection.model';

@Injectable()
export class DraftsDataService {
    public serverUrl: string;

    constructor(private http: Http, private settingService: SettingsService, private growler: GrowlerMediatorService) {
        this.serverUrl = settingService.serviceFabricApi + 'drafts/';
    }

    get(customerId: string): Observable<CounterDraft[]> {
        return this.http.get(this.serverUrl + 'counterdrafts/customer/' + customerId, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot retrieve counter drafts.");
                return this.handleError(error);
            });
    }

    deleteCounterDraft(counterDraftId: number): Observable<boolean> {
        return this.http.delete(this.serverUrl + 'counterdrafts/' + counterDraftId, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot delete counter draft.");
                return this.handleError(error);
            });
    }

    insertCounterDraft(counterDraft: CounterDraft): Observable<boolean> {
        return this.http.post(this.serverUrl + 'counterdrafts/', counterDraft, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot insert counter draft.");
                return this.handleError(error);
            });
    }

    draftsExistInRangeForOffice(beginningDraftNumber: number, endingDraftNumber: number, officeId: number): Observable<boolean> {
        return this.http.get(this.serverUrl + `counterdrafts/existsinrange/begin/${beginningDraftNumber}/end/${endingDraftNumber}/office/${officeId}`, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot retrieve counter drafts.");
                return this.handleError(error);
            });
    }

    getDraftsSearch(searchModel: DraftSearch): Observable<Draft[]> {
        return this.http.post(this.serverUrl + 'draftSearch', searchModel, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot retrieve drafts.");
                return this.handleError(error);
            });
    }

    deleteDraft(draftId: number) {
        return this.http.delete(this.serverUrl + 'globalSearch/' + draftId, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot delete drafts.");
                return this.handleError(error);
            });
    }

    updateDraft(draft: Draft): Observable<boolean> {
        return this.http.post(this.serverUrl + 'globalSearch', draft, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot update draft.");
                return this.handleError(error);
            });
    }

    getDraftImages(draftIds: string): Observable<DraftImage[]> {
        return this.http.get(this.serverUrl + 'draftImages/' + draftIds, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot retrieve draft images.");
                return this.handleError(error);
            });
    }

    getDraftTransactions(customerId: number): Observable<DraftTransaction[]> {
        return this.http.get(this.serverUrl + 'drafttransactions/' + customerId, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot retrieve draft transactions.");
                return this.handleError(error);
            });
    }
    rejectDraftTransaction(draftRejection: DraftRejection) {
        return this.http.post(this.serverUrl + 'rejectdraft', draftRejection, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot reject draft transaction.");
                return this.handleError(error);
            });
    }
    getDraftRejectionsData() {
        return this.http.get(this.serverUrl + 'draftrejections/', this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot retrieve draft rejections.");
                return this.handleError(error);
            });
    }

    deleteDraftRejections(draftId: number) {
        return this.http.delete(this.serverUrl + 'draftrejections/' + draftId, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot delete draft rejection.");
                return this.handleError(error);
            });        
    }

    handleError(error: any) {
        return Observable.throw(error);
    }
}