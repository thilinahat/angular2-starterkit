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
    allHighPriorityTickets:any[] = [];
    allMediumPriorityTickets:any[] = [];
    allLowPriorityTickets:any[] = [];

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


    loadAllHighPriorityTickets(){
        this.ticketService.getAllHighPriorityTicketsForDashBoard().
        then(allHighPriorityTickets => this.allHighPriorityTickets = allHighPriorityTickets,
            error =>  this.errorMessage = <any>error );

    }

    loadAllMediumPriorityTickets(){
        this.ticketService.getAllMediumPriorityTicketsForDashBoard().
        then(allMediumPriorityTickets => this.allMediumPriorityTickets = allMediumPriorityTickets,
            error =>  this.errorMessage = <any>error );

    }

    loadAllLowPriorityTickets(){
        this.ticketService.getAllLowPriorityTicketsForDashBoard().
        then(allLowPriorityTickets => this.allLowPriorityTickets = allLowPriorityTickets,
            error =>  this.errorMessage = <any>error );

    }
    constructor(
        private ticketService:TicketService
    ){}
}

