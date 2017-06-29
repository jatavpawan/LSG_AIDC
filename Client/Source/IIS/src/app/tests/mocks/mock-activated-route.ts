import { Observable } from 'rxjs/Observable';
export class MockActivatedRoute {
    public params: Observable<any>

    constructor() {
        this.params = Observable.of({customerId: '1'});
    }
}
