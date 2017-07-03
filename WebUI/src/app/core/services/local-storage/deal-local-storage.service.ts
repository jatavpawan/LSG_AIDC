import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {Deal} from "../../../shared/models/deal.model";

@Injectable()
export class DealLocalStorageService {

    private key = 'DealSearchHistory_v1';

    constructor(private localStorageService: LocalStorageService) {
        
    }

    public getDeals(): Deal[] {
        let deals: Deal[] = [];

        const localStorageDeals = this.localStorageService.get(this.key);
        if (localStorageDeals) {
            deals = JSON.parse(<any>localStorageDeals) || [];
        }

        return deals;
    }

    public storeDeal(deal: Deal): void {
        const dealsFromLocalStorage = <any>this.localStorageService.get(this.key) || [];
        const deals: Deal[] = dealsFromLocalStorage.length > 0 ? JSON.parse(dealsFromLocalStorage) : [];

        const existingDealIndex = deals.findIndex(d => d.DealPid === deal.DealPid);
        if (existingDealIndex !== -1) {
            deals.splice(existingDealIndex, 1);
        }

        deals.unshift(deal);
        this.localStorageService.set(this.key, JSON.stringify(deals));
    }
}