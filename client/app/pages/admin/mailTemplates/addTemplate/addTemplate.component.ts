/**
 * Created by thilina on 1/2/17.
 */
import {Component} from "@angular/core";
//import {ProductManagementService} from '../../../../services/product.service';

@Component({
    selector: 'add-mail-template',
    templateUrl: 'addTemplate.template.html',
    styleUrls: [],
})

export class AddMailTemplateComponent {

    constructor(/*private productManagementService: ProductManagementService*/ ) {}

    onSubmit(form: any): void{
       /* this.productManagementService.addProduct(form).then(
            response => {
                alert(response.message);
            }, error => {
                alert(error.message);
            }
        );*/
    }
}