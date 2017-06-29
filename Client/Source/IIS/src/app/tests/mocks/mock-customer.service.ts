import { Injectable } from '@angular/core';
import { Customer } from '../../shared/models/customer.model';
import { Account } from '../../shared/models/account.model';

export class MockCustomerService {

    public selectedCustomer: Customer;

    constructor() {
        this.getCustomer();
    }

    public getCustomer(){
        this.selectedCustomer = new Customer();
        this.selectedCustomer.Id = 1;
        this.selectedCustomer.DisplayAccountNumber = 123;
        this.selectedCustomer.Address = 'test';
        this.selectedCustomer.PhoneNumber = 1234567890;


        let account1 = new Account();
        account1.AccountDescription = 'test';
        account1.ExternalAccountNumber = 12345;

        let account2 = new Account();
        account2.AccountDescription = 'test';
        account2.ExternalAccountNumber = 1234;
        
        let account3 = new Account();
        account3.AccountDescription = 'test';
        account3.ExternalAccountNumber = 1234567;

        let account4 = new Account();
        account4.AccountDescription = 'test';
        account4.ExternalAccountNumber = 543;


        this.selectedCustomer.AccountNumbers = new Array<Account>(4);
        this.selectedCustomer.AccountNumbers[0] = account1;
        this.selectedCustomer.AccountNumbers[1] = account2;
        this.selectedCustomer.AccountNumbers[2] = account3;
        this.selectedCustomer.AccountNumbers[3] = account4;
    }
}