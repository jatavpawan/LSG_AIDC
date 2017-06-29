import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';

import { AchTransaction } from '../../shared/models/ach/ach-transaction.model';
import { AchDataService } from '../../core/services/ach/ach-data.service';
import { GrowlerMediatorService } from '../../core/services/mediators/growler-mediator.service';
import { CustomerService } from '../../core/services/customer.service';
import { ConfirmModalComponent } from '../../shared/modals/confirm-modal/confirm-modal.component';
import { DownloadCsvService } from '../../shared/export/downLoadCsv.service';

@Component({
    selector: 'ach-rejections',
    templateUrl: 'ach-rejections.component.html',
    styleUrls: ['ach-rejections.component.scss']
})
export class AchRejectionsComponent implements OnInit {

    achRejections: AchTransaction[];
    selectedAchRejection: AchTransaction;

    constructor(public achDataService: AchDataService,
        public dialogService: DialogService,
        public growlerMediatorService: GrowlerMediatorService,
        public customerService: CustomerService,
        public downloadCsvService: DownloadCsvService) {
    }

    ngOnInit() {
        this.getAchRejections();
        this.customerService.selectedCustomer = undefined;
        this.customerService.noCustomerSelectedText = '';
        this.selectedAchRejection = undefined;
    }

    ngOnDestroy() {
        this.customerService.noCustomerSelectedText = 'No Customer Selected';
    }

    public getAchRejections() {
        this.achDataService.getAchRejectionsData()
            .subscribe((ret: AchTransaction[]) => {
                if (ret) {
                    this.achRejections = ret;
                }
            },
            (err: any) => {
                this.growlerMediatorService.growlError("Error", "Error getting ACH rejections data: " + err);
            });
    }

    public getDynamicAutoId(name: string, id: string) {
        return name + id;
    }

    public deleteRejected(achRejection: AchTransaction) {
        this.selectedAchRejection = Object.assign({}, achRejection);

        this.dialogService.addDialog(ConfirmModalComponent,
            {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete this ACH Rejection for $${achRejection.Amount}?`,
                confirmText: 'Yes',
                cancelText: 'No'
            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.deleteAchRejections(achRejection);
                }
                this.selectedAchRejection = undefined;
            });
    }

    public deleteAchRejections(achRejection: AchTransaction) {
        this.achDataService.deleteAchRejection(achRejection.AchId)
            .subscribe((status: boolean) => {
                if (status) {
                    this.getAchRejections();

                    this.growlerMediatorService.growlSuccess('Success', 'ACH Rejection has been deleted successfully');

                }
                else {
                    this.growlerMediatorService.growlError('Error', 'ACH Rejection deletion failed');
                }
            },
            (err: any) => {
                this.growlerMediatorService.growlError('Error', 'ACH Rejection deletion failed');
            });
    }

    public achRejectionsExport(dataTable: any) {
        this.downloadCsvService.downloadCsv(dataTable, ',', 'ACH Rejections', 'AchRejections');
    }
}