/**
 * Created by thilina on 1/6/17.
 */
import {Component, Output, EventEmitter} from "@angular/core";
import {ProductManagementService} from '../../../services/product.service';
import {OptionsClientService} from '../../clients/clientSingle/options/options-client.service';
import {TicketService} from '../../../services/ticket.service';

@Component({
    selector: 'ticket-selection',
    templateUrl: 'ticketSelection.template.html',
    styleUrls: ['ticketSelection.css'],
})

export class TicketSelectionComponent {


    products: any[] = [];
    priorities: any[] = [];
    statuses: any[] = [];
    problemTypes:any[] = [];
    tickets: any[];
    totalPages: number = 1;
    currentPage: number = 1;

    state = {productID: "Any", priorityID: "Any", statusID: "Any"};
    page:any = 1;

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

        this.ticketService.getPriorities().then(results => {
            results.unshift({priority_id: "Any", priority_name: "All"});
            this.priorities = results;
        }, error =>  {
            alert(error);
        });

        this.ticketService.getTicketswimlaneTypes().then(results => {
            results.unshift({swimlane_id: "Any", swimlane_status: "All"});
            this.statuses = results;
        }, error =>  {
            alert(error);
        });

        this.ticketService.getproblemTypes().then(results => {
            results.unshift({problem_type_id: "Any", problem_type_name: "All"});
            this.problemTypes = results;
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
        this.page = state.page;
        const currentState = this.state;
        currentState['page'] = state.page;
        this.ticketService.getTicketsRelatedToDeveloper(currentState).then(tickets => {
            this.tickets = tickets;
            this.currentPage = state.page;
        }, error => {

        });

    }

    onTicketUpdate(){

        const currentState = this.state;
        currentState['page'] = this.page;
        this.ticketService.getTicketsRelatedToDeveloper(currentState).then(tickets => {
            this.tickets = tickets;
//            this.currentPage = this.page;
        }, error => {

        });

        console.log("");

    }

}