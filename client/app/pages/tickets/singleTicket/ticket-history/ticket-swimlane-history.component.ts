

import {TicketService} from "../../../../services/ticket.service";
import {Component,Input} from "@angular/core";

@Component({
    selector: 'ticket-swimlane-history',
    templateUrl: 'ticket-swimlane-history.template.html',
    styleUrls: [],
})

export class TicketSwimlaneHistoryComponent {

    constructor( private ticketService: TicketService) {}

    historyItems: any[] = [];

    @Input()  ticketID: any;


//implement on back end
    onClick(){
        this.ticketService.getSwimlaneHistory(this.ticketID).then(results =>{
            this.historyItems = results;
        }, error => {

        });
    }
}

