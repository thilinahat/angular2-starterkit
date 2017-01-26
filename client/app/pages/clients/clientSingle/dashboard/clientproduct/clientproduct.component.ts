
import {Component, Input} from "@angular/core";
import {OptionsClientService} from "../../options/options-client.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({

    selector: 'clientproduct',
    templateUrl: 'clientproduct.template.html',



})

export class ClientproductComponent {
    @Input()
    client:any={};// = {client_name:"chamupathi"};

    purchasedList:any[] = [];
    noPurchases:boolean = false;
    errorMessage:string;
    sub:Subscription;
    id:any;

    ngOnInit(){

        this.sub = this.route.parent.params.subscribe(params => {
            this.id = params['clientId'];
            this.optionsClientService.getClientPurchasedItems(this.id).
            then(purchasedList => {
                    this.purchasedList = purchasedList;
                    console.log(this.purchasedList.length);
                },
                error =>  {
                    this.errorMessage = <any>error;
                    this.noPurchases = true;
                } );

        });



    }

    constructor(
        private optionsClientService:OptionsClientService,
        private route: ActivatedRoute,



    ) {}


}
