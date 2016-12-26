import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import {OptionsClientService} from "../options-client.service";
import {Subscription} from "rxjs";
import {ClientDataSharingService} from "../../../../../shared/data/data";


@Component({

    selector:'add-note',
    templateUrl:'add-note.template.html'

})

export class AddNoteComponent {

    client:any = {};
    subject:String;
    note:String;

    errorMessage:string;

    subscription:Subscription;

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
        private dataHolder: ClientDataSharingService


    ){ }

    addNote (){

            if(!this.validateNote()){ return ; }

        var data = {
            subject: this.subject,
            note:this.note,
            clientId:this.client.client_id
        };

        this.optionsClientService.addNoteToClient(data)
            .then(
                res  => this.handleAddNoteClient(),
                error =>  this.errorMessage = <any>error);

    }

    handleAddNoteClient(){
        this.subject = '';
        this.note = '';
        alert("note successfully added");
    }

    validateNote():boolean
    {
        return this.subject && this.subject.length != 0 && this.note && this.note.length != 0;
    }
}