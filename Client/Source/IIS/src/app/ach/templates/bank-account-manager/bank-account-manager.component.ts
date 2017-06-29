import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { BankTemplate } from '../../../shared/models/ach/bank-template.model';
import { AchDataService } from '../../../core/services/ach/ach-data.service';

import { DialogService } from "ng2-bootstrap-modal";
import { BankTemplateComponent } from '../bank-template/bank-template.component';
import { ConfirmModalComponent } from '../../../shared/modals/confirm-modal/confirm-modal.component';
import { BankAccountManagerStatus } from '../../../shared/models/ach/bank-account-manager-status.model';

import { StatusTypeFormatPipe } from '../../../shared/pipes/status-type-format.pipe';

import { AccountNumberFormatPipe } from '../../../shared/pipes/account-number-format.pipe';
import { GrowlerMediatorService } from '../../../core/services/mediators/growler-mediator.service';
import { BankAccountManagerMediatorService } from "../../shared/mediators/bank-account-manager-mediator.service";
import { GenericDropDownModel } from '../../../shared/models/generic-dropdown-model';
import { RoutesFactory } from '../../../shared/routes.factory';

@Component({
    selector: 'ta-bank-account-manager',
    templateUrl: 'bank-account-manager.component.html',
    styleUrls: ['bank-account-manager.component.scss']
})
export class BankAccountManagerComponent implements OnInit, OnDestroy {

    templates: BankTemplate[];
    originalTemplates: BankTemplate[];
    selectedTemplate: BankTemplate;

    showTemplate: boolean = false;
    customerId: number;
    private sub: any;

    bankTemplate: BankTemplate;
    dynamicColumnsAdded: boolean;
    shouldDisplayActive: boolean;

    constructor(private achDataService: AchDataService,
        private route: ActivatedRoute,
        public router: Router,
        public dialogService: DialogService,
        public bankAccountMgrMediatorService: BankAccountManagerMediatorService,
        public growlerMediatorService: GrowlerMediatorService) {

        this.dynamicColumnsAdded = false;

        bankAccountMgrMediatorService.viewDetailsChanged$.subscribe((bankTemplate) => this.onViewDetails(bankTemplate));
        bankAccountMgrMediatorService.newAchRequired$.subscribe((bankTemplate) => this.onNewAchRequired(bankTemplate));
        bankAccountMgrMediatorService.deletionRequired$.subscribe((bankTemplate) => this.onDeletionRequired(bankTemplate));
    }

    ngOnInit() {
        this.shouldDisplayActive = true;
        this.selectedTemplate = undefined;

        this.sub = this.route.params.subscribe((params) => {
            this.customerId = +params['customerId'];
            if (this.customerId !== 0) {
                this.getTemplates(this.customerId);
            }
        });

    };

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };

    onViewDetails(bankTemplate: BankTemplate) {
        if (bankTemplate && bankTemplate.BankTemplateId > 0) {
            this.viewDetails(bankTemplate);
        }
    }

    onNewAchRequired(bankTemplate: BankTemplate) {
        if (bankTemplate && bankTemplate.BankTemplateId > 0) {
            this.newAch(bankTemplate);
        }
    }

    onDeletionRequired(bankTemplate: BankTemplate) {
        if (bankTemplate && bankTemplate.BankTemplateId > 0) {
            this.delete(bankTemplate);
        }
    }

    getTemplates(customerId: number): BankTemplate[] {
        if (customerId) {
            this.achDataService.search(customerId.toString())
                .subscribe((ret: BankTemplate[]) => {

                    this.originalTemplates = ret;

                    if (this.shouldDisplayActive && ret) {
                        this.templates = this.originalTemplates.filter(item => item.IsActive);
                    } else {
                        this.templates = this.originalTemplates;
                    }

                    this.applyPipes();
                });
        } else {
            return [];
        }
    };

    public addNew() {
        let template = new BankTemplate();
        template.BankAccountType = new GenericDropDownModel();
        template.CustomerId = this.customerId;
        template.BankTemplateId = 0;

        this.dialogService.addDialog(BankTemplateComponent,
            {
                achTemplateData: template,
                isAddNew: true
            }).subscribe((isConfirmed) => {
                this.getTemplates(this.customerId);
            });
    };

    public viewDetails(template: BankTemplate) {       

        this.selectedTemplate = Object.assign({}, template);
        this.dialogService.addDialog(BankTemplateComponent,
            {
                achTemplateData: template,
                isAddNew: false
            }).subscribe((isConfirmed) => {
            this.selectedTemplate = undefined;
        });
    };

    deleteAchTemplate(template: BankTemplate) {
        this.achDataService.deleteAchTemplate(template.BankTemplateId)
            .subscribe((status: boolean) => {
                if (status) {
                    this.growlerMediatorService.growlSuccess('Success', 'Bank template has been deleted successfully');

                    this.getTemplates(this.customerId);
                }
                else {
                    this.growlerMediatorService.growlError('Error', 'Bank template deletion failed');
                }
            },
            (err: any) => {
                this.growlerMediatorService.growlError('Error', 'Bank template deletion failed');
            });
    }

    public delete(template: BankTemplate) {

        let pipe = new AccountNumberFormatPipe();
        let formattedAccountNumber = pipe.transform(+template.ExternalAccountNumber);
        this.selectedTemplate = Object.assign({}, template);;

        this.dialogService.addDialog(ConfirmModalComponent,
            {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete ${template.AbaRoutingNumber}  ${template.BankName}-${formattedAccountNumber}?`,
                confirmText: 'Yes',
                cancelText: 'No'
            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.deleteAchTemplate(template);
                }

                this.selectedTemplate = undefined;
            },
            (err) => {
                this.growlerMediatorService.growlError('Error', 'Bank template deletion failed');
            });
    }

    public newAch(template: BankTemplate) {
        this.router.navigate([RoutesFactory.createAchWithTemplateRoute(this.customerId, template.BankTemplateId)]);
    }

    private applyPipes() {
        let pipe = new AccountNumberFormatPipe();

        var statusTypeFormatPipe = new StatusTypeFormatPipe();


        if (this.templates && this.templates.length > 0) {
            var i: number;
            for (i = 0; i < this.templates.length; i++) {
                this.templates[i].ExternalAccountNumber = pipe.transform(+this.templates[i].ExternalAccountNumber);
            }

            if (this.originalTemplates && this.originalTemplates.length > 0) {
                for (i = 0; i < this.originalTemplates.length; i++) {
                    this.originalTemplates[i].StatusDisplay = statusTypeFormatPipe.transform(this.originalTemplates[i].IsActive);

                }
            }
        }
    }

    public getDynamicAutoId(name: string, id: string) {
        return name + id;
    }

    public getIsDeleted(item: BankTemplate) {
        if (item && item.IsActive === BankAccountManagerStatus.Deleted) {
            return true;
        }

        return false;
    }

    public onStatusChanged(dt: any, event: any, col: any) {
        if (event && event.value && event.value.length > 0 && event.value[0] === 'Deleted') {
            this.templates = this.originalTemplates;
            this.shouldDisplayActive = false;
        }

    }
}
