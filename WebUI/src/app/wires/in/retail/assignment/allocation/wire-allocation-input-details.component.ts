import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { WireCustomerAllocationModel } from '../../../../../shared/models/wires/wire-customer-allocation.model';
import { CentralCodesDataService } from '../../../../../core/services/central-codes-data.service';
import { GrowlerMediatorService } from '../../../../../core/services/mediators/growler-mediator.service';
import { Customer } from '../../../../../shared/models/customer.model';
import { GenericDropDownModel } from '../../../../../shared/models/generic-dropdown-model';
import { IncomingWireTransactionDetails } from '../../../../../shared/models/wires/IncomingWireTransactionDetails';

@Component({
    selector: 'wire-allocation-input-details',
    templateUrl: 'wire-allocation-input-details.component.html'
})
export class WireAllocationInputDetailsComponent implements OnInit {

    @Input() wireCustomerAllocation: WireCustomerAllocationModel;
    @Output() wireCustomerAllocationChange = new EventEmitter<WireCustomerAllocationModel>();
    @Output() wireCustomerAllocationEdit = new EventEmitter<WireCustomerAllocationModel>();
    @Output() totalAmountRemaining = new EventEmitter<number>();
    @Input() wireAmount: number;
    @Input() selectedCustomer: Customer;
    @Input() searchMode: string;
    @Input() wireCustomerAllocations: WireCustomerAllocationModel[];
    @Input() isEdit: boolean;
    @ViewChild('wireallocationinput') public wireAllocationInputForm: NgForm;

    howtoApplyList: GenericDropDownModel[];
    feeCodes: GenericDropDownModel[];
    showFeeCodes: boolean = false;
    searchSelection: GenericDropDownModel;
    results: GenericDropDownModel[];
    searchPlaceholder: string = 'Enter Search or Select Drop Down';

    constructor(public centralCodesDataService: CentralCodesDataService, public growler: GrowlerMediatorService) {
    }

    ngOnInit() {
        this.initializeComponent();
    }

    initializeComponent() {
        this.getHowToApplyOptions();
        this.getFeeCodeOptions();        
    }

    howToApplyChanged() {
        this.setFeeCodeVisibilityByTransactionType(this.wireCustomerAllocation.incomingWireTransactionDetail.TransactionType.Description);
        this.setScheduledPaymentAmountByTransactionType(this.wireCustomerAllocation.incomingWireTransactionDetail.TransactionType.Description);
    }

    setFeeCodeVisibilityByTransactionType(transactionTypeDescription: string) {
        if (transactionTypeDescription === 'Other Fee') {
            this.showFeeCodes = true;
        } else {
            this.showFeeCodes = false;
            this.wireCustomerAllocation.incomingWireTransactionDetail.FeeCode = new GenericDropDownModel();
        }
    }

    setScheduledPaymentAmountByTransactionType(transactionTypeDescription: string) {
        //TODO: Remove the 10000 once better data begins returning
        if (transactionTypeDescription === 'Scheduled Payment') {
            if (this.selectedCustomer) {
                this.wireCustomerAllocation.incomingWireTransactionDetail.Amount =
                    this.selectedCustomer.AccountNumbers.filter(x => x.AccountId ===
                        this.wireCustomerAllocation.incomingWireTransactionDetail.Account.AccountId)[0]
                    .ScheduledPaymentAmount || 0;
            } else {
                this.wireCustomerAllocation.incomingWireTransactionDetail.Amount = 0;
            }
        }
    }

    getHowToApplyOptions() {
        this.centralCodesDataService.getHowToApplyList()
            .subscribe((ret: GenericDropDownModel[]) => {
                if (ret && ret.length > 0) {
                    this.howtoApplyList = ret;
                }
            },
            (err: any) => {
                this.growler.growlError("Error", "Error getting How to Apply Data");
            });
    }

    getFeeCodeOptions() {
        this.centralCodesDataService.getOtherFees()
            .subscribe((ret: GenericDropDownModel[]) => {
                if (ret && ret.length > 0) {
                    this.feeCodes = ret;
                }
            },
            (err: any) => {
                this.growler.growlError("Error", "Error getting Fee Code Data");
            });
    }

    isValidPrinciplePrepayment() {
        if (this.searchMode === 'customer' && this.wireCustomerAllocation.incomingWireTransactionDetail.TransactionType.Description === 'Principal PrePayment')
        {
            let currentAccount = this.getSelectedCustomerAccountId();
            let currBilledPrinciple = 0;

            if (currentAccount) {
                currBilledPrinciple = currentAccount.CurrentBilledPrincipal || 0;
            }
            if (this.wireCustomerAllocation.incomingWireTransactionDetail.Amount - currBilledPrinciple > 250) {
                this.growler.growlError("Error", "Amount cannot be more than $250 over the principal payment");
                return false;
            }
        }

        return true;
    }

