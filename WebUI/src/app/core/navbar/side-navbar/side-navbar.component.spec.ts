/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SideNavbarComponent } from './side-navbar.component';
import { MenuService } from './../../services/menu.service';
import { CustomerService } from '../../services/customer.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Component: SideNavbarComponent', () => {
    let fixture: ComponentFixture<SideNavbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SideNavbarComponent],
            providers: [{ provide: MenuService }, { provide: CustomerService }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(SideNavbarComponent);
            fixture.detectChanges();
        });
    });

    it("should create the side navbar", () => {
        let component = TestBed.createComponent(SideNavbarComponent).componentInstance;
        expect(component).toBeTruthy();
    });

    it("should create the contents of the side navbar", () => {
        let fixture = TestBed.createComponent(SideNavbarComponent);
        let compiled = fixture.debugElement.nativeElement;

        expect(compiled).toBeTruthy();

        //search element
        let searchElement: HTMLElement = compiled.querySelectorAll('div .search')[0];
        expect(searchElement).toBeDefined();

        // first element
        let navElement: HTMLElement = compiled.querySelectorAll('nav')[0];

        // 1st nav element
        navElement = compiled.querySelectorAll('nav')[0].children[0];
        expect(navElement.className).toContain('nav nav-pills');

        // first nav-item
        //el = compiled.querySelectorAll('nav')[0].children[0].children[0];
        //expect(el.className).toContain('nav-item search');

        // ta-search-input router link
        //el = compiled.querySelectorAll('nav')[0].children[0].children[0].children[0];
        //expect(el.getElementsByTagName);

        // second nav-item
        navElement = compiled.querySelectorAll('nav')[0].children[0].children[0];
        expect(navElement.className).toContain('nav-item');
        //expect(el.innerHTML.startsWith('Overview')).toBeTruthy();

        // first nav-link
        navElement = compiled.querySelectorAll('nav')[0].children[0].children[0].children[0];
        expect(navElement.className).toContain('nav-link');

        // first nav-link, first child
        navElement = compiled.querySelectorAll('nav')[0].children[0].children[0].children[0].children[0];
        expect(navElement.className).toContain('fa fa-fw fa-newspaper-o');

        // first nav-link, second child
        navElement = compiled.querySelectorAll('nav')[0].children[0].children[0].children[0].children[1];
        expect(navElement.className).toContain('fa fa-fw fa-minus');

        // submenu
        navElement = compiled.querySelectorAll('nav')[0].children[0].children[0].children[1];
        expect(navElement.id).toContain('achSubMenu');

        // submenu, first child
        navElement = compiled.querySelectorAll('nav')[0].children[0].children[0].children[1].children[0];
        expect(navElement.className).toContain('nav nav-pills flex-column');

        // submenu, first nav-item
        navElement = compiled.querySelectorAll('nav')[0].children[0].children[0].children[1].children[0].children[0];
        expect(navElement.className).toContain('nav-item nestedItem');

        // second nav-link
        navElement = compiled.querySelectorAll('nav')[0].children[0].children[0].children[1].children[0].children[0].children[0];
        expect(navElement.className).toContain('nav-link');

        // second nav-link, first child
        navElement = compiled.querySelectorAll('nav')[0].children[0].children[0].children[1].children[0].children[0].children[0].children[0];
        expect(navElement.className).toContain('fa fa-fw fa-university');

        // submenu, second nav-item
        navElement = compiled.querySelectorAll('nav')[0].children[0].children[0].children[1].children[0].children[1];
        expect(navElement.className).toContain('nav-item nestedItem');

        // third nav-link
        navElement = compiled.querySelectorAll('nav')[0].children[0].children[0].children[1].children[0].children[1].children[0];
        expect(navElement.className).toContain('nav-link');

        // third nav-link, first child
        navElement = compiled.querySelectorAll('nav')[0].children[0].children[0].children[1].children[0].children[1].children[0].children[0];
        expect(navElement.className).toContain('fa fa-fw fa-usd');

        // second nav element
        navElement = compiled.querySelectorAll('div .footer-sidebar')[0];
        expect(navElement).toBeDefined();
        //expect(el.className).toContain('nav nav-pills flex-column footer-sidebar');

        // third nav-item
        //el = compiled.querySelectorAll('nav')[0].children[1].children[1];
        //expect(el.className).toContain('nav-item');

        //// third nav-item, first child
        //el = compiled.querySelectorAll('nav')[0].children[1].children[1].children[0];
        //expect(el.className).toContain('container');

        //// footer label
        //el = compiled.querySelectorAll('nav')[0].children[1].children[1].children[0].children[0];
        //expect(el.innerText.startsWith('Copyright'));
        //expect(el.innerText.endsWith('Farm Credit Services of America'));
    });
});