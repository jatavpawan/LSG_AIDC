import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BankTemplate } from "../../shared/models/ach/bank-template.model";
import { AchDataService } from "../../core/services/ach/ach-data.service";
import { GrowlerMediatorService } from "../../core/services/mediators/growler-mediator.service";
import { AchMediatorService } from "../../core/services/mediators/ach-mediator.service";
import { Utilities } from "../../shared/utilities.service";

@Component({
    selector: 'ach-template-selector',
    templateUrl: 'ach-template-selector.component.html',
    styleUrls: ['ach-template-selector.component.scss']
})
export class AchTemplateSelectorComponent implements OnInit {

    templates: BankTemplate[];
    @Input() parentCustomerId: number;
    @Input() bankTemplateId: number;
    @Output() onSelectedChanged = new EventEmitter<BankTemplate>();

    bankTemplate: BankTemplate;
    selectedItem: number;
    isTemplateSelected: boolean = false;
    utilities: Utilities;

    constructor(public achDataService: AchDataService,
        private achMediatorService: AchMediatorService,
        private growlerMediatorService: GrowlerMediatorService) {

        this.utilities = new Utilities();
    }

    ngOnInit() {
        this.initializeObjects();
    }

    public initializeObjects() {
        this.bankTemplate = this.utilities.defaultDropDownValue;

        this.getTemplates(this.parentCustomerId);

        if (this.achMediatorService.copiedAch) {
            this.bankTemplate = this.achMediatorService.copiedAch.BankTemplate;
        }
    }

    public getTemplates(customerId: number): BankTemplate[] {
        if (customerId > 0) {
            this.achDataService.search(customerId.toString())
                .subscribe((ret: BankTemplate[]) => {
                    if (ret) {
                        this.templates = ret.filter(t => t.IsActive);
                        if (this.bankTemplateId && this.templates) {
                            this.bankTemplate = this.templates.find(t => t.BankTemplateId === this.bankTemplateId);
                            this.onSelectedChanged.emit(this.bankTemplate);
                        }
                    } else {
                        this.growlerMediatorService.growlError("Error", "No bank template!");
                    }
                });
        } else {
            return [];
        }
    }

    public templateSelected() {
        if (this.bankTemplate) {
            this.onSelectedChanged.emit(this.bankTemplate);
        }
    }
}