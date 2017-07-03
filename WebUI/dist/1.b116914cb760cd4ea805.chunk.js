webpackJsonp([1],{

/***/ 1045:
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
var bank_account_manager_mediator_service_1 = __webpack_require__(1089);
var bank_template_component_1 = __webpack_require__(1091);
var bank_account_manager_component_1 = __webpack_require__(1090);
var ach_template_selector_component_1 = __webpack_require__(1131);
var ach_setup_component_1 = __webpack_require__(1088);
var ach_component_1 = __webpack_require__(1129);
var ach_transactions_component_1 = __webpack_require__(1085);
var view_transaction_modal_component_1 = __webpack_require__(1061);
var ach_reject_component_1 = __webpack_require__(1087);
var ach_reject_confirmation_component_1 = __webpack_require__(1086);
var ach_routing_1 = __webpack_require__(1130);
var AchModule = (function () {
    function AchModule() {
    }
    return AchModule;
}());
AchModule = __decorate([
    core_1.NgModule(({
        imports: [ach_routing_1.achTemplatesRouting, shared_module_1.SharedModule],
        providers: [ach_routing_1.appRoutingProviders, bank_account_manager_mediator_service_1.BankAccountManagerMediatorService],
        declarations: [bank_template_component_1.BankTemplateComponent, bank_account_manager_component_1.BankAccountManagerComponent, ach_template_selector_component_1.AchTemplateSelectorComponent,
            ach_setup_component_1.AchSetupComponent, ach_component_1.AchComponent, ach_transactions_component_1.AchTransactionsComponent,
            view_transaction_modal_component_1.ViewTransactionModalComponent, ach_reject_component_1.AchRejectComponent, ach_reject_confirmation_component_1.AchRejectConfirmationComponent],
        entryComponents: [bank_template_component_1.BankTemplateComponent, ach_template_selector_component_1.AchTemplateSelectorComponent, view_transaction_modal_component_1.ViewTransactionModalComponent, ach_reject_confirmation_component_1.AchRejectConfirmationComponent]
    }))
], AchModule);
exports.AchModule = AchModule;


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

/***/ 1055:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Account = (function () {
    function Account() {
    }
    return Account;
}());
exports.Account = Account;


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

/***/ 1061:
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
var generic_dropdown_model_1 = __webpack_require__(1053);
var ViewTransactionModalComponent = (function (_super) {
    __extends(ViewTransactionModalComponent, _super);
    function ViewTransactionModalComponent(dialogService) {
        return _super.call(this, dialogService) || this;
    }
    ViewTransactionModalComponent.prototype.ngOnInit = function () {
        this.initializeObjects();
    };
    ViewTransactionModalComponent.prototype.initializeObjects = function () {
        this.minDate = new Date();
        if (!this.ach.Schedule.RecurringSchedule.MonthlySchedule) {
            this.ach.Schedule.RecurringSchedule.MonthlySchedule = new monthly_schedule_model_1.MonthlySchedule();
            this.ach.Schedule.RecurringSchedule.MonthlySchedule.DaysOfTheWeek =
                new days_of_the_week_model_1.DaysOfTheWeek();
            this.ach.Schedule.RecurringSchedule.MonthlySchedule.CalendarDays = [];
            this.ach.Schedule.RecurringSchedule.MonthlySchedule.PayOnIndex = [];
        }
    };
    ViewTransactionModalComponent.prototype.confirm = function () {
        this.result = true;
        this.close();
    };
    ViewTransactionModalComponent.prototype.cancel = function () {
        this.result = false;
        this.dialogService.removeAll();
    };
    ViewTransactionModalComponent.prototype.isAchInTransactionDirection = function () {
        if (!this.ach.TransactionDirection) {
            this.ach.TransactionDirection = new generic_dropdown_model_1.GenericDropDownModel();
        }
        return (this.ach.TransactionDirection.Description === "In");
    };
    ViewTransactionModalComponent.prototype.isAchOutTransactionDirection = function () {
        if (!this.ach.TransactionDirection) {
            this.ach.TransactionDirection = new generic_dropdown_model_1.GenericDropDownModel();
        }
        return (this.ach.TransactionDirection.Description === "Out");
    };
    return ViewTransactionModalComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
__decorate([
    core_1.ViewChild(days_of_the_week_component_1.DaysOfTheWeekComponent),
    __metadata("design:type", days_of_the_week_component_1.DaysOfTheWeekComponent)
], ViewTransactionModalComponent.prototype, "daysOfTheWeekComponent", void 0);
__decorate([
    core_1.ViewChild(weekly_component_1.WeeklyComponent),
    __metadata("design:type", weekly_component_1.WeeklyComponent)
], ViewTransactionModalComponent.prototype, "weeklyComponent", void 0);
__decorate([
    core_1.ViewChild(monthly_component_1.MonthlyComponent),
    __metadata("design:type", monthly_component_1.MonthlyComponent)
], ViewTransactionModalComponent.prototype, "monthlyComponent", void 0);
ViewTransactionModalComponent = __decorate([
    core_1.Component({
        selector: 'ta-view-transaction',
        template: __webpack_require__(1201)
    }),
    __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService])
], ViewTransactionModalComponent);
exports.ViewTransactionModalComponent = ViewTransactionModalComponent;


/***/ }),

/***/ 1066:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BankTemplate = (function () {
    function BankTemplate() {
    }
    return BankTemplate;
}());
exports.BankTemplate = BankTemplate;


/***/ }),

/***/ 1085:
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
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(13);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var multi_select_value_model_1 = __webpack_require__(389);
var ach_data_service_1 = __webpack_require__(384);
var growler_mediator_service_1 = __webpack_require__(35);
var ach_status_1 = __webpack_require__(1103);
var confirm_modal_component_1 = __webpack_require__(383);
var view_transaction_modal_component_1 = __webpack_require__(1061);
var ach_mediator_service_1 = __webpack_require__(387);
var routes_factory_1 = __webpack_require__(75);
var AchTransactionsComponent = (function () {
    function AchTransactionsComponent(achDataService, growlerMediatorService, router, route, dialogService, achService) {
        this.achDataService = achDataService;
        this.growlerMediatorService = growlerMediatorService;
        this.router = router;
        this.route = route;
        this.dialogService = dialogService;
        this.achService = achService;
    }
    AchTransactionsComponent.prototype.ngOnInit = function () {
        this.getRouteParams();
        this.initializeObjects();
    };
    ;
    AchTransactionsComponent.prototype.ngOnDestroy = function () {
    };
    ;
    AchTransactionsComponent.prototype.getDynamicAutoId = function (name, id) {
        return name + id;
    };
    AchTransactionsComponent.prototype.getIsDeleted = function (item) {
        if (item && item.Status === ach_status_1.AchStatus.Deleted) {
            return true;
        }
        return false;
    };
    AchTransactionsComponent.prototype.getRouteParams = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.customerId = +params['customerId'];
            if (_this.customerId !== 0) {
                _this.getAchTransactions(_this.customerId);
            }
        });
    };
    AchTransactionsComponent.prototype.initializeObjects = function () {
        this.achService.copiedAch = undefined;
        this.shouldDisplayActive = true;
        this.selectedAchTransaction = undefined;
    };
    AchTransactionsComponent.prototype.getAchTransactions = function (customerId) {
        var _this = this;
        if (customerId) {
            this.achDataService.getAchTransactions(customerId)
                .subscribe(function (ret) {
                if (ret && ret.length > 0) {
                    _this.transactions = ret;
                    if (_this.shouldDisplayActive) {
                        _this.filteredTransactions = _this.transactions
                            .filter(function (item) { return item.Status === ach_status_1.AchStatus.Active; });
                    }
                    else {
                        _this.filteredTransactions = _this.transactions;
                    }
                    _this.applyMultiSelects();
                }
            }, function (err) {
                _this.growlerMediatorService.growlError("Error", "Error getting processing dates: " + err);
            });
        }
    };
    AchTransactionsComponent.prototype.addNew = function () {
        this.router.navigate([routes_factory_1.RoutesFactory.createAchRoute(this.customerId)]);
    };
    AchTransactionsComponent.prototype.viewAch = function (ach) {
        var _this = this;
        this.selectedAchTransaction = Object.assign({}, ach);
        this.dialogService.addDialog(view_transaction_modal_component_1.ViewTransactionModalComponent, {
            title: 'ACH Setup Instructions',
            message: '',
            confirmText: 'Close View',
            cancelText: '',
            ach: ach
        }).subscribe(function (isConfirmed) {
            _this.selectedAchTransaction = undefined;
        });
    };
    AchTransactionsComponent.prototype.copyAch = function (ach) {
        this.achService.copiedAch = ach;
        this.router.navigate([routes_factory_1.RoutesFactory.createAchWithTemplateRoute(this.customerId, ach.BankTemplate.BankTemplateId)]);
    };
    AchTransactionsComponent.prototype.deleteAch = function (ach) {
        var _this = this;
        this.selectedAchTransaction = Object.assign({}, ach);
        this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
            title: 'Confirm Delete',
            message: "Are you sure you want to delete this ACH Transaction Setup?",
            confirmText: 'Yes',
            cancelText: 'No'
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.deleteAchTransaction(ach);
                _this.selectedAchTransaction = undefined;
            }
        });
    };
    AchTransactionsComponent.prototype.deleteAchTransaction = function (ach) {
        var _this = this;
        this.achDataService.deleteAchTransaction(ach.AchId)
            .subscribe(function (status) {
            if (status) {
                _this.growlerMediatorService.growlSuccess('Success', 'ACH transaction has been deleted successfully');
                _this.getAchTransactions(_this.customerId);
            }
            else {
                _this.growlerMediatorService.growlError('Error', 'ACH transaction deletion failed');
            }
        }, function (err) {
            _this.growlerMediatorService.growlError('Error', 'ACH transaction deletion failed');
        });
    };
    AchTransactionsComponent.prototype.onStatusChanged = function (dt, event, col) {
        if (event && event.value && event.value.length > 0 && event.value[0] === 'Deleted') {
            this.filteredTransactions = this.transactions;
            this.shouldDisplayActive = false;
        }
        dt.filter(event.value, col.field, col.filterMatchMode);
    };
    AchTransactionsComponent.prototype.applyMultiSelects = function () {
        var _this = this;
        this.statusMultiSelects = [];
        if (this.transactions && this.transactions.length > 0) {
            for (var i = 0; i < this.transactions.length; i++) {
                if (this.statusMultiSelects.filter(function (e) { return e.value === _this.transactions[i].StatusDescription; }).length === 0) {
                    this.statusMultiSelects.push(new multi_select_value_model_1.MultiSelectValue(this.transactions[i].StatusDescription, this.transactions[i].StatusDescription));
                }
            }
        }
    };
    return AchTransactionsComponent;
}());
AchTransactionsComponent = __decorate([
    core_1.Component({
        selector: 'ta-ach-transactions',
        template: __webpack_require__(1195),
        styles: [__webpack_require__(1270)]
    }),
    __metadata("design:paramtypes", [ach_data_service_1.AchDataService, growler_mediator_service_1.GrowlerMediatorService, router_1.Router,
        router_1.ActivatedRoute, ng2_bootstrap_modal_1.DialogService, ach_mediator_service_1.AchMediatorService])
], AchTransactionsComponent);
exports.AchTransactionsComponent = AchTransactionsComponent;


/***/ }),

