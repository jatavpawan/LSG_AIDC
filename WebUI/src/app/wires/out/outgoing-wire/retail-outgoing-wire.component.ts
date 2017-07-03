import { CustomerService } from './../../../core/services/customer.service';
import { StandardTemplateComponent } from './standard-template/standard-template.component';
import { Component, OnInit } from '@angular/core';
import {RetailWireOut} from "../../../shared/models/wires/retail-wire-out.model";
import {GenericDropDownModel} from "../../../shared/models/generic-dropdown-model";
import {CentralCodesDataService} from "../../../core/services/central-codes-data.service";
import {GrowlerMediatorService} from "../../../core/services/mediators/growler-mediator.service";
import {Utilities} from "../../../shared/utilities.service";

@Component({
    selector: 'app-outgoing-wire',
    templateUrl: './retail-outgoing-wire.component.html',
    styleUrls: ['./retail-outgoing-wire.component.scss']
})
export class RetailWiresOutComponent implements OnInit {

    public outgoingWire: RetailWireOut;
    public templateTypeList: GenericDropDownModel[];
    public utilities: Utilities;

    constructor(private customerService: CustomerService, private centralCodesDataService: CentralCodesDataService, private growler: GrowlerMediatorService) { }

    ngOnInit() {
        this.initializeObjects();
    }

    initializeObjects() {
        this.outgoingWire = new RetailWireOut();
        this.utilities = new Utilities();
        this.outgoingWire.TemplateType = this.utilities.defaultDropDownValue;
        this.outgoingWire.Description = '';
        this.outgoingWire.ByOrderOf = '';
        const templateTypeCallback = (ret: GenericDropDownModel[]) => {
            if (ret && ret.length > 0) {
                this.templateTypeList = ret;
            }
        };
        this.getWireTypes(templateTypeCallback);
    }

    getWireTypes(successCallback: any) {
        this.centralCodesDataService.getOutgoingTemplateTypeOptions()
            .subscribe(successCallback, (err: any) => {
                this.growler.growlError("Error", "Error getting Template Type Options");
            });
    }

    handleWireChangedEvent(event: RetailWireOut){
        this.outgoingWire = event;
    }
}