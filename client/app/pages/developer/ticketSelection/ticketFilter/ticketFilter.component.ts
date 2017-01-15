/**
 * Created by thilina on 1/7/17.
 */
import {Component, Output, EventEmitter, Input} from "@angular/core";

@Component({
    selector: 'ticket-filter',
    templateUrl: 'ticketFilter.template.html',
    styleUrls: [],
})

export class TicketFilterComponent {

    constructor() {}

    productID: string = 'Any';
    priorityID: string = 'Any';
    statusID: string = 'Any';

    @Input() products: any[];
    @Input() priorities: any[];
    @Input() statuses: any[];
    @Input() problemTypes:any[];
    @Output() onStateChange: EventEmitter<any> = new EventEmitter();

    onProductChange(productId: any): void{
        this.productID = productId;
        this.onStateChange.next({
            productID: this.productID,
            priorityID: this.priorityID,
            statusID: this.statusID
        });
    }

    onPriorityChange(priorityId: any): void{
        this.priorityID = priorityId;
        this.onStateChange.next({
            productID: this.productID,
            priorityID: this.priorityID,
            statusID: this.statusID
        });
    }

    onStatusChange(statusId: any): void{
        this.statusID = statusId;
        this.onStateChange.next({
            productID: this.productID,
            priorityID: this.priorityID,
            statusID: this.statusID
        });
    }
}