/***/ 1086:
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
var ach_data_service_1 = __webpack_require__(384);
var growler_mediator_service_1 = __webpack_require__(35);
var ach_reject_confirmation_mediator_service_1 = __webpack_require__(392);
var confirm_modal_component_1 = __webpack_require__(383);
var central_codes_data_service_1 = __webpack_require__(62);
var currency_format_pipe_1 = __webpack_require__(390);
var common_1 = __webpack_require__(4);
var AchRejectConfirmationComponent = (function (_super) {
    __extends(AchRejectConfirmationComponent, _super);
    function AchRejectConfirmationComponent(dialogService, centralCodesDataService, achDataService, growlerMediatorService, achRejectConfirmationMediatorService) {
        var _this = _super.call(this, dialogService) || this;
        _this.dialogService = dialogService;
        _this.centralCodesDataService = centralCodesDataService;
        _this.achDataService = achDataService;
        _this.growlerMediatorService = growlerMediatorService;
        _this.achRejectConfirmationMediatorService = achRejectConfirmationMediatorService;
        _this.currencyPipe = new currency_format_pipe_1.CurrencyFormatPipe();
        _this.ng2CurrencyPipe = new common_1.CurrencyPipe('USD');
        return _this;
    }
    AchRejectConfirmationComponent.prototype.ngOnInit = function () {
        this.getAchRejectionReasonCodes();
        this.achRejection.RejectionReasonId = 0;
        this.achRejection.OtherNote = '';
        this.achRejection.Form2269 = false;
        this.otherNoteVisible = false;
    };
    AchRejectConfirmationComponent.prototype.getAchRejectionReasonCodes = function () {
        var _this = this;
        if (this.achRejection.OlderThan24Hours) {
            this.centralCodesDataService.getAchOlderThan24HoursRejectReasonCodes()
                .subscribe(function (ret) {
                _this.achRejectionReasonCodes = ret;
            }, function (err) {
                _this.growlerMediatorService.growlError('Error', 'Error getting ACH older than 24 hours Rejection Reason codes');
            });
        }
        else if (this.achRejection.TransactionDirection && this.achRejection.TransactionDirection.Description === "In") {
            this.centralCodesDataService.getAchInRejectReasonCodes()
                .subscribe(function (ret) {
                _this.achRejectionReasonCodes = ret;
            }, function (err) {
                _this.growlerMediatorService.growlError('Error', 'Error getting ACH In Rejection Reason codes');
            });
        }
        else if (this.achRejection.TransactionDirection && this.achRejection.TransactionDirection.Description === "Out") {
            this.centralCodesDataService.getAchOutRejectReasonCodes()
                .subscribe(function (ret) {
                _this.achRejectionReasonCodes = ret;
            }, function (err) {
                _this.growlerMediatorService.growlError('Error', 'Error getting ACH Out Rejection Reason codes');
            });
        }
    };
    AchRejectConfirmationComponent.prototype.submit = function () {
        var _this = this;
        this.dialogService.removeAll();
        var message = this.achRejection.TransactionDirection ? this.achRejection.TransactionDirection.Description : 'NO DIRECTION PROVIDED';
        var amount = this.currencyPipe.transform(this.ng2CurrencyPipe.transform(this.achRejection.Amount, 'USD', true, ''));
        this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
            title: 'Confirm Reject',
            message: "Are you sure you want to reject this ACH " + message + " for " + amount + "?",
            confirmText: 'Yes',
            cancelText: 'No'
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.achDataService.rejectAch(_this.achRejection)
                    .subscribe(function (ret) {
                    _this.broadcast();
                });
            }
        });
    };
    AchRejectConfirmationComponent.prototype.broadcast = function () {
        this.achRejectConfirmationMediatorService.broadCastRefreshRejectsChanged(true);
    };
    AchRejectConfirmationComponent.prototype.setIsNoteVisible = function () {
        var _this = this;
        var rejectReasons = this.achRejectionReasonCodes.filter(function (c) { return c.Id === _this.achRejection.RejectionReasonId; });
        if (rejectReasons && rejectReasons.length > 0) {
            var rejectReason = rejectReasons[0].Description;
            this.otherNoteVisible = false;
            if (rejectReason && rejectReason.startsWith('Other')) {
                this.otherNoteVisible = true;
            }
            else {
                this.achRejection.OtherNote = '';
            }
        }
    };
    AchRejectConfirmationComponent.prototype.getAchRejectionDropDownPlaceHolder = function () {
        var description = '';
        if (this.achRejection.OlderThan24Hours) {
            description = 'Select Reject Reason (ACH Older Than 24 hours)';
        }
        else if (this.achRejection.TransactionDirection && this.achRejection.TransactionDirection.Description === "In") {
            description = 'Select Reject Reason (ACH In/Payment)';
        }
        else if (this.achRejection.TransactionDirection && this.achRejection.TransactionDirection.Description === "Out") {
            description = 'Select Reject Reason (ACH Out/Advance)';
        }
        return description;
    };
    AchRejectConfirmationComponent.prototype.isAchOlderThan24Hours = function () {
        return this.achRejection.OlderThan24Hours;
    };
    return AchRejectConfirmationComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
AchRejectConfirmationComponent = __decorate([
    core_1.Component({
        selector: 'ta-ach-reject-conformation-component',
        template: __webpack_require__(1197),
        styles: [__webpack_require__(1272)]
    }),
    __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService,
        central_codes_data_service_1.CentralCodesDataService,
        ach_data_service_1.AchDataService,
        growler_mediator_service_1.GrowlerMediatorService,
        ach_reject_confirmation_mediator_service_1.AchRejectConfirmationMediatorService])
], AchRejectConfirmationComponent);
exports.AchRejectConfirmationComponent = AchRejectConfirmationComponent;


/***/ }),

/***/ 1087:
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
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(13);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var ach_reject_confirmation_component_1 = __webpack_require__(1086);
var multi_select_value_model_1 = __webpack_require__(389);
var date_format_pipe_1 = __webpack_require__(395);
var ach_data_service_1 = __webpack_require__(384);
var growler_mediator_service_1 = __webpack_require__(35);
var customer_service_1 = __webpack_require__(54);
var ach_reject_confirmation_mediator_service_1 = __webpack_require__(392);
var AchRejectComponent = (function () {
    function AchRejectComponent(router, route, achDataService, dialogService, growlerMediatorService, customerService, achRejectConfirmationMediatorService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.achDataService = achDataService;
        this.dialogService = dialogService;
        this.growlerMediatorService = growlerMediatorService;
        this.customerService = customerService;
        this.achRejectConfirmationMediatorService = achRejectConfirmationMediatorService;
        this.formatPipe = new date_format_pipe_1.DateFormatPipe();
        this.achRejectConfirmationMediatorService.refreshRejectsChanged$.subscribe(function (refresh) { return _this.refreshRejects(refresh); });
    }
    AchRejectComponent.prototype.ngOnInit = function () {
        this.selectedRejectAchData = undefined;
        this.getRouteParams();
    };
    AchRejectComponent.prototype.refreshRejects = function (refresh) {
        if (refresh) {
            if (!this.customerId) {
                this.customerId = this.customerService.selectedCustomer.Id;
            }
            this.getRejectAchData(this.customerId);
        }
    };
    AchRejectComponent.prototype.getRouteParams = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.customerId = +params['customerId'];
            if (_this.customerId !== 0) {
                _this.getRejectAchData(_this.customerId);
            }
        });
    };
    AchRejectComponent.prototype.getRejectAchData = function (customerId) {
        var _this = this;
        this.achDataService.getRejectAchData(customerId)
            .subscribe(function (ret) {
            if (ret && ret.length > 0) {
                _this.rejectAchData = ret;
                _this.applyMultiSelects();
            }
            else {
                _this.growlerMediatorService.growlWarn('Warning', 'No ACH Data for Current Customer');
            }
        }, function (err) {
            _this.growlerMediatorService.growlError('Error', 'Error getting ACH Data');
        });
    };
    AchRejectComponent.prototype.openConfirmDelete = function (item) {
        var _this = this;
        this.selectedRejectAchData = Object.assign({}, item);
        this.dialogService.addDialog(ach_reject_confirmation_component_1.AchRejectConfirmationComponent, {
            achRejection: item
        }).subscribe(function (isConfirmed) {
            _this.selectedRejectAchData = undefined;
        });
    };
    AchRejectComponent.prototype.applyMultiSelects = function () {
        var _this = this;
        this.accountNumberMultiSelects = [];
        this.amountMultiSelects = [];
        this.companyNameMultiSelects = [];
        this.transactionDateMultiSelects = [];
        if (this.rejectAchData && this.rejectAchData.length > 0) {
            for (var i = 0; i < this.rejectAchData.length; i++) {
                this.rejectAchData[i].DisplayAmount = this.rejectAchData[i].Amount.toString();
                this.rejectAchData[i]
                    .ExternalAccountNumber = this.customerService.selectedCustomer.Cif + "-" + this.rejectAchData[i].ExternalAccountNumber;
                if (this.accountNumberMultiSelects.filter(function (e) { return e.value === _this.rejectAchData[i].ExternalAccountNumber; }).length === 0) {
                    this.accountNumberMultiSelects.push(new multi_select_value_model_1.MultiSelectValue(this.rejectAchData[i].ExternalAccountNumber, this.rejectAchData[i].ExternalAccountNumber));
                }
                if (this.amountMultiSelects.filter(function (e) { return e.value === _this.rejectAchData[i].Amount.toString(); }).length === 0) {
                    this.amountMultiSelects.push(new multi_select_value_model_1.MultiSelectValue("$" + this.rejectAchData[i].Amount.toString(), this.rejectAchData[i].Amount.toString()));
                }
                if (this.companyNameMultiSelects.filter(function (e) { return e.value === _this.rejectAchData[i].CompanyName; }).length === 0) {
                    this.companyNameMultiSelects.push(new multi_select_value_model_1.MultiSelectValue(this.rejectAchData[i].CompanyName, this.rejectAchData[i].CompanyName));
                }
                if (this.transactionDateMultiSelects.filter(function (e) { return _this.formatPipe.transform(e.value, 'MM/DD/YYYY') === _this.formatPipe.transform(_this.rejectAchData[i].TransactionDate, 'MM/DD/YYYY'); }).length === 0) {
                    this.transactionDateMultiSelects.push(new multi_select_value_model_1.MultiSelectValue(this.formatPipe.transform(this.rejectAchData[i].TransactionDate, 'MM/DD/YYYY'), this.rejectAchData[i].TransactionDate));
                }
            }
        }
    };
    AchRejectComponent.prototype.getDynamicAutoId = function (name, id) {
        return name + id;
    };
    return AchRejectComponent;
}());
AchRejectComponent = __decorate([
    core_1.Component({
        selector: 'ach-reject',
        template: __webpack_require__(1198),
        styles: [__webpack_require__(1273)]
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute,
        ach_data_service_1.AchDataService,
        ng2_bootstrap_modal_1.DialogService,
        growler_mediator_service_1.GrowlerMediatorService,
        customer_service_1.CustomerService,
        ach_reject_confirmation_mediator_service_1.AchRejectConfirmationMediatorService])
], AchRejectComponent);
exports.AchRejectComponent = AchRejectComponent;


/***/ }),

/***/ 1088:
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
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(13);
var ach_mediator_service_1 = __webpack_require__(387);
var AchSetupComponent = (function () {
    function AchSetupComponent(route, achMediatorService) {
        this.route = route;
        this.achMediatorService = achMediatorService;
        this.isAchTypeDisabled = false;
    }
    AchSetupComponent.prototype.ngOnInit = function () {
        this.getRouteParams();
    };
    AchSetupComponent.prototype.getRouteParams = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.customerId = +params['customerId'];
            _this.bankTemplateId = +params['bankTemplateId?'];
            if (_this.achMediatorService.copiedAch) {
                _this.bankTemplateId = _this.achMediatorService.copiedAch.BankTemplate.BankTemplateId;
                _this.achType = _this.achMediatorService.copiedAch.TransactionDirectionDisplay;
            }
        });
    };
    AchSetupComponent.prototype.bankTemplateChanged = function (event) {
        this.template = event;
        if (this.template && this.template.IsCustomerAccountHolder === false) {
            this.achType = 'Out';
            this.isAchTypeDisabled = true;
        }
        else {
            this.isAchTypeDisabled = false;
        }
    };
    return AchSetupComponent;
}());
AchSetupComponent = __decorate([
    core_1.Component({
        selector: 'ach-setup',
        template: __webpack_require__(1199),
        styles: [__webpack_require__(1274)]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, ach_mediator_service_1.AchMediatorService])
], AchSetupComponent);
exports.AchSetupComponent = AchSetupComponent;


/***/ }),

/***/ 1089:
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
var Rx_1 = __webpack_require__(25);
var BankAccountManagerMediatorService = (function () {
    function BankAccountManagerMediatorService() {
        this.viewDetailsChangedSource = new Rx_1.BehaviorSubject(this.bankTemplate);
        this.newAchRequiredSource = new Rx_1.BehaviorSubject(this.bankTemplate);
        this.deletionRequiredSource = new Rx_1.BehaviorSubject(this.bankTemplate);
        this.viewDetailsChanged$ = this.viewDetailsChangedSource.asObservable();
        this.newAchRequired$ = this.newAchRequiredSource.asObservable();
        this.deletionRequired$ = this.deletionRequiredSource.asObservable();
    }
    BankAccountManagerMediatorService.prototype.broadCastViewDetailsChanged = function (bankTemplate) {
        this.viewDetailsChangedSource.next(bankTemplate);
    };
    BankAccountManagerMediatorService.prototype.broadCastNewAchRequired = function (bankTemplate) {
        this.newAchRequiredSource.next(bankTemplate);
    };
    BankAccountManagerMediatorService.prototype.broadDeletionRequired = function (bankTemplate) {
        this.deletionRequiredSource.next(bankTemplate);
    };
    return BankAccountManagerMediatorService;
}());
BankAccountManagerMediatorService = __decorate([
    core_1.Injectable()
], BankAccountManagerMediatorService);
exports.BankAccountManagerMediatorService = BankAccountManagerMediatorService;


/***/ }),

