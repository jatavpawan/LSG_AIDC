webpackJsonp([2],{

/***/ 1047:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var drafts_shared_module_1 = __webpack_require__(1064);
var core_1 = __webpack_require__(0);
var shared_module_1 = __webpack_require__(94);
var counter_draft_list_component_1 = __webpack_require__(1092);
var counter_draft_component_1 = __webpack_require__(1093);
var drafts_routing_1 = __webpack_require__(1133);
var reject_draft_transaction_component_1 = __webpack_require__(1095);
var reject_draft_confirmation_component_1 = __webpack_require__(1094);
var DraftsModule = (function () {
    function DraftsModule() {
    }
    return DraftsModule;
}());
DraftsModule = __decorate([
    core_1.NgModule({
        imports: [drafts_routing_1.draftRouting, shared_module_1.SharedModule, drafts_shared_module_1.DraftsSharedModule],
        providers: [],
        declarations: [counter_draft_list_component_1.CounterDraftListComponent, counter_draft_component_1.CounterDraftComponent, reject_draft_transaction_component_1.RejectDraftTransactionComponent, reject_draft_confirmation_component_1.RejectDraftConfirmationComponent],
        entryComponents: [counter_draft_component_1.CounterDraftComponent, reject_draft_transaction_component_1.RejectDraftTransactionComponent, reject_draft_confirmation_component_1.RejectDraftConfirmationComponent]
    })
], DraftsModule);
exports.DraftsModule = DraftsModule;


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

/***/ 1056:
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
var account_model_1 = __webpack_require__(1055);
var drafts_data_service_1 = __webpack_require__(385);
var growler_mediator_service_1 = __webpack_require__(35);
var customer_service_1 = __webpack_require__(54);
var EditDraftModalComponent = (function (_super) {
    __extends(EditDraftModalComponent, _super);
    function EditDraftModalComponent(dialogService, draftsDataService, growler, customerService) {
        var _this = _super.call(this, dialogService) || this;
        _this.draftsDataService = draftsDataService;
        _this.growler = growler;
        _this.customerService = customerService;
        return _this;
    }
    EditDraftModalComponent.prototype.ngOnInit = function () {
        this.initializeObjects();
        this.getDraftImage(this.draft.DraftId.toString());
    };
    EditDraftModalComponent.prototype.initializeObjects = function () {
        this.result = [];
        this.errorMessage = '';
        this.isDeleteConfirmationActive = false;
        if (!this.draft.Account) {
            this.draft.Account = new account_model_1.Account();
        }
        this.editedAmount = this.draft.Amount;
        this.editedDraftNumber = this.draft.DraftNumber;
        this.editedAccountNumber = +this.draft.Account.AccountNumber;
    };
    EditDraftModalComponent.prototype.getDraftImage = function (draftIds) {
        var _this = this;
        this.draftsDataService.getDraftImages(draftIds)
            .subscribe(function (response) {
            if (response) {
                _this.frontImageSrcString = 'data:image/png;base64,' + response[0].FrontImageBase64;
                _this.backImageSrcString = 'data:image/png;base64,' + response[0].BackImageBase64;
            }
        }, function (err) {
            _this.growler.growlError("Error", "Error getting draft image: " + err);
        });
    };
    EditDraftModalComponent.prototype.save = function () {
        var _this = this;
        if (!this.isDeleteConfirmationActive) {
            if (this.formIsValid()) {
                this.draft.Account.AccountNumber = this.editedAccountNumber;
                this.draft.DraftNumber = this.editedDraftNumber;
                this.draft.Amount = this.editedAmount;
                this.draftsDataService.updateDraft(this.draft)
                    .subscribe(function (response) {
                    if (response) {
                        _this.close();
                    }
                }, function (err) {
                    _this.growler.growlError("Error", "Error saving draft: " + err);
                });
            }
            else {
                this.growler.growlError("Error", "Please provide valid input.");
            }
        }
    };
    EditDraftModalComponent.prototype.cancel = function () {
        this.close();
    };
    EditDraftModalComponent.prototype.delete = function () {
        var _this = this;
        this.draftsDataService.deleteDraft(this.draft.DraftId)
            .subscribe(function (response) {
            if (response) {
                _this.close();
            }
        }, function (err) {
            _this.growler.growlError("Error", "Error deleting draft: " + err);
        });
    };
    EditDraftModalComponent.prototype.formIsValid = function () {
        if (!this.editedAccountNumber || !this.editedDraftNumber || !this.editedAmount) {
            this.errorMessage = 'Please provide all required fields.';
            return false;
        }
        if (!(this.editedAccountNumber > 0) || !(this.editedDraftNumber > 0) || !(this.editedAmount > 0)) {
            this.errorMessage = 'Please provide valid input.';
            return false;
        }
        this.errorMessage = '';
        return true;
    };
    EditDraftModalComponent.prototype.showDeleteConfirmation = function () {
        this.errorMessage = '';
        this.isDeleteConfirmationActive = true;
    };
    EditDraftModalComponent.prototype.cancelDelete = function () {
        this.isDeleteConfirmationActive = false;
    };
    EditDraftModalComponent.prototype.openImageModal = function (side) {
        if (side === 'front') {
            this.fullImageSrcString = this.frontImageSrcString;
        }
        else {
            this.fullImageSrcString = this.backImageSrcString;
        }
        this.showFullImage = true;
    };
    EditDraftModalComponent.prototype.closeImage = function () {
        this.showFullImage = false;
    };
    return EditDraftModalComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
EditDraftModalComponent = __decorate([
    core_1.Component({
        selector: 'ta-edit-draft',
        template: __webpack_require__(1073),
        styles: [__webpack_require__(1081)]
    }),
    __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService,
        drafts_data_service_1.DraftsDataService,
        growler_mediator_service_1.GrowlerMediatorService,
        customer_service_1.CustomerService])
], EditDraftModalComponent);
exports.EditDraftModalComponent = EditDraftModalComponent;


/***/ }),

/***/ 1057:
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
var EmailDraftModalComponent = (function (_super) {
    __extends(EmailDraftModalComponent, _super);
    function EmailDraftModalComponent(dialogService) {
        return _super.call(this, dialogService) || this;
    }
    EmailDraftModalComponent.prototype.email = function () {
        this.result = true;
        this.close();
    };
    EmailDraftModalComponent.prototype.cancel = function () {
        this.result = false;
        this.close();
    };
    return EmailDraftModalComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
EmailDraftModalComponent = __decorate([
    core_1.Component({
        selector: 'ta-print-draft',
        template: __webpack_require__(1074),
        styles: [__webpack_require__(1082)]
    }),
    __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService])
], EmailDraftModalComponent);
exports.EmailDraftModalComponent = EmailDraftModalComponent;


/***/ }),

/***/ 1058:
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
var PrintDraftModalComponent = (function (_super) {
    __extends(PrintDraftModalComponent, _super);
    function PrintDraftModalComponent(dialogService) {
        return _super.call(this, dialogService) || this;
    }
    PrintDraftModalComponent.prototype.print = function () {
        this.result = true;
        this.close();
    };
    PrintDraftModalComponent.prototype.cancel = function () {
        this.result = false;
        this.close();
    };
    return PrintDraftModalComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
PrintDraftModalComponent = __decorate([
    core_1.Component({
        selector: 'ta-print-draft',
        template: __webpack_require__(1075),
        styles: [__webpack_require__(1083)]
    }),
    __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService])
], PrintDraftModalComponent);
exports.PrintDraftModalComponent = PrintDraftModalComponent;


/***/ }),

