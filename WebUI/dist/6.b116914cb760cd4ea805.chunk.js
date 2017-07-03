webpackJsonp([6],{

/***/ 1049:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var payment_data_service_1 = __webpack_require__(1062);
var shared_module_1 = __webpack_require__(94);
var core_1 = __webpack_require__(0);
var stop_payments_component_1 = __webpack_require__(1099);
var stop_payments_modal_component_1 = __webpack_require__(1098);
var stop_payments_routing_1 = __webpack_require__(1135);
var PaymentsModule = (function () {
    function PaymentsModule() {
    }
    return PaymentsModule;
}());
PaymentsModule = __decorate([
    core_1.NgModule({
        imports: [stop_payments_routing_1.stopPaymentsRouting, shared_module_1.SharedModule],
        exports: [],
        declarations: [stop_payments_component_1.StopPaymentsComponent, stop_payments_modal_component_1.StopPaymentModalComponent],
        providers: [payment_data_service_1.PaymentDataService],
        entryComponents: [stop_payments_modal_component_1.StopPaymentModalComponent]
    })
], PaymentsModule);
exports.PaymentsModule = PaymentsModule;


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

/***/ 1062:
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
var http_1 = __webpack_require__(20);
var rxjs_1 = __webpack_require__(25);
var settings_service_1 = __webpack_require__(29);
var growler_mediator_service_1 = __webpack_require__(35);
var PaymentDataService = (function () {
    function PaymentDataService(http, settingService, growler) {
        this.http = http;
        this.settingService = settingService;
        this.growler = growler;
        this.serverUrl = settingService.serviceFabricApi + 'payment/';
    }
    PaymentDataService.prototype.getStopPayment = function (customerId) {
        var _this = this;
        return this.http.get(this.serverUrl + customerId, this.settingService.getDefaultHeaders())
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            _this.growler.growlError("Error!", "Cannot retrieve customer payment.");
            return _this.handleError(error);
        });
    };
    PaymentDataService.prototype.updateStopPayment = function (stopPayment) {
        var _this = this;
        return this.http.post(this.serverUrl, stopPayment, this.settingService.getDefaultHeaders())
            .map(function (response) {
            return response.status === 200;
        })
            .catch(function (error) {
            _this.growler.growlError("Error!", "Cannot update stop payment record.");
            return _this.handleError(error);
        });
    };
    PaymentDataService.prototype.deleteStopPayment = function (stopPaymentId, stopPaymentTypeId) {
        var _this = this;
        return this.http.delete(this.serverUrl + stopPaymentId + "/" + stopPaymentTypeId, this.settingService.getDefaultHeaders())
            .map(function (response) {
            return response.status === 200;
        })
            .catch(function (error) {
            _this.growler.growlError("Error!", "Cannot delete stop payment record.");
            return _this.handleError(error);
        });
    };
    PaymentDataService.prototype.getFeeAmount = function (stopPaymentTypeId) {
        var _this = this;
        return this.http.get(this.serverUrl + "feeamount/" + stopPaymentTypeId, this.settingService.getDefaultHeaders())
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            _this.growler.growlError("Error!", "Cannot retrieve customer payment.");
            return _this.handleError(error);
        });
    };
    PaymentDataService.prototype.handleError = function (error) {
        return rxjs_1.Observable.throw(new Error(error.status));
    };
    return PaymentDataService;
}());
PaymentDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, settings_service_1.SettingsService, growler_mediator_service_1.GrowlerMediatorService])
], PaymentDataService);
exports.PaymentDataService = PaymentDataService;


/***/ }),

