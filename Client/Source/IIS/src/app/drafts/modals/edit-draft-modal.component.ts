import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

import { Draft } from '../../shared/models/drafts/draft.model';
import { Account } from '../../shared/models/account.model';
import { DraftsDataService } from '../../core/services/drafts/drafts-data.service';
import { GrowlerMediatorService } from "../../core/services/mediators/growler-mediator.service";
import { DraftImage } from '../../shared/models/drafts/draft-image.model';
import { IEditDraftModel } from './editor-draft-model.interface';
import { CustomerService } from "../../core/services/customer.service";

@Component({
    selector: 'ta-edit-draft',
    templateUrl: 'edit-draft-modal.component.html',
    styleUrls: ['edit-draft-modal.component.scss']
})
export class EditDraftModalComponent extends DialogComponent<IEditDraftModel, Draft[]> implements IEditDraftModel {
    public draft: Draft;
    public editedAccountNumber: number;
    public editedDraftNumber: number;
    public editedAmount: number;
    public result: Draft[];
    public errorMessage: string;
    public isDeleteConfirmationActive: boolean;
    public frontImageSrcString: string;
    public backImageSrcString: string;
    public fullImageSrcString: string;
    public showFullImage: boolean;
    public draftImagesCollection: DraftImage[];

    constructor(dialogService: DialogService,
        public draftsDataService: DraftsDataService,
        public growler: GrowlerMediatorService,
        public customerService: CustomerService) {
        super(dialogService);
    }

    ngOnInit(): void {
        this.initializeObjects();
        this.getDraftImage(this.draft.DraftId.toString());
    }

    initializeObjects() {
        this.result = [];
        this.errorMessage = '';
        this.isDeleteConfirmationActive = false;
        if (!this.draft.Account) {
            this.draft.Account = new Account();
        }
        this.editedAmount = this.draft.Amount;
        this.editedDraftNumber = this.draft.DraftNumber;
        this.editedAccountNumber = +this.draft.Account.AccountNumber;
    }

    public getDraftImage(draftIds: string) {
        this.draftsDataService.getDraftImages(draftIds)
            .subscribe((response: DraftImage[]) => {
                if (response) {
                    this.frontImageSrcString = 'data:image/png;base64,' + response[0].FrontImageBase64;
                    this.backImageSrcString = 'data:image/png;base64,' + response[0].BackImageBase64;
                }
            },
            (err: any) => {
                this.growler.growlError("Error", "Error getting draft image: " + err);
            });
    }

    save() {
        if (!this.isDeleteConfirmationActive) {
            if (this.formIsValid()) {
                this.draft.Account.AccountNumber = this.editedAccountNumber;
                this.draft.DraftNumber = this.editedDraftNumber;
                this.draft.Amount = this.editedAmount;

                this.draftsDataService.updateDraft(this.draft)
                    .subscribe((response: boolean) => {
                        if (response) {
                            this.close();
                        }
                    },
                    (err: any) => {
                        this.growler.growlError("Error", "Error saving draft: " + err);
                    });
            } else {
                this.growler.growlError("Error", "Please provide valid input.");
            }
        }
    }


    cancel() {
        this.close();
    }

    delete() {
        this.draftsDataService.deleteDraft(this.draft.DraftId)
            .subscribe((response: boolean) => {
                if (response) {
                    this.close();
                }
            },
            (err: any) => {
                this.growler.growlError("Error", "Error deleting draft: " + err);
            });
    }

    formIsValid() {
        if (!this.editedAccountNumber || !this.editedDraftNumber || !this.editedAmount) {
            this.errorMessage = 'Please provide all required fields.';
            return false;
        }

        if (!(this.editedAccountNumber > 0) || !(this.editedDraftNumber > 0) || !(this.editedAmount > 0)) {
            this.errorMessage = 'Please provide valid input.';
            return false;
        }
        this.errorMessage = '';
        return true;
    }

    showDeleteConfirmation() {
        this.errorMessage = '';
        this.isDeleteConfirmationActive = true;
    }

    cancelDelete() {
        this.isDeleteConfirmationActive = false;
    }

    openImageModal(side: string) {
        if (side === 'front') {
            this.fullImageSrcString = this.frontImageSrcString;
        } else {
            this.fullImageSrcString = this.backImageSrcString;
        }

        this.showFullImage = true;
    }

    closeImage() {
        this.showFullImage = false;
    }
}
