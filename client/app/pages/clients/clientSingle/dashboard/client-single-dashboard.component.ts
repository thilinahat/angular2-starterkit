import {Component} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {Subscription} from "rxjs";
import {ClientService} from "../../../../services/client.service";
import {ClientDataSharingService} from "../../../../shared/data/client-data-sharing.service";
import {OptionsClientService} from "../options/options-client.service";

@Component({

    selector: 'client-dash-board',
    templateUrl: 'client-single-dashboard.template.html',
    styles:['.client-header{padding-left: 20px}']



})

export class ClientSingleDashboardComponent {

    id: String;

    private sub: Subscription;
    subscription:Subscription;

    private errorMessage:any;
    client:any = {};


    ngOnInit() {

        this.sub = this.route.parent.params.subscribe(params => {
            this.id = params['clientId'];
        });

        this.clientService.getClientData(this.id).
        then(clientdata => this.dataHolder.changeClient(clientdata),
            error =>  this.errorMessage = <any>error );





        this.subscription = this.dataHolder.clientData$.subscribe(
            client => this.client = client
        )


    }



    constructor(
        private route: ActivatedRoute,
        private clientService: ClientService,
        private dataHolder: ClientDataSharingService,
        private optionsClientService:OptionsClientService

    ) {}

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
        this.sub.unsubscribe();
    }


}