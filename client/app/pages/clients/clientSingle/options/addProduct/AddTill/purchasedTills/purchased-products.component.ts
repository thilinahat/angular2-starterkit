import {Component, Input,} from "@angular/core";
import {Subscription} from "rxjs";
import {OptionsClientService} from "../../../options-client.service";
import {ClientDataSharingService} from "../../../../../../../shared/data/client-data-sharing.service";



@Component({

    selector:'purchased-products',
    templateUrl:'purchased-products.template.html',

})

export class SingleClientPurchasedProductsComponent {

    client:any;
    subscription:Subscription;
    errorMessage:String;

    purchasedList:any[] = [];
    @Input()
    noPurchases:boolean;


    ngOnInit() {

        this.subscription = this.dataHolder.clientData$.subscribe(
            client => {
                this.client = client;
                this.loadPurchasedProducts();
            }
        )
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    constructor(
        private optionsClientService: OptionsClientService,
        private dataHolder: ClientDataSharingService,

    ){    }


    loadPurchasedProducts(){
        this.optionsClientService.getClientPurchasedItems(this.client.client_id).
        then(purchasedList => {
            this.purchasedList = purchasedList;
            this.noPurchases = false;
            }
            ,
            error =>  {
            this.errorMessage = <any>error;
            this.noPurchases = true;
        });

    }
}