/***/ 1090:
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
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(13);
var bank_template_model_1 = __webpack_require__(1066);
var ach_data_service_1 = __webpack_require__(384);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var bank_template_component_1 = __webpack_require__(1091);
var confirm_modal_component_1 = __webpack_require__(383);
var bank_account_manager_status_model_1 = __webpack_require__(1104);
var status_type_format_pipe_1 = __webpack_require__(403);
var account_number_format_pipe_1 = __webpack_require__(402);
var growler_mediator_service_1 = __webpack_require__(35);
var bank_account_manager_mediator_service_1 = __webpack_require__(1089);
var generic_dropdown_model_1 = __webpack_require__(1053);
var routes_factory_1 = __webpack_require__(75);
var BankAccountManagerComponent = (function () {
    function BankAccountManagerComponent(achDataService, route, router, dialogService, bankAccountMgrMediatorService, growlerMediatorService) {
        var _this = this;
        this.achDataService = achDataService;
        this.route = route;
        this.router = router;
        this.dialogService = dialogService;
        this.bankAccountMgrMediatorService = bankAccountMgrMediatorService;
        this.growlerMediatorService = growlerMediatorService;
        this.showTemplate = false;
        this.dynamicColumnsAdded = false;
        bankAccountMgrMediatorService.viewDetailsChanged$.subscribe(function (bankTemplate) { return _this.onViewDetails(bankTemplate); });
        bankAccountMgrMediatorService.newAchRequired$.subscribe(function (bankTemplate) { return _this.onNewAchRequired(bankTemplate); });
        bankAccountMgrMediatorService.deletionRequired$.subscribe(function (bankTemplate) { return _this.onDeletionRequired(bankTemplate); });
    }
    BankAccountManagerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.shouldDisplayActive = true;
        this.selectedTemplate = undefined;
        this.sub = this.route.params.subscribe(function (params) {
            _this.customerId = +params['customerId'];
            if (_this.customerId !== 0) {
                _this.getTemplates(_this.customerId);
            }
        });
    };
    ;
    BankAccountManagerComponent.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    ;
    BankAccountManagerComponent.prototype.onViewDetails = function (bankTemplate) {
        if (bankTemplate && bankTemplate.BankTemplateId > 0) {
            this.viewDetails(bankTemplate);
        }
    };
    BankAccountManagerComponent.prototype.onNewAchRequired = function (bankTemplate) {
        if (bankTemplate && bankTemplate.BankTemplateId > 0) {
            this.newAch(bankTemplate);
        }
    };
    BankAccountManagerComponent.prototype.onDeletionRequired = function (bankTemplate) {
        if (bankTemplate && bankTemplate.BankTemplateId > 0) {
            this.delete(bankTemplate);
        }
    };
    BankAccountManagerComponent.prototype.getTemplates = function (customerId) {
        var _this = this;
        if (customerId) {
            this.achDataService.search(customerId.toString())
                .subscribe(function (ret) {
                _this.originalTemplates = ret;
                if (_this.shouldDisplayActive && ret) {
                    _this.templates = _this.originalTemplates.filter(function (item) { return item.IsActive; });
                }
                else {
                    _this.templates = _this.originalTemplates;
                }
                _this.applyPipes();
            });
        }
        else {
            return [];
        }
    };
    ;
    BankAccountManagerComponent.prototype.addNew = function () {
        var _this = this;
        var template = new bank_template_model_1.BankTemplate();
        template.BankAccountType = new generic_dropdown_model_1.GenericDropDownModel();
        template.CustomerId = this.customerId;
        template.BankTemplateId = 0;
        this.dialogService.addDialog(bank_template_component_1.BankTemplateComponent, {
            achTemplateData: template,
            isAddNew: true
        }).subscribe(function (isConfirmed) {
            _this.getTemplates(_this.customerId);
        });
    };
    ;
    BankAccountManagerComponent.prototype.viewDetails = function (template) {
        var _this = this;
        this.selectedTemplate = Object.assign({}, template);
        this.dialogService.addDialog(bank_template_component_1.BankTemplateComponent, {
            achTemplateData: template,
            isAddNew: false
        }).subscribe(function (isConfirmed) {
            _this.selectedTemplate = undefined;
        });
    };
    ;
    BankAccountManagerComponent.prototype.deleteAchTemplate = function (template) {
        var _this = this;
        this.achDataService.deleteAchTemplate(template.BankTemplateId)
            .subscribe(function (status) {
            if (status) {
                _this.growlerMediatorService.growlSuccess('Success', 'Bank template has been deleted successfully');
                _this.getTemplates(_this.customerId);
            }
            else {
                _this.growlerMediatorService.growlError('Error', 'Bank template deletion failed');
            }
        }, function (err) {
            _this.growlerMediatorService.growlError('Error', 'Bank template deletion failed');
        });
    };
    BankAccountManagerComponent.prototype.delete = function (template) {
        var _this = this;
        var pipe = new account_number_format_pipe_1.AccountNumberFormatPipe();
        var formattedAccountNumber = pipe.transform(+template.ExternalAccountNumber);
        this.selectedTemplate = Object.assign({}, template);
        ;
        this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
            title: 'Confirm Delete',
            message: "Are you sure you want to delete " + template.AbaRoutingNumber + "  " + template.BankName + "-" + formattedAccountNumber + "?",
            confirmText: 'Yes',
            cancelText: 'No'
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.deleteAchTemplate(template);
            }
            _this.selectedTemplate = undefined;
        }, function (err) {
            _this.growlerMediatorService.growlError('Error', 'Bank template deletion failed');
        });
    };
    BankAccountManagerComponent.prototype.newAch = function (template) {
        this.router.navigate([routes_factory_1.RoutesFactory.createAchWithTemplateRoute(this.customerId, template.BankTemplateId)]);
    };
    BankAccountManagerComponent.prototype.applyPipes = function () {
        var pipe = new account_number_format_pipe_1.AccountNumberFormatPipe();
        var statusTypeFormatPipe = new status_type_format_pipe_1.StatusTypeFormatPipe();
        if (this.templates && this.templates.length > 0) {
            var i;
            for (i = 0; i < this.templates.length; i++) {
                this.templates[i].ExternalAccountNumber = pipe.transform(+this.templates[i].ExternalAccountNumber);
            }
            if (this.originalTemplates && this.originalTemplates.length > 0) {
                for (i = 0; i < this.originalTemplates.length; i++) {
                    this.originalTemplates[i].StatusDisplay = statusTypeFormatPipe.transform(this.originalTemplates[i].IsActive);
                }
            }
        }
    };
    BankAccountManagerComponent.prototype.getDynamicAutoId = function (name, id) {
        return name + id;
    };
    BankAccountManagerComponent.prototype.getIsDeleted = function (item) {
        if (item && item.IsActive === bank_account_manager_status_model_1.BankAccountManagerStatus.Deleted) {
            return true;
        }
        return false;
    };
    BankAccountManagerComponent.prototype.onStatusChanged = function (dt, event, col) {
        if (event && event.value && event.value.length > 0 && event.value[0] === 'Deleted') {
            this.templates = this.originalTemplates;
            this.shouldDisplayActive = false;
        }
    };
    return BankAccountManagerComponent;
}());
BankAccountManagerComponent = __decorate([
    core_1.Component({
        selector: 'ta-bank-account-manager',
        template: __webpack_require__(1202),
        styles: [__webpack_require__(1276)]
    }),
    __metadata("design:paramtypes", [ach_data_service_1.AchDataService,
        router_1.ActivatedRoute,
        router_1.Router,
        ng2_bootstrap_modal_1.DialogService,
        bank_account_manager_mediator_service_1.BankAccountManagerMediatorService,
        growler_mediator_service_1.GrowlerMediatorService])
], BankAccountManagerComponent);
exports.BankAccountManagerComponent = BankAccountManagerComponent;


/***/ }),

/***/ 1091:
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
var bank_template_model_1 = __webpack_require__(1066);
var ach_data_service_1 = __webpack_require__(384);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var bank_account_manager_status_model_1 = __webpack_require__(1104);
var growler_mediator_service_1 = __webpack_require__(35);
var generic_dropdown_model_1 = __webpack_require__(1053);
var central_codes_data_service_1 = __webpack_require__(62);
var forms_1 = __webpack_require__(15);
var BankTemplateComponent = (function (_super) {
    __extends(BankTemplateComponent, _super);
    function BankTemplateComponent(dropDownLookupDataService, achDataService, dialogService, growlerMediatorService) {
        var _this = _super.call(this, dialogService) || this;
        _this.dropDownLookupDataService = dropDownLookupDataService;
        _this.achDataService = achDataService;
        _this.growlerMediatorService = growlerMediatorService;
        _this.abaNotFound = false;
        return _this;
    }
    BankTemplateComponent.prototype.ngOnInit = function () {
        if (!this.achTemplateData) {
            this.createNewAchTemplate();
        }
        this.getAccountTypes();
    };
    BankTemplateComponent.prototype.getAccountTypes = function () {
        var _this = this;
        this.dropDownLookupDataService.getAccountTypes()
            .subscribe(function (accountTypes) {
            if (accountTypes) {
                _this.accountTypes = accountTypes;
            }
            else {
                _this.growlerMediatorService.growlError('Error', 'No Account Types returned from service');
            }
        }, function (err) {
            _this.growlerMediatorService.growlError('Error', 'Error getting account types: ' + err);
        });
    };
    BankTemplateComponent.prototype.submit = function () {
        var _this = this;
        if (this.achTemplateForm.invalid) {
            return;
        }
        if (this.accountTypes && this.accountTypes.length > 0) {
            var list = this.accountTypes.filter(function (item) { return item.Id === _this.achTemplateData.BankAccountType.Id; });
            this.achTemplateData.BankAccountType.Description = list[0].Description;
            this.achTemplateData.IsActive = bank_account_manager_status_model_1.BankAccountManagerStatus.Active;
            this.achDataService.insertAchTemplateCustomer(this.achTemplateData)
                .subscribe(function (insertedAchTemplate) {
                if (insertedAchTemplate) {
                    _this.growlerMediatorService.growlSuccess('Success', 'Bank template saved successfully');
                    _this.close();
                }
                else {
                    _this.growlerMediatorService.growlError('Error', 'Bank template failed to save');
                }
            }, function (err) {
                if (err.status === 409) {
                    _this.growlerMediatorService.growlError('Error', 'Bank template already exists');
                }
                else {
                    _this.growlerMediatorService.growlError('Error', 'Bank template failed to save');
                }
            });
        }
    };
    BankTemplateComponent.prototype.lookupAba = function () {
        var _this = this;
        this.abaNotFound = false;
        this.resetBankTemplateInfo(this.achTemplateData);
        if (this.achTemplateData && this.achTemplateData.AbaRoutingNumber && this.achTemplateData.BankTemplateId === 0) {
            this.achDataService.lookupAba(+this.achTemplateData.AbaRoutingNumber)
                .subscribe(function (abaModel) {
                if (abaModel) {
                    _this.achTemplateData.BankName = abaModel.Name;
                    _this.achTemplateData.City = abaModel.City;
                    _this.achTemplateData.State = abaModel.State;
                }
                else {
                    _this.abaNotFound = true;
                    _this.achTemplateForm.controls["AbaRoutingNumber"].setErrors({ 'invalid': true });
                }
            }, function (err) {
                _this.growlerMediatorService.growlError('Error', 'Error getting ABA data: ' + err);
            });
        }
    };
    BankTemplateComponent.prototype.createNewAchTemplate = function () {
        this.achTemplateData = new bank_template_model_1.BankTemplate();
        this.achTemplateData.BankAccountType = new generic_dropdown_model_1.GenericDropDownModel();
    };
    BankTemplateComponent.prototype.resetBankTemplateInfo = function (templateData) {
        if (templateData) {
            templateData.BankName = undefined;
            templateData.City = undefined;
            templateData.State = undefined;
        }
    };
    return BankTemplateComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
__decorate([
    core_1.ViewChild('achTemplateForm'),
    __metadata("design:type", forms_1.NgForm)
], BankTemplateComponent.prototype, "achTemplateForm", void 0);
BankTemplateComponent = __decorate([
    core_1.Component({
        selector: 'bank-template',
        template: __webpack_require__(1203),
        styles: [__webpack_require__(1277)]
    }),
    __metadata("design:paramtypes", [central_codes_data_service_1.CentralCodesDataService,
        ach_data_service_1.AchDataService,
        ng2_bootstrap_modal_1.DialogService,
        growler_mediator_service_1.GrowlerMediatorService])
], BankTemplateComponent);
exports.BankTemplateComponent = BankTemplateComponent;


/***/ }),

/***/ 1103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AchStatus;
(function (AchStatus) {
    AchStatus[AchStatus["Active"] = 1] = "Active";
    AchStatus[AchStatus["Deleted"] = 2] = "Deleted";
})(AchStatus = exports.AchStatus || (exports.AchStatus = {}));


/***/ }),

/***/ 1104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BankAccountManagerStatus = (function () {
    function BankAccountManagerStatus() {
    }
    return BankAccountManagerStatus;
}());
BankAccountManagerStatus.Active = true;
BankAccountManagerStatus.Deleted = false;
exports.BankAccountManagerStatus = BankAccountManagerStatus;


/***/ }),

