import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Observable } from "rxjs";

import { ConfirmModalComponent } from '../../../../../shared/modals/confirm-modal/confirm-modal.component';
import { WireCustomerAllocationModel } from '../../../../../shared/models/wires/wire-customer-allocation.model';
import { WiresDataService } from '../../../../../core/services/wires/wires-data.service';
import { Customer } from '../../../../../shared/models/customer.model';
import { GenericDropDownModel } from '../../../../../shared/models/generic-dropdown-model';
import { CentralCodesDataService } from '../../../../../core/services/central-codes-data.service';
import { GrowlerMediatorService } from '../../../../../core/services/mediators/growler-mediator.service';
import { IncomingWireTransactionDetails } from '../../../../../shared/models/wires/IncomingWireTransactionDetails';
import { Account } from '../../../../../shared/models/account.model';
import { WireAllocationInputDetailsComponent } from './wire-allocation-input-details.component';
import { WireAllocationCustomerSearchComponent } from './wire-allocation-customer-search.component';
import { WireInDetailsModel } from '../../../../../shared/models/wires/wire-in-details.model';

@Component({
    selector: 'wire-allocation',
    templateUrl: 'wire-allocation.component.html',
    styleUrls: ['wire-allocation.component.scss']
})


export class WireAllocationComponent implements OnInit {

    @ViewChild(WireAllocationInputDetailsComponent) wireAllocationInputDetailsComponent: WireAllocationInputDetailsComponent;
    @Input() incomingWireId: number;

    wireIn: WireInDetailsModel;

    wireCustomerAllocations: WireCustomerAllocationModel[];
    wireCustomerAllocationRowEdit: WireCustomerAllocationModel;
    wireCustomerAllocation: WireCustomerAllocationModel;

    totalWireAmountRemaining: number;
    searchMode: string = 'customer';

    isDisabled: boolean = true;
    selectedCustomer: Customer;
    selectedAccount: Account;
    filteredAccounts: Account[] = [];

    constructor(public dialogService: DialogService, public wireDataService: WiresDataService,
        public centralCodesDataService: CentralCodesDataService, public growler: GrowlerMediatorService,
        public router: Router, public route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.initializeComponent();
    }

    initializeComponent() {
        this.getWireDetail();
        this.initializeModels();
    }

    initializeWireCustomerAllocation() {
        this.wireCustomerAllocation = new WireCustomerAllocationModel();
        this.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
        this.wireCustomerAllocation.customer = new Customer();
        this.selectedCustomer = new Customer();
    }

    initializeModels() {
        if (!this.wireCustomerAllocations) {
            this.wireCustomerAllocations = [];
        }
        this.initializeWireCustomerAllocation();
        this.wireCustomerAllocation.incomingWireTransactionDetail.Account = new Account();        
        this.filteredAccounts = [];
        this.selectedCustomer.AccountNumbers = [];
        this.wireAllocationInputDetailsComponent.searchSelection = undefined;
    }

    getWireDetail() {
        this.wireDataService.getWireDetailsById(this.incomingWireId)
            .subscribe((ret: WireInDetailsModel) => {
                this.wireIn = ret;
                this.totalWireAmountRemaining = this.wireIn.Amount;
            },
            (err: any) => {
                this.growler.growlError("Error", "Error getting wire in");
            });
    }

    searchModeChanged(event: any) {
        this.initializeModels();
    }

    callConfirmationDialog() {
        //We may not need a confirmation dialog.. but just in case.
        //this.dialogService.addDialog(ConfirmModalComponent,
        //    {
        //        title: 'Confirm Reject',
        //        message: `This will add the configured wire allocations`,
        //        confirmText: 'Ok',
        //        cancelText: 'Cancel'
        //    }).subscribe((isConfirmed) => {
        //        if (isConfirmed) {
        //            this.confirm();
        //        }
        //    });
    }