/***/ 1098:
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
var forms_1 = __webpack_require__(15);
var payment_data_service_1 = __webpack_require__(1062);
var growler_mediator_service_1 = __webpack_require__(35);
var router_1 = __webpack_require__(13);
var core_1 = __webpack_require__(0);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var stop_payment_model_1 = __webpack_require__(1147);
var draft_stop_payment_model_1 = __webpack_require__(1146);
var ach_stop_payment_model_1 = __webpack_require__(1145);
var payment_type_1 = __webpack_require__(1107);
var audit_info_1 = __webpack_require__(1060);
var moment = __webpack_require__(2);
var StopPaymentModalComponent = (function (_super) {
    __extends(StopPaymentModalComponent, _super);
    function StopPaymentModalComponent(dialogService, router, route, growler, paymentDataService) {
        var _this = _super.call(this, dialogService) || this;
        _this.router = router;
        _this.route = route;
        _this.growler = growler;
        _this.paymentDataService = paymentDataService;
        _this.isDraftVisible = false;
        _this.isAchVisible = false;
        _this.isFeeVisible = false;
        return _this;
    }
    StopPaymentModalComponent.prototype.ngOnInit = function () {
        if (this.stopPayment === undefined) {
            this.initializeObjects();
        }
        else {
            if (this.stopPayment.ACHStopPayment == undefined) {
                this.stopPayment.ACHStopPayment = new ach_stop_payment_model_1.ACHStopPayment();
            }
            if (this.stopPayment.DraftStopPayment == undefined) {
                this.stopPayment.DraftStopPayment = new draft_stop_payment_model_1.DraftStopPayment();
            }
            this.displayPaymentTypeSubsection();
            this.populateSelectedAccount();
        }
    };
    StopPaymentModalComponent.prototype.initializeObjects = function () {
        this.stopPayment = new stop_payment_model_1.StopPayment();
        this.stopPayment.CustomerId = this.customerId;
        this.defaultDropDownValue = this.stopPayment.Account;
        this.stopPayment.AuditInfo = new audit_info_1.AuditInfo();
        this.stopPayment.ACHStopPayment = new ach_stop_payment_model_1.ACHStopPayment();
        this.stopPayment.DraftStopPayment = new draft_stop_payment_model_1.DraftStopPayment();
    };
    StopPaymentModalComponent.prototype.getAchStopPayment = function () {
        return payment_type_1.PaymentType.ACH;
    };
    StopPaymentModalComponent.prototype.getDraftStopPayment = function () {
        return payment_type_1.PaymentType.Draft;
    };
    StopPaymentModalComponent.prototype.setEndingDraftNumber = function () {
        this.stopPayment.DraftStopPayment.EndingDraftNumber = this.stopPayment.DraftStopPayment.BeginningDraftNumber;
    };
    StopPaymentModalComponent.prototype.isEndingDraftNumberValid = function () {
        if (this.stopPayment.StopPaymentType == payment_type_1.PaymentType.ACH) {
            return true;
        }
        if (this.stopPayment.DraftStopPayment.EndingDraftNumber < this.stopPayment.DraftStopPayment.BeginningDraftNumber) {
            return false;
        }
        return true;
    };
    StopPaymentModalComponent.prototype.isEndingAmountValueValid = function () {
        if (this.stopPayment.StopPaymentType == payment_type_1.PaymentType.Draft) {
            return true;
        }
        if (this.stopPayment.ACHStopPayment.ToAmount > 0 && this.stopPayment.ACHStopPayment.ToAmount < this.stopPayment.ACHStopPayment.FromAmount) {
            return false;
        }
        return true;
    };
    StopPaymentModalComponent.prototype.displayPaymentTypeSubsection = function () {
        if (this.stopPayment.StopPaymentId == undefined) {
            this.getFeeAmount();
        }
        this.calculateExpirationDate();
        if (+this.stopPayment.StopPaymentType === +payment_type_1.PaymentType.ACH) {
            this.isAchVisible = true;
            this.isDraftVisible = false;
        }
        if (+this.stopPayment.StopPaymentType === +payment_type_1.PaymentType.Draft) {
            this.isAchVisible = false;
            this.isDraftVisible = true;
        }
    };
    StopPaymentModalComponent.prototype.calculateExpirationDate = function () {
        this.stopPayment.ExpirationDate = moment().add(1, 'year').toDate();
    };
    StopPaymentModalComponent.prototype.confirm = function () {
        var _this = this;
        var list = this.accounts.filter(function (x) { return x.AccountId === _this.stopPayment.Account.AccountId; });
        if (list && list.length > 0) {
            this.stopPayment.Account = list[0];
        }
        this.paymentDataService.updateStopPayment(this.stopPayment).subscribe(function (ret) {
            _this.result = true;
            _this.growler.growlSuccess("Success", "Stop Payment saved");
            _this.close();
        }, function (err) {
            _this.growler.growlError("Error", "Error getting accounts: " + err);
        });
    };
    StopPaymentModalComponent.prototype.clear = function (confirmForm) {
        this.initializeObjects();
        this.isDraftVisible = false;
        this.isAchVisible = false;
        confirmForm.reset();
    };
    StopPaymentModalComponent.prototype.cancel = function () {
        this.result = false;
        this.close();
    };
    StopPaymentModalComponent.prototype.populateSelectedAccount = function () {
        var _this = this;
        var accountList = this.accounts.filter(function (x) { return x.AccountId === _this.stopPayment.Account.AccountId; });
        if (accountList && accountList.length > 0) {
            this.stopPayment.Account = accountList[0];
        }
    };
    StopPaymentModalComponent.prototype.getFeeAmount = function () {
        var _this = this;
        this.paymentDataService.getFeeAmount(this.stopPayment.StopPaymentType).subscribe(function (ret) {
            _this.feeAmount = ret;
            _this.isFeeVisible = true;
        });
    };
    return StopPaymentModalComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
__decorate([
    core_1.ViewChild('stopPaymentModal'),
    __metadata("design:type", forms_1.NgForm)
], StopPaymentModalComponent.prototype, "confirmForm", void 0);
StopPaymentModalComponent = __decorate([
    core_1.Component({
        selector: 'ta-stop-payment',
        template: __webpack_require__(1211)
    }),
    __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService,
        router_1.Router,
        router_1.ActivatedRoute,
        growler_mediator_service_1.GrowlerMediatorService,
        payment_data_service_1.PaymentDataService])
], StopPaymentModalComponent);
exports.StopPaymentModalComponent = StopPaymentModalComponent;