/***/ 1059:
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
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var moment = __webpack_require__(2);
var draft_search_model_1 = __webpack_require__(1067);
var drafts_data_service_1 = __webpack_require__(385);
var growler_mediator_service_1 = __webpack_require__(35);
var edit_draft_modal_component_1 = __webpack_require__(1056);
var email_draft_modal_component_1 = __webpack_require__(1057);
var print_draft_modal_component_1 = __webpack_require__(1058);
var customer_service_1 = __webpack_require__(54);
var router_1 = __webpack_require__(13);
var GlobalDraftSearchComponent = (function () {
    function GlobalDraftSearchComponent(draftsDataService, growlerMediatorService, dialogService, customerService, route) {
        this.draftsDataService = draftsDataService;
        this.growlerMediatorService = growlerMediatorService;
        this.dialogService = dialogService;
        this.customerService = customerService;
        this.route = route;
        this.drafts = [];
        this.selectedDrafts = [];
        this.errorMessage = '';
        this.searching = false;
        this.sortField = null;
        this.sortOrder = null;
    }
    GlobalDraftSearchComponent.prototype.ngOnInit = function () {
        this.initializeObjects();
        if (this.customerService.selectedCustomer == undefined || this.customerService.selectedCustomer == null) {
            this.viewOrEdit = "Edit";
            this.sortField = "Date";
            this.sortOrder = -1;
        }
        else {
            this.viewOrEdit = "View";
            this.sortField = null;
            this.sortOrder = null;
        }
    };
    GlobalDraftSearchComponent.prototype.ngOnDestroy = function () {
        this.customerService.noCustomerSelectedText = 'No Customer Selected';
    };
    GlobalDraftSearchComponent.prototype.initializeObjects = function () {
        this.searchObject = new draft_search_model_1.DraftSearch();
        this.searchObject.DraftNumberList = [];
        this.selectedDrafts = [];
        this.currentPage = 1;
        this.allSelected = false;
        this.datePickerOptions = {
            dateFormat: 'mm/dd/yyyy',
            disableDays: [],
            disableWeekends: false,
            todayBtnTxt: 'Today',
            firstDayOfWeek: 'su',
            sunHighlight: true,
            height: '1.875rem',
            inline: false,
            selectionTxtFontSize: '14px'
        };
        if (this.route.toString().includes('globalSearch')) {
            this.customerService.selectedCustomer = undefined;
            this.customerService.noCustomerSelectedText = '';
        }
        this.selectedDraft = undefined;
    };
    GlobalDraftSearchComponent.prototype.toggleCriteria = function () {
    };
    GlobalDraftSearchComponent.prototype.getDrafts = function (event) {
        if (event &&
            event.srcElement &&
            event.srcElement.parentElement &&
            event.srcElement.parentElement.className.includes('chips')) {
            return;
        }
        this.drafts = [];
        if (!this.hasSearchInputErrors()) {
            this.searching = true;
            this.errorMessage = '';
            this.formatSearchObject();
            if (this.customerService.selectedCustomer && this.customerService.selectedCustomer.Id > 0) {
                this.searchObject.CustomerId = this.customerService.selectedCustomer.Id;
            }
            this.getDraftList();
        }
    };
    GlobalDraftSearchComponent.prototype.getDraftList = function () {
        var _this = this;
        this.draftsDataService.getDraftsSearch(this.searchObject)
            .subscribe(function (ret) {
            if (ret && ret.length > 0) {
                _this.drafts = ret;
            }
            _this.searching = false;
        }, function (err) {
            _this.growlerMediatorService.growlError("Error", "Error getting drafts: " + err);
            _this.searching = false;
        });
    };
    GlobalDraftSearchComponent.prototype.hasSearchInputErrors = function () {
        if (this.areAllFieldsEmpty()) {
            this.errorMessage = 'Please provide a search input.';
            this.growlerMediatorService.growlError("Error", "Please provide search input.");
            return true;
        }
        else if (!this.areValuesValid()) {
            this.growlerMediatorService.growlError("Error", this.errorMessage);
            return true;
        }
        this.errorMessage = '';
        return false;
    };
    GlobalDraftSearchComponent.prototype.areAllFieldsEmpty = function () {
        if (this.searchObject &&
            !this.searchObject.Cif &&
            !this.searchObject.AccountNumber &&
            (!this.searchObject.FromDate || this.searchObject.FromDate === '') &&
            (!this.searchObject.ToDate || this.searchObject.ToDate === '') &&
            !this.searchObject.FromAmount &&
            !this.searchObject.ToAmount &&
            !this.searchObject.FromDraftNumber &&
            !this.searchObject.ToDraftNumber &&
            (!this.searchObject.DraftNumberList || this.searchObject.DraftNumberList.length <= 0)) {
            return true;
        }
        return false;
    };
    GlobalDraftSearchComponent.prototype.areValuesValid = function () {
        if (this.searchObject.Cif && !(this.searchObject.Cif > 0)) {
            this.errorMessage = 'Please provide a valid CIF.';
            return false;
        }
        if (this.searchObject.AccountNumber && !(this.searchObject.AccountNumber >= 0)) {
            this.errorMessage = 'Please provide a valid Note Number.';
            return false;
        }
        if (this.searchObject.FromDate &&
            this.searchObject.ToDate &&
            (moment(this.searchObject.ToDate) < moment(this.searchObject.FromDate))) {
            this.errorMessage = 'From Date must be earlier than the To Date.';
            return false;
        }
        if (this.searchObject.FromAmount &&
            this.searchObject.ToAmount &&
            (this.searchObject.ToAmount < this.searchObject.FromAmount)) {
            this.errorMessage = 'From Amount must be less than the To Amount.';
            return false;
        }
        if (this.searchObject.FromDraftNumber &&
            this.searchObject.ToDraftNumber &&
            (this.searchObject.ToDraftNumber < this.searchObject.FromDraftNumber)) {
            this.errorMessage = 'From Draft Number must be less than the To Draft Number.';
            return false;
        }
        if (this.searchObject && ((this.searchObject.FromDraftNumber <= 0 || this.searchObject.ToDraftNumber <= 0) && (this.searchObject.FromDraftNumber != null && this.searchObject.ToDraftNumber != null))) {
            this.errorMessage = 'Please provide a valid Draft Number greater than 0.';
            return false;
        }
        if (this.searchObject && ((this.searchObject.FromAmount <= 0 || this.searchObject.ToAmount <= 0) && (this.searchObject.FromAmount != null && this.searchObject.ToAmount != null))) {
            this.errorMessage = 'Please provide a valid Amount greater than 0.';
            return false;
        }
        return true;
    };
    GlobalDraftSearchComponent.prototype.clear = function () {
        this.drafts = [];
        this.searchObject = new draft_search_model_1.DraftSearch();
        this.searchObject.DraftNumberList = [];
        this.errorMessage = '';
    };
    GlobalDraftSearchComponent.prototype.clearErrorMessage = function () {
        if (this.searchObject.FromDraftNumber === 0 || this.searchObject.FromDraftNumber === null) {
            this.searchObject.FromDraftNumber = undefined;
        }
        if (this.searchObject.ToDraftNumber === 0 || this.searchObject.ToDraftNumber === null) {
            this.searchObject.ToDraftNumber = undefined;
        }
        this.errorMessage = '';
    };
    GlobalDraftSearchComponent.prototype.openEditor = function (selectedDraft) {
        var _this = this;
        this.selectedDraft = Object.assign({}, selectedDraft);
        var editDraft = Object.assign({}, selectedDraft);
        this.dialogService.addDialog(edit_draft_modal_component_1.EditDraftModalComponent, {
            draft: editDraft
        }).subscribe(function (result) {
            if (result) {
                _this.getDraftList();
            }
            _this.selectedDraft = undefined;
        });
    };
    GlobalDraftSearchComponent.prototype.formatAmount = function () {
        if (this.searchObject.ToAmount === 0 || this.searchObject.ToAmount === null) {
            this.searchObject.ToAmount = undefined;
        }
        if (this.searchObject.FromAmount === 0 || this.searchObject.FromAmount === null) {
            this.searchObject.FromAmount = undefined;
        }
        this.clearErrorMessage();
    };
    GlobalDraftSearchComponent.prototype.emailDraft = function (draft) {
        var _this = this;
        var singleDraftArray = [];
        this.selectedDraft = Object.assign({}, draft);
        singleDraftArray.push(draft);
        this.dialogService.addDialog(email_draft_modal_component_1.EmailDraftModalComponent, {
            drafts: singleDraftArray
        }).subscribe(function (result) {
            _this.selectedDraft = undefined;
        });
    };
    GlobalDraftSearchComponent.prototype.printDraft = function (draft) {
        var _this = this;
        var singleDraftArray = [];
        this.selectedDraft = Object.assign({}, draft);
        singleDraftArray.push(draft);
        this.dialogService.addDialog(print_draft_modal_component_1.PrintDraftModalComponent, {
            drafts: singleDraftArray
        }).subscribe(function (result) {
            _this.selectedDraft = undefined;
        });
    };
    GlobalDraftSearchComponent.prototype.getDynamicAutoId = function (name, id) {
        return name + id;
    };
    GlobalDraftSearchComponent.prototype.selectedToggle = function (item) {
        if (item.IsSelectedForAction) {
            item.IsSelectedForAction = false;
            var index = this.selectedDrafts.indexOf(item);
            if (index > -1) {
                this.selectedDrafts.splice(index, 1);
                this.allSelected = false;
            }
        }
        else {
            item.IsSelectedForAction = true;
            this.selectedDrafts.push(item);
        }
    };
    GlobalDraftSearchComponent.prototype.formatSearchObject = function () {
        if (this.searchObject.FromAmount && !this.searchObject.ToAmount) {
            this.searchObject.ToAmount = this.searchObject.FromAmount;
        }
        else if (this.searchObject.ToAmount && !this.searchObject.FromAmount) {
            this.searchObject.FromAmount = this.searchObject.ToAmount;
        }
        if (this.searchObject.FromDraftNumber && !this.searchObject.ToDraftNumber) {
            this.searchObject.ToDraftNumber = this.searchObject.FromDraftNumber;
        }
        else if (this.searchObject.ToDraftNumber && !this.searchObject.FromDraftNumber) {
            this.searchObject.FromDraftNumber = this.searchObject.ToDraftNumber;
        }
        if ((this.searchObject.FromDate && this.searchObject.FromDate !== '') &&
            (!this.searchObject.ToDate || this.searchObject.ToDate === '')) {
            this.searchObject.ToDate = this.searchObject.FromDate;
        }
        else if ((this.searchObject.ToDate && this.searchObject.ToDate !== '') &&
            (!this.searchObject.FromDate || this.searchObject.FromDate === '')) {
            this.searchObject.FromDate = this.searchObject.ToDate;
        }
    };
    GlobalDraftSearchComponent.prototype.fromDateSelected = function (date) {
        this.searchObject.FromDate = date;
    };
    GlobalDraftSearchComponent.prototype.toDateSelected = function (date) {
        this.searchObject.ToDate = date;
    };
    GlobalDraftSearchComponent.prototype.emailMultiple = function () {
        this.dialogService.addDialog(email_draft_modal_component_1.EmailDraftModalComponent, {
            drafts: this.selectedDrafts
        }).subscribe(function (result) {
        });
    };
    GlobalDraftSearchComponent.prototype.printMultiple = function () {
        this.dialogService.addDialog(print_draft_modal_component_1.PrintDraftModalComponent, {
            drafts: this.selectedDrafts
        }).subscribe(function (result) {
        });
    };
    GlobalDraftSearchComponent.prototype.selectAll = function () {
        var startIndex = (this.currentPage - 1) * 8;
        var endIndex = startIndex + 7;
        var areAllSelected = true;
        if (endIndex > this.drafts.length - 1) {
            endIndex = this.drafts.length - 1;
        }
        for (var i in this.drafts) {
            if (+i >= startIndex && +i <= endIndex) {
                if (!this.drafts[i].IsSelectedForAction) {
                    areAllSelected = false;
                    break;
                }
            }
        }
        var count = 0;
        for (var _i = 0, _a = this.drafts; _i < _a.length; _i++) {
            var draft = _a[_i];
            if (count >= startIndex && count <= endIndex) {
                if (!areAllSelected) {
                    draft.IsSelectedForAction = true;
                    this.selectedDrafts.push(draft);
                }
                else {
                    draft.IsSelectedForAction = false;
                    this.selectedDrafts.splice(this.selectedDrafts.indexOf(draft));
                }
            }
            count++;
        }
        this.allSelected = !areAllSelected;
    };
    GlobalDraftSearchComponent.prototype.paginate = function (event) {
        this.currentPage = Math.floor(event.first / event.rows) + 1;
        var startIndex = (this.currentPage - 1) * 8;
        var endIndex = startIndex + 7;
        var areAllSelected = true;
        if (endIndex > this.drafts.length - 1) {
            endIndex = this.drafts.length - 1;
        }
        for (var i in this.drafts) {
            if (+i >= startIndex && +i <= endIndex) {
                if (!this.drafts[i].IsSelectedForAction) {
                    areAllSelected = false;
                    break;
                }
            }
        }
        this.allSelected = areAllSelected;
    };
    GlobalDraftSearchComponent.prototype.sort = function (event) {
        this.currentPage = 1;
    };
    GlobalDraftSearchComponent.prototype.draftListAdd = function (event) {
        if (!(event.value && +event.value > 0 && +event.value === Math.floor(+event.value))) {
            this.searchObject.DraftNumberList.splice(this.searchObject.DraftNumberList.indexOf(event.value), 1);
            this.errorMessage = 'Draft list input must be a whole number.';
            this.growlerMediatorService.growlError("Error", "Draft list input must be numeric.");
        }
        else if (this.searchObject.DraftNumberList.length > 8) {
            this.searchObject.DraftNumberList.splice(this.searchObject.DraftNumberList.indexOf(event.value), 1);
            this.errorMessage = 'Please do not search for more than 8 drafts.';
            this.growlerMediatorService.growlError("Error", "Please do not search for more than 8 drafts.");
        }
        else {
            this.errorMessage = '';
        }
    };
    GlobalDraftSearchComponent.prototype.isFieldSortable = function () {
        return this.customerService.selectedCustomer == undefined || this.customerService.selectedCustomer == null;
    };
    return GlobalDraftSearchComponent;
}());
GlobalDraftSearchComponent = __decorate([
    core_1.Component({
        selector: 'ta-global-draft-search',
        template: __webpack_require__(1076),
        styles: [__webpack_require__(1084)]
    }),
    __metadata("design:paramtypes", [drafts_data_service_1.DraftsDataService,
        growler_mediator_service_1.GrowlerMediatorService,
        ng2_bootstrap_modal_1.DialogService,
        customer_service_1.CustomerService,
        router_1.ActivatedRoute])
], GlobalDraftSearchComponent);
exports.GlobalDraftSearchComponent = GlobalDraftSearchComponent;


