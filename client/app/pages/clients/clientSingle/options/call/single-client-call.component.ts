
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ClientDataSharingService} from "../../../../../shared/data/client-data-sharing.service";
import {OptionsClientService} from "../options-client.service";
import {Subscription} from "rxjs";
import {ClientService} from "../../../../../services/client.service";
@Component({
    selector:"single-client-call",
    templateUrl:"single-client-call.template.html",
    styles:['.row {margin-right: -5px; margin-left: -5px;}']
})
export class SingleClientCallComponent{
    client:any = {};
    history:any[];
    noHistory:boolean = true;

    subscription:Subscription;
    sub:Subscription;
    id:string;
    errorMessage:string;

    ngOnInit() {

        this.subscription = this.dataHolder.clientData$.subscribe(
            client => {
                this.client = client;

                if(!this.client.client_id) {   this.updateClient();   }
                else {    this.loadHistory();   }

            }
        )



    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    updateClient(){
        this.sub = this.route.parent.params.subscribe(params => {
            this.id = params['clientId'];
            this.clientService.getClientData(this.id).
            then(clientdata => this.dataHolder.changeClient(clientdata),
                error =>  this.errorMessage = <any>error );
        });
        this.loadHistory();

    }

    loadHistory (){
        this.optionsClientService.getCallHistory(this.client.client_id)
            .then(
                history  => {this.history = history;
                if( this.history  ){
                    this.noHistory = false;
                }
                },
                error =>  this.errorMessage = <any>error);
    }

    onCallAdd(){
        this.updateClient();
    }

    constructor(
        private route:ActivatedRoute,
        private dataHolder: ClientDataSharingService,
        private optionsClientService:OptionsClientService,
        private clientService: ClientService

    ){    }
}
