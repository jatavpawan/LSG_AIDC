/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import any = jasmine.any;

import { MockDataService } from '../../tests/mocks/mock-data.service';
import { CustomersRecentComponent } from './customers-recent.component';
import { CustomerService } from '../../core/services/customer.service';
import { CustomerLocalStorageService } from '../../core/services/local-storage/customer-local-storage.service';
import { AccountsMediatorService } from '../../core/services/mediators/accounts-mediator.service';
import { CustomerSearchDataService } from '../../core/services/customers-search-data.service';

describe('CustomersRecentComponent', () => {
    let component: CustomersRecentComponent;
    let fixture: ComponentFixture<CustomersRecentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [CustomersRecentComponent],
            providers: [
                { provide: CustomerService }
                , { provide: CustomerLocalStorageService }
                , { provide: AccountsMediatorService }
                , { provide: CustomerSearchDataService, useClass: MockDataService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomersRecentComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});