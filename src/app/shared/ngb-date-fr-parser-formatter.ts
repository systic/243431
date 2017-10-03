import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return '';
    }
}

function isNumber(value: any): boolean {
    return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

/* format date value */
@Injectable()
export class NgbDateFRParserFormatter extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('/');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return {year: toInteger(dateParts[0]), month: null, day: null};
            } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return {year: toInteger(dateParts[1]), month: toInteger(dateParts[0]), day: null};
            } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return {year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0])};
            }
        }
        return null;
    }

    format(date: NgbDateStruct): string {
        let stringDate = '';
        if (date) {
            stringDate += isNumber(date.day) ? padNumber(date.day) + '/' : '';
            stringDate += isNumber(date.month) ? this.convertMonthText(date.month) + '/' : '';
            stringDate += date.year;
        }
        return stringDate;
    }

  // convert month text
  convertMonthText(month) {
    let monthText = '';
    switch (month) {
      case 1:
        monthText = 'Jan';
        break;
      case 2:
        monthText = 'Feb';
        break;
      case 3:
        monthText = 'Mar';
        break;
      case 4:
        monthText = 'Apr';
        break;
      case 5:
        monthText = 'May';
        break;
      case 6:
        monthText = 'June';
        break;
      case 7:
        monthText = 'Jul';
        break;
      case 8:
        monthText = 'Aug';
        break;
      case 9:
        monthText = 'Sep';
        break;
      case 10:
        monthText = 'Oct';
        break;
      case 11:
        monthText = 'Nov';
        break;
      case 12:
        monthText = 'Dec';
        break;
    }
    return monthText;
  }
}
