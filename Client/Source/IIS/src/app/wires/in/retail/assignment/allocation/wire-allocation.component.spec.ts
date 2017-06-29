import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SettingsService } from '../../../../../core/services/settings.service';
import { GrowlerMediatorService } from '../../../../../core/services/mediators/growler-mediator.service';
import { MockGrowlerMediatorService } from '../../../../../tests/mocks/mock-growler-mediator-service';
import { CentralCodesDataService } from '../../../../../core/services/central-codes-data.service';
import { MockCentralCodesDataService } from '../../../../../tests/mocks/mock-central-codes-data.service';
import { GenericDropDownModel } from '../../../../../shared/models/generic-dropdown-model';
import { Customer } from '../../../../../shared/models/customer.model';
import { Account } from '../../../../../shared/models/account.model';
import { WireAllocationComponent } from './wire-allocation.component';
import { MockDialogServiceSchedulerContainer } from '../../../../../tests/mocks/mock-dialog-service';
import { WiresDataService } from '../../../../../core/services/wires/wires-data.service';
import { MockWiresDataService } from '../../../../../tests/mocks/mock-wires-data.service';
import { MockRouter } from '../../../../../tests/mocks/mock-router';
import { WireAllocationInputDetailsComponent } from './wire-allocation-input-details.component';
import {WireInDetailsModel} from '../../../../../shared/models/wires/wire-in-details.model';
import {WireCustomerAllocationModel} from '../../../../../shared/models/wires/wire-customer-allocation.model';
import {IncomingWireTransactionDetails} from '../../../../../shared/models/wires/IncomingWireTransactionDetails';
describe('WireAllocationComponent', () => {

    let comp: WireAllocationComponent;
    let childComp: WireAllocationInputDetailsComponent;
    let fixture: ComponentFixture<WireAllocationComponent>;
    let childFixture: ComponentFixture<WireAllocationInputDetailsComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let fakeDropDownResults: GenericDropDownModel[];
    let fakeDropDownResult: GenericDropDownModel;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule],
            declarations: [WireAllocationComponent, WireAllocationInputDetailsComponent],
            providers: [],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideComponent(WireAllocationComponent,
            {
                set: {
                    providers: [
                        { provide: DialogService, useClass: MockDialogServiceSchedulerContainer },
                        { provide: CentralCodesDataService, useClass: MockCentralCodesDataService },
                        { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService },
                        { provide: WiresDataService, useClass: MockWiresDataService },
                        { provide: Router, useClass: MockRouter }
                    ]
                }
            }).overrideComponent(WireAllocationInputDetailsComponent,
                {
                    set: {
                        providers: [
                            { provide: CentralCodesDataService, useClass: MockCentralCodesDataService },
                            { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                        ]
                    }
                })
            .compileComponents();            
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WireAllocationComponent);
        childFixture = TestBed.createComponent(WireAllocationInputDetailsComponent);
        comp = fixture.componentInstance;
        childComp = childFixture.componentInstance;

        debugEl = fixture.debugElement;
        element = fixture.nativeElement;

        fakeDropDownResults = [];
        fakeDropDownResult = new GenericDropDownModel();
        fakeDropDownResult.Id = 1;

        fakeDropDownResults.push(fakeDropDownResult);

    });

    describe('ngOnInit method ',
        () => {
            it('should call initializeComponent', () => {
                spyOn(comp, 'initializeComponent');

                comp.ngOnInit();

                expect(comp.initializeComponent).toHaveBeenCalledTimes(1);
            });
        });

    describe('initializeComponent method ',
        () => {
            it('should call initializeComponent', () => {
                spyOn(comp, 'getWireDetail');
                spyOn(comp, 'initializeModels');

                comp.initializeComponent();

                expect(comp.getWireDetail).toHaveBeenCalledTimes(1);
                expect(comp.initializeModels).toHaveBeenCalledTimes(1);
            });
        });

    describe('initializeModels method ',
        () => {
            it('should initilize modesl used on page', () => {

                comp.initializeModels();

                expect(comp.wireCustomerAllocations).toBeDefined();
                expect(comp.wireCustomerAllocation.incomingWireTransactionDetail).toBeDefined();
                expect(comp.wireCustomerAllocation.customer).toBeDefined();
                expect(comp.wireCustomerAllocation.incomingWireTransactionDetail.Account).toBeDefined();
                expect(comp.filteredAccounts).toBeDefined();
                expect(comp.selectedCustomer).toBeDefined();
                expect(comp.selectedCustomer.AccountNumbers).toBeDefined();
                expect(comp.wireAllocationInputDetailsComponent.searchSelection).toBeUndefined();
            });
        });

    describe('getWireDetail method ',
        () => {
            it('should call wireDataService getWireDetailsById', () => {
                let fakeWireInDetail = new WireInDetailsModel();

                fakeWireInDetail.Amount = 1;

                spyOn(comp.wireDataService, 'getWireDetailsById').and.returnValue(Observable.of(fakeWireInDetail));                

                comp.getWireDetail();

                expect(comp.wireDataService.getWireDetailsById).toHaveBeenCalledTimes(1);
            });
        });

    describe('searchModeChanged method ',
        () => {
            it('should initializeModels', () => {
                spyOn(comp, 'initializeModels');

                comp.searchModeChanged('someevent');

                expect(comp.initializeModels).toHaveBeenCalledTimes(1);
            });
        });

    describe('openEditAssignment method ',
        () => {
            it('when searchMode is customer should configure assignment for customer', () => {
                spyOn(comp, 'setSearchMode');
                spyOn(comp, 'configureAssignmentForCustomer');
                spyOn(comp, 'configureAssignmentForGLAccount');

                let fakeWireCustomerAllocation = new WireCustomerAllocationModel();

                comp.searchMode = 'customer';

                comp.openEditAssignment(fakeWireCustomerAllocation);

                expect(comp.wireCustomerAllocationRowEdit).toBeDefined();
                expect(comp.setSearchMode).toHaveBeenCalledTimes(1);
                expect(comp.wireAllocationInputDetailsComponent.isEdit).toBeTruthy();
                expect(comp.configureAssignmentForCustomer).toHaveBeenCalledTimes(1);
                expect(comp.configureAssignmentForGLAccount).toHaveBeenCalledTimes(0);
            });
        });
    describe('openEditAssignment method ',
        () => {
            it('when searchMode is not customer should configure assignment by gl account', () => {
                spyOn(comp, 'setSearchMode');
                spyOn(comp, 'configureAssignmentForCustomer');
                spyOn(comp, 'configureAssignmentForGLAccount');

                let fakeWireCustomerAllocation = new WireCustomerAllocationModel();

                comp.searchMode = 'something else';

                comp.openEditAssignment(fakeWireCustomerAllocation);

                expect(comp.wireCustomerAllocationRowEdit).toBeDefined();
                expect(comp.setSearchMode).toHaveBeenCalledTimes(1);
                expect(comp.wireAllocationInputDetailsComponent.isEdit).toBeTruthy();
                expect(comp.configureAssignmentForCustomer).toHaveBeenCalledTimes(0);
                expect(comp.configureAssignmentForGLAccount).toHaveBeenCalledTimes(1);
            });
        });
    describe('configureAssignmentForCustomer method ',
        () => {
            it('set selected customer and perform reverse lookups for dropdowns', () => {
                spyOn(comp, 'performReverseLookups');

                let fakeWireCustomerAllocation = new WireCustomerAllocationModel();
                fakeWireCustomerAllocation.customer = new Customer();

                comp.configureAssignmentForCustomer(fakeWireCustomerAllocation);

                expect(comp.selectedCustomer).toBeDefined();
                expect(comp.performReverseLookups).toHaveBeenCalledTimes(1);
            });
        });

    describe('performReverseLookups method ',
        () => {
            it('perform reverse lookups for dropdowns', () => {
                spyOn(comp, 'reverseLookupAccount');
                spyOn(comp, 'reverseLookupTransactionType');
                spyOn(comp, 'reverseLookupFeeType');

                comp.performReverseLookups();

                expect(comp.reverseLookupAccount).toHaveBeenCalledTimes(1);
                expect(comp.reverseLookupTransactionType).toHaveBeenCalledTimes(1);
                expect(comp.reverseLookupFeeType).toHaveBeenCalledTimes(1);
            });
        });

    describe('configureAssignmentForGLAccount method ',
        () => {
            it('should call child component setEditSearchSelection', () => {
                spyOn(comp.wireAllocationInputDetailsComponent, 'setEditSearchSelection');

                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId = new GenericDropDownModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId.Id = 1;

                comp.configureAssignmentForGLAccount();

                expect(comp.wireAllocationInputDetailsComponent.setEditSearchSelection).toHaveBeenCalledTimes(1);

            });
        });
    describe('setSearchMode method ',
        () => {
            it('should set search mode to customer', () => {
                let fakeCustomer = new Customer();
                fakeCustomer.Id = 1;
                comp.setSearchMode(fakeCustomer);

                expect(comp.searchMode).toEqual('customer');
            });
        });
    describe('setSearchMode method ',
        () => {
            it('should set search mode to glaccount', () => {
                let fakeCustomer = new Customer();
                fakeCustomer.Id = 0;
                comp.setSearchMode(fakeCustomer);

                expect(comp.searchMode).toEqual('glaccount');
            });
        });
    describe('unAssign method ',
        () => {
            it('unassign selected row item', () => {
                let fakeWireCustomerAllocation = new WireCustomerAllocationModel();
                fakeWireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                fakeWireCustomerAllocation.incomingWireTransactionDetail.Amount = 1;

                spyOn(comp, 'getRowToRemoveIndex').and.returnValue(1);
                spyOn(comp, 'removeRowItem');                
                spyOn(comp, 'addToRemainingAmount');                


                comp.unAssign(fakeWireCustomerAllocation);

                expect(comp.getRowToRemoveIndex).toHaveBeenCalledTimes(1);
                expect(comp.removeRowItem).toHaveBeenCalledTimes(1);
                expect(comp.addToRemainingAmount).toHaveBeenCalledTimes(1);
            });
        });
    describe('unAssign method ',
        () => {
            it('do not unassign selected row item if row is not found in collection', () => {
                let fakeWireCustomerAllocation = new WireCustomerAllocationModel();
                fakeWireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                fakeWireCustomerAllocation.incomingWireTransactionDetail.Amount = 1;

                spyOn(comp, 'getRowToRemoveIndex').and.returnValue(-1);
                spyOn(comp, 'removeRowItem');
                spyOn(comp, 'addToRemainingAmount');


                comp.unAssign(fakeWireCustomerAllocation);

                expect(comp.getRowToRemoveIndex).toHaveBeenCalledTimes(1);
                expect(comp.removeRowItem).toHaveBeenCalledTimes(0);
                expect(comp.addToRemainingAmount).toHaveBeenCalledTimes(0);
            });
        });

    describe('editAssignment method ',
        () => {
            it('should call copyWireCustomerAllocation and new up objects', () => {
                spyOn(comp, 'copyWireCustomerAllocation');
                spyOn(comp, 'initializeWireCustomerAllocation');

                let fakeWireCustomerAllocation = new WireCustomerAllocationModel();

                comp.editAssignment(fakeWireCustomerAllocation);

                expect(comp.copyWireCustomerAllocation).toHaveBeenCalledTimes(1);
                expect(comp.initializeWireCustomerAllocation).toHaveBeenCalledTimes(1);
                expect(comp.wireAllocationInputDetailsComponent.isEdit).toBeFalsy();

            });
        });

    describe('save method ',
        () => {
            it('when validateTotalWireAmountRemaining false it should exit', () => {
                spyOn(comp, 'validateTotalWireAmountRemaining').and.returnValue(false);
                spyOn(comp, 'mapToServerModel');
                
                comp.save();
                expect(comp.mapToServerModel).toHaveBeenCalledTimes(0);
            });
        });

    describe('save method ',
        () => {
            it('when validateTotalWireAmountRemaining true it should continue saving', () => {
                spyOn(comp, 'validateTotalWireAmountRemaining').and.returnValue(true);
                spyOn(comp, 'mapToServerModel');
                spyOn(comp.wireDataService, 'allocateWire').and.returnValue(Observable.of(true));
                spyOn(comp.router, 'navigate').and.returnValue(Observable.of(true));

                comp.save();
                expect(comp.mapToServerModel).toHaveBeenCalledTimes(1);
                expect(comp.wireDataService.allocateWire).toHaveBeenCalledTimes(1);
                expect(comp.router.navigate).toHaveBeenCalledTimes(1);
            });
        });

    describe('validateTotalWireAmountRemaining method ',
        () => {
            it('when totalWireAmountRemaining is not zero then should return false', () => {
                comp.totalWireAmountRemaining = 1;

                let ret = comp.validateTotalWireAmountRemaining();
                expect(ret).toBeFalsy();
            });
        });

    describe('validateTotalWireAmountRemaining method ',
        () => {
            it('when totalWireAmountRemaining is zero then should return false', () => {
                comp.totalWireAmountRemaining = 0;

                let ret = comp.validateTotalWireAmountRemaining();
                expect(ret).toBeTruthy();
            });
        });
});
