import {Input, Component} from "@angular/core";


@Component({
    selector:"filtered-products",
    templateUrl:"products.template.html",
    styleUrls:["../../product.css"]
})
export class FilteredProductsComponent{

    @Input() purchasedList:any[] = [];
    @Input() noPurchases:boolean;

}