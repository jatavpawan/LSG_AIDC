import { Injectable } from '@angular/core';
import { Customer } from "../../shared/models/customer.model";
import { CustomerMediatorService } from '../../customers/customer-mediator.service';

@Injectable()
export class MockMediatorService extends CustomerMediatorService{

    constructor() {
        super();
    }
}