/***/ }),

/***/ 1064:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shared_module_1 = __webpack_require__(94);
var global_search_component_1 = __webpack_require__(1059);
var core_1 = __webpack_require__(0);
var edit_draft_modal_component_1 = __webpack_require__(1056);
var email_draft_modal_component_1 = __webpack_require__(1057);
var print_draft_modal_component_1 = __webpack_require__(1058);
var DraftsSharedModule = (function () {
    function DraftsSharedModule() {
    }
    return DraftsSharedModule;
}());
DraftsSharedModule = __decorate([
    core_1.NgModule({
        imports: [shared_module_1.SharedModule],
        providers: [],
        declarations: [global_search_component_1.GlobalDraftSearchComponent, edit_draft_modal_component_1.EditDraftModalComponent, email_draft_modal_component_1.EmailDraftModalComponent, print_draft_modal_component_1.PrintDraftModalComponent],
        exports: [global_search_component_1.GlobalDraftSearchComponent, edit_draft_modal_component_1.EditDraftModalComponent, email_draft_modal_component_1.EmailDraftModalComponent, print_draft_modal_component_1.PrintDraftModalComponent],
        entryComponents: [edit_draft_modal_component_1.EditDraftModalComponent, email_draft_modal_component_1.EmailDraftModalComponent, print_draft_modal_component_1.PrintDraftModalComponent]
    })
], DraftsSharedModule);
exports.DraftsSharedModule = DraftsSharedModule;


/***/ }),

/***/ 1067:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DraftSearch = (function () {
    function DraftSearch() {
    }
    return DraftSearch;
}());
exports.DraftSearch = DraftSearch;


/***/ }),

/***/ 1068:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".draft-image {\n  width: 76%;\n  height: 70%;\n  border: 1px groove #fefefe;\n  cursor: pointer; }\n\n.draft-image-customer {\n  width: 90%;\n  height: 70%;\n  border: 1px groove #fefefe;\n  cursor: pointer; }\n\n.draft-image-row {\n  padding-left: 20%; }\n\n.draft-image-row-customer-front {\n  padding-left: 10%; }\n\n.draft-image-row-customer-back {\n  padding-left: 6%; }\n\n.ta-draft-modal-content {\n  background-color: #fefefe;\n  padding: 5px;\n  width: 95%;\n  margin-bottom: 2.5%;\n  margin-left: 2.5%;\n  margin-right: 2.5%; }\n\n.full-draft-image {\n  width: 100%;\n  height: 100%;\n  border: 1px groove #fefefe; }\n\n.ta-btn-group {\n  padding-top: 12%; }\n\n.ta-draft-alert-span {\n  padding-bottom: 3%; }\n\n.ta-draft-close-image {\n  padding-right: 3.2%; }\n\n.ta-draft-edit-modal-content {\n  max-height: 32vh; }\n\n.ta-draft-image-view {\n  max-height: 45vh; }\n", ""]);

// exports


/***/ }),

/***/ 1069:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1070:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1071:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, ".draft-form-control {\n  height: 30px !important; }\n\n.draft-btn {\n  height: 28px;\n  text-align: center;\n  line-height: 14px;\n  font-size: medium;\n  z-index: -9999999; }\n\n.ta-draft-hr {\n  margin-top: 0px;\n  margin-bottom: 0px; }\n\n.ta-draft-middle-hr {\n  margin-top: -5px;\n  margin-bottom: 15px; }\n\n.ta-draft-form-row {\n  height: 51px; }\n\n.ta-draft-btn-group {\n  margin-bottom: 2px;\n  z-index: 1; }\n\n.ta-draft-dash {\n  width: 0;\n  margin-top: 25px; }\n\n.ta-draft-email-icon {\n  padding-right: 15%; }\n\n.ta-draft-pointer {\n  cursor: pointer; }\n\n.ui-chips-input-token input {\n  border: 0px;\n  outline: none; }\n\np-chips > div > .ui-state-default {\n  border: 1px solid rgba(0, 0, 0, 0.15) !important; }\n\np-chips > div > ul {\n  width: 100%; }\n", ""]);

// exports


/***/ }),

/***/ 1072:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/ajax-loader.73e57937304d89f251e7e540a24b095a.gif";

/***/ }),

/***/ 1073:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <div class=\"edit-draft-modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h3 class=\"modal-title\" *ngIf=\"!customerService.selectedCustomer\">Edit Draft</h3>\r\n                <h3 class=\"modal-title\" *ngIf=\"customerService.selectedCustomer\">View Draft</h3>\r\n\r\n                <button type=\"button\" class=\"close\" data-auto-id=\"edit_draft_modal_exit\" (click)=\"close()\">&times;</button>\r\n            </div>\r\n\r\n            <div class=\"modal-body ModalContentText ta-draft-edit-modal-content\">\r\n                <form (ngSubmit)=\"save()\" class=\"form-horizontal\" #globalDraftsForm=\"ngForm\" *ngIf=\"!customerService.selectedCustomer\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\" >\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-8\">\r\n                                    <span>Account Number</span>\r\n                                </div>\r\n                                <div class=\"col-md-4\">\r\n                                    <input class=\"form-control draft-form-control form-control-sm\" data-auto-id=\"edit_draft_modal_accountNumber\" type=\"number\" name=\"accountNumber\" [(ngModel)]=\"editedAccountNumber\" #accountNumber=\"ngModel\" (change)=\"formIsValid()\" />\r\n                                </div>\r\n                            </div>\r\n                            <br />\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-8\">\r\n                                    <span>Draft Number</span>\r\n                                </div>\r\n                                <div class=\"col-md-4\">\r\n                                    <input class=\"form-control draft-form-control form-control-sm\" data-auto-id=\"edit_draft_modal_draftNumber\" type=\"number\" name=\"draftNumber\" [(ngModel)]=\"editedDraftNumber\" #draftNumber=\"ngModel\" (change)=\"formIsValid()\" />\r\n                                </div>\r\n                            </div>\r\n                            <br />\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-8\">\r\n                                    <span>Amount</span>\r\n                                </div>\r\n                                <div class=\"col-md-4\">\r\n                                    <input currencyMask [options]=\"{ align: 'left', prefix: '$ ', thousands: ',', decimal: '.', precision: '2' }\" class=\"form-control draft-form-control form-control-sm\" data-auto-id=\"edit_draft_modal_amount\" type=\"text\" name=\"amount\" [(ngModel)]=\"editedAmount\" #amount=\"ngModel\" (change)=\"formIsValid()\" />\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-md-12\">\r\n                                    <div class=\"form-group\" [ngClass]=\"(!errorMessage)?'form-group':'ta-draft-has-danger'\">\r\n\r\n                                        <div class=\"form-control-feedback\" data-auto-id=\"edit_draft_modal_errorMessage\" [hidden]=\"!errorMessage\">\r\n                                            <span class=\"ta-draft-alert-span\">{{errorMessage}}</span>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"alert alert-danger col-md-12\" *ngIf=\"isDeleteConfirmationActive\">\r\n                                <div class=\"row\" style=\"padding-left:10px\">\r\n                                    Are you sure you want to delete this draft?\r\n                                    <br />\r\n                                </div>\r\n\r\n                                <div class=\"row\" style=\"padding-left: 200px\">\r\n                                    <button class=\"btn btn-sm btn-danger\" data-auto-id=\"edit_draft_modal_confirmDeletion\" (click)=\"delete()\">Yes</button> &nbsp;&nbsp;\r\n                                    <button class=\"btn btn-sm btn-default\" data-auto-id=\"edit_draft_modal_cancelDeletion\" (click)=\"cancelDelete()\">No</button>\r\n                                </div>\r\n                            </div>\r\n                            <br *ngIf=\"!isDeleteConfirmationActive\" />\r\n\r\n                            <div *ngIf=\"!isDeleteConfirmationActive\" class=\"row btn-group pull-right ta-btn-group\">\r\n                                <button type=\"button\" class=\"btn btn-success\" data-auto-id=\"edit_draft_modal_save\" (click)=\"save()\">Save</button> &nbsp;&nbsp;\r\n                                <button type=\"button\" class=\"btn btn-default\" data-auto-id=\"edit_draft_modal_cancel\" (click)=\"cancel()\">Cancel</button> &nbsp;&nbsp;\r\n                                <button type=\"button\" class=\"btn btn-danger\" data-auto-id=\"edit_draft_modal_delete\" (click)=\"showDeleteConfirmation()\">Delete</button> &nbsp;&nbsp;\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"row draft-image-row\" data-auto-id=\"edit_draft_modal_front_image\">\r\n                                <img src=\"{{frontImageSrcString}}\" class=\"draft-image\" (click)=\"openImageModal('front')\" title=\"Click to view\" />\r\n                            </div>\r\n                            <br />\r\n                            <div class=\"row draft-image-row\" data-auto-id=\"edit_draft_modal_back_image\">\r\n                                <img src=\"{{backImageSrcString}}\" class=\"draft-image\" (click)=\"openImageModal('back')\" title=\"Click to view\" />\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n                \r\n                <form class=\"form-horizontal\" #globalDraftsForm=\"ngForm\" *ngIf=\"customerService.selectedCustomer\">\r\n\r\n                    <div>\r\n                        Click image to enlarge\r\n                    </div>\r\n                    <br/>\r\n\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"row draft-image-row-customer-front\" data-auto-id=\"edit_draft_modal_front_image\">\r\n                                <img src=\"{{frontImageSrcString}}\" class=\"draft-image-customer\" (click)=\"openImageModal('front')\" title=\"Click to view\"/>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"row draft-image-row-customer-back\" data-auto-id=\"edit_draft_modal_back_image\">\r\n                                <img src=\"{{backImageSrcString}}\" class=\"draft-image-customer\" (click)=\"openImageModal('back')\" title=\"Click to view\"/>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <div *ngIf=\"showFullImage\">\r\n                <a class=\"ta-draft-close-image pull-right\" href=\"javascript:void();\" (click)=\"closeImage()\" title=\"Click to close\">Close Image</a>\r\n                <div class=\"ta-draft-modal-content ta-draft-image-view\">\r\n                    <img src=\"{{fullImageSrcString}}\" class=\"full-draft-image\" (click)=\"closeImage()\"/>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ }),