    openEditAssignment(rowItem: WireCustomerAllocationModel) {
        this.wireCustomerAllocationRowEdit = rowItem;

        this.setSearchMode(rowItem.customer);
        this.wireAllocationInputDetailsComponent.isEdit = true;

        this.wireCustomerAllocation = this.wireCustomerAllocationRowEdit;

        if (this.searchMode === 'customer') {
            this.configureAssignmentForCustomer(rowItem);
        } else {
            this.configureAssignmentForGLAccount();
        }
    }

    configureAssignmentForCustomer(wireAllocation: WireCustomerAllocationModel) {
        this.selectedCustomer = wireAllocation.customer;
        this.performReverseLookups();
    }

    performReverseLookups() {
        this.reverseLookupAccount();
        this.reverseLookupTransactionType();
        this.reverseLookupFeeType();
    }

    reverseLookupAccount() {
        this.wireCustomerAllocation.incomingWireTransactionDetail.Account =
            this.wireCustomerAllocationRowEdit.customer.AccountNumbers.find(x => x.AccountId ===
                this.wireCustomerAllocation.incomingWireTransactionDetail.Account.AccountId);
    }

    reverseLookupTransactionType() {
        this.wireCustomerAllocation.incomingWireTransactionDetail.TransactionType =
            this.wireAllocationInputDetailsComponent.howtoApplyList.find(x => x.Id ===
                this.wireCustomerAllocation.incomingWireTransactionDetail.TransactionType.Id);
    }

    reverseLookupFeeType() {
        this.wireCustomerAllocation.incomingWireTransactionDetail.FeeCode =
            this.wireAllocationInputDetailsComponent.feeCodes.find(x => x.Id ===
                this.wireCustomerAllocation.incomingWireTransactionDetail.FeeCode.Id);
    }

    configureAssignmentForGLAccount() {
        this.wireAllocationInputDetailsComponent.setEditSearchSelection(this.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId.Id);
    }

    setSearchMode(customer: Customer) {
        if (customer && customer.Id > 0) {
            this.searchMode = 'customer';
        } else {
            this.searchMode = 'glaccount';
        }
    }

    unAssign(rowItem: WireCustomerAllocationModel) {
        //let itemToRemove = this.findWireCustomerAllocation(rowItem);
        let index = this.getRowToRemoveIndex(rowItem);

        if (index > -1) {
            this.removeRowItem(index);
            this.addToRemainingAmount(rowItem.incomingWireTransactionDetail.Amount);
        }        
    }
    updateRemainingAmount(amount: number) {
        this.totalWireAmountRemaining = amount;
    }

    addToRemainingAmount(amount: number) {
        this.totalWireAmountRemaining += amount;
    }

    //subtractFromRemainingAmount(amount: number) {
    //    this.totalWireAmountRemaining -= amount;
    //}

    removeRowItem(index: number) {
        let tempRemovalArray = [...this.wireCustomerAllocations];
        tempRemovalArray.splice(index, 1);
        this.wireCustomerAllocations = [...tempRemovalArray];
    }

    getRowToRemoveIndex(wireAllocation: WireCustomerAllocationModel) {
        return this.wireCustomerAllocations.indexOf(wireAllocation);
    }

    addAssignment(wireCustomerAllocationModel: WireCustomerAllocationModel) {
        this.wireCustomerAllocations = [...this.wireCustomerAllocations, wireCustomerAllocationModel];
    }

    editAssignment(wireCustomerAllocationModel: WireCustomerAllocationModel) {
        this.copyWireCustomerAllocation(wireCustomerAllocationModel);
        this.initializeWireCustomerAllocation();
        this.wireAllocationInputDetailsComponent.isEdit = false;
    }

