import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockDataService } from '../../tests/mocks/mock-data.service';
import { MockMediatorService } from '../../tests/mocks/mock-mediator.service';
import { Http, Response, URLSearchParams } from '@angular/http';

import any = jasmine.any;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SearchInputComponent } from './search-input.component';
import { CustomerMediatorService } from '../../customers/customer-mediator.service';

describe('Search Input Component ', () => {
    let fixture: ComponentFixture<SearchInputComponent>;
    let component: SearchInputComponent;
    let element: HTMLElement;
    let debugEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterModule],
            declarations: [SearchInputComponent],
            providers: [
                { provide: CustomerMediatorService, useClass: MockMediatorService }, 
                { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate")}}
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SearchInputComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;

    }));

    describe('searchQry for the customer mediator service', () => {

        it('should have a length of 2 when supplied with we', () => {
            component.customerMediatorService.searchQry = 'we';
            fixture.detectChanges();
            expect(component.customerMediatorService.searchQry.length).toEqual(2);
        });
    });
});

