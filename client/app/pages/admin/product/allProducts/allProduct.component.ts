/**
 * Created by thilina on 1/2/17.
 */
import {Component, Input} from "@angular/core";
import {ProductManagementService} from "../../../../services/product.service";

@Component({
    selector: 'all-products',
    templateUrl: 'allProduct.template.html',
    styleUrls: [],
})

export class AllProductsComponent {

    @Input() products:any[];

}