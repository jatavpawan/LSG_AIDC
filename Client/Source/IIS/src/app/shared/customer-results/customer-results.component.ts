import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Customer } from "../models/customer.model";


@Component({
    selector: 'customer-results',
    templateUrl: './customer-results.component.html',
    styleUrls: ['./customer-results.component.scss']
})
export class CustomerResults implements OnInit  {
    @Input() customers: Customer[];
    @Output() onSelected = new EventEmitter<Customer>();
    @Input() maxHeight: string;    

    @Input() gridSelectedCustomer: Customer;
    @Output() gridSelectedCustomerChange = new EventEmitter<Customer>();

    constructor() {

    }

    ngOnInit(): void {
        if (!this.maxHeight) {
            this.maxHeight = '57vh';
        }
    }

    onRowSelect(event: any) {
        this.gridSelectedCustomerChange.emit(event.data);
        this.onSelected.emit(event.data);        
    }
}