    copyWireCustomerAllocation(wireCustomerAllocationModel: WireCustomerAllocationModel) {
        this.wireCustomerAllocationRowEdit = Object.assign({}, wireCustomerAllocationModel);
        this.wireCustomerAllocationRowEdit.customer = Object.assign({}, wireCustomerAllocationModel.customer);
        this.wireCustomerAllocationRowEdit.incomingWireTransactionDetail = Object.assign({}, this.wireCustomerAllocation.incomingWireTransactionDetail);
        this.wireCustomerAllocationRowEdit.incomingWireTransactionDetail.Account = Object.assign({}, this.wireCustomerAllocation.incomingWireTransactionDetail.Account);
        this.wireCustomerAllocationRowEdit.incomingWireTransactionDetail.FeeCode = Object.assign({}, this.wireCustomerAllocation.incomingWireTransactionDetail.FeeCode);
        this.wireCustomerAllocationRowEdit.incomingWireTransactionDetail.TransactionType = Object.assign({}, this.wireCustomerAllocation.incomingWireTransactionDetail.TransactionType);
    }

    save() {

        if (!this.validateTotalWireAmountRemaining()) {
            return;
        }

        let incomingWiresTransactionDetails = this.mapToServerModel();

        this.wireDataService.allocateWire(this.incomingWireId, incomingWiresTransactionDetails).subscribe(
            (result: boolean) => {
                if (result) {
                    this.growler.growlSuccess('Success', 'Wire allocated succeessfully');
                    this.router.navigate([`wires/retailwiresin`]);
                } else {
                    this.growler.growlError('Error', 'Failed to allocate wire');
                }
            },
            (err: any) => {
                this.growler.growlError("Error", "Error allocating wire");
            });
    }

    mapToServerModel() {
        let incomingWiresTransactionDetails: IncomingWireTransactionDetails[] = [];

        for (let wireCusAllocation of this.wireCustomerAllocations) {
            incomingWiresTransactionDetails.push(wireCusAllocation.incomingWireTransactionDetail);
        }

        return incomingWiresTransactionDetails;
    }

    validateTotalWireAmountRemaining() {
        if (this.totalWireAmountRemaining !== 0) {
            this.growler.growlError('Error', 'Remaining wire amount must be $0');
            return false;
        }

        return true;
    }


    //findWireCustomerAllocation(wireCustomerAllocation: WireCustomerAllocationModel) {
    //    return this.wireCustomerAllocations.filter(
    //        x => x.incomingWireTransactionDetail.Account.AccountId === wireCustomerAllocation.incomingWireTransactionDetail.Account.AccountId &&
    //            x.customer.Id === wireCustomerAllocation.customer.Id &&
    //            x.incomingWireTransactionDetail.Amount === wireCustomerAllocation.incomingWireTransactionDetail.Amount &&
    //            x.incomingWireTransactionDetail.Description === wireCustomerAllocation.incomingWireTransactionDetail.Description &&
    //            x.incomingWireTransactionDetail.FeeCode.Id === wireCustomerAllocation.incomingWireTransactionDetail.FeeCode.Id &&
    //            x.incomingWireTransactionDetail.GLSubledger === wireCustomerAllocation.incomingWireTransactionDetail.GLSubledger &&
    //            x.incomingWireTransactionDetail.TransactionType.Id === wireCustomerAllocation.incomingWireTransactionDetail.TransactionType.Id)[0];
    //}

    openCustomerSearch(draftRow: any) {
        this.dialogService.addDialog(WireAllocationCustomerSearchComponent).subscribe((result: Customer) => {
            if (result) {
                this.selectedCustomer = result;
                this.wireCustomerAllocation.customer = result;
            }

            this.dialogService.removeAll();
        });
    }


    confirm() {
        //We may not need a confirmation dialog.. but just in case.
        //this.callConfirmationDialog();
        //this.setSelectionId();
        //this.result.wireCustomerAllocations = this.wireCustomerAllocations;
        //this.result.totalWireAmountRemaining = this.totalWireAmountRemaining;
        //this.close();
    }

    saveprint() {
        this.router.navigate([`wires/retailwiresin`]);
    }

    cancel() {
        this.router.navigate([`wires/retailwiresin`]);
    }

    public getDynamicAutoId(name: string, id: string) {
        return name + id;
    }
}