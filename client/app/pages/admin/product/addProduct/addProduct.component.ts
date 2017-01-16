/**
 * Created by thilina on 1/2/17.
 */
import {Component} from "@angular/core";
import {ProductManagementService} from '../../../../services/product.service';

@Component({
    selector: 'add-main-product',
    templateUrl: 'addProduct.template.html',
    styles: ['.form-container{margin-top: 25px}'],
})

export class AddMainProductComponent {

    products:any[];
    name:string;
    description:string;

    constructor(private productManagementService: ProductManagementService ) {}

    onSubmit(form: any): void{
        this.productManagementService.addProduct(form).then(
            response => {
                this.loadData();
                this.description = null;
                this.name = null;
                alert(response.message);
            }, error => {
                alert(error.message);
            }
        );
    }

    ngOnInit(){
        this.loadData();
    }

    loadData(){
        this.productManagementService.getAllProducts().then(
            products => {
                this.products = products;
            }, error => {
                alert(error.message);
            }
        );

    }
}