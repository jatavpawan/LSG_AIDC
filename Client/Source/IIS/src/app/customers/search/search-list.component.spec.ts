import { SelectCustomersTabDirective } from './select-customers-tab.directive';
import { ElasticSearchResult } from './../../shared/models/elastic-search-result.model';
import { Account } from './../../shared/models/account.model';
import { Facility } from './../../shared/models/facility.model';
import { Deal } from './../../shared/models/deal.model';
import { Observable } from 'rxjs/Observable';
import { SearchListComponent } from './search-list.component';
import { Customer } from '../../shared/models/customer.model';
import { LocalStorageCustomer } from '../../shared/models/local-storage-customer.model';

describe('Customer Search List Component ', () => {
    let searchQuery = '';
    let selectedCustomer = new Customer();
    let localStorageCustomers: LocalStorageCustomer[] = [ new LocalStorageCustomer(0, '', '', '', '', 0, '', '', 0) ];
    let deals: Deal[] = [ new Deal(), new Deal(), new Deal() ];
    let facilities: Facility[] = [ new Facility(), new Facility(), new Facility() ];
    let accounts: Account[] = [new Account(), new Account(), new Account()];
    
    const selectCustomersTabDirectiveMock: any = {select: () => {}}
    const customerMediatorServiceMock: any = { searchQryChanged$: Observable.of(searchQuery) }
    const searchDataServiceMock = jasmine.createSpyObj('searchDataService', ['search']);
    const routerMock = jasmine.createSpyObj('router', ['navigate']);
    const customerServiceMock: any = { selectedCustomer };
    const accountsMediatorServiceMock: any = {selectedAccount: undefined};
    const customerLocalStorageServiceMock = jasmine.createSpyObj('customerLocalStorageMediatorService', ['getCustomers', 'mapLocalStorageCustomerToCustomer']);
    const dealLocalStorageServiceMock = jasmine.createSpyObj('dealLocalStorageMediatorService', ['getDeals']);
    const facilityLocalStorageServiceMock = jasmine.createSpyObj('facilityLocalStorageMediatorServiceMock', ['getFacilities']);
    const accountLocalStorageServiceMock = jasmine.createSpyObj('accountLocalStorageMediatorService', ['getAccounts']);
    const growlerMock = jasmine.createSpyObj('growler', ['growlError']);

    beforeEach(() => {
        customerLocalStorageServiceMock.getCustomers.and.returnValue(localStorageCustomers);
        customerLocalStorageServiceMock.mapLocalStorageCustomerToCustomer.and.returnValue(new Customer());
        dealLocalStorageServiceMock.getDeals.and.returnValue(deals);
        facilityLocalStorageServiceMock.getFacilities.and.returnValue(facilities);
        accountLocalStorageServiceMock.getAccounts.and.returnValue(accounts);
    });

    function init() {
        const comp = new SearchListComponent(customerMediatorServiceMock, searchDataServiceMock, routerMock, customerServiceMock,
            accountsMediatorServiceMock, customerLocalStorageServiceMock, dealLocalStorageServiceMock, facilityLocalStorageServiceMock,
           accountLocalStorageServiceMock, growlerMock);

        comp.selectCustomersTab = selectCustomersTabDirectiveMock;
        comp.ngOnInit();

        return comp;
    }

    describe('trySearch', () => {
        it('should not perform the search until the query is longer than 2 characters', () => {
            const comp = init();
            comp.searchInputModel = 'wa';

            expect(comp.trySearch()).toBeFalsy();
        });

        it('should perform the search on a number', () => {
            const searchResult = new ElasticSearchResult();
            searchResult.Accounts = [];
            searchResult.Customers = [];
            searchResult.Deals = [];
            searchResult.Facilities = [];
            searchDataServiceMock.search.and.returnValue(Observable.of(searchResult));

            const comp = init();
            comp.searchInputModel = '1';

            expect(comp.trySearch()).toBeTruthy();
        });

        it('should set the active tab to customers', () => {
            const comp = init();
            spyOn(comp.selectCustomersTab, 'select');
            comp.searchInputModel = 'was';

            comp.trySearch();

            expect(comp.selectCustomersTab.select).toHaveBeenCalledTimes(1);
        });
    });

    describe('reset', () => {
        it('should set searchPerformed to false', () => {
            const comp = init();
            comp.reset();

            expect(comp.searchPerformed).toBe(false);
        });

        it('should reset the searchQry', () => {
            const comp = init();

            comp.reset();

            expect(comp.searchInputModel).toBe('');
        });

        it('should set the active tab to customers', () => {
            const comp = init();
            
            spyOn(comp.selectCustomersTab, 'select');

            comp.reset();

            expect(comp.selectCustomersTab.select).toHaveBeenCalledTimes(1);
        });

        it('should get customers, deals, facilities, and accounts from local storage', () => {
            const comp = init();
            spyOn(comp, 'getLocalStorageResults');

            comp.reset();

            expect(comp.getLocalStorageResults).toHaveBeenCalledTimes(1);
        });
    });

    describe('getLocalStorageResults', () => {
        it('should get customers, deals, facilities, and accounts from local storage', () => {
            const comp = init();

            comp.getLocalStorageResults();
            
            expect(comp.customers.length).toBe(localStorageCustomers.length);
            expect(comp.deals).toBe(deals);
            expect(comp.facilities).toBe(facilities);
            expect(comp.accounts).toBe(accounts);
        });
    });
});

