import { GenericDropDownModel } from './../../shared/models/generic-dropdown-model';
import * as moment from 'moment';
import { CentralCodesDataService } from './../../core/services/central-codes-data.service';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogService } from "ng2-bootstrap-modal";

import { InternalTransferTransactionTemplate } from "../../shared/models/internal-transfer/internal-transfer-transaction-template.model";
import { SchedulerContainer } from "../../shared/models/scheduler-container.model";
import { CustomerSearchModalComponent } from "../../shared/modals/customer-search-modal/customer-search-modal.component";
import { ViewPaymentsModalComponent } from "../../shared/modals/view-payments-modal/view-payments-modal.component";
import { SchedulerComponent } from "../../shared/scheduler/scheduler.component";
import { AchDataService } from "../../core/services/ach/ach-data.service";
import { GrowlerMediatorService } from "../../core/services/mediators/growler-mediator.service";
import { CustomerService } from "../../core/services/customer.service";
import { Account } from "../../shared/models/account.model";
import { AuditInfo } from "../../shared/models/audit-info";
import { Utilities } from "../../shared/utilities.service";
import { ScheduleType } from "../../shared/models/schedule-type.model";
import { InternalTransferDataService } from "../../core/services/internal-transfer/internal-transfer-data.service";
import { ViewTransferModalComponent } from "../view-transfer-modal/view-transfer-modal.component";
import { InternalTransferMediatorService } from "../../core/services/mediators/internal-transfer-mediator.service";
import {RoutesFactory} from "../../shared/routes.factory";

@Component({
    selector: 'internal-transfer-setup',
    templateUrl: 'internal-transfer-setup.component.html',
    styleUrls: ['internal-transfer-setup.component.scss']
})
export class InternalTransferSetupComponent {
    public transferObject: InternalTransferTransactionTemplate;
    isEdit: boolean;
    processingDates: string[];
    howToApplyList: GenericDropDownModel[];
    fromAccounts: Account[];
    toAccounts: number[];
    utilities: Utilities;
    formRequired: boolean;
    sameCustomer: boolean;
    editingRecurring: boolean;
    excessRequired: boolean;
    excessAmountExceedsLimit: boolean;
    noSchedule: boolean;
    filteredFeeCodeList: GenericDropDownModel[];
    feeCodeList: GenericDropDownModel[];
    isFeeCodeValid: boolean = true;
    feeCodeHasBeenEdited: boolean;
    isValid: boolean = false;

    constructor(public dialogService: DialogService, private achDataService: AchDataService,
        private growler: GrowlerMediatorService, private customerService: CustomerService, private centralCodesDataService: CentralCodesDataService,
        private internalTransferDataService: InternalTransferDataService, private router: Router, private internalTransferService: InternalTransferMediatorService) {
    }

    @ViewChild('internalTransferForm') internalTransferForm: NgForm;

    ngOnInit() {
        this.initializeObjects();
    }

    initializeObjects() {
        this.utilities = new Utilities();

        if (this.internalTransferService.copiedTransfer) {
            this.initializeForEditTransfer();
            return;
        }

        this.initializeForNewTransfer();
    }

    initializeForNewTransfer() {
        this.isEdit = false;
        this.transferObject = new InternalTransferTransactionTemplate();
        this.transferObject.FromCustomer = this.customerService.selectedCustomer;
        this.transferObject.IsActive = true;
        this.transferObject.AuditInfo = new AuditInfo();
        this.feeCodeHasBeenEdited = false;

        this.transferObject.OtherFeeCode = new GenericDropDownModel();
        this.transferObject.OtherFeeCode.Id = 1;
        this.transferObject.OtherFeeCode.Description = 'Test';

        this.initializeDropdowns();

        this.growlIfNoAccounts(this.transferObject.FromCustomer.AccountNumbers);

        const applyOptionsCallback = (ret: GenericDropDownModel[]) => {
            if (ret && ret.length > 0) {
                this.howToApplyList = ret;
            }
        };
        this.getHowToApplyOptions(applyOptionsCallback);

        const feeOptionsCallback = (ret: GenericDropDownModel[]) => {
            if (ret && ret.length > 0) {
                this.feeCodeList = ret;
                this.filteredFeeCodeList = this.feeCodeList;
            }
        };
        this.getFeeCodesOptions(feeOptionsCallback);
    }

