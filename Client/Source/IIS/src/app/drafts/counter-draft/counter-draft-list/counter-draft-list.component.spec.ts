import { DateFormatPipe } from './../../../shared/pipes/date-format.pipe';
import { MockDialogService } from './../../../tests/mocks/mock-dialog-service';
import { CounterDraft } from './../../../shared/models/drafts/counter-draft.model';

import { GrowlerMediatorService } from './../../../core/services/mediators/growler-mediator.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component, NO_ERRORS_SCHEMA, OnInit, ViewChild, Input, OnChanges, DoCheck, SimpleChanges } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { NgForm, Validator } from '@angular/forms';

import any = jasmine.any;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CoreModule } from './../../../core/core.module';
import { DialogService } from "ng2-bootstrap-modal";
import { MockGrowlerMediatorService } from '../../../tests/mocks/mock-growler-mediator-service';
import { CounterDraftListComponent } from './counter-draft-list.component';
import { MockDraftDataService } from '../../../tests/mocks/mock-draft-data.service';
import { DraftsDataService } from '../../../core/services/drafts/drafts-data.service';
import { MockActivatedRoute } from '../../../tests/mocks/mock-activated-route';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

describe('CounterDraftListComponent', () => {

    let comp: CounterDraftListComponent;
    let fixture: ComponentFixture<CounterDraftListComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let errorSpy: any;
    let successSpy: any;
    let addDialogSpy: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [CounterDraftListComponent, DateFormatPipe],
            providers: [],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .overrideComponent(CounterDraftListComponent, {
                set: {
                    providers: [
                        { provide: DraftsDataService, useClass: MockDraftDataService }
                        , { provide: ActivatedRoute, useClass: MockActivatedRoute }
                        , { provide: DialogService, useClass: MockDialogService }
                        , { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                    ]
                }
            })
            .compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(CounterDraftListComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;

        comp.customerId = 1;

        errorSpy = spyOn(comp.growlerMediatorService, 'growlError');
        successSpy = spyOn(comp.growlerMediatorService, 'growlSuccess');

        addDialogSpy = spyOn(comp.dialogService, 'addDialog').and.returnValue(Observable.of(true));
    });

    describe('when populateCounterDrafts are called from repo',() => {

        it('should have correct properties',() => {
                comp.populateCounterDrafts(comp.customerId);
                expect(comp.counterDrafts.length).toEqual(2);

                expect(comp.counterDrafts[0].CounterDraftId).toEqual(1);
                expect(comp.counterDrafts[0].CustomerId).toEqual(1);
                expect(comp.counterDrafts[0].LASAccountNumber).toEqual(1234);
                expect(comp.counterDrafts[0].BeginningDraftNumber).toEqual(1);
                expect(comp.counterDrafts[0].EndingDraftNumber).toEqual(10);
                expect(comp.counterDrafts[0].StatusDescription).toEqual('Active');
                expect(comp.counterDrafts[0].IsActive).toEqual(true);
                expect(comp.counterDrafts[0].AuditInfo).toBeTruthy();
                expect(comp.counterDrafts[0].Office).toBeTruthy();

                expect(comp.statusMultiSelects.length).toEqual(2);
            });
    });

    describe('When calling getDynamicAutoId method',() => {
        it('should return data-auto-id-1',() => {
                var name = comp.getDynamicAutoId('data-auto-id-', '1');
                expect(name).toEqual('data-auto-id-1');
            });
    });

    describe('When calling deleteCounterDraft method',() => {
        it('should growl successfully when counterdraftId > 0',() => {
                var draft = new CounterDraft();
                draft.CounterDraftId = 1;

                var name = comp.deleteCounterDraft(draft);

                expect(successSpy.calls.any()).toBe(true, 'growlSuccess');
            });

        it('should growl with failure when counterdraftId < 0',() => {
                var draft = new CounterDraft();
                draft.CounterDraftId = -1;

                var name = comp.deleteCounterDraft(draft);

                expect(errorSpy.calls.any()).toBe(true, 'growlError');
            });
    });

    describe('When calling delete method',() => {
        it('should call addDialog successfully',() => {
                var draft = new CounterDraft();
                draft.CounterDraftId = 1;
                draft.BeginningDraftNumber = 1;
                draft.EndingDraftNumber = 2;

                comp.delete(draft);

                expect(addDialogSpy.calls.any()).toBe(true, 'addDialog');
            });
    });


    describe('When calling addNew method',() => {
        it('should call addDialog successfully',() => {
                comp.addNew();
                expect(addDialogSpy.calls.any()).toBe(true, 'addDialog');
            });
    });

});

//adding comment to get merge to work.