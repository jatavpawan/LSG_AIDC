import { Component, OnInit } from '@angular/core';
import { DialogService } from "ng2-bootstrap-modal";

import * as moment from 'moment';
import { IMyOptions } from 'mydatepicker';

import { Draft } from "../../../shared/models/drafts/draft.model";
import { DraftSearch } from "../../../shared/models/drafts/draft-search.model";
import { DraftsDataService } from "../../../core/services/drafts/drafts-data.service";
import { GrowlerMediatorService } from "../../../core/services/mediators/growler-mediator.service";
import { EditDraftModalComponent } from "../../modals/edit-draft-modal.component";
import { EmailDraftModalComponent } from "../../modals/email-draft-modal.component";
import { PrintDraftModalComponent } from "../../modals/print-draft-modal.component";
import { CustomerService } from "../../../core/services/customer.service";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ta-global-draft-search',
    templateUrl: 'global-search.component.html',
    styleUrls: ['global-search.component.scss']
})
export class GlobalDraftSearchComponent implements OnInit {
    public drafts: Draft[] = [];
    public searchObject: DraftSearch;
    public selectedDrafts: Draft[] = [];
    public errorMessage: string = '';
    public searching: boolean = false;
    public currentPage: number;
    public allSelected: boolean;
    private datePickerOptions: IMyOptions;
    public viewOrEdit: string;
    public sortField: string = null;
    public sortOrder: number = null;
    public selectedDraft: Draft;

    constructor(private draftsDataService: DraftsDataService,
        private growlerMediatorService: GrowlerMediatorService,
        public dialogService: DialogService,
        public customerService: CustomerService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.initializeObjects();

        if (this.customerService.selectedCustomer == undefined || this.customerService.selectedCustomer == null) {
            this.viewOrEdit = "Edit";
            this.sortField = "Date";
            this.sortOrder = -1;
        } else {
            this.viewOrEdit = "View";
            this.sortField = null;
            this.sortOrder = null;
        }
    }

    ngOnDestroy() {
        this.customerService.noCustomerSelectedText = 'No Customer Selected';
    }

    initializeObjects() {
        this.searchObject = new DraftSearch();
        this.searchObject.DraftNumberList = [];

        this.selectedDrafts = [];
        this.currentPage = 1;
        this.allSelected = false;
        this.datePickerOptions = {
            dateFormat: 'mm/dd/yyyy',
            disableDays: [],
            disableWeekends: false,
            todayBtnTxt: 'Today',
            firstDayOfWeek: 'su',
            sunHighlight: true,
            height: '1.875rem',
            inline: false,
            selectionTxtFontSize: '14px'
        }

        if (this.route.toString().includes('globalSearch')) {
            this.customerService.selectedCustomer = undefined;
            this.customerService.noCustomerSelectedText = '';
        }

        this.selectedDraft = undefined;
    }

    public toggleCriteria() {
    }

    public getDrafts(event: any) {

        if (event &&
            event.srcElement &&
            event.srcElement.parentElement &&
            event.srcElement.parentElement.className.includes('chips')) {
            return;
        }

        this.drafts = [];

        if (!this.hasSearchInputErrors()) {
            this.searching = true;
            this.errorMessage = '';
            this.formatSearchObject();

            if (this.customerService.selectedCustomer && this.customerService.selectedCustomer.Id > 0) {
                this.searchObject.CustomerId = this.customerService.selectedCustomer.Id;
            }

            this.getDraftList();
        }
    }

    public getDraftList() {
        this.draftsDataService.getDraftsSearch(this.searchObject)
            .subscribe((ret: Draft[]) => {
                if (ret && ret.length > 0) {
                    this.drafts = ret;
                }
                this.searching = false;
            },
            (err: any) => {
                this.growlerMediatorService.growlError("Error", "Error getting drafts: " + err);
                this.searching = false;
            });
    }

    public hasSearchInputErrors() {
        if (this.areAllFieldsEmpty()) {
            this.errorMessage = 'Please provide a search input.';
            this.growlerMediatorService.growlError("Error", "Please provide search input.");
            return true;
        } else if (!this.areValuesValid()) {
            this.growlerMediatorService.growlError("Error", this.errorMessage);
            return true;
        }
        this.errorMessage = '';
        return false;
    }

