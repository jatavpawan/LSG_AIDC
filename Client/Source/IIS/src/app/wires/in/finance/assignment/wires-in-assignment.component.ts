import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { NgForm } from "@angular/forms";

import { WireInAssignmentModel } from '../../../../shared/models/wires/wire-in-assignment.model';
import { CentralCodesDataService } from '../../../../core/services/central-codes-data.service';
import { GrowlerMediatorService } from '../../../../core/services/mediators/growler-mediator.service';
import { GenericDropDownModel } from '../../../../shared/models/generic-dropdown-model';
import {WireInModel} from '../../../../shared/models/wires/wire-in.model';


export interface IWiresInAssignmentModal {
    wiresIn: WireInModel;
}

@Component({
    selector: 'wires-in-assignment',
    templateUrl: 'wires-in-assignment.component.html',
    styleUrls: ['wires-in-assignment.component.scss']
})
export class WiresInAssignmentComponent extends DialogComponent<IWiresInAssignmentModal, WireInAssignmentModel> implements OnInit, IWiresInAssignmentModal {

    wiresIn: WireInModel;
    wiresInAssignment: WireInAssignmentModel;
    searchMode: string;
    searchSelection: GenericDropDownModel;
    results: GenericDropDownModel[];
    searchPlaceholder: string = 'Enter Search or Select Drop Down';
    submitted: boolean = false;
    @ViewChild('wiresInAssignmentForm') wiresInAssignmentForm: NgForm;

    constructor(public dialogService: DialogService, public centralCodesDataService: CentralCodesDataService, public growler: GrowlerMediatorService) {
        super(dialogService);
    }

    ngOnInit() {
        this.initializeComponent();

    }

    initializeComponent() {
        this.wiresInAssignment = new WireInAssignmentModel();
        this.wiresInAssignment.WireInId = this.wiresIn.WireInId;
        this.searchMode = 'costcenter';         
    }

    getCostCenterByQuery(input: any) {
        this.getCostCenters(input.query);
    }

    getCostCenters(input: string = '') {
        this.centralCodesDataService.getCostCenter(input)
            .subscribe((ret: GenericDropDownModel[]) => {
                    this.results = ret;
                },
                (err: any) => {
                    this.growler.growlError("Error", "Error getting cost centers");
                });
    }

    getGlAccountByQuery(input: any) {
        this.getGlAccounts(input.query);
    }

    getGlAccounts(input: string = '') {
        this.centralCodesDataService.getGlAccount(input)
            .subscribe((ret: GenericDropDownModel[]) => {
                    this.results = ret;
                },
                (err: any) => {
                    this.growler.growlError("Error", "Error getting GL accounts");
                });
    }

    getTypeAheadData(input: any) {
        if (this.searchMode === 'glaccount') {
            this.getGlAccountByQuery(input);
        } else if (this.searchMode === 'costcenter') {
            this.getCostCenterByQuery(input);
        }
    }

    submit() {
        this.submitted = true;

        if (this.wiresInAssignmentForm.invalid) {
            return;
        }        
        this.wiresInAssignment.Comments = this.wiresIn.Comments;
        this.setSelectionId();
        this.confirm();
    }

    setSelectionId() {
        if (this.searchMode === 'glaccount') {
            this.wiresInAssignment.GLAccountId = this.searchSelection.Id;
            this.wiresInAssignment.OfficeId = undefined;
        }
        else if (this.searchMode === 'costcenter') {
            this.wiresInAssignment.OfficeId = this.searchSelection.Id;
            this.wiresInAssignment.GLAccountId = undefined;
        }
    }

    searchModeChanged(event: any) {
        this.searchSelection = undefined;
    }

    confirm() {
        this.result = this.wiresInAssignment;
        this.close();
    }
};