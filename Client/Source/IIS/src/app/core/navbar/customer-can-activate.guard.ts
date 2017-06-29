import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { DialogService } from "ng2-bootstrap-modal";
import { CustomerSelectionModalComponent } from '../../shared/modals/customer-selection-modal/customer-selection-modal.component';
import { CustomerSearchDataService } from "../services/customers-search-data.service";
import { Customer } from "../../shared/models/customer.model";

@Injectable()
export class CustomerCanActivateGuard implements CanActivate {

    constructor(
        private customerService: CustomerService
        , private router: Router
        , private dialogService: DialogService
        , private customerSearchDataService: CustomerSearchDataService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.customerService.selectedCustomer && this.customerService.selectedCustomer.Id > 0) {
            return Observable.of(true);
        }

        if (route.params["customerId"] != null) {
            return this.setSelectedCustomer(route.params["customerId"]);
        }

        this.forceCustomerSelection();
        return Observable.of(false);
    }

    private setSelectedCustomer(customerId: string) {
        return this.customerSearchDataService.getByCustomerId(customerId).map((customer: Customer) => {
            if (customer == null) {
                this.forceCustomerSelection();
                return false;
            }

            this.customerService.selectedCustomer = customer;
            return true;
        });
    }

    private forceCustomerSelection() {
        this.dialogService.addDialog(CustomerSelectionModalComponent, {
            title: 'No Customer Selected',
            message: 'Please use the search bar to select a customer before proceeding.'
        });
        this.router.navigate(['/']);
    }
}