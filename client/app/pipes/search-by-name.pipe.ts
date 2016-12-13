import { Pipe, PipeTransform } from '@angular/core';

/*
 * filter an array of objects which has id field on it
 *
 * exmapla use
 * { clientNameAndIds | searchByName:'a' }
 *
 * { clientNameAndIds | searchByName:searchClientName }
 *
 * *ngFor="let client of ( clientNameAndIds | searchByName:searchClientName ) "
 *
 *  */

// add ignore case
@Pipe({name: 'searchByName'})

export class SearchByNamePipe implements PipeTransform {

    transform(componentList:  any[], name:String): any[] {

        return componentList.filter((component) => component.name.indexOf(name) != -1)
    }
}