import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";

import { WireInAssignmentModel } from './../../../shared/models/wires/wire-in-assignment.model';
import { WiresInDataService } from "../../../core/services/wires/wires-in-data.service";
import { GrowlerMediatorService } from "../../../core/services/mediators/growler-mediator.service";
import { WireInModel } from '../../../shared/models/wires/wire-in.model';
import { RetailWiresInUnassignComponent } from './unassign/retail-wires-in-unassign.component';
import { RetailWireInUnassignModel } from '../../../shared/models/wires/retail-wire-in-unassign.model';

@Component({
    selector: 'app-retail',
    templateUrl: './retail-wires-in.component.html'
})
export class RetailWiresInComponent implements OnInit {

    wiresInList: WireInModel[];
    officeIds = '377';
    selectedRetailIncomingWire: WireInModel;

    constructor(public wiresDataService: WiresInDataService, public growler: GrowlerMediatorService, public dialogService: DialogService, public router: Router) { }

    ngOnInit() {
        this.getWiresIn();
        this.selectedRetailIncomingWire = undefined;
    }

    getWiresIn() {
        this.wiresInList = [];
        this.wiresDataService.getWiresIn(this.officeIds)
            .subscribe((ret: WireInModel[]) => {
                if (ret && ret.length > 0) {
                    this.wiresInList = ret;
                }
            },
            (err: any) => {
                this.growler.growlError("Error", "Error getting wires in");
            });
    }

    openDetails(wireInRow: any) {
        this.router.navigate([`wires/retailwiresinassign/${wireInRow.WireInId}`]);
    }

    insertRetailWiresInAssignment(wiresInAssignment: WireInAssignmentModel) {
        this.wiresDataService.insertWireInAssignment(wiresInAssignment)
            .subscribe((ret: any) => {
                this.getWiresIn();
                this.growler.growlSuccess('Success', 'Retail Wire In Assigned Successfully');
            },
            (err: any) => {
                this.growler.growlError("Error", "Error creating retail wire in assignment");
            });
    }

    unAssign(wireInRow: any) {
        this.selectedRetailIncomingWire = Object.assign({}, wireInRow);
        this.dialogService.addDialog(RetailWiresInUnassignComponent).subscribe((result: string) => {
                if (result) {
                    let unassignment = new RetailWireInUnassignModel();
                    unassignment.comment = result;
                    this.wiresDataService.unassignWire(wireInRow.WireInId, unassignment).subscribe((result: boolean) => {
                        this.getWiresIn();
                    },
                        (err: any) => {
                            this.growler.growlError("Error", "Error unassigning wires in");
                        });
                }
                this.dialogService.removeAll();

                this.selectedRetailIncomingWire = undefined;
        });
    }

    public getDynamicAutoId(name: string, id: string) {
        return name + id;
    }

}