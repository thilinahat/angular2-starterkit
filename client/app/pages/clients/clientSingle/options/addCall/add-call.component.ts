import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import { CallService } from "./call.service";

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

    OnInit(){
        this.sub = this.route.params.subscribe(params => {

                this.id = params['clientId']; // (

        });

        this.callservice.getClientData(this.id).
        then(clientdata => this.client = clientdata,
            error =>  this.errorMessage = <any>error );
    }

    constructor(
        private route:ActivatedRoute,
        private callservice:CallService

    ){

    }

}