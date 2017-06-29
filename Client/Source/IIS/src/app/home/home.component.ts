import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerMediatorService } from '../customers/customer-mediator.service';

@Component({
    selector: 'ta-app-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy{
    public welcomeMsg: string = "Welcome To the home page.";
    public showWelcomeMsg: boolean = true;
    public showCustomerList: boolean = false;
    public isCustomerSelected: boolean = false;
    public id: number;
    private sub: any;

    @Input() result: string;

    constructor(private customerMediatorService: CustomerMediatorService, private activatedRoute: ActivatedRoute) {
        this.customerMediatorService.searchQryChanged$.subscribe((searchQry) => this.onCustomersChanged(searchQry));
    }

    ngOnInit(): void {
        this.sub = this.activatedRoute.params.subscribe((params) => {
            this.id = +params['customerId'];
            this.isCustomerSelected = this.id > 0;
            this.showCustomerList = !this.isCustomerSelected;
            this.customerMediatorService.searchQry = '';
        });
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onCustomersChanged(searchQry: string) {
        this.showCustomerList = searchQry != null && searchQry.length > 0;
        this.showWelcomeMsg = !this.showCustomerList;
    }
}
