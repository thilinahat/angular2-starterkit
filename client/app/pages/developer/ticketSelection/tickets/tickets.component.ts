/**
 * Created by thilina on 1/6/17.
 */
import {Component, Input} from "@angular/core";
import { CanActivate, Router} from '@angular/router';
import {tick} from "@angular/core/testing";


@Component({
    selector: 'developer-tickets',
    templateUrl: 'tickets.template.html',
    styleUrls: ['tickets..css'],
})

export class DeveloperTicketsComponent {

    constructor( private router: Router ) {}

    @Input()  tickets: any[];

    onViewMore(ticketID: number){
        this.router.navigate(['/developer/tickets/', ticketID]);
    }
}