/**
 * Created by thilina on 1/6/17.
 */
import {Component} from "@angular/core";
import {ProductManagementService} from '../../services/product.service';
import {OptionsClientService} from '../clients/clientSingle/options/options-client.service';
import {TicketService} from '../../services/ticket.service';

@Component({
    selector: 'developer',
    templateUrl: 'developer.template.html',
    styleUrls: [],
})

export class DeveloperComponent {

    products: any[] = [];
    priorities: any[] = [];
    statuses: any[] = [];
    tickets: any[];

    constructor(
        private productManagementService: ProductManagementService,
        private optionsClientService: OptionsClientService,
        private ticketService: TicketService
    ) {}

    ngOnInit(){
        this.productManagementService.getAllProducts().then(results => {
            this.products = results;
        }, error => {
            alert(error);
        });

        this.optionsClientService.getPriorities().then(results => {
                this.priorities = results;
        }, error =>  {
            alert(error);
        });

        this.optionsClientService.getTicketswimlaneTypes().then(results => {
            this.statuses = results;
        }, error =>  {
            alert(error);
        });

        this.ticketService.getTicketsRelatedToDeveloper({productID: "Any", priorityID: "Any", statusID: "Any"}).then(tickets => {
            this.tickets = tickets;
        }, error => {

        });

    }

    onSubmit(form: any): void{

    }

    onStateChange(state: string[]): void{
        this.ticketService.getTicketsRelatedToDeveloper(state).then(tickets => {
            this.tickets = tickets;
        }, error => {

        });

    }
}