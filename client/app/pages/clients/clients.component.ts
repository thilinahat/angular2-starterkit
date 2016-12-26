import {Component} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';

@Component({
    selector: 'clients',
    templateUrl: './clients.template.html',
    styleUrls: ['./clients.css'],
})

export class ClientsComponent {

    constructor( private route: ActivatedRoute ) {}
}