/***/ 1074:
/***/ (function(module, exports) {

module.exports = "<div>\r\n\t<div class=\"modal-dialog\">\r\n\t\t<div class=\"modal-content\">\r\n\t\t\t<div class=\"modal-header\">\r\n\t\t\t\t<button type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\r\n\t\t\t</div>\r\n\t\t    <div class=\"modal-body ModalContentText\">\r\n\r\n\t\t    </div>\r\n\t\t\t<div class=\"modal-footer\">\r\n\t\t\t\t<button type=\"button\" class=\"ta-primary-button btn-success\" (click)=\"email()\">Email</button>\r\n\t\t\t\t<button type=\"button\" class=\"btn btn-default\" (click)=\"cancel()\">Cancel</button>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n\r\n";

/***/ }),

/***/ 1075:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <button type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\r\n            </div>\r\n            <div class=\"modal-body ModalContentText\">\r\n                Drafts: {{drafts}}\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"ta-primary-button btn-success\" (click)=\"print()\">Print</button>\r\n                <button type=\"button\" class=\"btn btn-default\" (click)=\"cancel()\">Cancel</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ }),

/***/ 1076:
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"ta-container\">\r\n\r\n    <div class=\"row no-gutters\">\r\n        <div class=\"col-md-12\">\r\n            <h2 *ngIf=\"!customerService.selectedCustomer\">Finance Admin Draft Search</h2>\r\n            <h2 *ngIf=\"customerService.selectedCustomer\">Customer Draft Search</h2>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <hr class=\"ta-draft-hr\" />\r\n\r\n    <form (ngSubmit)=\"getDrafts($event)\" class=\"form-horizontal\" #globalDraftsForm=\"ngForm\">\r\n        <div class=\"row no-gutters\">\r\n            <div class=\"col-md-12\">\r\n                <div class=\"row ta-draft-form-row\">\r\n                    <div class=\"col-md-4\" *ngIf=\"!customerService.selectedCustomer\">\r\n                        <div class=\"form-group\">\r\n                            <span>CIF</span>\r\n                            <input data-auto-id=\"global_draft_search_cif\" type=\"number\" class=\"form-control draft-form-control form-control-sm\" name=\"cif\" [(ngModel)]=\"searchObject.Cif\" #cif=\"ngModel\" (change)=\"clearErrorMessage()\" />\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                        <div class=\"form-group\">\r\n                            <span>Account Number</span>\r\n                            <input data-auto-id=\"global_draft_search_account_number\" type=\"number\" class=\"form-control draft-form-control form-control-sm\" name=\"accountNumber\" [(ngModel)]=\"searchObject.AccountNumber\" #accountNumber=\"ngModel\" />\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row ta-draft-form-row\">\r\n                    <div class=\"col-md-2\">\r\n                        <div class=\"form-group\">\r\n                            <span>Draft Number</span>\r\n                            <input data-auto-id=\"global_draft_search_from_draft\" type=\"number\" class=\"form-control draft-form-control form-control-sm\" name=\"fromDraft\" [(ngModel)]=\"searchObject.FromDraftNumber\" #fromDraft=\"ngModel\" (change)=\"clearErrorMessage()\" placeholder=\"From\" title=\"From\" />\r\n                        </div>\r\n                    </div>\r\n                    <br />\r\n                    <span class=\"ta-draft-dash\">-</span>\r\n                    <div class=\"col-md-2\">\r\n                        <div class=\"form-group\">\r\n                            <br />\r\n                            <input data-auto-id=\"global_draft_search_to_draft\" type=\"number\" class=\"form-control draft-form-control form-control-sm\" name=\"toDraft\" [(ngModel)]=\"searchObject.ToDraftNumber\" #toDraft=\"ngModel\" (change)=\"clearErrorMessage()\" placeholder=\"To\" title=\"To\" />\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-md-2\">\r\n                        <span>From Date</span>\r\n                        <datepicker-component data-auto-id=\"global_draft_search_from_date\" [parentDate]=\"searchObject.FromDate\" [datePickerOptions]=\"datePickerOptions\" (onDateSelected)=\"fromDateSelected($event)\" (change)=\"clearErrorMessage()\"></datepicker-component>\r\n                    </div>\r\n                    <span class=\"ta-draft-dash\">-</span>\r\n                    <div class=\"col-md-2\">\r\n                        <span>To Date</span>\r\n                        <datepicker-component data-auto-id=\"global_draft_search_to_date\" [parentDate]=\"searchObject.ToDate\" [datePickerOptions]=\"datePickerOptions\" [selectedDate]=\"searchObject.FromDate\" (onDateSelected)=\"toDateSelected($event)\" (change)=\"clearErrorMessage()\"></datepicker-component>\r\n                    </div>\r\n\r\n                    <div class=\"col-md-2\">\r\n                        <div class=\"form-group\">\r\n                            <span>Amount</span>\r\n                            <input currencyMask [options]=\"{ align: 'left', prefix: '$ ', thousands: ',', decimal: '.', precision: '2' }\" type=\"text\" class=\"form-control draft-form-control form-control-sm\" data-auto-id=\"global_draft_search_from_amount\" name=\"fromAmount\" [(ngModel)]=\"searchObject.FromAmount\" #fromAmount=\"ngModel\" (keyup)=\"formatAmount()\" placeholder=\"From\" title=\"From\" />\r\n                        </div>\r\n                    </div>\r\n                    <span class=\"ta-draft-dash\">-</span>\r\n                    <div class=\"col-md-2\">\r\n                        <div class=\"form-group\">\r\n                            <br />\r\n                            <input currencyMask [options]=\"{ align: 'left', prefix: '$ ', thousands: ',', decimal: '.', precision: '2' }\" type=\"text\" class=\"form-control draft-form-control form-control-sm\" data-auto-id=\"global_draft_search_to_amount\" name=\"toAmount\" [(ngModel)]=\"searchObject.ToAmount\" #toAmount=\"ngModel\" (keyup)=\"formatAmount()\" placeholder=\"To\" title=\"To\" />\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row ta-draft-form-row\">\r\n\r\n                    <div class=\"col-md-8\">\r\n                        <div class=\"form-group\">\r\n                            <span>Draft List</span><i class=\"fa fa-fw fa-info-circle ta-info-icon\" title=\"Press enter to add draft number.\"></i>\r\n                            <p-chips data-auto-id=\"global_draft_search_draft_list\" [(ngModel)]=\"searchObject.DraftNumberList\" #draftList=\"ngModel\" name=\"draftList\" (onAdd)=\"draftListAdd($event)\"></p-chips>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-md-4\">\r\n                        <div class=\"form-group\">\r\n                            <br />\r\n                            <div class=\"btn-group ta-draft-btn-group pull-right\" role=\"group\">\r\n                                <button type=\"submit\" class=\"btn draft-btn btn-success\" data-auto-id='global-draft-search'>\r\n                                    SEARCH\r\n                                </button>&nbsp;&nbsp;&nbsp;\r\n\r\n                                <button type=\"button\" (click)=\"clear()\" class=\"ta-primary-button draft-btn btn\" data-auto-id='global-draft-clear'>\r\n                                    CLEAR\r\n                                </button>\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n    <br />\r\n\r\n    <div class=\"col-md-12\">\r\n        <div class=\"form-group\" [ngClass]=\"(!errorMessage)?'form-group':'has-danger'\">\r\n\r\n            <div class=\"form-control-feedback\" [hidden]=\"!errorMessage\">{{errorMessage}}</div>\r\n        </div>\r\n    </div>\r\n\r\n    <hr class=\"ta-draft-middle-hr\" />\r\n\r\n    <div class=\"row no-gutters\">\r\n        <div class=\"col-md-12\">\r\n            <div class=\"alert alert-info\" *ngIf=\"searching === true\">\r\n                <strong>Please wait...</strong>\r\n                <img src=\"" + __webpack_require__(1072) + "\" alt=\"Processing\" />\r\n            </div>\r\n\r\n            <div>\r\n\r\n                <p-dataTable data-auto-id='draft-table' sortField=\"{{sortField}}\" sortOrder=\"{{sortOrder}}\" [(selection)] =\"selectedDraft\" selectionMode=\"single\" dataKey=\"DraftId\" [value]=\"drafts\" [rows]=\"8\" [paginator]=\"true\" (onPage)=\"paginate($event)\" (onSort)=\"sort($event)\" [globalFilter]=\"gb\" [selectionMode]=\"multiple\" #dt *ngIf=\"searching !== true\">\r\n\r\n                    <p-column field=\"Cif\" header=\"CIF\" [filter]=\"false\" filterMatchMode=\"equals\" data-auto-id='draft-cif' [sortable]=\"isFieldSortable()\" [style]=\"{'width':'8%'}\">\r\n\r\n                    </p-column>\r\n\r\n                    <p-column field=\"Account.AccountNumber\" header=\"Account Number\" [filter]=\"false\" filterMatchMode=\"in\" [sortable]=\"isFieldSortable()\" sortOrder=\"1\" data-auto-id='draft-note-number'>\r\n\r\n                    </p-column>\r\n                    <p-column field=\"Account.Purpose\" header=\"Type\" [filter]=\"false\" [sortable]=\"isFieldSortable()\" sortOrder=\"1\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\"\r\n                              data-auto-id='account-type'>\r\n                    </p-column>\r\n\r\n                    <p-column field=\"DraftNumber\" header=\"Draft Number\" [filter]=\"false\" filterMatchMode=\"in\" [sortable]=\"isFieldSortable()\" data-auto-id='draft-draft-number'>\r\n\r\n                    </p-column>\r\n\r\n                    <p-column field=\"Amount\" header=\"Amount\" [filter]=\"false\" filterMatchMode=\"in\" [sortable]=\"isFieldSortable()\" data-auto-id='draft-amount'>\r\n                        <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                            {{item.Amount | currency:'USD':true}}\r\n                        </ng-template>\r\n                    </p-column>\r\n\r\n                    <p-column field=\"Date\" header=\"Date\" [filter]=\"false\" filterMatchMode=\"in\" [sortable]=\"isFieldSortable()\" data-auto-id='draft-date'>\r\n                        <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                            {{item.Date | dateformat:'MM/DD/YYYY'}}\r\n                        </ng-template>\r\n                    </p-column>\r\n\r\n                    <p-column field=\"Bank.BankName\" header=\"Bank\" [filter]=\"false\" filterMatchMode=\"in\" [sortable]=\"isFieldSortable()\" sortOrder=\"-1\" [style]=\"{'width':'8%'}\" data-auto-id='draft-bank'>\r\n\r\n                    </p-column>\r\n\r\n                    <p-column [style]=\"{'overflow':'visible', 'width':'7%'}\">\r\n                        <template pTemplate=\"header\">\r\n                            <i data-auto-id=\"global-draft-email-multiple\" class=\"fa fa-envelope-o ta-draft-email-icon ta-draft-pointer\" (click)=\"emailMultiple()\"></i>\r\n                            <i data-auto-id=\"global-draft-print-multiple\" class=\"fa fa-print ta-draft-pointer\" (click)=\"printMultiple()\"></i>\r\n                        </template>\r\n                        <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                            <div class=\"align-center\">\r\n                                <div class=\"btn-group\">\r\n                                    <button type=\"button\" class=\"btn btn-outline-primary dropdown-toggle btn-sm\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\r\n                                            aria-expanded=\"false\">\r\n                                        <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\r\n                                    </button>\r\n                                    <div class=\"ta-draft-dropdown\">\r\n\r\n                                        <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"openEditor(item)\" [attr.data-auto-id]=\"getDynamicAutoId('draft-edit-', item.DraftId)\">{{viewOrEdit}} Draft</a>\r\n                                        <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"emailDraft(item)\" [attr.data-auto-id]=\"getDynamicAutoId('draft-email-', item.DraftId)\">Email Draft</a>\r\n                                        <a class=\"dropdown-item\" href=\"javascript:void(0);\" (click)=\"printDraft(item)\" [attr.data-auto-id]=\"getDynamicAutoId('draft-print-ach-', item.DraftId)\">Print Draft</a>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </ng-template>\r\n                    </p-column>\r\n                    <p-column [style]=\"{'width':'4%'}\">\r\n                        <template pTemplate=\"header\">\r\n                            <input data-auto-id=\"global-draft-select-all\" type=\"checkbox\" [checked]=\"allSelected\" (change)=\"selectAll()\" />\r\n                        </template>\r\n                        <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                            <div class=\"align-center\">\r\n                                <input [attr.data-auto-id]=\"getDynamicAutoId('draft-select-', item.DraftId)\" type=\"checkbox\" [checked]=\"item.IsSelectedForAction\" (change)=\"selectedToggle(item)\" />\r\n                            </div>\r\n                        </ng-template>\r\n                    </p-column>\r\n                </p-dataTable>\r\n            </div>\r\n\r\n\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n";

