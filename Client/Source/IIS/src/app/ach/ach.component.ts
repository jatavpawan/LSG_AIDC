import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";

import { SchedulerComponent } from '../shared/scheduler/scheduler.component';
import { Ach } from '../shared/models/ach/ach.model';
import { AchDataService } from '../core/services/ach/ach-data.service';
import { Account } from '../shared/models/account.model';
import { GrowlerMediatorService } from '../core/services/mediators/growler-mediator.service';
import { AccountsDataService } from '../core/services/accounts-data.service';
import { AchApprover } from '../shared/models/ach/ach-approver.model';
import { ConfirmModalComponent } from '../shared/modals/confirm-modal/confirm-modal.component';
import { BankTemplate } from "../shared/models/ach/bank-template.model";
import { AchStatus } from "../shared/models/ach/ach-status";
import { AuditInfo } from "../shared/models/audit-info";
import { ViewPaymentsModalComponent } from "../shared/modals/view-payments-modal/view-payments-modal.component";
import { ViewTransactionModalComponent } from "./shared/view-transaction-modal/view-transaction-modal.component";
import { CentralCodesDataService } from "../core/services/central-codes-data.service";
import { AccountsMediatorService } from '../core/services/mediators/accounts-mediator.service';
import { AchMediatorService } from "../core/services/mediators/ach-mediator.service";
import { Utilities } from "../shared/utilities.service";
import { AuthorizationType } from '../shared/models/ach/authorization-type.enum';
import { ProcessingDatesDataService } from "../core/services/processing-dates-data.service";
import { ProcessingDateService } from "../core/services/processing-date.service";
import { SchedulerContainer } from "../shared/models/scheduler-container.model";
import { GenericDropDownModel } from '../shared/models/generic-dropdown-model';
import { RoutesFactory } from '../shared/routes.factory';
import {CustomerService} from '../core/services/customer.service';

@Component({
    selector: 'ach',
    templateUrl: 'ach.component.html',
    styleUrls: ['ach.component.scss']
})
export class AchComponent implements OnInit {
    customerId: number;
    ach: Ach = new Ach();
    accounts: Account[];
    approvers: AchApprover[];
    processingDates: string[];
    isCopy: boolean = false;
    private sub: any;
    howtoApplyList: GenericDropDownModel[];
    filteredFeeCodeList: GenericDropDownModel[];
    feeCodeList: GenericDropDownModel[];
    isFeeCodeValid: boolean;
    feeCodeHasBeenEdited: boolean;

    @Input() bankTemplate: BankTemplate;    
    _achType: string;

    @Input()
    set achType(type: string) {
        this._achType = type;
        this.initializeAch();
    }
    get achType() { return this._achType; }

    utilities: Utilities;


    constructor(private route: ActivatedRoute, public dialogService: DialogService, public achDataService: AchDataService,
        public growler: GrowlerMediatorService, private accountService: AccountsDataService, private router: Router,
        public achMediatorService: AchMediatorService, public centralCodesDataService: CentralCodesDataService,
        public accountsMediatorService: AccountsMediatorService, private processingDatesDataService: ProcessingDatesDataService, private customerService: CustomerService) {

        this.utilities = new Utilities();
    }

    ngOnInit() {
        this.getRouteParams();
    }

    initializeDefaultDropdownValues() {
        this.ach.Account = this.utilities.defaultDropDownValue;
        this.ach.HowToApply = this.utilities.defaultDropDownValue;
        this.ach.AchApprover = this.utilities.defaultDropDownValue;
    }

    getRouteParams() {
        this.sub = this.route.params.subscribe((params) => {
            this.customerId = +params['customerId'];

            if (this.customerId !== 0) {
                this.initializeAch();
                this.getAccounts(this.customerId);
            }
        });
    }

    toggleFormFields(id: string) {
        if (id === 'twentyOneFourty' && this.ach.AuthorizationType !== AuthorizationType.Form2140) {
            this.ach.AuthorizationType = AuthorizationType.Form2140;
        }
        else if (id === 'verbalAchReceived' && this.ach.AuthorizationType !== AuthorizationType.Verbal) {
            this.ach.AuthorizationType = AuthorizationType.Verbal;
        } else {
            this.ach.AuthorizationType = AuthorizationType.None;
        }
    }

