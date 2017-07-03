import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbaModel } from "../../../../../shared/models/aba.model";
import { AchDataService } from "../../../../../core/services/ach/ach-data.service";
import { GrowlerMediatorService } from "../../../../../core/services/mediators/growler-mediator.service";
import {RetailWireOut} from "../../../../../shared/models/wires/retail-wire-out.model";

@Component({
    selector: 'app-receiving-bank',
    templateUrl: './receiving-bank.component.html',
    styleUrls: ['./receiving-bank.component.scss']
})
export class ReceivingBankComponent implements OnInit {
    @Output() onReceivingBankCompleted = new EventEmitter<boolean>();
    @Output() onAbaLookupEvent = new EventEmitter<number>();
    public abaModel: AbaModel;
    public abaFound: boolean;
    public isAbaValid: boolean;
    @Input() outgoingWire: RetailWireOut;

    constructor(private achDataService: AchDataService, private growlerMediatorService: GrowlerMediatorService) { }

    ngOnInit() {
        this.initializeObjects();
    }

    initializeObjects() {
        this.abaModel = new AbaModel();
        this.isAbaValid = true;
    }

    lookupAba(event: any) {
        this.abaModel.AbaRoutingNumber = +event.srcElement.value;
        this.onAbaLookupEvent.emit(this.abaModel.AbaRoutingNumber);
        if (this.abaModel.AbaRoutingNumber > 0) {
            this.isAbaValid = true;
            this.achDataService.lookupAba(+this.abaModel.AbaRoutingNumber)
                .subscribe((abaModel: AbaModel) => {
                    if (abaModel) {
                        this.abaFound = true;
                        this.abaModel.Name = abaModel.Name;
                        this.abaModel.City = abaModel.City;
                        this.abaModel.State = abaModel.State;
                    } else {
                        this.abaFound = false;
                    }
                },
                (err: any) => {
                    this.growlerMediatorService.growlError('Error', 'Error getting ABA data: ' + err);
                });
        } else {
            this.isAbaValid = false;
        }
    }

    receivingBankCompleted() {
        return this.onReceivingBankCompleted.emit(false);
    }
}