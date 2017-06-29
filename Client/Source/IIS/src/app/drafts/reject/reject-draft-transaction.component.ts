import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';

import { DraftsDataService } from '../../core/services/drafts/drafts-data.service';
import { GrowlerMediatorService } from '../../core/services/mediators/growler-mediator.service';
import { DraftRejection } from '../../shared/models/drafts/draft-rejection.model';
import { DraftTransaction } from '../../shared/models/drafts/draft-transaction.model';
import { DialogService } from "ng2-bootstrap-modal";
import { IRejectConfirmModal, RejectDraftConfirmationComponent } from "./reject-draft-confirmation.component";

@Component({
    selector: 'reject-draft-transaction',
    templateUrl: 'reject-draft-transaction.component.html',
    styleUrls: ['reject-draft-transaction.component.scss']
})
export class RejectDraftTransactionComponent implements OnInit {

    customerId: number;
    draftTransactions: DraftTransaction[];
    draftRejection: DraftRejection;
    selectedDraftTransaction: DraftTransaction;

    constructor(private router: Router,
        private route: ActivatedRoute,
        public draftDataService: DraftsDataService,
        public growlerMediatorService: GrowlerMediatorService,
        public dialogService: DialogService) {
    }

    ngOnInit() {
        this.getRouteParams();
        this.initializeComponent();
    }

    getRouteParams() {
        this.route.params.subscribe((params) => {
            this.customerId = +params['customerId'];
            if (this.customerId !== 0) {
                this.getDraftTransactions(this.customerId);

            }
        });
    }

    initializeComponent() {
        this.draftRejection = new DraftRejection();
        this.selectedDraftTransaction = undefined;
    }

    getDraftTransactions(customerId: number) {
        this.draftDataService.getDraftTransactions(customerId)
            .subscribe((ret: DraftTransaction[]) => {
                if (ret && ret.length > 0) {
                    this.draftTransactions = ret;

                } else {
                    this.growlerMediatorService.growlWarn('Warning', 'No Draft Data for Current Customer');
                }
            }, (err) => {
                this.growlerMediatorService.growlError('Error', 'Error getting Draft Data');
            });
    }

    rejectDraftTransaction(draftRejection: DraftRejection) {
        this.draftDataService.rejectDraftTransaction(draftRejection)
            .subscribe((ret: void) => {
                this.getDraftTransactions(this.customerId);
            }, (err) => {
                this.growlerMediatorService.growlError('Error', 'Error Rejecting Draft');
            });
    }

    openConfirmDelete(draftRow: DraftTransaction) {
        this.selectedDraftTransaction = Object.assign({}, draftRow);
        this.draftRejection.DraftId = draftRow.DraftId;
        this.dialogService.addDialog(RejectDraftConfirmationComponent,
            ({
                draftNumber: draftRow.DraftNumber,
                amount: draftRow.Amount
            }) as any).subscribe((result: DraftRejection) => {
                if (result && result.RejectReasonCode && result.RejectReasonCode.Id > 0) {
                    this.draftRejection.RejectReason = result.RejectReasonCode.Id;
                    this.draftRejection.Description = result.Description;

                    this.rejectDraftTransaction(this.draftRejection);
                }
            if (result) {
                this.growlerMediatorService.growlSuccess('Success', 'Draft Rejected Successfully');
            }
            this.dialogService.removeAll();                
            this.selectedDraftTransaction = undefined;
            });
    }

    public getDynamicAutoId(name: string, id: string) {
        return name + id;
    }
}