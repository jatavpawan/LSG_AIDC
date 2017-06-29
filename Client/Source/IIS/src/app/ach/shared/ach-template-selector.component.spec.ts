
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AchTemplateSelectorComponent } from './ach-template-selector.component';
import {AchDataService} from "../../core/services/ach/ach-data.service";
import {MockBankTemplateDataService} from "../templates/bank-template/mock-bank-template-data.service";
import { BankTemplate } from "../../shared/models/ach/bank-template.model";
import { GrowlerMediatorService } from '../../core/services/mediators/growler-mediator.service';
import { AchMediatorService } from "../../core/services/mediators/ach-mediator.service";

describe('AchTemplateSelector', () => {

    let comp: AchTemplateSelectorComponent;
    let fixture: ComponentFixture<AchTemplateSelectorComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [AchTemplateSelectorComponent],
            providers: [GrowlerMediatorService, AchMediatorService],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .overrideComponent(AchTemplateSelectorComponent, {
                set: {
                    providers: [
                        { provide: AchDataService, useClass: MockBankTemplateDataService }
                    ]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AchTemplateSelectorComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe('getTemplates method ',() => {
        it('when called with customerId, should call AchDataService.search()',() => {
                let arbitraryCustomerId = 1;
                comp.getTemplates(arbitraryCustomerId);

                expect(comp.achDataService.search(arbitraryCustomerId.toString())).toHaveBeenCalled;
            });
        it('when called without customerId, should not call AchDataService.search()',() => {
                comp.getTemplates(0);

                expect(comp.templates).toBeUndefined();
            });
    });

    describe('templatesSelected method',() => {
        it('when achTemplateId is not undefined, should filter achTemplate and emit',() => {
            spyOn(comp.onSelectedChanged, 'emit');

            comp.bankTemplate = new BankTemplate();
                                    
            comp.templateSelected();       

            expect(comp.onSelectedChanged.emit).toHaveBeenCalled();
        });
        it('when achTemplateId is undefined, should not filter achTemplate and not emit',() => {
            spyOn(comp.onSelectedChanged, 'emit');

            comp.templateSelected();

            expect(comp.onSelectedChanged.emit).toHaveBeenCalledTimes(0);
        });
    });
});
