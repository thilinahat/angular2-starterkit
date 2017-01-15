import {Component,OnInit,Input} from "@angular/core"
import {EmailService} from '../../../services/email.service';
import {MailModel} from './mailModel'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {  ActivatedRoute } from '@angular/router';
import { OptionsClientService } from "../clientSingle/options/options-client.service";
import {ClientDataSharingService} from "../../../shared/data/client-data-sharing.service";
import {Subscription} from "rxjs";

export class IncomingMail {
    topic: string;
    body: string;
}

@Component({
    selector:'mail',
    providers: [EmailService],
    templateUrl:'mail.template.html',
    styleUrls: ['mail.css']

})

export class MailComponent implements OnInit{
    errorMessage: string;
    incomingMails : IncomingMail[];
    clientAddress : string;
    client_emails : any;
    subscription:Subscription;
    selected_email: string;
    client:any;

    constructor (
                 private emailService : EmailService,
                 private optionsClientService: OptionsClientService,
                 private dataHolder: ClientDataSharingService){
        this.clientAddress = "chamupathi2008@gmail.com";
        this.client_emails = [];
    }

    model = new MailModel("","",this.clientAddress);

    onSubmit() {
        this.model.to = this.clientAddress;
        this.sendMails(this.model);
    }


    ngOnInit() {

        this.subscription = this.dataHolder.clientData$.subscribe(
            client => {
                this.client = client;
                this.client_emails = this.client.emails;
                this.selected_email = this.client_emails[0];
            }
        )
        this.getEmail();
    }

    /**
     * subscribs to imap service and ger mails
     */
    getEmail(){
        this.emailService.getMails(this.selected_email).
        subscribe(
            data  => this.incomingMails = data,
            error =>  this.errorMessage = <any>error
        );
    }

    /**
     * subscribs to smtp service and send mails
     */
    sendMails(mailModel : MailModel){
        this.emailService.sendMail(mailModel)
            .subscribe(
                data => console.log(data),
                error => this.errorMessage = <any>error
            );

    }

    onEmailChanged(event:any){
        this.selected_email = event.target.value;
        this.incomingMails = [];
        this.getEmail();
    }
}