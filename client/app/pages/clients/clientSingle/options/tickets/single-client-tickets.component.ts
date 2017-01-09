import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import { OptionsClientService } from "../options-client.service";
import {ClientDataSharingService} from "../../../../../shared/data/client-data-sharing.service";
import {Subscription} from "rxjs";
import {ClientService} from "../../../../../services/client.service";


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
    ticketswimlaneTypes:any[] = [];
    tickets:any[] = [];
    noTickets:boolean = false;
    selectedTicket:any = {};
    screanshotavilable:boolean  = false;

    selectedPriorityId:string = '';
    selectedSwimlaneStatusId:string = '';

    ngOnInit() {

        this.subscription = this.dataHolder.clientData$.subscribe(
            client => {
                this.client = client;
                this.loadClientTickets();
            }
        )

        this.optionsClientService.getPriorities().
        then(priorities => this.priorities = priorities,
            error =>  this.errorMessage = <any>error );

        this.optionsClientService.getTicketswimlaneTypes().
        then(ticketswimlaneTypes => this.ticketswimlaneTypes = ticketswimlaneTypes,
            error =>  this.errorMessage = <any>error );


    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    constructor(
        private optionsClientService: OptionsClientService,
        private dataHolder: ClientDataSharingService,

    ){    }

    changeStatus(ticktId:string){

    }

    changeSelectedClientId(ticketId:string){
        this.optionsClientService.getClientTicktsAllData(ticketId).
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

        this.optionsClientService.changeTicketPriority(formData).then(res => {
            this.loadClientTickets();
            alert('Successfully Added Changed Ticket Priority');
        }, error => {
            alert(error);
        });

        this.selectedPriorityId = null;
        this.changeSelectedClientId(this.selectedTicket.ticket_id);

    }

    onTicketStatusFormSubmit(){

        let formData = new FormData();
        formData.append("ticketId", this.selectedTicket.ticket_id);
        formData.append("selectedSwimlaneStatusId", this.selectedSwimlaneStatusId);

        this.optionsClientService.changeTicketStatus(formData).then(res => {
            this.loadClientTickets();
            alert('Successfully Added Changed Ticket Status');
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