/***/ }),

/***/ 1077:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1068);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./edit-draft-modal.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./edit-draft-modal.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1078:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1069);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./email-draft-modal.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./email-draft-modal.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1079:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1070);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./print-draft-modal.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./print-draft-modal.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1080:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1071);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/index.js!./global-search.component.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/index.js!./global-search.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1081:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1077);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1082:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1078);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1083:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1079);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1084:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1080);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1092:
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
var drafts_data_service_1 = __webpack_require__(385);
var counter_draft_model_1 = __webpack_require__(1105);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var confirm_modal_component_1 = __webpack_require__(383);
var growler_mediator_service_1 = __webpack_require__(35);
var multi_select_value_model_1 = __webpack_require__(389);
var counter_draft_component_1 = __webpack_require__(1093);
var office_model_1 = __webpack_require__(1144);
var CounterDraftListComponent = (function () {
    function CounterDraftListComponent(draftDataService, route, dialogService, growlerMediatorService) {
        this.draftDataService = draftDataService;
        this.route = route;
        this.dialogService = dialogService;
        this.growlerMediatorService = growlerMediatorService;
    }
    CounterDraftListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.shouldDisplayActive = true;
        this.selectedCounterDraft = undefined;
        this.sub = this.route.params.subscribe(function (params) {
            _this.customerId = +params['customerId'];
            if (_this.customerId !== 0) {
                _this.populateCounterDrafts(_this.customerId);
            }
        });
    };
    CounterDraftListComponent.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    ;
    CounterDraftListComponent.prototype.populateCounterDrafts = function (customerId) {
        var _this = this;
        if (customerId) {
            this.draftDataService.get(customerId.toString())
                .subscribe(function (results) {
                if (results && results.length > 0) {
                    _this.counterDrafts = results;
                    if (_this.shouldDisplayActive) {
                        _this.filteredCounterDrafts = _this.counterDrafts
                            .filter(function (item) { return item.IsActive; });
                    }
                    else {
                        _this.filteredCounterDrafts = _this.counterDrafts;
                    }
                    _this.applyMultiSelects();
                }
            });
        }
    };
    CounterDraftListComponent.prototype.applyMultiSelects = function () {
        var _this = this;
        this.statusMultiSelects = [];
        if (this.counterDrafts && this.counterDrafts.length > 0) {
            for (var i = 0; i < this.counterDrafts.length; i++) {
                if (this.statusMultiSelects.filter(function (e) { return e.value === _this.counterDrafts[i].StatusDescription; }).length === 0) {
                    this.statusMultiSelects.push(new multi_select_value_model_1.MultiSelectValue(this.counterDrafts[i].StatusDescription, this.counterDrafts[i].StatusDescription));
                }
            }
        }
    };
    CounterDraftListComponent.prototype.getDynamicAutoId = function (name, id) {
        return name + id;
    };
    CounterDraftListComponent.prototype.deleteCounterDraft = function (counterDraft) {
        var _this = this;
        this.draftDataService.deleteCounterDraft(counterDraft.CounterDraftId)
            .subscribe(function (status) {
            if (status) {
                _this.growlerMediatorService.growlSuccess('Success', 'Counter Draft has been deleted successfully');
                _this.populateCounterDrafts(_this.customerId);
            }
            else {
                _this.growlerMediatorService.growlError('Error', 'Counter Draft deletion failed');
            }
        }, function (err) {
            _this.growlerMediatorService.growlError('Error', 'Counter Draft deletion failed');
        });
    };
    CounterDraftListComponent.prototype.delete = function (counterDraft) {
        var _this = this;
        this.selectedCounterDraft = Object.assign({}, counterDraft);
        this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
            title: 'Confirm Delete',
            message: "Are you sure you want to delete counter drafts " + counterDraft.BeginningDraftNumber + " through " + counterDraft.EndingDraftNumber + "?",
            confirmText: 'Yes',
            cancelText: 'No'
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.deleteCounterDraft(counterDraft);
            }
            _this.selectedCounterDraft = undefined;
        });
    };
    CounterDraftListComponent.prototype.onStatusChanged = function (dt, event, col) {
        if (event && event.value && event.value.length > 0 && (event.value[0] === 'Deleted' || event.value[1] === 'Deleted')) {
            this.filteredCounterDrafts = this.counterDrafts;
            this.shouldDisplayActive = false;
        }
        dt.filter(event.value, col.field, col.filterMatchMode);
    };
    CounterDraftListComponent.prototype.addNew = function () {
        var _this = this;
        var counterDraft = new counter_draft_model_1.CounterDraft();
        counterDraft.Office = new office_model_1.Office();
        counterDraft.CounterDraftId = 0;
        counterDraft.Office.OfficeId = 0;
        this.dialogService.addDialog(counter_draft_component_1.CounterDraftComponent, {
            counterDraft: counterDraft,
            isAddNew: true,
            customerId: this.customerId
        }).subscribe(function (isConfirmed) {
            _this.populateCounterDrafts(_this.customerId);
        });
    };
    return CounterDraftListComponent;
}());
CounterDraftListComponent = __decorate([
    core_1.Component({
        selector: 'ta-counter-draft-list',
        template: __webpack_require__(1204),
        styles: [__webpack_require__(1278)]
    }),
    __metadata("design:paramtypes", [drafts_data_service_1.DraftsDataService,
        router_1.ActivatedRoute,
        ng2_bootstrap_modal_1.DialogService,
        growler_mediator_service_1.GrowlerMediatorService])
], CounterDraftListComponent);
exports.CounterDraftListComponent = CounterDraftListComponent;


/***/ }),

