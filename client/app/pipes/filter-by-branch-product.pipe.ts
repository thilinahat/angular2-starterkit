import { Pipe, PipeTransform } from '@angular/core';

/*
 * filter an array of tills which has product id and branch id fields on it
 *
 * exmapla use
 * { tills | filterByBranchProducts:'1','2' }
 *
 * { clientNameAndIds | filterByBranchProducts:searchClientproductId: branchID }
 *
 * *ngFor="let client of ( clientNameAndIds | filterByBranchProducts:searchClientproductId: branchID ) "
 *
 *  */


@Pipe({name: 'filterByBranchProducts'})

export class filterByBranchProductsPipe implements PipeTransform {

    transform(componentList:  any[], product_Id:any, branch_id:any): any[] {

        return componentList.filter((component) => {

            return (component.branch_id.toString() == branch_id.toString())
                &&
                (component.product_Id.toString() == product_Id.toString());
        }

        )
    }
}