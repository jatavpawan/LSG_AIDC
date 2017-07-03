import { RetailWireOut } from './../../../../shared/models/wires/retail-wire-out.model';
import { CustomerService } from './../../../../core/services/customer.service';
import { WiresOutDataService } from './../../../../core/services/wires/wires-out-data.service';
import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ReceivingBankComponent } from './../shared/receiving-bank/receiving-bank.component';
import { AuthorizationComponent } from './../shared/authorization/authorization.component';
import {FinalBankComponent} from '../shared/final-bank/final-bank.component';
import {WiresInDataService} from "../../../../core/services/wires/wires-in-data.service";
import {GrowlerMediatorService} from "../../../../core/services/mediators/growler-mediator.service";
import {AuditInfoComponent} from "../shared/audit-info/audit-info.component";
import {CreditInfoComponent} from "../shared/credit-info/credit-info.component";
import {BeneficiaryInfoComponent} from "../shared/beneficiary-info/beneficiary-info.component";
import {WireOutAuthorization} from "../../../../shared/models/wires/retail-wire-out-authorization.model";
import {AbaModel} from "../../../../shared/models/aba.model";
import {RetailWireOutFinalBank} from "../../../../shared/models/wires/retail-wire-out-final-bank.model";
import {RetailWireOutBeneficiaryInfo} from "../../../../shared/models/wires/retail-wire-out-beneficiary-info.model";
import {RetailWireOutFurtherCreditInfo} from
    "../../../../shared/models/wires/retail-wire-out-further-credit-info.model";
import {RetailWireOutAuditInfo} from "../../../../shared/models/wires/retail-wire-out-audit-info.model";

@Component({
    selector: 'app-standard-template',
    templateUrl: './standard-template.component.html',
    styleUrls: ['./standard-template.component.scss']
})
export class StandardTemplateComponent implements OnInit {
    public authorizationStep: boolean;
    public receivingBankStep: boolean;
    public finalBankStep: boolean;
    public beneficiaryStep: boolean;
    public creditInfoStep: boolean;
    public auditInfoStep: boolean;
    public incompleteAuthorization: boolean;
    public incompleteReceivingBank: boolean;
    public incompleteFinalBank: boolean;
    public incompleteBenficiary: boolean;
    public incompleteFurtherCreditInfo: boolean;
    public test: boolean;
    public isTemplateSelected: boolean;
    public isExistingTemplate: boolean;
    public originalWire: RetailWireOut;
    @Input() outgoingWire: RetailWireOut;
    @Output() onOutgoingWireChange = new EventEmitter<RetailWireOut>();
    @ViewChild(AuthorizationComponent) authorizationComponent: AuthorizationComponent;
    @ViewChild(ReceivingBankComponent) receivingBankComponent: ReceivingBankComponent;
    @ViewChild(FinalBankComponent) finalBankComponent: FinalBankComponent;
    @ViewChild(BeneficiaryInfoComponent) beneficiaryComponent: BeneficiaryInfoComponent;
    @ViewChild(CreditInfoComponent) furtherCreditInfoComponent: CreditInfoComponent;
    @ViewChild(AuditInfoComponent) auditInfoComponent: AuditInfoComponent;
    constructor(private wiresDataService: WiresOutDataService,
                private growler: GrowlerMediatorService,
                private customerService: CustomerService) { }

    ngOnInit() {
        this.initializeObjects();
    }

    initializeObjects() {
        this.authorizationStep = false;
        this.receivingBankStep = true;
        this.finalBankStep = false;
        this.beneficiaryStep = false;
        this.creditInfoStep = false;
        this.auditInfoStep = false;
        this.incompleteAuthorization = true;
        this.incompleteReceivingBank = true;
        this.incompleteFinalBank = true;
        this.incompleteBenficiary = true;
        this.incompleteFurtherCreditInfo = true;
        this.outgoingWire.CustomerId = this.customerService.selectedCustomer.Id;
        this.outgoingWire.Authorization = new WireOutAuthorization();
        this.outgoingWire.ReceivingBank = new AbaModel();
        this.outgoingWire.FinalBank = new RetailWireOutFinalBank();
        this.outgoingWire.BeneficiaryInfo = new RetailWireOutBeneficiaryInfo();
        this.outgoingWire.FurtherCreditInfo = new RetailWireOutFurtherCreditInfo();
        this.outgoingWire.AuditInfo = new RetailWireOutAuditInfo();
        this.isExistingTemplate = false;
        this.initializeComponents();
    }

    initializeComponents() {
        this.authorizationComponent.initializeObjects();
        this.receivingBankComponent.initializeObjects();
        this.finalBankComponent.initializeObjects();
        this.beneficiaryComponent.initializeObjects();
        this.furtherCreditInfoComponent.initializeObjects();
        this.auditInfoComponent.initializeObjects();
    }

    handleAuthorizationEvent(evt: boolean) {
        this.incompleteAuthorization = evt;
        this.authorizationStep = false;
        this.auditInfoStep = true;
    }

    handleReceivingBankEvent(evt: boolean) {
        this.incompleteReceivingBank = evt;
        this.receivingBankStep = false;
        this.finalBankStep = true;
    }

    handleFinalBankEvent(evt: boolean) {
        this.incompleteFinalBank = evt;
        this.finalBankStep = false;
        this.beneficiaryStep = true;
    }

