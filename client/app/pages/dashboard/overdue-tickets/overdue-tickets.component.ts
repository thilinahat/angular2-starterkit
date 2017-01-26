import {Component} from "@angular/core";
import {SingleTicketService} from "../../tickets/singleTicket/single-ticket.service";
import {TicketService} from "../../../services/ticket.service";


@Component({
    selector: 'overdue-tickets',
    templateUrl: 'overdue-tickets.template.html',
})

export class OverdueTicketsComponent{

    errorMessage:string;
    overDueTickets:any[] = [];
    allOverDueTickets:any[] = [];

    ngOnInit(){

        this.ticketService.getOverDueTicketsForDashBoard().
        then(overDueTickets => this.overDueTickets = overDueTickets,
            error =>  this.errorMessage = <any>error );

    }


    loadAllOverDueTickets(){
        this.ticketService.getAllOverDueTicketsForDashBoard().
        then(allOverDueTickets => this.allOverDueTickets = allOverDueTickets,
            error =>  this.errorMessage = <any>error );

    }

    constructor(
        private ticketService:TicketService
    ){}
}

