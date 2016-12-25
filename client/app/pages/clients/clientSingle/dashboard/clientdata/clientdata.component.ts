
import {Component, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../../../../services/client.service";

@Component({

    selector: 'clientdata',
    templateUrl: 'clientdata.template.html',
    styles:['.border{border: 1px solid #999; border-radius: 3px} .blocked{background-color: red;border-radius: 3px;float: right;}' ]


})

export class ClientdataComponent {

    id: String;
    private sub: any;
    ngOnInit() {
        this.sub = this.route.parent.params.subscribe(params => {
            this.id = params['clientId']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });

        this.clientService.getClientMails(this.id).
        then(mails => this.mails = mails,
            error =>  this.errorMessage = <any>error );

        this.clientService.getClientPhones(this.id).
        then(phones => this.phones = phones,
            error =>  this.errorMessage = <any>error );

        this.clientService.getClientFaxes(this.id).
        then(faxes => this.faxes = faxes,
            error =>  this.errorMessage = <any>error );

        this.blockedUser = (this.client.blocked == 0);
    }
    mails:any[] = [];
    phones:any[] = [];
    faxes:any[] = [];
    errorMessage:any;
    blockedUser:boolean;
    @Input()
    client:any;// = {client_name:"chamupathi"};


    constructor(
        private route: ActivatedRoute,
        private clientService: ClientService
    ) {}
}
