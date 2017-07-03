import { Observable } from "rxjs";
import { WireInAssignmentModel } from '../../shared/models/wires/wire-in-assignment.model';
import {WireInModel} from '../../shared/models/wires/wire-in.model';
import {WireInDetailsModel} from '../../shared/models/wires/wire-in-details.model';
import {IncomingWireTransactionDetails} from '../../shared/models/wires/IncomingWireTransactionDetails';

export class MockWiresDataService {

    getWiresIn(): Observable<WireInModel[]> {
        return Observable.of(new Array<WireInModel>());
    }

    insertWireInAssignment(wireInAssignment: WireInAssignmentModel): Observable<number> {
        return Observable.of(1);
    }

    getWireDetailsById(id: number) {
        return Observable.of(new WireInDetailsModel());
    }

    allocateWire(incomingWireId: number, incommingWiresTransactionDetails: IncomingWireTransactionDetails[]) {
        return Observable.of(true);
    }
}