    public areAllFieldsEmpty() {
        if (this.searchObject &&
            !this.searchObject.Cif &&
            !this.searchObject.AccountNumber &&
            (!this.searchObject.FromDate || this.searchObject.FromDate === '') &&
            (!this.searchObject.ToDate || this.searchObject.ToDate === '') &&
            !this.searchObject.FromAmount &&
            !this.searchObject.ToAmount &&
            !this.searchObject.FromDraftNumber &&
            !this.searchObject.ToDraftNumber &&
            (!this.searchObject.DraftNumberList || this.searchObject.DraftNumberList.length <= 0)) {
            return true;
        }

        return false;
    }

    public areValuesValid() {
        if (this.searchObject.Cif && !(this.searchObject.Cif > 0)) {
            this.errorMessage = 'Please provide a valid CIF.';
            return false;
        }
        if (this.searchObject.AccountNumber && !(this.searchObject.AccountNumber >= 0)) {
            this.errorMessage = 'Please provide a valid Note Number.';
            return false;
        }
        if (this.searchObject.FromDate &&
            this.searchObject.ToDate &&
            (moment(this.searchObject.ToDate) < moment(this.searchObject.FromDate))) {
            this.errorMessage = 'From Date must be earlier than the To Date.';
            return false;
        }
        if (this.searchObject.FromAmount &&
            this.searchObject.ToAmount &&
            (this.searchObject.ToAmount < this.searchObject.FromAmount)) {
            this.errorMessage = 'From Amount must be less than the To Amount.';
            return false;
        }
        if (this.searchObject.FromDraftNumber &&
            this.searchObject.ToDraftNumber &&
            (this.searchObject.ToDraftNumber < this.searchObject.FromDraftNumber)) {
            this.errorMessage = 'From Draft Number must be less than the To Draft Number.';
            return false;
        }

        if (this.searchObject && ((this.searchObject.FromDraftNumber <= 0 || this.searchObject.ToDraftNumber <= 0) && (this.searchObject.FromDraftNumber != null && this.searchObject.ToDraftNumber != null))) {
            this.errorMessage = 'Please provide a valid Draft Number greater than 0.';
            return false;
        }

        if (this.searchObject && ((this.searchObject.FromAmount <= 0 || this.searchObject.ToAmount <= 0) && (this.searchObject.FromAmount != null && this.searchObject.ToAmount != null))) {
            this.errorMessage = 'Please provide a valid Amount greater than 0.';
            return false;
        }

        return true;
    }


    public clear() {
        this.drafts = [];
        this.searchObject = new DraftSearch();
        this.searchObject.DraftNumberList = [];
        this.errorMessage = '';
    }

    public clearErrorMessage() {
        if (this.searchObject.FromDraftNumber === 0 || this.searchObject.FromDraftNumber === null) {
            this.searchObject.FromDraftNumber = undefined;
        }
        if (this.searchObject.ToDraftNumber === 0 || this.searchObject.ToDraftNumber === null) {
            this.searchObject.ToDraftNumber = undefined;
        }
        this.errorMessage = '';
    }

    public openEditor(selectedDraft: Draft) {
        this.selectedDraft = Object.assign({}, selectedDraft);

        let editDraft = Object.assign({}, selectedDraft);

        this.dialogService.addDialog(EditDraftModalComponent,
            {
                draft: editDraft
            }).subscribe((result) => {
                if (result) {
                    this.getDraftList();
                }
            this.selectedDraft = undefined;
        });
    }

    public formatAmount() {
        if (this.searchObject.ToAmount === 0 || this.searchObject.ToAmount === null) {
            this.searchObject.ToAmount = undefined;
        }

        if (this.searchObject.FromAmount === 0 || this.searchObject.FromAmount === null) {
            this.searchObject.FromAmount = undefined;
        }

        this.clearErrorMessage();
    }

    public emailDraft(draft: Draft) {
        let singleDraftArray: Draft[] = [];
        this.selectedDraft = Object.assign({}, draft);

        singleDraftArray.push(draft);
        this.dialogService.addDialog(EmailDraftModalComponent,
            {
                drafts: singleDraftArray
            }).subscribe((result) => {
                this.selectedDraft = undefined;
            });
    }

    public printDraft(draft: Draft) {
        let singleDraftArray: Draft[] = [];
        this.selectedDraft = Object.assign({}, draft);

        singleDraftArray.push(draft);
        this.dialogService.addDialog(PrintDraftModalComponent,
            {
                drafts: singleDraftArray
            }).subscribe((result) => {
                this.selectedDraft = undefined;
            });
    }

    public getDynamicAutoId(name: string, id: string) {
        return name + id;
    }

