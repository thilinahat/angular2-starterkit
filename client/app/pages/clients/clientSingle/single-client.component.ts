import {Component} from "@angular/core";
import {ClientService} from "../../../services/client.service";
import {  ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {ClientDataSharingService} from "../../../shared/data/data";
import {Subscription} from "rxjs";

@Component({

    selector: 'singleclient',
    templateUrl: 'single-client.template.html',
    styles:['.nav-tabs{padding: 10px;} li:hover{background: rgba(255, 255, 255, 0.5); border-radius: 2px;}']


})

export class SingleClientComponent {

    id: String;
    private sub: Subscription;
    private errorMessage:any;
    subscription:Subscription;
    client:any;


    ngOnInit() {

        //this.dataHolder.client = "abcd";

        this.sub = this.route.params.subscribe(params => {
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
        private dataHolder: ClientDataSharingService

    ) {}

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
        this.sub.unsubscribe();
    }


}