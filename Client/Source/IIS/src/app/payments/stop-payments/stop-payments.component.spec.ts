import { StopPayment } from './../../shared/models/payments/stop-payment.model';
import { Account } from './../../shared/models/account.model';
import { MockPaymentDataService } from './../../tests/mocks/mock-payment-data.service';
import { PaymentDataService } from './../../core/services/payment/payment-data.service';
import { MockGrowlerMediatorService } from './../../tests/mocks/mock-growler-mediator-service';
import { GrowlerMediatorService } from './../../core/services/mediators/growler-mediator.service';
import { MockDialogService } from './../../tests/mocks/mock-dialog-service';
import { DialogService } from 'ng2-bootstrap-modal';
import { MockAccountsDataService } from './../../tests/mocks/mock-accounts-data.service';
import { AccountsDataService } from './../../core/services/accounts-data.service';
import { DateFormatPipe } from './../../shared/pipes/date-format.pipe';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { StopPaymentsComponent } from './stop-payments.component';

describe('StopPaymentsComponent', () => {
  let comp: StopPaymentsComponent;
  let fixture: ComponentFixture<StopPaymentsComponent>;
  let element: HTMLElement;
  let debugEl: DebugElement;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [StopPaymentsComponent, DateFormatPipe],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(StopPaymentsComponent, {
      set: {
        providers: [
          { provide: DialogService, useClass: MockDialogService }
          , { provide: AccountsDataService, useClass: MockAccountsDataService }
          , { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
          , { provide: PaymentDataService, useClass: MockPaymentDataService }]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopPaymentsComponent);
    comp = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;

  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  describe('getAccounts method', () => {
    it('should populate accounts', () => {
      comp.getAccounts(1);
      expect(comp.accounts.length > 0).toBeTruthy();
    });

  });

  describe('getStopPayment method', () => {
    it('should populate accounts', () => {
      comp.getStopPayment(1);
      expect(comp.stopPaymentsList.length > 0).toBeTruthy();
      expect(comp.isRegionalCustomer === true).toBeTruthy();
    });
  });

  describe('checkIfCustomerIsRegional method', () => {
    it('should set is regional customer', () => {
      let stopPaymentMockList: StopPayment[] = [];
      let stopPayment = new StopPayment();
      stopPayment.IsRegionalAccount = false;
      stopPaymentMockList.push(stopPayment);
      comp.stopPaymentsList = stopPaymentMockList;
      comp.checkIfCustomerIsRegional();
      expect(comp.isRegionalCustomer === false).toBeTruthy();
    });
  });
});