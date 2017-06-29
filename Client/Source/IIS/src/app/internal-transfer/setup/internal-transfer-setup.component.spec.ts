import { GenericDropDownModel } from './../../shared/models/generic-dropdown-model';
import { MonthlySchedule } from './../../shared/models/monthly-schedule.model';
import { RecurringSchedule } from './../../shared/models/recurring-schedule.model';
import { Utilities } from './../../shared/utilities.service';
import { InternalTransferDataService } from './../../core/services/internal-transfer/internal-transfer-data.service';
import { SchedulerContainer } from './../../shared/models/scheduler-container.model';
import { Observable } from 'rxjs';
import { CentralCodesDataService } from './../../core/services/central-codes-data.service';
import { GrowlerMediatorService } from './../../core/services/mediators/growler-mediator.service';
import { AchDataService } from './../../core/services/ach/ach-data.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { InternalTransferSetupComponent } from './internal-transfer-setup.component';
import { CustomerService } from "../../core/services/customer.service";
import { Customer } from "../../shared/models/customer.model";
import { Account } from "../../shared/models/account.model";
import { MockCustomerService } from "../../tests/mocks/mock-customer.service";
import { ScheduleType } from "../../shared/models/schedule-type.model";
import { FormattedSchedule } from "../../shared/models/formatted-schedule.model";
import { InternalTransferTransactionTemplate } from "../../shared/models/internal-transfer/internal-transfer-transaction-template.model";

