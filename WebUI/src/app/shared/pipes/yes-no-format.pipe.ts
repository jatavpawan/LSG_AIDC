import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'yesnoformat'
})

export class YesNoFormatPipe implements PipeTransform {
    transform(value: string) {
        if (!value) {
            return '';
        } else {
            return value === '1' ? 'Yes' : 'No';
        }
    }
}