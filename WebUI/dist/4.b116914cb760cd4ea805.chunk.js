webpackJsonp([4],{

/***/ 1048:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var shared_module_1 = __webpack_require__(94);
var internal_transfer_setup_component_1 = __webpack_require__(1096);
var internal_transfer_routing_1 = __webpack_require__(1134);
var customer_search_modal_component_1 = __webpack_require__(1101);
var view_transfer_modal_component_1 = __webpack_require__(1065);
var transfer_list_component_1 = __webpack_require__(1097);
var InternalTransferModule = (function () {
    function InternalTransferModule() {
    }
    return InternalTransferModule;
}());
InternalTransferModule = __decorate([
    core_1.NgModule(({
        imports: [internal_transfer_routing_1.internalTransferRouting, shared_module_1.SharedModule],
        providers: [internal_transfer_routing_1.appRoutingProviders],
        declarations: [internal_transfer_setup_component_1.InternalTransferSetupComponent, customer_search_modal_component_1.CustomerSearchModalComponent, view_transfer_modal_component_1.ViewTransferModalComponent, transfer_list_component_1.InternalTransferListComponent],
        entryComponents: [internal_transfer_setup_component_1.InternalTransferSetupComponent, customer_search_modal_component_1.CustomerSearchModalComponent, view_transfer_modal_component_1.ViewTransferModalComponent, transfer_list_component_1.InternalTransferListComponent]
    }))
], InternalTransferModule);
exports.InternalTransferModule = InternalTransferModule;


/***/ }),

/***/ 1052:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utilities = (function () {
    function Utilities() {
        this.defaultDropDownValue = undefined;
    }
    return Utilities;
}());
exports.Utilities = Utilities;


/***/ }),

/***/ 1053:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GenericDropDownModel = (function () {
    function GenericDropDownModel() {
    }
    return GenericDropDownModel;
}());
exports.GenericDropDownModel = GenericDropDownModel;


/***/ }),

/***/ 1060:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AuditInfo = (function () {
    function AuditInfo() {
    }
    return AuditInfo;
}());
exports.AuditInfo = AuditInfo;


/***/ }),

/***/ 1065:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var days_of_the_week_component_1 = __webpack_require__(158);
var weekly_component_1 = __webpack_require__(160);
var monthly_component_1 = __webpack_require__(159);
var monthly_schedule_model_1 = __webpack_require__(157);
var days_of_the_week_model_1 = __webpack_require__(156);
var ViewTransferModalComponent = (function (_super) {
    __extends(ViewTransferModalComponent, _super);
    function ViewTransferModalComponent(dialogService) {
        return _super.call(this, dialogService) || this;
    }
    ViewTransferModalComponent.prototype.ngOnInit = function () {
        this.initializeObjects();
    };
    ViewTransferModalComponent.prototype.initializeObjects = function () {
        if (!this.transferObject.Schedule.RecurringSchedule.MonthlySchedule) {
            this.transferObject.Schedule.RecurringSchedule.MonthlySchedule = new monthly_schedule_model_1.MonthlySchedule();
            this.transferObject.Schedule.RecurringSchedule.MonthlySchedule.DaysOfTheWeek =
                new days_of_the_week_model_1.DaysOfTheWeek();
            this.transferObject.Schedule.RecurringSchedule.MonthlySchedule.CalendarDays = [];
            this.transferObject.Schedule.RecurringSchedule.MonthlySchedule.PayOnIndex = [];
        }
        this.minDate = new Date();
    };
    ViewTransferModalComponent.prototype.confirm = function () {
        this.result = true;
        this.close();
    };
    ViewTransferModalComponent.prototype.cancel = function () {
        this.result = false;
        this.dialogService.removeAll();
    };
    return ViewTransferModalComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
__decorate([
    core_1.ViewChild(days_of_the_week_component_1.DaysOfTheWeekComponent),
    __metadata("design:type", days_of_the_week_component_1.DaysOfTheWeekComponent)
], ViewTransferModalComponent.prototype, "daysOfTheWeekComponent", void 0);
__decorate([
    core_1.ViewChild(weekly_component_1.WeeklyComponent),
    __metadata("design:type", weekly_component_1.WeeklyComponent)
], ViewTransferModalComponent.prototype, "weeklyComponent", void 0);
__decorate([
    core_1.ViewChild(monthly_component_1.MonthlyComponent),
    __metadata("design:type", monthly_component_1.MonthlyComponent)
], ViewTransferModalComponent.prototype, "monthlyComponent", void 0);
ViewTransferModalComponent = __decorate([
    core_1.Component({
        selector: 'ta-view-transfer',
        template: __webpack_require__(1210)
    }),
    __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService])
], ViewTransferModalComponent);
exports.ViewTransferModalComponent = ViewTransferModalComponent;


/***/ }),

