import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from "ng2-bootstrap-modal";
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { GlobalDraftSearchComponent } from "./global-search.component";
import { Draft } from "../../../shared/models/drafts/draft.model";
import { DraftSearch } from "../../../shared/models/drafts/draft-search.model";
import { DraftsDataService } from "../../../core/services/drafts/drafts-data.service";
import { GrowlerMediatorService } from "../../../core/services/mediators/growler-mediator.service";
import { MockDraftDataService } from "../../../tests/mocks/mock-draft-data.service";
import { MockGrowlerMediatorService } from "../../../tests/mocks/mock-growler-mediator-service";
import { MockDialogService } from "../../../tests/mocks/mock-dialog-service";
import { FormsModule } from '@angular/forms';
import { DateFormatPipe } from "../../../shared/pipes/date-format.pipe";
import { CustomerService } from "../../../core/services/customer.service";
import { MockCustomerService } from "../../../tests/mocks/mock-customer.service";
import { MockActivatedRoute } from "../../../tests/mocks/mock-activated-route";
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../../shared/models/customer.model';

describe('GlobalDraftSearchComponent', () => {

    let comp: GlobalDraftSearchComponent;
    let fixture: ComponentFixture<GlobalDraftSearchComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let spy: any;

    let testDraft = new Draft();
    testDraft.IsSelectedForAction = false;
    let selectedDraft: Draft = new Draft();
    selectedDraft.IsSelectedForAction = true;
    let unselectedDraft: Draft = new Draft();
    unselectedDraft.IsSelectedForAction = false;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule],
            declarations: [GlobalDraftSearchComponent, DateFormatPipe],
            providers: [DialogService],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideComponent(GlobalDraftSearchComponent, {
            set: {
                providers: [
                    { provide: DraftsDataService, useClass: MockDraftDataService }
                    , { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                    , { provide: DialogService, useClass: MockDialogService }
                    , { provide: CustomerService, useClass: MockCustomerService }
                    , { provide: ActivatedRoute, useClass: MockActivatedRoute }
                ]
            }
        })
            .overrideModule(BrowserDynamicTestingModule,
            {
                set: {
                    entryComponents: [GlobalDraftSearchComponent]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GlobalDraftSearchComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        spy = spyOn(comp.dialogService, 'addDialog')
            .and.returnValue(Observable.of(true));
        comp.selectedDrafts = [];

        selectedDraft.IsSelectedForAction = true;
        unselectedDraft.IsSelectedForAction = false;
        testDraft.IsSelectedForAction = false;


    });

    describe('ngOnInit method', () => {
        it('should configure view with undefined customer', () => {
            comp.customerService.selectedCustomer = undefined;
            comp.ngOnInit();

            expect(comp.viewOrEdit).toEqual("Edit");
            expect(comp.sortField).toEqual("Date");
            expect(comp.sortOrder).toEqual(-1);
        });

        it('should configure view with null customer', () => {
            comp.customerService.selectedCustomer = null;
            comp.ngOnInit();

            expect(comp.viewOrEdit).toEqual("Edit");
            expect(comp.sortField).toEqual("Date");
            expect(comp.sortOrder).toEqual(-1);
        });

        it('should configure view with valid customer', () => {
            comp.customerService.selectedCustomer = new Customer();
            comp.ngOnInit();

            expect(comp.viewOrEdit).toEqual("View");
            expect(comp.sortField).toEqual(null);
            expect(comp.sortOrder).toEqual(null);
        });
    });

    describe('initializeObjects method', () => {
        it('should instantiate search object', () => {
            comp.initializeObjects();

            expect(comp.searchObject).toBeDefined();
        });
    });

    describe('getDrafts method', () => {
        it('should call service and return array of drafts Without a customer', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.Cif = 1;
            comp.searchObject.DraftNumberList = [];

            comp.customerService.selectedCustomer = undefined;

            let event = {};

            comp.getDrafts(event);

            expect(comp.drafts.length).toEqual(3);
        });
    });

    describe('getDrafts method', () => {
        it('should call service and return array of drafts with a customer', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.Cif = 1;
            comp.searchObject.DraftNumberList = [];

            let event = {};

            comp.getDrafts(event);

            expect(comp.drafts.length).toEqual(3);
        });
    });

    describe('openEditor method', () => {
        it('should call dialog service', () => {
            comp.openEditor(testDraft);

            expect(comp.dialogService.addDialog).toHaveBeenCalledTimes(1);
        });
    });

    describe('emailDrafts method', () => {
        it('should call dialog service', () => {
            comp.emailDraft(testDraft);

            expect(comp.dialogService.addDialog).toHaveBeenCalledTimes(1);
        });
    });

    describe('printDrafts method', () => {
        it('should call dialog service', () => {
            comp.printDraft(testDraft);

            expect(comp.dialogService.addDialog).toHaveBeenCalledTimes(1);
        });
    });

    describe('selectedToggle method', () => {
        it('should set isSelectedForAction to true, selectedDrafts should have one element', () => {
            comp.selectedToggle(testDraft);

            expect(testDraft.IsSelectedForAction).toBeTruthy();
            expect(comp.selectedDrafts.length).toEqual(1);
        });

        it('should set isSelectedForAction to false, selectedDrafts should be empty array', () => {
            testDraft.IsSelectedForAction = true;
            comp.selectedDrafts.push(testDraft);

            comp.selectedToggle(testDraft);

            expect(testDraft.IsSelectedForAction).toBeFalsy();
            expect(comp.selectedDrafts.length).toEqual(0);
        });
    });

    describe('formatSearchObject method', () => {
        it('should turn a string into an array of numbers', () => {

            comp.searchObject = new DraftSearch();
            comp.searchObject.DraftNumberList = [];

            comp.searchObject.DraftNumberList.push(12345678, 12345678, 12345678, 12345678, 12345678);

            comp.formatSearchObject();

            expect(comp.searchObject.DraftNumberList.length).toEqual(5);
        });

        it('when FromDraft is populated and ToDraft is empty, populate ToDraft with FromDraft', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.FromDraftNumber = 1234;

            comp.formatSearchObject();

            expect(comp.searchObject.ToDraftNumber).toEqual(1234);
        });

        it('when FromDate is populated and ToDate is empty, populate ToDate with FromDate', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.FromDate = '01/01/2017';

            comp.formatSearchObject();

            expect(comp.searchObject.ToDate).toEqual('01/01/2017');
        });

        it('when FromAmount is populated and ToAmount is empty, populate ToAmount with FromAmount', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.FromAmount = 100.00;

            comp.formatSearchObject();

            expect(comp.searchObject.ToAmount).toEqual(100.00);
        });

        it('when ToDraft is populated and FromDraft is empty, populate FromDraft with ToDraft', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.ToDraftNumber = 1234;

            comp.formatSearchObject();

            expect(comp.searchObject.FromDraftNumber).toEqual(1234);
        });

        it('when ToDate is populated and FromDate is empty, populate FromDate with ToDate', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.ToDate = '01/01/2017';

            comp.formatSearchObject();

            expect(comp.searchObject.FromDate).toEqual('01/01/2017');
        });

        it('when ToAmount is populated and TromAmount is empty, populate FromAmount with ToAmount', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.ToAmount = 100.00;

            comp.formatSearchObject();

            expect(comp.searchObject.FromAmount).toEqual(100.00);
        });

    });

    describe('hasSearchInputErrors method', () => {
        it('when all fields are empty, returns true', () => {
            comp.searchObject = new DraftSearch();

            let errors: boolean = comp.hasSearchInputErrors();

            expect(errors).toBeTruthy();
            expect(comp.errorMessage).toEqual('Please provide a search input.');
        });

        it('when invalid input value, returns true', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.Cif = -1;

            let errors: boolean = comp.hasSearchInputErrors();

            expect(errors).toBeTruthy();
        });
    });

    describe('areValuesValid method', () => {
        it('when cif is negative, returns false', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.Cif = -1;

            let isValid: boolean = comp.areValuesValid();

            expect(isValid).toBeFalsy();
            expect(comp.errorMessage).toEqual('Please provide a valid CIF.');
        });

        it('when note number is negative, returns false', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.AccountNumber = -1;

            let isValid: boolean = comp.areValuesValid();

            expect(isValid).toBeFalsy();
            expect(comp.errorMessage).toEqual('Please provide a valid Note Number.');
        });

        it('when from date is greater than to date, returns false', () => {
            comp.searchObject = new DraftSearch();
            let arbitraryFromDate = '01/01/2017';
            let arbitraryToDate = '01/01/2016'
            comp.searchObject.FromDate = arbitraryFromDate;
            comp.searchObject.ToDate = arbitraryToDate;

            let isValid: boolean = comp.areValuesValid();

            expect(isValid).toBeFalsy();
            expect(comp.errorMessage).toEqual('From Date must be earlier than the To Date.');
        });

        it('when from amount is greater than to amount, returns false', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.FromAmount = 100.00;
            comp.searchObject.ToAmount = 50.00;

            let isValid: boolean = comp.areValuesValid();

            expect(isValid).toBeFalsy();
            expect(comp.errorMessage).toEqual('From Amount must be less than the To Amount.');
        });

        it('when from draft number is greater than to draft number, returns false', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.FromDraftNumber = 100;
            comp.searchObject.ToDraftNumber = 50;

            let isValid: boolean = comp.areValuesValid();

            expect(isValid).toBeFalsy();
            expect(comp.errorMessage).toEqual('From Draft Number must be less than the To Draft Number.');
        });

        it('when either draft number is negative, returns false', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.FromDraftNumber = -100;
            comp.searchObject.ToDraftNumber = -100;

            let isValid: boolean = comp.areValuesValid();

            expect(isValid).toBeFalsy();
            expect(comp.errorMessage).toEqual('Please provide a valid Draft Number greater than 0.');
        });

        it('when either amount fiel is negative, returns false', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.FromAmount = -100;
            comp.searchObject.ToAmount = -10;

            let isValid: boolean = comp.areValuesValid();

            expect(isValid).toBeFalsy();
            expect(comp.errorMessage).toEqual('Please provide a valid Amount greater than 0.');
        });

        it('when populated fields are valid, returns true', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.FromDraftNumber = 100;
            comp.searchObject.ToDraftNumber = 500;

            let isValid: boolean = comp.areValuesValid();

            expect(isValid).toBeTruthy();
        });
    });

    describe('clear method', () => {
        it('when called, search object and errorMessage are cleared', () => {
            comp.searchObject = new DraftSearch();
            comp.searchObject.Cif = 12345;
            comp.searchObject.AccountNumber = 67890;

            comp.clear();

            expect(comp.searchObject.Cif).toBeUndefined();
            expect(comp.searchObject.AccountNumber).toBeUndefined()
            expect(comp.errorMessage).toEqual('');
        });
    });

    describe('emailMultiple method', () => {
        it('when called, dialog service should be called', () => {
            comp.emailMultiple();

            expect(comp.dialogService.addDialog).toHaveBeenCalledTimes(1);
        });
    });

    describe('printMultiple method', () => {
        it('when called, dialog service should be called', () => {
            comp.printMultiple();

            expect(comp.dialogService.addDialog).toHaveBeenCalledTimes(1);
        });
    });

    describe('selectAll method', () => {
        it('when none are selected, select all on current page', () => {
            comp.currentPage = 1;
            comp.drafts = [];

            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(testDraft);

            comp.selectAll();

            expect(comp.allSelected).toBeTruthy();
            expect(comp.drafts[0].IsSelectedForAction).toBeTruthy();
            expect(comp.drafts[7].IsSelectedForAction).toBeTruthy();
            expect(comp.drafts[8].IsSelectedForAction).toBeFalsy();
        });

        it('when some are selected, select all on current page', () => {
            comp.currentPage = 1;
            comp.drafts = [];

            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(testDraft);

            comp.selectAll();

            expect(comp.allSelected).toBeTruthy();
            expect(comp.drafts[0].IsSelectedForAction).toBeTruthy();
            expect(comp.drafts[7].IsSelectedForAction).toBeTruthy();
            expect(comp.drafts[8].IsSelectedForAction).toBeFalsy();
        });

        it('when all are selected, unselect all on current page', () => {
            comp.currentPage = 1;
            comp.drafts = [];
            testDraft.IsSelectedForAction = true;

            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(testDraft);

            comp.selectAll();

            expect(comp.allSelected).toBeFalsy();
            expect(comp.drafts[0].IsSelectedForAction).toBeFalsy();
            expect(comp.drafts[7].IsSelectedForAction).toBeFalsy();
            expect(comp.drafts[8].IsSelectedForAction).toBeTruthy();
        });

    });

    describe('paginate method', () => {
        it('when called to page where all are selected, set allSelected flag to true', () => {
            comp.drafts = [];
            let event: any = new Object({
                first: 0,
                rows: 8
            });

            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(selectedDraft);

            comp.paginate(event);

            expect(comp.allSelected).toBeTruthy();
        });

        it('when called to page where some are selected, set allSelected flag to false', () => {
            comp.drafts = [];
            let event: any = new Object({
                first: 0,
                rows: 8
            });

            comp.drafts.push(selectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(selectedDraft);
            comp.drafts.push(unselectedDraft);

            comp.paginate(event);

            expect(comp.allSelected).toBeFalsy();
        });

        it('when called to page where none are selected, set allSelected flag to false', () => {
            comp.drafts = [];
            let event: any = new Object({
                first: 0,
                rows: 8
            });

            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);
            comp.drafts.push(unselectedDraft);

            comp.paginate(event);

            expect(comp.allSelected).toBeFalsy();
        });
    });

    describe('draftListAdd method', () => {
        it('when input includes non-numeric data, DraftNumberList should not contain any numbers', () => {
            let event = { value: 'abc' };

            comp.searchObject = new DraftSearch();
            comp.searchObject.DraftNumberList = [];
            comp.draftListAdd(event);

            expect(comp.searchObject.DraftNumberList.length).toEqual(0);
        });
    });

    describe('draftListAdd method', () => {
        it('when input includes numeric data, DraftNumberList should contain numbers', () => {
            let event = { value: 1234 };

            comp.searchObject = new DraftSearch();
            comp.searchObject.DraftNumberList = [];
            comp.searchObject.DraftNumberList.push(1234);

            comp.draftListAdd(event);

            expect(comp.searchObject.DraftNumberList.length).toEqual(1);
        });
    });

    describe('draftListAdd method', () => {
        it('when input includes more than 8 items, DraftNumberList should contain just 8', () => {

            comp.searchObject = new DraftSearch();
            comp.searchObject.DraftNumberList = [];

            comp.searchObject.DraftNumberList.push(123);
            comp.searchObject.DraftNumberList.push(124);
            comp.searchObject.DraftNumberList.push(125);
            comp.searchObject.DraftNumberList.push(126);
            comp.searchObject.DraftNumberList.push(127);
            comp.searchObject.DraftNumberList.push(128);
            comp.searchObject.DraftNumberList.push(129);
            comp.searchObject.DraftNumberList.push(121);

            let event = { value: '1234' };

            comp.draftListAdd(event);

            expect(comp.searchObject.DraftNumberList.length).toEqual(8);
        });
    });

   describe('isFieldSortable method', () => {
        it('when called, will return bool', () => {
            comp.customerService.selectedCustomer = undefined;
            var result = comp.isFieldSortable();

            expect(result).toBeTruthy();
        });

        it('when called, will return bool', () => {
            comp.customerService.selectedCustomer = new Customer();
            var result = comp.isFieldSortable();

            expect(result).toBeFalsy();
        });
    });
});


