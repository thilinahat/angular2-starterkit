import {Component} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {Subscription} from "rxjs";
import {ClientService} from "../../../../services/client.service";
import {ClientDataSharingService} from "../../../../shared/data/data";

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


    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id = params['clientId'];
        });

        this.clientService.getClientData(this.id).
        then(clientdata => this.dataHolder.changeNav(clientdata),
            error =>  this.errorMessage = <any>error );


        this.subscription = this.dataHolder.clientData$.subscribe(
            client => this.client = client
        )


    }

    client:any;


    constructor(
        private route: ActivatedRoute,
        private clientService: ClientService,
        private dataHolder: ClientDataSharingService

    ) {}

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
        this.sub.unsubscribe();
    }


}