describe('Internal Transfer Setup component', () => {
    let selectedCustomer = new Customer();
    const account1 = new Account();
    selectedCustomer.AccountNumbers = [account1];

    const howToApplyOptions: GenericDropDownModel[] = [new GenericDropDownModel(), new GenericDropDownModel(), new GenericDropDownModel()];

    let routerMock: any = jasmine.createSpyObj('router', ['navigate']);
    let dialogServiceMock: any = jasmine.createSpyObj('dialogService', ['addDialog']);
    let achDataServiceMock: any = jasmine.createSpyObj('achDataService', ['getProcessingDates']);
    let growlerMediatorServiceMock: any = jasmine.createSpyObj('growler', ['growlError', 'growlSuccess']);
    let customerServiceMock: any = { selectedCustomer };
    let centralCodesDataServiceMock: any = jasmine.createSpyObj('centralCodesDataService', ['getHowToApplyList', 'getOtherFees']);
    let internalTransferDataServiceMock: any = jasmine.createSpyObj('internalTransferService', ['isForm2279Needed', 'submitInternalTransfer']);
    let internalTransferServiceMock: any = { copiedTransfer: undefined };

    function createInternalTransferSetupComponent() {
        const internalTransferComponent = new InternalTransferSetupComponent(dialogServiceMock, achDataServiceMock, growlerMediatorServiceMock,
            customerServiceMock, centralCodesDataServiceMock, internalTransferDataServiceMock, routerMock, internalTransferServiceMock);

        internalTransferComponent.initializeObjects();

        return internalTransferComponent;
    }

    beforeEach(() => {
        centralCodesDataServiceMock.getHowToApplyList.and.returnValue(Observable.of(GenericDropDownModel));
        centralCodesDataServiceMock.getOtherFees.and.returnValue(Observable.of(GenericDropDownModel));
        customerServiceMock = { selectedCustomer };
        growlerMediatorServiceMock.growlError.calls.reset();
    });

    describe('initializeObjects', () => {
        it('should initialize utlities', () => {
            internalTransferServiceMock.copiedTransfer = undefined;
            const comp = createInternalTransferSetupComponent();

            expect(comp.utilities).toBeDefined();
        });
    });

    describe('initializeForNewTransfer', () => {
        it('should set isEdit to false', () => {
            const comp = createInternalTransferSetupComponent();

            expect(comp.isEdit).toBe(false);
        });

        it('should initialize the transferObject', () => {
            const comp = createInternalTransferSetupComponent();

            const result = comp.transferObject;

            expect(result.IsActive).toBe(true);
            expect(result.AuditInfo).toBeDefined();
        });

        it('should set the FromCustomer to currently selected customer', () => {
            const expected = customerServiceMock.selectedCustomer;

            const comp = createInternalTransferSetupComponent();

            const result = comp.transferObject.FromCustomer;

            expect(result).toBe(expected);
        });

        it('should initialize the dropdown default values', () => {
            const expected = new Utilities().defaultDropDownValue;

            const comp = createInternalTransferSetupComponent();

            expect(comp.transferObject.FromAccount).toBe(expected);
            expect(comp.transferObject.ToAccount).toBe(expected);
            expect(comp.transferObject.HowToApply).toBe(expected);
        });

        it('should growl when there are no accounts for the current customer', () => {
            const noAccounts = new Customer();
            noAccounts.AccountNumbers = [];
            customerServiceMock = { selectedCustomer: noAccounts };

            createInternalTransferSetupComponent();

            expect(growlerMediatorServiceMock.growlError).toHaveBeenCalledTimes(1);
        });
    });

    describe('initializeForEditTransfer', () => {
        const copiedTransfer = new InternalTransferTransactionTemplate();
        const customer = new Customer();

        beforeEach(() => {
            customer.AccountNumbers = [];
            copiedTransfer.FromCustomer = customer;
            copiedTransfer.ToCustomer = customer;
            copiedTransfer.HowToApply = new GenericDropDownModel();
            copiedTransfer.HowToApply.Id = 1;
            copiedTransfer.HowToApply.Description = "Some Desc"
            copiedTransfer.Schedule = new SchedulerContainer();
            internalTransferServiceMock.copiedTransfer = copiedTransfer;
        });

        it('should set isEdit to true', () => {
            const comp = createInternalTransferSetupComponent();

            expect(comp.isEdit).toBe(true);
        });

        it('should set the transfer object to the copiedTransfer from internalTransferService', () => {
            const comp = createInternalTransferSetupComponent();

            expect(comp.transferObject).toBe(copiedTransfer);
        });

        afterAll(() => {
            internalTransferServiceMock.copiedTransfer = undefined;
        })
    });

    describe('chooseFromCustomer', () => {
        let chosenCustomer: Customer;

        beforeEach(() => {
            chosenCustomer = new Customer();
            chosenCustomer.AccountNumbers = [new Account()];
            dialogServiceMock.addDialog.and.returnValue(Observable.of(chosenCustomer));
        })

        it('should assign the chosen customer', () => {
            const comp = createInternalTransferSetupComponent();

            comp.chooseFromCustomer();

            expect(comp.transferObject.FromCustomer).toBe(chosenCustomer);
        });

        it('should assign the chosen customer as the selected customer', () => {
            const comp = createInternalTransferSetupComponent();

            comp.chooseFromCustomer();

            expect(customerServiceMock.selectedCustomer).toBe(chosenCustomer);
        });

        it('should assign FromAccount to be the default dropdown value', () => {
            const comp = createInternalTransferSetupComponent();

            comp.chooseFromCustomer();

            expect(comp.transferObject.FromAccount).toBe(new Utilities().defaultDropDownValue);
        });

        it('should growl if the chosen customer doesn\'t have any accounts', () => {
            const comp = createInternalTransferSetupComponent();
            chosenCustomer.AccountNumbers = [];

            comp.chooseFromCustomer();

            expect(growlerMediatorServiceMock.growlError).toHaveBeenCalledTimes(1);
        });

        it('should not assign customer if the modal is canceled', () => {
            const originalCustomer = new Customer();
            originalCustomer.Id = 1;
            originalCustomer.AccountNumbers = [];
            customerServiceMock = { selectedCustomer: originalCustomer };

            const comp = createInternalTransferSetupComponent();
            expect(comp.transferObject.FromCustomer).toEqual(originalCustomer);

            dialogServiceMock.addDialog.and.returnValue(Observable.of(undefined));

            comp.chooseFromCustomer();

            expect(comp.transferObject.FromCustomer).toEqual(originalCustomer);
        });

        it('should assign the toCustomer if sameCustomer is true', () => {
            const expected = new Customer();
            expected.Cif = '12345';
            expected.AccountNumbers = []

            const comp = createInternalTransferSetupComponent();
            dialogServiceMock.addDialog.and.returnValue(Observable.of(expected));
            comp.sameCustomer = true;

            comp.chooseFromCustomer();

            expect(comp.transferObject.ToCustomer).toBe(expected);
        });
    });

    describe('chooseToCustomer', () => {
        let chosenCustomer: Customer;

        beforeEach(() => {
            chosenCustomer = new Customer();
            chosenCustomer.AccountNumbers = [new Account()];
            dialogServiceMock.addDialog.and.returnValue(Observable.of(chosenCustomer));
        })

        it('should assign the chosen customer', () => {
            const comp = createInternalTransferSetupComponent();

            comp.chooseToCustomer();

            expect(comp.transferObject.ToCustomer).toBe(chosenCustomer);
        });

        it('should assign ToAccount to be the default dropdown value', () => {
            const comp = createInternalTransferSetupComponent();

            comp.chooseToCustomer();

            expect(comp.transferObject.ToAccount).toBe(new Utilities().defaultDropDownValue);
        });

        it('should growl if the chosen customer doesn\'t have any accounts', () => {
            const comp = createInternalTransferSetupComponent();
            chosenCustomer.AccountNumbers = [];

            comp.chooseToCustomer();

            expect(growlerMediatorServiceMock.growlError).toHaveBeenCalledTimes(1);
        });

        it('should not assign customer if the modal is canceled', () => {
            const comp = createInternalTransferSetupComponent();

            comp.transferObject.ToCustomer = undefined;
            dialogServiceMock.addDialog.and.returnValue(Observable.of(undefined));

            comp.chooseToCustomer();

            expect(comp.transferObject.ToCustomer).toBeUndefined();
        });
    });

    describe('howToApplyChanged', () => {
        it('should set the Amount to the Scheduled Amount on the To Account', () => {
            const comp = createInternalTransferSetupComponent();
            comp.transferObject.HowToApply = new GenericDropDownModel();
            comp.transferObject.HowToApply.Description = 'Scheduled Payment';
            comp.transferObject.ToAccount = new Account();
            comp.transferObject.ToAccount.ScheduledPaymentAmount = 100;

            comp.howToApplyChanged();

            expect(comp.transferObject.Amount).toBe('100');
        });
    });

    describe('openScheduler', () => {
        const dates: string[] = ['some', 'processing', 'dates'];

        function createComponent() {
            const comp = createInternalTransferSetupComponent();
            comp.transferObject.FromAccount = new Account();
            comp.transferObject.FromAccount.AccountId = 1;
            comp.transferObject.ToCustomer = new Customer();
            comp.transferObject.ToCustomer.Id = 2;
            comp.transferObject.ToAccount = new Account();
            comp.transferObject.ToAccount.AccountId = 2;

            const formRef: any = {
                form: {
                    markAsDirty: () => { }
                }
            }
            comp.internalTransferForm = formRef;
            return comp;
        }

        function createTestSchedule() {
            let testSchedule: SchedulerContainer;
            testSchedule = new SchedulerContainer();
            testSchedule.Frequency = 'once';
            testSchedule.OneTimePaymentDate = 'testDate';
            testSchedule.FirstPaymentDate = '1/1/2017';
            testSchedule.EndPaymentDate = '1/31/2017';
            testSchedule.NextPaymentDates = ['1/3/2017', '1/5/2017'];
            return testSchedule;
        }

        beforeEach(() => {
            internalTransferDataServiceMock.isForm2279Needed.and.returnValue(Observable.of(true));
            achDataServiceMock.getProcessingDates.and.returnValue(Observable.of(dates));
        });

        it('should set transferObject.Schedule equal to scheduler returned from modal', () => {
            const testSchedule = createTestSchedule();
            dialogServiceMock.addDialog.and.returnValue(Observable.of(testSchedule));

            const formattedSchedule: FormattedSchedule = {
                firstPaymentDate: '1/1/2017',
                endPaymentDate: '1/31/2017',
                nextPaymentDates: ['1/2/2017', '1/3/2017']
            };

            const comp = createComponent();
            comp.openScheduler();

            expect(comp.transferObject.Schedule).toEqual(testSchedule);
        });

        it('should not change transferObject.Schedule', () => {
            const expected = new SchedulerContainer();
            expected.Frequency = 'once';
            dialogServiceMock.addDialog.and.returnValue(Observable.of(undefined));

            const comp = createComponent();
            comp.transferObject.Schedule = expected;
            comp.openScheduler();

            expect(comp.transferObject.Schedule).toEqual(expected);
        });

        it('should set the form to dirty', () => {
            const testSchedule = createTestSchedule();
            dialogServiceMock.addDialog.and.returnValue(Observable.of(testSchedule));

            const comp = createComponent();
            spyOn(comp.internalTransferForm.form, 'markAsDirty');
            comp.openScheduler();

            expect(comp.internalTransferForm.form.markAsDirty).toHaveBeenCalledTimes(1);
        });
    });

    describe('getScheduleType', () => {
        let result: ScheduleType;
        let comp: InternalTransferSetupComponent;
        let scheduler: SchedulerContainer;

        beforeEach(() => {
            comp = createInternalTransferSetupComponent();
            scheduler = new SchedulerContainer();
        })

        it('should none when the scheduler is null or undefined', () => {
            result = comp.getScheduleType(undefined);
            expect(result).toBe(ScheduleType.None);

            result = comp.getScheduleType(null);
            expect(result).toBe(ScheduleType.None);
        });

        it('should return OneTime when the frequency is \'once\'', () => {
            scheduler.Frequency = 'once';

            result = comp.getScheduleType(scheduler);
            expect(result).toBe(ScheduleType.OneTime);
        });

        it('should return Weekly when the frequency is \'weekly\'', () => {
            scheduler.Frequency = 'recurring';
            scheduler.RecurringSchedule = new RecurringSchedule();
            scheduler.RecurringSchedule.Frequency = 'weekly';

            result = comp.getScheduleType(scheduler);
            expect(result).toBe(ScheduleType.Weekly);
        });

        it('should return CalendarDays when the frequency is monthly and recurby is calendarDay', () => {
            scheduler.Frequency = 'recurring';
            scheduler.RecurringSchedule = new RecurringSchedule();
            scheduler.RecurringSchedule.Frequency = 'monthly';
            scheduler.RecurringSchedule.MonthlySchedule = new MonthlySchedule();
            scheduler.RecurringSchedule.MonthlySchedule.RecurBy = 'calendarDay';

            result = comp.getScheduleType(scheduler);
            expect(result).toBe(ScheduleType.MonthlyCalendarDays);
        });

        it('should return monthly days of the week when the frequency is monthly and recurby is daysOfWeek', () => {
            scheduler.Frequency = 'recurring';
            scheduler.RecurringSchedule = new RecurringSchedule();
            scheduler.RecurringSchedule.Frequency = 'monthly';
            scheduler.RecurringSchedule.MonthlySchedule = new MonthlySchedule();
            scheduler.RecurringSchedule.MonthlySchedule.RecurBy = 'daysOfWeek';

            result = comp.getScheduleType(scheduler);
            expect(result).toBe(ScheduleType.MonthlyDaysOfWeek);
        });
    })

    describe('isForm2279Required', () => {
        it('should set formRequired to result of service call', () => {
            internalTransferDataServiceMock.isForm2279Needed.and.returnValue(Observable.of(true));
            const comp = createInternalTransferSetupComponent();

            comp.transferObject.FromCustomer.Id = 1;
            comp.transferObject.FromAccount = new Account();
            comp.transferObject.FromAccount.AccountId = 123;
            comp.transferObject.ToCustomer = new Customer();
            comp.transferObject.ToCustomer.Id = 1;
            comp.transferObject.ToAccount = new Account();
            comp.transferObject.ToAccount.AccountId = 123;

            comp.isForm2279Required(ScheduleType.None);

            expect(comp.formRequired).toBe(true);
        });
    });

    describe('toggleSameCustomer', () => {
        it('should set toCustomer to fromCustomer and set sameCustomer to true', () => {
            const expected = new Customer();
            expected.Cif = '12345';

            const comp = createInternalTransferSetupComponent();

            comp.transferObject.FromCustomer = expected;

            comp.sameCustomer = false;
            comp.toggleSameCustomer();

            expect(comp.transferObject.ToCustomer).toBe(expected);
            expect(comp.sameCustomer).toBe(true);
        });

        it('should set sameCustomer to true', () => {
            const comp = createInternalTransferSetupComponent();

            comp.sameCustomer = true;
            comp.toggleSameCustomer();

            expect(comp.sameCustomer).toBe(false);
        });
    });

    describe('isFormValid', () => {
        it('should return false when the ToAccount has a prepayment restriction and the excess amount exceeds $250', () => {
            const comp = createInternalTransferSetupComponent();

            comp.internalTransferForm = <any>{ invalid: true };
            comp.transferObject.FromAccount = new Account();
            comp.transferObject.ToAccount = new Account();
            comp.transferObject.ToAccount.PrePayRestriction = '1';
            comp.transferObject.ExcessAmount = '10000';

            const result = comp.isFormValid();

            expect(result).toBe(false);
        });

        it('should return true', () => {
            const comp = createInternalTransferSetupComponent();
            comp.internalTransferForm = <any>{ invalid: false };
            comp.transferObject.FromAccount = new Account();
            comp.transferObject.FromAccount.AccountId = 12345;
            comp.transferObject.ToAccount = new Account();
            comp.transferObject.FromAccount.AccountId = 67890;
            comp.transferObject.ToAccount.PrePayRestriction = '0';
            comp.transferObject.Schedule = new SchedulerContainer();

            const result = comp.isFormValid();

            expect(result).toBe(true);
        });
    });

    describe('submit', () => {
        it('should route to the internal transfer list page on success', () => {
            const selectedCustomer = new Customer();
            selectedCustomer.AccountNumbers = [];
            selectedCustomer.Id = 1234;
            customerServiceMock = { selectedCustomer };
            internalTransferDataServiceMock.submitInternalTransfer.and.returnValue(Observable.of(true));
            dialogServiceMock.addDialog.and.returnValue(Observable.of(true));

            const comp = createInternalTransferSetupComponent();
            comp.internalTransferForm = <any>{ invalid: false };
            spyOn(comp, 'isFormValid').and.returnValue(true);

            comp.submit();

            expect(routerMock.navigate).toHaveBeenCalledWith([`customer/${selectedCustomer.Id}/internalTransfer/list`]);
        });
    });
});