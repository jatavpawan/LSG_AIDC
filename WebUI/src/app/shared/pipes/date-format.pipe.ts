import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'dateformat'
})

export class DateFormatPipe implements PipeTransform {
    transform(value: string, format: string = ""): string {
        if (!value || value === "") return "";
        if (value === "No End Date") return "No End Date";
        return moment(value).format(format);
    }
}