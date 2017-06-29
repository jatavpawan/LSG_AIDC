import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";

import { Ach } from "../../shared/models/ach/ach.model";
import { MultiSelectValue } from "../../shared/models/multi-select-value.model";
import { AchDataService } from "../../core/services/ach/ach-data.service";
import { GrowlerMediatorService } from "../../core/services/mediators/growler-mediator.service";
import { AchStatus } from "../../shared/models/ach/ach-status";
import { ConfirmModalComponent } from "../../shared/modals/confirm-modal/confirm-modal.component";
import { ViewTransactionModalComponent } from "../shared/view-transaction-modal/view-transaction-modal.component";
import { AchMediatorService } from "../../core/services/mediators/ach-mediator.service";
import { RoutesFactory } from '../../shared/routes.factory';

@Component({
    selector: 'ta-ach-transactions',
    templateUrl: 'ach-transactions.component.html',
    styleUrls: ['ach-transactions.component.scss']
})
export class AchTransactionsComponent implements OnInit, OnDestroy {
    customerId: number;
    transactions: Ach[];
    filteredTransactions: Ach[];
    selectedAchTransaction: Ach;

    shouldDisplayActive: boolean;
    statusMultiSelects: MultiSelectValue[];
    private sub: any;

    constructor(private achDataService: AchDataService, private growlerMediatorService: GrowlerMediatorService, public router: Router,
        private route: ActivatedRoute, public dialogService: DialogService, public achService: AchMediatorService) {

    }

    ngOnInit() {
        this.getRouteParams();
        this.initializeObjects();
    };

    ngOnDestroy() {

    };

    public getDynamicAutoId(name: string, id: string) {
        return name + id;
    }

    public getIsDeleted(item: Ach) {
        if (item && item.Status === AchStatus.Deleted) {
            return true;
        }

        return false;
    }

    getRouteParams() {
        this.sub = this.route.params.subscribe((params) => {
            this.customerId = +params['customerId'];
            if (this.customerId !== 0) {
                this.getAchTransactions(this.customerId);

            }
        });
    }

    initializeObjects() {
        this.achService.copiedAch = undefined;
        this.shouldDisplayActive = true;
        this.selectedAchTransaction = undefined;
    }

    getAchTransactions(customerId: number) {
        if (customerId) {
            this.achDataService.getAchTransactions(customerId)
                .subscribe((ret: Ach[]) => {
                    if (ret && ret.length > 0) {
                        this.transactions = ret;

                        if (this.shouldDisplayActive) {
                            this.filteredTransactions = this.transactions
                                .filter(item => item.Status === AchStatus.Active);
                        } else {
                            this.filteredTransactions = this.transactions;
                        }

                        this.applyMultiSelects();
                    }
                },
                (err: any) => {
                    this.growlerMediatorService.growlError("Error", "Error getting processing dates: " + err);
                });
        }
    }

    addNew() {        
        this.router.navigate([RoutesFactory.createAchRoute(this.customerId)]);
    }

    viewAch(ach: Ach) {
        this.selectedAchTransaction = Object.assign({}, ach);
        this.dialogService.addDialog(ViewTransactionModalComponent,
            {
                title: 'ACH Setup Instructions',
                message: '',
                confirmText: 'Close View',
                cancelText: '',
                ach: ach
            }).subscribe((isConfirmed) => {
                this.selectedAchTransaction = undefined;
            });
    }

    copyAch(ach: Ach) {
        this.achService.copiedAch = ach;   
   
        this.router.navigate([RoutesFactory.createAchWithTemplateRoute(this.customerId, ach.BankTemplate.BankTemplateId)]);
    }

    deleteAch(ach: Ach) {
        this.selectedAchTransaction = Object.assign({}, ach);
        this.dialogService.addDialog(ConfirmModalComponent,
            {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete this ACH Transaction Setup?`,
                confirmText: 'Yes',
                cancelText: 'No'
            }).subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.deleteAchTransaction(ach);
                    this.selectedAchTransaction = undefined;
                }
            });
    }

    deleteAchTransaction(ach: Ach) {
        this.achDataService.deleteAchTransaction(ach.AchId)
            .subscribe((status: boolean) => {
                if (status) {
                    this.growlerMediatorService.growlSuccess('Success', 'ACH transaction has been deleted successfully');

                    this.getAchTransactions(this.customerId);
                }
                else {
                    this.growlerMediatorService.growlError('Error', 'ACH transaction deletion failed');
                }
            },
            (err: any) => {
                this.growlerMediatorService.growlError('Error', 'ACH transaction deletion failed');
            });
    }

    onStatusChanged(dt: any, event: any, col: any) {
        if (event && event.value && event.value.length > 0 && event.value[0] === 'Deleted') {
            this.filteredTransactions = this.transactions;
            this.shouldDisplayActive = false;
        }

        dt.filter(event.value, col.field, col.filterMatchMode);
    }

    private applyMultiSelects() {
        this.statusMultiSelects = [];

        if (this.transactions && this.transactions.length > 0) {
            for (var i = 0; i < this.transactions.length; i++) {

                if (this.statusMultiSelects.filter(e => e.value === this.transactions[i].StatusDescription).length === 0) {
                    this.statusMultiSelects.push(new MultiSelectValue(this.transactions[i].StatusDescription, this.transactions[i].StatusDescription));
                }
            }
        }
    }
}
