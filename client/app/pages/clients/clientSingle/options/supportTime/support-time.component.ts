

import {Component} from "@angular/core";
import {Subscription} from "rxjs";
import {ClientDataSharingService} from "../../../../../shared/data/client-data-sharing.service";
import {OptionsClientService} from "../options-client.service";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../../../../services/client.service";
@Component({
    selector:"support-time",
    templateUrl:"support-time.template.html"
})
export class SupportTimeComponent{

    client:any = {};
    subscription:Subscription;
    sub:Subscription;
    availableTime:any;
    id:any;
    errorMessage:string;
    addingTime:any;

    ngOnInit() {

            this.updateClient();

            this.subscription = this.dataHolder.clientData$.subscribe(
            client => {
                this.client = client;
                this.availableTime = client.support_time;
                if(!this.client.client_id){
                    this.updateClient();
                }

            }
        )



    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
        this.sub.unsubscribe();
    }

    onSubmit(form: any): void {
        var data = {
            clientId:this.client.client_id,
            addingTime: this.addingTime
        };

        this.optionsClientService.addTimeToClient(data).then(res => {
            this.refreshFields();
            alert('Successfully Added Time');
        }, error => {
            alert(error);
        });
    }

    refreshFields(){
        this.getSupportTime();
        this.updateClient();
        this.addingTime = null;
    }

    getSupportTime(){
        this.optionsClientService.getClientSupportTime(this.client.client_id)
            .then(availableTime => {this.availableTime = availableTime.support_time;
                },
                error => this.errorMessage = <any>error);

    }

    updateClient(){
        this.sub = this.route.parent.params.subscribe(params => {
            this.id = params['clientId'];
            this.clientService.getClientData(this.id).
            then(clientdata => this.dataHolder.changeClient(clientdata),
                error =>  this.errorMessage = <any>error );
        });
        this.getSupportTime();


    }

    constructor(
        private route: ActivatedRoute,
        private clientService: ClientService,
        private optionsClientService: OptionsClientService,
        private dataHolder: ClientDataSharingService


    ){ }

}