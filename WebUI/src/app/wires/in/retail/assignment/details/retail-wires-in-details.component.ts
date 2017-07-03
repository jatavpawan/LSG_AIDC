import { Component, OnInit, Input } from '@angular/core';

import { WireInDetailsModel } from '../../../../../shared/models/wires/wire-in-details.model';
import { WireInSender } from '../../../../../shared/models/wires/wire-in-sender.model';
import { WireInBeneficiary } from '../../../../../shared/models/wires/wire-in-beneficiary.model';
import { WireInOther } from '../../../../../shared/models/wires/wire-in-other.model';
import { WiresInDataService } from '../../../../../core/services/wires/wires-in-data.service';
import { GrowlerMediatorService } from '../../../../../core/services/mediators/growler-mediator.service';

@Component({
    selector: 'retail-wires-in-details',
    templateUrl: 'retail-wires-in-details.component.html',
    styleUrls: ['retail-wires-in-details.component.scss']
})
export class RetailWiresInDetailsComponent implements OnInit {

    @Input() incomingWireId: number;
    wiresIn: WireInDetailsModel;
    searchMode: string;

    constructor(public wiresDataService: WiresInDataService, public growler: GrowlerMediatorService) {
    }

    ngOnInit() {
        this.initializeComponent();
    }

    initializeComponent() {
        this.wiresIn = new WireInDetailsModel();
        this.wiresIn.WireInSender = new WireInSender();
        this.wiresIn.WireInBeneficiary = new WireInBeneficiary();
        this.wiresIn.WireInOther = new WireInOther();
        this.getWireDetail();
    }

    getWireDetail() {
        this.wiresDataService.getWireDetailsById(this.incomingWireId)
            .subscribe((ret: WireInDetailsModel) => {
                this.wiresIn = ret;
            },
            (err: any) => {
                this.growler.growlError("Error", "Error getting wire in");
            });
    }
};