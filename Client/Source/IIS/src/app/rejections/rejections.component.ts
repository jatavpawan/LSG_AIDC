import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'rejections',
    templateUrl: 'rejections.component.html'
})

export class RejectionsComponent implements OnInit {

    customerId: number;

    constructor() { }

    ngOnInit() {
        this.initializeComponent();
    }

    initializeComponent() {

    }
}