import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statustypeformat'
})

export class StatusTypeFormatPipe implements PipeTransform {
    transform(statusCode: boolean) {

        return statusCode === true ? 'Active' : 'Deleted';
    }
}