    getSelectedCustomerAccountId() {
        return this.selectedCustomer.AccountNumbers.filter(x => x.AccountId === this.wireCustomerAllocation.incomingWireTransactionDetail.Account.AccountId)[0];
    }

    isFormPristineAndValid() {
        if (this.wireAllocationInputForm.pristine || !this.wireAllocationInputForm.valid) {
            this.growler.growlError("Error", "Please complete all required fields");
            return false;
        }

        return true;
    }

    isAllocationAmountLessThanWire(remainingAllocationAmount: number) {        

        if (remainingAllocationAmount < 0) {
            this.growler.growlError("Error", "Total wire amount exceeded by allocations");
            return false;
        }

        return true;
    }

    isValidAmount() {
        if (this.wireCustomerAllocation.incomingWireTransactionDetail.Amount <= 0) {
            this.growler.growlError("Error", "Please enter an amount greater than 0");
            return false;
        }

        return true;
    }

    //isDuplicateAssignment(rowItem: WireCustomerAllocationModel) {
    //    if ((this.wireCustomerAllocations.length > 1 && this.isEdit) || !this.isEdit) {
    //        let editExpectedArrayLength = 0;

    //        if (this.isEdit) {
    //            editExpectedArrayLength = 1;
    //        }

    //        if (this.selectedCustomer && this.selectedCustomer.Id > 0) {
    //            return this.checkDuplicateByCustomer(rowItem.incomingWireTransactionDetail, editExpectedArrayLength);
    //        } else {

    //            return this.checkDuplicateByGLAccount(rowItem.incomingWireTransactionDetail, editExpectedArrayLength);
    //        }
    //    }
    //    return false;
    //}

    //checkDuplicateByCustomer(incomingWireTransactionDetail: IncomingWireTransactionDetails, editExpectedArrayLength: number) {
    //    var isDuplicate = this.wireCustomerAllocations.filter(
    //        x => x.customer.Id > 0 && x.incomingWireTransactionDetail.Account.AccountId === incomingWireTransactionDetail.Account.AccountId &&
    //        x.customer.Id === this.selectedCustomer.Id &&
    //            x.incomingWireTransactionDetail.Description === incomingWireTransactionDetail.Description &&
    //            (incomingWireTransactionDetail.FeeCode == undefined || x.incomingWireTransactionDetail.FeeCode == undefined || x.incomingWireTransactionDetail.FeeCode.Id === incomingWireTransactionDetail.FeeCode.Id) &&
    //            x.incomingWireTransactionDetail.GLSubledger === incomingWireTransactionDetail.GLSubledger &&
    //            (x.incomingWireTransactionDetail.TransactionType === undefined || incomingWireTransactionDetail.TransactionType === undefined || x.incomingWireTransactionDetail.TransactionType.Id === incomingWireTransactionDetail.TransactionType.Id)).length > editExpectedArrayLength;

    //    if (isDuplicate) {
    //        this.growler.growlError("Error", "Cannot add duplicate assignment");
    //    }

    //    return isDuplicate;
    //}

    //checkDuplicateByGLAccount(incomingWireTransactionDetail: IncomingWireTransactionDetails, editExpectedArrayLength: number) {
    //    var isDuplicate = this.wireCustomerAllocations.filter(
    //        x => x.customer.Id === undefined && x.incomingWireTransactionDetail.GLAccountId.Id === incomingWireTransactionDetail.GLAccountId.Id &&
    //            x.incomingWireTransactionDetail.Description === incomingWireTransactionDetail.Description &&
    //            x.incomingWireTransactionDetail.GLSubledger === incomingWireTransactionDetail.GLSubledger).length > editExpectedArrayLength;

    //    if (isDuplicate) {
    //        this.growler.growlError("Error", "Cannot add duplicate assignment");
    //    }

    //    return isDuplicate;
    //}

    isFormValid() {

        if (!this.isFormPristineAndValid()) return false;

        if (!this.isValidPrinciplePrepayment()) return false;

        //if (this.isDuplicateAssignment(this.wireCustomerAllocation)) return false;

        if (!this.isValidAmount()) return false;

        if (!this.isAllocationAmountLessThanWire(this.getRemainingAllocationAmount())) return false;

        return true;
    }


