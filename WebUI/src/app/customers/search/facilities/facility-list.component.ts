import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Facility} from "../../../shared/models/facility.model";

@Component({
    selector: 'ta-facility-list',
    templateUrl: 'facility-list.component.html'
})
export class FacilityListComponent implements OnInit {

    @Input() filteredFacilities: Facility[] = [];
    @Output() onRowSelected = new EventEmitter<Facility>();

    constructor() {

    }

    ngOnInit(): void {

    }

    public rowSelect(event: any) {
        if (event && event.data) {
            this.onRowSelected.emit(event.data as Facility);
        }
    }

    onStatusChanged(dt: any, event: any, col: any) {
        if (event && event.value && event.value.length > 0 && event.value[0] === 'Deleted') {
            this.filteredFacilities = this.filteredFacilities;
        }

        dt.filter(event.value, col.field, col.filterMatchMode);
    }
}
