import { Observable } from 'rxjs/Observable';
import { Customer } from "../../shared/models/customer.model";

export class MockCustomerSearchDataService {
    search(searchQuery: string) {
        const customers: Customer[] = [
            new Customer(), new Customer(), new Customer()
        ];

        return Observable.of(customers);
    }
}