import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/Rx";
import { Customer } from '../shared/models/customer.model'

@Injectable()
export class CustomerMediatorService {
    public searchQry: string;

    private searchQryChangedSource = new BehaviorSubject(this.searchQry);

    //channel
    public searchQryChanged$ = this.searchQryChangedSource.asObservable();

    public broadCastSearchQryChange(searchQry: string): void {
        this.searchQryChangedSource.next(searchQry);
    }
}