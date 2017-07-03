
import { Component, OnInit, ViewChild } from '@angular/core';

import { BankTemplate } from '../../../shared/models/ach/bank-template.model';
import { AchDataService } from "../../../core/services/ach/ach-data.service";
import { AbaModel } from './../../../shared/models/aba.model';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { BankAccountManagerStatus } from '../../../shared/models/ach/bank-account-manager-status.model';
import { IBankTemplateComponentModel } from './bank-template-component.interface';
import { GrowlerMediatorService } from '../../../core/services/mediators/growler-mediator.service';
import {GenericDropDownModel} from '../../../shared/models/generic-dropdown-model';
import { CentralCodesDataService } from '../../../core/services/central-codes-data.service';
import { NgForm, FormControl } from "@angular/forms";

@Component({
    selector: 'bank-template',
    templateUrl: 'bank-template.component.html',
    styleUrls: ['bank-template.component.scss']
})
export class BankTemplateComponent extends DialogComponent<IBankTemplateComponentModel, boolean> implements OnInit {

    @ViewChild('achTemplateForm') achTemplateForm: NgForm;

    accountTypes: GenericDropDownModel[];
    achTemplateData: BankTemplate;
    isAddNew: boolean;
    abaNotFound: boolean = false;

    constructor(private dropDownLookupDataService: CentralCodesDataService
        , private achDataService: AchDataService
        , dialogService: DialogService
        , public growlerMediatorService: GrowlerMediatorService) {
        super(dialogService);
    }

    ngOnInit() {
        if (!this.achTemplateData) {
            this.createNewAchTemplate();
        }
        this.getAccountTypes();
    }

    getAccountTypes() {
        this.dropDownLookupDataService.getAccountTypes()
            .subscribe((accountTypes: GenericDropDownModel[]) => {
                if (accountTypes) {
                    this.accountTypes = accountTypes;
                } else {
                    this.growlerMediatorService.growlError('Error', 'No Account Types returned from service');
                }
            }, (err) => {
                this.growlerMediatorService.growlError('Error', 'Error getting account types: ' + err);
            });
    }

    submit() {
        if (this.achTemplateForm.invalid) {
            return;    
        }

        if (this.accountTypes && this.accountTypes.length > 0) {
            let list: GenericDropDownModel[] = this.accountTypes.filter(item => item.Id === this.achTemplateData.BankAccountType.Id);

            this.achTemplateData.BankAccountType.Description = list[0].Description;
            this.achTemplateData.IsActive = BankAccountManagerStatus.Active;

            this.achDataService.insertAchTemplateCustomer(this.achTemplateData)
                .subscribe((insertedAchTemplate: number) => {
                        if (insertedAchTemplate) {
                            this.growlerMediatorService.growlSuccess('Success', 'Bank template saved successfully');
                            this.close();
                        } else {
                            this.growlerMediatorService.growlError('Error', 'Bank template failed to save');
                        }
                    },
                    (err: any) => {
                        if (err.status === 409) {
                            this.growlerMediatorService.growlError('Error', 'Bank template already exists');
                        } else {
                            this.growlerMediatorService.growlError('Error', 'Bank template failed to save');
                        }
                    });
        }
    }
   
    lookupAba() {
        this.abaNotFound = false;
        this.resetBankTemplateInfo(this.achTemplateData);

        if (this.achTemplateData && this.achTemplateData.AbaRoutingNumber && this.achTemplateData.BankTemplateId === 0) {
            this.achDataService.lookupAba(+this.achTemplateData.AbaRoutingNumber)
                .subscribe((abaModel: AbaModel) => {
                        if (abaModel) {
                            this.achTemplateData.BankName = abaModel.Name;
                            this.achTemplateData.City = abaModel.City;
                            this.achTemplateData.State = abaModel.State;
                        } else {
                            this.abaNotFound = true;
                            this.achTemplateForm.controls["AbaRoutingNumber"].setErrors({ 'invalid': true });
                        }
                    },
                    (err: any) => {
                        this.growlerMediatorService.growlError('Error', 'Error getting ABA data: ' + err);
                    });
        }
    }

    createNewAchTemplate() {
        this.achTemplateData = new BankTemplate();
        this.achTemplateData.BankAccountType = new GenericDropDownModel();
    }

    resetBankTemplateInfo(templateData: BankTemplate) {
        if (templateData) {
            templateData.BankName = undefined;
            templateData.City = undefined;
            templateData.State = undefined;
        }
    }
}