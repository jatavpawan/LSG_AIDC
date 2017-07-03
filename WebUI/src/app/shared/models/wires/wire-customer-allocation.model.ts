import {Customer} from '../customer.model';
import {IncomingWireTransactionDetails} from './IncomingWireTransactionDetails';

export class WireCustomerAllocationModel {
    customer: Customer;
    incomingWireTransactionDetail: IncomingWireTransactionDetails;
}