import { GrowlerMediatorService } from "../services/mediators/growler-mediator.service";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Http, Response } from "@angular/http";
import { VendorDeliveryMaterialReceive } from "../../shared/models/review/vendorreceive";

@Injectable()
export class VendorDeliveryDataService {

    public serverUrl: string;

    constructor(private http: Http, private growler: GrowlerMediatorService) {
        this.serverUrl = 'http://localhost:55227/';
    }

    getVendorDeliveryMaterialReceiveData(): Observable<VendorDeliveryMaterialReceive[]> {
        let url = 'http://localhost:55227/';

        let mockData: VendorDeliveryMaterialReceive[] = [];

        let vendorDeliveryMaterialReceive1 = new VendorDeliveryMaterialReceive();

        vendorDeliveryMaterialReceive1.Sap_PoId = '4502211679';
        vendorDeliveryMaterialReceive1.Sap_MaterialId = '1037531';
        vendorDeliveryMaterialReceive1.Sap_Description = 'Potato Chips';
        vendorDeliveryMaterialReceive1.Sap_OrderUoM = 'CS';
        vendorDeliveryMaterialReceive1.QuantityExpected = 1;
        vendorDeliveryMaterialReceive1.Sap_BaseUoM = 'CS';
        vendorDeliveryMaterialReceive1.QuantityNormalDistribution = 1;

        mockData.push(vendorDeliveryMaterialReceive1);

        let vendorDeliveryMaterialReceive2 = new VendorDeliveryMaterialReceive();
        vendorDeliveryMaterialReceive2.Sap_PoId = '4502211680';
        vendorDeliveryMaterialReceive2.Sap_MaterialId = '1045396';
        vendorDeliveryMaterialReceive2.Sap_Description = 'Peanuts';
        vendorDeliveryMaterialReceive2.Sap_OrderUoM = 'CS';
        vendorDeliveryMaterialReceive2.QuantityExpected = 1;
        vendorDeliveryMaterialReceive2.Sap_BaseUoM = 'CS';
        vendorDeliveryMaterialReceive2.QuantityNormalDistribution = 1;

        mockData.push(vendorDeliveryMaterialReceive2);

        let vendorDeliveryMaterialReceive3 = new VendorDeliveryMaterialReceive();
        vendorDeliveryMaterialReceive3.Sap_PoId = '4502211681';
        vendorDeliveryMaterialReceive3.Sap_MaterialId = '1047415';
        vendorDeliveryMaterialReceive3.Sap_Description = 'Strawberry Yogurt';
        vendorDeliveryMaterialReceive3.Sap_OrderUoM = 'CS';
        vendorDeliveryMaterialReceive3.QuantityExpected = 1;
        vendorDeliveryMaterialReceive3.Sap_BaseUoM = 'CS';
        vendorDeliveryMaterialReceive3.QuantityNormalDistribution = 1;

        mockData.push(vendorDeliveryMaterialReceive3);

        let vendorDeliveryMaterialReceive4 = new VendorDeliveryMaterialReceive();
        vendorDeliveryMaterialReceive4.Sap_PoId = '4502211682';
        vendorDeliveryMaterialReceive4.Sap_MaterialId = '1021718';
        vendorDeliveryMaterialReceive4.Sap_Description = 'Peanuts';
        vendorDeliveryMaterialReceive4.Sap_OrderUoM = 'CS';
        vendorDeliveryMaterialReceive4.QuantityExpected = 1;
        vendorDeliveryMaterialReceive4.Sap_BaseUoM = 'CS';
        vendorDeliveryMaterialReceive4.QuantityNormalDistribution = 1;

        mockData.push(vendorDeliveryMaterialReceive4);

        let vendorDeliveryMaterialReceive5 = new VendorDeliveryMaterialReceive();
        vendorDeliveryMaterialReceive5.Sap_PoId = '4502211683';
        vendorDeliveryMaterialReceive5.Sap_MaterialId = '1035613';
        vendorDeliveryMaterialReceive5.Sap_Description = 'Blueberry Yogurt';
        vendorDeliveryMaterialReceive5.Sap_OrderUoM = 'CS';
        vendorDeliveryMaterialReceive5.QuantityExpected = 1;
        vendorDeliveryMaterialReceive5.Sap_BaseUoM = 'CS';
        vendorDeliveryMaterialReceive5.QuantityNormalDistribution = 1;

        mockData.push(vendorDeliveryMaterialReceive5);

        let vendorDeliveryMaterialReceive6 = new VendorDeliveryMaterialReceive();
        vendorDeliveryMaterialReceive6.Sap_PoId = '4502211684';
        vendorDeliveryMaterialReceive6.Sap_MaterialId = '1025941';
        vendorDeliveryMaterialReceive6.Sap_Description = 'Salmon - Alaskan';
        vendorDeliveryMaterialReceive6.Sap_OrderUoM = 'CS';
        vendorDeliveryMaterialReceive6.QuantityExpected = 1;
        vendorDeliveryMaterialReceive6.Sap_BaseUoM = 'CS';
        vendorDeliveryMaterialReceive6.QuantityNormalDistribution = 1;

        mockData.push(vendorDeliveryMaterialReceive6);

        let vendorDeliveryMaterialReceive7 = new VendorDeliveryMaterialReceive();
        vendorDeliveryMaterialReceive7.Sap_PoId = '4502211684';
        vendorDeliveryMaterialReceive7.Sap_MaterialId = '1045768';
        vendorDeliveryMaterialReceive7.Sap_Description = 'Blueberry Yogurt';
        vendorDeliveryMaterialReceive7.Sap_OrderUoM = 'CS';
        vendorDeliveryMaterialReceive7.QuantityExpected = 1;
        vendorDeliveryMaterialReceive7.Sap_BaseUoM = 'CS';
        vendorDeliveryMaterialReceive7.QuantityNormalDistribution = 1;

        mockData.push(vendorDeliveryMaterialReceive7);

        let vendorDeliveryMaterialReceive8 = new VendorDeliveryMaterialReceive();
        vendorDeliveryMaterialReceive8.Sap_PoId = '4502211685';
        vendorDeliveryMaterialReceive8.Sap_MaterialId = '1023278';
        vendorDeliveryMaterialReceive8.Sap_Description = 'Peanuts';
        vendorDeliveryMaterialReceive8.Sap_OrderUoM = 'CS';
        vendorDeliveryMaterialReceive8.QuantityExpected = 1;
        vendorDeliveryMaterialReceive8.Sap_BaseUoM = 'CS';
        vendorDeliveryMaterialReceive8.QuantityNormalDistribution = 1;

        mockData.push(vendorDeliveryMaterialReceive8);

        return Observable.of(mockData);

        //return this.http.get(this.serverUrl + `rejections`, this.settingService.getDefaultHeaders())
        //    .map((response: Response) => {
        //        return response.json();
        //    }).catch((error: any) => {
        //        return this.handleError(error, 'Error retrieving ACH Rejections.');
        //    });
    }

}