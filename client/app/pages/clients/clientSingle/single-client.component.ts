import {Component} from "@angular/core";
import {ClientService} from "../../../services/client.service";
import {  ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({

    selector: 'singleclient',
    templateUrl: 'single-client.template.html',


})

export class SingleClientComponent {

    id: String;
    private sub: any;
    private errorMessage:any;

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id = params['clientId']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });

        this.client = this.clientService.getClientData(this.id).
        then(clientdata => this.client = clientdata,
            error =>  this.errorMessage = <any>error );


    }

    clientId:String = "Test client"; //testing purpose only
    client:any;


    constructor(
        private route: ActivatedRoute,
        private clientService: ClientService
    ) {}


}