/***/ 1096:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var generic_dropdown_model_1 = __webpack_require__(1053);
var moment = __webpack_require__(2);
var central_codes_data_service_1 = __webpack_require__(62);
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(13);
var forms_1 = __webpack_require__(15);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var internal_transfer_transaction_template_model_1 = __webpack_require__(1143);
var customer_search_modal_component_1 = __webpack_require__(1101);
var view_payments_modal_component_1 = __webpack_require__(394);
var scheduler_component_1 = __webpack_require__(396);
var ach_data_service_1 = __webpack_require__(384);
var growler_mediator_service_1 = __webpack_require__(35);
var customer_service_1 = __webpack_require__(54);
var audit_info_1 = __webpack_require__(1060);
var utilities_service_1 = __webpack_require__(1052);
var schedule_type_model_1 = __webpack_require__(1148);
var internal_transfer_data_service_1 = __webpack_require__(391);
var view_transfer_modal_component_1 = __webpack_require__(1065);
var internal_transfer_mediator_service_1 = __webpack_require__(393);
var routes_factory_1 = __webpack_require__(75);
var InternalTransferSetupComponent = (function () {
    function InternalTransferSetupComponent(dialogService, achDataService, growler, customerService, centralCodesDataService, internalTransferDataService, router, internalTransferService) {
        this.dialogService = dialogService;
        this.achDataService = achDataService;
        this.growler = growler;
        this.customerService = customerService;
        this.centralCodesDataService = centralCodesDataService;
        this.internalTransferDataService = internalTransferDataService;
        this.router = router;
        this.internalTransferService = internalTransferService;
        this.isFeeCodeValid = true;
        this.isValid = false;
    }
    InternalTransferSetupComponent.prototype.ngOnInit = function () {
        this.initializeObjects();
    };
    InternalTransferSetupComponent.prototype.initializeObjects = function () {
        this.utilities = new utilities_service_1.Utilities();
        if (this.internalTransferService.copiedTransfer) {
            this.initializeForEditTransfer();
            return;
        }
        this.initializeForNewTransfer();
    };
    InternalTransferSetupComponent.prototype.initializeForNewTransfer = function () {
        var _this = this;
        this.isEdit = false;
        this.transferObject = new internal_transfer_transaction_template_model_1.InternalTransferTransactionTemplate();
        this.transferObject.FromCustomer = this.customerService.selectedCustomer;
        this.transferObject.IsActive = true;
        this.transferObject.AuditInfo = new audit_info_1.AuditInfo();
        this.feeCodeHasBeenEdited = false;
        this.transferObject.OtherFeeCode = new generic_dropdown_model_1.GenericDropDownModel();
        this.transferObject.OtherFeeCode.Id = 1;
        this.transferObject.OtherFeeCode.Description = 'Test';
        this.initializeDropdowns();
        this.growlIfNoAccounts(this.transferObject.FromCustomer.AccountNumbers);
        var applyOptionsCallback = function (ret) {
            if (ret && ret.length > 0) {
                _this.howToApplyList = ret;
            }
        };
        this.getHowToApplyOptions(applyOptionsCallback);
        var feeOptionsCallback = function (ret) {
            if (ret && ret.length > 0) {
                _this.feeCodeList = ret;
                _this.filteredFeeCodeList = _this.feeCodeList;
            }
        };
        this.getFeeCodesOptions(feeOptionsCallback);
    };
    InternalTransferSetupComponent.prototype.initializeForEditTransfer = function () {
        var _this = this;
        this.isEdit = true;
        this.transferObject = this.internalTransferService.copiedTransfer;
        this.internalTransferService.copiedTransfer = undefined;
        var fromAccount = this.transferObject.FromCustomer.AccountNumbers.find(function (a) { return a.AccountId === _this.transferObject.FromAccount.AccountId; });
        var toAccount = this.transferObject.ToCustomer.AccountNumbers.find(function (a) { return a.AccountId === _this.transferObject.ToAccount.AccountId; });
        this.transferObject.FromAccount = fromAccount;
        this.transferObject.ToAccount = toAccount;
        this.formRequired = this.transferObject.IsForm2279Complete;
        var applyOptionsCallback = function (ret) {
            if (ret && ret.length > 0) {
                _this.howToApplyList = ret;
                var howToApply = _this.howToApplyList.find(function (h) { return h.Id === _this.transferObject.HowToApply.Id; });
                _this.transferObject.HowToApply = howToApply;
            }
        };
        this.getHowToApplyOptions(applyOptionsCallback);
        if (this.transferObject.OtherFeeCode) {
            var feeOptionsCallback = function (ret) {
                if (ret && ret.length > 0) {
                    _this.feeCodeList = ret;
                    _this.filteredFeeCodeList = _this.feeCodeList;
                    var feeCode = _this.feeCodeList.find(function (f) { return f.Id === _this.transferObject.OtherFeeCode.Id; });
                    _this.transferObject.OtherFeeCode = feeCode;
                }
            };
            this.getFeeCodesOptions(feeOptionsCallback);
        }
        if (this.transferObject.Schedule.Frequency === 'recurring' && this.transferObject.Schedule.EndPaymentDate == null) {
            this.transferObject.Schedule.EndPaymentDate = 'No End Date';
        }
        if (this.transferObject.Schedule.Frequency === 'recurring' && moment(this.transferObject.StartDate).isSameOrBefore(moment(), 'day')) {
            this.editingRecurring = true;
        }
    };
    InternalTransferSetupComponent.prototype.initializeDropdowns = function () {
        this.transferObject.FromAccount = this.utilities.defaultDropDownValue;
        this.transferObject.ToAccount = this.utilities.defaultDropDownValue;
        this.transferObject.HowToApply = this.utilities.defaultDropDownValue;
        this.transferObject.OtherFeeCode = this.utilities.defaultDropDownValue;
    };
    InternalTransferSetupComponent.prototype.chooseFromCustomer = function () {
        var _this = this;
        this.dialogService.addDialog(customer_search_modal_component_1.CustomerSearchModalComponent, {}).subscribe(function (fromCustomer) {
            if (fromCustomer) {
                _this.transferObject.FromCustomer = fromCustomer;
                _this.customerService.selectedCustomer = fromCustomer;
                _this.transferObject.FromAccount = _this.utilities.defaultDropDownValue;
                _this.growlIfNoAccounts(_this.transferObject.FromCustomer.AccountNumbers);
                if (_this.sameCustomer) {
                    _this.transferObject.ToCustomer = fromCustomer;
                }
            }
        });
    };
    InternalTransferSetupComponent.prototype.chooseToCustomer = function () {
        var _this = this;
        this.dialogService.addDialog(customer_search_modal_component_1.CustomerSearchModalComponent, {}).subscribe(function (toCustomer) {
            if (toCustomer) {
                _this.transferObject.ToCustomer = toCustomer;
                _this.transferObject.ToAccount = _this.utilities.defaultDropDownValue;
                _this.growlIfNoAccounts(_this.transferObject.ToCustomer.AccountNumbers);
            }
        });
    };
    InternalTransferSetupComponent.prototype.getHowToApplyOptions = function (successCallback) {
        var _this = this;
        this.centralCodesDataService.getHowToApplyList()
            .subscribe(successCallback, function (err) {
            _this.growler.growlError("Error", "Error getting How to Apply Data");
        });
    };
    InternalTransferSetupComponent.prototype.getFeeCodesOptions = function (successCallback) {
        var _this = this;
        this.centralCodesDataService.getOtherFees()
            .subscribe(successCallback, function (err) {
            _this.growler.growlError("Error", "Error getting Other Fees Data");
        });
    };
    InternalTransferSetupComponent.prototype.howToApplyChanged = function () {
        if (this.transferObject.ToAccount && this.transferObject.HowToApply) {
            this.excessRequired = this.transferObject.HowToApply.Description === 'Scheduled Payment + Excess';
        }
        if (this.transferObject.HowToApply.Description === 'Scheduled Payment' || this.transferObject.HowToApply.Description === 'Scheduled Payment + Excess') {
            var scheduledPaymentAmmount = this.transferObject.ToAccount.ScheduledPaymentAmount;
            this.transferObject.Amount = scheduledPaymentAmmount ? scheduledPaymentAmmount.toString() : '';
        }
        if (this.transferObject.HowToApply.Description !== 'Scheduled Payment + Excess') {
            this.transferObject.ExcessAmount = undefined;
        }
        if (this.transferObject.HowToApply.Id !== 10) {
            this.transferObject.OtherFeeCode = this.utilities.defaultDropDownValue;
        }
    };
    InternalTransferSetupComponent.prototype.checkExcessAmount = function (event) {
        if ((this.transferObject.ToAccount.PrePayRestriction === '1') && (event > 250)) {
            this.excessAmountExceedsLimit = true;
            return;
        }
        this.excessAmountExceedsLimit = false;
    };
    InternalTransferSetupComponent.prototype.openScheduler = function () {
        var _this = this;
        var schedulerModel = this.transferObject.Schedule;
        this.dialogService.addDialog(scheduler_component_1.SchedulerComponent, {
            schedulerContainer: schedulerModel,
            prepaymentRestriction: this.transferObject.ToAccount && this.transferObject.ToAccount.PrePayRestriction ? this.transferObject.ToAccount.PrePayRestriction : '0',
            verbalAchReceived: false,
            minDate: moment().subtract(1, 'day').toDate()
        }).subscribe(function (schedulerData) {
            if (schedulerData) {
                _this.transferObject.Schedule = schedulerData;
                var scheduleType = _this.getScheduleType(schedulerData);
                _this.isForm2279Required(scheduleType);
                _this.internalTransferForm.form.markAsDirty();
            }
        });
    };
    InternalTransferSetupComponent.prototype.viewPayments = function () {
        this.dialogService.addDialog(view_payments_modal_component_1.ViewPaymentsModalComponent, {
            title: 'Upcoming Payments',
            message: '',
            confirmText: '',
            cancelText: 'Close',
            upcomingPayments: this.transferObject.Schedule.NextPaymentDates
        }).subscribe(function (isConfirmed) {
        });
    };
    InternalTransferSetupComponent.prototype.getScheduleType = function (schedule) {
        if (!schedule) {
            return schedule_type_model_1.ScheduleType.None;
        }
        if (schedule.Frequency === 'once') {
            return schedule_type_model_1.ScheduleType.OneTime;
        }
        if (schedule.RecurringSchedule.Frequency === 'weekly') {
            return schedule_type_model_1.ScheduleType.Weekly;
        }
        if (schedule.RecurringSchedule.Frequency === 'quarterly') {
            return schedule_type_model_1.ScheduleType.Quarterly;
        }
        if (schedule.RecurringSchedule.Frequency === 'annual') {
            return schedule_type_model_1.ScheduleType.Annual;
        }
        if (schedule.RecurringSchedule.MonthlySchedule.RecurBy === 'calendarDay') {
            return schedule_type_model_1.ScheduleType.MonthlyCalendarDays;
        }
        return schedule_type_model_1.ScheduleType.MonthlyDaysOfWeek;
    };
    InternalTransferSetupComponent.prototype.isForm2279Required = function (scheduleType) {
        var _this = this;
        this.internalTransferDataService.isForm2279Needed(this.transferObject.FromCustomer.Id, this.transferObject.FromAccount.AccountId, this.transferObject.ToCustomer.Id, this.transferObject.ToAccount.AccountId, scheduleType)
            .subscribe(function (ret) {
            _this.formRequired = ret;
        });
    };
    InternalTransferSetupComponent.prototype.toggleSameCustomer = function () {
        this.sameCustomer = !this.sameCustomer;
        if (!this.sameCustomer) {
            return;
        }
        this.transferObject.ToCustomer = this.transferObject.FromCustomer;
    };
    InternalTransferSetupComponent.prototype.isFormValid = function () {
        this.excessAmountExceedsLimit = false;
        this.noSchedule = false;
        var isValid = !this.internalTransferForm.invalid;
        if (this.transferObject.ToAccount.PrePayRestriction === '1' && +this.transferObject.ExcessAmount >= 250) {
            this.excessAmountExceedsLimit = true;
            isValid = false;
        }
        if (!this.transferObject.Schedule) {
            this.noSchedule = true;
            isValid = false;
        }
        return isValid;
    };
    InternalTransferSetupComponent.prototype.submit = function () {
        if (this.internalTransferForm.invalid) {
            return;
        }
        this.isValid = this.isFormValid();
        if (!this.isValid) {
            return;
        }
        if (this.isEdit) {
            this.submitForEditTransfer();
            return;
        }
        this.submitForNewTransfer();
    };
    InternalTransferSetupComponent.prototype.submitForEditTransfer = function () {
        var _this = this;
        this.dialogService.addDialog(view_transfer_modal_component_1.ViewTransferModalComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to save this edited transfer?',
            confirmText: 'Save',
            cancelText: 'Cancel',
            transferObject: this.transferObject,
            isForm2279Required: this.formRequired
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.internalTransferDataService.deleteInternalTransfer(_this.transferObject.TransactionId)
                    .subscribe(function (ret) {
                    _this.transferObject.TransactionId = undefined;
                    _this.internalTransferDataService.submitInternalTransfer(_this.transferObject)
                        .subscribe(function (ret) {
                        _this.growler.growlSuccess("Success", "The internal transfer was successfully edited");
                        _this.router.navigate([routes_factory_1.RoutesFactory.createInternalTransferListRoute(_this.customerService.selectedCustomer.Id)]);
                    });
                });
            }
        });
    };
    InternalTransferSetupComponent.prototype.submitForNewTransfer = function () {
        var _this = this;
        this.dialogService.addDialog(view_transfer_modal_component_1.ViewTransferModalComponent, {
            title: 'Confirmation',
            message: 'Are you sure you want to submit this transfer?',
            confirmText: 'Save',
            cancelText: 'Cancel',
            transferObject: this.transferObject,
            isForm2279Required: this.formRequired
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.internalTransferDataService.submitInternalTransfer(_this.transferObject)
                    .subscribe(function (ret) {
                    _this.growler.growlSuccess("Success", "The internal transfer was successfully set up");
                    _this.router.navigate([routes_factory_1.RoutesFactory.createInternalTransferListRoute(_this.customerService.selectedCustomer.Id)]);
                });
            }
        });
    };
    InternalTransferSetupComponent.prototype.cancel = function () {
        this.router.navigate([routes_factory_1.RoutesFactory.createInternalTransferListRoute(this.customerService.selectedCustomer.Id)]);
    };
    InternalTransferSetupComponent.prototype.growlIfNoAccounts = function (accountNumbers) {
        if (accountNumbers === null || (accountNumbers && accountNumbers.length < 1)) {
            this.growler.growlError("Error", "No accounts for this customer!");
        }
    };
    InternalTransferSetupComponent.prototype.feeCodeSearch = function (event) {
        if (event.query && event.query.length > 0) {
            this.filteredFeeCodeList = this.feeCodeList.filter(function (e) { return e.Description.toLowerCase().includes(event.query.toLowerCase()); });
        }
        else {
            this.filteredFeeCodeList = this.feeCodeList;
        }
    };
    InternalTransferSetupComponent.prototype.validateSelectedFeeCode = function (event) {
        this.feeCodeHasBeenEdited = true;
        if (this.transferObject.OtherFeeCode === undefined || this.transferObject.OtherFeeCode === null) {
            this.isFeeCodeValid = false;
            return;
        }
        var matches = this.feeCodeList.filter(function (e) { return e.Description.toLowerCase() === event.srcElement.value.toLowerCase(); }).length;
        if (event.srcElement.value && matches <= 0) {
            this.isFeeCodeValid = false;
            return;
        }
        if (matches === 1) {
            this.transferObject.OtherFeeCode = this.feeCodeList.find(function (e) { return e.Description.toLowerCase() === event.srcElement.value.toLowerCase(); });
        }
        this.isFeeCodeValid = true;
    };
    InternalTransferSetupComponent.prototype.otherFeeSelected = function (event) {
        this.isFeeCodeValid = true;
    };
    InternalTransferSetupComponent.prototype.handleDropdownClick = function (event) {
        var _this = this;
        this.filteredFeeCodeList = [];
        setTimeout(function () {
            _this.filteredFeeCodeList = _this.feeCodeList;
        }, 100);
    };
    return InternalTransferSetupComponent;
}());
__decorate([
    core_1.ViewChild('internalTransferForm'),
    __metadata("design:type", forms_1.NgForm)
], InternalTransferSetupComponent.prototype, "internalTransferForm", void 0);
InternalTransferSetupComponent = __decorate([
    core_1.Component({
        selector: 'internal-transfer-setup',
        template: __webpack_require__(1208),
        styles: [__webpack_require__(1282)]
    }),
    __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService, ach_data_service_1.AchDataService,
        growler_mediator_service_1.GrowlerMediatorService, customer_service_1.CustomerService, central_codes_data_service_1.CentralCodesDataService,
        internal_transfer_data_service_1.InternalTransferDataService, router_1.Router, internal_transfer_mediator_service_1.InternalTransferMediatorService])
], InternalTransferSetupComponent);
exports.InternalTransferSetupComponent = InternalTransferSetupComponent;


