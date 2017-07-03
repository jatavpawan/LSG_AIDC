
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TopNavbarComponent } from './top-navbar.component';
import { MenuService } from './../../services/menu.service';
import { SettingsService } from './../../services/settings.service';
import { SearchInputComponent } from '../../search/search-input.component';
import { FormsModule} from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { MockRouter } from '../../../tests/mocks/mock-router';
import { Router, RouterLink } from '@angular/router';
import { MockCustomerService } from '../../../tests/mocks/mock-customer.service';

describe('Component: TopNavbarComponent', () => {

    (<any>window).ClientSettings = {
        AuthToken: "AuthToken",
        AuditInfoToken: "AuditInfoToken",
        LoggedOnUserName: "LoggedOnUserName",
        UserImageUrl: "UserImageUrl",
        ServiceFabricApi: "ServiceFabricApi"
    };

    let comp: TopNavbarComponent;
    let fixture: ComponentFixture<TopNavbarComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TopNavbarComponent, SearchInputComponent],
            providers: [],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        }).overrideComponent(TopNavbarComponent, {
                set: {
                    providers: [MenuService, SettingsService,
                        { provide: Router, useClass: MockRouter },
                        { provide: CustomerService, useClass: MockCustomerService }]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopNavbarComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
  
    });

    it("should create the top navbar", () => {
        expect(comp).toBeTruthy();
    });

});
