import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';

@Injectable()
export class GrowlerMediatorService {
    growlerMessages: Message[] = [];

    constructor() {

    }

    public growlSuccess(summary: string, detail: string) {
        this.growlerMessages = [];
        this.growlerMessages.push({ severity: 'success', summary: summary, detail: detail });
    }

    public growlInfo(summary: string, detail: string) {
        this.growlerMessages = [];
        this.growlerMessages.push({ severity: 'info', summary: summary, detail: detail });
    }

    public growlWarn(summary: string, detail: string) {
        this.growlerMessages = [];
        this.growlerMessages.push({ severity: 'warn', summary: summary, detail: detail });
    }

    public growlError(summary: string, detail: string) {
        this.growlerMessages = [];
        this.growlerMessages.push({ severity: 'error', summary: summary, detail: detail });
    }
}