/***/ 1129:
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
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(13);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var scheduler_component_1 = __webpack_require__(396);
var ach_model_1 = __webpack_require__(1140);
var ach_data_service_1 = __webpack_require__(384);
var account_model_1 = __webpack_require__(1055);
var growler_mediator_service_1 = __webpack_require__(35);
var accounts_data_service_1 = __webpack_require__(388);
var confirm_modal_component_1 = __webpack_require__(383);
var bank_template_model_1 = __webpack_require__(1066);
var ach_status_1 = __webpack_require__(1103);
var audit_info_1 = __webpack_require__(1060);
var view_payments_modal_component_1 = __webpack_require__(394);
var view_transaction_modal_component_1 = __webpack_require__(1061);
var central_codes_data_service_1 = __webpack_require__(62);
var accounts_mediator_service_1 = __webpack_require__(77);
var ach_mediator_service_1 = __webpack_require__(387);
var utilities_service_1 = __webpack_require__(1052);
var authorization_type_enum_1 = __webpack_require__(1141);
var processing_dates_data_service_1 = __webpack_require__(162);
var processing_date_service_1 = __webpack_require__(95);
var scheduler_container_model_1 = __webpack_require__(401);
var generic_dropdown_model_1 = __webpack_require__(1053);
var routes_factory_1 = __webpack_require__(75);
var customer_service_1 = __webpack_require__(54);
var AchComponent = (function () {
    function AchComponent(route, dialogService, achDataService, growler, accountService, router, achMediatorService, centralCodesDataService, accountsMediatorService, processingDatesDataService, customerService) {
        this.route = route;
        this.dialogService = dialogService;
        this.achDataService = achDataService;
        this.growler = growler;
        this.accountService = accountService;
        this.router = router;
        this.achMediatorService = achMediatorService;
        this.centralCodesDataService = centralCodesDataService;
        this.accountsMediatorService = accountsMediatorService;
        this.processingDatesDataService = processingDatesDataService;
        this.customerService = customerService;
        this.ach = new ach_model_1.Ach();
        this.isCopy = false;
        this.utilities = new utilities_service_1.Utilities();
    }
    Object.defineProperty(AchComponent.prototype, "achType", {
        get: function () { return this._achType; },
        set: function (type) {
            this._achType = type;
            this.initializeAch();
        },
        enumerable: true,
        configurable: true
    });
    AchComponent.prototype.ngOnInit = function () {
        this.getRouteParams();
    };
    AchComponent.prototype.initializeDefaultDropdownValues = function () {
        this.ach.Account = this.utilities.defaultDropDownValue;
        this.ach.HowToApply = this.utilities.defaultDropDownValue;
        this.ach.AchApprover = this.utilities.defaultDropDownValue;
    };
    AchComponent.prototype.getRouteParams = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.customerId = +params['customerId'];
            if (_this.customerId !== 0) {
                _this.initializeAch();
                _this.getAccounts(_this.customerId);
            }
        });
    };
    AchComponent.prototype.toggleFormFields = function (id) {
        if (id === 'twentyOneFourty' && this.ach.AuthorizationType !== authorization_type_enum_1.AuthorizationType.Form2140) {
            this.ach.AuthorizationType = authorization_type_enum_1.AuthorizationType.Form2140;
        }
        else if (id === 'verbalAchReceived' && this.ach.AuthorizationType !== authorization_type_enum_1.AuthorizationType.Verbal) {
            this.ach.AuthorizationType = authorization_type_enum_1.AuthorizationType.Verbal;
        }
        else {
            this.ach.AuthorizationType = authorization_type_enum_1.AuthorizationType.None;
        }
    };
    AchComponent.prototype.getHowToApplyOptions = function () {
        var _this = this;
        this.centralCodesDataService.getHowToApplyList()
            .subscribe(function (ret) {
            if (ret && ret.length > 0) {
                _this.howtoApplyList = ret;
                if (_this.ach && _this.ach.HowToApply && _this.ach.HowToApply.Id > 0) {
                    _this.ach.HowToApply = _this.howtoApplyList.find(function (t) { return t.Id === _this.ach.HowToApply.Id; });
                }
            }
        }, function (err) {
            _this.growler.growlError("Error", "Error getting How to Apply Data");
        });
    };
    AchComponent.prototype.initializeAch = function () {
        var _this = this;
        this.initializeDefaultDropdownValues();
        this.getHowToApplyOptions();
        if (this.achMediatorService.copiedAch && this.achMediatorService.copiedAch.AchId != undefined) {
            this.ach = Object.assign({}, this.achMediatorService.copiedAch);
            this.ach.Status = ach_status_1.AchStatus.Active;
            this.ach.AchId = 0;
            this.ach.CustomerId = this.customerId;
            this.getAchApprovers();
            if (this.achMediatorService.copiedAch.Account) {
                if (!this.ach.Account) {
                    this.ach.Account = new account_model_1.Account();
                }
                this.ach.Account.AccountId = this.achMediatorService.copiedAch.Account.AccountId;
            }
            //this.ach.AchApprover.AchApproverId = this.achMediatorService.copiedAch.AchApprover.AchApproverId;
            this.processingDatesDataService.getProcessingDates(this.ach.Schedule)
                .subscribe(function (ret) {
                var processingDateService = new processing_date_service_1.ProcessingDateService();
                _this.ach.Schedule = processingDateService.formatProcessingDates(ret, _this.ach.Schedule);
            }, function (err) {
                _this.growler.growlError('Error', 'Could not get processing dates');
            });
            this.isCopy = true;
        }
        else {
            this.ach = new ach_model_1.Ach();
            this.ach.CustomerId = this.customerId;
            this.ach.AuthorizationType = authorization_type_enum_1.AuthorizationType.None;
            this.ach.BankTemplate = new bank_template_model_1.BankTemplate();
            this.ach.Account = this.utilities.defaultDropDownValue;
            this.ach.AuditInfo = new audit_info_1.AuditInfo();
            this.ach.AchApprover = this.utilities.defaultDropDownValue;
            this.ach.Status = ach_status_1.AchStatus.Active;
            this.ach.Schedule = new scheduler_container_model_1.SchedulerContainer();
            this.ach.Schedule.NextPaymentDates = [];
            this.ach.TransactionDirection = new generic_dropdown_model_1.GenericDropDownModel();
            if (this.bankTemplate) {
                this.ach.BankTemplate = this.bankTemplate;
            }
            if (this.achType) {
                this.ach.TransactionDirectionDisplay = this.achType;
            }
            this.ach.HowToApply = this.utilities.defaultDropDownValue;
            this.feeCodeHasBeenEdited = false;
        }
        this.ach.TransactionDirection.Id = 2;
        this.ach.TransactionDirection.Description = 'Out';
        if (this.achType === "In") {
            this.ach.TransactionDirection.Id = 1;
            this.ach.TransactionDirection.Description = 'In';
        }
    };
    AchComponent.prototype.openScheduler = function () {
        var _this = this;
        var schedulerModel = Object.assign({}, this.ach.Schedule);
        schedulerModel.RecurringSchedule = Object.assign({}, this.ach.Schedule.RecurringSchedule);
        schedulerModel.NextPaymentDates = Object.assign({}, this.ach.Schedule.NextPaymentDates);
        this.dialogService.addDialog(scheduler_component_1.SchedulerComponent, {
            schedulerContainer: schedulerModel,
            verbalAchReceived: this.ach.AuthorizationType === authorization_type_enum_1.AuthorizationType.Verbal,
            minDate: new Date(),
            prepaymentRestriction: this.ach.Account && this.ach.Account.PrePayRestriction && (this.ach.TransactionDirection && this.ach.TransactionDirection.Description === 'In') ? this.ach.Account.PrePayRestriction : '0'
        }).subscribe(function (schedulerData) {
            if (schedulerData) {
                _this.ach.Schedule = schedulerData;
                _this.isSaveDisabled();
            }
        });
    };
    AchComponent.prototype.viewPayments = function () {
        var _this = this;
        this.dialogService.addDialog(view_payments_modal_component_1.ViewPaymentsModalComponent, {
            title: 'Upcoming Payments',
            message: '',
            confirmText: '',
            cancelText: 'Close',
            upcomingPayments: this.ach.Schedule.NextPaymentDates
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.achDataService.postAch(_this.ach)
                    .subscribe(function (isConfirmed) {
                });
            }
        });
    };
    AchComponent.prototype.loadApprovers = function (accountId) {
        this.getAchApprovers();
        for (var _i = 0, _a = this.accounts; _i < _a.length; _i++) {
            var account = _a[_i];
            if (account && account.AccountId === accountId) {
                this.ach.Account.AccountNumber = account.AccountNumber;
            }
        }
    };
    AchComponent.prototype.accountNumberChanged = function () {
        if (this.customerId > 0) {
            if ((this.ach.TransactionDirection && this.ach.TransactionDirection.Description === 'Out') || this.achType === 'Out') {
                this.loadApprovers(this.ach.Account.AccountId);
            }
            else if ((this.ach.TransactionDirection && this.ach.TransactionDirection.Description === 'In') || this.achType === 'In') {
                this.howToApplyChanged();
            }
        }
    };
    AchComponent.prototype.getAccounts = function (Id) {
        var _this = this;
        this.accountService.getAccounts(Id)
            .subscribe(function (ret) {
            if (ret && ret.length > 0) {
                _this.accounts = ret;
                if (_this.ach && _this.ach.Account) {
                    _this.ach.Account = _this.accounts.find(function (t) { return t.AccountId === _this.ach.Account.AccountId; });
                }
                if (_this.accountsMediatorService.selectedAccount) {
                    _this.ach.Account = _this.accountsMediatorService.selectedAccount;
                    if (_this.accounts && _this.accounts.length > 0) {
                        var list = _this.accounts.filter(function (x) { return x.AccountId ===
                            _this.accountsMediatorService.selectedAccount.AccountId; });
                        if (list && list.length > 0) {
                            _this.ach.Account = list[0];
                        }
                    }
                }
            }
        }, function (err) {
            _this.growler.growlError("Error", "Error getting accounts: " + err);
        });
    };
    AchComponent.prototype.getAchApprovers = function () {
        var _this = this;
        if (this.customerId > 0) {
            this.achDataService.getApprovers(this.customerId)
                .subscribe(function (ret) {
                if (ret && ret.length > 0) {
                    _this.approvers = ret;
                    if (_this.ach && _this.ach.AchApprover) {
                        _this.ach.AchApprover = _this.approvers.find(function (t) { return t.AchApproverId === _this.ach.AchApprover.AchApproverId; });
                    }
                }
            }, function (err) {
                _this.growler.growlError("Error", "Error getting approvers: " + err);
            });
        }
    };
    AchComponent.prototype.submitAch = function () {
        var _this = this;
        if (!this.ach.TransactionDirection) {
            this.ach.TransactionDirection = new generic_dropdown_model_1.GenericDropDownModel();
        }
        this.ach.TransactionDirection.Description = 'Out';
        this.ach.TransactionDirectionDisplay = "Out";
        if (this.achType === "In") {
            this.ach.TransactionDirection.Description = 'In';
            this.ach.TransactionDirectionDisplay = "In";
        }
        this.dialogService.addDialog(view_transaction_modal_component_1.ViewTransactionModalComponent, {
            title: 'ACH Setup Confirmation',
            message: '',
            confirmText: 'Confirm',
            cancelText: 'Cancel',
            ach: this.ach,
            twentyOneFourty: this.ach.AuthorizationType === authorization_type_enum_1.AuthorizationType.Form2140,
            verbalAchReceived: this.ach.AuthorizationType === authorization_type_enum_1.AuthorizationType.Verbal
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
                    title: 'Confirmation',
                    message: 'Upon Save, this template will not be editable.',
                    confirmText: 'Save',
                    cancelText: 'Cancel'
                }).subscribe(function (isConfirmed) {
                    if (isConfirmed) {
                        _this.achDataService.postAch(_this.ach)
                            .subscribe(function (insertedAchOut) {
                            if (insertedAchOut) {
                                _this.growler.growlSuccess("Success", "ACH " + _this.ach.TransactionDirection.Description + " saved successfully");
                                if (_this.achMediatorService.copiedAch && _this.achMediatorService.copiedAch.Status != undefined && _this.achMediatorService.copiedAch.Status !== ach_status_1.AchStatus.Deleted) {
                                    _this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
                                        title: 'Copy Successful',
                                        message: "This ACH has been successfully copied. Would you like to delete the original ACH?",
                                        confirmText: 'Keep',
                                        cancelText: 'Delete'
                                    }).subscribe(function (isKeep) {
                                        if (!isKeep) {
                                            _this.achDataService.deleteAchTransaction(_this.achMediatorService.copiedAch.AchId)
                                                .subscribe(function (status) {
                                                if (status) {
                                                    _this.growler.growlSuccess('Success', 'ACH transaction has been deleted successfully');
                                                    _this.achMediatorService.copiedAch = undefined;
                                                    _this.navigateToAchTransactions();
                                                }
                                                else {
                                                    _this.growler.growlError('Error', 'ACH transaction deletion failed');
                                                }
                                            }, function (err) {
                                                _this.growler
                                                    .growlError('Error', 'ACH transaction deletion failed');
                                            });
                                        }
                                        else {
                                            _this.navigateToAchTransactions();
                                        }
                                    });
                                }
                                else {
                                    _this.navigateToAchTransactions();
                                }
                            }
                            else {
                                _this.growler.growlError("Error", "ACH " + _this.ach.TransactionDirection.Description + " failed to save");
                            }
                        }, function (err) {
                            _this.growler.growlError("Error", "ACH " + _this.ach.TransactionDirection.Description + " failed to save: " + err);
                        });
                    }
                });
            }
        });
    };
    AchComponent.prototype.navigateToAchTransactions = function () {
        this.router.navigate([routes_factory_1.RoutesFactory.createAchTransactionsRoute(this.customerId)]);
    };
    AchComponent.prototype.hideExcessAmountValidation = function () {
        var hidden = true;
        if (this.ach.Account && this.ach.Account.PrePayRestriction && this.ach.Account.PrePayRestriction === '1') {
            if (this.ach.ExcessAmount && +this.ach.ExcessAmount > 250) {
                hidden = false;
            }
        }
        return hidden;
    };
    AchComponent.prototype.howToApplyChanged = function () {
        if (this.ach.Account && this.ach.Account.ScheduledPaymentAmount && this.ach.HowToApply) {
            if (this.ach.HowToApply.Description === 'Scheduled Payment' || this.ach.HowToApply.Description === 'Scheduled Payment + Excess') {
                this.ach.Amount = this.ach.Account.ScheduledPaymentAmount.toString();
            }
            else {
                if (+this.ach.ExcessAmount > 0) {
                    this.ach.ExcessAmount = undefined;
                }
                if (this.ach.HowToApply.Id !== 10) {
                    this.ach.OtherFeeCode = this.utilities.defaultDropDownValue;
                }
                else {
                    this.getFeeCodes();
                }
            }
        }
    };
    AchComponent.prototype.excessAmountRequired = function () {
        if (this.ach.HowToApply && this.ach.HowToApply.Description === 'Scheduled Payment + Excess') {
            return true;
        }
        return false;
    };
    AchComponent.prototype.excessAmountDisabled = function () {
        if (!this.ach.HowToApply || (this.ach.HowToApply && this.ach.HowToApply.Description !== 'Scheduled Payment + Excess')) {
            if (+this.ach.ExcessAmount > 0) {
                this.ach.ExcessAmount = undefined;
            }
            return true;
        }
        return false;
    };
    AchComponent.prototype.getFeeCodes = function () {
        var _this = this;
        if (this.achType === "In") {
            this.centralCodesDataService.getOtherFees()
                .subscribe(function (ret) {
                if (ret && ret.length > 0) {
                    _this.feeCodeList = ret;
                    _this.filteredFeeCodeList = _this.feeCodeList;
                }
            });
        }
    };
    AchComponent.prototype.feeCodeSearch = function (event) {
        if (event.query && event.query.length > 0) {
            this.filteredFeeCodeList = this.feeCodeList.filter(function (e) { return e.Description.toLowerCase().includes(event.query.toLowerCase()); });
        }
        else {
            this.filteredFeeCodeList = this.feeCodeList;
        }
    };
    AchComponent.prototype.validateSelectedFeeCode = function (event) {
        this.feeCodeHasBeenEdited = true;
        if (this.ach.OtherFeeCode === undefined || this.ach.OtherFeeCode === null) {
            this.isFeeCodeValid = false;
            return;
        }
        var matches = this.feeCodeList.filter(function (e) { return e.Description.toLowerCase() === event.srcElement.value.toLowerCase(); }).length;
        if (event.srcElement.value && matches <= 0) {
            this.isFeeCodeValid = false;
            return;
        }
        if (matches === 1) {
            this.ach.OtherFeeCode = this.feeCodeList.find(function (e) { return e.Description.toLowerCase() === event.srcElement.value.toLowerCase(); });
        }
        this.isFeeCodeValid = true;
    };
    AchComponent.prototype.otherFeeSelected = function (event) {
        this.isFeeCodeValid = true;
    };
    AchComponent.prototype.handleDropdownClick = function (event) {
        var _this = this;
        this.filteredFeeCodeList = [];
        setTimeout(function () {
            _this.filteredFeeCodeList = _this.feeCodeList;
        }, 100);
    };
    AchComponent.prototype.isSaveDisabled = function () {
        if (this.ach.Schedule.Frequency == null || this.ach.Schedule.Frequency == undefined) {
            return true;
        }
        if (this.ach.Account.PrePayRestriction === 'true' && +this.ach.ExcessAmount > 250) {
            return true;
        }
        if (this.ach.HowToApply != undefined && this.ach.HowToApply.Id === 10 && !this.isFeeCodeValid) {
            return true;
        }
        return false;
    };
    return AchComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", bank_template_model_1.BankTemplate)
], AchComponent.prototype, "bankTemplate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], AchComponent.prototype, "achType", null);
AchComponent = __decorate([
    core_1.Component({
        selector: 'ach',
        template: __webpack_require__(1196),
        styles: [__webpack_require__(1271)]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, ng2_bootstrap_modal_1.DialogService, ach_data_service_1.AchDataService,
        growler_mediator_service_1.GrowlerMediatorService, accounts_data_service_1.AccountsDataService, router_1.Router,
        ach_mediator_service_1.AchMediatorService, central_codes_data_service_1.CentralCodesDataService,
        accounts_mediator_service_1.AccountsMediatorService, processing_dates_data_service_1.ProcessingDatesDataService, customer_service_1.CustomerService])
], AchComponent);
exports.AchComponent = AchComponent;


