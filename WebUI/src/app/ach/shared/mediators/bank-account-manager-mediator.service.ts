
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/Rx";
import { BankTemplate } from '../../../shared/models/ach/bank-template.model';

@Injectable()
export class BankAccountManagerMediatorService {
    public bankTemplate: BankTemplate;

    private viewDetailsChangedSource = new BehaviorSubject(this.bankTemplate);
    private newAchRequiredSource = new BehaviorSubject(this.bankTemplate);
    private deletionRequiredSource = new BehaviorSubject(this.bankTemplate);

    public viewDetailsChanged$ = this.viewDetailsChangedSource.asObservable();
    public newAchRequired$ = this.newAchRequiredSource.asObservable();
    public deletionRequired$ = this.deletionRequiredSource.asObservable();
    
    public broadCastViewDetailsChanged(bankTemplate: BankTemplate): void {
        this.viewDetailsChangedSource.next(bankTemplate);
    }

    public broadCastNewAchRequired(bankTemplate: BankTemplate): void {
        this.newAchRequiredSource.next(bankTemplate);
    }

    public broadDeletionRequired(bankTemplate: BankTemplate): void {
        this.deletionRequiredSource.next(bankTemplate);
    }

}