/***/ }),

/***/ 1097:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(13);
var core_1 = __webpack_require__(0);
var customer_service_1 = __webpack_require__(54);
var internal_transfer_data_service_1 = __webpack_require__(391);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var confirm_modal_component_1 = __webpack_require__(383);
var growler_mediator_service_1 = __webpack_require__(35);
var view_transfer_modal_component_1 = __webpack_require__(1065);
var internal_transfer_mediator_service_1 = __webpack_require__(393);
var moment = __webpack_require__(2);
var routes_factory_1 = __webpack_require__(75);
var InternalTransferListComponent = (function () {
    function InternalTransferListComponent(customerService, internalTransferDataService, router, dialogService, growlerMediatorService, internalTransferService) {
        this.customerService = customerService;
        this.internalTransferDataService = internalTransferDataService;
        this.router = router;
        this.dialogService = dialogService;
        this.growlerMediatorService = growlerMediatorService;
        this.internalTransferService = internalTransferService;
    }
    InternalTransferListComponent.prototype.ngOnInit = function () {
        this.initializeObjects();
    };
    InternalTransferListComponent.prototype.initializeObjects = function () {
        this.getInternalTransfers();
    };
    InternalTransferListComponent.prototype.getInternalTransfers = function () {
        var _this = this;
        this.internalTransferDataService.getInternalTransfers(this.customerService.selectedCustomer.Id)
            .subscribe(function (ret) {
            _this.transfers = ret;
        }, function (err) {
            console.log(err);
        });
    };
    InternalTransferListComponent.prototype.addNew = function () {
        this.router.navigate([routes_factory_1.RoutesFactory.createInternalTransferSetupRoute(this.customerService.selectedCustomer.Id)]);
    };
    InternalTransferListComponent.prototype.viewTransfer = function (transfer) {
        var _this = this;
        this.selectedTemplate = Object.assign({}, transfer);
        this.dialogService.addDialog(view_transfer_modal_component_1.ViewTransferModalComponent, {
            title: 'View Transfer',
            message: '',
            confirmText: 'OK',
            cancelText: '',
            transferObject: transfer,
            isForm2279Required: transfer.IsForm2279Complete
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) { }
            _this.selectedTemplate = undefined;
        });
    };
    InternalTransferListComponent.prototype.editTransfer = function (transfer) {
        var currentDate = new Date();
        this.selectedTemplate = Object.assign({}, transfer);
        if ((transfer.Schedule.Frequency === 'once') && (moment(transfer.Schedule.OneTimePaymentDate).isSameOrBefore(currentDate, 'day'))) {
            var message;
            if (moment(transfer.Schedule.OneTimePaymentDate).isSame(currentDate, 'day')) {
                message = 'Transfers scheduled for today have already been processed.';
            }
            else {
                message = 'This transfer has already been processed.';
            }
            this.editForOneTimeProcessingToday(message);
            return;
        }
        this.internalTransferService.copiedTransfer = transfer;
        this.router.navigate([routes_factory_1.RoutesFactory.createInternalTransferSetupRoute(this.customerService.selectedCustomer.Id)]);
    };
    InternalTransferListComponent.prototype.editForActiveRecurringTransfer = function (transfer) {
        var _this = this;
        this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
            title: 'Confirm',
            message: "You are only able to edit payments scheduled after today. Are you sure you want to edit future payments for this Internal Transfer?",
            confirmText: 'Yes',
            cancelText: 'No'
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.internalTransferService.copiedTransfer = transfer;
                _this.router.navigate([routes_factory_1.RoutesFactory.createInternalTransferSetupRoute(_this.customerService.selectedCustomer.Id)]);
            }
        }, function (err) {
            console.log(err);
        });
    };
    InternalTransferListComponent.prototype.editForOneTimeProcessingToday = function (message) {
        var _this = this;
        this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
            title: 'Confirm',
            message: message,
            confirmText: 'OK',
            cancelText: ''
        }).subscribe(function (isConfirmed) {
            _this.selectedTemplate = undefined;
        });
    };
    InternalTransferListComponent.prototype.confirmDelete = function (transfer) {
        var currentDate = new Date();
        this.selectedTemplate = Object.assign({}, transfer);
        if (transfer.Schedule.NextPaymentDates && (transfer.Schedule.NextPaymentDates.length > 0) && moment(transfer.StartDate).isSameOrBefore(currentDate, 'day')) {
            this.deleteForActiveRecurringTransfer(transfer);
            return;
        }
        if ((transfer.Schedule.Frequency === 'once') && (moment(transfer.Schedule.OneTimePaymentDate).isSameOrBefore(currentDate, 'day'))) {
            var message;
            if (moment(transfer.Schedule.OneTimePaymentDate).isSame(currentDate, 'day')) {
                message = 'Transfers scheduled for today have already been processed.';
            }
            else {
                message = 'This transfer has already been processed.';
            }
            this.deleteForOneTimeProcessingToday(message);
            return;
        }
        this.deleteForTransferHasNotReachedStartDate(transfer);
    };
    InternalTransferListComponent.prototype.deleteTransfer = function (transfer) {
        var _this = this;
        this.internalTransferDataService.deleteInternalTransfer(transfer.TransactionId)
            .subscribe(function (ret) {
            _this.getInternalTransfers();
            _this.growlerMediatorService.growlSuccess('Success', 'Transfer has been deleted successfully');
        }, function (err) {
            console.log(err);
        });
    };
    InternalTransferListComponent.prototype.deleteForActiveRecurringTransfer = function (transfer) {
        var _this = this;
        this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
            title: 'Confirm',
            message: "You are only able to delete payments scheduled after today. Are you sure you want to delete future payments for this Internal Transfer?",
            confirmText: 'Yes',
            cancelText: 'No'
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.deleteTransfer(transfer);
            }
            _this.selectedTemplate = undefined;
        }, function (err) {
            console.log(err);
        });
    };
    InternalTransferListComponent.prototype.deleteForOneTimeProcessingToday = function (message) {
        var _this = this;
        this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
            title: 'Confirm',
            message: message,
            confirmText: 'OK',
            cancelText: ''
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) { }
            _this.selectedTemplate = undefined;
        });
    };
    InternalTransferListComponent.prototype.deleteForTransferHasNotReachedStartDate = function (transfer) {
        var _this = this;
        this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
            title: 'Confirm',
            message: "Are you sure you want to delete this Internal Transfer?",
            confirmText: 'Yes',
            cancelText: 'No'
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.deleteTransfer(transfer);
            }
            _this.selectedTemplate = undefined;
        }, function (err) {
            console.log(err);
        });
    };
    return InternalTransferListComponent;
}());
InternalTransferListComponent = __decorate([
    core_1.Component({
        selector: 'internal-transfer-list',
        template: __webpack_require__(1209),
        styles: [__webpack_require__(1283)]
    }),
    __metadata("design:paramtypes", [customer_service_1.CustomerService,
        internal_transfer_data_service_1.InternalTransferDataService,
        router_1.Router, ng2_bootstrap_modal_1.DialogService,
        growler_mediator_service_1.GrowlerMediatorService,
        internal_transfer_mediator_service_1.InternalTransferMediatorService])
], InternalTransferListComponent);
exports.InternalTransferListComponent = InternalTransferListComponent;


