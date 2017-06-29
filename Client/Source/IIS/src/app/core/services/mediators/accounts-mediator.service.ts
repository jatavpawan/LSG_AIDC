import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";

import { Account } from '../../../shared/models/account.model';

@Injectable()
export class AccountsMediatorService {
    selectedAccount: Account;

    constructor() {
    }

}

