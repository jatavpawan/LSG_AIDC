import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from "ng2-bootstrap-modal";
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule } from '@angular/forms';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Draft } from "../../shared/models/drafts/draft.model";
import { DraftsDataService } from "../../core/services/drafts/drafts-data.service";
import { GrowlerMediatorService } from "../../core/services/mediators/growler-mediator.service";
import { MockDraftDataService } from "../../tests/mocks/mock-draft-data.service";
import { MockGrowlerMediatorService } from "../../tests/mocks/mock-growler-mediator-service";
import { MockDialogService } from "../../tests/mocks/mock-dialog-service";
import { EditDraftModalComponent } from "./edit-draft-modal.component";
import { Account } from "../../shared/models/account.model";
import { CustomerService } from "../../core/services/customer.service";
import { MockCustomerService } from "../../tests/mocks/mock-customer.service";
import { Observable } from 'rxjs/Observable';
import { DraftImage } from "../../shared/models/drafts/draft-image.model";
describe('EditDraftModalComponent',
    () => {

        let comp: EditDraftModalComponent;
        let fixture: ComponentFixture<EditDraftModalComponent>;
        let element: HTMLElement;
        let debugEl: DebugElement;
        let spy: any;
        let imageSpy: any;
        let deleteDraftSpy: any;
        let updateDraftSpy: any;

        let testDraft = new Draft();
        testDraft.IsSelectedForAction = false;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, RouterTestingModule],
                declarations: [EditDraftModalComponent],
                providers: [DialogService],
                schemas: [NO_ERRORS_SCHEMA]
            }).overrideComponent(EditDraftModalComponent,
                {
                    set: {
                        providers: [
                            { provide: DialogService, useClass: MockDialogService },
                            { provide: DraftsDataService, useClass: MockDraftDataService },
                            { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService },
                            { provide: CustomerService, useClass: MockCustomerService }
                        ]
                    }
                })
                .overrideModule(BrowserDynamicTestingModule,
                {
                    set: {
                        entryComponents: [EditDraftModalComponent]
                    }
                })
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EditDraftModalComponent);
            comp = fixture.componentInstance;
            debugEl = fixture.debugElement;
            element = fixture.nativeElement;
            comp.draft = new Draft();
            comp.draft.Account = new Account();
            spy = spyOn(comp.growler, 'growlError');
            imageSpy = spyOn(comp.draftsDataService, 'getDraftImages').and.returnValue(Observable.of());
            deleteDraftSpy = spyOn(comp.draftsDataService, 'deleteDraft').and.returnValue(Observable.of(true));
            updateDraftSpy = spyOn(comp.draftsDataService, 'updateDraft').and.returnValue(Observable.of(true));

        });

        describe('initializeObjects method',
            () => {
                it('should instantiate search object',
                    () => {
                        comp.initializeObjects();

                        expect(comp.result.length).toEqual(0);
                        expect(comp.errorMessage).toEqual('');
                        expect(comp.isDeleteConfirmationActive).toBeFalsy();
                        expect(comp.editedAmount).toEqual(comp.draft.Amount);
                    });
            });

        describe('save method',
            () => {
                it('if form is valid, call data service update method',
                    () => {
                        comp.editedAccountNumber = 1;
                        comp.editedDraftNumber = 1;
                        comp.editedAmount = 1;

                        comp.save();

                        expect(updateDraftSpy.calls.any()).toBe(true);
                    });

                it('if form is not valid, call growler',
                    () => {
                        comp.save();

                        expect(comp.growler.growlError).toHaveBeenCalledTimes(1);
                    });
            });

        describe('delete method',
            () => {
                it('when call delete, call data service delete method',
                    () => {
                        comp.draft.DraftId = 1;

                        comp.delete();

                        expect(deleteDraftSpy.calls.any()).toBe(true);
                    });
            });

        describe('get draft image method',
            () => {
                it('when call getDraftImage, call data service getDraftImage method',
                    () => {
                        comp.draft.DraftId = 1;

                        comp.getDraftImage(comp.draft.DraftId.toString());
                        expect(comp.draftsDataService.getDraftImages).toHaveBeenCalledTimes(1);
                    });
            });

        describe('showDeleteConfirmation',
            () => {
                it('when called, set isDeleteConfirmationActive to true',
                    () => {
                        comp.isDeleteConfirmationActive = false;

                        comp.showDeleteConfirmation();

                        expect(comp.isDeleteConfirmationActive).toBeTruthy();
                    });
            });

        describe('openImageModal',
            () => {
                it('when param is "front", set fullImageSrcString to value of frontImageSrcString',
                    () => {
                        comp.frontImageSrcString = 'test front';
                        comp.backImageSrcString = 'test back';
                        comp.fullImageSrcString = '';
                        let arbitraryFrontParam: string = 'front';

                        comp.openImageModal(arbitraryFrontParam);

                        expect(comp.fullImageSrcString).toEqual('test front');
                    });

                it('when param is "back", set fullImageSrcString to value of backImageSrcString',
                    () => {
                        comp.frontImageSrcString = 'test front';
                        comp.backImageSrcString = 'test back';
                        comp.fullImageSrcString = '';
                        let arbitraryBackParam: string = 'back';

                        comp.openImageModal(arbitraryBackParam);

                        expect(comp.fullImageSrcString).toEqual('test back');
                    });
            });
    });