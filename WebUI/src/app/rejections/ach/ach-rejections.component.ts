import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';

import { AchTransaction } from '../../shared/models/ach/ach-transaction.model';
import { AchDataService } from '../../core/services/ach/ach-data.service';
import { GrowlerMediatorService } from '../../core/services/mediators/growler-mediator.service';
import { CustomerService } from '../../core/services/customer.service';
import { ConfirmModalComponent } from '../../shared/modals/confirm-modal/confirm-modal.component';
import { DownloadCsvService } from '../../shared/export/downLoadCsv.service';
import { VendorDeliveryDataService } from "../../core/review/vendor-delivery.service";
import { VendorDeliveryMaterialReceive } from "../../shared/models/review/vendorreceive";

@Component({
    selector: 'ach-rejections',
    templateUrl: 'ach-rejections.component.html',
    styleUrls: ['ach-rejections.component.scss']
})
export class AchRejectionsComponent implements OnInit {

    achRejections: AchTransaction[];
    selectedAchRejection: AchTransaction;
    vendorDeliveryMaterialReceive: VendorDeliveryMaterialReceive[];

    constructor(public growlerMediatorService: GrowlerMediatorService, public vendorDeliveryDataService: VendorDeliveryDataService) { }

    ngOnInit() {
        this.getVendorDeliveryMaterialReceiveData();
    }

    ngOnDestroy() {
    }

    public getVendorDeliveryMaterialReceiveData() {
        this.vendorDeliveryDataService.getVendorDeliveryMaterialReceiveData()
            .subscribe((ret: VendorDeliveryMaterialReceive[]) => {
                if (ret) {
                    this.vendorDeliveryMaterialReceive = ret;
                }
            },
            (err: any) => {
                this.growlerMediatorService.growlError("Error", "Error getting ACH rejections data: " + err);
            });
    }

    public getDynamicAutoId(name: string, id: string) {
        return name + id;
    }
}