import { Pipe, PipeTransform } from '@angular/core';


/*
 * filter an array of objects which has id field on it
 *
 * exmapla use
 * { clientNameAndIds | searchById:'a' }
 *
 * { clientNameAndIds | searchById:searchClientId }
 *
 * *ngFor="let client of ( clientNameAndIds | searchById:searchClientId ) "
 *
 *  */




@Pipe({name: 'secondsToHourMin'})

export class SecondsToHourMinPipe implements PipeTransform {

    transform(seconds:  number): string {

        var min = Math.floor(seconds/60).toString();

        if(min == 'NaN'){
            return "0 min";
        }
        return Math.floor(seconds/60).toString() + " min";
    }
}