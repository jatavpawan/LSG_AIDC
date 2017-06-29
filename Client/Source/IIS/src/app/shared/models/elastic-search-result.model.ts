import { Customer } from "./customer.model";
import { Deal } from "./deal.model";
import { Facility } from "./facility.model";
import { AccountDetail } from "./account-detail.model";

export class ElasticSearchResult {
    Customers: Customer[];
    Deals: Deal[];
    Facilities: Facility[];
    Accounts: AccountDetail[];
}
