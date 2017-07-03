import { Component, OnInit, Input } from '@angular/core';
import { AchApprover } from '../../../../../shared/models/ach/ach-approver.model';
import { Customer } from './../../../../../shared/models/customer.model';
import { GrowlerMediatorService } from './../../../../../core/services/mediators/growler-mediator.service';
import { CustomerService } from './../../../../../core/services/customer.service';
import { WiresInDataService } from '../../../../../core/services/wires/wires-in-data.service';
import { Utilities } from '../../../../../shared/utilities.service';
import { AchDataService } from '../../../../../core/services/ach/ach-data.service';
import {RetailWireOutAuditInfo} from "../../../../../shared/models/wires/retail-wire-out-audit-info.model";
import * as moment from 'moment';
import { Headers } from "@angular/http";
import {RetailWireOut} from "../../../../../shared/models/wires/retail-wire-out.model";
import {SettingsService} from "../../../../../core/services/settings.service";

@Component({
    selector: 'app-audit-info',
    templateUrl: './audit-info.component.html',
    styleUrls: ['./audit-info.component.scss']
})
export class AuditInfoComponent implements OnInit {
    public auditInfo: RetailWireOutAuditInfo;
    private customer: Customer;
    approvers: AchApprover[];
    utilities: Utilities;
    public headers: Headers;
    @Input() outgoingWire: RetailWireOut;

    constructor(private customerService: CustomerService,
        public achDataService: AchDataService,
        public wiresDataService: WiresInDataService,
        private growler: GrowlerMediatorService,
        private settingsService: SettingsService) {
    }

    ngOnInit() {
        this.initializeObjects();
    }

    initializeObjects() {
        this.utilities = new Utilities();
        this.customer = this.customerService.selectedCustomer;
        this.auditInfo = new RetailWireOutAuditInfo();
        this.auditInfo.Approver = new AchApprover();
        this.auditInfo.Approver = this.utilities.defaultDropDownValue;
        this.auditInfo.PreparedOn = moment().format('MM/DD/YYYY, h:mm:ss a');
        this.auditInfo.PreparedBy = this.settingsService.loggedOnUserName;
        this.getApprovers();
    }

    getApprovers() {
        if (this.customer != undefined) {
            this.achDataService.getApprovers(this.customer.Id)
                .subscribe((ret: AchApprover[]) => {
                    if (ret && ret.length > 0) {
                        this.approvers = ret;
                    }
                },
                (err: any) => {
                    this.growler.growlError("Error", "Error getting approvers: " + err);
                });
        }
    }

}