/***/ }),

/***/ 1101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var customers_search_data_service_1 = __webpack_require__(76);
var CustomerSearchModalComponent = (function (_super) {
    __extends(CustomerSearchModalComponent, _super);
    function CustomerSearchModalComponent(dialogService, searchDataService) {
        var _this = _super.call(this, dialogService) || this;
        _this.searchDataService = searchDataService;
        return _this;
    }
    CustomerSearchModalComponent.prototype.handleKeyboardEvent = function (event) {
        if (event.key !== "Enter") {
            return;
        }
        this.confirm();
    };
    CustomerSearchModalComponent.prototype.search = function (query) {
        var _this = this;
        this.searchDataService.search(query)
            .subscribe(function (ret) {
            _this.searching = false;
            _this.customers = ret.Customers;
            _this.customers.forEach(function (cust) {
                cust.GridDisplayAccount = cust.AccountNumbers.length;
            });
        });
    };
    CustomerSearchModalComponent.prototype.customerSelected = function (event) {
        this.result = event;
    };
    CustomerSearchModalComponent.prototype.confirm = function () {
        if (!this.result) {
            return;
        }
        this.close();
    };
    CustomerSearchModalComponent.prototype.cancel = function () {
        this.result = undefined;
        this.close();
    };
    return CustomerSearchModalComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
__decorate([
    core_1.HostListener('document:keypress', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], CustomerSearchModalComponent.prototype, "handleKeyboardEvent", null);
CustomerSearchModalComponent = __decorate([
    core_1.Component({
        selector: 'ta-customer-search',
        template: __webpack_require__(1216),
        styles: [__webpack_require__(1286)]
    }),
    __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService, customers_search_data_service_1.CustomerSearchDataService])
], CustomerSearchModalComponent);
exports.CustomerSearchModalComponent = CustomerSearchModalComponent;


/***/ }),

