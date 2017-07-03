import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';

import { WiresInDataService } from '../../../core/services/wires/wires-in-data.service';
import { GrowlerMediatorService } from '../../../core/services/mediators/growler-mediator.service';
import { WireInAssignmentModel } from '../../../shared/models/wires/wire-in-assignment.model';
import { WiresInAssignmentComponent } from './assignment/wires-in-assignment.component';
import {WireInModel} from '../../../shared/models/wires/wire-in.model';

@Component({
    selector: 'wires-in',
    templateUrl: 'wires-in.component.html'
})
export class WiresInComponent implements OnInit {

    wiresInList: WireInModel[];

    constructor(public wiresDataService: WiresInDataService, public growler: GrowlerMediatorService, public dialogService: DialogService) { }

    ngOnInit() {
        this.getWiresIn();
    }

    getWiresIn() {
        this.wiresDataService.getWiresIn()
            .subscribe((ret: WireInModel[]) => {
                if (ret && ret.length > 0) {
                    this.wiresInList = ret;
                }
            },
            (err: any) => {
                this.growler.growlError("Error", "Error getting wires in");
            });
    }

    insertWiresInAssignment(wiresInAssignment: WireInAssignmentModel) {
        this.wiresDataService.insertWireInAssignment(wiresInAssignment)
            .subscribe((ret: any) => {
                this.getWiresIn();
                this.growler.growlSuccess('Success', 'Wire In Assigned Successfully');
            },
            (err: any) => {
                this.growler.growlError("Error", "Error creating wire in assignment");
            });
    }

    openAssign(wireInRow: any) {
        this.dialogService.addDialog(WiresInAssignmentComponent,
            ({
                wiresIn: wireInRow
            }) as any).subscribe((result: WireInAssignmentModel) => {
                if (result && result.WireInId) {
                    this.insertWiresInAssignment(result);
                }
                this.dialogService.removeAll();
            });
    }

    public getDynamicAutoId(name: string, id: string) {
        return name + id;
    }
};