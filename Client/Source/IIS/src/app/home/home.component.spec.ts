import { Observable } from 'rxjs/Observable';
import { HomeComponent } from './home.component';
import { CustomerMediatorService } from '../customers/customer-mediator.service';

describe('AppComponent', () => {
    let activatedRouteParams = {customerId: '5'};
    let searchQry = '';

    const customerMediatorServiceMock: any = {searchQryChanged$: Observable.of(searchQry)} 
    const activatedRouteMock: any = {params: Observable.of(activatedRouteParams)}

    function init() {
        const comp = new HomeComponent(customerMediatorServiceMock, activatedRouteMock);

        comp.ngOnInit();

        return comp;
    }

    describe('ngOnInit', () => {
        it('should initialize values based on result of activatedRoute subscription', () => {
            const comp = init();

            expect(comp.id).toBe(+activatedRouteParams.customerId);
            expect(comp.isCustomerSelected).toBe(true);
            expect(comp.showCustomerList).toBe(false);
            expect(customerMediatorServiceMock.searchQry).toBe('');
        });
    });

    describe('onCustomersChanged', () => {
        it('should show the customer list and hide the welcome message', () => {
            const comp = init();

            comp.onCustomersChanged('some search query');

            expect(comp.showWelcomeMsg).toBe(false);
            expect(comp.showCustomerList).toBe(true);
        });

        it('should show the welcome message and hide the customers list', () => {
            const comp = init();

            comp.onCustomersChanged('');

            expect(comp.showWelcomeMsg).toBe(true);
            expect(comp.showCustomerList).toBe(false);
        });
    });
});
