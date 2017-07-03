import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyformat' })
export class CurrencyFormatPipe implements PipeTransform {
      transform(value: string): string {
          if (value && value[0] === '-') {
              return `( ${value.substring(1)} )`;
            }
            return value;
      }
} 