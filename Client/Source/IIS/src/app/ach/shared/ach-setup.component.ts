import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankTemplate } from "../../shared/models/ach/bank-template.model";
import { AchMediatorService } from "../../core/services/mediators/ach-mediator.service";

@Component({
    selector: 'ach-setup',
    templateUrl: 'ach-setup.component.html',
    styleUrls: ['ach-setup.component.scss']
})
export class AchSetupComponent {
    customerId: number;
    bankTemplateId: number;
    private sub: any;
    achType: string;
    template: BankTemplate;
    isAchTypeDisabled: boolean = false;
    constructor(private route: ActivatedRoute, public achMediatorService: AchMediatorService) {

    }

    ngOnInit() {
        this.getRouteParams();
    }

    getRouteParams() {
        this.sub = this.route.params.subscribe((params) => {
            this.customerId = +params['customerId'];
            this.bankTemplateId = +params['bankTemplateId?'];

            if (this.achMediatorService.copiedAch) {
                this.bankTemplateId = this.achMediatorService.copiedAch.BankTemplate.BankTemplateId;
                this.achType = this.achMediatorService.copiedAch.TransactionDirectionDisplay;
            }
        });
    }

    bankTemplateChanged(event: BankTemplate) {
        this.template = event;
        if(this.template.IsCustomerAccountHolder === false)
        {
            this.achType = 'Out';
            this.isAchTypeDisabled = true;
        }
        else{
            this.isAchTypeDisabled = false;
        }
    }
}