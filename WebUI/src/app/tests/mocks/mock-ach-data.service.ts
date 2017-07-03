import { AchTransaction } from './../../shared/models/ach/ach-transaction.model';
import { Observable } from "rxjs";

import { Ach } from '../../shared/models/ach/ach.model';
import { SchedulerContainer } from '../../shared/models/scheduler-container.model';
import { AchApprover } from '../../shared/models/ach/ach-approver.model';
import { GenericDropDownModel } from '../../shared/models/generic-dropdown-model';

export class MockAchDataService {

    postAch(achOutSetup: Ach): Observable<boolean> {
        return Observable.of(true);
    }

    getProcessingDates(schedule: SchedulerContainer): Observable<string[]> {
        return Observable.of(['test1', 'test2', 'test3']);
    }

    getApprovers(Id: number): Observable<AchApprover[]> {
        let returnArray: AchApprover[] = [];
        returnArray.push(new AchApprover);
        returnArray.push(new AchApprover);
        returnArray.push(new AchApprover);
        return Observable.of(returnArray);
    }

    getAchTransactions(Id: number): Observable<Ach[]> {
        let returnArray: Ach[] = [];
        returnArray.push(new Ach);
        returnArray.push(new Ach);
        returnArray.push(new Ach);
        return Observable.of(returnArray);
    }

    deleteAchTransaction(achId: number): Observable<boolean> {
        return Observable.of(true);
    }

    getRejectAchData(customerId: number): Observable<AchTransaction[]> {
        let returnArray: AchTransaction[] = [];

        let rejection: AchTransaction = new AchTransaction();
        rejection.AchId = 1;
        rejection.Amount = 2.0;
        rejection.CompanyName = 'ABC Company';
        rejection.ExternalAccountNumber = '1223-12';
        rejection.Form2269 = false;
        rejection.OlderThan24Hours = false;
        rejection.OtherNote = '';
        rejection.RejectionReasonId = 0;
        rejection.TransactionDate = '04/27/2017';
        rejection.TransactionDirection = new GenericDropDownModel();
        rejection.TransactionDirection.Id = 1;

        returnArray.push(rejection);
        return Observable.of(returnArray);
    }
    getAchRejectionsData(): Observable<AchTransaction[]> {
        let returnArray: AchTransaction[] = [];

        let rejection: AchTransaction = new AchTransaction();
        rejection.AchId = 1;
        rejection.Amount = 2.0;
        rejection.CompanyName = 'ABC Company';
        rejection.ExternalAccountNumber = '1223-12';
        rejection.Form2269 = false;
        rejection.OlderThan24Hours = false;
        rejection.OtherNote = '';
        rejection.RejectionReasonId = 0;
        rejection.TransactionDate = '04/27/2017';
        rejection.TransactionDirection = new GenericDropDownModel();
        rejection.TransactionDirection.Id = 1;

        returnArray.push(rejection);
        return Observable.of(returnArray);
    }

    rejectAch(ach: AchTransaction): Observable<any> {
        return Observable.of(true);
    }

    getAchRejectReasonCodes(): Observable<GenericDropDownModel[]> {
        let returnArray: GenericDropDownModel[] = [];
        returnArray.push(new GenericDropDownModel);
        returnArray.push(new GenericDropDownModel);
        returnArray.push(new GenericDropDownModel);
        return Observable.of(returnArray);
    }

    deleteAchRejection(achId: number) {
        if (achId === 0) {
            return Observable.of(false);
        }
        return Observable.of(true);
    }
}