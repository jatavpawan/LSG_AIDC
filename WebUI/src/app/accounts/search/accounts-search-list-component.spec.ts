import { MockRouter } from './../../tests/mocks/mock-router';
import { AccountsMediatorService } from './../../core/services/mediators/accounts-mediator.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import any = jasmine.any;
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CustomerService } from '../../core/services/customer.service';
import { Account } from '../../shared/models/account.model';
import { Router } from '@angular/router';
import { AccountsSearchListComponent } from './accounts-search-list-component';
import { MockCustomerService } from '../../tests/mocks/mock-customer.service';
import {Customer} from '../../shared/models/customer.model';
describe('Account Search Component ',
    () => {
        let fixture: ComponentFixture<AccountsSearchListComponent>;
        let component: AccountsSearchListComponent;
        let element: HTMLElement;
        let debugEl: DebugElement;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule],
                declarations: [AccountsSearchListComponent],
                providers: [
                    { provide: CustomerService, useClass: MockCustomerService },
                    AccountsMediatorService,
                    { provide: Router, useClass: MockRouter }

                ],
                schemas: [
                    NO_ERRORS_SCHEMA
                ]
            }).compileComponents();

            fixture = TestBed.createComponent(AccountsSearchListComponent);
            component = fixture.componentInstance;
            debugEl = fixture.debugElement;
            element = fixture.nativeElement;
        }));

        describe('filter account ', () => {
            it('if there is matched account number, should return the correct filtered accounts', () => {

                let list: Account[] = [];

                let account = new Account();
                account.AccountNumber = 123;

                list.push(account);

                component.customerService.selectedCustomer = new Customer();
                component.customerService.selectedCustomer.AccountNumbers = list;

                expect(component.filteredAccounts.length).toEqual(0);
                component.filterAccounts('123');

                expect(component.filteredAccounts.length).toEqual(1);
            });
        });

    });