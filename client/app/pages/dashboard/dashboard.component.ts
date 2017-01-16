import {Component} from "@angular/core";
import {TicketService} from "../../services/ticket.service";
import {ProductService} from "../../services/products.service";

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.template.html',
    styles:['.row{margin-left:0; margin-right: 0}']
})

export class DashboardComponent {

    private name: String = "DashBoard"
    numberOfActiveTickets:any = {};
    numberOfExpiringTills:any = {};
    numberOfresolvedTickets7:any = {};

    errorMessage:string;

    ngOnInit(){

        this.ticketService.getNumberOfActiveTickets().then(
            numberOfActiveTickets => this.numberOfActiveTickets = numberOfActiveTickets,
            error =>  this.errorMessage = <any>error
        )

        this.ticketService.getNumberOfResolvedTicketsInLast7().then(
            numberOfresolvedTickets7 => this.numberOfresolvedTickets7 = numberOfresolvedTickets7,
            error =>  this.errorMessage = <any>error
        )

        this.productService.getNumberOfExpiringTills().then(
            numberOfExpiringTills => this.numberOfExpiringTills = numberOfExpiringTills,
            error =>  this.errorMessage = <any>error

        )
    }
    constructor(
        private ticketService:TicketService,
        private productService:ProductService
    ){}
}