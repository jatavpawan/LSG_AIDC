
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";

import { AchRejectConfirmationComponent } from './ach-reject-confirmation.component';
import { AchTransaction } from "../../shared/models/ach/ach-transaction.model";
import { MultiSelectValue } from "../../shared/models/multi-select-value.model";
import { DateFormatPipe } from "../../shared/pipes/date-format.pipe";
import { AchDataService } from "../../core/services/ach/ach-data.service";
import { GrowlerMediatorService } from "../../core/services/mediators/growler-mediator.service";
import { CustomerService } from "../../core/services/customer.service";
import { AchRejectConfirmationMediatorService} from
    "../../core/services/mediators/ach-reject-confirmation-mediator.service";

@Component({
    selector: 'ach-reject',
    templateUrl: 'ach-reject.component.html',
    styleUrls: ['ach-reject.component.scss']
})
export class AchRejectComponent implements OnInit {

    rejectAchData: AchTransaction[];
    customerId: number;

    accountNumberMultiSelects: MultiSelectValue[];
    amountMultiSelects: MultiSelectValue[];
    companyNameMultiSelects: MultiSelectValue[];
    transactionDateMultiSelects: MultiSelectValue[];
    formatPipe: DateFormatPipe;
    selectedRejectAchData: AchTransaction;
    
    constructor(private router: Router, private route: ActivatedRoute,
        public achDataService: AchDataService,
        public dialogService: DialogService,
        public growlerMediatorService: GrowlerMediatorService,
        public customerService: CustomerService,
        public achRejectConfirmationMediatorService: AchRejectConfirmationMediatorService) {

        this.formatPipe = new DateFormatPipe();
        this.achRejectConfirmationMediatorService.refreshRejectsChanged$.subscribe((refresh: boolean) => this.refreshRejects(refresh));
    }

    ngOnInit() {
        this.selectedRejectAchData = undefined;
        this.getRouteParams();
    }

    refreshRejects(refresh: boolean) {
        if (refresh) {
            if (!this.customerId) {
                this.customerId = this.customerService.selectedCustomer.Id;
            }

            this.getRejectAchData(this.customerId);
        }
    }

    getRouteParams() {
        this.route.params.subscribe((params) => {
            this.customerId = +params['customerId'];
            if (this.customerId !== 0) {
                this.getRejectAchData(this.customerId);

            }
        });
    }

    getRejectAchData(customerId: number) {
        this.achDataService.getRejectAchData(customerId)
            .subscribe((ret:AchTransaction[]) => {
                if (ret && ret.length > 0) {
                    this.rejectAchData = ret;
                    this.applyMultiSelects();
                } else {
                    this.growlerMediatorService.growlWarn('Warning', 'No ACH Data for Current Customer');
                }
            }, (err) => {
                this.growlerMediatorService.growlError('Error', 'Error getting ACH Data');
            });
    }

    openConfirmDelete(item: AchTransaction) {
        this.selectedRejectAchData = Object.assign({}, item);
        this.dialogService.addDialog(AchRejectConfirmationComponent,
            {
                achRejection: item
            }).subscribe((isConfirmed) => {
                this.selectedRejectAchData = undefined;
            });
    }

    private applyMultiSelects() {
        this.accountNumberMultiSelects = [];
        this.amountMultiSelects = [];
        this.companyNameMultiSelects = [];
        this.transactionDateMultiSelects = [];

        if (this.rejectAchData && this.rejectAchData.length > 0) {
            for (var i = 0; i < this.rejectAchData.length; i++) {

                this.rejectAchData[i].DisplayAmount = this.rejectAchData[i].Amount.toString();

                this.rejectAchData[i]
                    .ExternalAccountNumber = `${this.customerService.selectedCustomer.Cif}-${this.rejectAchData[i].ExternalAccountNumber}`;

                if (this.accountNumberMultiSelects.filter(e => e.value === this.rejectAchData[i].ExternalAccountNumber).length === 0) {
                    this.accountNumberMultiSelects.push(new MultiSelectValue(this.rejectAchData[i].ExternalAccountNumber, this.rejectAchData[i].ExternalAccountNumber));
                }


                if (this.amountMultiSelects.filter(e => e.value === this.rejectAchData[i].Amount.toString()).length === 0) {
                    this.amountMultiSelects.push(new MultiSelectValue(`$${this.rejectAchData[i].Amount.toString()}`, this.rejectAchData[i].Amount.toString()));
                }

                if (this.companyNameMultiSelects.filter(e => e.value === this.rejectAchData[i].CompanyName).length === 0) {
                    this.companyNameMultiSelects.push(new MultiSelectValue(this.rejectAchData[i].CompanyName, this.rejectAchData[i].CompanyName));
                }

                if (this.transactionDateMultiSelects.filter(e => this.formatPipe.transform(e.value, 'MM/DD/YYYY') === this.formatPipe.transform(this.rejectAchData[i].TransactionDate, 'MM/DD/YYYY')).length === 0) {
                    this.transactionDateMultiSelects.push(new MultiSelectValue(this.formatPipe.transform(this.rejectAchData[i].TransactionDate, 'MM/DD/YYYY'), this.rejectAchData[i].TransactionDate));
                }
            }
        }
    }

    public getDynamicAutoId(name: string, id: string) {
        return name + id;
    }
}