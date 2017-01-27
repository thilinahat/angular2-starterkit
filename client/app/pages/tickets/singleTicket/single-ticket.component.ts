
import {Component, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {SingleTicketService} from "./single-ticket.service";
import {TicketService} from "../../../services/ticket.service";

@Component({
    selector: 'single-ticket',
    templateUrl: 'single-ticket.template.html',
    styleUrls:['single.ticket.css','../../developer/ticketSelection/tickets/tickets.css']
})

export class SingleTicketComponent {

    id: String;
    private sub: Subscription;
    selectedTicket:any = {};
    screanshotavilable:boolean = false;
    errorMessage:String;

    priorities:any[] = [];
    problemTypes:any[] = [];
    ticketswimlaneTypes:any[] = [];
    selectedSwimlaneStatusId:string;
    selectedPriorityId:String;
    selectedProblemTypeId:string;

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id = params['ticketId'];

            this.loadTicketData();


        });

        this.ticketService.getPriorities().
        then(priorities => this.priorities = priorities,
            error =>  this.errorMessage = <any>error );

        this.ticketService.getTicketswimlaneTypes().
        then(ticketswimlaneTypes => this.ticketswimlaneTypes = ticketswimlaneTypes,
            error =>  this.errorMessage = <any>error );

        this.ticketService.getproblemTypes().
        then(problemTypes => this.problemTypes = problemTypes,
            error =>  this.errorMessage = <any>error );


    }


    onTicketStatusFormSubmit(){
        const ticket = {
            ticketId: this.selectedTicket.ticket_id,
            selectedSwimlaneStatusId: this.selectedSwimlaneStatusId,
        };

        this.singleTicketService.changeTicketStatus(ticket).then(res => {
            this.loadTicketData();
            alert('Successfully Added Changed Ticket Status');
        }, error => {
            alert(error);
        });

        this.selectedSwimlaneStatusId = null;
    }

    loadTicketData(){
        this.singleTicketService.getClientTicktsAllData(this.id).
        then(selectedTicket => {
                this.selectedTicket = selectedTicket;
                if(this.selectedTicket.sceenshot_name && this.selectedTicket.sceenshot_name.length > 0){
                    this.screanshotavilable = true;
                }
                else{ this.screanshotavilable = false; }
            },
            error =>  this.errorMessage = <any>error );
    }

    onPrioritySubmit(){
        const ticket = {
            ticketId: this.selectedTicket.ticket_id,
            selectedPriorityId: this.selectedPriorityId,
        };

        this.singleTicketService.changeTicketPriority(ticket).then(res => {
            this.loadTicketData();
            alert('Successfully Added Changed Ticket Priority');
        }, error => {
            alert(error);
        });

        this.selectedPriorityId = null;
    }

    onProblemTypeSubmit(){

        const ticket = {
            ticketId: this.selectedTicket.ticket_id,
            selectedProblemTypeId: this.selectedProblemTypeId,
        };



        this.ticketService.changeTicketProblemType(ticket).then(res => {
            this.loadTicketData();
            alert('Successfully  Changed Ticket Problem Type');
        }, error => {
            alert(error);
        });

        this.selectedProblemTypeId = null;

    }

    constructor(
        private route: ActivatedRoute,
        private singleTicketService:SingleTicketService,
        private ticketService:TicketService

    ) {}

    ngOnDestroy(){
        //prevent memory leak
        this.sub.unsubscribe();
    }
}