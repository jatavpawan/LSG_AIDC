import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Facility } from "../../../shared/models/facility.model";

@Injectable()
export class FacilityLocalStorageService {

    private key = 'FacilitySearchHistory_v1';

    constructor(private localStorageService: LocalStorageService) {

    }

    public getFacilities(): Facility[] {
        let facilities: Facility[] = [];

        const localStorageFacilities = this.localStorageService.get(this.key);
        if (localStorageFacilities) {
            facilities = JSON.parse(<any>localStorageFacilities) || [];
        }

        return facilities;
    }

    public storeFacility(facility: Facility): void {
        const facilitiesFromLocalStorage = <any>this.localStorageService.get(this.key) || [];
        const facilities: Facility[] = facilitiesFromLocalStorage.length > 0 ? JSON.parse(facilitiesFromLocalStorage) : 0;

        const existingFacilityIndex = facilities.findIndex(d => d.FacilityPid === facility.FacilityPid);
        if (existingFacilityIndex !== -1) {
            facilities.splice(existingFacilityIndex, 1);
        }

        facilities.unshift(facility);
        this.localStorageService.set(this.key, JSON.stringify(facilities));
    }
}