    initializeForEditTransfer() {
        this.isEdit = true;
        this.transferObject = this.internalTransferService.copiedTransfer;
        this.internalTransferService.copiedTransfer = undefined;

        const fromAccount = this.transferObject.FromCustomer.AccountNumbers.find(a => a.AccountId === this.transferObject.FromAccount.AccountId);
        const toAccount = this.transferObject.ToCustomer.AccountNumbers.find(a => a.AccountId === this.transferObject.ToAccount.AccountId);

        this.transferObject.FromAccount = fromAccount;
        this.transferObject.ToAccount = toAccount;

        this.formRequired = this.transferObject.IsForm2279Complete;

        const applyOptionsCallback = (ret: GenericDropDownModel[]) => {
            if (ret && ret.length > 0) {
                this.howToApplyList = ret;
                const howToApply = this.howToApplyList.find(h => h.Id === this.transferObject.HowToApply.Id);
                this.transferObject.HowToApply = howToApply;
            }
        };
        this.getHowToApplyOptions(applyOptionsCallback);

        if (this.transferObject.OtherFeeCode) {
            const feeOptionsCallback = (ret: GenericDropDownModel[]) => {
                if (ret && ret.length > 0) {
                    this.feeCodeList = ret;
                    this.filteredFeeCodeList = this.feeCodeList;
                    const feeCode = this.feeCodeList.find(f => f.Id === this.transferObject.OtherFeeCode.Id);
                    this.transferObject.OtherFeeCode = feeCode;
                }
            };            

            this.getFeeCodesOptions(feeOptionsCallback);
        }

        if (this.transferObject.Schedule.Frequency === 'recurring' && this.transferObject.Schedule.EndPaymentDate == null) {
            this.transferObject.Schedule.EndPaymentDate = 'No End Date'
        }

        if (this.transferObject.Schedule.Frequency === 'recurring' && moment(this.transferObject.StartDate).isSameOrBefore(moment(), 'day')) {
            this.editingRecurring = true;
        }
    }

    initializeDropdowns() {
        this.transferObject.FromAccount = this.utilities.defaultDropDownValue;
        this.transferObject.ToAccount = this.utilities.defaultDropDownValue;
        this.transferObject.HowToApply = this.utilities.defaultDropDownValue;
        this.transferObject.OtherFeeCode = this.utilities.defaultDropDownValue;
    }

    chooseFromCustomer() {
        this.dialogService.addDialog(CustomerSearchModalComponent, {
        }).subscribe((fromCustomer) => {
            if (fromCustomer) {
                this.transferObject.FromCustomer = fromCustomer;
                this.customerService.selectedCustomer = fromCustomer;
                this.transferObject.FromAccount = this.utilities.defaultDropDownValue;
                this.growlIfNoAccounts(this.transferObject.FromCustomer.AccountNumbers);

                if (this.sameCustomer) {
                    this.transferObject.ToCustomer = fromCustomer;
                }
            }
        });
    }

    chooseToCustomer() {
        this.dialogService.addDialog(CustomerSearchModalComponent, {
        }).subscribe((toCustomer) => {
            if (toCustomer) {
                this.transferObject.ToCustomer = toCustomer;
                this.transferObject.ToAccount = this.utilities.defaultDropDownValue;
                this.growlIfNoAccounts(this.transferObject.ToCustomer.AccountNumbers);
            }
        });
    }

    getHowToApplyOptions(successCallback: any) {
        this.centralCodesDataService.getHowToApplyList()
            .subscribe(successCallback, (err: any) => {
                this.growler.growlError("Error", "Error getting How to Apply Data");
            });
    }

