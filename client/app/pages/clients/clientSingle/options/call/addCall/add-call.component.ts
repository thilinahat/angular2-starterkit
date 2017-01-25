import {Component, Input, Output, EventEmitter} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import {Subscription} from "rxjs";
import {ClientDataSharingService} from "../../../../../../shared/data/client-data-sharing.service";
import {OptionsClientService} from "../../options-client.service";


@Component({

    selector:'add-call',
    templateUrl:'add-call.template.html'

})

export class AddCallComponent {

    @Input() client:any = {};
    @Output() onCallAdd: EventEmitter<any> = new EventEmitter();



    call_time:number;
    call_description:String;
    id:string;
    subject:string;
    errorMessage:string;
    sub:any;

    subscription:Subscription;



    addCall (){

        if(!this.validateCall()){ return ; }

        var data = {
            subject: this.subject,
            call_description:this.call_description,
            call_time:this.call_time,
            clientId:this.client.client_id
        };

        this.optionsClientService.addCallToClient(data)
            .then(
                res  => this.handleAddNoteClient(),
                error =>  this.errorMessage = <any>error);

    }

    handleAddNoteClient(){
        this.onCallAdd.next();
        this.subject = '';
        this.call_time = null;
        this.call_description = '';
        alert("call successfully added");
    }

    validateCall():boolean
    {
        return this.subject && this.subject.length != 0 && this.call_description && this.call_description.length != 0;
    }
    constructor(
        private route:ActivatedRoute,
        private dataHolder: ClientDataSharingService,
        private optionsClientService:OptionsClientService

    ){    }

}