import {Component} from "@angular/core";
import {TicketService} from "../../services/ticket.service";
import {ProductService} from "../../services/products.service";

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.template.html',
})

export class DashboardComponent {

    private name: String = "DashBoard"
    numberOfActiveTickets:any = {};
    numberOfExpiringTills:any = {};
    errorMessage:string;

    ngOnInit(){

        this.ticketService.getNumberOfActiveTickets().then(
            numberOfActiveTickets => this.numberOfActiveTickets = numberOfActiveTickets,
            error =>  this.errorMessage = <any>error
        )

        this.productService.getNumberOfActiveTickets().then(
            numberOfExpiringTills => this.numberOfExpiringTills = numberOfExpiringTills,
            error =>  this.errorMessage = <any>error

        )
    }
    constructor(
        private ticketService:TicketService,
        private productService:ProductService
    ){}
}