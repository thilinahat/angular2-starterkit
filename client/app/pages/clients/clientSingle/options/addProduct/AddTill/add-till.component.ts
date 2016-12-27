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

    subscription:Subscription;

    errorMessage:string = 'default error';

    @Input()
    product:any;
    @Input()
    branch:any;
    @Input()
    productId:String;
    @Input()
    branchId:String;



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
            expireDate:this.expireDate
        };

        this.clientService.addTillToClient(data)
            .then(
                res  => this.handleTillAdding(),
                error =>  this.errorMessage = <any>error);

    }

    tillDataValid (): boolean {
        //stab
        return (this.branchId && this.productId && this.productKey && this.expireDate);
    }

    handleTillAdding(){
        alert('till was successfully added');
        this.productKey = '';
        this.expireDate = '';
    }
}