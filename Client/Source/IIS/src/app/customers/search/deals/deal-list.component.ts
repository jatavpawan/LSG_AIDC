import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Deal } from "../../../shared/models/deal.model";

@Component({
    selector: 'ta-deal-list',
    templateUrl: 'deal-list.component.html'
})
export class DealListComponent implements OnInit {

    @Input() filteredDeals: Deal[] = [];
    @Output() onRowSelected = new EventEmitter<Deal>();

    constructor() {

    }

    ngOnInit(): void {

    }

    public rowSelect(event: any) {
        if (event && event.data) {
            this.onRowSelected.emit(event.data);
        }
    }

    onStatusChanged(dt: any, event: any, col: any) {
        if (event && event.value && event.value.length > 0 && event.value[0] === 'Deleted') {
            this.filteredDeals = this.filteredDeals;
        }

        dt.filter(event.value, col.field, col.filterMatchMode);
    }
}