/***/ }),

/***/ 1099:
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
var date_format_pipe_1 = __webpack_require__(395);
var stop_payments_modal_component_1 = __webpack_require__(1098);
var payment_data_service_1 = __webpack_require__(1062);
var accounts_data_service_1 = __webpack_require__(388);
var growler_mediator_service_1 = __webpack_require__(35);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var router_1 = __webpack_require__(13);
var confirm_modal_component_1 = __webpack_require__(383);
var core_1 = __webpack_require__(0);
var payment_type_1 = __webpack_require__(1107);
var StopPaymentsComponent = (function () {
    function StopPaymentsComponent(router, accountService, route, dialogService, growler, paymentDataService) {
        this.router = router;
        this.accountService = accountService;
        this.route = route;
        this.dialogService = dialogService;
        this.growler = growler;
        this.paymentDataService = paymentDataService;
        this.isRegionalCustomer = true;
    }
    StopPaymentsComponent.prototype.ngOnInit = function () {
        this.getRouteParams();
        this.initializeStopPayments();
    };
    ;
    StopPaymentsComponent.prototype.initializeStopPayments = function () {
    };
    StopPaymentsComponent.prototype.delete = function (item) {
        var _this = this;
        this.selectedStopPayment = Object.assign({}, item);
        this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
            title: 'Delete Confirmation',
            message: 'Are you sure you want to delete this Stop Payment?',
            confirmText: 'Yes',
            cancelText: 'No'
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.deleteSelectedPayment(item.StopPaymentId, item.StopPaymentType);
            }
            _this.selectedStopPayment = undefined;
        });
    };
    StopPaymentsComponent.prototype.getDynamicAutoId = function (name, id) {
        return name + id;
    };
    StopPaymentsComponent.prototype.getRouteParams = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.customerId = +params['customerId'];
            if (_this.customerId !== 0) {
                _this.getAccounts(_this.customerId);
                _this.getStopPayment(_this.customerId);
            }
        });
    };
    StopPaymentsComponent.prototype.getAccounts = function (Id) {
        var _this = this;
        this.accountService.getAccounts(Id)
            .subscribe(function (ret) {
            if (ret && ret.length > 0) {
                _this.accounts = ret;
            }
        }, function (err) {
            _this.growler.growlError("Error", "Error getting accounts: " + err);
        });
    };
    StopPaymentsComponent.prototype.getStopPayment = function (Id) {
        var _this = this;
        this.paymentDataService.getStopPayment(Id)
            .subscribe(function (ret) {
            if (ret && ret.length > 0) {
                _this.stopPaymentsList = ret;
                _this.applyPipes();
                _this.checkIfCustomerIsRegional();
            }
            else {
                _this.stopPaymentsList = new Array();
            }
        }, function (err) {
            _this.growler.growlError("Error", "Error getting accounts: " + err);
        });
    };
    StopPaymentsComponent.prototype.checkIfCustomerIsRegional = function () {
        if (this.stopPaymentsList[0].IsRegionalAccount === false) {
            this.isRegionalCustomer = false;
            this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
                title: 'Invalid Region',
                message: 'This account is outside of your region. You can only place Stop Payments on accounts in your region.',
                confirmText: 'OK'
            });
        }
    };
    StopPaymentsComponent.prototype.applyPipes = function () {
        var pipe = new date_format_pipe_1.DateFormatPipe();
        if (this.stopPaymentsList && this.stopPaymentsList.length > 0) {
            var i;
            for (i = 0; i < this.stopPaymentsList.length; i++) {
                this.stopPaymentsList[i].ExpirationDateDisplay = pipe.transform(this.stopPaymentsList[i].ExpirationDate.toString(), "MM/DD/YYYY");
            }
        }
    };
    StopPaymentsComponent.prototype.deleteSelectedPayment = function (stopPaymentId, stopPaymentTypeId) {
        var _this = this;
        this.paymentDataService.deleteStopPayment(stopPaymentId, stopPaymentTypeId).subscribe(function (ret) {
            if (ret) {
                _this.getStopPayment(_this.customerId);
                _this.growler.growlSuccess("Success", "Stop Payment has been successfully deleted");
            }
        }, function (err) {
            _this.growler.growlError("Error", "Error deleting record.");
        });
    };
    StopPaymentsComponent.prototype.editPayment = function (item) {
        var _this = this;
        var stopPaymentCopy = Object.assign({}, item);
        this.selectedStopPayment = Object.assign({}, item);
        this.dialogService.addDialog(stop_payments_modal_component_1.StopPaymentModalComponent, {
            title: 'Edit Stop Payment',
            message: '',
            confirmText: '',
            cancelText: '',
            stopPayment: stopPaymentCopy,
            customerId: this.customerId,
            accounts: this.accounts
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.getStopPayment(_this.customerId);
            }
            _this.selectedStopPayment = undefined;
        });
    };
    StopPaymentsComponent.prototype.addNew = function () {
        var _this = this;
        this.dialogService.addDialog(stop_payments_modal_component_1.StopPaymentModalComponent, {
            title: 'Add Stop Payment',
            message: '',
            confirmText: '',
            cancelText: '',
            stopPayment: undefined,
            customerId: this.customerId,
            accounts: this.accounts
        }).subscribe(function (isConfirmed) {
            _this.getStopPayment(_this.customerId);
        });
    };
    StopPaymentsComponent.prototype.isAch = function (item) {
        if (item != undefined) {
            return item.StopPaymentType == payment_type_1.PaymentType.ACH;
        }
        return false;
    };
    StopPaymentsComponent.prototype.isDraft = function (item) {
        if (item != undefined) {
            return item.StopPaymentType == payment_type_1.PaymentType.Draft;
        }
        return false;
    };
    StopPaymentsComponent.prototype.pipeRow = function (item) {
        if (item.StopPaymentType == payment_type_1.PaymentType.ACH) {
            if (item.ACHStopPayment.DisplayToAmount !== null) {
                return item.ACHStopPayment.DisplayFromAmount + ' - '
                    + item.ACHStopPayment.DisplayToAmount;
            }
            return item.ACHStopPayment.DisplayFromAmount;
        }
        return '';
    };
    return StopPaymentsComponent;
}());
StopPaymentsComponent = __decorate([
    core_1.Component({
        selector: 'app-stop-payments',
        template: __webpack_require__(1212),
        styles: [__webpack_require__(1237)]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        accounts_data_service_1.AccountsDataService,
        router_1.ActivatedRoute,
        ng2_bootstrap_modal_1.DialogService,
        growler_mediator_service_1.GrowlerMediatorService,
        payment_data_service_1.PaymentDataService])
], StopPaymentsComponent);
exports.StopPaymentsComponent = StopPaymentsComponent;


