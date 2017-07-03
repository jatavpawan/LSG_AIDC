import { GenericDropDownModel } from './../../../../../shared/models/generic-dropdown-model';
import { GrowlerMediatorService } from './../../../../../core/services/mediators/growler-mediator.service';
import { CentralCodesDataService } from './../../../../../core/services/central-codes-data.service';
import { Customer } from './../../../../../shared/models/customer.model';
import { CustomerService } from './../../../../../core/services/customer.service';
import { WireOutAuthorization } from './../../../../../shared/models/wires/retail-wire-out-authorization.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Utilities } from "../../../../../shared/utilities.service";
import {RetailWireOut} from "../../../../../shared/models/wires/retail-wire-out.model";
import {CustomerInfoVaultDataService} from "../../../../../core/services/customer-info-vault-data.service";
import {CivCustomerPhone} from "../../../../../shared/models/civ-customer-phone";
import {CivCustomer} from "../../../../../shared/models/civ-customer";

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
    @Output() onVerificationSelected = new EventEmitter<boolean>();
    public authorization: WireOutAuthorization;
    public methodRequestList: GenericDropDownModel[];
    public identityVerificationList: GenericDropDownModel[];
    private customer: Customer;
    private utilities: Utilities;
    public unableToConfirmIdentity: boolean;
    public requestMethodSelected: boolean;
    public IsForm2270Signed: boolean;
    public phoneNumbers: CivCustomerPhone[];
    @Input() outgoingWire: RetailWireOut;

    constructor(private customerService: CustomerService,
        private centralCodesDataService: CentralCodesDataService,
        private growler: GrowlerMediatorService,
        private customerInfoVaultDataService: CustomerInfoVaultDataService) {

    }

    ngOnInit() {
        this.initializeObjects();
    }

    initializeObjects() {
        this.utilities = new Utilities();
        this.customer = this.customerService.selectedCustomer;
        this.phoneNumbers = [];
        this.authorization = new WireOutAuthorization();
        this.initializeDropdowns();
        this.getFirstTimeAuthorization();

        const methodRequestCallback = (ret: GenericDropDownModel[]) => {
            if (ret && ret.length > 0) {
                this.methodRequestList = ret;
            }
        };
        this.getMethodRequestOptions(methodRequestCallback);

        const identityVerificationCallback = (ret: GenericDropDownModel[]) => {
            if (ret && ret.length > 0) {
                this.identityVerificationList = ret;
            }
        };
        this.getIdentityVerificationOptions(identityVerificationCallback);
    }

    initializeDropdowns() {
        this.authorization.MethodRequested = this.utilities.defaultDropDownValue;
        this.authorization.IdentityVerification = this.utilities.defaultDropDownValue;
        this.authorization.IsForm6272Signed = this.utilities.defaultDropDownValue;
        this.authorization.IsNoteSigner = this.utilities.defaultDropDownValue;
        this.IsForm2270Signed = this.utilities.defaultDropDownValue;
        this.authorization.CustomerCallback = this.utilities.defaultDropDownValue;
    }

    getPhoneNumbers() {
        this.customerInfoVaultDataService.getCustomer(this.customerService.selectedCustomer.Id)
            .subscribe((ret: CivCustomer) => {
                if (ret) {
                    this.phoneNumbers = ret.PhoneNumbers;
                }
            });
    }

    getFirstTimeAuthorization() {
        //TODO make service call to get first time auth status
        this.authorization.FirstTimeWireAuthorization = true;
    }

    getMethodRequestOptions(successCallback: any) {
        this.centralCodesDataService.getMethodRequestOptions()
            .subscribe(successCallback, (err: any) => {
                this.growler.growlError("Error", "Error getting Request Method Data");
            });
    }

    getIdentityVerificationOptions(successCallback: any) {
        this.centralCodesDataService.getInPersonIdentificationOptions()
            .subscribe(successCallback, (err: any) => {
                this.growler.growlError("Error", "Error getting Identity Verification Data");
            });
    }

    requestMethodChanged(event: any) {
        if (event && event.Id === 0) {
            this.requestMethodSelected = false;
            this.authorization.IdentityVerification = this.utilities.defaultDropDownValue;
            this.unableToConfirmIdentity = false;
            
            return;
        } else if (event && event.Id === 2 && this.phoneNumbers.length <= 0) {
            this.getPhoneNumbers();
            this.unableToConfirmIdentity = undefined;
        }
        this.authorization.MethodRequested = event;
        this.requestMethodSelected = true;
    }

    identityVerificationChanged(event: any) {
        if (event && event.Id === 3) {
            this.unableToConfirmIdentity = true;
            return;
        }
        this.unableToConfirmIdentity = false;
    }

    authorizationCompleted() {
        return this.onVerificationSelected.emit(false);        
    }

    changeNoteSigner() {
        this.authorization.IsForm6272Signed = this.utilities.defaultDropDownValue;
    }
}