    handleBeneficiaryEvent(evt: boolean) {
        this.incompleteBenficiary = evt;
        this.beneficiaryStep = false;
        this.creditInfoStep = true;
    }

    handleCreditInfoEvent(evt: boolean) {
        this.incompleteFurtherCreditInfo = evt;
        this.creditInfoStep = false;
        this.auditInfoStep = true;
    }

    handlePreviousTemplateSelected(evt: RetailWireOut) {
        this.isExistingTemplate = true;
        this.originalWire = this.outgoingWire;
        //this.mapNewModel(evt);
        //this.onOutgoingWireChange.emit(evt);
    }

    handleAbaEvent(evt: number){
        this.outgoingWire.ReceivingBank.AbaRoutingNumber = evt;
    }

    useOriginalTemplate(){
        this.isExistingTemplate = false;
        //this.onOutgoingWireChange.emit(this.originalWire);
    }

    useExistingTemplate()
    {
        this.isExistingTemplate = false;
    }

    isSaveDisabled() {
        if (this.validFormCheck()) {
            return true;
        }
        return false;
    }

    validFormCheck() {
        return !this.receivingBankComponent.abaFound ||
            (this.beneficiaryComponent.beneficiaryInfo && this.beneficiaryComponent.beneficiaryInfo.Name && this.beneficiaryComponent.beneficiaryInfo.Name.length <= 0) ||
            !this.beneficiaryComponent.beneficiaryInfo.AccountNumber ||
            (!this.authorizationComponent.authorization.IsNoteSigner &&
                !this.authorizationComponent.authorization.IsForm6272Signed) ||
            !this.authorizationComponent.authorization.MethodRequested ||
            (this.authorizationComponent.authorization.IdentityVerification &&
                this.authorizationComponent.authorization.IdentityVerification.Id === 1) ||
            (!this.auditInfoComponent.auditInfo.Approver);
    }

    mapNewModel(evt: RetailWireOut) {
        this.authorizationComponent.authorization = evt.Authorization;
        this.auditInfoComponent.auditInfo = evt.AuditInfo;
        this.beneficiaryComponent.beneficiaryInfo = evt.BeneficiaryInfo;
        this.finalBankComponent.finalBank = evt.FinalBank;
        this.receivingBankComponent.abaModel = evt.ReceivingBank;
        this.furtherCreditInfoComponent.creditInfo = evt.FurtherCreditInfo;
    }

    create() {
        this.outgoingWire.IsFinished = true;
        this.outgoingWire.Authorization = this.authorizationComponent.authorization;
        this.outgoingWire.ReceivingBank = this.receivingBankComponent.abaModel;
        this.outgoingWire.FinalBank = this.finalBankComponent.finalBank;
        this.outgoingWire.BeneficiaryInfo = this.beneficiaryComponent.beneficiaryInfo;
        this.outgoingWire.FurtherCreditInfo = this.furtherCreditInfoComponent.creditInfo;
        this.outgoingWire.AuditInfo = this.auditInfoComponent.auditInfo;
        console.log(this.outgoingWire);
        this.wiresDataService.insertWireOutAssignment(this.outgoingWire)
            .subscribe((ret: any) => {
                    this.growler.growlSuccess('Success', 'Retail Wire Out Assigned Successfully');
                },
                (err: any) => {
                    this.growler.growlError("Error", "Error creating retail wire out assignment");
                });
    }

    createAndSend() {
        this.outgoingWire.IsFinished = true;
        this.outgoingWire.Authorization = this.authorizationComponent.authorization;
        this.outgoingWire.ReceivingBank = this.receivingBankComponent.abaModel;
        this.outgoingWire.FinalBank = this.finalBankComponent.finalBank;
        this.outgoingWire.BeneficiaryInfo = this.beneficiaryComponent.beneficiaryInfo;
        this.outgoingWire.FurtherCreditInfo = this.furtherCreditInfoComponent.creditInfo;
        this.outgoingWire.AuditInfo = this.auditInfoComponent.auditInfo;

        this.wiresDataService.insertWireOutAssignment(this.outgoingWire)
            .subscribe((ret: any) => {
                    this.growler.growlSuccess('Success', 'Retail Wire Out Assigned Successfully');
                },
                (err: any) => {
                    this.growler.growlError("Error", "Error creating retail wire out assignment");
                });
    }

    cancel() {
        console.log("cancelled!");
    }

    clear() {
        this.initializeObjects();
        this.outgoingWire.RequestedBy = '';
        this.outgoingWire.ByOrderOf = '';
        this.outgoingWire.Description = '';
    }

    saveAndFinishLater() {
        this.outgoingWire.IsFinished = false;
        this.outgoingWire.Authorization = this.authorizationComponent.authorization;
        this.outgoingWire.ReceivingBank = this.receivingBankComponent.abaModel;
        this.outgoingWire.FinalBank = this.finalBankComponent.finalBank;
        this.outgoingWire.BeneficiaryInfo = this.beneficiaryComponent.beneficiaryInfo;
        this.outgoingWire.FurtherCreditInfo = this.furtherCreditInfoComponent.creditInfo;
        this.outgoingWire.AuditInfo = this.auditInfoComponent.auditInfo;

        this.wiresDataService.insertWireOutAssignment(this.outgoingWire)
            .subscribe((ret: any) => {
                    this.growler.growlSuccess('Success', 'Retail Wire Out Assigned Successfully');
                },
                (err: any) => {
                    this.growler.growlError("Error", "Error creating retail wire out assignment");
                });
    }
}