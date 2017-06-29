import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ta-footer',
    templateUrl: 'footer.component.html',
    styleUrls: [ 'footer.component.scss' ]
})
export class FooterComponent implements OnInit {

    currentYear: string;

    constructor() { }

    ngOnInit() { 
        this.currentYear = new Date().getFullYear().toString();
    }

}