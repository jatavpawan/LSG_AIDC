import { Customer } from '../../shared/models/customer.model';
import { Observable } from 'rxjs/Observable';

export class MockDataService {
    public search(searchQuery: string): Observable<Customer[]> {
        let cus = new Customer();

        cus.Address = '';
        cus.AccountNumbers = [];

        let ret = new Array();
        ret[0] = cus;

        return Observable.of(ret);
    }

    public getByCustomerId(searchQuery: string): Observable<Customer[]> {
        let cus = new Customer();

        cus.Address = '';
        cus.AccountNumbers = [];

        let ret = new Array();
        ret[0] = cus;

        return Observable.of(ret);
    }
}
