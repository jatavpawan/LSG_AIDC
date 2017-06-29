import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { LocalStorageCustomer } from '../../../shared/models/local-storage-customer.model';
import { Customer } from '../../../shared/models/customer.model';

@Injectable()
export class CustomerLocalStorageService {
    private key = 'CustomerSearchHistory_v3';

    constructor(private localStorageService: LocalStorageService) {

    }

    public storeCustomer(customer: Customer) {
        const customersFromLocalStorage = <any>this.localStorageService.get(this.key) || [];
        const customers = customersFromLocalStorage.length > 0 ? JSON.parse(customersFromLocalStorage) : [];
        const existingCustomerIndex = customers.findIndex( (item: LocalStorageCustomer) => item.Id === customer.Id);

        if (existingCustomerIndex !== -1) {
            customers.splice(existingCustomerIndex, 1);
        }

        customers.unshift(this.mapCustomerToLocalStorageCustomer(customer, customers.length + 1));
        this.localStorageService.set(this.key, JSON.stringify(customers));
    }

    public getCustomers(): LocalStorageCustomer[] {

        let customers: LocalStorageCustomer[] = [];

        if (this.localStorageService.get(this.key)) {
            customers = JSON.parse(<any>this.localStorageService.get(this.key)) || [];
        }

        return customers;
    }

    public updateFavorite(id: number) {
        const customers = this.getCustomers();
        for (let i = 0; i < customers.length; i++) {
            if (customers[i].Id === id) {
                customers[i].IsSelected = !customers[i].IsSelected;
            }
        }
        this.localStorageService.set(this.key, JSON.stringify(customers));
    }

    public mapCustomerToLocalStorageCustomer(customer: Customer, sortOrder: number): LocalStorageCustomer {
        return new LocalStorageCustomer(customer.Id,
            customer.Cif,
            customer.DisplayName,
            customer.DisplayNameReverse,
            customer.DisplayAddress,
            sortOrder,
            customer.Address,
            customer.OfficeName,
            customer.PhoneNumber);
    }

    public mapLocalStorageCustomerToCustomer(localStorageCustomer: LocalStorageCustomer): Customer {
        const customer = new Customer();

        customer.Id = localStorageCustomer.Id;
        customer.Cif = localStorageCustomer.Cif;
        customer.DisplayName = localStorageCustomer.DisplayName;
        customer.DisplayAddress = localStorageCustomer.DisplayAddress;
        customer.DisplayNameReverse = localStorageCustomer.DisplayNameReverse;
        customer.Address = localStorageCustomer.Address;
        customer.OfficeName = localStorageCustomer.OfficeName;
        customer.PhoneNumber = localStorageCustomer.PhoneNumber;

        return customer;
    }
}