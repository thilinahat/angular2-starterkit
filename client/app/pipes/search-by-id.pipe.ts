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




@Pipe({name: 'searchById'})

export class SearchByIdPipe implements PipeTransform {

    transform(componentList:  any[], id:String): any[] {

        return componentList.filter((component) => component.id.toLocaleLowerCase().indexOf(id.toLocaleLowerCase()) != -1)
    }
}