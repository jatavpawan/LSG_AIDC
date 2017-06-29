
import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MenuService } from './core/services/menu.service';
import { EcsSettings } from './shared/models/ecs-settings.model';
import { EcsSettingsDataService } from './core/services/ecs-settings.data.service';
import { Router, NavigationEnd } from '@angular/router';
import { CustomerMediatorService } from './customers/customer-mediator.service';
import { GrowlerMediatorService } from './core/services/mediators/growler-mediator.service';

@Component({
    selector: 'ta-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild('searchInput') input: ElementRef;

    displayContentArea: boolean;

    constructor(private http: Http,
        public menuService: MenuService,
        public ecsSettingDataService: EcsSettingsDataService,
        public ecsSettings: EcsSettings,
        public customerMediatorService: CustomerMediatorService,
        private router: Router,
        public growlerMediatorService: GrowlerMediatorService) { }

    public ngOnInit() {
        this.getEcsSettings();

        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((event) => {
                var nav = event as NavigationEnd;

                if (nav.url === '/' || nav.url.includes('customers')) {
                    this.displayContentArea = false;
                } else {
                    this.displayContentArea = true;
                }
                
            });
    }

    getEcsSettings() {
        this.ecsSettingDataService.getEcsSetting().subscribe((ret: EcsSettings) => {
            this.ecsSettings.ServiceFabricApi = ret.ServiceFabricApi;
            this.ecsSettings.EmailResponseFrom = ret.EmailResponseFrom;
            this.ecsSettings.EmailResponseFrom = ret.Environment;
            this.ecsSettings.JobNotificationRecipientList = ret.JobNotificationRecipientList;
            this.ecsSettings.MailApiAddress = ret.MailApiAddress;
            this.ecsSettings.SystemName = ret.SystemName;
            this.ecsSettings.ToDoApiAddress = ret.ToDoApiAddress;
            this.ecsSettings.WebApiRecycler = ret.WebApiRecycler;
        });
    }
}
