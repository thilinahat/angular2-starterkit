import {Component,OnInit} from "@angular/core"
import {EmailService} from '../../../services/email.service';
import {MailModel} from './mailModel'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

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

    constructor (private emailService : EmailService ){
        this.clientAddress = "tharakamd6@gmail.com";
    }

    model = new MailModel("","");

    onSubmit() {
        this.sendMails(this.model);
    }


    ngOnInit() {
        this.getEmail();
    }

    /**
     * subscribs to imap service and ger mails
     */
    getEmail(){
        this.emailService.getMails().
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
}