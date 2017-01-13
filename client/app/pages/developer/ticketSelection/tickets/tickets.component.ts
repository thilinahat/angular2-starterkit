/**
 * Created by thilina on 1/6/17.
 */
import {Component, Input} from "@angular/core";
import { CanActivate, Router} from '@angular/router';


@Component({
    selector: 'developer-tickets',
    templateUrl: 'tickets.template.html',
    styleUrls: ['tickets..css'],
})

export class DeveloperTicketsComponent {

    constructor( private router: Router ) {}

    @Input()  tickets: any[];

    onViewMore(){
        this.router.navigate(['/developer/tickets/5']);
    }
}