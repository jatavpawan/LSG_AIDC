
import { EcsSettings } from './shared/models/ecs-settings.model';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { appRouting } from './app.routing';
import { CustomerMediatorService } from './customers/customer-mediator.service';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { CustomersModule } from './customers/customers.module';
import { EcsSettingsDataService } from './core/services/ecs-settings.data.service';
import { ConfirmModalComponent } from './shared/modals/confirm-modal/confirm-modal.component';
import { CustomerSelectionModalComponent } from
    './shared/modals/customer-selection-modal/customer-selection-modal.component';
import { AccountsModule } from './accounts/accounts.module';
import { LocalStorageModule } from 'angular-2-local-storage';
import { GrowlModule } from 'primeng/primeng';
import { AchRejectConfirmationMediatorService } from './core/services/mediators/ach-reject-confirmation-mediator.service';
import { ViewPaymentsModalComponent } from "./shared/modals/view-payments-modal/view-payments-modal.component";


@NgModule({
    declarations: [
        AppComponent, HomeComponent, ConfirmModalComponent, CustomerSelectionModalComponent,
        ViewPaymentsModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        CoreModule,
        appRouting,
        SharedModule,
        CustomersModule,
        AccountsModule,
        LocalStorageModule.withConfig({
            prefix: 'ta-app-root',
            storageType: 'localStorage'
        }),
        GrowlModule,
        BrowserAnimationsModule
    ],
    exports: [],
    providers: [CustomerMediatorService, AchRejectConfirmationMediatorService, EcsSettingsDataService, EcsSettings],
    entryComponents: [ConfirmModalComponent, CustomerSelectionModalComponent, ViewPaymentsModalComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
