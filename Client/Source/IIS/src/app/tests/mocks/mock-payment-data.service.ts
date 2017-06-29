import { Account } from './../../shared/models/account.model';
import { StopPayment } from './../../shared/models/payments/stop-payment.model';
import { Observable } from 'rxjs';
import * as moment from 'moment';

export class MockPaymentDataService {

    getStopPayment(Id: number): Observable<StopPayment[]> {

        let mockStopPayments: StopPayment[] = [];
        let stopPayment: StopPayment = new StopPayment();

        stopPayment.Account = new Account();
        stopPayment.IsRegionalAccount = true;
        stopPayment.ExpirationDate = moment().toDate();
        mockStopPayments.push(stopPayment)
        return Observable.of(mockStopPayments);
    }
}