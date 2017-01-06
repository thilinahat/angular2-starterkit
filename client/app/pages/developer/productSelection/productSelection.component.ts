/**
 * Created by thilina on 1/6/17.
 */
import {Component, Output, EventEmitter} from "@angular/core";
import {ProductManagementService} from '../../../services/product.service';

@Component({
    selector: 'product-selection',
    templateUrl: 'productSelection.template.html',
    styleUrls: ['./productSelection.css'],
})

export class ProductSelectionComponent {

    products: any[] = [];

    ngOnInit(){
        this.productManagementService.getAllProducts().then(results => {
            this.products = results;
        }, error => {
            alert(error);
        });
    }

    constructor(private productManagementService: ProductManagementService ) {}

    @Output() onProductSelect: EventEmitter<any> = new EventEmitter();

    onSelect(productId: any): void{
        this.onProductSelect.next(productId);
    }
}