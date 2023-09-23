import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormatPipe',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string) {
    let datePipe = new DatePipe('en-US');
    const result = datePipe.transform(value, 'dd/MM/yyyy');
    return result;
  }
}
