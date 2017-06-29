import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'accountnumberformat' })
export class AccountNumberFormatPipe implements PipeTransform {
    transform(value: number): string {

        let formatted = '';

        if (value) {
            formatted = value.toString();
        }

        if (formatted && formatted.length >= 4) {

            formatted = this.pad(formatted.substring(formatted.length - 4), 4);
            return `*${formatted.substring(formatted.length - 4)}`;
        } else {
            formatted = this.pad(formatted, 4);
            return `*${formatted}`;
        }
    }

    private pad(n: any, width: number) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }
} 