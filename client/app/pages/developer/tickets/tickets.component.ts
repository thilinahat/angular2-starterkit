/**
 * Created by thilina on 1/6/17.
 */
import {Component, Input} from "@angular/core";

@Component({
    selector: 'developer-tickets',
    templateUrl: './tickets.template.html',
    styleUrls: ['./tickets..css'],
})

export class DeveloperTicketsComponent {

    constructor( ) {}

    @Input()  tickets: any[];
}