/***/ 1134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(13);
var internal_transfer_setup_component_1 = __webpack_require__(1096);
var transfer_list_component_1 = __webpack_require__(1097);
var routes = [
    { path: 'setup', component: internal_transfer_setup_component_1.InternalTransferSetupComponent },
    { path: 'list', component: transfer_list_component_1.InternalTransferListComponent }
];
exports.appRoutingProviders = [];
exports.internalTransferRouting = router_1.RouterModule.forChild(routes);


/***/ }),

/***/ 1143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InternalTransferTransactionTemplate = (function () {
    function InternalTransferTransactionTemplate() {
    }
    return InternalTransferTransactionTemplate;
}());
exports.InternalTransferTransactionTemplate = InternalTransferTransactionTemplate;


/***/ }),

/***/ 1148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ScheduleType;
(function (ScheduleType) {
    ScheduleType[ScheduleType["None"] = 0] = "None";
    ScheduleType[ScheduleType["OneTime"] = 1] = "OneTime";
    ScheduleType[ScheduleType["Quarterly"] = 4] = "Quarterly";
    ScheduleType[ScheduleType["MonthlyDaysOfWeek"] = 5] = "MonthlyDaysOfWeek";
    ScheduleType[ScheduleType["Weekly"] = 7] = "Weekly";
    ScheduleType[ScheduleType["MonthlyCalendarDays"] = 31] = "MonthlyCalendarDays";
    ScheduleType[ScheduleType["Annual"] = 365] = "Annual";
})(ScheduleType = exports.ScheduleType || (exports.ScheduleType = {}));


/***/ }),

/***/ 1175:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".internal-transfer .form-checkbox {\n  padding-top: 27px; }\n\n.internal-transfer input[disabled] {\n  cursor: default; }\n\n.internal-transfer .same-customer-toggle label {\n  margin: 0; }\n\n.ui-inputtext {\n  height: 100%;\n  width: 96%;\n  padding: 0.5rem 0.75rem;\n  border: none; }\n\n.ui-button {\n  color: #000000;\n  background-color: #ffffff;\n  width: 3% !important;\n  border: none;\n  float: right; }\n\n.ui-button:hover {\n  color: #000000 !important;\n  background-color: #ffffff !important;\n  border: none !important; }\n", ""]);

// exports


/***/ }),

/***/ 1176:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1179:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".customer-search-modal-dialog {\n  max-width: 1000px !important; }\n  .customer-search-modal-dialog form {\n    margin-bottom: 15px; }\n", ""]);

// exports


/***/ }),

