
import { Injectable } from '@angular/core';
import { Customer } from '../../shared/models/customer.model';

@Injectable()
export class CustomerService {

    public selectedCustomer: Customer;
    public noCustomerSelectedText: string = 'No Customer Selected';

    constructor() {

    }

}