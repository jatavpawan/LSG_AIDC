import { MenuService } from './../../services/menu.service';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../../shared/models/customer.model';
import { RoutesFactory } from "../../../shared/routes.factory";
@Component({
    selector: 'ta-top-nav',
    templateUrl: 'top-navbar.component.html',
    styleUrls: ['top-navbar.component.scss']
})

export class TopNavbarComponent implements OnInit {
    public hoverStyle: string = 'Review_btn';
    public currentPage: string = 'Review_btn';
    constructor(private menuService: MenuService
        , public settingsService: SettingsService
        , private router: Router
        , private customerService: CustomerService)
    { }

    public toggleMenu() {
        this.menuService.sideMenuToggled = !this.menuService.sideMenuToggled;
    }

    ngOnInit() {
    }

    public navigateToHome() {

        this.customerService.selectedCustomer = undefined;
        this.router.navigate([RoutesFactory.createRootRoute()]);
    }
    public mouseMoved(button: string) {
        this.hoverStyle = button;
        // document.getElemetById(button)
        //alert(button);
    }
    public mouseLeave(value: string) {
        if (value != this.currentPage) {
            this.hoverStyle = 'none';
        }

    }
}