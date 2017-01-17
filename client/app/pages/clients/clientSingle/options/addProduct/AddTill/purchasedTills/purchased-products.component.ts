import {Component, Input,} from "@angular/core";
import {Subscription} from "rxjs";
import {OptionsClientService} from "../../../options-client.service";
import {ClientDataSharingService} from "../../../../../../../shared/data/client-data-sharing.service";



@Component({

    selector:'purchased-products',
    templateUrl:'purchased-products.template.html',

})

export class SingleClientPurchasedProductsComponent {

    @Input()
    client:any;
    @Input()
    purchasedList:any[] = [];
    @Input()
    noPurchases:boolean;


}