/***/ }),

/***/ 1107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PaymentType;
(function (PaymentType) {
    PaymentType[PaymentType["ACH"] = 1] = "ACH";
    PaymentType[PaymentType["Draft"] = 2] = "Draft";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));


/***/ }),

/***/ 1135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(13);
var stop_payments_component_1 = __webpack_require__(1099);
var routes = [
    // tslint:disable-next-line:max-line-length
    { path: 'stoppayments', component: stop_payments_component_1.StopPaymentsComponent }
];
exports.appRoutingProviders = [];
exports.stopPaymentsRouting = router_1.RouterModule.forChild(routes);


/***/ }),

/***/ 1145:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ACHStopPayment = (function () {
    function ACHStopPayment() {
    }
    return ACHStopPayment;
}());
exports.ACHStopPayment = ACHStopPayment;


/***/ }),

/***/ 1146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DraftStopPayment = (function () {
    function DraftStopPayment() {
    }
    return DraftStopPayment;
}());
exports.DraftStopPayment = DraftStopPayment;


/***/ }),

/***/ 1147:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StopPayment = (function () {
    function StopPayment() {
    }
    return StopPayment;
}());
exports.StopPayment = StopPayment;


/***/ }),

/***/ 1211:
/***/ (function(module, exports) {

module.exports = "<div class=\"large-modal-dialog\">\r\n    <form (ngSubmit)=\"confirm()\" class=\"form-horizontal\" #stopPaymentModal=\"ngForm\">\r\n        <div class=\"ta-modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h3 class=\"modal-title\">Stop Payment</h3>\r\n                <button data-auto-id=\"stop-payment_modal_close_button\" type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\r\n            </div>\r\n            <div class=\"modal-body ModalText\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4\">\r\n                        <div class=\"form-group\">\r\n                            <label for=\"account\" class=\"form-control-label form-control-label-sm\">Account Number</label>\r\n                            <div class=\"input-group\">\r\n                                <select data-auto-id=\"stoppayment_account_dropdown\" class=\"form-control form-control-label-sm\" required name=\"account\" id=\"account\"\r\n                                        [(ngModel)]=\"stopPayment.Account\" #account=\"ngModel\" placeholder>\r\n                                    <option disabled [selected] [value]=\"defaultDropDownValue\">Select an Account Number...</option>\r\n                                    <option *ngFor=\"let account of accounts\" [ngValue]=\"account\">{{account.AccountNumber}}</option>\r\n                                </select>\r\n                            </div>\r\n                            <div class=\"alert alert-danger\" [hidden]=\"account.pristine || account.valid || stopPayment.Account.AccountId > 0\">Account Number is required</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                        <div class=\"form-group\">\r\n                            <label for=\"paymenttype\" class=\"form-control-label form-control-label-sm\">Stop Payment Type</label>\r\n                            <div class=\"input-group\">\r\n                                <select data-auto-id=\"stoppayment_stoppaymenttype_dropdown\" class=\"form-control form-control-label-sm\" (change)=\"displayPaymentTypeSubsection()\"\r\n                                        #paymenttype=\"ngModel\" required name=\"paymenttype\" id=\"paymenttype\" [(ngModel)]=\"stopPayment.StopPaymentType\">\r\n                                    <option selected disabled>Select a Payment Type...</option>\r\n                                    <option value=\"{{getAchStopPayment()}}\">ACH</option>\r\n                                    <option value=\"{{getDraftStopPayment()}}\">Draft</option>\r\n                                </select>\r\n                            </div>\r\n                            <div class=\"alert alert-danger\" [hidden]=\"paymenttype.pristine || paymenttype.valid || stopPayment.StopPaymentType > 0\">Stop Payment Type is required</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div *ngIf=\"isDraftVisible\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"beginningdraftnumber\" class=\"form-control-label form-control-label-sm\">Beginning Draft Number</label>\r\n                                <div class=\"input-group\">\r\n                                    <input data-auto-id=\"stoppayment_input_beginningdraft\" class=\"form-control form-control-label-sm\" type=\"number\" name=\"beginningdraftnumnber\"\r\n                                           id=\"beginningdraftnumber\" [(ngModel)]=\"stopPayment.DraftStopPayment.BeginningDraftNumber\"\r\n                                           (change)=\"setEndingDraftNumber()\" #beginningdraftnumber=\"ngModel\" required />\r\n                                </div>\r\n                                <div class=\"alert alert-danger\" [hidden]=\"beginningdraftnumber.pristine || beginningdraftnumber.valid || stopPayment.DraftStopPayment.BeginningDraftNumber > 0\">Beginning Draft Number is required</div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"endingdraftnumber\" class=\"form-control-label form-control-label-sm\">Ending Draft Number</label>\r\n                                <div class=\"input-group\">\r\n                                    <input data-auto-id=\"stoppayment_input_endingdraft\" class=\"form-control form-control-label-sm\" type=\"number\" name=\"endingdraftnumber\"\r\n                                           id=\"endingdraftnumber\" [(ngModel)]=\"stopPayment.DraftStopPayment.EndingDraftNumber\"\r\n                                           #endingdraftnumber=\"ngModel\" required />\r\n                                </div>\r\n                                <div class=\"alert alert-danger\" [hidden]=\"endingdraftnumber.pristine || endingdraftnumber.valid\">Ending Draft Number is required</div>\r\n                                <div class=\"alert alert-danger\" [hidden]=\"isEndingDraftNumberValid()\">Ending Draft Number must be greater than or equal to Beginning Draft Number</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"amount\" class=\"form-control-label form-control-label-sm\">Amount</label>\r\n                                <div class=\"input-group\">\r\n                                    <input currencyMask [options]=\"{ align: 'left', prefix: '$ ', thousands: ',', decimal: '.', precision: '2' }\" class=\"form-control form-control-label-sm\"\r\n                                           data-auto-id=\"stoppayment_input_amount\" name=\"amount\" id=\"amount\" [(ngModel)]=\"stopPayment.DraftStopPayment.Amount\"\r\n                                           #amount=\"ngModel\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div *ngIf=\"isAchVisible\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"companyname\" class=\"form-control-label form-control-label-sm\">Company Name</label>\r\n                                <div class=\"input-group\">\r\n                                    <input data-auto-id=\"stoppayment_input_companyname\" class=\"form-control form-control-label-sm\" type=\"string\" name=\"companyname\"\r\n                                           id=\"companyname\" [(ngModel)]=\"stopPayment.ACHStopPayment.CompanyName\" #companyname=\"ngModel\"\r\n                                           required />\r\n                                </div>\r\n                                <div class=\"alert alert-danger\" [hidden]=\"companyname.pristine || companyname.valid\">Company Name is required</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"amount\" class=\"form-control-label form-control-label-sm\">From Amount</label>\r\n                                <div class=\"input-group\">\r\n                                    <input currencyMask [options]=\"{ align: 'left', prefix: '$ ', thousands: ',', decimal: '.', precision: '2' }\" class=\"form-control form-control-label-sm\"\r\n                                           data-auto-id=\"stoppayment_input_from_amount\" name=\"fromamount\" id=\"fromamount\" [(ngModel)]=\"stopPayment.ACHStopPayment.FromAmount\"\r\n                                           #fromamount=\"ngModel\" required />\r\n                                </div>\r\n                                <div class=\"alert alert-danger\" [hidden]=\"fromamount.pristine || fromamount.valid\">From Amount is required</div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label for=\"amount\" class=\"form-control-label form-control-label-sm\">To Amount</label>\r\n                                <div class=\"input-group\">\r\n                                    <input currencyMask [options]=\"{ align: 'left', prefix: '$ ', thousands: ',', decimal: '.', precision: '2' }\" class=\"form-control form-control-label-sm\"\r\n                                           data-auto-id=\"stoppayment_input_to_amount\" name=\"toamount\" id=\"toamount\" [(ngModel)]=\"stopPayment.ACHStopPayment.ToAmount\"\r\n                                           #toamount=\"ngModel\" />\r\n                                </div>\r\n                                <div class=\"alert alert-danger\" [hidden]=\"isEndingAmountValueValid()\">Ending Amount must be greater than or equal to Beginning Amount</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div *ngIf=\"isAchVisible || isDraftVisible\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"form-control-label form-control-label-sm\">Expiration Date</label>\r\n                                <div class=\"input-group\">\r\n                                    <input data-auto-id=\"stoppayment_input_expirationdate\" class=\"form-control form-control-label-sm\" type=\"string\" name=\"expirationdate\"\r\n                                           id=\"expirationdate\" value=\"{{stopPayment.ExpirationDate | dateformat: 'MM/DD/YYYY'}}\"\r\n                                           disabled />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-4\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"form-control-label form-control-label-sm\">Description</label>\r\n                                <div class=\"input-group\">\r\n                                    <input data-auto-id=\"stoppayment_input_description\" class=\"form-control form-control-sm\" type=\"string\" maxlength=\"80\" name=\"description\"\r\n                                           id=\"description\" #description=\"ngModel\" [(ngModel)]=\"stopPayment.Description\" />\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-8\">\r\n                            <div class=\"form-group pull-right\">\r\n                                <button data-auto-id=\"stoppayment_button_confirm_stop_payment\" type=\"button\" class=\"btn btn-success\" [disabled]=\"stopPaymentModal.pristine || !stopPaymentModal.valid || !isEndingDraftNumberValid() || !isEndingAmountValueValid()\"\r\n                                        (click)=\"confirm()\">\r\n                                    Save\r\n                                </button> &nbsp;\r\n                                <button data-auto-id=\"stoppayment_button_clear_stop_payment\" (click)=\"clear(stopPaymentModal)\" type=\"button\" class=\"btn\">Clear</button>&nbsp;\r\n                                <button data-auto-id=\"stoppayment_button_cancel_stop_payment\" (click)=\"cancel()\" type=\"button\" class=\"btn\">Cancel</button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div *ngIf=\"isFeeVisible\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-8\">\r\n                                <label class=\"form-control-label form-control-label-sm\" style=\"color: coral\">Upon Save, please note, this loan will be charged a ${{feeAmount}} fee.</label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>";

/***/ }),