/***/ }),

/***/ 1130:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(13);
var bank_account_manager_component_1 = __webpack_require__(1090);
var ach_setup_component_1 = __webpack_require__(1088);
var ach_transactions_component_1 = __webpack_require__(1085);
var ach_reject_component_1 = __webpack_require__(1087);
var routes = [
    { path: 'bankTemplate', component: bank_account_manager_component_1.BankAccountManagerComponent },
    { path: 'createAch/:bankTemplateId', component: ach_setup_component_1.AchSetupComponent },
    { path: 'createAch', component: ach_setup_component_1.AchSetupComponent },
    { path: 'achTransactions', component: ach_transactions_component_1.AchTransactionsComponent },
    { path: 'reject', component: ach_reject_component_1.AchRejectComponent }
];
exports.appRoutingProviders = [];
exports.achTemplatesRouting = router_1.RouterModule.forChild(routes);


/***/ }),

/***/ 1131:
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
var core_1 = __webpack_require__(0);
var ach_data_service_1 = __webpack_require__(384);
var growler_mediator_service_1 = __webpack_require__(35);
var ach_mediator_service_1 = __webpack_require__(387);
var utilities_service_1 = __webpack_require__(1052);
var AchTemplateSelectorComponent = (function () {
    function AchTemplateSelectorComponent(achDataService, achMediatorService, growlerMediatorService) {
        this.achDataService = achDataService;
        this.achMediatorService = achMediatorService;
        this.growlerMediatorService = growlerMediatorService;
        this.onSelectedChanged = new core_1.EventEmitter();
        this.isTemplateSelected = false;
        this.utilities = new utilities_service_1.Utilities();
    }
    AchTemplateSelectorComponent.prototype.ngOnInit = function () {
        this.initializeObjects();
    };
    AchTemplateSelectorComponent.prototype.initializeObjects = function () {
        this.bankTemplate = this.utilities.defaultDropDownValue;
        this.getTemplates(this.parentCustomerId);
        if (this.achMediatorService.copiedAch) {
            this.bankTemplate = this.achMediatorService.copiedAch.BankTemplate;
        }
    };
    AchTemplateSelectorComponent.prototype.getTemplates = function (customerId) {
        var _this = this;
        if (customerId > 0) {
            this.achDataService.search(customerId.toString())
                .subscribe(function (ret) {
                if (ret) {
                    _this.templates = ret.filter(function (t) { return t.IsActive; });
                    if (_this.bankTemplateId && _this.templates) {
                        _this.bankTemplate = _this.templates.find(function (t) { return t.BankTemplateId === _this.bankTemplateId; });
                        _this.onSelectedChanged.emit(_this.bankTemplate);
                    }
                }
                else {
                    _this.growlerMediatorService.growlError("Error", "No bank template!");
                }
            });
        }
        else {
            return [];
        }
    };
    AchTemplateSelectorComponent.prototype.templateSelected = function () {
        if (this.bankTemplate) {
            this.onSelectedChanged.emit(this.bankTemplate);
        }
    };
    return AchTemplateSelectorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], AchTemplateSelectorComponent.prototype, "parentCustomerId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], AchTemplateSelectorComponent.prototype, "bankTemplateId", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AchTemplateSelectorComponent.prototype, "onSelectedChanged", void 0);
AchTemplateSelectorComponent = __decorate([
    core_1.Component({
        selector: 'ach-template-selector',
        template: __webpack_require__(1200),
        styles: [__webpack_require__(1275)]
    }),
    __metadata("design:paramtypes", [ach_data_service_1.AchDataService,
        ach_mediator_service_1.AchMediatorService,
        growler_mediator_service_1.GrowlerMediatorService])
], AchTemplateSelectorComponent);
exports.AchTemplateSelectorComponent = AchTemplateSelectorComponent;


/***/ }),

/***/ 1140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Ach = (function () {
    function Ach() {
    }
    return Ach;
}());
exports.Ach = Ach;


/***/ }),

/***/ 1141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AuthorizationType;
(function (AuthorizationType) {
    AuthorizationType[AuthorizationType["None"] = 0] = "None";
    AuthorizationType[AuthorizationType["Form2140"] = 1] = "Form2140";
    AuthorizationType[AuthorizationType["Verbal"] = 2] = "Verbal";
})(AuthorizationType = exports.AuthorizationType || (exports.AuthorizationType = {}));


/***/ }),

/***/ 1163:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1164:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".ta-schedule-button {\n  margin-top: 1%; }\n\n.ta-date-chip {\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  background-color: #eceeef;\n  color: black;\n  padding-right: 2%;\n  margin-right: 2%;\n  height: 38px;\n  line-height: 32px;\n  border-radius: 0px; }\n\n.ta-next-dates-ul {\n  display: inline;\n  opacity: 1;\n  padding-left: 0; }\n\n.ui-inputtext {\n  height: 100%;\n  width: 96%;\n  padding: 0.5rem 0.75rem;\n  border: none; }\n\n.ui-button {\n  color: #000000;\n  background-color: #ffffff;\n  width: 3% !important;\n  border: none;\n  float: right; }\n\n.ui-button:hover {\n  color: #000000 !important;\n  background-color: #ffffff !important;\n  border: none !important; }\n", ""]);

// exports


/***/ }),

/***/ 1165:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "/*\r\n    Colors\r\n*/\n.ach-reject-delete-confirm-modal {\n  margin-left: -30%;\n  margin-right: -30%; }\n\n.span-disabled {\n  background-color: #eceeef; }\n", ""]);

// exports


/***/ }),

/***/ 1166:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1167:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1168:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".text-padding {\n  padding-right: 10%; }\n\n.child-padding {\n  padding-top: 1%;\n  padding-bottom: 1%; }\n\n.parent-padding {\n  padding-bottom: 2%; }\n", ""]);

// exports


/***/ }),

/***/ 1169:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".text-padding {\n  padding-right: 10%; }\n\n.child-padding {\n  padding-top: 1%;\n  padding-bottom: 1%; }\n\n.parent-padding {\n  padding-bottom: 2%; }\n", ""]);

// exports


/***/ }),

/***/ 1170:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "/*\r\n    Colors\r\n*/\n.bank-template-modal {\n  margin-left: -30%;\n  margin-right: -30%; }\n\n.span-disabled {\n  background-color: #eceeef; }\n", ""]);

// exports


/***/ }),

