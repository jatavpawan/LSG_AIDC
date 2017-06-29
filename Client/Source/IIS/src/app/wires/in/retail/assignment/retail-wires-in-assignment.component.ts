import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";

import { CentralCodesDataService } from '../../../../core/services/central-codes-data.service';
import { GrowlerMediatorService } from '../../../../core/services/mediators/growler-mediator.service';

@Component({
    selector: 'retail-wires-in-assignment',
    templateUrl: 'retail-wires-in-assignment.component.html',
    styleUrls: ['retail-wires-in-assignment.component.scss']
})
export class RetailWiresInAssignmentComponent implements OnInit {
    
    incomingWireId: number;

    constructor(public centralCodesDataService: CentralCodesDataService, public growler: GrowlerMediatorService, private router: Router, private route: ActivatedRoute, public dialogService: DialogService) {
    }

    ngOnInit() {
        this.getRouteParams();
    }

    getRouteParams() {
        this.route.params.subscribe((params) => {
            this.incomingWireId = +params['wireInId'];
        });
    }
};