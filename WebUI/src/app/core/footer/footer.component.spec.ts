/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('Component: FooterComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                FooterComponent
            ],
        });
        TestBed.compileComponents();
    });

    it('should create the footer', async(() => {
        let fixture = TestBed.createComponent(FooterComponent);
        let footer = fixture.debugElement.componentInstance;
        expect(footer).toBeTruthy();
    }));

    it('should render copy right info in a span tag', async(() => {
        let fixture = TestBed.createComponent(FooterComponent);
      //  fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('span').textContent).toString().startsWith('Copyright');
        expect(compiled.querySelector('span').textContent).toString().endsWith('Farm Credit Services of America');
    }));
});
