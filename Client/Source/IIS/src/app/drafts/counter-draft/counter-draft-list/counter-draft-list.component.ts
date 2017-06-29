
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DraftsDataService } from '../../../core/services/drafts/drafts-data.service';
import { CounterDraft } from '../../../shared/models/drafts/counter-draft.model';
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmModalComponent } from '../../../shared/modals/confirm-modal/confirm-modal.component';
import { GrowlerMediatorService } from '../../../core/services/mediators/growler-mediator.service';
import { MultiSelectValue } from '../../../shared/models/multi-select-value.model';
import { CounterDraftComponent } from '../counter-draft.component';
import { Office } from '../../../shared/models/office.model';

@Component({
    selector: 'ta-counter-draft-list',
    templateUrl: 'counter-draft-list.component.html',
    styleUrls: ['counter-draft-list.component.scss']
})
export class CounterDraftListComponent implements OnInit, OnDestroy {
    private sub: any;
    public customerId: number;
    public counterDrafts: CounterDraft[];
    private filteredCounterDrafts: CounterDraft[];

    shouldDisplayActive: boolean;
    statusMultiSelects: MultiSelectValue[];
    selectedCounterDraft: CounterDraft;

    constructor(private draftDataService: DraftsDataService,
        private route: ActivatedRoute,
        public dialogService: DialogService,
        public growlerMediatorService: GrowlerMediatorService) {

    }

    ngOnInit(): void {
        this.shouldDisplayActive = true;
        this.selectedCounterDraft = undefined;

        this.sub = this.route.params.subscribe((params) => {
            this.customerId = +params['customerId'];

            if (this.customerId !== 0) {
                this.populateCounterDrafts(this.customerId);
            }
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };

    public populateCounterDrafts(customerId: number) {
        if (customerId) {
            this.draftDataService.get(customerId.toString())
                .subscribe((results: CounterDraft[]) => {
                    if (results && results.length > 0) {
                        this.counterDrafts = results;

                        if (this.shouldDisplayActive) {
                            this.filteredCounterDrafts = this.counterDrafts
                                .filter(item => item.IsActive);
                        } else {
                            this.filteredCounterDrafts = this.counterDrafts;
                        }
                        this.applyMultiSelects();
                    }
                });
        }
    }

    private applyMultiSelects() {
        this.statusMultiSelects = [];

        if (this.counterDrafts && this.counterDrafts.length > 0) {
            for (var i = 0; i < this.counterDrafts.length; i++) {

                if (this.statusMultiSelects.filter(e => e.value === this.counterDrafts[i].StatusDescription).length === 0) {
                    this.statusMultiSelects.push(new MultiSelectValue(this.counterDrafts[i].StatusDescription, this.counterDrafts[i].StatusDescription));
                }
            }
        }
    }

    public getDynamicAutoId(name: string, id: string) {
        return name + id;
    }

    deleteCounterDraft(counterDraft: CounterDraft) {
        this.draftDataService.deleteCounterDraft(counterDraft.CounterDraftId)
            .subscribe((status: boolean) => {
                if (status) {
                    this.growlerMediatorService.growlSuccess('Success', 'Counter Draft has been deleted successfully');
                    this.populateCounterDrafts(this.customerId);
                }
                else {
                    this.growlerMediatorService.growlError('Error', 'Counter Draft deletion failed');
                }
            },
            (err) => {
                this.growlerMediatorService.growlError('Error', 'Counter Draft deletion failed');
            });
    }

    public delete(counterDraft: CounterDraft) {
        this.selectedCounterDraft = Object.assign({}, counterDraft);
        this.dialogService.addDialog(ConfirmModalComponent,
            {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete counter drafts ${counterDraft.BeginningDraftNumber} through ${counterDraft.EndingDraftNumber}?`,
                confirmText: 'Yes',
                cancelText: 'No'
            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.deleteCounterDraft(counterDraft);
                }

                this.selectedCounterDraft = undefined;
            });
    }

    public onStatusChanged(dt: any, event: any, col: any) {
        if (event && event.value && event.value.length > 0 && (event.value[0] === 'Deleted' || event.value[1] === 'Deleted')) {
            this.filteredCounterDrafts = this.counterDrafts;
            this.shouldDisplayActive = false;
        }
        dt.filter(event.value, col.field, col.filterMatchMode);
    }

    public addNew() {
        let counterDraft = new CounterDraft();
        counterDraft.Office = new Office();

        counterDraft.CounterDraftId = 0;
        counterDraft.Office.OfficeId = 0;

        this.dialogService.addDialog(CounterDraftComponent,
            {
                counterDraft: counterDraft,
                isAddNew: true,
                customerId: this.customerId
            }).subscribe((isConfirmed) => {
                this.populateCounterDrafts(this.customerId);
            });
    }


}