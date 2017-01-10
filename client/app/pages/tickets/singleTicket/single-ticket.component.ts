
import {Component, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {SingleTicketService} from "./single-ticket.service";

@Component({
    selector: 'single-ticket',
    templateUrl: 'single-ticket.template.html',
    styleUrls:['single.ticket.css']



})

export class SingleTicketComponent {

    id: String;
    private sub: Subscription;
    selectedTicket:any = {};
    screanshotavilable:boolean = false;
    errorMessage:String;

    priorities:any[] = [];
    ticketswimlaneTypes:any[] = [];
    selectedSwimlaneStatusId:string;
    selectedPriorityId:String;

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id = params['ticketId'];

            this.loadTicketData();


        });

        this.singleTicketService.getPriorities().
        then(priorities => this.priorities = priorities,
            error =>  this.errorMessage = <any>error );

        this.singleTicketService.getTicketswimlaneTypes().
        then(ticketswimlaneTypes => this.ticketswimlaneTypes = ticketswimlaneTypes,
            error =>  this.errorMessage = <any>error );

    }


    onTicketStatusFormSubmit(){

        let formData = new FormData();
        formData.append("ticketId", this.selectedTicket.ticket_id);
        formData.append("selectedSwimlaneStatusId", this.selectedSwimlaneStatusId);

        this.singleTicketService.changeTicketStatus(formData).then(res => {
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

        let formData = new FormData();
        formData.append("ticketId", this.selectedTicket.ticket_id);
        formData.append("selectedPriorityId", this.selectedPriorityId);

        this.singleTicketService.changeTicketPriority(formData).then(res => {
            this.loadTicketData();
            alert('Successfully Added Changed Ticket Priority');
        }, error => {
            alert(error);
        });

        this.selectedPriorityId = null;
    }

    constructor(
        private route: ActivatedRoute,
        private singleTicketService:SingleTicketService

    ) {}

    ngOnDestroy(){
        //prevent memory leak
        this.sub.unsubscribe();
    }
}