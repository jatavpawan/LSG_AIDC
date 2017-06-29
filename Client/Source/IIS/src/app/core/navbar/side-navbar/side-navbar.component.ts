import { MenuService } from './../../services/menu.service';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
    selector: 'ta-side-nav',
    templateUrl: 'side-navbar.component.html',
    styleUrls: ['side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {
    currentYear: string;

    constructor(public menuService: MenuService
        , public customerService: CustomerService) {

    }

    ngOnInit() {
        this.currentYear = new Date().getFullYear().toString();
    }

}