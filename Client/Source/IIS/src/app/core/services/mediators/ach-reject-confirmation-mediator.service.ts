
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/Rx";

@Injectable()
export class AchRejectConfirmationMediatorService {
    public refreshRejects: boolean;

    private refreshRejectsSource = new BehaviorSubject(this.refreshRejects);

    public refreshRejectsChanged$ = this.refreshRejectsSource.asObservable();

    public broadCastRefreshRejectsChanged(refreshRejects: boolean): void {
        this.refreshRejectsSource.next(refreshRejects);
    }
}