/***/ 1195:
/***/ (function(module, exports) {

module.exports = "<div class=\"ta-container\">\r\n    <div class=\"row no-gutters\">\r\n        <h2>ACH Transaction Setups</h2>\r\n        <br />\r\n\r\n        <div class=\"col-md-12\">\r\n\r\n            <div class=\"btn-group pull-right separator-bottom\" role=\"group\">\r\n                <button type=\"button\" class=\"ta-primary-button btn-sm\" (click)=\"addNew()\" data-auto-id='ach-transaction-issue-new'>\r\n                    <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\r\n                    New ACH Setup\r\n                </button>\r\n            </div>\r\n\r\n            <p-dataTable id=\"test\" data-auto-id='ach-transaction-table' sortField=\"Account.AccountId\" [(selection)] =\"selectedAchTransaction\" selectionMode=\"single\" dataKey=\"AchId\" sortOrder=\"1\" [value]=\"filteredTransactions\" [rows]=\"10\" [paginator]=\"true\" #dt>\r\n\r\n                <p-column field=\"Nickname\" data-auto-id='ach-transaction-nickname' header=\"Nickname\" [sortable]=\"true\" [style]=\"{'width':'13%'}\">\r\n                </p-column>\r\n                <p-column field=\"TransactionDirectionDisplay\" header=\"ACH Type\" data-auto-id='ach-transaction-type' [filter]=\"true\" filterMatchMode=\"equals\"\r\n                          [style]=\"{'width':'10%'}\" [sortable]=\"true\">\r\n                </p-column>\r\n                <p-column field=\"Account.AccountNumber\" header=\"Account Number\" data-auto-id='ach-transaction-accountNumber' [style]=\"{'width':'12%'}\" [sortable]=\"true\"></p-column>\r\n\r\n                <p-column field=\"Account.Purpose\" header=\"Type\" [filter]=\"false\" [sortable]=\"true\" sortOrder=\"1\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\"\r\n                          data-auto-id='account-type'>\r\n                </p-column>\r\n\r\n                <p-column field=\"FrequencyDisplay\" header=\"Frequency\" [style]=\"{'overflow':'visible'}\" data-auto-id='ach-transaction-frequencyDisplay' [sortable]=\"true\">\r\n                </p-column>\r\n                <p-column field=\"StatusDescription\" header=\"Status\" [filter]=\"true\" filterMatchMode=\"in\" data-auto-id='ach-transaction-Status' [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"true\">\r\n                    <ng-template pTemplate=\"filter\" let-col>\r\n                        <p-multiSelect data-auto-id=\"statusMultiSelects\" [options]=\"statusMultiSelects\" defaultLabel=\"Active\" (onChange)=\"onStatusChanged(dt, $event, col)\"\r\n                                       styleClass=\"ui-column-filter\"></p-multiSelect>\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n                <p-column field=\"AuditInfo.CreatedOn\" header=\"Created On\" data-auto-id='ach-transaction-createdOn' sortOrder=\"1\" [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"true\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.AuditInfo.CreatedOn | dateformat:'MM/DD/YYYY'}}\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n                <p-column field=\"AuditInfo.CreatedBy\" header=\"Created By\" data-auto-id='ach-transaction-createdBy' [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"true\">\r\n                </p-column>\r\n                <p-column field=\"AuditInfo.DeletedOn\" header=\"Deleted On\" data-auto-id='ach-transaction-deletedOn' [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"true\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.AuditInfo.DeletedOn | dateformat:'MM/DD/YYYY'}}\r\n                    </ng-template>\r\n                </p-column>\r\n                <p-column field=\"AuditInfo.DeletedBy\" header=\"Deleted By\" [style]=\"{'overflow':'visible'}\" data-auto-id='ach-transaction-deletedBy'\r\n                          [sortable]=\"true\">\r\n                </p-column>\r\n\r\n                <p-column [style]=\"{'overflow':'visible'}\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        <div class=\"btn-group\">\r\n                            <button type=\"button\" class=\"btn btn-outline-primary dropdown-toggle btn-sm \" data-toggle=\"dropdown\" aria-haspopup=\"true\"\r\n                                    aria-expanded=\"false\">\r\n                                <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\r\n                            </button>\r\n                            <div class=\"ta-primary-dropdown-menu\">\r\n\r\n                                <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"viewAch(item)\" [attr.data-auto-id]=\"getDynamicAutoId('ach-transactions-view-ach-', item.Achng-templateId)\">View ACH</a>\r\n                                <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"copyAch(item)\" [attr.data-auto-id]=\"getDynamicAutoId('ach-transactions-copy-ach-', item.Achng-templateId)\">Copy ACH</a>\r\n                                <div *ngIf=\"getIsDeleted(item) === false\">\r\n                                    <div class=\"dropdown-divider\"></div>\r\n                                    <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"deleteAch(item)\" [attr.data-auto-id]=\"getDynamicAutoId('ach-transactions-delete-ach-', item.Achng-templateId)\">Delete</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </ng-template>\r\n                </p-column>\r\n            </p-dataTable>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 1196:
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"submitAch()\" class=\"form-horizontal\" #achOutForm=\"ngForm\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4\">\r\n            <label for=\"twentyOneFourty\" class=\"form-control-label form-control-label-sm\">Form 2140 Signed:</label>&nbsp;\r\n            <input data-auto-id=\"achout_input_twentyonefourty_acknowledgement\" type=\"checkbox\" [checked]=\"ach.AuthorizationType === 1\" name=\"twentyOneFourty\" id=\"twentyOneFourty\" #twentyOneFourtySelected (change)=\"toggleFormFields(twentyOneFourtySelected.id)\" />\r\n        </div>\r\n\r\n        <div class=\"col-md-4\" *ngIf=\"achType === 'In'\">\r\n            <label for=\"verbalAchReceived\" class=\"form-control-label form-control-label-sm\">Verbal ACH Received</label>&nbsp;\r\n            <input data-auto-id=\"ach_input_verbalAchReceived\" type=\"checkbox\" [checked]=\"ach.AuthorizationType === 2\" name=\"verbalAchReceived\" id=\"verbalAchReceived\" #verbalAchReceivedSelected (change)=\"toggleFormFields(verbalAchReceivedSelected.id)\" />\r\n        </div>\r\n\r\n    </div>\r\n    <div *ngIf=\"ach.AuthorizationType === 1 || ach.AuthorizationType === 2\">\r\n        <hr />\r\n        <div class=\"row\">\r\n            <div class=\"col-md-3\">\r\n                <div class=\"form-group\">\r\n                    <span>Account Number</span>\r\n                    <select data-auto-id=\"achout_account_dropdown\" class=\"form-control form-control-label-sm\" required name=\"account\" id=\"account\" [(ngModel)]=\"ach.Account\" (change)=\"accountNumberChanged()\" #account=\"ngModel\" placeholder>\r\n                        <option disabled [selected] [value]=\"utilities.defaultDropDownValue\">Select an Account Number</option>\r\n                        <option *ngFor=\"let account of accounts\" [ngValue]=\"account\">{{account.AccountNumber}}</option>\r\n                    </select>\r\n                    <div class=\"alert alert-danger\" [hidden]=\"account.pristine || account.valid || ach.AccountId > 0\">Note Number is required</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <div class=\"form-group\">\r\n                    <span>Amount</span>\r\n                    <input currencyMask [options]=\"{ align: 'left', prefix: '$ ', thousands: ',', decimal: '.', precision: '2' }\" data-auto-id=\"achout_input_amount\" name=\"amount\" id=\"amount\" [(ngModel)]=\"ach.Amount\" #amount=\"ngModel\" class=\"form-control form-control-sm\" required />\r\n                    <div class=\"alert alert-danger\" [hidden]=\"amount.pristine || amount.valid || ach.Amount > 0\">Amount is required</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-3\" *ngIf=\"achType === 'In'\">\r\n                <div class=\"form-group\">\r\n                    <span>How to Apply</span>\r\n                    <select data-auto-id=\"ach_howtoapply_dropdown\" class=\"form-control form-control-label-sm\" required name=\"howtoapply\" id=\"howtoapply\" [(ngModel)]=\"ach.HowToApply\" #howtoapply=\"ngModel\" (change)=\"howToApplyChanged()\">\r\n                        <option disabled [selected] [value]=\"utilities.defaultDropDownValue\">Select How to Apply</option>\r\n                        <option *ngFor=\"let howtoApply of howtoApplyList\" [ngValue]=\"howtoApply\">{{howtoApply.Description}}</option>\r\n                    </select>\r\n                    <div class=\"alert alert-danger\" [hidden]=\"howtoapply.pristine || howtoapply.valid || ach.HowToApplyId > 0\">How to Apply is required</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-3\" *ngIf=\"ach.HowToApply?.Id == 10\">\r\n                <div class=\"form-group\">\r\n                    <span>Other Fee Code</span>\r\n                    <p-autoComplete name=\"otherFeeCode\" #otherFeeCode [(ngModel)]=\"ach.OtherFeeCode\" [minLength]=\"0\" styleClass=\"auto-complete-form-control form-control-label-sm\" [autoHighlight]=\"true\" required [suggestions]=\"filteredFeeCodeList\" (completeMethod)=\"feeCodeSearch($event)\" (onBlur)=\"validateSelectedFeeCode($event)\" (onDropdownClick)=\"handleDropdownClick($event)\"\r\n                                    (onSelect)=\"otherFeeSelected($event)\" [dropdown]=\"true\" field=\"Description\" placeholder=\"Select Other Fee Code\">\r\n                    </p-autoComplete>\r\n                    <div class=\"alert alert-danger\" [hidden]=\"!feeCodeHasBeenEdited || isFeeCodeValid\">Fee Code is required</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-3\" *ngIf=\"ach.HowToApply?.Id == 9\">\r\n                <div class=\"form-group\">\r\n                    <span>Excess Amount</span>\r\n                    <input currencyMask [options]=\"{ align: 'left', prefix: '$ ', thousands: ',', decimal: '.', precision: '2' }\" data-auto-id=\"ach_input_excess_amount\" name=\"execessAmount\" id=\"execessAmount\" [required]=\"excessAmountRequired()\" [disabled]=\"excessAmountDisabled()\" [(ngModel)]=\"ach.ExcessAmount\" #amount=\"ngModel\" class=\"form-control form-control-sm\" />\r\n                    <div class=\"alert alert-danger\" [hidden]=\"hideExcessAmountValidation()\">Excess Amount should be $250.00 or less</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-3\">\r\n                <div class=\"form-group\">\r\n                    <span>Nickname</span>\r\n                    <input data-auto-id=\"achout_input_nickname\" type=\"text\" maxlength=\"20\" class=\"form-control form-control-sm\" name=\"nickname\" id=\"nickname\" [(ngModel)]=\"ach.Nickname\" #nickname=\"ngModel\" />\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-3\" *ngIf=\"achType === 'Out'\">\r\n                <div class=\"form-group\">\r\n                    <span>Approver</span>\r\n                    <select data-auto-id=\"achout_approver_dropdown\" class=\"form-control form-control-label-sm\" required name=\"approver\" id=\"approver\" [(ngModel)]=\"ach.AchApprover\" #approver=\"ngModel\" [disabled]=\"!ach.Account\">\r\n                        <option [selected] [disabled] [value]=\"utilities.defaultDropDownValue\">Select an Approver</option>\r\n                        <option *ngFor=\"let approver of approvers\" [ngValue]=\"approver\">{{approver.Name}}</option>\r\n                    </select>\r\n                    <div class=\"alert alert-danger\" [hidden]=\"approver.pristine || approver.valid || ach.Approver > 0\">Approver is required</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-3\">\r\n                <div class=\"form-group\">\r\n                    <span>Addenda</span>\r\n                    <div *ngIf=\"bankTemplate?.IsCustomerAccountHolder\">\r\n                        <input data-auto-id=\"achout_input_addenda\" type=\"text\" maxlength=\"80\" class=\"form-control form-control-sm\" name=\"addenda\" id=\"addenda\" [(ngModel)]=\"ach.Addenda\" #addenda=\"ngModel\" />\r\n                    </div>\r\n                    <div *ngIf=\"!bankTemplate?.IsCustomerAccountHolder\">\r\n                        <input data-auto-id=\"achout_display_addenda_customer\" disabled type=\"text\" class=\"form-control form-control-sm\" name=\"addendacustomer\" id=\"addendacustomer\" [ngModel]=\"customerService.selectedCustomer?.DisplayNameReverse\" #addendacustomer=\"ngModel\" />\r\n                    </div>\r\n                </div>\r\n            </div>            \r\n            <div class=\"col-md-3\" *ngIf=\"!bankTemplate?.IsCustomerAccountHolder\">\r\n                <div class=\"form-group\">\r\n                    <span>Additional Addenda</span>\r\n                    <input data-auto-id=\"achout_input_addenda\" type=\"text\" maxlength=\"80\" class=\"form-control form-control-sm\" name=\"addenda\" id=\"addenda\" [(ngModel)]=\"ach.Addenda\" #addenda=\"ngModel\"/>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div *ngIf=\"ach.Schedule.FirstPaymentDate\" class=\"col-md-3\">\r\n                <div class=\"form-group\">\r\n                    <span>First Payment Date</span>\r\n                    <input data-auto-id=\"first_payment_date\" name=\"firstDate\" id=\"firstDate\" class=\"form-control form-control-sm\" value=\"{{ach.Schedule.FirstPaymentDate | dateformat: 'MM/DD/YYYY'}}\" readonly />\r\n                </div>\r\n            </div>\r\n\r\n            <div *ngIf=\"ach.Schedule.EndPaymentDate\" class=\"col-md-3\">\r\n                <div class=\"form-group\">\r\n                    <span>Payment End Date</span>\r\n                    <input data-auto-id=\"end_payment_date\" name=\"endDate\" id=\"endDate\" class=\"form-control form-control-sm\" value=\"{{ach.Schedule.EndPaymentDate | dateformat: 'MM/DD/YYYY'}}\" readonly />\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-md-3 ta-schedule-button\">\r\n                <button data-auto-id=\"achout_button_schedule_payments\" type=\"button\" class=\"btn btn-default\" (click)=\"openScheduler()\">Schedule Payments</button>\r\n            </div>\r\n            <div class=\"col-md-3 ta-schedule-button\" *ngIf=\"ach.Schedule.NextPaymentDates && ach.Schedule.NextPaymentDates.length > 0\">\r\n                <button data-auto-id=\"achout_button_view_payments\" type=\"button\" class=\"btn btn-default\" (click)=\"viewPayments()\">View Upcoming Payments</button>\r\n            </div>\r\n        </div>\r\n\r\n        <hr />\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\"form-group pull-right\">\r\n                    <button data-auto-id=\"achout_button_submit_ach_out\" [disabled]=\"(achOutForm.pristine && !isCopy) || !achOutForm.valid || !ach.Schedule || isSaveDisabled()\" type=\"submit\" class=\"btn btn-success\">Save</button> &nbsp;\r\n                    <button data-auto-id=\"achout_button_cancel_ach_out\" (click)=\"navigateToAchTransactions()\" type=\"button\" class=\"btn\">Cancel</button>\r\n                </div>\r\n\r\n            </div>\r\n\r\n\r\n        </div>\r\n    </div>\r\n\r\n</form>\r\n\r\n";