    getFeeCodesOptions(successCallback: any) {
        this.centralCodesDataService.getOtherFees()
            .subscribe(successCallback, (err: any) => {
                this.growler.growlError("Error", "Error getting Other Fees Data");
            });
    }

    howToApplyChanged() {
        if (this.transferObject.ToAccount && this.transferObject.HowToApply) {
            this.excessRequired = this.transferObject.HowToApply.Description === 'Scheduled Payment + Excess';
        }

        if (this.transferObject.HowToApply.Description === 'Scheduled Payment' || this.transferObject.HowToApply.Description === 'Scheduled Payment + Excess') {
            const scheduledPaymentAmmount = this.transferObject.ToAccount.ScheduledPaymentAmount;
            this.transferObject.Amount = scheduledPaymentAmmount ? scheduledPaymentAmmount.toString() : '';
        }

        if (this.transferObject.HowToApply.Description !== 'Scheduled Payment + Excess') {
            this.transferObject.ExcessAmount = undefined;
        }

        if (this.transferObject.HowToApply.Id !== 10) {
            this.transferObject.OtherFeeCode = this.utilities.defaultDropDownValue;
        }
    }

    checkExcessAmount(event: any) {
        if ((this.transferObject.ToAccount.PrePayRestriction === '1') && (event > 250)) {
            this.excessAmountExceedsLimit = true;
            return;
        }
        this.excessAmountExceedsLimit = false;
    }

    openScheduler() {
        let schedulerModel = this.transferObject.Schedule;
        this.dialogService.addDialog(SchedulerComponent,
            {
                schedulerContainer: schedulerModel,
                prepaymentRestriction: this.transferObject.ToAccount && this.transferObject.ToAccount.PrePayRestriction ? this.transferObject.ToAccount.PrePayRestriction : '0',
                verbalAchReceived: false,
                minDate: moment().subtract(1, 'day').toDate()
            }).subscribe((schedulerData) => {
                if (schedulerData) {
                    this.transferObject.Schedule = schedulerData;
                    const scheduleType = this.getScheduleType(schedulerData);
                    this.isForm2279Required(scheduleType);
                    this.internalTransferForm.form.markAsDirty();
                }
            });
    }

    viewPayments() {
        this.dialogService.addDialog(ViewPaymentsModalComponent, {
            title: 'Upcoming Payments',
            message: '',
            confirmText: '',
            cancelText: 'Close',
            upcomingPayments: this.transferObject.Schedule.NextPaymentDates
        }).subscribe((isConfirmed) => {
        });
    }

    getScheduleType(schedule: SchedulerContainer) {
        if (!schedule) {
            return ScheduleType.None;
        }
        if (schedule.Frequency === 'once') {
            return ScheduleType.OneTime;
        }
        if (schedule.RecurringSchedule.Frequency === 'weekly') {
            return ScheduleType.Weekly;
        }
        if (schedule.RecurringSchedule.Frequency === 'quarterly') {
            return ScheduleType.Quarterly;
        }
        if (schedule.RecurringSchedule.Frequency === 'annual') {
            return ScheduleType.Annual;
        }
        if (schedule.RecurringSchedule.MonthlySchedule.RecurBy === 'calendarDay') {
            return ScheduleType.MonthlyCalendarDays;
        }
        return ScheduleType.MonthlyDaysOfWeek;
    }

    isForm2279Required(scheduleType: ScheduleType) {
        this.internalTransferDataService.isForm2279Needed(
            this.transferObject.FromCustomer.Id, this.transferObject.FromAccount.AccountId,
            this.transferObject.ToCustomer.Id, this.transferObject.ToAccount.AccountId, scheduleType
        )
            .subscribe((ret: boolean) => {
                this.formRequired = ret;
            });
    }

    toggleSameCustomer() {
        this.sameCustomer = !this.sameCustomer;
        if (!this.sameCustomer) {
            return
        }

        this.transferObject.ToCustomer = this.transferObject.FromCustomer;
    }

