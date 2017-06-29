import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountsSearchListComponent } from './search/accounts-search-list-component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [AccountsSearchListComponent],
    imports: [RouterModule, SharedModule],
    exports: [AccountsSearchListComponent],
    providers: []
})
export class AccountsModule { }
