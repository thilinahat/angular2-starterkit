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
@Pipe({name: 'searchByAll'})

export class SearchByAllPipe implements PipeTransform {

    transform(componentList:  any[], name:String): any[] {

        return componentList.filter((component) =>
            (component.company_name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) != -1)
        || (component.client_id.toString().toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) != -1)
        )
    }
}