/***/ }),

/***/ 1197:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content ach-reject-delete-confirm-modal\">\r\n            <div class=\"modal-header\">\r\n                <h3 class=\"modal-title\">Confirm Reject</h3>\r\n                <button type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\r\n            </div>\r\n            <div class=\"modal-body ModalContentText\">\r\n\r\n                <form (ngSubmit)=\"submit()\" class=\"form-horizontal\" #achTemplateRejectionConfirmation=\"ngForm\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group\">\r\n                                <select data-auto-id=\"reason_codes_dropdown\" class=\"form-control form-control-label-sm\" required name=\"reasonCodes\" id=\"reasonCodes\"  [(ngModel)]=\"achRejection.RejectionReasonId\" (change)=\"setIsNoteVisible()\"\r\n                                        #reasonCodes=\"ngModel\" placeholder>\r\n                                    <option disabled selected value=\"0\">{{getAchRejectionDropDownPlaceHolder()}}</option>\r\n                                    <option *ngFor=\"let code of achRejectionReasonCodes\" [ngValue]=\"code.Id\">{{code.Description}}</option>\r\n                                </select>\r\n                              \r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group\" *ngIf=\"otherNoteVisible\">\r\n                                <label for=\"achRejectionOther\" class=\"form-control-label form-control-label-sm\">Other</label>\r\n                                <input data-auto-id=\"achRejectionOther\" required class=\"form-control form-control-sm\" type=\"text\" name=\"achRejectionOther\" id=\"achRejectionOther\" [(ngModel)]=\"achRejection.OtherNote\" #achRejectionOther=\"ngModel\" />\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group\" *ngIf=\"isAchOlderThan24Hours()\">\r\n                                <input data-auto-id=\"ach-rejection-form-2269\" required type=\"checkbox\" [(ngModel)]=\"achRejection.Form2269\" name=\"achRejectionForm2269\" id=\"achRejectionForm2269\" #achRejectionForm2269=\"ngModel\"/> Form 2269 has been completed by customer and sent to Cash Management. \r\n                               \r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"pull-right\">\r\n                                    <button data-auto-id=\"achRejection_button_cancel\" type=\"button\" class=\"btn pull-right\" (click)=\"close()\">Cancel</button>&nbsp;&nbsp;\r\n                                    <button data-auto-id=\"achRejection_button_confirm\" type=\"submit\" class=\"ta-primary-button\" [disabled]=\"achTemplateRejectionConfirmation.pristine || !achTemplateRejectionConfirmation.valid\">Save</button>&nbsp;&nbsp;\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 1198:
/***/ (function(module, exports) {

module.exports = "<div class=\"ta-container\">\r\n    <div class=\"row no-gutters\">\r\n        <h2>Reject ACH</h2>\r\n    </div>\r\n    <div class=\"row no-gutters\">\r\n        <p class=\"text-danger pull-right\">All rejections need to be processed by 1 pm CST. Please contact Cash Management for any questions.</p>\r\n\r\n        <div class=\"col-md-12\">\r\n            <p-dataTable id=\"achRejectiontable\" sortField=\"ExternalAccountNumber\" sortOrder=\"1\" [value]=\"rejectAchData\" selectionMode=\"single\" [(selection)]=\"selectedRejectAchData\" dataKey=\"AchId\"> [rows]=\"10\" [paginator]=\"true\" [globalFilter]=\"gb\" #dt>\r\n\r\n                <p-column header=\"Transaction Direction\" field=\"TransactionDirection\" [filter]=\"false\" [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"false\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.TransactionDirection.Description}}\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n                <p-column field=\"ExternalAccountNumber\" header=\"Account\" [filter]=\"true\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"true\">\r\n                    <ng-template pTemplate=\"filter\" let-col>\r\n                        <p-multiSelect data-auto-id=\"external-account-number-multiselects\" [options]=\"accountNumberMultiSelects\" defaultLabel=\"All Accounts\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\"\r\n                                       styleClass=\"ui-column-filter\"></p-multiSelect>\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n                <p-column field=\"Purpose\" header=\"Type\" [filter]=\"false\" [sortable]=\"true\" sortOrder=\"1\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\"\r\n                          data-auto-id='account-type'>\r\n                </p-column>\r\n\r\n                <p-column field=\"DisplayAmount\" header=\"Amount\" [filter]=\"true\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\">\r\n                    <ng-template pTemplate=\"filter\" let-col>\r\n                        <p-multiSelect data-auto-id=\"amount-multiselects\" [options]=\"amountMultiSelects\" defaultLabel=\"All Amounts\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\"\r\n                                       styleClass=\"ui-column-filter\"></p-multiSelect>\r\n                    </ng-template>\r\n\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.Amount | currency:'USD':true | currencyformat}}\r\n                    </ng-template>\r\n\r\n                </p-column>\r\n\r\n                <p-column field=\"CompanyName\" header=\"Company Name\" [filter]=\"true\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\">\r\n                    <ng-template pTemplate=\"filter\" let-col>\r\n                        <p-multiSelect data-auto-id=\"company-name-multi-selects\" [options]=\"companyNameMultiSelects\" defaultLabel=\"All Companies\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\"\r\n                                       styleClass=\"ui-column-filter\"></p-multiSelect>\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n\r\n                <p-column field=\"TransactionDate\" header=\"Transaction Date\" [filter]=\"true\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\">\r\n                    <ng-template pTemplate=\"filter\" let-col>\r\n                        <p-multiSelect data-auto-id=\"transactionDate-multiselects\" [options]=\"transactionDateMultiSelects\" defaultLabel=\"All Transaction Dates\" (onChange)=\"dt.filter($event.value,col.field,col.filterMatchMode)\"\r\n                                       styleClass=\"ui-column-filter\"></p-multiSelect>\r\n                    </ng-template>\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.TransactionDate | dateformat:'MM/DD/YYYY'}}\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n                <p-column [style]=\"{'overflow':'visible'}\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        <div class=\"btn-group\">\r\n                            <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"openConfirmDelete(item)\" [attr.data-auto-id]=\"getDynamicAutoId('ach-confirm-delete-', item.AchId)\">\r\n                                <span>Reject</span>\r\n                            </button>\r\n                        </div>\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n            </p-dataTable>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 1199:
/***/ (function(module, exports) {

module.exports = "<div class=\"ta-container\">\r\n    <h2>Create ACH</h2>\r\n    <hr />\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4\">\r\n            <span>Bank Template</span>\r\n            <ach-template-selector [parentCustomerId]='customerId' [bankTemplateId]='bankTemplateId' (onSelectedChanged)=\"bankTemplateChanged($event)\"></ach-template-selector>\r\n        </div>\r\n        <div class=\"col-md-4\">\r\n            <span>ACH Type</span>\r\n            <select data-auto-id=\"achtype\" class=\"form-control form-control-label-sm\" [disabled]=\"isAchTypeDisabled\" #achTypeSelect (change)=\"achType = achTypeSelect.value\">\r\n                <option selected disabled>Select an ACH Type...</option>\r\n                <option [selected]=\"achType === 'In'\" value='In'>In</option>\r\n                <option [selected]=\"achType === 'Out'\" value='Out'>Out</option>\r\n            </select>\r\n        </div>\r\n    </div>\r\n    <hr />\r\n    <div *ngIf=\"template && achType\">\r\n        <ach [bankTemplate]='template' [achType]='achType'></ach>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 1200:
/***/ (function(module, exports) {

module.exports = "<select data-auto-id=\"templateselector\" class=\"form-control form-control-label-sm\" [(ngModel)]=\"bankTemplate\" (change)=\"templateSelected()\">\r\n    <option disabled [selected] [value]=\"utilities.defaultDropDownValue\">Select an Existing Bank Account Template</option>\r\n    <option *ngFor=\"let template of templates\" [ngValue]=\"template\">{{ template.BankName }} {{template.BankAccountType.Description}} {{template.ExternalAccountNumber}}</option>\r\n</select>";

/***/ }),

/***/ 1201:
/***/ (function(module, exports) {

module.exports = "<div class=\"large-modal-dialog\">\r\n    <form class=\"form-horizontal\" #confirmForm=\"ngForm\">\r\n        <div class=\"ta-modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h3 class=\"modal-title\">Confirmation</h3>\r\n                <button data-auto-id=\"scheduler_modal_close_button\" type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\r\n            </div>\r\n            <div class=\"modal-body ModalText\">\r\n\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-12 float-left\">\r\n                        <span style=\"font-weight: bold;\">Bank Template:</span> {{ach.BankTemplate.BankName}} {{ach.BankTemplate.BankAccountType.Description}} {{ach.BankTemplate.ExternalAccountNumber}}\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n\r\n                    <div class=\"col-md-5 float-left\">                        \r\n                        <span style=\"font-weight: bold;\">Form 2140 Signed:</span>\r\n                        <input data-auto-id=\"confirm_twentyonefourty_acknowledgement\" type=\"checkbox\" [checked]=\"ach.AuthorizationType === 1\" disabled />\r\n                    </div>\r\n                    <div class=\"col-md-4 float-left\" *ngIf=\"isAchInTransactionDirection()\">\r\n                        <span style=\"font-weight: bold;\">Verbal ACH Received:</span>\r\n                        <input data-auto-id=\"confirm_verbalAchReceived_acknowledgement\" type=\"checkbox\" [checked]=\"ach.AuthorizationType === 2\" disabled />\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 float-left\">\r\n                        <span style=\"font-weight: bold;\">Account Number:</span> {{ach.Account.AccountNumber}}\r\n                    </div>\r\n\r\n                    <div class=\"col-md-3  float-left\">\r\n                        <span style=\"font-weight: bold;\">ACH Type:</span> {{ach.TransactionDirectionDisplay}}\r\n                    </div>\r\n                    <div class=\"col-md-5 float-left\">\r\n                        <span style=\"font-weight: bold;\">Nickname:</span> {{ach.Nickname}}\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4 float-left\" *ngIf=\"isAchOutTransactionDirection()\">\r\n                        <span style=\"font-weight: bold;\">Approver:</span> {{ach.AchApprover.Name}}\r\n                    </div>\r\n                    <div class=\"col-md-4 float-left\" *ngIf=\"isAchInTransactionDirection()\">\r\n                        <span style=\"font-weight: bold;\">How to Apply:</span> {{ach.HowToApply.Description}}\r\n                    </div>\r\n                    <div class=\"col-md-4 float-left\" *ngIf=\"ach.OtherFeeCode\">\r\n                        <span style=\"font-weight: bold;\">Other Fee Code:</span> {{ach.OtherFeeCode.Description}}\r\n                    </div>\r\n\r\n                    <div class=\"col-md-5 float-left\">\r\n                        <span style=\"font-weight: bold;\">Amount:</span> {{ach.Amount | currency:'USD':true}}\r\n                    </div>\r\n\r\n                    <div class=\"col-md-3 float-left\">\r\n                        <span style=\"font-weight: bold;\">Frequency:</span> {{ach.Schedule.Frequency | titleCase}}\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-12 float-left\" *ngIf=\"isAchInTransactionDirection()\">\r\n                        <span style=\"font-weight: bold;\">Excess Amount:</span> {{ach.ExcessAmount| currency:'USD':true}}\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-12\">\r\n                        <span style=\"font-weight: bold;\">Addenda:</span> {{ach.Addenda}}\r\n                    </div>\r\n                </div>\r\n\r\n\r\n                <!--Single Payment-->\r\n\r\n                <div *ngIf=\"ach.Schedule.Frequency === 'once'\" class=\"row\">\r\n                    <div class=\"col-md-5\">\r\n                        <span style=\"font-weight: bold;\">Pay On:</span> {{ach.Schedule.OneTimePaymentDate | dateformat:'MM/DD/YYYY'}}\r\n                    </div>\r\n                </div>\r\n               \r\n\r\n                <!--RecurringPayment-->\r\n                <div *ngIf=\"ach.Schedule.Frequency === 'recurring'\">\r\n                    \r\n                    <div *ngIf=\"ach.Schedule.RecurringSchedule.Frequency === 'monthly'\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-5\">\r\n                                <span style=\"font-weight: bold;\">Type:</span> Monthly Payment\r\n                            </div>\r\n                        </div>\r\n                        <br/>\r\n                        <monthly-component [minDate]=\"minDate\" [monthlySchedule]=\"ach.Schedule.RecurringSchedule.MonthlySchedule\" [isReadOnly]=\"true\"></monthly-component>\r\n                    </div>\r\n                    <div *ngIf=\"ach.Schedule.RecurringSchedule.Frequency === 'weekly'\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-5\">\r\n                                <span style=\"font-weight: bold;\">Type:</span> Weekly Payment\r\n                            </div>\r\n                        </div>\r\n                        <br/>\r\n                        <weekly-component [minDate]=\"minDate\" [weeklySchedule]=\"ach.Schedule.RecurringSchedule.WeeklySchedule\" [isReadOnly]=\"true\"></weekly-component>\r\n                    </div>\r\n                </div>\r\n                <div *ngIf=\"ach.Schedule.RecurringSchedule.Frequency === 'quarterly'\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-5\">\r\n                            <span style=\"font-weight: bold;\">Type:</span> Quarterly Payment\r\n                        </div>\r\n                    </div>\r\n                    <br/>\r\n                    <quarterly-component [minDate]=\"minDate\" [quarterlySchedule]=\"ach.Schedule.RecurringSchedule.QuarterlySchedule\" [isReadOnly]=\"true\"></quarterly-component>\r\n                </div>\r\n                <div *ngIf=\"ach.Schedule.RecurringSchedule.Frequency === 'annual'\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-5\">\r\n                            <span style=\"font-weight: bold;\">Type:</span> Annual Payment\r\n                        </div>\r\n                    </div>\r\n                    <br/>\r\n                    <annual-component [minDate]=\"minDate\" [annualSchedule]=\"ach.Schedule.RecurringSchedule.AnnualSchedule\" [isReadOnly]=\"true\"></annual-component>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button *ngIf=\"confirmText.length > 0\" data-auto-id='ach-transaction-confirm' type=\"button\" class=\"ta-primary-button\" (click)=\"confirm()\">{{confirmText}}</button>\r\n                <button *ngIf=\"cancelText.length > 0\" type=\"button\" data-auto-id='ach-transaction-cancel' class=\"btn\" (click)=\"cancel()\">{{cancelText}}</button>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>";

/***/ }),

/***/ 1202:
/***/ (function(module, exports) {

module.exports = "<div class=\"ta-container\">\r\n    <div class=\"row no-gutters\">\r\n\r\n        <div class=\"col-md-12\">\r\n            <h2>Bank Account Manager</h2>\r\n            <br />\r\n            <div class=\"btn-group pull-right separator-bottom\" role=\"group\">\r\n                <button type=\"button\" class=\"ta-primary-button btn-sm\" (click)=\"addNew()\" data-auto-id=\"bank-account-manager-add-new\">\r\n                    <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\r\n                    New Bank Template\r\n                </button>\r\n            </div>\r\n            <p-dataTable id=\"test\" [value]=\"templates\" sortField=\"AbaRoutingNumber\" [(selection)] =\"selectedTemplate\" selectionMode=\"single\" dataKey=\"BankTemplateId\" sortOrder=\"1\" [rows]=\"10\" [paginator]=\"true\" [globalFilter]=\"gb\" #dt>\r\n                <p-column field=\"AbaRoutingNumber\" header=\"ABA Number\" [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"true\">\r\n                </p-column>\r\n                <p-column field=\"BankName\" header=\"Bank Name\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\">\r\n                </p-column>\r\n                <p-column field=\"City\" header=\"City\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\">\r\n                </p-column>\r\n                <p-column field=\"State\" header=\"State\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\">\r\n                </p-column>\r\n                <p-column field=\"AccountNumberDisplay\" header=\"Account Number\" [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"true\">\r\n\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.ExternalAccountNumber | accountnumberformat}}\r\n                    </ng-template>\r\n                </p-column>\r\n                <p-column field=\"Purpose\" header=\"Type\" [filter]=\"false\" [sortable]=\"true\" sortOrder=\"1\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\"\r\n                          data-auto-id='account-type'>\r\n                </p-column>\r\n                <p-column field=\"BankAccountType.Description\" header=\"Account Type\" [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"true\">\r\n                </p-column>\r\n                <p-column field=\"StatusDisplay\" header=\"StatusDisplay\" [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"true\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.IsActive | statustypeformat}}\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n                <p-column [style]=\"{'overflow':'visible'}\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        <div class=\"btn-group\">\r\n                            <button type=\"button\" class=\"btn btn-outline-primary dropdown-toggle btn-sm \" data-toggle=\"dropdown\" aria-haspopup=\"true\"\r\n                                    aria-expanded=\"false\">\r\n                                <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\r\n                            </button>\r\n                            <div class=\"ta-primary-dropdown-menu\">\r\n\r\n                                <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"viewDetails(item)\" [attr.data-auto-id]=\"getDynamicAutoId('bank-account-mgr-view-details-', item.Achng-templateId)\">View Details</a>\r\n                                <div *ngIf=\"getIsDeleted(item) === false\">\r\n                                    <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"newAch(item)\" [attr.data-auto-id]=\"getDynamicAutoId('bank-account-mgr-new-ach-', item.Achng-templateId)\">New ACH</a>\r\n                                    <div class=\"dropdown-divider\"></div>\r\n                                    <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"delete(item)\" [attr.data-auto-id]=\"getDynamicAutoId('bank-account-mgr-delete-ach-', item.Achng-templateId)\">Delete</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </ng-template>\r\n                </p-column>\r\n            </p-dataTable>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 1203:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content bank-template-modal\">\r\n            <div class=\"modal-header\">\r\n                <h3 *ngIf=\"achTemplateData.BankTemplateId > 0\" class=\"modal-title\">Bank Template: {{ achTemplateData.BankName}} {{achTemplateData.ExternalAccountNumber}}</h3>\r\n                <h3 *ngIf=\"achTemplateData.BankTemplateId === 0\" class=\"modal-title\">New Bank Template</h3>\r\n\r\n                <button type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\r\n            </div>\r\n            <div class=\"modal-body ModalContentText\">\r\n\r\n                <form (ngSubmit)=\"submit()\" #achTemplateForm=\"ngForm\" class=\"form-horizontal\">\r\n                    <ta-invalid-form-message [isSubmitted]=\"achTemplateForm.submitted\"></ta-invalid-form-message>\r\n\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <ta-form-group-validation [isInvalid]=\"abaNotFound\" [isRequired]=\"true\">\r\n                                <label for=\"AbaRoutingNumber\" class=\"form-control-label form-control-label-sm\">ABA Number</label>\r\n                                <input data-auto-id=\"banktemplate_input_abanumber\" [disabled]=\"achTemplateData.BankTemplateId > 0\" class=\"form-control form-control-sm\"\r\n                                       type=\"tel\" maxlength=\"9\" name=\"AbaRoutingNumber\" id=\"AbaRoutingNumber\" (blur)=\"lookupAba()\"\r\n                                       [(ngModel)]=\"achTemplateData.AbaRoutingNumber\" #AbaRoutingNumber=\"ngModel\" required />\r\n\r\n                                <ta-invalid-control-message [isInvalid]=\"abaNotFound\" [message]=\"'ABA Number was not found, please try again.'\"></ta-invalid-control-message>\r\n                            </ta-form-group-validation>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <ta-form-group-validation>\r\n                                <label for=\"bankName\" class=\"form-control-label form-control-label-sm\">Bank Name</label>\r\n                                <input data-auto-id=\"banktemplate_input_bankName\" class=\"form-control form-control-sm\" disabled=\"true\" type=\"text\" name=\"bankName\"\r\n                                       id=\"bankName\" [(ngModel)]=\"achTemplateData.BankName\" #bankName=\"ngModel\" />\r\n                            </ta-form-group-validation>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <ta-form-group-validation>\r\n                                <label for=\"city\" class=\"form-control-label form-control-label-sm\">City</label>\r\n                                <input data-auto-id=\"banktemplate_input_city\" class=\"form-control form-control-sm\" disabled=\"true\" type=\"text\" name=\"city\"\r\n                                       id=\"city\" [(ngModel)]=\"achTemplateData.City\" #city=\"ngModel\" />\r\n                            </ta-form-group-validation>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <ta-form-group-validation>\r\n                                <label for=\"state\" class=\"form-control-label form-control-label-sm\">State</label>\r\n                                <input data-auto-id=\"banktemplate_input_state\" class=\"form-control form-control-sm\" disabled=\"true\" type=\"text\" name=\"state\"\r\n                                       id=\"state\" [(ngModel)]=\"achTemplateData.State\" #state=\"ngModel\" />\r\n                            </ta-form-group-validation>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <ta-form-group-validation [isRequired]=\"true\">\r\n                                <label for=\"ExternalAccountNumber\" class=\"form-control-label form-control-label-sm\">Account Number</label>\r\n                                <span *ngIf=\"achTemplateData.BankTemplateId > 0\" data-auto-id=\"banktemplate_input_accountNumber_span\" class=\"form-control form-control-sm span-disabled\"\r\n                                      type=\"number\">\r\n                                    {{achTemplateData.ExternalAccountNumber | accountnumberformat }}\r\n                                </span>\r\n                                <div *ngIf=\"achTemplateData.BankTemplateId === 0\">\r\n                                    <input data-auto-id=\"banktemplate_input_accountNumber\" class=\"form-control form-control-sm\" type=\"number\" name=\"ExternalAccountNumber\"\r\n                                           id=\"ExternalAccountNumber\" [(ngModel)]=\"achTemplateData.ExternalAccountNumber\" #ExternalAccountNumber=\"ngModel\"\r\n                                           required />\r\n                                </div>\r\n                            </ta-form-group-validation>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <ta-form-group-validation [isRequired]=\"true\">\r\n                                <label for=\"BankAccountTypeId\" class=\"form-control-label form-control-label-sm\">Account Type</label>\r\n                                <select data-auto-id=\"banktemplate_input_accountTypeId\" [disabled]=\"achTemplateData.BankTemplateId > 0\" class=\"form-control form-control-sm select-adjusted\"\r\n                                        name=\"BankAccountTypeId\" id=\"BankAccountTypeId\" [(ngModel)]=\"achTemplateData.BankAccountType.Id\"\r\n                                        #BankAccountTypeId=\"ngModel\" required>\r\n                                    <option disabled selected value=\"undefined\">Please select an account type</option>\r\n                                    <option *ngFor=\"let bankAccountType of accountTypes\" [ngValue]=\"bankAccountType.Id\">{{bankAccountType.Description}}</option>\r\n                                </select>\r\n                            </ta-form-group-validation>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <ta-form-group-validation [isRequired]=\"true\">\r\n                                <label for=\"AccountHolderName\" class=\"form-control-label form-control-label-sm\">Account Holder Name</label>\r\n                                <input data-auto-id=\"banktemplate_input_accountHolderName\" class=\"form-control form-control-sm\" type=\"text\" name=\"AccountHolderName\"\r\n                                       id=\"AccountHolderName\" [(ngModel)]=\"achTemplateData.AccountHolderName\" #AccountHolderName=\"ngModel\"\r\n                                       [disabled]=\"achTemplateData.BankTemplateId > 0\" required />\r\n                            </ta-form-group-validation>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <ta-form-group-validation [isRequired]=\"true\">\r\n                                <label for=\"accountHolderNameGroup\" class=\"form-control-label form-control-label-sm\">Account Holder</label>\r\n\r\n                                <select data-auto-id=\"banktemplate_input_isCustomerAccountHolder\" [disabled]=\"achTemplateData.BankTemplateId > 0\" class=\"form-control form-control-sm select-adjusted\" required id=\"IsCustomerAccountHolder\" name=\"IsCustomerAccountHolder\" #IsCustomerAccountHolder=\"ngModel\" [(ngModel)]=\"achTemplateData.IsCustomerAccountHolder\">\r\n                                    <option disabled selected value=\"undefined\">Please select a primary account holder</option>\r\n                                    <option value='true'>Customer</option>\r\n                                    <option value='false'>Other</option>\r\n                                </select>\r\n                            </ta-form-group-validation>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"pull-right\">\r\n                                    <button data-auto-id=\"banktemplate_button_warningyes\" type=\"submit\" class=\"ta-primary-button spaced\" *ngIf=\"isAddNew\">Save</button>\r\n                                    <button data-auto-id=\"banktemplate_button_cancel\" type=\"button\" class=\"btn pull-right\" (click)=\"close()\">Cancel</button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n\r\n            </div>\r\n            <div class=\"modal-footer\" *ngIf=\"achTemplateData.BankTemplateId > 0\">\r\n                <div class=\"pull-left\">\r\n                    <span *ngIf=\"achTemplateData.Status == 1\">Created By:</span>\r\n                    <span *ngIf=\"achTemplateData.Status == 2\">Deleted By:</span> {{achTemplateData.AuditInfo?.UpdatedBy}}\r\n                    on {{achTemplateData.AuditInfo?.UpdatedOn | date: 'MM/dd/yyyy h:mma'}}\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 1238:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1163);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./ach-transactions.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./ach-transactions.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1239:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1164);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./ach.component.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/index.js!./ach.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1240:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1165);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./ach-reject-confirmation.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./ach-reject-confirmation.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1241:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1166);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./ach-reject.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./ach-reject.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1242:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1167);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./ach-setup.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./ach-setup.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1243:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1168);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./ach-template-selector.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./ach-template-selector.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1244:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1169);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/index.js!./bank-account-manager.component.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/index.js!./bank-account-manager.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1245:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1170);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/index.js!./bank-template.component.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/index.js!./bank-template.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1270:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1238);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1271:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1239);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1272:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1240);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1273:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1241);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1274:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1242);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1275:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1243);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1276:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1244);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1277:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1245);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ })

});
//# sourceMappingURL=1.b116914cb760cd4ea805.chunk.js.map