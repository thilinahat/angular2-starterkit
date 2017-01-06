/**
 * Created by thilina on 1/6/17.
 */
import {Component} from "@angular/core";
import {ProductManagementService} from '../../services/product.service';

@Component({
    selector: 'developer',
    templateUrl: 'developer.template.html',
    styleUrls: [],
})

export class DeveloperComponent {

    products: any[] = [];
    productDescriptionMap: any = {};
    description: string = "";
    tickets: any[];

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

    onProductSelect(productID: any): void{
        // get tickets related to this developer and this product id
        this.tickets = [
            {

            }
        ];
    }
}