/***/ 1212:
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"submit()\" class=\"form-horizontal\" #stopPaymentForm=\"ngForm\">\r\n    <h2>Stop Payment</h2>\r\n    <div class=\"ta-container\">\r\n        <div class=\"btn-group pull-right separator-bottom\" *ngIf=\"isRegionalCustomer\">\r\n            <button type=\"button\" class=\"ta-primary-button btn-sm\" (click)=\"addNew()\" [disabled]=\"isRegionalCustomer === false\" data-auto-id=\"stop-payment-manager-add-new\">\r\n                    <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\r\n                    Add New\r\n                </button>\r\n        </div>\r\n\r\n        <p-dataTable data-auto-id=\"stop_payments_grid\" id=\"test\" [value]=\"stopPaymentsList\" [(selection)] =\"selectedStopPayment\" selectionMode=\"single\" dataKey=\"StopPaymentId\" sortField=\"Account.AccountNumber\" sortOrder=\"1\" [rows]=\"10\" [paginator]=\"true\" #dt>\r\n            <p-column field=\"StopPaymentTypeDisplay\" header=\"Stop Payment Type\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\"></p-column>\r\n            <p-column field=\"Account.AccountNumber\" header=\"Account Number\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\"></p-column>\r\n            <p-column field=\"Account.Purpose\" header=\"Type\" [filter]=\"false\" [sortable]=\"true\" sortOrder=\"1\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\"\r\n                      data-auto-id='account-type'>\r\n            </p-column>\r\n            <p-column field=\"DraftStopPayment.BeginningDraftNumber\" header=\"Beginning Draft Number\" [style]=\"{'overflow':'visible'}\"\r\n                [sortable]=\"true\">\r\n                <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                    <div *ngIf=\"isDraft(item)\">\r\n                        {{item.DraftStopPayment.BeginningDraftNumber}}\r\n                    </div>\r\n                </ng-template>\r\n            </p-column>\r\n            <p-column field=\"DraftStopPayment.EndingDraftNumber\" header=\"Ending Draft Number\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\">\r\n                <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                    <div *ngIf=\"isDraft(item)\">\r\n                        {{item.DraftStopPayment.EndingDraftNumber}}\r\n                    </div>\r\n                </ng-template>\r\n            </p-column>\r\n            <p-column field=\"DraftStopPayment?.Amount\" header=\"Draft Amount\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\">\r\n                <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                    <div *ngIf=\"isDraft(item)\">\r\n                        {{item.DraftStopPayment.Amount | currency:'USD':true }}\r\n                    </div>\r\n                </ng-template>\r\n            </p-column>\r\n            <p-column field=\"ACHStopPayment.CompanyName\" header=\"Company Name\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\">\r\n                <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                    <div *ngIf=\"isAch(item)\">\r\n                        {{item.ACHStopPayment?.CompanyName}}\r\n                    </div>\r\n                </ng-template>\r\n            </p-column>\r\n            <p-column field=\"ACHStopPayment?.FromAmount\" header=\"ACH Amount\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\">\r\n                <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                    <span *ngIf=\"isAch(item)\">\r\n                        {{item.ACHStopPayment?.FromAmount | currency:'USD':true }}\r\n                    </span>\r\n                    <span *ngIf=\"item.ACHStopPayment?.ToAmount > 0\">\r\n                        - {{item.ACHStopPayment?.ToAmount | currency:'USD':true }}\r\n                    </span>\r\n                </ng-template>\r\n            </p-column>\r\n            <p-column field=\"Description\" header=\"Description\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\"></p-column>\r\n            <p-column field=\"ExpirationDateDisplay\" header=\"Expiration Date\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\"></p-column>\r\n            <p-column field=\"AuditInfo.CreatedBy\" header=\"User Name\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\"></p-column>\r\n            <div *ngIf=\"isRegionalCustomer\">\r\n                <p-column [style]=\"{'overflow':'visible'}\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        <div class=\"btn-group\">\r\n                            <button type=\"button\" class=\"btn btn-outline-primary dropdown-toggle btn-sm \" data-toggle=\"dropdown\" aria-haspopup=\"true\"\r\n                                aria-expanded=\"false\">\r\n                            <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\r\n                        </button>\r\n                            <div class=\"ta-primary-dropdown-menu\">\r\n                                <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"editPayment(item)\" [attr.data-auto-id]=\"getDynamicAutoId('stop-payment-edit-')\">Edit Stop Payment</a>\r\n                                <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"delete(item)\" [attr.data-auto-id]=\"getDynamicAutoId('stop-payment-delete-')\">Delete Stop Payment</a>\r\n                            </div>\r\n                        </div>\r\n                    </ng-template>\r\n                </p-column>\r\n            </div>\r\n        </p-dataTable>\r\n    </div>\r\n</form>";

/***/ }),

/***/ 1237:
/***/ (function(module, exports) {

module.exports = ""

/***/ })

});
//# sourceMappingURL=6.b116914cb760cd4ea805.chunk.js.map