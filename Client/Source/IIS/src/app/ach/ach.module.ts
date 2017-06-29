import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {BankAccountManagerMediatorService} from "./shared/mediators/bank-account-manager-mediator.service";
import {BankTemplateComponent} from "./templates/bank-template/bank-template.component";
import {BankAccountManagerComponent} from "./templates/bank-account-manager/bank-account-manager.component";
import {AchTemplateSelectorComponent} from "./shared/ach-template-selector.component";
import {AchSetupComponent} from "./shared/ach-setup.component";
import {AchComponent} from "./ach.component";
import {AchTransactionsComponent} from "./ach-transactions/ach-transactions.component";
import {ViewTransactionModalComponent} from "./shared/view-transaction-modal/view-transaction-modal.component";
import {AchRejectComponent} from "./reject/ach-reject.component";
import {AchRejectConfirmationComponent} from "./reject/ach-reject-confirmation.component";
import {achTemplatesRouting, appRoutingProviders } from "./ach.routing";

@NgModule(({
    imports: [achTemplatesRouting, SharedModule],
    providers: [appRoutingProviders, BankAccountManagerMediatorService],
    declarations: [BankTemplateComponent, BankAccountManagerComponent, AchTemplateSelectorComponent,
        AchSetupComponent, AchComponent, AchTransactionsComponent,
        ViewTransactionModalComponent, AchRejectComponent, AchRejectConfirmationComponent],
    entryComponents: [BankTemplateComponent, AchTemplateSelectorComponent, ViewTransactionModalComponent, AchRejectConfirmationComponent]
}))
export class AchModule { }