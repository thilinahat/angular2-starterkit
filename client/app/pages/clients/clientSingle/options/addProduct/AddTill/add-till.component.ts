import {Component, Input,} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OptionsClientService} from "../../options-client.service";
import {Subscription} from "rxjs";
import {ClientDataSharingService} from "../../../../../../shared/data/client-data-sharing.service";

@Component({

    selector:'add-till',
    templateUrl:'add-till.template.html'

})

export class AddTillComponent {

    client:any = {};
    expireDate:any;
    productKey:String;
    tillName:any;
    isdataValid:boolean;

    subscription:Subscription;

    errorMessage:string = '';

    @Input()
    product:any;
    @Input()
    branch:any;
    @Input()
    productId:String;
    @Input()
    branchId:String;

    noPurchases:boolean = false;



    ngOnInit() {

        this.subscription = this.dataHolder.clientData$.subscribe(
            client => this.client = client
        )

    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    constructor(
        private route:ActivatedRoute,
        private clientService: OptionsClientService,
        private dataHolder: ClientDataSharingService


    ){    }

    addTillToClient ()
    {
        if(! this.tillDataValid()) { console.log("invalid till data"); return }

        var data = {
            branchId:this.branchId,
            productId:this.productId,
            clientId:this.client.client_id,
            tillKey:this.productKey,
            tillName:this.tillName,
            expireDate:this.expireDate
        };

        this.clientService.addTillToClient(data)
            .then(
                res  => this.handleTillAdding(),
                error =>  this.errorMessage = <any>error);

    }

    tillDataValid (): boolean {

        this.isdataValid = (this.branchId && this.productId && this.productKey && this.productKey.length > 0 && this.expireDate && this.tillName);

        if(!this.isdataValid)
        {
            this.errorMessage = 'data is invalid';
            alert(this.errorMessage);
        }
        else{
            this.errorMessage = '';
        }
        return this.isdataValid;
    }

    handleTillAdding(){
        alert('till was successfully added');
        this.noPurchases = false;
        this.productKey = null;
        this.expireDate = null;
        this.tillName = null;
    }
}