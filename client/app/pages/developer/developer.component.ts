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
    totalPages: number = 1;
    currentPage: number = 1;

    state = {productID: "Any", priorityID: "Any", statusID: "Any"};

    constructor(
        private productManagementService: ProductManagementService,
        private optionsClientService: OptionsClientService,
        private ticketService: TicketService
    ) {}

    ngOnInit(){
        this.productManagementService.getAllProducts().then(results => {
            results.unshift({product_Id: "Any", name: "All"});
            this.products = results;
        }, error => {
            alert(error);
        });

        this.optionsClientService.getPriorities().then(results => {
            results.unshift({priority_id: "Any", priority_name: "All"});
            this.priorities = results;
        }, error =>  {
            alert(error);
        });

        this.optionsClientService.getTicketswimlaneTypes().then(results => {
            results.unshift({swimlane_id: "Any", swimlane_status: "All"});
            this.statuses = results;
        }, error =>  {
            alert(error);
        });

        this.ticketService.getTicketsRelatedToDeveloperWithCount(this.state).then(results => {
            this.tickets = results.tickets;
            this.totalPages = results.count;
            this.currentPage = 1;
        }, error => {

        });

    }

    onStateChange(state: any): void{
        this.state = state;
        this.ticketService.getTicketsRelatedToDeveloperWithCount(state).then(results => {
            this.tickets = results.tickets;
            this.totalPages = results.count;
            this.currentPage = 1;
        }, error => {

        });

    }

    onPageChange(state: any): void{
        const currentState = this.state;
        currentState['page'] = state.page;
        this.ticketService.getTicketsRelatedToDeveloper(currentState).then(tickets => {
            this.tickets = tickets;
            this.currentPage = state.page;
        }, error => {

        });

    }
}