import { Observable } from "rxjs";

import { Office } from '../../shared/models/office.model';
import {GenericDropDownModel} from '../../shared/models/generic-dropdown-model';

export class MockCentralCodesDataService {

    public getOffices(): Observable<Office[]> {
        let offices: Office[] = [];

        let office = new Office();
        office.OfficeId = 1;
        office.OfficeName = 'Omaha';

        offices.push(office);

        office = new Office();
        office.OfficeId = 2;
        office.OfficeName = 'Lincoln';

        offices.push(office);

        office = new Office();
        office.OfficeId = 3;
        office.OfficeName = 'Ottumwa';

        offices.push(office);

        return Observable.of(offices);
    }

    public getHowToApplyList(): Observable<GenericDropDownModel[]> {
        let list: GenericDropDownModel[] = [];

        var howToApply = new GenericDropDownModel();
        howToApply.Id = 1;
        howToApply.Description = 'SomeThing';

        list.push(howToApply);

        return Observable.of(list);
    }

    public getDraftRejectReasonCodes(): Observable<GenericDropDownModel[]> {
        let list: GenericDropDownModel[] = [];

        var rejectReasonCode1 = new GenericDropDownModel();
        rejectReasonCode1.Id = 1;
        rejectReasonCode1.Description = 'SomeThing';        

        list.push(rejectReasonCode1);

        var rejectReasonCode2 = new GenericDropDownModel();
        rejectReasonCode2.Id = 2;
        rejectReasonCode2.Description = 'SomeThing 2';        

        list.push(rejectReasonCode2);

        return Observable.of(list);
    }

    public getAchOlderThan24HoursRejectReasonCodes(): Observable<GenericDropDownModel[]> {
        return Observable.of(new Array<GenericDropDownModel>());
    }

    public getAchInRejectReasonCodes(): Observable<GenericDropDownModel[]> {
        return Observable.of(new Array<GenericDropDownModel>());
    }

    public getAchOutRejectReasonCodes(): Observable<GenericDropDownModel[]> {
        return Observable.of(new Array<GenericDropDownModel>());
    }

    public getCostCenter(input: string) {
        return Observable.of(new Array<GenericDropDownModel>());
    }

    getGlAccount(input: string) {
        return Observable.of(new Array<GenericDropDownModel>());
    }

    getOtherFees() {
        return Observable.of(new Array<GenericDropDownModel>()); 
    }
}