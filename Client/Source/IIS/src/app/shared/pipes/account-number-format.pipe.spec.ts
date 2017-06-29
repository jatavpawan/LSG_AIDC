
import { TestBed, async } from '@angular/core/testing';
import { AccountNumberFormatPipe } from './account-number-format.pipe';

describe('AccountNumberFormatPipe', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                
            ],
            imports: [],
            providers: []
        });

        TestBed.compileComponents();
    });

    it('should create the pipe and return *1234', async(() => {
        let pipe = new AccountNumberFormatPipe();
        let result = pipe.transform(561234);
        expect(result).toEqual('*1234');
    }));

    it('should create the pipe and return *0034 when just 34 is supplied', async(() => {
        let pipe = new AccountNumberFormatPipe();
        let result = pipe.transform(34);
        expect(result).toEqual('*0034');
    }));
});
