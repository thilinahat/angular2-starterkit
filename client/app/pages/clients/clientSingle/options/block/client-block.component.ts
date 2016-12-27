import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import { OptionsClientService } from "../options-client.service";
import {ClientDataSharingService} from "../../../../../shared/data/client-data-sharing.service";
import {Subscription} from "rxjs";
import {ClientService} from "../../../../../services/client.service";


@Component({

    selector:'client-block',
    templateUrl:'client-block.template.html'

})

export class ClientBlockComponent {

    subscription:Subscription;
    client:any;
    note:String; // to keep why block, unblock
    errorMessage:String;

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
        private optionsClientService: OptionsClientService,
        private dataHolder: ClientDataSharingService,
        private clientService: ClientService

    ){    }

    blockClient (){
        var data = {
            note:this.note,
            clientId:this.client.client_id
        };

        this.optionsClientService.blockClient(data)
            .then(
                res  => this.handleBlockClient(),
                error =>  this.errorMessage = <any>error);

    }

    handleBlockClient(){
        this.reloadClientData();
        this.note = '';
        alert("blocked");
    }

    unBlockClient (){
        var data = {
            note:this.note,
            clientId:this.client.client_id
        };

        this.optionsClientService.unBlockClient(data)
            .then(
                res  => this.handleUnBlockClient(),
                error =>  this.errorMessage = <any>error);

    }

    handleUnBlockClient(){
        this.reloadClientData();
        this.note = '';
        alert("un blocked");
    }

    reloadClientData(){
        this.clientService.getClientData(this.client.client_id).
        then(clientdata => this.dataHolder.changeClient(clientdata),
            error =>  this.errorMessage = <any>error );
    }

}