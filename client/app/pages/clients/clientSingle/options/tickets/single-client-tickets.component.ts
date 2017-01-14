import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import { OptionsClientService } from "../options-client.service";
import {ClientDataSharingService} from "../../../../../shared/data/client-data-sharing.service";
import {Subscription} from "rxjs";
import {ClientService} from "../../../../../services/client.service";
import {SingleTicketService} from "../../../../tickets/singleTicket/single-ticket.service";
import {TicketService} from "../../../../../services/ticket.service";


@Component({

    selector:'single-client-tickets',
    templateUrl:'single-client-tickets.template.html',
    styleUrls:['singleTicketStyles.css']

})

export class SingleClientTicketsComponent {

    subscription:Subscription;
    client:any;
    errorMessage:String;
    priorities:any[] = [];
    problemTypes:any[] = [];
    ticketswimlaneTypes:any[] = [];
    tickets:any[] = [];
    noTickets:boolean = false;
    selectedTicket:any = {};
    screanshotavilable:boolean  = false;

    selectedPriorityId:string = '';
    selectedSwimlaneStatusId:string = '';
    selectedProblemTypeId:string = '';

    ngOnInit() {

        this.subscription = this.dataHolder.clientData$.subscribe(
            client => {
                this.client = client;
                this.loadClientTickets();
            }
        )

        this.ticketService.getPriorities().
        then(priorities => this.priorities = priorities,
            error =>  this.errorMessage = <any>error );

        this.ticketService.getTicketswimlaneTypes().
        then(ticketswimlaneTypes => this.ticketswimlaneTypes = ticketswimlaneTypes,
            error =>  this.errorMessage = <any>error );

        this.ticketService.getproblemTypes().
        then(problemTypes => this.problemTypes = problemTypes,
            error =>  this.errorMessage = <any>error );
//

    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    constructor(
        private optionsClientService: OptionsClientService,
        private dataHolder: ClientDataSharingService,
        private singleTicketService:SingleTicketService,
        private ticketService:TicketService

    ){    }

    changeStatus(ticktId:string){

    }

    changeSelectedClientId(ticketId:string){
            this.selectedTicket.ticket_id = ticketId;
    }

    onProblemTypeSubmit(){

        const ticket = {
            ticketId: this.selectedTicket.ticket_id,
            selectedProblemTypeId: this.selectedProblemTypeId,
        };



        this.ticketService.changeTicketProblemType(ticket).then(res => {
            this.loadClientTickets();
            alert('Successfully  Changed Ticket Problem Type');
        }, error => {
            alert(error);
        });

        this.selectedProblemTypeId = null;

    }
    onPrioritySubmit(){

        const ticket = {
            ticketId: this.selectedTicket.ticket_id,
            selectedPriorityId: this.selectedPriorityId,
        };



        this.ticketService.changeTicketPriority(ticket).then(res => {
            this.loadClientTickets();
            alert('Successfully  Changed Ticket Priority');
        }, error => {
            alert(error);
        });

        this.selectedPriorityId = null;
        this.changeSelectedClientId(this.selectedTicket.ticket_id);

    }

    onTicketStatusFormSubmit(){

        const ticket = {
            ticketId: this.selectedTicket.ticket_id,
            selectedSwimlaneStatusId: this.selectedSwimlaneStatusId,
        };

        this.ticketService.changeTicketStatus(ticket).then(res => {
            this.loadClientTickets();
            alert('Successfully  Changed Ticket Status');
        }, error => {
            alert(error);
        });

        this.selectedSwimlaneStatusId = null;
        this.changeSelectedClientId(this.selectedTicket.ticket_id);



    }

    loadClientTickets(){
        this.optionsClientService.getClientTickets(this.client.client_id).
        then(tickets => {
            this.tickets = tickets;
              this.noTickets = false;
            },
            error => {
            this.errorMessage = <any>error;
            this.noTickets = true;
        } );

    }
    //selectedSwimlaneStatusId
}