export class RoutesFactory {

    static createRootRoute() {
        return `/`;
    }
    static createCustomerSearchRoute() {
        return `/customersSearch`;
    }

    static createCustomerRoute(customerId: number) {
        return `customer/${customerId}`;
    }

    static createAchRoute (customerId: number) {
        return `customer/${customerId}/ach/createAch`;
    }

    static createAchWithTemplateRoute(customerId: number, bankTemplateId: number) {
        return `customer/${customerId}/ach/createAch/${bankTemplateId}`;
    }

    static createAchTransactionsRoute(customerId: number) {
        return `customer/${customerId}/ach/achTransactions`;       
    }

    static createAccountSearchRoute(customerId: number) {
        return `customer/${customerId}/accountsSearch`; 
    }

    static createInternalTransferListRoute(customerId: number) {
        return `customer/${customerId}/internalTransfer/list`; 
    }

    static createInternalTransferSetupRoute(customerId: number) {
        return `customer/${customerId}/internalTransfer/setup`;
    }

}