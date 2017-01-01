/**
 * Created by thilina on 1/1/17.
 */
import {Component} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin',
    templateUrl: './admin.template.html',
    styleUrls: [],
})

export class AdminComponent {

    constructor( private route: ActivatedRoute ) {}
}