/***/ 1093:
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
var counter_draft_model_1 = __webpack_require__(1105);
var drafts_data_service_1 = __webpack_require__(385);
var growler_mediator_service_1 = __webpack_require__(35);
var customer_service_1 = __webpack_require__(54);
var accounts_data_service_1 = __webpack_require__(388);
var central_codes_data_service_1 = __webpack_require__(62);
var user_settings_data_service_1 = __webpack_require__(399);
var CounterDraftComponent = (function (_super) {
    __extends(CounterDraftComponent, _super);
    function CounterDraftComponent(dialogService, draftsDataService, growlerMediatorService, accountsDataService, customerService, centralCodesDataService, userSettingsDataService) {
        var _this = _super.call(this, dialogService) || this;
        _this.draftsDataService = draftsDataService;
        _this.growlerMediatorService = growlerMediatorService;
        _this.accountsDataService = accountsDataService;
        _this.customerService = customerService;
        _this.centralCodesDataService = centralCodesDataService;
        _this.userSettingsDataService = userSettingsDataService;
        _this.errorMessage = '';
        _this.regionMisMatchDesc = 'This account is outside of your region.  You can only order counter drafts for accounts in your region.';
        _this.endingDraftGreaterThanBeginningDesc = 'Ending Draft Number must be greater than or equal to beginning draft number. Please adjust either the beginning or ending draft number.';
        _this.greaterThanZeroDesc = 'Beginning and Ending draft numbers must be greater than zero. Please adjust the beginnning and ending draft numbers.';
        return _this;
    }
    CounterDraftComponent.prototype.ngOnInit = function () {
        this.populateEligibleAccounts();
        this.populateOffices();
        if (this.counterDraft.CounterDraftId === 0) {
            this.counterDraft = new counter_draft_model_1.CounterDraft();
            this.counterDraft.LASAccountNumber = 0;
            this.counterDraft.CustomerId = this.customerId;
        }
        this.officeHasBeenEdited = false;
        this.populateUserSetting();
    };
    CounterDraftComponent.prototype.populateEligibleAccounts = function () {
        var _this = this;
        this.accountsDataService.getCounterDraftEligibleAccounts(this.customerService.selectedCustomer.Id)
            .subscribe(function (results) {
            _this.eligibleAccounts = results;
        });
    };
    CounterDraftComponent.prototype.populateOffices = function () {
        var _this = this;
        this.centralCodesDataService.getOffices()
            .subscribe(function (results) {
            _this.officeList = results;
        });
    };
    CounterDraftComponent.prototype.populateUserSetting = function () {
        var _this = this;
        this.userSettingsDataService.getUserSettings()
            .subscribe(function (results) {
            _this.userSetting = results;
        });
    };
    CounterDraftComponent.prototype.filterEligibleAccounts = function () {
        var _this = this;
        return this.eligibleAccounts.filter(function (item) { return item.AccountNumber === _this.counterDraft.LASAccountNumber; });
    };
    CounterDraftComponent.prototype.submit = function () {
        var _this = this;
        this.errorMessage = '';
        this.accounts = this.filterEligibleAccounts();
        if (this.accounts && this.accounts.length > 0) {
            if (this.accounts[0].Office.RegionId !== this.userSetting.RegionId) {
                this.growlerMediatorService.growlError('Error', this.regionMisMatchDesc);
                this.errorMessage = this.regionMisMatchDesc;
            }
            else if (this.counterDraft.EndingDraftNumber < this.counterDraft.BeginningDraftNumber) {
                this.growlerMediatorService.growlError('Error', this.endingDraftGreaterThanBeginningDesc);
                this.errorMessage = this.endingDraftGreaterThanBeginningDesc;
            }
            else if (this.counterDraft.EndingDraftNumber <= 0 || this.counterDraft.BeginningDraftNumber <= 0) {
                this.growlerMediatorService.growlError('Error', this.greaterThanZeroDesc);
                this.errorMessage = this.greaterThanZeroDesc;
            }
            else {
                this.draftsDataService.insertCounterDraft(this.counterDraft)
                    .subscribe(function (ret) {
                    if (ret) {
                        _this.growlerMediatorService.growlSuccess('Success', 'Counter Draft successfully issued.');
                        _this.close();
                    }
                });
            }
        }
        else {
            this.growlerMediatorService.growlError('Error', 'Could not retrieve region for selected account.');
        }
    };
    CounterDraftComponent.prototype.controlValueChanged = function () {
        this.errorMessage = '';
    };
    CounterDraftComponent.prototype.officeSearch = function (event) {
        if (event.query && event.query.length > 0) {
            this.filteredOfficeList = this.officeList.filter(function (e) { return e.OfficeName.toLowerCase().includes(event.query.toLowerCase()); });
        }
        else {
            this.filteredOfficeList = this.officeList;
        }
    };
    CounterDraftComponent.prototype.validateSelectedOffice = function (event) {
        this.officeHasBeenEdited = true;
        if (this.counterDraft.Office === undefined || this.counterDraft.Office === null) {
            this.isOfficeValid = false;
            return;
        }
        var matches = this.officeList.filter(function (e) { return e.OfficeName.toLowerCase() === event.srcElement.value.toLowerCase(); }).length;
        if (event.srcElement.value && matches <= 0) {
            this.isOfficeValid = false;
            return;
        }
        if (matches === 1) {
            this.counterDraft.Office = this.officeList.find(function (e) { return e.OfficeName.toLowerCase() === event.srcElement.value.toLowerCase(); });
        }
        this.isOfficeValid = true;
    };
    CounterDraftComponent.prototype.officeSelected = function (event) {
        this.isOfficeValid = true;
    };
    CounterDraftComponent.prototype.handleDropdownClick = function (event) {
        var _this = this;
        this.filteredOfficeList = [];
        setTimeout(function () {
            _this.filteredOfficeList = _this.officeList;
        }, 100);
    };
    return CounterDraftComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
CounterDraftComponent = __decorate([
    core_1.Component({
        selector: 'ta-counter-draft',
        template: __webpack_require__(1205),
        styles: [__webpack_require__(1279)]
    }),
    __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService,
        drafts_data_service_1.DraftsDataService,
        growler_mediator_service_1.GrowlerMediatorService,
        accounts_data_service_1.AccountsDataService,
        customer_service_1.CustomerService,
        central_codes_data_service_1.CentralCodesDataService,
        user_settings_data_service_1.UserSettingsDataService])
], CounterDraftComponent);
exports.CounterDraftComponent = CounterDraftComponent;


/***/ }),

/***/ 1094:
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
var common_1 = __webpack_require__(4);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var draft_rejection_model_1 = __webpack_require__(1106);
var utilities_service_1 = __webpack_require__(1052);
var central_codes_data_service_1 = __webpack_require__(62);
var growler_mediator_service_1 = __webpack_require__(35);
var confirm_modal_component_1 = __webpack_require__(383);
var currency_format_pipe_1 = __webpack_require__(390);
var RejectDraftConfirmationComponent = (function (_super) {
    __extends(RejectDraftConfirmationComponent, _super);
    function RejectDraftConfirmationComponent(centralCodesDataService, dialogService, growlerMediatorService) {
        var _this = _super.call(this, dialogService) || this;
        _this.centralCodesDataService = centralCodesDataService;
        _this.dialogService = dialogService;
        _this.growlerMediatorService = growlerMediatorService;
        _this.utilities = new utilities_service_1.Utilities();
        _this.currencyPipe = new currency_format_pipe_1.CurrencyFormatPipe();
        _this.ng2CurrencyPipe = new common_1.CurrencyPipe('USD');
        return _this;
    }
    RejectDraftConfirmationComponent.prototype.ngOnInit = function () {
        this.initializeComponent();
    };
    RejectDraftConfirmationComponent.prototype.initializeComponent = function () {
        this.draftRejection = new draft_rejection_model_1.DraftRejection();
        this.draftRejectionReasonCodes = [];
        this.draftRejection.RejectReasonCode = this.utilities.defaultDropDownValue;
        this.draftRejection.Description = '';
        this.draftRejectionDescriptionVisible = false;
        this.getDraftRejectionReasonCodes();
    };
    RejectDraftConfirmationComponent.prototype.getDraftRejectionReasonCodes = function () {
        var _this = this;
        this.centralCodesDataService.getDraftRejectReasonCodes()
            .subscribe(function (ret) {
            if (ret && ret.length > 0) {
                _this.draftRejectionReasonCodes = ret;
            }
            else {
                _this.growlerMediatorService.growlError('Error', 'Error getting Draft Rejection Reason Codes');
            }
        }, function (err) {
            _this.growlerMediatorService.growlError('Error', 'Error getting Draft Rejection Reason Codes');
        });
    };
    RejectDraftConfirmationComponent.prototype.selectionChanged = function () {
        if (this.draftRejection.RejectReasonCode.Description.startsWith('Other')) {
            this.draftRejectionDescriptionVisible = true;
        }
        else {
            this.draftRejectionDescriptionVisible = false;
            this.draftRejection.Description = undefined;
        }
    };
    RejectDraftConfirmationComponent.prototype.submit = function () {
        var _this = this;
        this.dialogService.addDialog(confirm_modal_component_1.ConfirmModalComponent, {
            title: 'Confirm Reject',
            message: "Are you sure you want to reject draft " + this.draftNumber + " for " + this.currencyPipe.transform(this.ng2CurrencyPipe.transform(this.amount, 'USD', true, '')) + "?",
            confirmText: 'Yes',
            cancelText: 'No'
        }).subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.confirm();
            }
        });
    };
    RejectDraftConfirmationComponent.prototype.confirm = function () {
        this.result = this.draftRejection;
        this.close();
    };
    return RejectDraftConfirmationComponent;
}(ng2_bootstrap_modal_1.DialogComponent));
RejectDraftConfirmationComponent = __decorate([
    core_1.Component({
        selector: 'reject-draft-confirmation.component',
        template: __webpack_require__(1206),
        styles: [__webpack_require__(1280)]
    }),
    __metadata("design:paramtypes", [central_codes_data_service_1.CentralCodesDataService, ng2_bootstrap_modal_1.DialogService, growler_mediator_service_1.GrowlerMediatorService])
], RejectDraftConfirmationComponent);
exports.RejectDraftConfirmationComponent = RejectDraftConfirmationComponent;


/***/ }),

