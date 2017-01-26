import {Component} from "@angular/core";
import {SingleTicketService} from "../../tickets/singleTicket/single-ticket.service";
import {TicketService} from "../../../services/ticket.service";


@Component({
    selector: 'active-tickets',
    templateUrl: 'active-tickets.template.html',
})

export class ActiveTicketsComponent{

    errorMessage:string;
    highPriorityTickets:any[] = [];
    mediumPriorityTickets:any[] = [];
    lowPriorityTickets:any[] = [];
    allActiveTickets:any[] = [];

    ngOnInit(){

        this.ticketService.getHighPriorityTicketsForDashBoard().
        then(highPriorityTickets => this.highPriorityTickets = highPriorityTickets,
            error =>  this.errorMessage = <any>error );

        this.ticketService.getMediumPriorityTicketsForDashBoard().
        then(mediumPriorityTickets => this.mediumPriorityTickets = mediumPriorityTickets,
            error =>  this.errorMessage = <any>error );

        this.ticketService.getLowPriorityTicketsForDashBoard().
        then(lowPriorityTickets => this.lowPriorityTickets = lowPriorityTickets,
            error =>  this.errorMessage = <any>error );

    }


    loadAllActiveTickets(){
        this.ticketService.getAllActiveTicketsForDashBoard().
        then(allActiveTickets => this.allActiveTickets = allActiveTickets,
            error =>  this.errorMessage = <any>error );

    }
    constructor(
        private ticketService:TicketService
    ){}
}

