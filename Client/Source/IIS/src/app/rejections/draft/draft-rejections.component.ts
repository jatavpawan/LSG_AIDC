import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { CurrencyPipe } from '@angular/common';
import { CurrencyFormatPipe } from "../../shared/pipes/currency-format.pipe";

import { GrowlerMediatorService } from '../../core/services/mediators/growler-mediator.service';
import { CustomerService } from '../../core/services/customer.service';
import { ConfirmModalComponent } from '../../shared/modals/confirm-modal/confirm-modal.component';
import { DownloadCsvService } from '../../shared/export/downLoadCsv.service';
import { DraftTransaction } from '../../shared/models/drafts/draft-transaction.model';
import { DraftsDataService } from '../../core/services/drafts/drafts-data.service';
import { CentralCodesDataService } from '../../core/services/central-codes-data.service';
import { DraftRejection } from '../../shared/models/drafts/draft-rejection.model';

@Component({
    selector: 'draft-rejections',
    templateUrl: 'draft-rejections.component.html',
    styleUrls: ['draft-rejections.component.scss']
})
export class DraftRejectionsComponent implements OnInit {

    draftRejections: DraftTransaction[];
    ng2CurrencyPipe: CurrencyPipe;
    currencyPipe: any;
    selectedAchRejection: DraftTransaction;

    constructor(public draftDataService: DraftsDataService,
        public centralCodesDataService: CentralCodesDataService,
        public dialogService: DialogService,
        public growlerMediatorService: GrowlerMediatorService,
        public customerService: CustomerService,
        public downloadCsvService: DownloadCsvService) {
        this.currencyPipe = new CurrencyFormatPipe();
        this.ng2CurrencyPipe = new CurrencyPipe('USD');
    }

    ngOnInit() {
        this.getDraftRejections();
        this.customerService.selectedCustomer = undefined;
        this.customerService.noCustomerSelectedText = '';
        this.selectedAchRejection = undefined;
    }

    ngOnDestroy() {
        this.customerService.noCustomerSelectedText = 'No Customer Selected';
    }

    getDraftRejections() {
        this.draftDataService.getDraftRejectionsData()
            .subscribe((ret: DraftRejection[]) => {
                if (ret) {
                    this.draftRejections = ret;
                }
            },
            (err: any) => {
                this.growlerMediatorService.growlError("Error", "Error getting draft rejections data: " + err);
            });
    }

    getDynamicAutoId(name: string, id: string) {
        return name + id;
    }

    deleteRejected(draftTransaction: DraftTransaction) {
        this.selectedAchRejection = Object.assign({}, draftTransaction);

        this.dialogService.addDialog(ConfirmModalComponent,
            {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete this draft rejection for ${this.currencyPipe.transform(this.ng2CurrencyPipe.transform(draftTransaction.Amount, 'USD', true, ''))}?`,
                confirmText: 'Yes',
                cancelText: 'No'
            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.deleteDraftRejections(draftTransaction);
                }
                this.selectedAchRejection = undefined;
            });
    }

    public deleteDraftRejections(draftTransaction: DraftTransaction) {
        this.draftDataService.deleteDraftRejections(draftTransaction.DraftId)
            .subscribe((ret: boolean) => {
                this.getDraftRejections();
                if (ret) {
                    this.growlerMediatorService.growlSuccess('Success', 'Draft rejection has been deleted successfully');
                } else {
                    this.growlerMediatorService.growlWarn('Warning', 'Draft rejection deletion was unsuccessfull');
                }
            },
            (err: any) => {
                this.growlerMediatorService.growlError('Error', 'draft Rejection deletion failed');
            });
    }

    public draftRejectionsExport(dataTable: any) {
        this.downloadCsvService.downloadCsv(dataTable, ',', 'Draft Rejections', 'DraftRejections');
    }
};