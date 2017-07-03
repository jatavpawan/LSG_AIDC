import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerCanActivateGuard } from "./customer-can-activate.guard";
import { Customer } from "../../shared/models/customer.model";


describe('CustomerCanActivate Guard', () => {
    const selectedCustomer = new Customer();
    selectedCustomer.Id = 1;

    const customerServiceMock: any = { };
    const routerMock = jasmine.createSpyObj('router', ['navigate']);
    const dialogServiceMock = jasmine.createSpyObj('dialogService', ['addDialog']);
    const customerSearchDataServiceMock = jasmine.createSpyObj('customerSearchDataService', ['getByCustomerId']);

    const routeMock: any = { params: { customerId: undefined } };
    const stateMock: any = { };

    function init() {
        const guard = new CustomerCanActivateGuard(customerServiceMock, routerMock, dialogServiceMock, customerSearchDataServiceMock);
        return guard;
    }

    describe('canActivate', () => {
        afterEach(() => {
            dialogServiceMock.addDialog.calls.reset();
            routerMock.navigate.calls.reset();
        });

        it('should return true when there is a selected customer', () => {
            
            customerServiceMock.selectedCustomer = selectedCustomer;

            const guard = init();
            const result = guard.canActivate(routeMock, stateMock);
            
            result.subscribe((canActivate: boolean) => {
                expect(canActivate).toBe(true);
            })
        });

        it('should show modal and route to home', () => {
            customerServiceMock.selectedCustomer = undefined;
            const guard = init();

            const result = guard.canActivate(routeMock, stateMock);

            result.subscribe((canActivate: boolean) => {
                expect(canActivate).toBe(false);
                expect(dialogServiceMock.addDialog).toHaveBeenCalledTimes(1);
                expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
            })
        });

        it('should use customerId route param to fetch the current customer', () => {
            customerServiceMock.selectedCustomer = undefined;
            routeMock.params.customerId = 4;
            customerSearchDataServiceMock.getByCustomerId.and.returnValue(Observable.of(selectedCustomer));

            const guard = init();

            const result = guard.canActivate(routeMock, stateMock);

            result.subscribe((canActivate: boolean) => {
                expect(canActivate).toBe(true);
                expect(customerServiceMock.selectedCustomer).toBe(selectedCustomer);
            });
        });

        it('should show modal when a bad customer id is in the url', () => {
            customerServiceMock.selectedCustomer = undefined;
            routeMock.params.customerId = 0;
            customerSearchDataServiceMock.getByCustomerId.and.returnValue(Observable.of(null));

            const guard = init();

            const result = guard.canActivate(routeMock, stateMock);

            result.subscribe((canActivate: boolean) => {
                expect(canActivate).toBe(false);
                expect(dialogServiceMock.addDialog).toHaveBeenCalledTimes(1);
                expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
            });
        })
    });
});