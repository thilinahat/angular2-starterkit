/**
 * Created by thilina on 1/12/17.
 */
import {Component, Input} from "@angular/core";
import {TicketService} from './../../../services/ticket.service';

@Component({
    selector: 'comments',
    templateUrl: 'comments.template.html',
    styleUrls: ['comments.css'],
})

export class CommentsComponent {

    constructor( private ticketService: TicketService) {}

    commentbox: string = '';
    comments: any[] = [];

    @Input()  ticketID: any;

    onSubmit(form: any){
        form.ticketID = this.ticketID;
        this.ticketService.setComment(form).then(res => {
            this.comments.push(res);
            this.commentbox = '';
        }, error => {
            alert(error);
        });
    }

    onClick(){
        this.ticketService.getComments(this.ticketID).then(results =>{
            this.comments = results;
        }, error => {

        });
    }
}

/*comments model
*
* sender role
* sender name
* time-stamp
* message
* ticket id
* */