    isFormValid() {
        this.excessAmountExceedsLimit = false;
        this.noSchedule = false;

        let isValid = !this.internalTransferForm.invalid;

        if (this.transferObject.ToAccount.PrePayRestriction === '1' && +this.transferObject.ExcessAmount >= 250) {
            this.excessAmountExceedsLimit = true;
            isValid = false;
        }

        if (!this.transferObject.Schedule) {
            this.noSchedule = true;
            isValid = false;
        }

        return isValid;
    }

    submit() {
        if (this.internalTransferForm.invalid) {
            return;
        }
        this.isValid = this.isFormValid();
        if (!this.isValid) {
            return;
        }

        if (this.isEdit) {
            this.submitForEditTransfer();
            return;
        }

        this.submitForNewTransfer();
    }

    submitForEditTransfer() {
        this.dialogService.addDialog(ViewTransferModalComponent,
            {
                title: 'Confirmation',
                message: 'Are you sure you want to save this edited transfer?',
                confirmText: 'Save',
                cancelText: 'Cancel',
                transferObject: this.transferObject,
                isForm2279Required: this.formRequired
            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.internalTransferDataService.deleteInternalTransfer(this.transferObject.TransactionId)
                        .subscribe((ret: boolean) => {
                            this.transferObject.TransactionId = undefined;
                            this.internalTransferDataService.submitInternalTransfer(this.transferObject)
                                .subscribe((ret: boolean) => {
                                    this.growler.growlSuccess("Success", "The internal transfer was successfully edited");
                                    this.router.navigate([RoutesFactory.createInternalTransferListRoute(this.customerService.selectedCustomer.Id)]);
                                });
                        });
                }
            });
    }

    submitForNewTransfer() {
        this.dialogService.addDialog(ViewTransferModalComponent,
            {
                title: 'Confirmation',
                message: 'Are you sure you want to submit this transfer?',
                confirmText: 'Save',
                cancelText: 'Cancel',
                transferObject: this.transferObject,
                isForm2279Required: this.formRequired
            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.internalTransferDataService.submitInternalTransfer(this.transferObject)
                        .subscribe((ret: boolean) => {
                            this.growler.growlSuccess("Success", "The internal transfer was successfully set up");
                            this.router.navigate([RoutesFactory.createInternalTransferListRoute(this.customerService.selectedCustomer.Id)]);
                        });
                }
            });
    }

    cancel() {
        this.router.navigate([RoutesFactory.createInternalTransferListRoute(this.customerService.selectedCustomer.Id)]);
    }

    private growlIfNoAccounts(accountNumbers: Account[]) {
        if (accountNumbers === null || (accountNumbers && accountNumbers.length < 1)) {
            this.growler.growlError("Error", "No accounts for this customer!");
        }
    }

    feeCodeSearch(event: any) {
        if (event.query && event.query.length > 0) {
            this.filteredFeeCodeList = this.feeCodeList.filter(e => e.Description.toLowerCase().includes(event.query.toLowerCase()));
        } else {
            this.filteredFeeCodeList = this.feeCodeList;
        }
    }

    validateSelectedFeeCode(event: any) {
        this.feeCodeHasBeenEdited = true;
        if (this.transferObject.OtherFeeCode === undefined || this.transferObject.OtherFeeCode === null) {
            this.isFeeCodeValid = false;
            return;
        }

        let matches: number = this.feeCodeList.filter(e => e.Description.toLowerCase() === event.srcElement.value.toLowerCase()).length;
        if (event.srcElement.value && matches <= 0) {
            this.isFeeCodeValid = false;
            return;
        }
        if (matches === 1) {
            this.transferObject.OtherFeeCode = this.feeCodeList.find(e => e.Description.toLowerCase() === event.srcElement.value.toLowerCase());
        }
        this.isFeeCodeValid = true;
    }

    otherFeeSelected(event: any) {
        this.isFeeCodeValid = true;
    }

    handleDropdownClick(event: any) {
        this.filteredFeeCodeList = [];
        setTimeout(() => {
            this.filteredFeeCodeList = this.feeCodeList;
        },
            100);
    }
}