/***/ 1208:
/***/ (function(module, exports) {

module.exports = "<h2>Internal Transfer Setup</h2>\r\n<form (ngSubmit)=\"submit()\" #internalTransferForm=\"ngForm\">\r\n    <div class=\"ta-container internal-transfer\">\r\n        <ta-invalid-form-message [isSubmitted]=\"internalTransferForm.submitted\" [isValid]=\"isValid\"></ta-invalid-form-message>\r\n        <p *ngIf=\"editingRecurring\" class=\"text-danger\">Any changes made to this transfer will not affect payments processed on or before today.</p>\r\n        <hr />\r\n        <div class=\"row\">\r\n            <div class=\"col-md-4\">\r\n                <ta-form-group-validation [isRequired]=\"true\">\r\n                    <label>From Customer</label>\r\n                    <div class=\"input-group\">\r\n                        <input data-auto-id=\"internal_transfer_from_customer\" class=\"form-control form-control-sm\" disabled value=\"{{transferObject.FromCustomer ? transferObject.FromCustomer.DisplayName + ' | ' + transferObject.FromCustomer.Cif : ''}}\" />\r\n                        <span class=\"input-group-btn\">\r\n                            <button data-auto-id=\"internal_transfer_from_customer_button\" class=\"btn btn-default\" type=\"button\" (click)=\"chooseFromCustomer()\">\r\n                                <i class=\"fa fa-fw fa-ellipsis-h\"></i>\r\n                            </button>\r\n                        </span>\r\n                    </div>\r\n                </ta-form-group-validation>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                <ta-form-group-validation [isRequired]=\"true\">\r\n                    <label>From Account</label>\r\n                    <select data-auto-id=\"internal_transfer_from_account\" name=\"fromAccount\" id=\"fromAccount\" #fromAccount=\"ngModel\" class=\"form-control form-control-label-sm\" required [(ngModel)]=\"transferObject.FromAccount\">\r\n                        <option [value]=\"utilities.defaultDropDownValue\" disabled>Select an Account...</option>\r\n                        <option *ngFor=\"let account of transferObject.FromCustomer?.AccountNumbers\" [ngValue]=\"account\">{{account.AccountNumber}}</option>\r\n                    </select>\r\n                </ta-form-group-validation>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-4\">\r\n                <ta-form-group-validation [isRequired]=\"true\">\r\n                    <label>To Customer</label>\r\n                    <span class=\"pull-right same-customer-toggle\">\r\n                        <input data-auto-id=\"same_as_from_customer\" type=\"checkbox\" name=\"sameAsFromCustomer\" id=\"sameAsFromCustomer\" (change)=\"toggleSameCustomer($event)\">\r\n                        <span for=\"sameAsFromCustomer\" class=\"form-control-label form-control-label-sm\">Same customer</span>\r\n                    </span>\r\n                    <div class=\"input-group\">\r\n                        <input data-auto-id=\"internal_transfer_to_customer\" class=\"form-control form-control-sm\" name=\"tocustomer\" id=\"tocustomer\" disabled value=\"{{transferObject.ToCustomer ? transferObject.ToCustomer.DisplayName + ' | ' + transferObject.ToCustomer.Cif : ''}}\" />\r\n                        <label class=\"input-group-btn\">\r\n                            <button data-auto-id=\"internal_transfer_to_customer_button\" class=\"btn btn-default\" type=\"button\" (click)=\"chooseToCustomer()\" [disabled]=\"sameCustomer\">\r\n                                <i class=\"fa fa-fw fa-ellipsis-h\"></i>\r\n                            </button>\r\n                        </label>\r\n                    </div>\r\n                </ta-form-group-validation>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                <ta-form-group-validation [isRequired]=\"true\">\r\n                    <label>To Account</label>\r\n                    <select data-auto-id=\"internal_transfer_to_account\" name=\"toAccount\" id=\"toAccount\" #toAccount=\"ngModel\" class=\"form-control form-control-label-sm\" required [(ngModel)]=\"transferObject.ToAccount\">\r\n                        <option [value]=\"utilities.defaultDropDownValue\" disabled>Select an Account...</option>\r\n                        <option *ngFor=\"let account of transferObject.ToCustomer?.AccountNumbers\" [ngValue]=\"account\">{{account.AccountNumber}}</option>\r\n                    </select>\r\n                </ta-form-group-validation>\r\n            </div>\r\n        </div>\r\n\r\n        <div *ngIf=\"transferObject.FromCustomer && transferObject.ToCustomer && transferObject.FromAccount && transferObject.ToAccount\">\r\n            <hr />\r\n            <div class=\"row\">\r\n                <div class=\"col-md-4\">\r\n                    <ta-form-group-validation [isRequired]=\"true\">\r\n                        <label>How To Apply</label>\r\n                        <select data-auto-id=\"internal_transfer_how_to_apply\" name=\"howToApply\" id=\"howToApply\" #howToApply=\"ngModel\" class=\"form-control form-control-label-sm\" required [(ngModel)]=\"transferObject.HowToApply\" (change)=\"howToApplyChanged()\">\r\n                            <option [value]=\"utilities.defaultDropDownValue\" disabled>Select How to Apply</option>\r\n                            <option *ngFor=\"let howToApply of howToApplyList\" [ngValue]=\"howToApply\">{{howToApply.Description}}</option>\r\n                        </select>\r\n                        <div class=\"alert alert-danger\" [hidden]=\"howToApply.pristine || howToApply.valid || howToApply.model?.Id > 0\">How to Apply required</div>\r\n                    </ta-form-group-validation>\r\n                </div>\r\n                <div class=\"col-md-4\" *ngIf=\"transferObject.HowToApply?.Id === 10\">\r\n                    <ta-form-group-validation [isRequired]=\"true\" [isInvalid]=\"!isFeeCodeValid\">\r\n                        <label>Other Fee Code</label>\r\n                        <p-autoComplete name=\"otherFeeCode\" #otherFeeCode [(ngModel)]=\"transferObject.OtherFeeCode\" [minLength]=\"0\" styleClass=\"auto-complete-form-control form-control-label-sm\" [autoHighlight]=\"true\" required [suggestions]=\"filteredFeeCodeList\" (completeMethod)=\"feeCodeSearch($event)\" (onBlur)=\"validateSelectedFeeCode($event)\" (onDropdownClick)=\"handleDropdownClick($event)\"\r\n                                        (onSelect)=\"otherFeeSelected($event)\" [dropdown]=\"true\" field=\"Description\" placeholder=\"Select Other Fee Code\">\r\n                        </p-autoComplete>\r\n                        <ta-invalid-control-message [isInvalid]=\"!isFeeCodeValid\" [message]=\"'Please select a valid fee code.'\"></ta-invalid-control-message>\r\n                    </ta-form-group-validation>\r\n                </div>\r\n            </div>\r\n\r\n            <div *ngIf=\"excessRequired\" class=\"row\">\r\n                <div class=\"col-md-4\">\r\n                    <ta-form-group-validation [isRequired]=\"true\">\r\n                        <span>How To Apply Excess</span>\r\n                        <input data-auto-id=\"internal_transfer_how_to_apply_excess\" name=\"howToApplyExcess\" id=\"howToApplyExcess\" disabled class=\"form-control form-control-label-sm\" value=\"Principal Only\" />\r\n                    </ta-form-group-validation>\r\n                </div>\r\n                <div class=\"col-md-4\">\r\n                    <ta-form-group-validation [isRequired]=\"true\">\r\n                        <span>Excess Amount</span>\r\n                        <input data-auto-id=\"internal_transfer_excess_amount\" type=\"text\" class=\"form-control\" name=\"excessAmount\" id=\"excessAmount\" #excessAmount=\"ngModel\" currencyMask [options]=\"{ align: 'left', prefix: '$ ', thousands: ',', decimal: '.', precision: '2' }\" [(ngModel)]=\"transferObject.ExcessAmount\" (keyup)=\"checkExcessAmount(excessAmount.model)\" />\r\n                        <div class=\"alert alert-danger\" *ngIf=\"!excessAmount.pristine && excessAmount.model <= 0\">Excess amount required</div>\r\n                        <div class=\"alert alert-danger\" *ngIf=\"excessAmountExceedsLimit\">Excess Amount should be $250.00 or less</div>\r\n                    </ta-form-group-validation>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-4\">\r\n                    <ta-form-group-validation [isRequired]=\"true\">\r\n                        <span>Amount</span>\r\n                        <input data-auto-id=\"internal_transfer_amount\" type=\"text\" class=\"form-control\" name=\"amount\" id=\"amount\" #amount=\"ngModel\" currencyMask [options]=\"{ align: 'left', prefix: '$ ', thousands: ',', decimal: '.', precision: '2' }\" required [(ngModel)]=\"transferObject.Amount\" />\r\n                        <div class=\"alert alert-danger\" [hidden]=\"amount.pristine || amount.valid || amount.model > 0\">Amount required</div>\r\n                    </ta-form-group-validation>\r\n                </div>\r\n\r\n                <div class=\"col-md-4\">\r\n                    <ta-form-group-validation [isRequired]=\"true\">\r\n                        <span>Nickname</span>\r\n                        <input data-auto-id=\"internal_transfer_nickname\" type=\"text\" maxlength=\"20\" class=\"form-control form-control-sm\" name=\"nickname\" id=\"nickname\" #nickname=\"ngModel\" [(ngModel)]=\"transferObject.Nickname\" />\r\n                    </ta-form-group-validation>\r\n                </div>\r\n                <div class=\"col-md-4\">\r\n                    <div class=\"form-group form-checkbox\" *ngIf=\"formRequired\">\r\n                        <input data-auto-id=\"internal_transfer_form2279_received\" type=\"checkbox\" name=\"IsForm2279Complete\" id=\"IsForm2279Complete\" #IsForm2279Complete=\"ngModel\" required [(ngModel)]=\"transferObject.IsForm2279Complete\">&nbsp;\r\n                        <label for=\"IsForm2279Complete\" class=\"form-control-label form-control-label-sm\">Form 2279 Received</label>\r\n                        <div class=\"alert alert-danger\" [hidden]=\"IsForm2279Complete.pristine || IsForm2279Complete.valid || formRequired.model\">Form 2279 is required</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div *ngIf=\"transferObject.Schedule && transferObject.Schedule.FirstPaymentDate\" class=\"col-md-4\">\r\n                    <div class=\"form-group\">\r\n                        <span>First Payment Date</span>\r\n                        <input data-auto-id=\"internal_transfer_first_payment_date\" name=\"firstDate\" id=\"firstDate\" class=\"form-control form-control-sm\" value=\"{{transferObject.Schedule.FirstPaymentDate | dateformat: 'MM/DD/YYYY'}}\" readonly />\r\n                    </div>\r\n                </div>\r\n\r\n                <div *ngIf=\"transferObject.Schedule && transferObject.Schedule.EndPaymentDate\" class=\"col-md-4\">\r\n                    <div class=\"form-group\">\r\n                        <span>Payment End Date</span>\r\n                        <input data-auto-id=\"internal_transfer_end_payment_date\" name=\"endDate\" id=\"endDate\" class=\"form-control form-control-sm\" value=\"{{transferObject.Schedule.EndPaymentDate | dateformat: 'MM/DD/YYYY'}}\" readonly />\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <div class=\"col-md-4 ta-schedule-button\">\r\n                    <button data-auto-id=\"internal_transfer_schedule_payments\" type=\"button\" class=\"btn btn-default btn-block\" (click)=\"openScheduler()\">Schedule Transfer</button>\r\n                </div>\r\n                <div class=\"col-md-4 ta-schedule-button\" *ngIf=\"transferObject.Schedule && transferObject.Schedule.NextPaymentDates && transferObject.Schedule.NextPaymentDates.length > 0\">\r\n                    <button data-auto-id=\"internal_transfer_view_payments\" type=\"button\" class=\"btn btn-default btn-block\" (click)=\"viewPayments()\">View Upcoming Transfers</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <hr />\r\n        <div class=\"row justify-content-end\">\r\n            <div class=\"col-md-4\">\r\n                <div class=\"form-group pull-right\">\r\n                    <button data-auto-id=\"internal_transfer_submit_transfer\" type=\"submit\" class=\"ta-primary-button spaced\">Save</button>\r\n                    <button data-auto-id=\"internal_transfer_cancel_transfer\" (click)=\"cancel()\" type=\"button\" class=\"btn\">Cancel</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>";

/***/ }),

