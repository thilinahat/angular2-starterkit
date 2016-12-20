import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import { OptionsClientService } from "../options-client.service";


@Component({

    selector:'add-call',
    templateUrl:'add-call.template.html'

})

export class AddCallComponent {

    client:any = {};

    call_time:number;
    call_description:String;
    id:string;
    errorMessage:string;
    sub:any;

    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {

                this.id = params['clientId']; // (

        });

        this.client = this.clientService.getClientName(this.id).
        then(clientdata => this.client = clientdata,
            error =>  this.errorMessage = <any>error );
    }

    constructor(
        private route:ActivatedRoute,
        private clientService: OptionsClientService

    ){

    }

}