    public selectedToggle(item: any) {
        if (item.IsSelectedForAction) {
            item.IsSelectedForAction = false;
            let index: number = this.selectedDrafts.indexOf(item);
            if (index > -1) {
                this.selectedDrafts.splice(index, 1);
                this.allSelected = false;
            }
        } else {
            item.IsSelectedForAction = true;
            this.selectedDrafts.push(item);
        }
    }

    public formatSearchObject() {

        if (this.searchObject.FromAmount && !this.searchObject.ToAmount) {
            this.searchObject.ToAmount = this.searchObject.FromAmount;
        } else if (this.searchObject.ToAmount && !this.searchObject.FromAmount) {
            this.searchObject.FromAmount = this.searchObject.ToAmount;
        }

        if (this.searchObject.FromDraftNumber && !this.searchObject.ToDraftNumber) {
            this.searchObject.ToDraftNumber = this.searchObject.FromDraftNumber;
        } else if (this.searchObject.ToDraftNumber && !this.searchObject.FromDraftNumber) {
            this.searchObject.FromDraftNumber = this.searchObject.ToDraftNumber;
        }

        if ((this.searchObject.FromDate && this.searchObject.FromDate !== '') &&
            (!this.searchObject.ToDate || this.searchObject.ToDate === '')) {
            this.searchObject.ToDate = this.searchObject.FromDate;
        } else if ((this.searchObject.ToDate && this.searchObject.ToDate !== '') &&
            (!this.searchObject.FromDate || this.searchObject.FromDate === '')) {
            this.searchObject.FromDate = this.searchObject.ToDate;
        }
    }

    fromDateSelected(date: string) {
        this.searchObject.FromDate = date;
    }

    toDateSelected(date: string) {
        this.searchObject.ToDate = date;
    }

    emailMultiple() {
        this.dialogService.addDialog(EmailDraftModalComponent,
            {
                drafts: this.selectedDrafts
            }).subscribe((result) => {

            });
    }

    printMultiple() {
        this.dialogService.addDialog(PrintDraftModalComponent,
            {
                drafts: this.selectedDrafts
            }).subscribe((result) => {

            });
    }

    selectAll() {
        let startIndex: number = (this.currentPage - 1) * 8;
        let endIndex: number = startIndex + 7;
        let areAllSelected: boolean = true;
        if (endIndex > this.drafts.length - 1) {
            endIndex = this.drafts.length - 1;
        }

        for (var i in this.drafts) {
            if (+i >= startIndex && +i <= endIndex) {
                if (!this.drafts[i].IsSelectedForAction) {
                    areAllSelected = false;
                    break;
                }
            }
        }


        let count: number = 0;
        for (let draft of this.drafts) {
            if (count >= startIndex && count <= endIndex) {
                if (!areAllSelected) {
                    draft.IsSelectedForAction = true;
                    this.selectedDrafts.push(draft);
                } else {
                    draft.IsSelectedForAction = false;
                    this.selectedDrafts.splice(this.selectedDrafts.indexOf(draft));
                }
            }
            count++;
        }

        this.allSelected = !areAllSelected;
    }

    paginate(event: any) {
        this.currentPage = Math.floor(event.first / event.rows) + 1;
        let startIndex: number = (this.currentPage - 1) * 8;
        let endIndex: number = startIndex + 7;
        let areAllSelected: boolean = true;
        if (endIndex > this.drafts.length - 1) {
            endIndex = this.drafts.length - 1;
        }

        for (var i in this.drafts) {
            if (+i >= startIndex && +i <= endIndex) {
                if (!this.drafts[i].IsSelectedForAction) {
                    areAllSelected = false;
                    break;
                }
            }
        }
        this.allSelected = areAllSelected;
    }

    sort(event: any) {
        this.currentPage = 1;
    }

    draftListAdd(event: any) {
        if (!(event.value && +event.value > 0 && +event.value === Math.floor(+event.value))) {
            this.searchObject.DraftNumberList.splice(this.searchObject.DraftNumberList.indexOf(event.value), 1);
            this.errorMessage = 'Draft list input must be a whole number.';
            this.growlerMediatorService.growlError("Error", "Draft list input must be numeric.");
        } else if (this.searchObject.DraftNumberList.length > 8) {
            this.searchObject.DraftNumberList.splice(this.searchObject.DraftNumberList.indexOf(event.value), 1);
            this.errorMessage = 'Please do not search for more than 8 drafts.';
            this.growlerMediatorService.growlError("Error", "Please do not search for more than 8 drafts.");
        } else {
            this.errorMessage = '';
        }

    }

    isFieldSortable() {
        return this.customerService.selectedCustomer == undefined || this.customerService.selectedCustomer == null;
    }
}