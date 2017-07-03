
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ICounterDraftModal } from './counter-draft-modal.interface';
import { CounterDraft } from '../../shared/models/drafts/counter-draft.model';
import { DraftsDataService } from '../../core/services/drafts/drafts-data.service';
import { GrowlerMediatorService } from '../../core/services/mediators/growler-mediator.service';
import { CustomerService } from '../../core/services/customer.service';
import { Account } from '../../shared/models/account.model';
import { AccountsDataService } from '../../core/services/accounts-data.service';
import { CentralCodesDataService } from '../../core/services/central-codes-data.service';
import { Office } from '../../shared/models/office.model';
import { UserSettingsDataService } from '../../core/services/user-settings-data.service';
import { UserSetting } from '../../shared/models/user-setting.model';

@Component({
    selector: 'ta-counter-draft',
    templateUrl: 'counter-draft.component.html',
    styleUrls: ['counter-draft.component.scss']
})
export class CounterDraftComponent extends DialogComponent<ICounterDraftModal, boolean> implements OnInit {

    counterDraft: CounterDraft;
    eligibleAccounts: Account[];
    userSetting: UserSetting;
    errorMessage: string = '';
    filteredOfficeList: Office[];
    officeList: Office[];
    isOfficeValid: boolean;
    officeHasBeenEdited: boolean;
    customerId: number;
    accounts: Account[];

    regionMisMatchDesc: string = 'This account is outside of your region.  You can only order counter drafts for accounts in your region.';
    endingDraftGreaterThanBeginningDesc: string = 'Ending Draft Number must be greater than or equal to beginning draft number. Please adjust either the beginning or ending draft number.';
    greaterThanZeroDesc: string = 'Beginning and Ending draft numbers must be greater than zero. Please adjust the beginnning and ending draft numbers.';

    constructor(dialogService: DialogService,
        public draftsDataService: DraftsDataService,
        public growlerMediatorService: GrowlerMediatorService,
        public accountsDataService: AccountsDataService,
        public customerService: CustomerService,
        public centralCodesDataService: CentralCodesDataService,
        public userSettingsDataService: UserSettingsDataService) {
        super(dialogService);
    }

    ngOnInit() {
        this.populateEligibleAccounts();
        this.populateOffices();

        if (this.counterDraft.CounterDraftId === 0) {
            this.counterDraft = new CounterDraft();
            this.counterDraft.LASAccountNumber = 0;
            this.counterDraft.CustomerId = this.customerId;
        }
        this.officeHasBeenEdited = false;

        this.populateUserSetting();
    }

    populateEligibleAccounts() {
        this.accountsDataService.getCounterDraftEligibleAccounts(this.customerService.selectedCustomer.Id)
            .subscribe((results: Account[]) => {
                this.eligibleAccounts = results;
            });
    }

    populateOffices() {
        this.centralCodesDataService.getOffices()
            .subscribe((results: Office[]) => {
                this.officeList = results;
            });
    }

    populateUserSetting() {
        this.userSettingsDataService.getUserSettings()
            .subscribe((results: UserSetting) => {
                this.userSetting = results;
            });
    }

    filterEligibleAccounts() {
        return this.eligibleAccounts.filter(item => item.AccountNumber === this.counterDraft.LASAccountNumber);
    }

    public submit() {
        this.errorMessage = '';

        this.accounts = this.filterEligibleAccounts();

        if (this.accounts && this.accounts.length > 0) {
            if (this.accounts[0].Office.RegionId !== this.userSetting.RegionId) {
                this.growlerMediatorService.growlError('Error',
                    this.regionMisMatchDesc);
                this.errorMessage = this.regionMisMatchDesc;
            } else if (this.counterDraft.EndingDraftNumber < this.counterDraft.BeginningDraftNumber) {
                this.growlerMediatorService.growlError('Error',
                    this.endingDraftGreaterThanBeginningDesc);
                this.errorMessage = this.endingDraftGreaterThanBeginningDesc;
            }
            else if (this.counterDraft.EndingDraftNumber <= 0 || this.counterDraft.BeginningDraftNumber <= 0) {
                this.growlerMediatorService.growlError('Error',
                    this.greaterThanZeroDesc);
                this.errorMessage = this.greaterThanZeroDesc;
            }
            else {
                this.draftsDataService.insertCounterDraft(this.counterDraft)
                    .subscribe((ret: boolean) => {
                        if (ret) {
                            this.growlerMediatorService.growlSuccess('Success', 'Counter Draft successfully issued.');
                            this.close();
                        }
                    });
            }
        } else {
            this.growlerMediatorService.growlError('Error', 'Could not retrieve region for selected account.');
        }
    }

    public controlValueChanged() {
        this.errorMessage = '';
    }

    officeSearch(event: any) {
        if (event.query && event.query.length > 0) {
            this.filteredOfficeList = this.officeList.filter(e => e.OfficeName.toLowerCase().includes(event.query.toLowerCase()));
        } else {
            this.filteredOfficeList = this.officeList;
        }
    }

    validateSelectedOffice(event: any) {
        this.officeHasBeenEdited = true;
        if (this.counterDraft.Office === undefined || this.counterDraft.Office === null) {
            this.isOfficeValid = false;
            return;
        }

        let matches: number = this.officeList.filter(e => e.OfficeName.toLowerCase() === event.srcElement.value.toLowerCase()).length;
        if (event.srcElement.value && matches <= 0) {
            this.isOfficeValid = false;
            return;
        }
        if (matches === 1) {
            this.counterDraft.Office = this.officeList.find(e => e.OfficeName.toLowerCase() === event.srcElement.value.toLowerCase());
        }
        this.isOfficeValid = true;
    }

    officeSelected(event: any) {
        this.isOfficeValid = true;
    }

    handleDropdownClick(event: any) {
        this.filteredOfficeList = [];
        setTimeout(() => {
            this.filteredOfficeList = this.officeList;
        },
            100);
    }
}