/***/ 1095:
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
var drafts_data_service_1 = __webpack_require__(385);
var growler_mediator_service_1 = __webpack_require__(35);
var draft_rejection_model_1 = __webpack_require__(1106);
var ng2_bootstrap_modal_1 = __webpack_require__(67);
var reject_draft_confirmation_component_1 = __webpack_require__(1094);
var RejectDraftTransactionComponent = (function () {
    function RejectDraftTransactionComponent(router, route, draftDataService, growlerMediatorService, dialogService) {
        this.router = router;
        this.route = route;
        this.draftDataService = draftDataService;
        this.growlerMediatorService = growlerMediatorService;
        this.dialogService = dialogService;
    }
    RejectDraftTransactionComponent.prototype.ngOnInit = function () {
        this.getRouteParams();
        this.initializeComponent();
    };
    RejectDraftTransactionComponent.prototype.getRouteParams = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.customerId = +params['customerId'];
            if (_this.customerId !== 0) {
                _this.getDraftTransactions(_this.customerId);
            }
        });
    };
    RejectDraftTransactionComponent.prototype.initializeComponent = function () {
        this.draftRejection = new draft_rejection_model_1.DraftRejection();
        this.selectedDraftTransaction = undefined;
    };
    RejectDraftTransactionComponent.prototype.getDraftTransactions = function (customerId) {
        var _this = this;
        this.draftDataService.getDraftTransactions(customerId)
            .subscribe(function (ret) {
            if (ret && ret.length > 0) {
                _this.draftTransactions = ret;
            }
            else {
                _this.growlerMediatorService.growlWarn('Warning', 'No Draft Data for Current Customer');
            }
        }, function (err) {
            _this.growlerMediatorService.growlError('Error', 'Error getting Draft Data');
        });
    };
    RejectDraftTransactionComponent.prototype.rejectDraftTransaction = function (draftRejection) {
        var _this = this;
        this.draftDataService.rejectDraftTransaction(draftRejection)
            .subscribe(function (ret) {
            _this.getDraftTransactions(_this.customerId);
        }, function (err) {
            _this.growlerMediatorService.growlError('Error', 'Error Rejecting Draft');
        });
    };
    RejectDraftTransactionComponent.prototype.openConfirmDelete = function (draftRow) {
        var _this = this;
        this.selectedDraftTransaction = Object.assign({}, draftRow);
        this.draftRejection.DraftId = draftRow.DraftId;
        this.dialogService.addDialog(reject_draft_confirmation_component_1.RejectDraftConfirmationComponent, ({
            draftNumber: draftRow.DraftNumber,
            amount: draftRow.Amount
        })).subscribe(function (result) {
            if (result && result.RejectReasonCode && result.RejectReasonCode.Id > 0) {
                _this.draftRejection.RejectReason = result.RejectReasonCode.Id;
                _this.draftRejection.Description = result.Description;
                _this.rejectDraftTransaction(_this.draftRejection);
            }
            if (result) {
                _this.growlerMediatorService.growlSuccess('Success', 'Draft Rejected Successfully');
            }
            _this.dialogService.removeAll();
            _this.selectedDraftTransaction = undefined;
        });
    };
    RejectDraftTransactionComponent.prototype.getDynamicAutoId = function (name, id) {
        return name + id;
    };
    return RejectDraftTransactionComponent;
}());
RejectDraftTransactionComponent = __decorate([
    core_1.Component({
        selector: 'reject-draft-transaction',
        template: __webpack_require__(1207),
        styles: [__webpack_require__(1281)]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        drafts_data_service_1.DraftsDataService,
        growler_mediator_service_1.GrowlerMediatorService,
        ng2_bootstrap_modal_1.DialogService])
], RejectDraftTransactionComponent);
exports.RejectDraftTransactionComponent = RejectDraftTransactionComponent;


/***/ }),

/***/ 1105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CounterDraft = (function () {
    function CounterDraft() {
    }
    return CounterDraft;
}());
exports.CounterDraft = CounterDraft;


/***/ }),

/***/ 1106:
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
Object.defineProperty(exports, "__esModule", { value: true });
var draft_transaction_model_1 = __webpack_require__(1142);
var DraftRejection = (function (_super) {
    __extends(DraftRejection, _super);
    function DraftRejection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DraftRejection;
}(draft_transaction_model_1.DraftTransaction));
exports.DraftRejection = DraftRejection;


/***/ }),

/***/ 1133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(13);
var counter_draft_list_component_1 = __webpack_require__(1092);
var global_search_component_1 = __webpack_require__(1059);
var reject_draft_transaction_component_1 = __webpack_require__(1095);
var routes = [
    { path: 'counterdraft', component: counter_draft_list_component_1.CounterDraftListComponent },
    { path: 'customerDraftSearch', component: global_search_component_1.GlobalDraftSearchComponent },
    { path: 'rejectDraft', component: reject_draft_transaction_component_1.RejectDraftTransactionComponent }
];
exports.draftRouting = router_1.RouterModule.forChild(routes);


/***/ }),

/***/ 1142:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DraftTransaction = (function () {
    function DraftTransaction() {
    }
    return DraftTransaction;
}());
exports.DraftTransaction = DraftTransaction;


/***/ }),

/***/ 1144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Office = (function () {
    function Office() {
    }
    return Office;
}());
exports.Office = Office;


/***/ }),

/***/ 1171:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1172:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "/*\r\n    Colors\r\n*/\n.counter-draft-modal {\n  margin-left: -30%;\n  margin-right: -30%; }\n\n.span-disabled {\n  background-color: #eceeef; }\n\n.ui-inputtext {\n  height: 100%;\n  width: 96%;\n  padding: 0.5rem 0.75rem;\n  border: none; }\n\n.ui-button {\n  color: #000000;\n  background-color: #ffffff;\n  width: 3% !important;\n  border: none;\n  float: right; }\n\n.ui-button:hover {\n  color: #000000 !important;\n  background-color: #ffffff !important;\n  border: none !important; }\n\n.ng-valid[required], .ng-valid.required {\n  border-left: 5px solid #42A948;\n  /* green */ }\n\n.ng-invalid:not(form) {\n  border-left: 5px solid #a94442;\n  /* red */ }\n\np-autocomplete.ng-invalid {\n  border-left: 0 none; }\n\np-autocomplete.ng-dirty.ng-invalid > .ui-autocomplete > .ui-inputtext,\np-autocomplete.ng-invalid > .ui-autocomplete > .ui-inputtext[required] {\n  border-left: 5px solid #a94442;\n  /* red */\n  border-bottom: 1px solid #d6d6d6;\n  /* Theme specific */ }\n\np-autocomplete.ng-valid[required] > .ui-autocomplete > .ui-inputtext,\np-autocomplete.ng-valid.required > .ui-autocomplete > .ui-inputtext,\np-autocomplete.ng-valid > .ui-autocomplete > .ui-inputtext[required] {\n  border-left: 5px solid #42A948;\n  /* green */ }\n\np-autocomplete > .ui-autocomplete > .ui-inputtext {\n  padding: 6px 12px; }\n", ""]);

// exports


/***/ }),

/***/ 1173:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "/*\r\n    Colors\r\n*/\n.reject-draft-delete-confirm-modal {\n  margin-left: -30%;\n  margin-right: -30%; }\n\n.span-disabled {\n  background-color: #eceeef; }\n", ""]);

// exports


/***/ }),

/***/ 1174:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(11)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 1204:
/***/ (function(module, exports) {

module.exports = "<div class=\"ta-container\">\r\n    <div class=\"row no-gutters\">\r\n        <h2>Counter Drafts</h2>\r\n        <br />\r\n\r\n        <div class=\"col-md-12\">\r\n\r\n            <div class=\"btn-group pull-right separator-bottom\" role=\"group\">\r\n                <button type=\"button\" class=\"ta-primary-button btn-sm\" (click)=\"addNew()\" data-auto-id='counter-draft-issue-new'>\r\n                    <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\r\n                    Issue New\r\n                </button>\r\n            </div>\r\n            <p-dataTable data-auto-id='counter-draft-table' [value]=\"filteredCounterDrafts\" sortField=\"AccountNumberDisplay\" [(selection)] =\"selectedCounterDraft\" selectionMode=\"single\" dataKey=\"CounterDraftId\" sortOrder=\"1\" [rows]=\"10\" [paginator]=\"true\" [globalFilter]=\"gb\" #dt>\r\n\r\n                <p-column field=\"Office.OfficeName\" header=\"Office\" [filter]=\"false\" filterMatchMode=\"equals\" [style]=\"{'overflow':'visible'}\" data-auto-id='counter-draft-officeName'\r\n                          [sortable]=\"true\">\r\n                </p-column>\r\n\r\n                <p-column field=\"LASAccountNumber\" header=\"Account Number\" [filter]=\"false\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\" sortOrder=\"1\" data-auto-id='counter-draft-account-number'>\r\n                </p-column>\r\n\r\n                <p-column field=\"BeginningDraftNumber\" header=\"Beginning Draft Number\" [filter]=\"false\" filterMatchMode=\"in\" [style]=\"{'width':'15%'}\" [sortable]=\"true\" data-auto-id='counter-draft-beginning-draft-number'>\r\n\r\n                </p-column>\r\n\r\n                <p-column field=\"EndingDraftNumber\" header=\"Ending Draft Number\" [filter]=\"false\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\" data-auto-id='counter-draft-ending-draft-number'>\r\n\r\n                </p-column>\r\n\r\n\r\n                <p-column field=\"StatusDescription\" header=\"Status\" [filter]=\"true\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"true\" data-auto-id='counter-draft-status-description'>\r\n                    <ng-template pTemplate=\"filter\" let-col>\r\n                        <p-multiSelect data-auto-id=\"statusMultiSelects\" [options]=\"statusMultiSelects\" defaultLabel=\"Active\" (onChange)=\"onStatusChanged(dt, $event, col)\"\r\n                                       styleClass=\"ui-column-filter\"></p-multiSelect>\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n                <p-column field=\"PreparedBy\" header=\"Issued By\" [filter]=\"false\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"true\" data-auto-id='counter-draft-created-by'>\r\n\r\n                </p-column>\r\n\r\n                <p-column field=\"AuditInfo.CreatedOn\" header=\"Issued On\" [filter]=\"false\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"true\" sortOrder=\"-1\" data-auto-id='counter-draft-created-on'>\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.AuditInfo.CreatedOn | dateformat:'MM/DD/YYYY'}}\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n                <p-column [style]=\"{'overflow':'visible'}\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        <div class=\"btn-group\">\r\n                            <button type=\"button\" [disabled]=\"!item.IsActive\" class=\"btn btn-danger btn-sm\" (click)=\"delete(item)\" [attr.data-auto-id]=\"getDynamicAutoId('counter-draft-delete-', item.CounterDraftId)\">\r\n                                <i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>\r\n                                <span>Delete</span>\r\n                            </button>\r\n                        </div>\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n            </p-dataTable>\r\n\r\n        </div>\r\n    </div>\r\n\r\n</div>";

/***/ }),

