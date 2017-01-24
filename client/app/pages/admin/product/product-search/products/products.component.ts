import {Input, Component} from "@angular/core";


@Component({
    selector:"filtered-products",
    templateUrl:"products.template.html",
    styleUrls:["../../product.css"]
})
export class FilteredProductsComponent{

    date:Date;
    @Input() purchasedList:any[] = [];
    @Input() noPurchases:boolean;

    ngOnInit(){
        this.date = new Date();
    }

    isExpired(addedTime:any){
        return (new Date(addedTime) < this.date);
    }
}