    getHowToApplyOptions() {
        this.centralCodesDataService.getHowToApplyList()
            .subscribe((ret: GenericDropDownModel[]) => {
                if (ret && ret.length > 0) {
                    this.howtoApplyList = ret;
                    if (this.ach && this.ach.HowToApply && this.ach.HowToApply.Id > 0) {
                        this.ach.HowToApply = this.howtoApplyList.find(t => t.Id === this.ach.HowToApply.Id);
                    }
                }
            },
            (err: any) => {
                this.growler.growlError("Error", "Error getting How to Apply Data");
            });
    }

    initializeAch() {

        this.initializeDefaultDropdownValues();

        this.getHowToApplyOptions();

        if (this.achMediatorService.copiedAch && this.achMediatorService.copiedAch.AchId != undefined) {
            this.ach = Object.assign({}, this.achMediatorService.copiedAch);
            this.ach.Status = AchStatus.Active;
            this.ach.AchId = 0;
            this.getAchApprovers();

            if (this.achMediatorService.copiedAch.Account) {

                if (!this.ach.Account) {
                    this.ach.Account = new Account();
                }

                this.ach.Account.AccountId = this.achMediatorService.copiedAch.Account.AccountId;
            }

            //this.ach.AchApprover.AchApproverId = this.achMediatorService.copiedAch.AchApprover.AchApproverId;

            this.processingDatesDataService.getProcessingDates(this.ach.Schedule)
                .subscribe((ret: string[]) => {
                    let processingDateService = new ProcessingDateService();
                    this.ach.Schedule = processingDateService.formatProcessingDates(ret, this.ach.Schedule);
                },
                (err) => {
                    this.growler.growlError('Error', 'Could not get processing dates');
                }
                );

            this.isCopy = true;

        } else {
            this.ach = new Ach();
            this.ach.CustomerId = this.customerId;
            this.ach.AuthorizationType = AuthorizationType.None;
            this.ach.BankTemplate = new BankTemplate();
            this.ach.Account = this.utilities.defaultDropDownValue;
            this.ach.AuditInfo = new AuditInfo();
            this.ach.AchApprover = this.utilities.defaultDropDownValue;
            this.ach.Status = AchStatus.Active;
            this.ach.Schedule = new SchedulerContainer();
            this.ach.Schedule.NextPaymentDates = [];
            this.ach.TransactionDirection = new GenericDropDownModel();
            if (this.bankTemplate) {
                this.ach.BankTemplate = this.bankTemplate;
            }
            if (this.achType) {
                this.ach.TransactionDirectionDisplay = this.achType;
            }
            this.ach.HowToApply = this.utilities.defaultDropDownValue;
            this.feeCodeHasBeenEdited = false;
        }
        this.ach.TransactionDirection.Id = 2;
        this.ach.TransactionDirection.Description = 'Out';

        if (this.achType === "In") {
            this.ach.TransactionDirection.Id = 1;
            this.ach.TransactionDirection.Description = 'In';
        }
    }

    openScheduler() {
        let schedulerModel = Object.assign({}, this.ach.Schedule);
        schedulerModel.RecurringSchedule = Object.assign({}, this.ach.Schedule.RecurringSchedule);
        schedulerModel.NextPaymentDates = Object.assign({}, this.ach.Schedule.NextPaymentDates);

        this.dialogService.addDialog(SchedulerComponent,
            {
                schedulerContainer: schedulerModel,
                verbalAchReceived: this.ach.AuthorizationType === AuthorizationType.Verbal,
                minDate: new Date(),
                prepaymentRestriction: this.ach.Account && this.ach.Account.PrePayRestriction && (this.ach.TransactionDirection && this.ach.TransactionDirection.Description === 'In') ? this.ach.Account.PrePayRestriction : '0'
            }).subscribe((schedulerData) => {
                if (schedulerData) {
                    this.ach.Schedule = schedulerData;
                    this.isSaveDisabled();
                }
            });
    }

