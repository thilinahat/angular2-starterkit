/**
 * Created by thilina on 1/2/17.
 */
import {Component} from "@angular/core";
import {ProductManagementService} from '../../../../services/product.service';

@Component({
    selector: 'edit-product',
    templateUrl: 'editProduct.template.html',
    styleUrls: [],
})

export class EditProductComponent {

    products: any[] = [];
    productDescriptionMap: any = {};
    description: string = "";

    ngOnInit(){
        this.productManagementService.getAllProducts().then(results => {
            this.products = results;
            for(let product of this.products) {
                this.productDescriptionMap[product.name] = product.description;
            }
        }, error => {
           alert(error);
        });
    }

    constructor(private productManagementService: ProductManagementService ) {}

    onSubmit(form: any): void{
        this.productManagementService.editProduct(form).then(
            response => {
                alert(response.message);
            }, error => {
                alert(error.message + '\n' + error.status);
            }
        );
    }

    onSelect(product: any): void{
        this.description = this.productDescriptionMap[product];
    }
}