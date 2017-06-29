import { InternalTransferListComponent } from "./transfer-list.component";
import { Customer } from "../../shared/models/customer.model";
import { Observable } from "rxjs/Observable";
import { InternalTransferTransactionTemplate } from "../../shared/models/internal-transfer/internal-transfer-transaction-template.model";
import { DialogService } from 'ng2-bootstrap-modal';

describe('Internal Transfer List Component', () => {
    const selectedCustomer = new Customer();
    selectedCustomer.Id = 1234;
    const transfers: InternalTransferTransactionTemplate[] = [new InternalTransferTransactionTemplate(), new InternalTransferTransactionTemplate(), new InternalTransferTransactionTemplate()];
    const copiedTransfer = new InternalTransferTransactionTemplate();

    const selectedCustomerMock: any = { selectedCustomer };
    const internalTransferDataServiceMock: any = jasmine.createSpyObj('internalTransferDataService', ['getInternalTransfers']);
    internalTransferDataServiceMock.getInternalTransfers.and.returnValue(Observable.of(transfers));
    const routerMock: any = jasmine.createSpyObj('router', ['navigate']);
    const dialogServiceMock: any = jasmine.createSpyObj('dialogService', ['addDialog']);
    const growlerMediatorServiceMock: any = jasmine.createSpyObj('growler', ['growlError', 'growlSuccess']);
    const internalTransferServiceMock: any = { copiedTransfer };
    
    function init() {
        const comp = new InternalTransferListComponent(selectedCustomerMock, internalTransferDataServiceMock, routerMock, dialogServiceMock, growlerMediatorServiceMock, internalTransferServiceMock);
        comp.ngOnInit();

        return comp;
    }

    describe('initializeObjects', () => {
        it('should get internal transfers for the currently selected customer', () => {
            const comp = init();

            expect(comp.transfers.length).toBe(3);
        });
    });

    describe('addNew', () => {
        it('should navigate to create a new transfer for the currently selected customer', () => {
            const comp = init();

            comp.addNew();

            expect(routerMock.navigate).toHaveBeenCalledWith([`customer/${selectedCustomer.Id}/internalTransfer/setup`]);
        });
    });
});