    viewPayments() {
        this.dialogService.addDialog(ViewPaymentsModalComponent, {
            title: 'Upcoming Payments',
            message: '',
            confirmText: '',
            cancelText: 'Close',
            upcomingPayments: this.ach.Schedule.NextPaymentDates
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.achDataService.postAch(this.ach)
                    .subscribe((isConfirmed) => {

                    });
            }

        });
    }

    loadApprovers(accountId: number) {
        this.getAchApprovers();

        for (let account of this.accounts) {
            if (account && account.AccountId === accountId) {
                this.ach.Account.AccountNumber = account.AccountNumber;
            }
        }
    }

    accountNumberChanged() {

        if (this.customerId > 0) {
            if ((this.ach.TransactionDirection && this.ach.TransactionDirection.Description === 'Out') || this.achType === 'Out') {
                this.loadApprovers(this.ach.Account.AccountId);
            } else if ((this.ach.TransactionDirection && this.ach.TransactionDirection.Description === 'In') || this.achType === 'In') {
                this.howToApplyChanged();
            }
        }
    }

    getAccounts(Id: number) {
        this.accountService.getAccounts(Id)
            .subscribe((ret: Account[]) => {
                if (ret && ret.length > 0) {
                    this.accounts = ret;
                    if (this.ach && this.ach.Account) {
                        this.ach.Account = this.accounts.find(t => t.AccountId === this.ach.Account.AccountId);
                    }
                    if (this.accountsMediatorService.selectedAccount) {
                        this.ach.Account = this.accountsMediatorService.selectedAccount;
                        if (this.accounts && this.accounts.length > 0) {
                            let list = this.accounts.filter(x => x.AccountId ===
                                this.accountsMediatorService.selectedAccount.AccountId);
                            if (list && list.length > 0) {
                                this.ach.Account = list[0];
                            }
                        }
                    }
                }
            },
            (err: any) => {
                this.growler.growlError("Error", "Error getting accounts: " + err);
            });
    }

    getAchApprovers() {
        if (this.customerId > 0) {
            this.achDataService.getApprovers(this.customerId)
                .subscribe((ret: AchApprover[]) => {
                    if (ret && ret.length > 0) {
                        this.approvers = ret;

                        if (this.ach && this.ach.AchApprover) {
                            this.ach.AchApprover = this.approvers.find(t => t.AchApproverId === this.ach.AchApprover.AchApproverId);
                        }
                    }
                },
                (err: any) => {
                    this.growler.growlError("Error", "Error getting approvers: " + err);
                });
        }
    }

    submitAch() {
        if (!this.ach.TransactionDirection) {
            this.ach.TransactionDirection = new GenericDropDownModel();
        }
        this.ach.TransactionDirection.Description = 'Out';
        this.ach.TransactionDirectionDisplay = "Out";

        if (this.achType === "In") {
            this.ach.TransactionDirection.Description = 'In';
            this.ach.TransactionDirectionDisplay = "In";
        }

        this.dialogService.addDialog(ViewTransactionModalComponent,
            {
                title: 'ACH Setup Confirmation',
                message: '',
                confirmText: 'Confirm',
                cancelText: 'Cancel',
                ach: this.ach,
                twentyOneFourty: this.ach.AuthorizationType === AuthorizationType.Form2140,
                verbalAchReceived: this.ach.AuthorizationType === AuthorizationType.Verbal

            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.dialogService.addDialog(ConfirmModalComponent, {
                        title: 'Confirmation',
                        message: 'Upon Save, this template will not be editable.',
                        confirmText: 'Save',
                        cancelText: 'Cancel'
                    }).subscribe((isConfirmed) => {
                        if (isConfirmed) {
                            this.achDataService.postAch(this.ach)
                                .subscribe((insertedAchOut: boolean) => {
                                    if (insertedAchOut) {
                                        this.growler.growlSuccess("Success", "ACH " +  this.ach.TransactionDirection.Description + " saved successfully");

                                        if (this.achMediatorService.copiedAch && this.achMediatorService.copiedAch.Status != undefined && this.achMediatorService.copiedAch.Status !== AchStatus.Deleted) {
                                            this.dialogService.addDialog(ConfirmModalComponent,
                                                {
                                                    title: 'Copy Successful',
                                                    message: `This ACH has been successfully copied. Would you like to delete the original ACH?`,
                                                    confirmText: 'Keep',
                                                    cancelText: 'Delete'
                                                }).subscribe((isKeep) => {
                                                    if (!isKeep) {
                                                        this.achDataService.deleteAchTransaction(this.achMediatorService.copiedAch.AchId)
                                                            .subscribe((status: boolean) => {
                                                                if (status) {
                                                                    this.growler.growlSuccess('Success', 'ACH transaction has been deleted successfully');
                                                                    this.achMediatorService.copiedAch = undefined;
                                                                    this.navigateToAchTransactions();
                                                                } else {
                                                                    this.growler.growlError('Error', 'ACH transaction deletion failed');
                                                                }
                                                            },
                                                            (err: any) => {
                                                                this.growler
                                                                    .growlError('Error', 'ACH transaction deletion failed');
                                                            });
                                                    } else {
                                                        this.navigateToAchTransactions();

                                                    }

                                                });
                                        } else {
                                            this.navigateToAchTransactions();
                                        }

                                    } else {
                                        this.growler.growlError("Error", "ACH " + this.ach.TransactionDirection.Description + " failed to save");
                                    }
                                },
                                (err: any) => {
                                    this.growler.growlError("Error", "ACH "  +  this.ach.TransactionDirection.Description  +  " failed to save: "  +  err );

                                });
                        }
                    });
                }
            });
    }

    navigateToAchTransactions() {
        this.router.navigate([RoutesFactory.createAchTransactionsRoute(this.customerId)]);
    }

    hideExcessAmountValidation() {

        let hidden: boolean = true;

        if (this.ach.Account && this.ach.Account.PrePayRestriction && this.ach.Account.PrePayRestriction === '1') {

            if (this.ach.ExcessAmount && +this.ach.ExcessAmount > 250) {
                hidden = false;
            }
        }

        return hidden;
    }

    howToApplyChanged() {
        if (this.ach.Account && this.ach.Account.ScheduledPaymentAmount && this.ach.HowToApply) {
            if (this.ach.HowToApply.Description === 'Scheduled Payment' || this.ach.HowToApply.Description === 'Scheduled Payment + Excess') {
                this.ach.Amount = this.ach.Account.ScheduledPaymentAmount.toString();
            } else {
                if (+this.ach.ExcessAmount > 0) {
                    this.ach.ExcessAmount = undefined;
                }
                if (this.ach.HowToApply.Id !== 10) {
                    this.ach.OtherFeeCode = this.utilities.defaultDropDownValue;
                } else {
                    this.getFeeCodes();
                }

            }
        }

    }

    excessAmountRequired() {
        if (this.ach.HowToApply && this.ach.HowToApply.Description === 'Scheduled Payment + Excess') {

            return true;
        }

        return false;
    }

    excessAmountDisabled() {
        if (!this.ach.HowToApply || (this.ach.HowToApply && this.ach.HowToApply.Description !== 'Scheduled Payment + Excess')) {

            if (+this.ach.ExcessAmount > 0) {
                this.ach.ExcessAmount = undefined;
            }

            return true;
        }

        return false;
    }
    getFeeCodes() {
        if (this.achType === "In") {
            this.centralCodesDataService.getOtherFees()
                .subscribe((ret: GenericDropDownModel[]) => {
                    if (ret && ret.length > 0) {
                        this.feeCodeList = ret;
                        this.filteredFeeCodeList = this.feeCodeList;
                    }
                });
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
        if (this.ach.OtherFeeCode === undefined || this.ach.OtherFeeCode === null) {
            this.isFeeCodeValid = false;
            return;
        }

        let matches: number = this.feeCodeList.filter(e => e.Description.toLowerCase() === event.srcElement.value.toLowerCase()).length;
        if (event.srcElement.value && matches <= 0) {
            this.isFeeCodeValid = false;
            return;
        }
        if (matches === 1) {
            this.ach.OtherFeeCode = this.feeCodeList.find(e => e.Description.toLowerCase() === event.srcElement.value.toLowerCase());
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

    isSaveDisabled() {
        if (this.ach.Schedule.Frequency == null || this.ach.Schedule.Frequency == undefined) {
            return true;
        }

        if (this.ach.Account.PrePayRestriction === 'true' && +this.ach.ExcessAmount > 250) {
            return true;
        }

        if (this.ach.HowToApply != undefined && this.ach.HowToApply.Id === 10 && !this.isFeeCodeValid) {
            return true;
        }

        return false;
    }
}