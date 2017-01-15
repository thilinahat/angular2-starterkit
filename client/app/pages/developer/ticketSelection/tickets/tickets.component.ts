/**
 * Created by thilina on 1/6/17.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {CanActivate, Router, ActivatedRoute} from '@angular/router';
import {tick} from "@angular/core/testing";
import {TicketService} from "../../../../services/ticket.service";
import {forEach} from "@angular/router/src/utils/collection";


@Component({
    selector: 'developer-tickets',
    templateUrl: 'tickets.template.html',
    styleUrls: ['tickets..css'],
})

export class DeveloperTicketsComponent {

    @Input()  tickets: any[];
    @Output() onTicketUpdate: EventEmitter<any> = new EventEmitter();

    priorities:any[] = [];
    problemTypes:any[] = [];
    ticketswimlaneTypes:any[] = [];

    selectedProblemTypeId:string = '';
    selectedPriorityId:string = '';
    selectedSwimlaneStatusId:string = '';

    selectedTicket:any = {};
    selectedIndex:number = 0;
    errorMessage:string;

    ngOnInit(){
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
    constructor( private router: Router,
                 private route: ActivatedRoute,
                 private ticketService:TicketService
    ) {}



    onViewMore(ticketID: number){
        this.router.navigate(['/developer/tickets/', ticketID]);
    }

    changeSelectedClientId(ticketId:string){
        this.selectedTicket.ticket_id = ticketId;
    }

    changeSelectedTicketIndex(index:number){
        this.selectedIndex = index;
    }

    onProblemTypeSubmit(){

        const ticket = {
            ticketId: this.selectedTicket.ticket_id,
            selectedProblemTypeId: this.selectedProblemTypeId,
        };



        this.ticketService.changeTicketProblemType(ticket).then(res => {
            this.updateTicketProblemType();
            alert('Successfully  Changed Ticket Problem Type');
        }, error => {
            alert(error);
        });

  //      this.selectedProblemTypeId = null;

    }
    onPrioritySubmit(){

        const ticket = {
            ticketId: this.selectedTicket.ticket_id,
            selectedPriorityId: this.selectedPriorityId,
        };



        this.ticketService.changeTicketPriority(ticket).then(res => {
            this.updateTicketPriority();
            alert('Successfully  Changed Ticket Priority');
        }, error => {
            alert(error);
        });

//        this.selectedPriorityId = null;
        this.changeSelectedClientId(this.selectedTicket.ticket_id);

    }

    onTicketStatusFormSubmit(){

        const ticket = {
            ticketId: this.selectedTicket.ticket_id,
            selectedSwimlaneStatusId: this.selectedSwimlaneStatusId,
        };

        this.ticketService.changeTicketStatus(ticket).then(res => {
            this.updateTicketStatus();
            alert('Successfully  Changed Ticket Status');
        }, error => {
            alert(error);
        });

//        this.selectedSwimlaneStatusId = null;
        this.changeSelectedClientId(this.selectedTicket.ticket_id);

    }

    loadClientTickets(){
        this.onTicketUpdate.next({ticketId:this.selectedTicket.ticket_id, });

    }

    updateTicketStatus(){
    //    this.onTicketUpdate.next();
        this.tickets[this.selectedIndex].swimlane_status = this.ticketswimlaneTypes[Number(this.selectedSwimlaneStatusId)-1].swimlane_status;
        this.tickets[this.selectedIndex].swimlane_color = this.ticketswimlaneTypes[Number(this.selectedSwimlaneStatusId)-1].swimlane_color;

        this.selectedSwimlaneStatusId = null;
    }

    updateTicketPriority(){
        //    this.onTicketUpdate.next();
        this.tickets[this.selectedIndex].priority_name = this.priorities[Number(this.selectedPriorityId)-1].priority_name;
        this.tickets[this.selectedIndex].color = this.priorities[Number(this.selectedPriorityId)-1].color;

        this.selectedPriorityId = null;
    }

    updateTicketProblemType(){
        //    this.onTicketUpdate.next();
        this.tickets[this.selectedIndex].problem_type_name = this.problemTypes[Number(this.selectedProblemTypeId)-1].problem_type_name;
        this.tickets[this.selectedIndex].problem_type_color = this.problemTypes[Number(this.selectedProblemTypeId)-1].problem_type_color;

        this.selectedProblemTypeId = null;
    }


}