    addAssignment() {

        if (!this.isFormValid()) return;

        let assignAllocation = Object.assign({}, this.wireCustomerAllocation);
        assignAllocation.customer = Object.assign({}, this.selectedCustomer);
        assignAllocation.incomingWireTransactionDetail =
            Object.assign({}, this.wireCustomerAllocation.incomingWireTransactionDetail);
        assignAllocation.incomingWireTransactionDetail.Account =
            Object.assign({}, this.wireCustomerAllocation.incomingWireTransactionDetail.Account);
        assignAllocation.incomingWireTransactionDetail.TransactionType = Object.assign({},
            this.wireCustomerAllocation.incomingWireTransactionDetail.TransactionType);
        assignAllocation.incomingWireTransactionDetail.FeeCode =
            Object.assign({}, this.wireCustomerAllocation.incomingWireTransactionDetail.FeeCode);
        assignAllocation.incomingWireTransactionDetail.DisplayAccountId = this.setDisplayAccountId();

        this.totalAmountRemaining.emit(this.getRemainingAllocationAmount());
        this.wireCustomerAllocationChange.emit(assignAllocation);

        this.wireCustomerAllocation = new WireCustomerAllocationModel();
        this.wireCustomerAllocation.customer = new Customer();
        this.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
        this.selectedCustomer = new Customer();
        this.searchSelection = undefined;

    }

    editAssignment() {

        if (!this.isFormValid()) return;

        this.totalAmountRemaining.emit(this.getRemainingAllocationAmount());
        this.wireCustomerAllocation.incomingWireTransactionDetail.DisplayAccountId = this.setDisplayAccountId();
        this.searchSelection = undefined;
        this.wireCustomerAllocationEdit.emit(this.wireCustomerAllocation);
    }

    setDisplayAccountId() {
        let displayAccountId: string;

        if (this.wireCustomerAllocation.incomingWireTransactionDetail.Account && this.wireCustomerAllocation.incomingWireTransactionDetail.Account.AccountId > 0) {
            displayAccountId = this.wireCustomerAllocation.incomingWireTransactionDetail.Account.AccountNumber.toString();
        } else {
            let index = this.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId.Description.indexOf(' - ');
            displayAccountId = this.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId.Description.substring(0, index);
            if (displayAccountId && displayAccountId.length > 0) {
                displayAccountId = displayAccountId.trim();
            }
        }

        return displayAccountId;
    }

    getRemainingAllocationAmount() {
        let totalAllocated: number = this.getTotalAllocatedAmount();

        if (this.isEdit) {
            return +(this.wireAmount - totalAllocated).toFixed(2);
        } else {           
            return +(this.wireAmount - totalAllocated - this.wireCustomerAllocation.incomingWireTransactionDetail.Amount).toFixed(2);
        }
    }

    getTotalAllocatedAmount() {
        let totalAllocated: number = 0;
         this.wireCustomerAllocations.forEach(x => {
            totalAllocated += x.incomingWireTransactionDetail.Amount;
        });

        return totalAllocated;
    }

    isDisabled() {
        if (!this.wireCustomerAllocation.incomingWireTransactionDetail.Account && !this.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId) {
            return true;
        }
        if (this.searchMode === 'customer') {
            if (!this.wireCustomerAllocation.incomingWireTransactionDetail.Account.AccountId ||
                this.wireCustomerAllocation.incomingWireTransactionDetail.Account.AccountId === 0) {
                return true;
            }
        } else if (!this.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId ||
            this.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId.Id === 0) {
            return true;
        }
        return false;
    }

    getGlAccounts(input: string): Observable<GenericDropDownModel[]> {
        return this.centralCodesDataService.getGlAccount(input);
    }

    getTypeAheadData(input: any) {
        this.getGlAccounts(input.query)
            .subscribe((ret: GenericDropDownModel[]) => {
                this.results = ret;
            },
            (err: any) => {
                this.growler.growlError("Error", "Error getting GL accounts");
            });
    }

    setEditSearchSelection(glAccountId: number) {        
        this.getGlAccounts('').subscribe((ret: GenericDropDownModel[]) => {
            if (ret) {                
                this.results = ret;
                this.searchSelection = this.results.filter(x => x.Id === glAccountId)[0];
            }
        });
    }

    glAccountOnBlur(selection: any) {
        if (selection.currentTarget.value === '') {
            this.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId = undefined;
            return;
        }

        this.getGlAccounts(selection.currentTarget.value).subscribe((ret: GenericDropDownModel[]) => {
            if (ret.length === 1) {
                this.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId.Id = ret[0].Id;
            } else {
                this.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId = undefined;
            }
        });
    }

    setSelectionId(selection: GenericDropDownModel) {
        this.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId = selection;
    }
};