/***/ 1209:
/***/ (function(module, exports) {

module.exports = "<div class=\"ta-container\">\r\n    <div class=\"row no-gutters\">\r\n        <h2>Internal Transfers</h2>\r\n        <br />\r\n\r\n        <div class=\"col-md-12\">\r\n\r\n            <div class=\"btn-group pull-right separator-bottom\" role=\"group\">\r\n                <button type=\"button\" class=\"ta-primary-button btn-sm\" (click)=\"addNew()\" data-auto-id=\"new-transfer\">\r\n                    <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\r\n                    Create New Transfer\r\n                </button>\r\n            </div>\r\n\r\n            <p-dataTable id=\"transfer-list\" data-auto-id=\"transfer-list\" sortField=\"StartDate\" [(selection)] =\"selectedTemplate\" selectionMode=\"single\" dataKey=\"TransactionId\" sortOrder=\"-1\" [value]=\"transfers\" [rows]=\"10\" [paginator]=\"true\">\r\n\r\n\r\n                <p-column field=\"FromDisplay\" data-auto-id=\"internal-transfer-from\" header=\"From\" [sortable]=\"true\"></p-column>\r\n\r\n                <p-column field=\"ToDisplay\" data-auto-id=\"internal-transfer-to\" header=\"To\" [sortable]=\"true\"></p-column>\r\n\r\n                <p-column field=\"Amount\" header=\"Amount\" data-auto-id=\"internal-transfer-amount\" [sortable]=\"true\" [style]=\"{'width':'12%'}\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.Amount | currency:'USD':true}}\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n                <p-column field=\"ScheduleType\" header=\"Type\" data-auto-id=\"internal-transfer-type\" [sortable]=\"true\" [style]=\"{'width':'10%'}\"></p-column>\r\n\r\n                <p-column field=\"StartDate\" header=\"Start Date\" data-auto-id=\"internal-transfer-start-date\" [sortable]=\"true\" [style]=\"{'width':'12%'}\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.StartDate | dateformat:'MM/DD/YYYY'}}\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n                <p-column field=\"Nickname\" header=\"Nickname\" data-auto-id=\"internal-transfer-nickname\" [sortable]=\"true\"></p-column>\r\n\r\n                <p-column field=\"IsActive\" header=\"Status\" data-auto-id=\"internal-transfer-created-by\" [sortable]=\"true\" [style]=\"{'width':'10%'}\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.IsActive ? 'Active' : 'Completed'}}\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n                <p-column [style]=\"{'overflow':'visible', 'width':'10%'}\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        <div class=\"btn-group\">\r\n                            <button type=\"button\" class=\"btn btn-outline-primary dropdown-toggle btn-sm \" data-toggle=\"dropdown\" aria-haspopup=\"true\"\r\n                                    aria-expanded=\"false\">\r\n                                <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\r\n                            </button>\r\n                            <div class=\"ta-primary-dropdown-menu\">\r\n                                <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"viewTransfer(item)\">View Transfer</a>\r\n                                <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"editTransfer(item)\">Edit Transfer</a>\r\n                                <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"confirmDelete(item)\">Delete Transfer</a>\r\n                            </div>\r\n                        </div>\r\n                    </ng-template>\r\n                </p-column>\r\n            </p-dataTable>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 1210:
/***/ (function(module, exports) {

module.exports = "<div class=\"large-modal-dialog\">\r\n    <form class=\"form-horizontal\" #confirmForm=\"ngForm\">\r\n        <div class=\"ta-modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h3 class=\"modal-title\">{{title}}</h3>\r\n                <button data-auto-id=\"view_transfer_modal_close_button\" type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\r\n            </div>\r\n            <div class=\"modal-body ModalText\">\r\n\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6 float-left\">\r\n                        <span style=\"font-weight: bold;\">From Customer:</span> {{transferObject.FromCustomer.DisplayName}}\r\n                    </div>\r\n                    <div class=\"col-md-6 float-left\">\r\n                        <span style=\"font-weight: bold;\">From Account:</span> {{transferObject.FromAccount.AccountNumber}}\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6 float-left\">\r\n                        <span style=\"font-weight: bold;\">To Customer:</span> {{transferObject.ToCustomer.DisplayName}}\r\n                    </div>\r\n                    <div class=\"col-md-6 float-left\">\r\n                        <span style=\"font-weight: bold;\">To Account:</span> {{transferObject.ToAccount.AccountNumber}}\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6 float-left\">\r\n                        <span style=\"font-weight: bold;\">How to Apply:</span> {{transferObject.HowToApply.Description}}\r\n                    </div>\r\n                    <div class=\"col-md-6 float-left\" *ngIf=\"transferObject.OtherFeeCode\">\r\n                        <span style=\"font-weight: bold;\">Other Fee Code:</span> {{transferObject.OtherFeeCode.Description}}\r\n                    </div>\r\n                    <div class=\"col-md-6 float-left\">\r\n                        <span style=\"font-weight: bold;\">Amount:</span> {{transferObject.Amount | currency:'USD':true}}\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\" *ngIf=\"transferObject.HowToApplyExcess\">\r\n                    <div class=\"col-md-6 float-left\">\r\n                        <span style=\"font-weight: bold;\">How to Apply Excess:</span> {{transferObject.HowToApplyExcess?.Description}}\r\n                    </div>\r\n                    <div class=\"col-md-6 float-left\">\r\n                        <span style=\"font-weight: bold;\">Excess Amount:</span> {{transferObject.ExcessAmount| currency:'USD':true}}\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6 float-left\">\r\n                        <span style=\"font-weight: bold;\">Nickname:</span> {{transferObject.Nickname}}\r\n                    </div>\r\n                    <div *ngIf=\"transferObject.AuditInfo?.CreatedBy && transferObject.AuditInfo.CreatedBy?.length > 0\" class=\"col-md-6 float-left\">\r\n                        <span style=\"font-weight: bold;\">Created By:</span> {{transferObject.AuditInfo.CreatedBy}}\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-6 float-left\">\r\n                        <span style=\"font-weight: bold;\">Frequency:</span> {{transferObject.Schedule.Frequency | titleCase}}\r\n                    </div>\r\n                    <div *ngIf=\"isForm2279Required\" class=\"col-md-6 float-left\">\r\n                        <span style=\"font-weight: bold;\">Form 2279 Complete:</span>\r\n                        <input data-auto-id=\"confirm_twentytwoseventynine_acknowledgement\" type=\"checkbox\" checked disabled />\r\n                    </div>\r\n                </div>\r\n                <!--Single Payment-->\r\n\r\n                <div *ngIf=\"transferObject.Schedule.Frequency === 'once'\" class=\"row\">\r\n                    <div class=\"col-md-6\">\r\n                        <span style=\"font-weight: bold;\">Pay On:</span> {{transferObject.Schedule.OneTimePaymentDate | dateformat:'MM/DD/YYYY'}}\r\n                    </div>\r\n                </div>\r\n\r\n\r\n                <!--RecurringPayment-->\r\n                <div *ngIf=\"transferObject.Schedule.Frequency === 'recurring'\">\r\n                    <div *ngIf=\"transferObject.Schedule.RecurringSchedule.Frequency === 'monthly'\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6\">\r\n                                <span style=\"font-weight: bold;\">Type:</span> Monthly Payment\r\n                            </div>\r\n                        </div>\r\n                        <br />\r\n                        <monthly-component [minDate]=\"minDate\" [prepaymentRestriction]=\"transferObject.ToAccount.PrePayRestriction\" [monthlySchedule]=\"transferObject.Schedule.RecurringSchedule.MonthlySchedule\" [isReadOnly]=\"true\"></monthly-component>\r\n                    </div>\r\n\r\n                    <div *ngIf=\"transferObject.Schedule.RecurringSchedule.Frequency === 'weekly'\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-6\">\r\n                                <span style=\"font-weight: bold;\">Type:</span> Weekly Payment\r\n                            </div>\r\n                        </div>\r\n                        <br />\r\n                        <weekly-component [minDate]=\"minDate\" [weeklySchedule]=\"transferObject.Schedule.RecurringSchedule.WeeklySchedule\" [isReadOnly]=\"true\"></weekly-component>\r\n                    </div>\r\n                    \r\n                    <div *ngIf=\"transferObject.Schedule.RecurringSchedule.Frequency === 'quarterly'\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-5\">\r\n                                <span style=\"font-weight: bold;\">Type:</span> Quarterly Payment\r\n                            </div>\r\n                        </div>\r\n                        <br/>\r\n                        <quarterly-component [minDate]=\"minDate\" [quarterlySchedule]=\"transferObject.Schedule.RecurringSchedule.QuarterlySchedule\" [isReadOnly]=\"true\"></quarterly-component>\r\n                    </div>\r\n                    <div *ngIf=\"transferObject.Schedule.RecurringSchedule.Frequency === 'annual'\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-5\">\r\n                                <span style=\"font-weight: bold;\">Type:</span> Annual Payment\r\n                            </div>\r\n                        </div>\r\n                        <br/>\r\n                        <annual-component [minDate]=\"minDate\" [annualSchedule]=\"transferObject.Schedule.RecurringSchedule.AnnualSchedule\" [isReadOnly]=\"true\"></annual-component>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button *ngIf=\"confirmText.length > 0\" data-auto-id='internal-transfer-confirm' type=\"button\" class=\"ta-primary-button\" (click)=\"confirm()\">{{confirmText}}</button>\r\n                <button *ngIf=\"cancelText.length > 0\" type=\"button\" data-auto-id='internal-transfer-cancel' class=\"btn\" (click)=\"cancel()\">{{cancelText}}</button>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>";

/***/ }),

/***/ 1216:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <div class=\"modal-dialog customer-search-modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h3 class=\"modal-title\">Customer Search</h3>\r\n                <button type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\r\n            </div>\r\n            <div class=\"modal-body ModalContentText\">\r\n                <form role=\"search\" class=\"hidden-sm-down\">\r\n                    <div class=\"input-group\">\r\n                        <input data-auto-id=\"search-input\" type=\"text\" [(ngModel)]=\"searchQry\" ta-autofocus placeholder=\"Search...\" class=\"form-control\" name=\"searchInput\" #searchInput=\"ngModel\" (keyup)=\"search(searchInput.value)\">\r\n                        <span class=\"input-group-btn\">\r\n                            <button class=\"btn btn-default\" (click)=\"search(searchInput.value)\">\r\n                                <i class=\"fa fa-search\"></i>\r\n                            </button>\r\n                        </span>\r\n                    </div>\r\n                </form>\r\n                <div *ngIf=\"searchQry && searchQry.length > 0\">\r\n                    <customer-results [customers]=\"customers\" (onSelected)=\"customerSelected($event)\"></customer-results>\r\n                </div>\r\n                \r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"ta-primary-button\" (click)=\"confirm()\">Ok</button>\r\n                <button type=\"button\" class=\"btn\" (click)=\"cancel()\">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ }),

/***/ 1250:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1175);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./internal-transfer-setup.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./internal-transfer-setup.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1251:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1176);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./transfer-list.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./transfer-list.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1254:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1179);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/index.js!./customer-search-modal.component.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/index.js!./customer-search-modal.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1282:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1250);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1283:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1251);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1286:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1254);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ })

});
//# sourceMappingURL=4.b116914cb760cd4ea805.chunk.js.map