/***/ 1205:
/***/ (function(module, exports) {

module.exports = "\r\n<div>\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content counter-draft-modal\">\r\n            <div class=\"modal-header\">\r\n                <h3 class=\"modal-title\">Issue Counter Drafts</h3>\r\n                <button type=\"button\" class=\"close\" (click)=\"close()\">&times;</button>\r\n            </div>\r\n            <div class=\"modal-body ModalContentText\">\r\n\r\n                <form (ngSubmit)=\"submit()\" class=\"form-horizontal\" #counterDraftForm=\"ngForm\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div [ngClass]=\"(accountNumber.pristine || accountNumber.valid)?'form-group':'has-danger'\">\r\n\r\n                                <div class=\"RequiredLabel\">\r\n                                    <label for=\"accountNumber\" class=\"form-control-label form-control-label-sm\">Account Number</label>\r\n                                </div>\r\n\r\n                                <select data-auto-id=\"counterDraft_input_AccountNumber\" class=\"form-control form-control-sm select-adjusted\" name=\"accountNumber\" id=\"accountNumber\"\r\n                                        [(ngModel)]=\"counterDraft.LASAccountNumber\" #accountNumber=\"ngModel\" required (change)=\"controlValueChanged()\">\r\n                                    <option disabled selected [value]=\"0\">Please select an Account</option>\r\n                                    <option *ngFor=\"let account of eligibleAccounts\" [ngValue]=\"account.AccountNumber\">{{account.AccountNumber}}</option>\r\n                                </select>\r\n\r\n                                <div class=\"form-control-feedback\" [hidden]=\"accountNumber.pristine || accountNumber.valid\">Account Number is required</div>\r\n\r\n                            </div>\r\n                            \r\n                            <!--<ta-form-group-validation [isRequired]=\"true\">\r\n\r\n                                <label for=\"office\" class=\"form-control-label form-control-label-sm\">Office</label>\r\n\r\n                                <p-autoComplete name=\"office\" #office [(ngModel)]=\"counterDraft.Office\" [minLength]=\"0\" styleClass=\"auto-complete-form-control form-control-sm select-adjusted\" [autoHighlight]=\"true\" required [suggestions]=\"filteredOfficeList\" (completeMethod)=\"officeSearch($event)\" (onBlur)=\"validateSelectedOffice($event)\" (onDropdownClick)=\"handleDropdownClick($event)\"\r\n                                                (onSelect)=\"officeSelected($event)\" [dropdown]=\"true\" field=\"OfficeName\" placeholder=\"Please select an office\">\r\n                                </p-autoComplete>\r\n\r\n                            </ta-form-group-validation>-->\r\n\r\n                            <div [ngClass]=\"(!officeHasBeenEdited || isOfficeValid)?'form-group':'has-danger'\">\r\n\r\n                                <div class=\"RequiredLabel\">\r\n                                    <label for=\"office\" class=\"form-control-label form-control-label-sm\">Office</label>\r\n                                </div>\r\n                                \r\n                                <p-autoComplete name=\"office\" #office [(ngModel)]=\"counterDraft.Office\" [minLength]=\"0\" styleClass=\"auto-complete-form-control form-control-sm select-adjusted\" [autoHighlight]=\"true\" required [suggestions]=\"filteredOfficeList\" (completeMethod)=\"officeSearch($event)\" (onBlur)=\"validateSelectedOffice($event)\" (onDropdownClick)=\"handleDropdownClick($event)\"\r\n                                                (onSelect)=\"officeSelected($event)\"[dropdown]=\"true\" field=\"OfficeName\" placeholder=\"Please select an office\">\r\n                                </p-autoComplete>\r\n                                <div class=\"form-control-feedback\" [hidden]=\"!officeHasBeenEdited || isOfficeValid\">Office Name is required</div>\r\n\r\n                            </div>\r\n\r\n                            <div [ngClass]=\"(BeginningDraftNumber.pristine || BeginningDraftNumber.valid)?'form-group':'has-danger'\">\r\n                                <div class=\"RequiredLabel\">\r\n                                    <label for=\"BeginningDraftNumber\" class=\"form-control-label form-control-label-sm\">Beginning Draft Number</label>\r\n                                </div>\r\n\r\n                                <input data-auto-id=\"counterDraft_input_BeginningDraftNumber\" class=\"form-control form-control-sm\" type=\"number\" name=\"BeginningDraftNumber\" id=\"BeginningDraftNumber\" [(ngModel)]=\"counterDraft.BeginningDraftNumber\"\r\n                                       #BeginningDraftNumber=\"ngModel\" required (change)=\"controlValueChanged()\"/>\r\n                                <div class=\"form-control-feedback\" [hidden]=\"BeginningDraftNumber.pristine || BeginningDraftNumber.valid\">Beginning Draft Number is required</div>\r\n\r\n                            </div>\r\n                            <div [ngClass]=\"(EndingDraftNumber.pristine || EndingDraftNumber.valid)?'form-group':'has-danger'\">\r\n                                <div class=\"RequiredLabel\">\r\n                                    <label for=\"EndingDraftNumber\" class=\"form-control-label form-control-label-sm\">Ending Draft Number</label>\r\n                                </div>\r\n\r\n                                <input data-auto-id=\"counterDraft_input_EndingDraftNumber\" class=\"form-control form-control-sm\" type=\"number\" name=\"EndingDraftNumber\" id=\"EndingDraftNumber\" [(ngModel)]=\"counterDraft.EndingDraftNumber\"\r\n                                       #EndingDraftNumber=\"ngModel\" required (change)=\"controlValueChanged()\"/>\r\n                                <div class=\"form-control-feedback\" [hidden]=\"EndingDraftNumber.pristine || EndingDraftNumber.valid\">Ending Draft Number is required</div>\r\n                            </div>\r\n\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group\" [ngClass]=\"(!errorMessage)?'form-group':'has-danger'\">\r\n\r\n                                <div class=\"form-control-feedback\" [hidden]=\"!errorMessage\">{{errorMessage}}</div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"pull-right\">\r\n                                    <button data-auto-id=\"counterDraft_button_cancel\" type=\"button\" class=\"btn pull-right\" (click)=\"close()\">Cancel</button>&nbsp;&nbsp;\r\n                                    <button data-auto-id=\"counterDraft_button_clear\" type=\"button\" class=\"ta-primary-button\" (click)=\"counterDraftForm.reset()\">Clear</button>&nbsp;&nbsp;\r\n                                    <button data-auto-id=\"counterDraft_button_submit\" type=\"submit\" class=\"btn btn-success\" [disabled]=\"counterDraftForm.pristine || !counterDraftForm.valid || !isOfficeValid\">Save</button>&nbsp;&nbsp;\r\n\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n";

/***/ }),

/***/ 1206:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content reject-draft-delete-confirm-modal\">\r\n            <div class=\"modal-header\">\r\n                <h3 class=\"modal-title\">Confirm Reject</h3>\r\n                <button type=\"button\" class=\"close\">&times;</button>\r\n            </div>\r\n            <div class=\"modal-body ModalContentText\">\r\n                <form (ngSubmit)=\"submit()\" class=\"form-horizontal\" #rejectDraftForm=\"ngForm\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group\">\r\n                                <select data-auto-id=\"reason_codes_dropdown\" class=\"form-control form-control-label-sm\" required name=\"reasonCodes\" id=\"reasonCodes\" [(ngModel)]=\"draftRejection.RejectReasonCode\" (change)=\"selectionChanged()\"\r\n                                        #reasonCodes=\"ngModel\" placeholder>\r\n                                    <option disabled selected [value]=\"utilities.defaultDropDownValue\">Please select a reject reason</option>\r\n                                    <option *ngFor=\"let code of draftRejectionReasonCodes\" [ngValue]=\"code\">{{code.Description}}</option>\r\n                                </select>\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group\" *ngIf=\"draftRejectionDescriptionVisible\">\r\n                                <label for=\"draftRejectionDescription\" class=\"form-control-label form-control-label-sm\">Description</label>\r\n                                <input data-auto-id=\"draftRejectionDescription\" required class=\"form-control form-control-sm\" type=\"text\" name=\"draftRejectionDescription\" id=\"draftRejectionDescription\" [(ngModel)]=\"draftRejection.Description\" #draftRejectionDescription=\"ngModel\" />\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"pull-right\">\r\n                                    <button data-auto-id=\"rejectDraft_button_cancel\" type=\"button\" class=\"btn pull-right\" (click)=\"close()\">Cancel</button>&nbsp;&nbsp;\r\n                                    <button data-auto-id=\"rejectDraft_button_confirm\" type=\"button\" class=\"ta-primary-button\" (click)=\"submit()\" [disabled]=\"rejectDraftForm.pristine || !rejectDraftForm.valid\">Save</button>&nbsp;&nbsp;\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 1207:
/***/ (function(module, exports) {

module.exports = "<div class=\"ta-container\">\r\n    <div class=\"row no-gutters\">\r\n        <h2>Reject Draft</h2>\r\n        <br />\r\n    </div>\r\n    <div class=\"row no-gutters\">\r\n        <p class=\"text-danger\">All rejections need to be processed by 1 pm CST. Please contact Cash Management for any questions.</p>\r\n\r\n        <div class=\"col-md-12\">\r\n\r\n            <p-dataTable id=\"draftRejectiontable\" sortField=\"TransactionDate\" sortOrder=\"1\" [(selection)] =\"selectedDraftTransaction\" selectionMode=\"single\" dataKey=\"DraftId\" [value]=\"draftTransactions\" [rows]=\"10\" [paginator]=\"true\" [globalFilter]=\"gb\" #dt>\r\n\r\n                <p-column field=\"Account\" header=\"Account\" [filter]=\"false\" [style]=\"{'overflow':'visible'}\"\r\n                          [sortable]=\"true\">\r\n                </p-column>\r\n                <p-column field=\"Purpose\" header=\"Type\" [filter]=\"false\" [sortable]=\"true\" sortOrder=\"1\" filterMatchMode=\"in\" [style]=\"{'overflow':'visible'}\"\r\n                          data-auto-id='account-type'>\r\n                </p-column>\r\n\r\n                <p-column field=\"Amount\" header=\"Amount\" [filter]=\"false\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.Amount | currency:'USD':true | currencyformat}}\r\n                    </ng-template>\r\n\r\n                </p-column>\r\n\r\n                <p-column header=\"Draft Number\" field=\"DraftNumber\" [filter]=\"false\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.DraftNumber}}\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n                <p-column field=\"TransactionDate\" header=\"Transaction Date\" [filter]=\"false\" [style]=\"{'overflow':'visible'}\" [sortable]=\"true\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        {{item.TransactionDate | dateformat:'MM/DD/YYYY'}}\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n                <p-column [style]=\"{'overflow':'visible'}\">\r\n                    <ng-template pTemplate=\"body\" let-item=\"rowData\">\r\n                        <div class=\"btn-group\">\r\n                            <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"openConfirmDelete(item)\" [attr.data-auto-id]=\"getDynamicAutoId('draft-confirm-delete-', item.DraftId)\">\r\n                                <span>Reject</span>\r\n                            </button>\r\n                        </div>\r\n                    </ng-template>\r\n                </p-column>\r\n\r\n            </p-dataTable>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ 1246:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1171);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/index.js!./counter-draft-list.component.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/sass-loader/index.js!./counter-draft-list.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1247:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1172);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./counter-draft.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./counter-draft.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1248:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1173);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./reject-draft-confirmation.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./reject-draft-confirmation.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1249:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1174);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./reject-draft-transaction.component.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/index.js!./reject-draft-transaction.component.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1278:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1246);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1279:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1247);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1280:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1248);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ 1281:
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(1249);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ })

});
//# sourceMappingURL=2.b116914cb760cd4ea805.chunk.js.map